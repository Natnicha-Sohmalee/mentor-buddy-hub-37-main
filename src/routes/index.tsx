import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, StatCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { useRole } from "@/lib/role-context";
import { selectRows } from "@/lib/supabase-data";

type Assignment = { status: string };
export const Route = createFileRoute("/")({ head: () => pageHead("หน้าหลัก", "ภาพรวมข้อมูลจาก Supabase"), component: Home });
function Home() {
  const { role } = useRole();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [projects, setProjects] = useState<{ id: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!role) {
      void navigate({ to: "/login", replace: true });
      return;
    }
    Promise.all([selectRows<Assignment>("task_assignments", "status"), selectRows<{ id: string }>("projects", "id")])
      .then(([tasks, list]) => { setAssignments(tasks); setProjects(list); })
      .catch((e) => setError(e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ"));
  }, [navigate, role]);
  if (!role) return null;
  const open = assignments.filter((item) => item.status !== "done").length;
  return <AppShell title="หน้าหลัก" description="ภาพรวมเฉพาะข้อมูลที่มีใน Supabase">{error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<div className="grid gap-4 sm:grid-cols-3"><StatCard label={role === "mentor" ? "งานที่มอบหมาย" : "งานของฉัน"} value={assignments.length} /><StatCard label="งานที่ยังไม่เสร็จ" value={open} /><StatCard label="โปรเจ็คที่เข้าถึงได้" value={projects.length} /></div><div className="mt-6 flex gap-3"><Button asChild><Link to="/projects">ดูโปรเจ็ค</Link></Button>{role === "trainee" && <Button asChild variant="outline"><Link to="/tasks/board">ไปบอร์ดงาน</Link></Button>}</div></AppShell>;
}
