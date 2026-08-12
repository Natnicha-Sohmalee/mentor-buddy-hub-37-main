import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { mentors, projects, trainees } from "@/lib/mock-data";

export const Route = createFileRoute("/mentors/$mentorId")({
  loader: ({ params }) => {
    const mentor = mentors.find((m) => m.id === params.mentorId);
    if (!mentor) throw notFound();
    return { mentor };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(`พี่เลี้ยง ${loaderData.mentor.nickname}`, `โปรไฟล์พี่เลี้ยง เทรนนี่ที่ดูแล และโปรเจ็คที่รับผิดชอบ`)
      : pageHead("ไม่พบพี่เลี้ยง", "ไม่พบข้อมูลพี่เลี้ยงที่ระบุ"),
  component: MentorDetail,
});

function MentorDetail() {
  const { mentor } = Route.useLoaderData();
  const myTrainees = trainees.filter((t) => t.mentor === mentor.nickname);
  const myProjects = projects.filter((p) => mentor.projects.includes(p.name));

  return (
    <AppShell
      title={`พี่เลี้ยง: ${mentor.nickname}`}
      description={mentor.fullName}
      roles="แอดมิน / เทรนนี่"
      actions={
        <Button asChild variant="outline">
          <Link to="/mentors">กลับรายชื่อ</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ข้อมูลโปรไฟล์">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">อีเมล</dt>
              <dd className="font-medium">{mentor.email}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">ทีมพี่เลี้ยง</dt>
              <dd className="font-medium">{mentor.team}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">บ้าน</dt>
              <dd className="font-medium">{mentor.house}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">จำนวนเทรนนี่ที่ดูแล</dt>
              <dd className="font-medium">{mentor.traineeCount} คน</dd>
            </div>
          </dl>
        </Section>

        <Section title="เทรนนี่ที่ดูแล" className="lg:col-span-2">
          <ul className="grid gap-3 sm:grid-cols-2">
            {myTrainees.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <Link to="/trainees/$traineeId" params={{ traineeId: t.id }} className="font-medium hover:underline">
                    {t.nickname}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {t.team} · {t.project}
                  </p>
                </div>
                <Badge variant={t.status === "มีงาน" ? "default" : "outline"}>{t.status}</Badge>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="โปรเจ็คที่รับผิดชอบ">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {myProjects.map((p) => (
            <Link
              key={p.id}
              to="/projects/$projectId"
              params={{ projectId: p.id }}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.type} · {p.house}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
