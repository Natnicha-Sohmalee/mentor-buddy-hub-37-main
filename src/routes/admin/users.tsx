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

export const Route = createFileRoute("/admin/users")({
  head: () => pageHead("จัดการผู้ใช้งานและสิทธิ์", "ดูรายชื่อผู้ใช้ เปลี่ยนบทบาท และระงับหรือเปิดใช้งานบัญชี"),
  component: AdminUsers,
});

function AdminUsers() {
  return (
    <AppShell title="จัดการผู้ใช้งานและสิทธิ์" description="ดูรายชื่อผู้ใช้ เปลี่ยนบทบาท และระงับหรือเปิดใช้งานบัญชี" roles="แอดมิน" actions={<Button>สร้างบัญชีให้ผู้ใช้</Button>}>
      <Section>
        <Table>
          <TableHeader><TableRow><TableHead>ชื่อเล่น</TableHead><TableHead>อีเมล</TableHead><TableHead>บทบาท</TableHead><TableHead>สถานะบัญชี</TableHead><TableHead>ใช้งานล่าสุด</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {data.users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.nickname}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                <TableCell><Badge variant={u.status === "ใช้งาน" ? "default" : "destructive"}>{u.status}</Badge></TableCell>
                <TableCell>{u.lastActive}</TableCell>
                <TableCell className="space-x-1 text-right">
                  <Button size="sm" variant="outline">เปลี่ยนบทบาท</Button>
                  <Button size="sm" variant="ghost">{u.status === "ใช้งาน" ? "ระงับบัญชี" : "เปิดใช้งาน"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </AppShell>
  );
}
