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

export const Route = createFileRoute("/leaves/")({
  head: () => pageHead("รายการการลา", "คำขอลาทั้งหมดของเทรนนี่พร้อมสถานะการอนุมัติ"),
  component: LeaveList,
});

function LeaveList() {
  return (
    <AppShell title="รายการการลา" description="คำขอลาทั้งหมดของเทรนนี่พร้อมสถานะการอนุมัติ" roles="พี่เลี้ยง / แอดมิน" actions={<Button asChild variant="outline"><Link to="/leaves/request">ยื่นคำขอลา</Link></Button>}>
      <Section>
        <Table>
          <TableHeader><TableRow><TableHead>เทรนนี่</TableHead><TableHead>ประเภท</TableHead><TableHead>ตั้งแต่</TableHead><TableHead>ถึง</TableHead><TableHead className="text-right">จำนวนวัน</TableHead><TableHead>เหตุผล</TableHead><TableHead>สถานะ</TableHead></TableRow></TableHeader>
          <TableBody>
            {data.leaves.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.trainee}</TableCell><TableCell>{l.type}</TableCell><TableCell>{l.from}</TableCell><TableCell>{l.to}</TableCell>
                <TableCell className="text-right">{l.days}</TableCell><TableCell className="text-muted-foreground">{l.reason}</TableCell>
                <TableCell><Badge variant={l.status === "อนุมัติ" ? "default" : "secondary"}>{l.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
