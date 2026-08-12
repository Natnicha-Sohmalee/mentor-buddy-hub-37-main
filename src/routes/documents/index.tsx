import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows } from "@/lib/supabase-data";

type DocumentRow = { id: string; file_name: string; type: string | null; is_signed: boolean; created_at: string };

export const Route = createFileRoute("/documents/")({
  head: () => pageHead("เอกสาร", "เอกสารที่คุณมีสิทธิ์เข้าถึงจาก Supabase"),
  component: DocumentList,
});

function DocumentList() {
  const [items, setItems] = useState<DocumentRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    selectRows<DocumentRow>("documents", "id,file_name,type,is_signed,created_at", "", "created_at.desc")
      .then(setItems)
      .catch((cause) => setError(cause instanceof Error ? cause.message : "โหลดเอกสารไม่สำเร็จ"));
  }, []);

  return <AppShell title="เอกสาร" description="แสดงเฉพาะเอกสารที่บัญชีของคุณมีสิทธิ์เข้าถึง" actions={<Button asChild><Link to="/documents/upload">อัปโหลดเอกสาร</Link></Button>}>
    <Section>
      {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
      <div className="space-y-2">
        {items.map((document) => <div key={document.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
          <div>
            <p className="font-medium">{document.file_name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{document.type ?? "ไม่ระบุประเภท"} · {new Date(document.created_at).toLocaleDateString("th-TH")}</p>
          </div>
          <div className="flex items-center gap-2">
            {document.is_signed && <Badge variant="secondary">ลงนามแล้ว</Badge>}
            <Button asChild size="sm" variant="outline"><Link to="/documents/$documentId" params={{ documentId: document.id }}>เปิดไฟล์</Link></Button>
          </div>
        </div>)}
        {!items.length && !error && <p className="py-8 text-center text-sm text-muted-foreground">ยังไม่มีเอกสารที่คุณเข้าถึงได้</p>}
      </div>
    </Section>
  </AppShell>;
}
