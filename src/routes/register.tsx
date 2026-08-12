import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/register")({ head: () => pageHead("ขอสร้างบัญชี", "บัญชีถูกสร้างโดยผู้ดูแลระบบ"), component: RegisterPage });
function RegisterPage() {
  return <AuthLayout title="ขอสร้างบัญชี" subtitle="บัญชีผู้ใช้และโปรไฟล์ถูกจัดการผ่าน Supabase โดยผู้ดูแลระบบ" footer={<>มีบัญชีแล้ว? <Link to="/login" className="font-medium text-primary hover:underline">เข้าสู่ระบบ</Link></>}><Alert><Info className="size-4" /><AlertTitle>ยังเปิดสมัครสมาชิกด้วยตนเองไม่ได้</AlertTitle><AlertDescription>โครงสร้าง RLS ปัจจุบันกำหนดให้ผู้ดูแลระบบสร้าง Auth user, user role และ profile ให้ครบก่อน จึงไม่มีข้อมูลจำลองหรือฟอร์มสมัครที่บันทึกไม่ได้บนหน้านี้</AlertDescription></Alert><Button asChild className="mt-4 w-full"><Link to="/login">กลับหน้าเข้าสู่ระบบ</Link></Button></AuthLayout>;
}
