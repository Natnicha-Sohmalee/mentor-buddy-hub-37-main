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

export const Route = createFileRoute("/feedback")({
  head: () => pageHead("Feedback", "ให้ Feedback ระหว่างพี่เลี้ยงและเทรนนี่ พร้อมดูประวัติที่เคยให้และเคยได้รับ"),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <AppShell title="Feedback" description="ให้ Feedback ระหว่างพี่เลี้ยงและเทรนนี่ พร้อมดูประวัติที่เคยให้และเคยได้รับ" roles="เทรนนี่ / พี่เลี้ยง">
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ให้ Feedback" className="lg:col-span-1">
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2"><Label>ผู้รับ Feedback</Label>
              <Select><SelectTrigger><SelectValue placeholder="เลือกผู้รับ" /></SelectTrigger><SelectContent>{[...data.trainees.map((t)=>t.nickname), ...data.mentors.map((m)=>m.nickname)].map((n)=>(<SelectItem key={n} value={n}>{n}</SelectItem>))}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>คะแนนความพึงพอใจ (1-5)</Label><Input type="number" min={1} max={5} defaultValue={5} /></div>
            <div className="space-y-2"><Label htmlFor="msg">ข้อความ</Label><Textarea id="msg" rows={6} /></div>
            <Button type="submit">ส่ง Feedback</Button>
          </form>
        </Section>
        <Section title="ประวัติ Feedback" className="lg:col-span-2">
          <ul className="space-y-3">
            {data.feedbacks.map((f) => (
              <li key={f.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-medium">{f.from} → {f.to}</span><Badge variant="outline">{f.direction}</Badge><Badge variant="secondary">{f.rating}/5</Badge><span className="ml-auto text-xs text-muted-foreground">{f.date}</span></div>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}
