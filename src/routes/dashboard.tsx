import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, StatCard } from "@/components/app-shell";
import { pageHead } from "@/lib/head";
import { selectRows } from "@/lib/supabase-data";

type Assignment = { status: string };
export const Route = createFileRoute("/dashboard")({ head: () => pageHead("Dashboard", "ภาพรวมข้อมูลจาก Supabase"), component: DashboardPage });
function DashboardPage() {
  const [counts, setCounts] = useState({ users: 0, trainees: 0, mentors: 0, projects: 0, tasks: 0, todo: 0, review: 0 });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { Promise.all([selectRows<{ id: string }>("user_roles", "id"), selectRows<{ id: string }>("trainee_profiles", "id"), selectRows<{ id: string }>("mentor_profiles", "id"), selectRows<{ id: string }>("projects", "id"), selectRows<Assignment>("task_assignments", "status")]).then(([users, trainees, mentors, projects, assignments]) => setCounts({ users: users.length, trainees: trainees.length, mentors: mentors.length, projects: projects.length, tasks: assignments.length, todo: assignments.filter((a) => a.status === "todo").length, review: assignments.filter((a) => a.status === "review").length })).catch((e) => setError(e instanceof Error ? e.message : "โหลด Dashboard ไม่สำเร็จ")); }, []);
  return <AppShell title="Dashboard" description="ข้อมูลจริงจาก Supabase" roles="แอดมิน">{error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="ผู้ใช้งาน" value={counts.users} /><StatCard label="เทรนนี่" value={counts.trainees} /><StatCard label="พี่เลี้ยง" value={counts.mentors} /><StatCard label="โปรเจ็ค" value={counts.projects} /><StatCard label="งานที่มอบหมาย" value={counts.tasks} /><StatCard label="รอเริ่มงาน" value={counts.todo} /><StatCard label="รอรีวิว" value={counts.review} /></div></AppShell>;
}
