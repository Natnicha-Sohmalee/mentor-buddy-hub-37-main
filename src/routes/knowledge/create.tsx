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

export const Route = createFileRoute("/knowledge/create")({
  head: () => pageHead("สร้าง/แก้ไขบทความ", "เขียนบทความ เลือกหมวดหมู่ และส่งขออนุมัติเผยแพร่"),
  component: CreateArticle,
});

function CreateArticle() {
  return (
    <AppShell title="สร้าง/แก้ไขบทความ" description="เขียนบทความ เลือกหมวดหมู่ และส่งขออนุมัติเผยแพร่" roles="เทรนนี่ / พี่เลี้ยง">
      <Section title="Editor">
        <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2"><Label htmlFor="t">หัวข้อบทความ</Label><Input id="t" placeholder="ตั้งชื่อบทความให้ชัดเจน" /></div>
          <div className="space-y-2"><Label>หมวดหมู่</Label>
            <Select><SelectTrigger className="max-w-sm"><SelectValue placeholder="เลือกหมวดหมู่" /></SelectTrigger><SelectContent>{["คู่มือทำงาน","กฎระเบียบ","แชร์ความรู้","อื่นๆ"].map((c)=>(<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent></Select>
          </div>
          <div className="space-y-2"><Label htmlFor="b">เนื้อหา</Label><Textarea id="b" rows={16} placeholder="เขียนเนื้อหาบทความที่นี่..." /></div>
          <div className="flex gap-2"><Button variant="outline" type="button">บันทึกฉบับร่าง</Button><Button type="submit">ส่งขออนุมัติเผยแพร่</Button></div>
        </form>
      </Section>
    </AppShell>
  );
}
