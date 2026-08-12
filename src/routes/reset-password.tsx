import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/reset-password")({
  head: () => pageHead("ตั้งรหัสผ่านใหม่", "ตั้งรหัสผ่านใหม่หลังกดลิงก์รีเซ็ตจากอีเมล"),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return (
    <AuthLayout
      title="ตั้งรหัสผ่านใหม่"
      subtitle="กำหนดรหัสผ่านใหม่สำหรับบัญชีของคุณ"
      roles="เทรนนี่ / พี่เลี้ยง / แอดมิน"
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="new">รหัสผ่านใหม่</Label>
          <Input id="new" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">ยืนยันรหัสผ่านใหม่</Label>
          <Input id="confirm" type="password" placeholder="พิมพ์รหัสผ่านอีกครั้ง" />
        </div>
        <Button type="submit" className="w-full">
          บันทึกรหัสผ่านใหม่
        </Button>
      </form>
    </AuthLayout>
  );
}
