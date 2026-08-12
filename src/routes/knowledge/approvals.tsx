import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows, updateRows } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";

type Article = { id: string; title: string; content: string | null; created_at: string };

export const Route = createFileRoute("/knowledge/approvals")({ head: () => pageHead("อนุมัติบทความ", "จัดการบทความที่รอเผยแพร่"), component: ArticleApprovals });

function ArticleApprovals() {
  const { user } = useRole();
  const [items, setItems] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const load = () => selectRows<Article>("articles", "id,title,content,created_at", "status=eq.pending", "created_at.asc").then(setItems).catch((cause) => setError(cause instanceof Error ? cause.message : "โหลดรายการอนุมัติไม่สำเร็จ"));
  useEffect(() => { void load(); }, []);

  const decide = async (articleId: string, status: "approved" | "rejected") => {
    if (!user) return;
    setSavingId(articleId); setError(null);
    try {
      await updateRows("articles", `id=eq.${encodeURIComponent(articleId)}`, { status, approved_by: user.id });
      setItems((current) => current.filter((article) => article.id !== articleId));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "บันทึกผลการอนุมัติไม่สำเร็จ"); }
    finally { setSavingId(null); }
  };

  return <AppShell title="อนุมัติบทความ" description="ตรวจและเผยแพร่บทความที่รออนุมัติ" roles="แอดมิน">
    {error && <p className="text-sm text-destructive">{error}</p>}
    <div className="space-y-4">
      {items.map((article) => <Section key={article.id}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl"><div className="mb-2 flex items-center gap-2"><h2 className="font-semibold">{article.title}</h2><Badge variant="secondary">รออนุมัติ</Badge></div><p className="whitespace-pre-wrap text-sm text-muted-foreground">{article.content || "ไม่มีเนื้อหา"}</p></div>
          <div className="flex gap-2"><Button size="sm" disabled={savingId === article.id} onClick={() => void decide(article.id, "approved")}>อนุมัติ</Button><Button size="sm" variant="outline" disabled={savingId === article.id} onClick={() => void decide(article.id, "rejected")}>ไม่อนุมัติ</Button></div>
        </div>
      </Section>)}
      {!items.length && !error && <Section><p className="py-6 text-center text-sm text-muted-foreground">ไม่มีบทความที่รออนุมัติ</p></Section>}
    </div>
  </AppShell>;
}
