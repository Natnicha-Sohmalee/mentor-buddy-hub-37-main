import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { pageHead } from "@/lib/head";
import { trainees } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => pageHead("โปรไฟล์ของฉัน", "ดูและแก้ไขข้อมูลส่วนตัว ทีม บ้าน และระยะเวลาฝึกงานของคุณ"),
  component: ProfilePage,
});

function ProfilePage() {
  const me = trainees[0]!;

  return (
    <AppShell
      title="โปรไฟล์ของฉัน"
      description="ข้อมูลส่วนตัวและการตั้งค่าการมองเห็น"
      roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
      actions={<Button>บันทึกการแก้ไข</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Section className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
              ม
            </span>
            <p className="mt-3 text-lg font-semibold">{me.nickname}</p>
            <p className="text-sm text-muted-foreground">{me.fullName}</p>
            <Badge className="mt-2" variant="secondary">
              {me.position}
            </Badge>
            <dl className="mt-5 w-full space-y-2 text-left text-sm">
              <Row label="ทีม" value={me.team} />
              <Row label="บ้าน" value={me.house} />
              <Row label="พี่เลี้ยง" value={me.mentor} />
              <Row label="โปรเจ็ค" value={me.project} />
              <Row label="ระยะเวลาฝึกงาน" value={`${me.startDate} – ${me.endDate}`} />
            </dl>
          </div>
        </Section>

        <div className="space-y-6 lg:col-span-2">
          <Section title="แก้ไขข้อมูลส่วนตัว">
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="nick">ชื่อเล่น</Label>
                <Input id="nick" defaultValue={me.nickname} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full">ชื่อ-นามสกุล</Label>
                <Input id="full" defaultValue={me.fullName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input id="email" defaultValue={me.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pos">ตำแหน่ง</Label>
                <Input id="pos" defaultValue={me.position} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start">วันที่เริ่มฝึกงาน</Label>
                <Input id="start" type="date" defaultValue={me.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">วันที่สิ้นสุด</Label>
                <Input id="end" type="date" defaultValue={me.endDate} />
              </div>
            </form>
          </Section>

          <Section title="ความเป็นส่วนตัว" description="สำหรับเทรนนี่">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">แสดงอีเมลของฉันให้ผู้ใช้อื่นเห็น</p>
                <p className="text-sm text-muted-foreground">
                  หากปิด จะเห็นเฉพาะพี่เลี้ยงที่ดูแลและแอดมินเท่านั้น
                </p>
              </div>
              <Switch defaultChecked={me.emailPublic} />
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
