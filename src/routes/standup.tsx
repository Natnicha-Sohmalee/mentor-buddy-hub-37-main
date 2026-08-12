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

export const Route = createFileRoute("/standup")({
  head: () => pageHead("เช็คอิน Standup", "เช็คอินตามรอบเวลาที่กำหนด และดูประวัติการเข้าร่วมย้อนหลัง"),
  component: StandupPage,
});

function StandupPage() {
  return (
    <AppShell title="เช็คอิน Standup" description="เช็คอินตามรอบเวลาที่กำหนด และดูประวัติการเข้าร่วมย้อนหลัง" roles="เทรนนี่">
      <div className="grid gap-4 sm:grid-cols-3">
        {data.standupRounds.map((r) => (
          <div key={r.id} className="surface p-5 text-center">
            <p className="font-semibold">{r.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.window}</p>
            <Button className="mt-4 w-full">เช็คอิน</Button>
          </div>
        ))}
      </div>
      <Section title="ประวัติการเข้าร่วม Standup">
        <Table>
          <TableHeader><TableRow><TableHead>วันที่</TableHead><TableHead>รอบ</TableHead><TableHead>เวลาเช็คอิน</TableHead><TableHead>สถานะ</TableHead></TableRow></TableHeader>
          <TableBody>
            {data.standupHistory.map((h) => (
              <TableRow key={h.date + h.round}>
                <TableCell>{h.date}</TableCell><TableCell>{h.round}</TableCell><TableCell>{h.time}</TableCell>
                <TableCell><Badge variant={h.status === "ตรงเวลา" ? "default" : "secondary"}>{h.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
