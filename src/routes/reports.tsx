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

export const Route = createFileRoute("/reports")({
  head: () => pageHead("Export รายงาน", "เลือกประเภทรายงานและช่วงเวลา แล้ว Export เป็น PDF หรือ Excel"),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <AppShell title="Export รายงาน" description="เลือกประเภทรายงานและช่วงเวลา แล้ว Export เป็น PDF หรือ Excel" roles="แอดมิน">
      <Section title="ตั้งค่ารายงาน">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label>ประเภทรายงาน</Label>
            <Select><SelectTrigger><SelectValue placeholder="เลือกประเภทรายงาน" /></SelectTrigger><SelectContent>{["รายงานเทรนนี่ทั้งหมด","รายงานกำลังคน Demand/Supply","รายงาน Standup และการลา","รายงานความคืบหน้าโปรเจ็ค","รายงานคำขอขยายเวลา"].map((r)=>(<SelectItem key={r} value={r}>{r}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="from">ตั้งแต่วันที่</Label><Input id="from" type="date" /></div>
            <div className="space-y-2"><Label htmlFor="to">ถึงวันที่</Label><Input id="to" type="date" /></div>
          </div>
          <div className="flex gap-2"><Button type="button">Export PDF</Button><Button type="button" variant="outline">Export Excel</Button></div>
        </form>
      </Section>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="รายงานที่สร้างเดือนนี้" value={14} />
        <StatCard label="รายงานล่าสุด" value="10 ส.ค. 2569" />
        <StatCard label="รูปแบบที่ใช้บ่อย" value="Excel" />
      </div>
    </AppShell>
  );
}
