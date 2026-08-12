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

export const Route = createFileRoute("/knowledge/approvals")({
  head: () => pageHead("คิวอนุมัติบทความ", "ตรวจและอนุมัติบทความที่รอเผยแพร่"),
  component: ArticleApprovals,
});

function ArticleApprovals() {
  return (
    <AppShell title="คิวอนุมัติบทความ" description="ตรวจและอนุมัติบทความที่รอเผยแพร่" roles="แอดมิน">
      <div className="space-y-4">
        {data.articles.filter((a) => a.status === "รออนุมัติ").map((a) => (
          <Section key={a.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Link to="/knowledge/$articleId" params={{ articleId: a.id }} className="font-semibold hover:underline">{a.title}</Link>
                <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>
                <div className="mt-2 flex gap-2"><Badge variant="secondary">{a.category}</Badge><Badge variant="outline">โดย {a.author}</Badge></div>
              </div>
              <div className="flex gap-2"><Button>อนุมัติ</Button><Button variant="outline">ไม่อนุมัติ</Button></div>
            </div>
            <Textarea className="mt-4" placeholder="ความเห็นถึงผู้เขียน..." />
          </Section>
        ))}
      </div>
    </AppShell>
  );
}
