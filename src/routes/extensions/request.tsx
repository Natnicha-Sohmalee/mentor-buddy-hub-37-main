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

export const Route = createFileRoute("/extensions/request")({
  head: () => pageHead("ยื่นคำขอขยายเวลา", "ระบุเหตุผลและวันที่สิ้นสุดใหม่ที่ต้องการขยาย"),
  component: ExtensionRequest,
});

function ExtensionRequest() {
  return (
    <AppShell title="ยื่นคำขอขยายเวลา" description="ระบุเหตุผลและวันที่สิ้นสุดใหม่ที่ต้องการขยาย" roles="เทรนนี่ / พี่เลี้ยง">
      <Section title="แบบฟอร์มคำขอขยายเวลาฝึกงาน">
        <form className="grid max-w-2xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="cur">วันที่สิ้นสุดปัจจุบัน</Label><Input id="cur" type="date" defaultValue="2026-08-28" /></div>
            <div className="space-y-2"><Label htmlFor="new">วันที่สิ้นสุดใหม่ที่ต้องการ</Label><Input id="new" type="date" /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="reason">เหตุผลในการขอขยายเวลา</Label><Textarea id="reason" rows={6} placeholder="อธิบายเหตุผลและความจำเป็น" /></div>
          <Button type="submit">ส่งคำขอ</Button>
        </form>
      </Section>
    </AppShell>
  );
}
