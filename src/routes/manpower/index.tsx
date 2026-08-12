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

export const Route = createFileRoute("/manpower/")({
  head: () => pageHead("รายการคำขอกำลังคน", "คำขอกำลังคนทั้งหมดพร้อมสถานะเปิด/ปิดรับ"),
  component: ManpowerList,
});

function ManpowerList() {
  return (
    <AppShell title="รายการคำขอกำลังคน" description="คำขอกำลังคนทั้งหมดพร้อมสถานะเปิด/ปิดรับ" roles="แอดมิน / พี่เลี้ยง" actions={<Button asChild><Link to="/manpower/request">ยื่นคำขอใหม่</Link></Button>}>
      <Section>
        <Table>
          <TableHeader><TableRow><TableHead>โปรเจ็ค</TableHead><TableHead>บ้าน</TableHead><TableHead>ทีม/ตำแหน่ง</TableHead><TableHead className="text-right">จำนวน</TableHead><TableHead>ผู้ยื่น</TableHead><TableHead>วันที่ยื่น</TableHead><TableHead>สถานะ</TableHead></TableRow></TableHeader>
          <TableBody>
            {data.manpowerRequests.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.project}</TableCell>
                <TableCell>{r.house}</TableCell>
                <TableCell>{r.team} · {r.position}</TableCell>
                <TableCell className="text-right">{r.amount}</TableCell>
                <TableCell>{r.requester}</TableCell>
                <TableCell>{r.createdAt}</TableCell>
                <TableCell><Badge variant={r.status === "เปิดรับ" ? "default" : "outline"}>{r.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
