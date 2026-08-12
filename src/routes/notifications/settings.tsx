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

export const Route = createFileRoute("/notifications/settings")({
  head: () => pageHead("ตั้งค่าการแจ้งเตือน", "เลือกช่องทางรับการแจ้งเตือนแยกตามประเภทเหตุการณ์"),
  component: NotificationSettings,
});

function NotificationSettings() {
  return (
    <AppShell title="ตั้งค่าการแจ้งเตือน" description="เลือกช่องทางรับการแจ้งเตือนแยกตามประเภทเหตุการณ์" roles="เทรนนี่ / พี่เลี้ยง" actions={<Button>บันทึกการตั้งค่า</Button>}>
      <Section title="ช่องทางการแจ้งเตือน">
        <div className="space-y-3">
          {["เว็บไซต์ (In-app)", "อีเมล", "Discord"].map((c) => (
            <div key={c} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{c}</span><Switch defaultChecked />
            </div>
          ))}
        </div>
      </Section>
      <Section title="แจ้งเตือนตามประเภทเหตุการณ์">
        <Table>
          <TableHeader><TableRow><TableHead>เหตุการณ์</TableHead><TableHead className="text-center">In-app</TableHead><TableHead className="text-center">อีเมล</TableHead><TableHead className="text-center">Discord</TableHead></TableRow></TableHeader>
          <TableBody>
            {["ได้รับมอบหมายงานใหม่","งานถูกตีกลับ","นัดหมายใกล้ถึง","ผลการอนุมัติคำขอ","บทความได้รับอนุมัติ","เตือนเช็คอิน Standup"].map((e) => (
              <TableRow key={e}>
                <TableCell className="font-medium">{e}</TableCell>
                <TableCell className="text-center"><Checkbox defaultChecked /></TableCell>
                <TableCell className="text-center"><Checkbox /></TableCell>
                <TableCell className="text-center"><Checkbox /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
