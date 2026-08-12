import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";

type Project = { id: string; name: string; type: string | null; owner_type: string; created_at: string; mentor_profiles: { nickname: string } | null; houses: { name: string } | null };
export const Route = createFileRoute("/projects/")({ head: () => pageHead("โปรเจ็ค", "โปรเจ็คจาก Supabase"), component: ProjectList });

function ProjectList() {
  const { role } = useRole();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { selectRows<Project>("projects", "id,name,type,owner_type,created_at,mentor_profiles(nickname),houses(name)", "", "created_at.desc").then(setProjects).catch((e) => setError(e instanceof Error ? e.message : "โหลดโปรเจ็คไม่สำเร็จ")); }, []);
  return <AppShell title="โปรเจ็ค" description="รายการโปรเจ็คที่บัญชีของคุณมีสิทธิ์เข้าถึง" actions={role === "admin" ? <Button asChild><Link to="/projects/create">สร้างโปรเจ็ค</Link></Button> : undefined}>
    {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
    {!error && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <article key={project.id} className="surface p-5"><div className="flex items-start justify-between gap-2"><h2 className="font-semibold">{project.name}</h2>{project.type && <Badge variant="secondary">{project.type}</Badge>}</div><p className="mt-3 text-sm text-muted-foreground">เจ้าของ: {project.mentor_profiles?.nickname ?? project.houses?.name ?? "-"}</p><p className="mt-1 text-xs text-muted-foreground">สร้างเมื่อ {new Date(project.created_at).toLocaleDateString("th-TH")}</p></article>)}</div>}
    {!error && projects.length === 0 && <p className="text-sm text-muted-foreground">ยังไม่มีโปรเจ็คที่คุณเข้าถึงได้</p>}
  </AppShell>;
}
