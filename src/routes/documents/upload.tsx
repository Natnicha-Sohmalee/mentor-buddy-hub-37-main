import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { insertRow, selectRows, uploadStorageObject } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";

type Project = { id: string; name: string };

export const Route = createFileRoute("/documents/upload")({ head: () => pageHead("อัปโหลดเอกสาร", "เก็บไฟล์ใน Supabase Storage"), component: UploadDocument });

function UploadDocument() {
  const { user } = useRole();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState("other");
  const [projectId, setProjectId] = useState("none");
  const [isSigned, setIsSigned] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { selectRows<Project>("projects", "id,name", "", "name.asc").then(setProjects).catch(() => setProjects([])); }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || !file) return;
    if (file.size > 20 * 1024 * 1024) { setError("ไฟล์ต้องมีขนาดไม่เกิน 20 MB"); return; }
    setSaving(true); setError(null);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${user.id}/${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}`;
    try {
      await uploadStorageObject("e_documents", path, file);
      await insertRow("documents", { file_name: file.name, file_url: path, type, uploader_id: user.id, project_id: projectId === "none" ? null : projectId, is_signed: isSigned });
      await navigate({ to: "/documents" });
    } catch (cause) { setError(cause instanceof Error ? cause.message : "อัปโหลดเอกสารไม่สำเร็จ"); }
    finally { setSaving(false); }
  };

  return <AppShell title="อัปโหลดเอกสาร" description="ไฟล์จะถูกเก็บในพื้นที่ส่วนตัวของ Supabase" roles="เทรนนี่ / พี่เลี้ยง">
    <Section title="รายละเอียดเอกสาร">
      <form className="grid max-w-2xl gap-4" onSubmit={submit}>
        <div className="space-y-2"><Label htmlFor="file">ไฟล์ (ไม่เกิน 20 MB)</Label><Input id="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} />{file && <p className="text-xs text-muted-foreground">{file.name}</p>}</div>
        <div className="space-y-2"><Label>ประเภทเอกสาร</Label><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="internship">เอกสารฝึกงาน</SelectItem><SelectItem value="project">เอกสารโปรเจ็กต์</SelectItem><SelectItem value="official">เอกสารทางการ</SelectItem><SelectItem value="other">อื่น ๆ</SelectItem></SelectContent></Select></div>
        <div className="space-y-2"><Label>โปรเจ็กต์ที่เกี่ยวข้อง (ถ้ามี)</Label><Select value={projectId} onValueChange={setProjectId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">ไม่ระบุโปรเจ็กต์</SelectItem>{projects.map((project) => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)}</SelectContent></Select></div>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={isSigned} onCheckedChange={(checked) => setIsSigned(checked === true)} />เอกสารนี้ลงนามแล้ว</label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button disabled={!file || saving}>{saving ? "กำลังอัปโหลด..." : "อัปโหลดเอกสาร"}</Button>
      </form>
    </Section>
  </AppShell>;
}
