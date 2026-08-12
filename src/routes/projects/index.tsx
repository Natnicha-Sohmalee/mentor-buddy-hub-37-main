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

export const Route = createFileRoute("/projects/")({
  head: () => pageHead("รายการโปรเจ็ค", "โปรเจ็คทั้งหมดพร้อมตัวกรองประเภท บ้าน และพี่เลี้ยงผู้ดูแล"),
  component: ProjectList,
});

function ProjectList() {
  return (
    <AppShell title="รายการโปรเจ็ค" description="โปรเจ็คทั้งหมดพร้อมตัวกรองประเภท บ้าน และพี่เลี้ยงผู้ดูแล" roles="เทรนนี่ / พี่เลี้ยง / แอดมิน" actions={<Button asChild><Link to="/projects/create">สร้างโปรเจ็คใหม่</Link></Button>}>
      <Section>
        <div className="grid gap-3 sm:grid-cols-3">
          <Select><SelectTrigger><SelectValue placeholder="ประเภทโปรเจ็ค" /></SelectTrigger><SelectContent>{data.projectTypes.map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="บ้าน" /></SelectTrigger><SelectContent>{data.houses.map((h)=>(<SelectItem key={h} value={h}>{h}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="พี่เลี้ยงผู้ดูแล" /></SelectTrigger><SelectContent>{data.mentors.map((m)=>(<SelectItem key={m.id} value={m.nickname}>{m.nickname}</SelectItem>))}</SelectContent></Select>
        </div>
      </Section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.projects.map((p) => (
          <div key={p.id} className="surface flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{p.name}</h2>
              <Badge variant="secondary">{p.type}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">{p.house} · ดูแลโดย {p.owner}</p>
            <div className="mt-3"><Progress value={p.progress} /><p className="mt-1 text-xs text-muted-foreground">ความคืบหน้า {p.progress}%</p></div>
            <div className="mt-3 flex gap-2 text-xs text-muted-foreground"><span>เทรนนี่ {p.traineeCount}</span><span>พี่เลี้ยง {p.mentorCount}</span></div>
            <Button asChild size="sm" variant="outline" className="mt-4"><Link to="/projects/$projectId" params={{ projectId: p.id }}>ดูรายละเอียด</Link></Button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
