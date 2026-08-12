import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { houses, traineeTeams } from "@/lib/mock-data";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/register")({
  head: () => pageHead("สมัครสมาชิก", "สมัครบัญชีเทรนนี่เพื่อเข้าใช้งานระบบบริหารจัดการเทรนนี่"),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout
      title="สมัครสมาชิก"
      subtitle="กรอกข้อมูลเบื้องต้นเพื่อสร้างบัญชีเทรนนี่"
      roles="เทรนนี่"
      footer={
        <>
          มีบัญชีอยู่แล้ว?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            เข้าสู่ระบบ
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="nickname">ชื่อเล่น</Label>
          <Input id="nickname" placeholder="เช่น มายด์" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">อีเมล</Label>
          <Input id="email" type="email" placeholder="you@trainee.co.th" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Input id="password" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>ทีมเทรนนี่</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="เลือกทีม" />
              </SelectTrigger>
              <SelectContent>
                {traineeTeams.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>บ้าน</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="เลือกบ้าน" />
              </SelectTrigger>
              <SelectContent>
                {houses.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full">
          ยืนยันการสมัคร
        </Button>
        <Alert>
          <Info className="size-4" />
          <AlertTitle>สมัครไม่สำเร็จ?</AlertTitle>
          <AlertDescription>
            หากพบปัญหาในการสมัคร กรุณาติดต่อแอดมินที่ admin@company.co.th เพื่อให้สร้างบัญชีให้
          </AlertDescription>
        </Alert>
      </form>
    </AuthLayout>
  );
}
