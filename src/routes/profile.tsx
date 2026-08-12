import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { pageHead } from "@/lib/head";
import { useRole } from "@/lib/role-context";
import { selectRows } from "@/lib/supabase-data";

type Trainee = { nickname: string; start_date: string; end_date: string; is_email_public: boolean; trainee_teams: { name: string } | null; houses: { name: string } | null };
type Mentor = { nickname: string; mentor_teams: { name: string } | null };
export const Route = createFileRoute("/profile")({ head: () => pageHead("โปรไฟล์ของฉัน", "ข้อมูลจาก Supabase"), component: ProfilePage });

function ProfilePage() {
  const { role, user } = useRole();
  const [profile, setProfile] = useState<Trainee | Mentor | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!role || role === "admin") return;
    const query = role === "trainee" ? selectRows<Trainee>("trainee_profiles", "nickname,start_date,end_date,is_email_public,trainee_teams(name),houses(name)") : selectRows<Mentor>("mentor_profiles", "nickname,mentor_teams(name)");
    query.then((rows) => setProfile(rows[0] ?? null)).catch((e) => setError(e instanceof Error ? e.message : "โหลดโปรไฟล์ไม่สำเร็จ"));
  }, [role]);
  const name = profile?.nickname ?? (role === "admin" ? "ผู้ดูแลระบบ" : "-");
  return <AppShell title="โปรไฟล์ของฉัน" description="ข้อมูลจาก Supabase" roles={role ? undefined : ""}>
    {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
    <div className="grid gap-6 lg:grid-cols-3"><Section><div className="flex flex-col items-center text-center"><span className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">{name[0]?.toUpperCase()}</span><p className="mt-3 text-lg font-semibold">{name}</p><p className="text-sm text-muted-foreground">{user?.email}</p><Badge className="mt-2" variant="secondary">{role === "trainee" ? "เทรนนี่" : role === "mentor" ? "พี่เลี้ยง" : "แอดมิน"}</Badge></div></Section>
      <Section className="lg:col-span-2" title="ข้อมูลบัญชี"><dl className="grid gap-4 sm:grid-cols-2"><Row label="อีเมล" value={user?.email ?? "-"} />{role === "trainee" && profile && <><Row label="ทีม" value={(profile as Trainee).trainee_teams?.name ?? "-"} /><Row label="บ้าน" value={(profile as Trainee).houses?.name ?? "-"} /><Row label="เริ่มฝึกงาน" value={(profile as Trainee).start_date} /><Row label="สิ้นสุดฝึกงาน" value={(profile as Trainee).end_date} /></>}{role === "mentor" && profile && <Row label="ทีม" value={(profile as Mentor).mentor_teams?.name ?? "-"} />}</dl></Section></div>
  </AppShell>;
}
function Row({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-border p-3"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>; }
