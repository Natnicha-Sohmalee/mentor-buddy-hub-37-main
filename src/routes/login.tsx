import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { pageHead } from "@/lib/head";
import { useRole } from "@/lib/role-context";

export const Route = createFileRoute("/login")({
  head: () => pageHead("เข้าสู่ระบบ", "เข้าสู่ระบบ Trainee Hub"),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const role = await signIn(email, password);
      await navigate({ to: role === "admin" ? "/dashboard" : "/" });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="เข้าสู่ระบบ"
      subtitle="กรอกอีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ"
      roles="Trainee / Mentor / Admin"
      footer={
        <>
          ยังไม่มีบัญชี? <Link to="/register" className="font-medium text-primary hover:underline">สมัครสมาชิก</Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="identifier">อีเมล</Label>
          <Input id="identifier" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="mind@trainee.co.th" autoComplete="username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" required />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" /> จดจำการเข้าสู่ระบบ
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">ลืมรหัสผ่าน?</Link>
        </div>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
      </form>
    </AuthLayout>
  );
}
