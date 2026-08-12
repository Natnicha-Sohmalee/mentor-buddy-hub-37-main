import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import * as data from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  head: () => pageHead("ผลการค้นหา/กรองข้อมูล", "ค้นหาเทรนนี่ พี่เลี้ยง หรือโปรเจ็คตามเงื่อนไขที่กำหนด"),
  component: SearchPage,
});

function SearchPage() {
  return (
    <AppShell title="ผลการค้นหา/กรองข้อมูล" description="ค้นหาเทรนนี่ พี่เลี้ยง หรือโปรเจ็คตามเงื่อนไขที่กำหนด" roles="เทรนนี่ / พี่เลี้ยง / แอดมิน">
      <Section>
        <div className="grid gap-3 md:grid-cols-5">
          <Input placeholder="คำค้นหา" />
          <Select><SelectTrigger><SelectValue placeholder="ทีม" /></SelectTrigger><SelectContent>{data.traineeTeams.map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="บ้าน" /></SelectTrigger><SelectContent>{data.houses.map((h)=>(<SelectItem key={h} value={h}>{h}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="สถานะ" /></SelectTrigger><SelectContent>{["มีงาน","ว่างงาน"].map((s)=>(<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select>
          <Select><SelectTrigger><SelectValue placeholder="ระยะเวลาฝึกงาน" /></SelectTrigger><SelectContent>{["น้อยกว่า 3 เดือน","3-4 เดือน","มากกว่า 4 เดือน"].map((s)=>(<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select>
        </div>
      </Section>
      <Section title="ผลการค้นหา: เทรนนี่">
        <ul className="grid gap-2 sm:grid-cols-2">
          {data.trainees.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <Link to="/trainees/$traineeId" params={{ traineeId: t.id }} className="font-medium hover:underline">{t.nickname}</Link>
              <span className="text-muted-foreground">{t.team} · {t.house}</span>
            </li>
          ))}
        </ul>
      </Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="ผลการค้นหา: พี่เลี้ยง">
          <ul className="space-y-2">{data.mentors.map((m) => (<li key={m.id} className="rounded-lg border border-border p-3 text-sm"><Link to="/mentors/$mentorId" params={{ mentorId: m.id }} className="font-medium hover:underline">{m.nickname}</Link> · {m.team}</li>))}</ul>
        </Section>
        <Section title="ผลการค้นหา: โปรเจ็ค">
          <ul className="space-y-2">{data.projects.map((p) => (<li key={p.id} className="rounded-lg border border-border p-3 text-sm"><Link to="/projects/$projectId" params={{ projectId: p.id }} className="font-medium hover:underline">{p.name}</Link> · {p.house}</li>))}</ul>
        </Section>
      </div>
    </AppShell>
  );
}
