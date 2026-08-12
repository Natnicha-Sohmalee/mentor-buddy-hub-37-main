export type Role = "trainee" | "mentor" | "admin";

export const roleLabels: Record<Role, string> = {
  trainee: "เทรนนี่",
  mentor: "พี่เลี้ยง",
  admin: "แอดมิน",
};

export type PageEntry = { label: string; to: string; roles: Role[]; group: string; nav?: boolean };

const T: Role[] = ["trainee"];
const M: Role[] = ["mentor"];
const A: Role[] = ["admin"];
const TM: Role[] = ["trainee", "mentor"];
const MA: Role[] = ["mentor", "admin"];
const ALL: Role[] = ["trainee", "mentor", "admin"];

// Only modules backed by tables that currently exist in Supabase are available.
export const pages: PageEntry[] = [
  { label: "หน้าหลัก", to: "/", roles: TM, group: "ภาพรวม" },
  { label: "Dashboard", to: "/dashboard", roles: A, group: "ภาพรวม" },
  { label: "โปรไฟล์ของฉัน", to: "/profile", roles: ALL, group: "บัญชี" },
  { label: "โปรเจ็ค", to: "/projects", roles: ALL, group: "งานและโปรเจ็ค" },
  { label: "บอร์ดงานของฉัน", to: "/tasks/board", roles: T, group: "งานและโปรเจ็ค" },
];

export function navForRole(role: Role) {
  const groups = new Map<string, PageEntry[]>();
  for (const page of pages) if (page.nav !== false && page.roles.includes(role)) groups.set(page.group, [...(groups.get(page.group) ?? []), page]);
  return [...groups].map(([label, items]) => ({ label, items }));
}

function pathMatches(pattern: string, pathname: string) {
  return new RegExp(`^${pattern.replace(/\$[A-Za-z]+/g, "[^/]+")}/?$`).test(pathname);
}

export function canAccessPath(role: Role, pathname: string) {
  return pages.some((page) => page.roles.includes(role) && pathMatches(page.to, pathname));
}
