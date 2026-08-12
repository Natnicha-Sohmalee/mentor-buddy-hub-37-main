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

export const Route = createFileRoute("/extensions/")({
  head: () => pageHead("รายการคำขอขยายเวลา", "ตรวจสอบและบันทึกผลการพิจารณาคำขอขยายเวลาฝึกงาน"),
  component: ExtensionList,
});

function ExtensionList() {
  return (
    <AppShell title="รายการคำขอขยายเวลา" description="ตรวจสอบและบันทึกผลการพิจารณาคำขอขยายเวลาฝึกงาน" roles="แอดมิน">
      <Section>
        <Table>
          <TableHeader><TableRow><TableHead>เทรนนี่</TableHead><TableHead>โปรเจ็ค</TableHead><TableHead>วันจบเดิม</TableHead><TableHead>วันจบใหม่</TableHead><TableHead>เหตุผล</TableHead><TableHead>สถานะ</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {data.extensionRequests.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.trainee}</TableCell>
                <TableCell>{r.project}</TableCell>
                <TableCell>{r.currentEnd}</TableCell>
                <TableCell>{r.newEnd}</TableCell>
                <TableCell className="max-w-64 text-muted-foreground">{r.reason}</TableCell>
                <TableCell><Badge variant={r.status === "อนุมัติ" ? "default" : r.status === "ไม่อนุมัติ" ? "destructive" : "secondary"}>{r.status}</Badge></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="outline">บันทึกผลพิจารณา</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
