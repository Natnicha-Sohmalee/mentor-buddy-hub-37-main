import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageHead } from "@/lib/head";
import { mentors, trainees } from "@/lib/mock-data";

export const Route = createFileRoute("/appointments/create")({
  head: () => pageHead("สร้างนัดหมาย", "สร้างนัดหมายนิเทศ ปรึกษา หรือประชุม พร้อมเลือกผู้เข้าร่วม"),
  component: CreateAppointment,
});

function CreateAppointment() {
  return (
    <AppShell
      title="สร้างนัดหมาย"
      description="กำหนดประเภท วันเวลา ผู้เกี่ยวข้อง และช่องทางการนัดหมาย"
      roles="พี่เลี้ยง"
      actions={<Button>บันทึกนัดหมาย</Button>}
    >
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
        <Section title="รายละเอียดนัดหมาย" className="lg:col-span-2">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">หัวข้อนัดหมาย</Label>
              <Input id="title" placeholder="เช่น นิเทศฝึกงาน ครั้งที่ 2" />
            </div>
            <div className="space-y-2">
              <Label>ประเภทนัดหมาย</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  {["นิเทศฝึกงาน", "ปรึกษา", "ประชุม", "อื่นๆ"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">วันที่</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from">เวลาเริ่ม</Label>
                <Input id="from" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">เวลาสิ้นสุด</Label>
                <Input id="to" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>ช่องทาง</Label>
              <RadioGroup defaultValue="online" className="flex gap-3">
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-border p-3 text-sm">
                  <RadioGroupItem value="online" id="online" /> ออนไลน์
                </label>
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-border p-3 text-sm">
                  <RadioGroupItem value="onsite" id="onsite" /> On-site
                </label>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="place">ลิงก์ประชุม / สถานที่</Label>
              <Input id="place" placeholder="เช่น Google Meet หรือ ห้องประชุม 3 ชั้น 12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">รายละเอียดเพิ่มเติม</Label>
              <Textarea id="note" rows={4} placeholder="สิ่งที่ผู้เข้าร่วมต้องเตรียม" />
            </div>
          </div>
        </Section>

        <Section title="ผู้เข้าร่วม">
          <p className="mb-2 text-sm font-medium">เทรนนี่</p>
          <ul className="mb-4 max-h-48 space-y-2 overflow-auto pr-1">
            {trainees.map((t) => (
              <li key={t.id}>
                <label className="flex items-center gap-3 rounded-lg border border-border p-2 text-sm">
                  <Checkbox /> {t.nickname}
                </label>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-sm font-medium">พี่เลี้ยง</p>
          <ul className="space-y-2">
            {mentors.map((m) => (
              <li key={m.id}>
                <label className="flex items-center gap-3 rounded-lg border border-border p-2 text-sm">
                  <Checkbox /> {m.nickname}
                </label>
              </li>
            ))}
          </ul>
        </Section>
      </form>
    </AppShell>
  );
}
