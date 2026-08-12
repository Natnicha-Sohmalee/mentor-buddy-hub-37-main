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

export const Route = createFileRoute("/issues/report")({
  head: () => pageHead("แจ้งปัญหา", "แจ้งปัญหาที่พบระหว่างฝึกงานและแก้ไขเองไม่ได้"),
  component: ReportIssue,
});

function ReportIssue() {
  return (
    <AppShell title="แจ้งปัญหา" description="แจ้งปัญหาที่พบระหว่างฝึกงานและแก้ไขเองไม่ได้" roles="เทรนนี่">
      <Section title="แบบฟอร์มแจ้งปัญหา">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label htmlFor="title">หัวข้อปัญหา</Label><Input id="title" placeholder="เช่น รันโปรเจ็คในเครื่องไม่ผ่าน" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>โปรเจ็คที่เกี่ยวข้อง</Label>
              <Select><SelectTrigger><SelectValue placeholder="เลือกโปรเจ็ค" /></SelectTrigger><SelectContent>{data.projects.map((p)=>(<SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>))}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>ระดับความรุนแรง</Label>
              <Select><SelectTrigger><SelectValue placeholder="เลือกระดับ" /></SelectTrigger><SelectContent>{["สูง","กลาง","ต่ำ"].map((s)=>(<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select>
            </div>
          </div>
          <div className="space-y-2"><Label htmlFor="detail">รายละเอียดปัญหาและสิ่งที่ลองแก้ไขแล้ว</Label><Textarea id="detail" rows={7} /></div>
          <Button type="submit">ส่งแจ้งปัญหา</Button>
        </form>
      </Section>
    </AppShell>
  );
}
