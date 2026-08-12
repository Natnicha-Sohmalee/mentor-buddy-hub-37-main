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

export const Route = createFileRoute("/manpower/request")({
  head: () => pageHead("ยื่นคำขอกำลังคน", "ระบุโปรเจ็ค ทีม ตำแหน่ง และจำนวนกำลังคนที่ต้องการ"),
  component: ManpowerRequest,
});

function ManpowerRequest() {
  return (
    <AppShell title="ยื่นคำขอกำลังคน" description="ระบุโปรเจ็ค ทีม ตำแหน่ง และจำนวนกำลังคนที่ต้องการ" roles="พี่เลี้ยง / บ้าน">
      <Section title="แบบฟอร์มคำขอกำลังคน">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label>โปรเจ็คที่ต้องการกำลังคนเพิ่ม</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกโปรเจ็ค" /></SelectTrigger><SelectContent>{data.projects.map((p)=>(<SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2"><Label>ทีม</Label>
              <Select><SelectTrigger><SelectValue placeholder="เลือกทีม" /></SelectTrigger><SelectContent>{data.traineeTeams.map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label htmlFor="pos">ตำแหน่ง</Label><Input id="pos" placeholder="เช่น Frontend Trainee" /></div>
            <div className="space-y-2"><Label htmlFor="amt">จำนวน (คน)</Label><Input id="amt" type="number" min={1} defaultValue={1} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="note">รายละเอียดเพิ่มเติม</Label><Textarea id="note" rows={4} placeholder="ทักษะที่ต้องการ ระยะเวลาที่ต้องการกำลังคน" /></div>
          <Button type="submit">ส่งคำขอกำลังคน</Button>
        </form>
      </Section>
    </AppShell>
  );
}
