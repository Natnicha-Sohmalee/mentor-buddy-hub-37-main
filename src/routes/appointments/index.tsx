import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { appointments } from "@/lib/mock-data";

export const Route = createFileRoute("/appointments/")({
  head: () => pageHead("ปฏิทินนัดหมาย", "มุมมองปฏิทินรายเดือน/สัปดาห์ พร้อมกรองประเภทนัดหมาย"),
  component: CalendarPage,
});

const types = ["นิเทศฝึกงาน", "ปรึกษา", "ประชุม", "อื่นๆ"];

function CalendarPage() {
  const [view, setView] = useState("month");
  const [type, setType] = useState("all");
  const shown = appointments.filter((a) => type === "all" || a.type === type);

  const days = Array.from({ length: 35 }, (_, i) => i - 4);

  return (
    <AppShell
      title="ปฏิทิน / ตารางนัดหมาย"
      description="สิงหาคม 2569"
      roles="เทรนนี่ / พี่เลี้ยง"
      actions={
        <Button asChild>
          <Link to="/appointments/create">สร้างนัดหมาย</Link>
        </Button>
      }
    >
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="month">รายเดือน</TabsTrigger>
              <TabsTrigger value="week">รายสัปดาห์</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="ประเภทนัดหมาย" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ประเภท: ทั้งหมด</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <Switch /> เชื่อมต่อ Google Calendar
          </label>
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section className="lg:col-span-2" title={view === "month" ? "มุมมองรายเดือน" : "มุมมองรายสัปดาห์"}>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
              <div key={d} className="py-1 font-medium">
                {d}
              </div>
            ))}
            {(view === "month" ? days : days.slice(7, 14)).map((d) => {
              const inMonth = d >= 1 && d <= 31;
              const dayEvents = shown.filter((a) => Number(a.date.slice(-2)) === d);
              return (
                <div
                  key={d}
                  className={`min-h-20 rounded-md border border-border p-1 text-left ${inMonth ? "" : "opacity-40"}`}
                >
                  <span className="text-[11px] font-medium">{inMonth ? d : ""}</span>
                  {dayEvents.map((e) => (
                    <Link
                      key={e.id}
                      to="/appointments/$appointmentId"
                      params={{ appointmentId: e.id }}
                      className="mt-1 block truncate rounded bg-primary px-1 py-0.5 text-[10px] text-primary-foreground"
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="นัดหมายที่กำลังจะถึง">
          <ul className="space-y-3">
            {shown.map((a) => (
              <li key={a.id} className="rounded-lg border border-border p-3">
                <Link
                  to="/appointments/$appointmentId"
                  params={{ appointmentId: a.id }}
                  className="font-medium hover:underline"
                >
                  {a.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {a.date} · {a.time}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">{a.type}</Badge>
                  <Badge variant="secondary">{a.mode}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}
