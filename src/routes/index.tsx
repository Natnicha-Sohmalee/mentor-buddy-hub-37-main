import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { pageHead } from "@/lib/head";
import { appointments, notifications, tasks } from "@/lib/mock-data";
import { CalendarDays, CheckCircle2, ClipboardList, FileUp, PlusCircle, BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead("ภาพรวมของฉัน", "สรุปงานที่ต้องทำ นัดหมายที่ใกล้ถึง และการแจ้งเตือนล่าสุดของคุณ"),
  component: MyHome,
});

function MyHome() {
  const myTasks = tasks.filter((t) => t.assignee === "มายด์" || t.status !== "done");
  const openTasks = myTasks.filter((t) => t.status !== "done");
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <AppShell
      title="ภาพรวมของฉัน"
      description="สรุปสิ่งที่ต้องทำวันนี้ และความเคลื่อนไหวล่าสุด"
      roles="เทรนนี่ / พี่เลี้ยง"
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/standup">เช็คอิน Standup</Link>
          </Button>
          <Button asChild>
            <Link to="/tasks/board">ไปที่บอร์ดงาน</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="งานที่ยังไม่เสร็จ" value={openTasks.length} hint="รวมทุกสถานะที่ไม่ใช่ Done" icon={<ClipboardList className="size-5" />} />
        <StatCard label="งานที่ทำเสร็จแล้ว" value={doneCount} hint="สะสมทั้งหมด" icon={<CheckCircle2 className="size-5" />} />
        <StatCard label="นัดหมายสัปดาห์นี้" value={appointments.length} hint="รวมทุกประเภท" icon={<CalendarDays className="size-5" />} />
        <StatCard label="ความคืบหน้าการฝึกงาน" value="72%" hint="4 พ.ค. – 28 ส.ค. 2569" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section
          title="งานที่ต้องทำวันนี้"
          className="lg:col-span-2"
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link to="/tasks/board">ดูทั้งหมด</Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {openTasks.slice(0, 5).map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <Link to="/tasks/$taskId" params={{ taskId: t.id }} className="font-medium hover:underline">
                    {t.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {t.id} · กำหนดส่ง {t.due} · ระดับความสำคัญ {t.priority}
                  </p>
                </div>
                <Badge variant="secondary">{t.project}</Badge>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="นัดหมายที่ใกล้ถึง">
          <ul className="space-y-3">
            {appointments.slice(0, 3).map((a) => (
              <li key={a.id} className="rounded-lg border border-border p-3">
                <Link to="/appointments/$appointmentId" params={{ appointmentId: a.id }} className="font-medium hover:underline">
                  {a.title}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {a.date} · {a.time} · {a.mode === "online" ? "ออนไลน์" : "on-site"}
                </p>
                <Badge className="mt-2" variant="outline">
                  {a.type}
                </Badge>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="การแจ้งเตือนล่าสุด" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className={n.unread ? "font-medium" : "text-muted-foreground"}>{n.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="ทางลัด">
          <div className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/tasks/create">
                <PlusCircle className="size-4" /> มอบหมายงาน
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/documents/upload">
                <FileUp className="size-4" /> อัปโหลดเอกสาร
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/knowledge">
                <BookOpen className="size-4" /> ดูบทความความรู้
              </Link>
            </Button>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-xs text-muted-foreground">ความคืบหน้าโปรเจ็คหลัก</p>
            <Progress value={68} />
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
