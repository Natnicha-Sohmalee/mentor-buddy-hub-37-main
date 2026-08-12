import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { houses, projects, traineeTeams, trainees } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/trainees/")({
  head: () => pageHead("รายชื่อเทรนนี่", "ค้นหาและกรองรายชื่อเทรนนี่ตามทีม บ้าน โปรเจ็ค และสถานะงาน"),
  component: TraineeDirectory,
});

function TraineeDirectory() {
  const [q, setQ] = useState("");
  const [team, setTeam] = useState("all");
  const [house, setHouse] = useState("all");
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      trainees.filter(
        (t) =>
          (q === "" || t.nickname.includes(q) || t.fullName.includes(q)) &&
          (team === "all" || t.team === team) &&
          (house === "all" || t.house === house) &&
          (project === "all" || t.project === project) &&
          (status === "all" || t.status === status),
      ),
    [q, team, house, project, status],
  );

  return (
    <AppShell
      title="รายชื่อเทรนนี่"
      description={`พบ ${rows.length} คนจากทั้งหมด ${trainees.length} คน`}
      roles="พี่เลี้ยง / แอดมิน"
    >
      <Section>
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาชื่อเทรนนี่" className="pl-9" />
          </div>
          <Filter value={team} onChange={setTeam} placeholder="ทีม" options={[...traineeTeams]} />
          <Filter value={house} onChange={setHouse} placeholder="บ้าน" options={[...houses]} />
          <Filter value={project} onChange={setProject} placeholder="โปรเจ็ค" options={projects.map((p) => p.name)} />
          <Filter value={status} onChange={setStatus} placeholder="สถานะ" options={["มีงาน", "ว่างงาน"]} />
        </div>
      </Section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((t) => (
          <div key={t.id} className="surface flex flex-col gap-3 p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-secondary-foreground">
                {t.nickname.charAt(0)}
              </span>
              <div>
                <p className="font-semibold">{t.nickname}</p>
                <p className="text-xs text-muted-foreground">{t.fullName}</p>
              </div>
              <Badge className="ml-auto" variant={t.status === "มีงาน" ? "default" : "outline"}>
                {t.status}
              </Badge>
            </div>
            <dl className="space-y-1 text-sm text-muted-foreground">
              <p>ทีม: {t.team} · {t.house}</p>
              <p>โปรเจ็ค: {t.project}</p>
              <p>พี่เลี้ยง: {t.mentor}</p>
              <p>ฝึกงาน: {t.startDate} – {t.endDate}</p>
            </dl>
            <Button asChild variant="outline" size="sm" className="mt-auto">
              <Link to="/trainees/$traineeId" params={{ traineeId: t.id }}>
                ดูรายละเอียด
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Filter({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}: ทั้งหมด</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
