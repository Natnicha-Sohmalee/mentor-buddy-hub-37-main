import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import * as data from "@/lib/mock-data";

export const Route = createFileRoute("/issues/")({
  head: () => pageHead("รายการปัญหา", "ปัญหาที่เทรนนี่แจ้งเข้ามา พร้อมสถานะและช่องตอบกลับ"),
  component: IssueList,
});

function IssueList() {
  return (
    <AppShell title="รายการปัญหา" description="ปัญหาที่เทรนนี่แจ้งเข้ามา พร้อมสถานะและช่องตอบกลับ" roles="พี่เลี้ยง">
      <div className="space-y-4">
        {data.issues.map((i) => (
          <Section key={i.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{i.title}</p>
                <div className="mt-2 flex flex-wrap gap-2"><Badge variant="outline">แจ้งโดย {i.reporter}</Badge><Badge variant="secondary">{i.project}</Badge><Badge variant="outline">ความรุนแรง {i.severity}</Badge><Badge>{i.status}</Badge></div>
              </div>
              <span className="text-xs text-muted-foreground">{i.createdAt}</span>
            </div>
            {i.reply && <p className="mt-3 rounded-lg bg-accent p-3 text-sm text-accent-foreground">คำแนะนำ: {i.reply}</p>}
            <div className="mt-3 flex gap-2"><Input placeholder="ตอบกลับคำแนะนำ/แนวทางแก้ไข" /><Button>ส่ง</Button></div>
          </Section>
        ))}
      </div>
    </AppShell>
  );
}
