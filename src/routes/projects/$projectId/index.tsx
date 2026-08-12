import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import * as data from "@/lib/mock-data";
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: ({ params }) => {
    const project = data.projects.find((p) => p.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead(loaderData.project.name, loaderData.project.description) : pageHead("ไม่พบโปรเจ็ค", "ไม่พบโปรเจ็คที่ระบุ"),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const members = data.trainees.filter((t) => t.project === project.name);
  const projectTasks = data.tasks.filter((t) => t.project === project.name);
  const docs = data.documents.filter((d) => d.project === project.name);
  return (
    <AppShell title={project.name} description={project.description} roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
      actions={<Button asChild variant="outline"><Link to="/projects/$projectId/diagram" params={{ projectId: project.id }}>แก้ไข Diagram ขั้นตอน</Link></Button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="ประเภท" value={project.type} />
        <StatCard label="สังกัด" value={project.house} hint={`ดูแลโดย ${project.owner}`} />
        <StatCard label="เทรนนี่ในโปรเจ็ค" value={members.length} />
        <StatCard label="ความคืบหน้า" value={`${project.progress}%`} />
      </div>
      <Section title="Diagram ขั้นตอนการทำงาน" description="กดที่ขั้นตอนเพื่อดูรายละเอียด">
        <div className="flex flex-wrap items-stretch gap-2">
          {data.workflowSteps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <details className="w-56 rounded-lg border border-border bg-muted/40 p-3">
                <summary className="cursor-pointer text-sm font-medium">{i + 1}. {s.name}</summary>
                <p className="mt-2 text-xs text-muted-foreground">{s.detail}</p>
                <Badge className="mt-2" variant="outline">{s.owner}</Badge>
              </details>
              {i < data.workflowSteps.length - 1 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="สมาชิกในโปรเจ็ค">
          <p className="mb-2 text-sm font-medium">พี่เลี้ยง</p>
          <div className="mb-4 flex flex-wrap gap-2">{data.mentors.filter((m) => m.projects.includes(project.name)).map((m) => (<Badge key={m.id} variant="secondary">{m.nickname}</Badge>))}</div>
          <p className="mb-2 text-sm font-medium">เทรนนี่</p>
          <ul className="space-y-2">{members.map((t) => (<li key={t.id} className="rounded-lg border border-border p-2 text-sm"><Link to="/trainees/$traineeId" params={{ traineeId: t.id }} className="hover:underline">{t.nickname}</Link> · {t.team}</li>))}</ul>
        </Section>
        <Section title="งานภายในโปรเจ็ค">
          <ul className="space-y-2">{projectTasks.map((t) => (<li key={t.id} className="flex items-center justify-between rounded-lg border border-border p-2 text-sm"><Link to="/tasks/$taskId" params={{ taskId: t.id }} className="hover:underline">{t.title}</Link><Badge variant="outline">{data.taskStatusLabel[t.status]}</Badge></li>))}</ul>
        </Section>
      </div>
      <Section title="เอกสารประจำโปรเจ็ค">
        <ul className="grid gap-2 sm:grid-cols-2">{docs.map((d) => (<li key={d.id} className="rounded-lg border border-border p-3 text-sm"><Link to="/documents/$documentId" params={{ documentId: d.id }} className="font-medium hover:underline">{d.name}</Link><p className="text-xs text-muted-foreground">{d.type} · {d.uploadedAt}</p></li>))}</ul>
      </Section>
    </AppShell>
  );
}
