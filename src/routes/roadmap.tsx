import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { pageHead } from "@/lib/head";
import { pages, roleLabels, sprints, type Role } from "@/lib/navigation";

export const Route = createFileRoute("/roadmap")({
  head: () =>
    pageHead(
      "แผนพัฒนาระบบตามบทบาท",
      "แผนการพัฒนาแบบ Role-based Agile Sprints ทั้ง 5 Sprint พร้อมหน้าที่เกี่ยวข้องของแต่ละบทบาท",
    ),
  component: RoadmapPage,
});

const roleOrder: Role[] = ["trainee", "mentor", "admin"];

function RoadmapPage() {
  return (
    <AppShell
      title="แผนพัฒนาระบบตามบทบาท (Role-based Sprints)"
      description="แบ่งการพัฒนาตามคุณค่าที่แต่ละบทบาทได้รับในแต่ละช่วง เพื่อให้ทุกบทบาทเริ่มทดสอบระบบได้พร้อมกัน"
      roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
    >
      <div className="space-y-5">
        {sprints.map((sprint) => (
          <Section key={sprint.id} title={sprint.title} description={sprint.goal}>
            <div className="grid gap-4 md:grid-cols-3">
              {roleOrder.map((role) => {
                const items = pages.filter((p) => p.sprint === sprint.id && p.roles.includes(role));
                return (
                  <div key={role} className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm font-semibold">{roleLabels[role]}</p>
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground">— ไม่มีในสปรินต์นี้</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {items.map((item) => (
                          <li key={item.code + item.to} className="flex items-start gap-2 text-sm">
                            <Badge variant="secondary" className="shrink-0">
                              {item.code}
                            </Badge>
                            {item.nav === false ? (
                              <span className="text-muted-foreground">{item.label}</span>
                            ) : (
                              <Link to={item.to as "/"} className="hover:underline">
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        ))}
      </div>
    </AppShell>
  );
}
