import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { tasks as seed, taskStatusLabel, type Task, type TaskStatus } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tasks/board")({
  head: () => pageHead("Kanban งานของฉัน", "บอร์ดงานส่วนตัวแบบ Kanban แยกตามสถานะ To do / In Progress / Review / Done"),
  component: MyTaskBoard,
});

const order: TaskStatus[] = ["todo", "inprogress", "review", "done"];

function MyTaskBoard() {
  const [items, setItems] = useState<Task[]>(seed);

  const move = (id: string, dir: -1 | 1) =>
    setItems((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = order.indexOf(t.status);
        const next = order[Math.min(order.length - 1, Math.max(0, idx + dir))]!;
        return { ...t, status: next };
      }),
    );

  const onDrop = (status: TaskStatus, id: string) =>
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  return (
    <AppShell
      title="Kanban งานของฉัน"
      description="ลากการ์ดเพื่อเปลี่ยนสถานะ หรือใช้ปุ่มลูกศรบนการ์ด"
      roles="เทรนนี่"
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {order.map((status) => {
          const col = items.filter((t) => t.status === status);
          return (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(status, e.dataTransfer.getData("text/plain"))}
              className="surface flex min-h-64 flex-col gap-3 p-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{taskStatusLabel[status]}</h2>
                <Badge variant="secondary">{col.length}</Badge>
              </div>
              {col.map((t) => (
                <article
                  key={t.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
                  className="cursor-grab rounded-lg border border-border bg-background p-3 shadow-sm active:cursor-grabbing"
                >
                  <Link to="/tasks/$taskId" params={{ taskId: t.id }} className="text-sm font-medium hover:underline">
                    {t.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.id} · ส่ง {t.due}
                  </p>
                  <Badge className="mt-2" variant="outline">
                    {t.project}
                  </Badge>
                  <div className="mt-2 flex justify-between">
                    <Button size="icon" variant="ghost" onClick={() => move(t.id, -1)}>
                      <ArrowLeft className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => move(t.id, 1)}>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </article>
              ))}
              {col.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  ลากการ์ดมาวางที่นี่
                </p>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
