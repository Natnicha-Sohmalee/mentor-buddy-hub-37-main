import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import * as data from "@/lib/mock-data";

export const Route = createFileRoute("/documents/upload")({
  head: () => pageHead("อัปโหลดเอกสาร", "แนบไฟล์ เลือกประเภทเอกสาร และโปรเจ็คที่เกี่ยวข้อง"),
  component: UploadDocument,
});

function UploadDocument() {
  return (
    <AppShell title="อัปโหลดเอกสาร" description="แนบไฟล์ เลือกประเภทเอกสาร และโปรเจ็คที่เกี่ยวข้อง" roles="เทรนนี่ / พี่เลี้ยง">
      <Section title="ฟอร์มอัปโหลด">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-10 text-sm text-muted-foreground hover:bg-muted">
            คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่ (PDF, DOCX, XLSX ไม่เกิน 20MB)
            <input type="file" className="hidden" />
          </label>
          <div className="space-y-2"><Label>ประเภทเอกสาร</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกประเภท" /></SelectTrigger><SelectContent>{["รายงานฝึกงาน","เอกสารโปรเจ็ค","อื่นๆ"].map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label>โปรเจ็คที่เกี่ยวข้อง (ถ้ามี)</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกโปรเจ็ค" /></SelectTrigger><SelectContent>{data.projects.map((p)=>(<SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label htmlFor="note">หมายเหตุ</Label><Textarea id="note" rows={3} /></div>
          <Button type="submit">อัปโหลดเอกสาร</Button>
        </form>
      </Section>
    </AppShell>
  );
}
