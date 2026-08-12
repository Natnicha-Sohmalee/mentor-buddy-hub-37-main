import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/head";
import { documents, tasks, taskStatusLabel, type Task } from "@/lib/mock-data";
import { Paperclip } from "lucide-react";

export const Route = createFileRoute("/tasks/$taskId")({
  loader: ({ params }) => {
    const task = tasks.find((t) => t.id === params.taskId);
    if (!task) throw notFound();
    return { task };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(`งาน ${loaderData.task.id}`, loaderData.task.title)
      : pageHead("ไม่พบงาน", "ไม่พบงานที่ระบุในระบบ"),
  component: TaskDetail,
});

function TaskDetail() {
  const { task } = Route.useLoaderData() as { task: Task };
  const attached = documents.filter((d) => d.project === task.project).slice(0, 2);

  return (
    <AppShell
      title={task.title}
      description={`${task.id} · มอบหมายโดย ${task.mentor}`}
      roles="เทรนนี่ / พี่เลี้ยง"
      actions={
        <>
          {!task.accepted && <Button variant="outline">กดรับงาน</Button>}
          <Button>ส่งงานเข้า Review</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="รายละเอียดงาน" className="lg:col-span-2">
          <p className="text-sm leading-relaxed">{task.detail}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{taskStatusLabel[task.status]}</Badge>
            <Badge variant="outline">โปรเจ็ค: {task.project}</Badge>
            <Badge variant="outline">ความสำคัญ: {task.priority}</Badge>
            <Badge variant="outline">กำหนดส่ง: {task.due}</Badge>
            <Badge variant={task.accepted ? "default" : "destructive"}>
              {task.accepted ? "รับงานแล้ว" : "ยังไม่รับงาน"}
            </Badge>
          </div>

          <h3 className="mt-6 mb-2 text-sm font-semibold">เอกสารแนบ</h3>
          <ul className="space-y-2">
            {attached.map((d) => (
              <li key={d.id} className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
                <Paperclip className="size-4 text-muted-foreground" />
                <Link to="/documents/$documentId" params={{ documentId: d.id }} className="hover:underline">
                  {d.name}
                </Link>
                <span className="ml-auto text-xs text-muted-foreground">{d.size}</span>
              </li>
            ))}
            {attached.length === 0 && <p className="text-sm text-muted-foreground">ไม่มีเอกสารแนบ</p>}
          </ul>
        </Section>

        <div className="space-y-6">
          <Section title="ผู้เกี่ยวข้อง">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">ผู้รับผิดชอบ</dt>
                <dd className="font-medium">{task.assignee}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">พี่เลี้ยงผู้ตรวจ</dt>
                <dd className="font-medium">{task.mentor}</dd>
              </div>
            </dl>
          </Section>

          <Section title="Feedback จากพี่เลี้ยง" description="กรณีตรวจงานไม่ผ่าน">
            {task.feedback ? (
              <p className="rounded-lg bg-accent p-3 text-sm text-accent-foreground">{task.feedback}</p>
            ) : (
              <p className="text-sm text-muted-foreground">ยังไม่มี Feedback สำหรับงานนี้</p>
            )}
            <Textarea className="mt-3" placeholder="พี่เลี้ยงเขียน Feedback ที่นี่..." />
            <Button className="mt-3 w-full" variant="outline">
              บันทึก Feedback
            </Button>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}
