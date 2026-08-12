import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LayoutDashboard } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  roles,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  roles: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="brand-gradient relative hidden flex-col justify-between p-12 text-primary-foreground lg:flex">
        <Link to="/login" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
            <LayoutDashboard className="size-5" />
          </span>
          <span className="text-lg font-semibold">Trainee Hub</span>
        </Link>
        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-semibold leading-snug">
            ระบบบริหารจัดการเทรนนี่ พี่เลี้ยง และโปรเจ็ค
          </h2>
          <p className="opacity-85">
            ติดตามงาน นัดหมาย เอกสาร โปรเจ็ค และกำลังคนของเทรนนี่ได้ในที่เดียว
            พร้อมภาพรวมสำหรับพี่เลี้ยงและแอดมิน
          </p>
        </div>
        <p className="text-sm opacity-70">© 2026 Trainee Hub · Internship Operations Platform</p>
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <p className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              ผู้ใช้งานที่เกี่ยวข้อง: {roles}
            </p>
          </div>
          <div className="surface p-6">{children}</div>
          {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
