import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { createSignedStorageUrl, selectRows } from "@/lib/supabase-data";

type DocumentRow = { id: string; file_name: string; file_url: string; type: string | null; is_signed: boolean; created_at: string };
export const Route = createFileRoute("/documents/$documentId")({ head: () => pageHead("เปิดเอกสาร", "เปิดเอกสารผ่านลิงก์ชั่วคราว"), component: DocumentDetail });

function DocumentDetail() {
  const { documentId } = Route.useParams();
  const [document, setDocument] = useState<DocumentRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  useEffect(() => { selectRows<DocumentRow>("documents", "id,file_name,file_url,type,is_signed,created_at", `id=eq.${encodeURIComponent(documentId)}`).then((rows) => setDocument(rows[0] ?? null)).catch((cause) => setError(cause instanceof Error ? cause.message : "โหลดเอกสารไม่สำเร็จ")); }, [documentId]);
  const openFile = async () => { if (!document) return; setOpening(true); setError(null); try { window.open(await createSignedStorageUrl("e_documents", document.file_url), "_blank", "noopener,noreferrer"); } catch (cause) { setError(cause instanceof Error ? cause.message : "เปิดไฟล์ไม่สำเร็จ"); } finally { setOpening(false); } };
  return <AppShell title="รายละเอียดเอกสาร" actions={<Button asChild variant="outline"><Link to="/documents">กลับรายการ</Link></Button>}><Section>{error && <p className="mb-3 text-sm text-destructive">{error}</p>}{document ? <div className="space-y-4"><div><h2 className="text-lg font-semibold">{document.file_name}</h2><p className="mt-1 text-sm text-muted-foreground">{document.type ?? "ไม่ระบุประเภท"} · อัปโหลด {new Date(document.created_at).toLocaleDateString("th-TH")}</p></div>{document.is_signed && <Badge variant="secondary">ลงนามแล้ว</Badge>}<Button disabled={opening} onClick={() => void openFile()}>{opening ? "กำลังเตรียมไฟล์..." : "เปิดไฟล์"}</Button><p className="text-xs text-muted-foreground">ลิงก์เปิดไฟล์มีอายุ 10 นาทีและระบบจะตรวจสิทธิ์ทุกครั้ง</p></div> : !error && <p className="text-sm text-muted-foreground">ไม่พบเอกสาร หรือคุณไม่มีสิทธิ์เข้าถึง</p>}</Section></AppShell>;
}
