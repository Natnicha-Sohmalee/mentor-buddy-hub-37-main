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

export const Route = createFileRoute("/leaves/request")({
  head: () => pageHead("ยื่นคำขอลา", "เลือกประเภทการลา ระบุวันที่และเหตุผล"),
  component: LeaveRequest,
});

function LeaveRequest() {
  return (
    <AppShell title="ยื่นคำขอลา" description="เลือกประเภทการลา ระบุวันที่และเหตุผล" roles="เทรนนี่">
      <Section title="แบบฟอร์มคำขอลา">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label>ประเภทการลา</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกประเภท" /></SelectTrigger><SelectContent>{["ลาป่วย","ลากิจ"].map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="from">วันที่เริ่ม</Label><Input id="from" type="date" /></div>
            <div className="space-y-2"><Label htmlFor="to">วันที่สิ้นสุด</Label><Input id="to" type="date" /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="reason">เหตุผลการลา</Label><Textarea id="reason" rows={5} /></div>
          <Button type="submit">ส่งคำขอลา</Button>
        </form>
      </Section>
    </AppShell>
  );
}
