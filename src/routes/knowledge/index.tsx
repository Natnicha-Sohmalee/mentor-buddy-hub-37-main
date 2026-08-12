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

export const Route = createFileRoute("/knowledge/")({
  head: () => pageHead("รายการบทความ", "บทความที่เผยแพร่แล้ว พร้อมตัวกรองหมวดหมู่และช่องค้นหา"),
  component: KnowledgeList,
});

function KnowledgeList() {
  return (
    <AppShell title="รายการบทความ" description="บทความที่เผยแพร่แล้ว พร้อมตัวกรองหมวดหมู่และช่องค้นหา" roles="เทรนนี่ / พี่เลี้ยง / แอดมิน" actions={<Button asChild><Link to="/knowledge/create">เขียนบทความ</Link></Button>}>
      <Section>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="ค้นหาบทความ" />
          <Select><SelectTrigger><SelectValue placeholder="หมวดหมู่" /></SelectTrigger><SelectContent>{["คู่มือทำงาน","กฎระเบียบ","แชร์ความรู้","อื่นๆ"].map((c)=>(<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent></Select>
        </div>
      </Section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.articles.filter((a) => a.status === "เผยแพร่แล้ว").map((a) => (
          <article key={a.id} className="surface flex flex-col p-5">
            <Badge variant="secondary" className="self-start">{a.category}</Badge>
            <Link to="/knowledge/$articleId" params={{ articleId: a.id }} className="mt-2 font-semibold hover:underline">{a.title}</Link>
            <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            <p className="mt-auto pt-3 text-xs text-muted-foreground">{a.author} · {a.publishedAt}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
