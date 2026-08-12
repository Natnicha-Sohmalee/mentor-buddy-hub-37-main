import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section, StatCard } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageHead } from "@/lib/head";
import * as data from "@/lib/mock-data";
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/documents/$documentId")({
  loader: ({ params }) => {
    const doc = data.documents.find((d) => d.id === params.documentId);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead(loaderData.doc.name, "ดูตัวอย่างเอกสาร สถานะการเซ็นรับรอง และดาวน์โหลดไฟล์") : pageHead("ไม่พบเอกสาร", "ไม่พบเอกสารที่ระบุ"),
  component: DocumentViewer,
});

function DocumentViewer() {
  const { doc } = Route.useLoaderData();
  return (
    <AppShell title={doc.name} description={`${doc.type} · อัปโหลดโดย ${doc.owner} เมื่อ ${doc.uploadedAt}`} roles="เทรนนี่ / พี่เลี้ยง / แอดมิน" actions={<Button>ดาวน์โหลดไฟล์</Button>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="ตัวอย่างเอกสาร" className="lg:col-span-2">
          <div className="flex h-96 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
            ตัวอย่างไฟล์ {doc.name} ({doc.size})
          </div>
        </Section>
        <Section title="ข้อมูลเอกสาร">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">ประเภท</dt><dd className="font-medium">{doc.type}</dd></div>
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">โปรเจ็ค</dt><dd className="font-medium">{doc.project}</dd></div>
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">ขนาดไฟล์</dt><dd className="font-medium">{doc.size}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">สถานะการเซ็นรับรอง</dt><dd><Badge variant="secondary">{doc.signed}</Badge></dd></div>
          </dl>
          <Button className="mt-4 w-full" variant="outline">ขอลายเซ็นรับรอง</Button>
        </Section>
      </div>
    </AppShell>
  );
}
