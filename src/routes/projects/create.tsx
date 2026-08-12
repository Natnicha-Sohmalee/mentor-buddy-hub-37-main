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

export const Route = createFileRoute("/projects/create")({
  head: () => pageHead("สร้างโปรเจ็คใหม่", "กำหนดชื่อ ประเภท และสังกัดของโปรเจ็ค"),
  component: CreateProject,
});

function CreateProject() {
  return (
    <AppShell title="สร้างโปรเจ็คใหม่" description="กำหนดชื่อ ประเภท และสังกัดของโปรเจ็ค" roles="แอดมิน">
      <Section title="ข้อมูลโปรเจ็ค">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label htmlFor="name">ชื่อโปรเจ็ค</Label><Input id="name" placeholder="เช่น ระบบจัดการเทรนนี่" /></div>
          <div className="space-y-2"><Label>ประเภทโปรเจ็ค</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกประเภท" /></SelectTrigger><SelectContent>{data.projectTypes.map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label>สังกัดบ้าน</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกบ้าน" /></SelectTrigger><SelectContent>{data.houses.map((h)=>(<SelectItem key={h} value={h}>{h}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label>หรือกำหนดพี่เลี้ยงผู้ดูแลโดยตรง</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกพี่เลี้ยง" /></SelectTrigger><SelectContent>{data.mentors.map((m)=>(<SelectItem key={m.id} value={m.nickname}>{m.nickname}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label htmlFor="desc">คำอธิบายโปรเจ็ค</Label><Textarea id="desc" rows={4} /></div>
          <Button type="submit">สร้างโปรเจ็ค</Button>
        </form>
      </Section>
    </AppShell>
  );
}
