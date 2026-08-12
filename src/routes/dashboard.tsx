import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { pageHead } from "@/lib/head";
import { cohortStats, houses, projects, trainees } from "@/lib/mock-data";
import { Download, FileSpreadsheet, Users, UserCheck, UserMinus, CalendarRange } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () =>
    pageHead("Dashboard ภาพรวมระบบ", "ภาพรวมเทรนนี่ กำลังคน สถิติ Standup และการคาดการณ์สำหรับแอดมิน"),
  component: DashboardPage,
});

function DashboardPage() {
  const working = trainees.filter((t) => t.status === "มีงาน").length;
  const idle = trainees.length - working;

  return (
    <AppShell
      title="Dashboard ภาพรวมระบบ"
      description="สถิติภาพรวมของเทรนนี่ โปรเจ็ค และกำลังคนทั้งองค์กร"
      roles="แอดมิน"
      actions={
        <>
          <Button variant="outline">
            <Download className="size-4" /> Export PDF
          </Button>
          <Button>
            <FileSpreadsheet className="size-4" /> Export Excel
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="เทรนนี่ทั้งหมด" value={trainees.length} hint="กำลังฝึกงานในระบบ" icon={<Users className="size-5" />} />
        <StatCard label="มีงาน" value={working} hint={`คิดเป็น ${Math.round((working / trainees.length) * 100)}%`} icon={<UserCheck className="size-5" />} />
        <StatCard label="ว่างงาน" value={idle} hint="รอมอบหมายโปรเจ็ค" icon={<UserMinus className="size-5" />} />
        <StatCard label="เข้าใหม่รอบนี้" value={24} hint="รอบ พ.ค. 69" icon={<CalendarRange className="size-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="ระยะเวลาการฝึกงานของเทรนนี่" description="วันที่เริ่ม / วันที่จบ / จำนวนวันรวม">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>เทรนนี่</TableHead>
                <TableHead>เริ่ม</TableHead>
                <TableHead>จบ</TableHead>
                <TableHead className="text-right">รวม (วัน)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainees.slice(0, 6).map((t) => {
                const days = Math.round(
                  (new Date(t.endDate).getTime() - new Date(t.startDate).getTime()) / 86400000,
                );
                return (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.nickname}</TableCell>
                    <TableCell>{t.startDate}</TableCell>
                    <TableCell>{t.endDate}</TableCell>
                    <TableCell className="text-right">{days}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Section>

        <Section title="เทรนนี่เข้าใหม่ / กำลังฝึกจบ" description="แยกตามรอบการรับเข้า">
          <ul className="space-y-3">
            {cohortStats.map((c) => (
              <li key={c.cohort}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{c.cohort}</span>
                  <span className="text-muted-foreground">
                    เข้าใหม่ {c.entering} · จบ {c.graduating}
                  </span>
                </div>
                <Progress value={Math.min(100, (c.entering / 30) * 100)} />
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-accent p-3 text-xs text-accent-foreground">
            การคาดการณ์: ช่วงพีคของจำนวนเทรนนี่คือรอบ ก.ย. 69 ประมาณ 28 คน ควรเตรียมพี่เลี้ยงเพิ่มอย่างน้อย 3 คน
          </p>
        </Section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="จำนวนเทรนนี่ต่อโปรเจ็ค">
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.house} · พี่เลี้ยง {p.mentorCount} คน
                  </p>
                </div>
                <Badge variant="secondary">{p.traineeCount} เทรนนี่</Badge>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="สถิติ Standup และการลา" description="ข้อมูลย้อนหลัง 30 วัน">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="เข้า Standup ตรงเวลา" value="87%" />
            <StatCard label="ลาป่วย" value="12 ครั้ง" />
            <StatCard label="ลากิจ" value="7 ครั้ง" />
          </div>
        </Section>
      </div>

      <Section title="ตาราง Demand / Supply กำลังคน" description="เปรียบเทียบความต้องการกับกำลังคนที่มี">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>บ้าน</TableHead>
              <TableHead>โปรเจ็ค</TableHead>
              <TableHead className="text-right">ต้องการ</TableHead>
              <TableHead className="text-right">มีอยู่</TableHead>
              <TableHead className="text-right">ส่วนต่าง</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p, i) => {
              const demand = p.traineeCount + (i % 3);
              const diff = p.traineeCount - demand;
              return (
                <TableRow key={p.id}>
                  <TableCell>{houses[i % houses.length]}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right">{demand}</TableCell>
                  <TableCell className="text-right">{p.traineeCount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={diff < 0 ? "destructive" : "secondary"}>{diff}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
