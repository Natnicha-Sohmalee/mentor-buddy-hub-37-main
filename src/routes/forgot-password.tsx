import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/forgot-password")({
  head: () => pageHead("ลืมรหัสผ่าน", "ขอลิงก์รีเซ็ตรหัสผ่านทางอีเมลสำหรับผู้ใช้งานระบบ"),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="ลืมรหัสผ่าน"
      subtitle="กรอกอีเมลที่ใช้สมัคร ระบบจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ให้"
      roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email">อีเมล</Label>
          <Input id="email" type="email" placeholder="you@company.co.th" />
        </div>
        <Button type="submit" className="w-full">
          ส่งลิงก์รีเซ็ตรหัสผ่าน
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          ได้รับลิงก์แล้ว?{" "}
          <Link to="/reset-password" className="text-primary hover:underline">
            ไปหน้าตั้งรหัสผ่านใหม่
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
