import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { projects, tasks, taskStatusLabel, trainees, type TaskStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/tasks/team")({
  head: () => pageHead("Kanban ติดตามทีม", "บอร์ดรวมงานของเทรนนี่ทุกคนในทีมหรือโปรเจ็ค แยกตามรายบุคคล"),
  component: TeamBoard,
});

const order: TaskStatus[] = ["todo", "inprogress", "review", "done"];

function TeamBoard() {
  const [project, setProject] = useState("all");
  const [person, setPerson] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (project === "all" || t.project === project) &&
          (person === "all" || t.assignee === person) &&
          (status === "all" || t.status === status),
      ),
    [project, person, status],
  );

  const people = Array.from(new Set(filtered.map((t) => t.assignee)));

  return (
    <AppShell title="Kanban ติดตามทีม" description="ดูภาระงานของเทรนนี่แต่ละคนในทีม" roles="พี่เลี้ยง">
      <Section>
        <div className="grid gap-3 sm:grid-cols-3">
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger>
              <SelectValue placeholder="โปรเจ็ค" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">โปรเจ็ค: ทั้งหมด</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={person} onValueChange={setPerson}>
            <SelectTrigger>
              <SelectValue placeholder="เทรนนี่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">เทรนนี่: ทั้งหมด</SelectItem>
              {trainees.map((t) => (
                <SelectItem key={t.id} value={t.nickname}>
                  {t.nickname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">สถานะ: ทั้งหมด</SelectItem>
              {order.map((s) => (
                <SelectItem key={s} value={s}>
                  {taskStatusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Section>

      <div className="space-y-4">
        {people.map((p) => (
          <Section key={p} title={p} description={`${filtered.filter((t) => t.assignee === p).length} งาน`}>
            <div className="grid gap-3 lg:grid-cols-4">
              {order.map((s) => (
                <div key={s} className="rounded-lg bg-muted/60 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    {taskStatusLabel[s]}
                  </p>
                  <div className="space-y-2">
                    {filtered
                      .filter((t) => t.assignee === p && t.status === s)
                      .map((t) => (
                        <Link
                          key={t.id}
                          to="/tasks/$taskId"
                          params={{ taskId: t.id }}
                          className="block rounded-md border border-border bg-background p-2 text-sm hover:bg-muted"
                        >
                          {t.title}
                          <Badge className="mt-1" variant="outline">
                            {t.project}
                          </Badge>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ))}
        {people.length === 0 && (
          <Section>
            <p className="text-center text-sm text-muted-foreground">ไม่พบงานตามเงื่อนไขที่เลือก</p>
          </Section>
        )}
      </div>
    </AppShell>
  );
}
