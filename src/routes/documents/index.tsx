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

export const Route = createFileRoute("/documents/")({
  head: () => pageHead("รายการเอกสาร", "เอกสารทั้งหมดในระบบ พร้อมตัวกรองประเภท โปรเจ็ค และเจ้าของเอกสาร"),
  component: DocumentList,
});

function DocumentList() {
  return (
    <AppShell title="รายการเอกสาร" description="เอกสารทั้งหมดในระบบ พร้อมตัวกรองประเภท โปรเจ็ค และเจ้าของเอกสาร" roles="เทรนนี่ / พี่เลี้ยง / แอดมิน" actions={<Button asChild><Link to="/documents/upload">อัปโหลดเอกสาร</Link></Button>}>
      <Section>
        <div className="grid gap-3 sm:grid-cols-3">
          <Select><SelectTrigger><SelectValue placeholder="ประเภทเอกสาร" /></SelectTrigger><SelectContent>{["รายงานฝึกงาน","เอกสารโปรเจ็ค","อื่นๆ"].map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="โปรเจ็ค" /></SelectTrigger><SelectContent>{data.projects.map((p)=>(<SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="เจ้าของเอกสาร" /></SelectTrigger><SelectContent>{data.trainees.map((t)=>(<SelectItem key={t.id} value={t.nickname}>{t.nickname}</SelectItem>))}</SelectContent></Select>
        </div>
      </Section>
      <Section>
        <Table>
          <TableHeader><TableRow><TableHead>ชื่อไฟล์</TableHead><TableHead>ประเภท</TableHead><TableHead>โปรเจ็ค</TableHead><TableHead>เจ้าของ</TableHead><TableHead>อัปโหลด</TableHead><TableHead>สถานะเซ็น</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {data.documents.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>{d.project}</TableCell>
                <TableCell>{d.owner}</TableCell>
                <TableCell>{d.uploadedAt}</TableCell>
                <TableCell><Badge variant="secondary">{d.signed}</Badge></TableCell>
                <TableCell className="text-right"><Button asChild size="sm" variant="ghost"><Link to="/documents/$documentId" params={{ documentId: d.id }}>เปิดดู</Link></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
