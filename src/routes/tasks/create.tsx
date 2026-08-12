import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { projects, trainees } from "@/lib/mock-data";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/tasks/create")({
  head: () => pageHead("สร้าง/มอบหมายงาน", "สร้างงานใหม่และมอบหมายให้เทรนนี่ทีละคนหรือหลายคนพร้อมกัน"),
  component: CreateTaskPage,
});

function CreateTaskPage() {
  const [mode, setMode] = useState("multi");

  return (
    <AppShell
      title="สร้าง/มอบหมายงาน"
      description="ระบุรายละเอียดงานและเลือกเทรนนี่ผู้รับมอบหมาย"
      roles="พี่เลี้ยง"
      actions={<Button>บันทึกและมอบหมาย</Button>}
    >
      <form className="grid gap-6 lg:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
        <Section title="ข้อมูลงาน" className="lg:col-span-2">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>โปรเจ็ค (ใช้เป็น Tag บนการ์ดงาน)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกโปรเจ็ค" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">ชื่องาน</Label>
              <Input id="title" placeholder="เช่น ทำหน้ารายละเอียดงาน" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detail">รายละเอียดงานเบื้องต้น</Label>
              <Textarea id="detail" rows={6} placeholder="อธิบายขอบเขตงาน สิ่งที่ต้องส่งมอบ และเงื่อนไขการตรวจรับ" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="due">กำหนดส่ง</Label>
                <Input id="due" type="date" />
              </div>
              <div className="space-y-2">
                <Label>ระดับความสำคัญ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกระดับ" />
                  </SelectTrigger>
                  <SelectContent>
                    {["สูง", "กลาง", "ต่ำ"].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>เอกสารประกอบ</Label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground hover:bg-muted">
                <Upload className="size-6" />
                คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่
                <input type="file" className="hidden" multiple />
              </label>
            </div>
          </div>
        </Section>

        <Section title="การมอบหมาย">
          <RadioGroup value={mode} onValueChange={setMode} className="mb-4 space-y-2">
            <label className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
              <RadioGroupItem value="multi" id="multi" /> มอบหมายทีเดียวหลายคน
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
              <RadioGroupItem value="single" id="single" /> มอบหมายทีละคน
            </label>
          </RadioGroup>

          <p className="mb-2 text-sm font-medium">เลือกเทรนนี่ผู้รับมอบหมาย</p>
          <ul className="max-h-80 space-y-2 overflow-auto pr-1">
            {trainees.map((t) => (
              <li key={t.id}>
                <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm">
                  <Checkbox />
                  <span>
                    <span className="font-medium">{t.nickname}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.team} · {t.status}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Section>
      </form>
    </AppShell>
  );
}
