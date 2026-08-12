import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { mentorTeams, mentors, projects } from "@/lib/mock-data";

export const Route = createFileRoute("/mentors/")({
  head: () => pageHead("รายชื่อพี่เลี้ยง", "ดูรายชื่อพี่เลี้ยงทั้งหมด พร้อมกรองตามทีมพี่เลี้ยงและโปรเจ็ค"),
  component: MentorDirectory,
});

function MentorDirectory() {
  const [team, setTeam] = useState("all");
  const [project, setProject] = useState("all");

  const rows = useMemo(
    () =>
      mentors.filter(
        (m) =>
          (team === "all" || m.team === team) &&
          (project === "all" || m.projects.includes(project)),
      ),
    [team, project],
  );

  return (
    <AppShell title="รายชื่อพี่เลี้ยง" description={`พบ ${rows.length} คน`} roles="แอดมิน / เทรนนี่">
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger>
              <SelectValue placeholder="ทีมพี่เลี้ยง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทีมพี่เลี้ยง: ทั้งหมด</SelectItem>
              {mentorTeams.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger>
              <SelectValue placeholder="โปรเจ็ค" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">โปรเจ็ค: ทั้งหมด</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อเล่น</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>ทีม</TableHead>
              <TableHead>บ้าน</TableHead>
              <TableHead>โปรเจ็คที่ดูแล</TableHead>
              <TableHead className="text-right">เทรนนี่</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.nickname}</TableCell>
                <TableCell>{m.fullName}</TableCell>
                <TableCell>{m.team}</TableCell>
                <TableCell>{m.house}</TableCell>
                <TableCell className="space-x-1">
                  {m.projects.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-right">{m.traineeCount}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/mentors/$mentorId" params={{ mentorId: m.id }}>
                      รายละเอียด
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
