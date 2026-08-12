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

export const Route = createFileRoute("/projects/$projectId/diagram")({
  head: () => pageHead("แก้ไข Diagram ขั้นตอนโปรเจ็ค", "สร้างและแก้ไขผังขั้นตอนการทำงานของโปรเจ็ค พร้อมกำหนดผู้เกี่ยวข้องแต่ละขั้นตอน"),
  component: DiagramEditor,
});

function DiagramEditor() {
  const { projectId } = Route.useParams();
  return (
    <AppShell title="แก้ไข Diagram ขั้นตอนโปรเจ็ค" description="ลากเรียงลำดับขั้นตอน กำหนดรายละเอียดและผู้เกี่ยวข้อง" roles="พี่เลี้ยง (ทุกคนในโปรเจ็ค)"
      actions={<><Button variant="outline" asChild><Link to="/projects/$projectId" params={{ projectId }}>ยกเลิก</Link></Button><Button>บันทึกผัง</Button></>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ผังขั้นตอน" className="lg:col-span-2">
          <div className="space-y-2">
            {data.workflowSteps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">{i + 1}</span>
                <Input defaultValue={s.name} className="max-w-56" />
                <Input defaultValue={s.owner} className="max-w-48" />
                <Button variant="ghost" size="sm" className="ml-auto">ลบ</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">+ เพิ่มขั้นตอนใหม่</Button>
          </div>
        </Section>
        <Section title="รายละเอียดขั้นตอนที่เลือก">
          <div className="grid gap-4">
            <div className="space-y-2"><Label htmlFor="sn">ชื่อขั้นตอน</Label><Input id="sn" defaultValue={data.workflowSteps[0]!.name} /></div>
            <div className="space-y-2"><Label htmlFor="sd">รายละเอียด</Label><Textarea id="sd" rows={4} defaultValue={data.workflowSteps[0]!.detail} /></div>
            <div className="space-y-2"><Label>ผู้เกี่ยวข้อง</Label>
              <ul className="space-y-2">{[...data.mentors.map((m) => m.nickname), ...data.trainees.slice(0, 3).map((t) => t.nickname)].map((n) => (<li key={n}><label className="flex items-center gap-2 rounded-lg border border-border p-2 text-sm"><Checkbox /> {n}</label></li>))}</ul>
            </div>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
