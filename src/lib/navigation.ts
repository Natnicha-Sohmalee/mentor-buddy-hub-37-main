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
  { label: "รายละเอียดงาน", to: "/tasks/$taskId", roles: TM, group: "งานและโปรเจ็ค", nav: false },
  { label: "มอบหมายงาน", to: "/tasks/create", roles: M, group: "งานและโปรเจ็ค" },
  { label: "ติดตามงานทีม", to: "/tasks/team", roles: M, group: "งานและโปรเจ็ค" },
  { label: "คิวรีวิวงาน", to: "/tasks/review", roles: M, group: "งานและโปรเจ็ค" },
  { label: "รายชื่อเทรนนี่", to: "/trainees", roles: MA, group: "บุคลากร" },
  { label: "รายละเอียดเทรนนี่", to: "/trainees/$traineeId", roles: MA, group: "บุคลากร", nav: false },
  { label: "รายชื่อพี่เลี้ยง", to: "/mentors", roles: ALL, group: "บุคลากร" },
  { label: "รายละเอียดพี่เลี้ยง", to: "/mentors/$mentorId", roles: ALL, group: "บุคลากร", nav: false },
  { label: "รายละเอียดโปรเจ็ค", to: "/projects/$projectId", roles: ALL, group: "งานและโปรเจ็ค", nav: false },
  { label: "สร้างโปรเจ็ค", to: "/projects/create", roles: A, group: "งานและโปรเจ็ค" },
  { label: "แก้ไขขั้นตอนโปรเจ็ค", to: "/projects/$projectId/diagram", roles: M, group: "งานและโปรเจ็ค", nav: false },
  { label: "นัดหมาย", to: "/appointments", roles: TM, group: "การทำงาน" },
  { label: "สร้างนัดหมาย", to: "/appointments/create", roles: M, group: "การทำงาน" },
  { label: "เอกสาร", to: "/documents", roles: ALL, group: "การทำงาน" },
  { label: "อัปโหลดเอกสาร", to: "/documents/upload", roles: TM, group: "การทำงาน" },
  { label: "คลังความรู้", to: "/knowledge", roles: ALL, group: "ความรู้และการสื่อสาร" },
  { label: "เขียนบทความ", to: "/knowledge/create", roles: TM, group: "ความรู้และการสื่อสาร" },
  { label: "อนุมัติบทความ", to: "/knowledge/approvals", roles: A, group: "ความรู้และการสื่อสาร" },
  { label: "แจ้งปัญหา", to: "/issues/report", roles: T, group: "ความรู้และการสื่อสาร" },
  { label: "รายการปัญหา", to: "/issues", roles: M, group: "ความรู้และการสื่อสาร" },
  { label: "Feedback", to: "/feedback", roles: TM, group: "ความรู้และการสื่อสาร" },
  { label: "เช็คอิน Standup", to: "/standup", roles: T, group: "การดูแลเทรนนี่" },
  { label: "ยื่นคำขอลา", to: "/leaves/request", roles: T, group: "การดูแลเทรนนี่" },
  { label: "รายการการลา", to: "/leaves", roles: MA, group: "การดูแลเทรนนี่" },
  { label: "ขอขยายเวลาฝึกงาน", to: "/extensions/request", roles: TM, group: "การดูแลเทรนนี่" },
  { label: "คำขอขยายเวลา", to: "/extensions", roles: A, group: "การดูแลเทรนนี่" },
  { label: "ขอกำลังคน", to: "/manpower/request", roles: M, group: "การจัดการ" },
  { label: "รายการกำลังคน", to: "/manpower", roles: MA, group: "การจัดการ" },
  { label: "ผู้ใช้งานและสิทธิ์", to: "/admin/users", roles: A, group: "การจัดการ" },
  { label: "ข้อมูลอ้างอิง", to: "/admin/master-data", roles: A, group: "การจัดการ" },
  { label: "การแจ้งเตือน", to: "/notifications", roles: ALL, group: "บัญชี" },
  { label: "ตั้งค่าการแจ้งเตือน", to: "/notifications/settings", roles: TM, group: "บัญชี" },
  { label: "ค้นหา", to: "/search", roles: ALL, group: "บัญชี" },
  { label: "รายงาน", to: "/reports", roles: A, group: "การจัดการ" },
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
