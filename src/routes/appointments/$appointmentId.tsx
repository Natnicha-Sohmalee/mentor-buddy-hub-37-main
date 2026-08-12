import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { appointments } from "@/lib/mock-data";
import { MapPin, Video, Users } from "lucide-react";

export const Route = createFileRoute("/appointments/$appointmentId")({
  loader: ({ params }) => {
    const appointment = appointments.find((a) => a.id === params.appointmentId);
    if (!appointment) throw notFound();
    return { appointment };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.appointment.title, `รายละเอียดนัดหมายและผู้เข้าร่วม ${loaderData.appointment.date}`)
      : pageHead("ไม่พบนัดหมาย", "ไม่พบนัดหมายที่ระบุ"),
  component: AppointmentDetail,
});

function AppointmentDetail() {
  const { appointment } = Route.useLoaderData();

  return (
    <AppShell
      title={appointment.title}
      description={`${appointment.date} · ${appointment.time}`}
      roles="เทรนนี่ / พี่เลี้ยง"
      actions={
        <Button asChild variant="outline">
          <Link to="/appointments">กลับปฏิทิน</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="รายละเอียด" className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{appointment.type}</Badge>
            <Badge variant="outline">{appointment.mode === "online" ? "ออนไลน์" : "On-site"}</Badge>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{appointment.note}</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
            {appointment.mode === "online" ? (
              <Video className="size-4 text-primary" />
            ) : (
              <MapPin className="size-4 text-primary" />
            )}
            <span className="font-medium">{appointment.place}</span>
            {appointment.mode === "online" && (
              <Button size="sm" className="ml-auto">
                เข้าร่วมประชุม
              </Button>
            )}
          </div>
        </Section>

        <Section title="ผู้เข้าร่วม">
          <ul className="space-y-2">
            {appointment.participants.map((p: string) => (
              <li key={p} className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
                <Users className="size-4 text-muted-foreground" /> {p}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}
