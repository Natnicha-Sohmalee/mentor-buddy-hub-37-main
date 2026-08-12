import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { pageHead } from "@/lib/head";

const live = ["ผู้ใช้และบทบาท", "โปรไฟล์เทรนนี่", "โปรไฟล์พี่เลี้ยง", "ทีมเทรนนี่ / ทีมพี่เลี้ยง / บ้าน", "ความสัมพันธ์พี่เลี้ยง–เทรนนี่", "โปรเจ็ค", "งานและการมอบหมายงาน", "นัดหมาย", "เอกสารและไฟล์", "คลังความรู้ / บทความ", "การแจ้งเตือน"];
const pending = ["ปัญหาและ Feedback", "Standup และการลา", "คำขอขยายเวลา", "คำขอกำลังคน", "รายงานและ Export"];
export const Route = createFileRoute("/data-status")({ head: () => pageHead("สถานะข้อมูลระบบ", "ตารางที่พร้อมใช้งานใน Supabase"), component: DataStatusPage });
function DataStatusPage() { return <AppShell title="สถานะข้อมูลระบบ" description="อ้างอิงจากข้อมูลที่มีอยู่จริงใน Supabase"><div className="grid gap-6 lg:grid-cols-2"><Section title="พร้อมใช้จาก Supabase"><ul className="space-y-2">{live.map((item) => <li key={item} className="flex items-center justify-between rounded-lg border p-3 text-sm"><span>{item}</span><Badge>พร้อมใช้</Badge></li>)}</ul></Section><Section title="ยังไม่มีตารางหรือข้อมูล"><ul className="space-y-2">{pending.map((item) => <li key={item} className="flex items-center justify-between rounded-lg border p-3 text-sm"><span>{item}</span><Badge variant="secondary">รอเพิ่มฐานข้อมูล</Badge></li>)}</ul></Section></div></AppShell>; }
