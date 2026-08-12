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

export const Route = createFileRoute("/admin/master-data")({
  head: () => pageHead("จัดการข้อมูลอ้างอิง", "จัดการทีมเทรนนี่ บ้านและหัวหน้าบ้าน รวมถึงทีมพี่เลี้ยง"),
  component: MasterData,
});

function MasterData() {
  return (
    <AppShell title="จัดการข้อมูลอ้างอิง" description="จัดการทีมเทรนนี่ บ้านและหัวหน้าบ้าน รวมถึงทีมพี่เลี้ยง" roles="แอดมิน">
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ทีมเทรนนี่">
          <div className="mb-3 flex gap-2"><Input placeholder="ชื่อทีมใหม่" /><Button>เพิ่ม</Button></div>
          <ul className="space-y-2">{data.traineeTeams.map((t) => (<li key={t} className="flex items-center justify-between rounded-lg border border-border p-2 text-sm">{t}<span className="space-x-1"><Button size="sm" variant="ghost">แก้ไข</Button><Button size="sm" variant="ghost">ลบ</Button></span></li>))}</ul>
        </Section>
        <Section title="บ้านและหัวหน้าบ้าน">
          <div className="mb-3 flex gap-2"><Input placeholder="ชื่อบ้านใหม่" /><Button>เพิ่ม</Button></div>
          <ul className="space-y-2">{data.houses.map((h, i) => (<li key={h} className="rounded-lg border border-border p-3 text-sm"><p className="font-medium">{h}</p><p className="text-xs text-muted-foreground">หัวหน้าบ้าน: {data.mentors[i % data.mentors.length]!.nickname}</p></li>))}</ul>
        </Section>
        <Section title="ทีมพี่เลี้ยง">
          <div className="mb-3 flex gap-2"><Input placeholder="ชื่อทีมพี่เลี้ยงใหม่" /><Button>เพิ่ม</Button></div>
          <ul className="space-y-2">{data.mentorTeams.map((t) => (<li key={t} className="flex items-center justify-between rounded-lg border border-border p-2 text-sm">{t}<span className="space-x-1"><Button size="sm" variant="ghost">แก้ไข</Button><Button size="sm" variant="ghost">ลบ</Button></span></li>))}</ul>
        </Section>
      </div>
    </AppShell>
  );
}
