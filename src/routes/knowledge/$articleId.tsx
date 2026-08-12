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
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/knowledge/$articleId")({
  loader: ({ params }) => {
    const article = data.articles.find((a) => a.id === params.articleId);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead(loaderData.article.title, loaderData.article.excerpt) : pageHead("ไม่พบบทความ", "ไม่พบบทความที่ระบุ"),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article } = Route.useLoaderData();
  return (
    <AppShell title={article.title} description={`${article.author} · เผยแพร่ ${article.publishedAt}`} roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
      actions={<Button asChild variant="outline"><Link to="/knowledge">กลับรายการบทความ</Link></Button>}>
      <Section>
        <Badge variant="secondary">{article.category}</Badge>
        <div className="mt-4 space-y-4 text-sm leading-relaxed">
          {article.body.map((p: string, i: number) => (<p key={i}>{p}</p>))}
        </div>
      </Section>
    </AppShell>
  );
}
