import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  LayoutDashboard,
  Users,
  UserCog,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRole } from "@/lib/role-context";
import { canAccessPath, navForRole, roleLabels } from "@/lib/navigation";

const liveDataPaths = ["/", "/dashboard", "/profile", "/projects", "/projects/create", "/tasks/board", "/tasks/create", "/notifications", "/notifications/settings", "/knowledge", "/knowledge/create", "/knowledge/approvals", "/appointments", "/appointments/create", "/documents", "/documents/upload", "/issues/report", "/standup", "/leaves/request", "/extensions/request", "/mentors", "/data-status"];

function hasLiveData(pathname: string) {
  return liveDataPaths.includes(pathname) || /^\/documents\/[^/]+$/.test(pathname);
}

function AccountPanel() {
  const { role, user } = useRole();
  return (
    <div className="rounded-lg bg-sidebar-accent/40 p-3 text-xs">
      <p className="truncate font-medium">{user?.email ?? "ยังไม่ได้เข้าสู่ระบบ"}</p>
      <p className="mt-1 opacity-70">บทบาท: {role ? roleLabels[role] : "-"}</p>
    </div>
  );
}

function SidebarContent() {
  const { role, signOut } = useRole();
  const groups = navForRole(role ?? "trainee");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const storageKey = `trainee-hub-expanded-navigation-${role ?? "guest"}`;
  const currentGroup = groups.find((group) => group.items.some((item) => item.to === pathname))?.label;
  const [expanded, setExpanded] = useState<string[]>(() => {
    if (typeof window === "undefined") return groups.map((group) => group.label);
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[];
      return saved.length ? saved : groups.map((group) => group.label);
    } catch {
      return groups.map((group) => group.label);
    }
  });
  const labelForGroup: Record<string, string> = { "ภาพรวม": "เริ่มต้น", "บัญชี": "บัญชี", "งานและโปรเจ็ค": "งาน", "บุคลากร": "ผู้คน", "การทำงาน": "การทำงาน", "ความรู้และการสื่อสาร": "การสื่อสาร", "การดูแลเทรนนี่": "การดูแล", "การจัดการ": "การจัดการ" };

  useEffect(() => {
    if (currentGroup && !expanded.includes(currentGroup)) setExpanded((current) => [...current, currentGroup]);
  }, [currentGroup, expanded]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(expanded));
  }, [expanded, storageKey]);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <LayoutDashboard className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Trainee Hub</p>
          <p className="text-xs opacity-70">ระบบบริหารจัดการเทรนนี่</p>
        </div>
      </div>
      <div className="space-y-2 border-b border-sidebar-border px-3 py-3">
        <p className="px-1 text-xs opacity-60">มุมมองบทบาท</p>
        <AccountPanel />
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 px-3 py-4">
          {groups.map((group) => (
            <div key={group.label} className="rounded-lg border border-sidebar-border/60 bg-sidebar-accent/20">
              <button type="button" onClick={() => setExpanded((current) => current.includes(group.label) ? current.filter((item) => item !== group.label) : [...current, group.label])} className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-semibold">
                {labelForGroup[group.label] ?? group.label}<ChevronDown className={cn("size-4 transition-transform", expanded.includes(group.label) && "rotate-180")} />
              </button>
              {expanded.includes(group.label) && <ul className="space-y-0.5 px-1 pb-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to as "/"}
                      activeOptions={{ exact: item.to === "/" }}
                      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:font-medium data-[status=active]:text-sidebar-primary-foreground"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>}
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="space-y-1 border-t border-sidebar-border p-3">
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          onClick={(event) => {
            event.preventDefault();
            void signOut().finally(() => window.location.assign("/login"));
          }}
        >
          <LogOut className="size-4" /> ออกจากระบบ
        </Link>
      </div>
    </div>
  );
}


export function AppShell({
  title,
  description,
  roles,
  actions,
  children,
}: {
  title: string;
  description?: string;
  roles?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { role, user, loading } = useRole();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">กำลังตรวจสอบสิทธิ์...</div>;
  }

  if (!role || !canAccessPath(role, pathname)) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="max-w-sm space-y-3 text-center">
          <h1 className="text-xl font-semibold">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h1>
          <p className="text-sm text-muted-foreground">โปรดเข้าสู่ระบบด้วยบัญชีที่มีสิทธิ์ หรือกลับไปยังหน้าหลักของคุณ</p>
          <Button asChild><Link to={role === "admin" ? "/dashboard" : "/"}>{role ? "กลับหน้าหลัก" : "ไปหน้าเข้าสู่ระบบ"}</Link></Button>
        </div>
      </div>
    );
  }

  if (!hasLiveData(pathname)) {
    return (
      <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
        <aside className="hidden h-screen lg:sticky lg:top-0 lg:block"><SidebarContent /></aside>
        <main className="grid min-h-screen place-items-center bg-background px-4">
          <div className="max-w-md space-y-3 text-center">
            <h1 className="text-xl font-semibold">หน้าจอนี้กำลังเชื่อมกับข้อมูล Supabase</h1>
            <p className="text-sm text-muted-foreground">ฐานข้อมูลของโมดูลนี้มีพร้อมแล้ว หน้าจอเวอร์ชันปัจจุบันยังไม่แสดงข้อมูลจำลอง และจะถูกเชื่อมเป็นลำดับถัดไป</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden h-screen lg:sticky lg:top-0 lg:block">
        <SidebarContent />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72">
            <SidebarContent />
          </div>
        </div>
      )}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <Link
            to="/search"
            className="hidden flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground sm:flex"
          >
            <Search className="size-4" /> ค้นหาเทรนนี่ พี่เลี้ยง หรือโปรเจ็ค...
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
              <Link to="/notifications">
                <Bell className="size-5" />
              </Link>
            </Button>
            <Link to="/profile" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {(user?.email?.[0] ?? "U").toUpperCase()}
              </span>
              <span className="hidden text-sm leading-tight sm:block">
                <span className="block max-w-48 truncate font-medium">{user?.email}</span>
                <span className="block text-xs text-muted-foreground">{roleLabels[role]}</span>
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                {roles && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    <Users className="size-3.5" /> ผู้ใช้งานที่เกี่ยวข้อง: {roles}
                  </p>
                )}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function Section({
  title,
  description,
  actions,
  className,
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("surface p-5", className)}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="surface p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export { UserCog };
