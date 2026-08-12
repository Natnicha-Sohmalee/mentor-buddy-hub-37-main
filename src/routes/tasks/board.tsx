import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows, updateRows } from "@/lib/supabase-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Status = "todo" | "in_progress" | "review" | "done";
type Assignment = { id: string; status: Status; task_id: string; tasks: { id: string; title: string; projects: { name: string } | null } | null };
const columns: { status: Status; label: string }[] = [{ status: "todo", label: "To do" }, { status: "in_progress", label: "In progress" }, { status: "review", label: "Review" }, { status: "done", label: "Done" }];

export const Route = createFileRoute("/tasks/board")({ head: () => pageHead("บอร์ดงานของฉัน", "งานที่ได้รับมอบหมายจาก Supabase"), component: MyTaskBoard });

function MyTaskBoard() {
  const [items, setItems] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    selectRows<Assignment>("task_assignments", "id,status,task_id,tasks(id,title,projects(name))", "", "updated_at.desc")
      .then(setItems).catch((e) => setError(e instanceof Error ? e.message : "โหลดงานไม่สำเร็จ")).finally(() => setLoading(false));
  }, []);
  const setStatus = async (assignment: Assignment, status: Status) => {
    const previous = items;
    setItems((current) => current.map((item) => item.id === assignment.id ? { ...item, status } : item));
    try { await updateRows("task_assignments", `id=eq.${assignment.id}`, { status }); }
    catch (e) { setItems(previous); setError(e instanceof Error ? e.message : "อัปเดตสถานะไม่สำเร็จ"); }
  };
  return <AppShell title="บอร์ดงานของฉัน" description="งานที่ได้รับมอบหมายจริงจาก Supabase" roles="เทรนนี่">
    {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
    {loading ? <p className="text-sm text-muted-foreground">กำลังโหลดงาน...</p> : <div className="grid gap-4 lg:grid-cols-4">{columns.map(({ status, label }, index) => {
      const tasks = items.filter((item) => item.status === status);
      return <section key={status} className="surface min-h-64 space-y-3 p-4"><div className="flex items-center justify-between"><h2 className="font-semibold">{label}</h2><Badge variant="secondary">{tasks.length}</Badge></div>
        {tasks.map((assignment) => <article key={assignment.id} className="rounded-lg border border-border bg-background p-3"><Link to="/tasks/$taskId" params={{ taskId: assignment.task_id }} className="text-sm font-medium hover:underline">{assignment.tasks?.title ?? "งานที่ไม่พบ"}</Link><p className="mt-2 text-xs text-muted-foreground">{assignment.tasks?.projects?.name ?? "ไม่มีโปรเจ็ค"}</p><div className="mt-2 flex justify-between"><Button size="icon" variant="ghost" disabled={index === 0} onClick={() => setStatus(assignment, columns[index - 1]!.status)}><ArrowLeft className="size-4" /></Button><Button size="icon" variant="ghost" disabled={index === columns.length - 1} onClick={() => setStatus(assignment, columns[index + 1]!.status)}><ArrowRight className="size-4" /></Button></div></article>)}
        {!tasks.length && <p className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">ไม่มีงาน</p>}</section>;
    })}</div>}
  </AppShell>;
}
