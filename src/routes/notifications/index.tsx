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

export const Route = createFileRoute("/notifications/")({
  head: () => pageHead("ศูนย์การแจ้งเตือน", "การแจ้งเตือนทั้งหมด เช่น งานใหม่ นัดหมาย และผลการอนุมัติคำขอ"),
  component: NotificationCenter,
});

function NotificationCenter() {
  return (
    <AppShell title="ศูนย์การแจ้งเตือน" description="การแจ้งเตือนทั้งหมด เช่น งานใหม่ นัดหมาย และผลการอนุมัติคำขอ" roles="เทรนนี่ / พี่เลี้ยง / แอดมิน" actions={<Button asChild variant="outline"><Link to="/notifications/settings">ตั้งค่าการแจ้งเตือน</Link></Button>}>
      <Section>
        <ul className="divide-y divide-border">
          {data.notifications.map((n) => (
            <li key={n.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className={n.unread ? "size-2 rounded-full bg-primary" : "size-2 rounded-full bg-border"} />
              <span className={n.unread ? "font-medium" : "text-muted-foreground"}>{n.title}</span>
              <Badge variant="outline">{n.type}</Badge>
              <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
            </li>
          ))}
        </ul>
      </Section>
    </AppShell>
  );
}
