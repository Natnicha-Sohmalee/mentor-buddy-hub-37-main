import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import { documents, tasks, trainees, taskStatusLabel } from "@/lib/mock-data";

export const Route = createFileRoute("/trainees/$traineeId")({
  loader: ({ params }) => {
    const trainee = trainees.find((t) => t.id === params.traineeId);
    if (!trainee) throw notFound();
    return { trainee };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(`เทรนนี่ ${loaderData.trainee.nickname}`, `ข้อมูลโปรไฟล์ งาน และเอกสารของ ${loaderData.trainee.fullName}`)
      : pageHead("ไม่พบเทรนนี่", "ไม่พบข้อมูลเทรนนี่ที่ระบุ"),
  component: TraineeDetail,
});

function TraineeDetail() {
  const { trainee } = Route.useLoaderData();
  const myTasks = tasks.filter((t) => t.assignee === trainee.nickname);
  const myDocs = documents.filter((d) => d.owner === trainee.nickname);

  return (
    <AppShell
      title={`เทรนนี่: ${trainee.nickname}`}
      description={trainee.fullName}
      roles="พี่เลี้ยง / แอดมิน"
      actions={
        <Button asChild variant="outline">
          <Link to="/trainees">กลับรายชื่อ</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ข้อมูลโปรไฟล์">
          <dl className="space-y-2 text-sm">
            <Row label="อีเมล" value={trainee.emailPublic ? trainee.email : "ไม่เปิดเผย"} />
            <Row label="ทีม" value={trainee.team} />
            <Row label="บ้าน" value={trainee.house} />
            <Row label="ตำแหน่ง" value={trainee.position} />
            <Row label="ระยะเวลาฝึกงาน" value={`${trainee.startDate} – ${trainee.endDate}`} />
            <Row label="โปรเจ็ค" value={trainee.project} />
          </dl>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">สถานะปัจจุบัน:</span>
            <Badge variant={trainee.status === "มีงาน" ? "default" : "outline"}>{trainee.status}</Badge>
          </div>
        </Section>

        <Section title="พี่เลี้ยงที่ดูแล">
          <div className="rounded-lg border border-border p-4">
            <p className="font-medium">{trainee.mentor}</p>
            <p className="text-sm text-muted-foreground">ดูแลโปรเจ็ค {trainee.project}</p>
            <Button asChild size="sm" variant="outline" className="mt-3">
              <Link to="/mentors">ดูรายชื่อพี่เลี้ยง</Link>
            </Button>
          </div>
        </Section>

        <Section title="เอกสารที่ส่งมา">
          {myDocs.length === 0 && <p className="text-sm text-muted-foreground">ยังไม่มีเอกสาร</p>}
          <ul className="space-y-2">
            {myDocs.map((d) => (
              <li key={d.id} className="rounded-lg border border-border p-3 text-sm">
                <Link to="/documents/$documentId" params={{ documentId: d.id }} className="font-medium hover:underline">
                  {d.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {d.type} · {d.uploadedAt} · {d.signed}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="งานที่กำลังทำและประวัติงาน">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส</TableHead>
              <TableHead>ชื่องาน</TableHead>
              <TableHead>โปรเจ็ค</TableHead>
              <TableHead>กำหนดส่ง</TableHead>
              <TableHead>สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTasks.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell className="font-medium">
                  <Link to="/tasks/$taskId" params={{ taskId: t.id }} className="hover:underline">
                    {t.title}
                  </Link>
                </TableCell>
                <TableCell>{t.project}</TableCell>
                <TableCell>{t.due}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{taskStatusLabel[t.status]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
