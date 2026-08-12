export type Role = "trainee" | "mentor" | "admin";

export const roleLabels: Record<Role, string> = {
  trainee: "เทรนนี่",
  mentor: "พี่เลี้ยง",
  admin: "แอดมิน",
};

export type SprintId = 1 | 2 | 3 | 4 | 5;

export type PageEntry = {
  code: string;
  label: string;
  to: string;
  roles: Role[];
  sprint: SprintId;
  group: string;
  /** dynamic/detail pages are reachable from lists, not from the sidebar */
  nav?: boolean;
  note?: string;
};

export const sprints: { id: SprintId; title: string; goal: string }[] = [
  {
    id: 1,
    title: "Sprint 1 · โครงสร้างพื้นฐานและผู้ใช้งาน",
    goal: "ทุกบทบาทเข้าสู่ระบบและดูโปรไฟล์ได้ แอดมินเตรียมผู้ใช้และข้อมูลอ้างอิงให้ระบบ",
  },
  {
    id: 2,
    title: "Sprint 2 · โปรเจ็คและการจัดการงาน",
    goal: "พี่เลี้ยงสร้างและมอบหมายงาน เทรนนี่รับงานและส่ง Review ผ่าน Kanban ได้",
  },
  {
    id: 3,
    title: "Sprint 3 · นัดหมาย เอกสาร และการช่วยเหลือ",
    goal: "สื่อสารกันได้ผ่านนัดหมาย เอกสาร การแจ้งปัญหา และ Feedback",
  },
  {
    id: 4,
    title: "Sprint 4 · ลงเวลา คลังความรู้ และแจ้งเตือน",
    goal: "มีคู่มือการทำงาน ระบบแจ้งเตือน การเช็คอิน Standup และการลา",
  },
  {
    id: 5,
    title: "Sprint 5 · การจัดการขั้นสูงและรายงาน",
    goal: "ปรับแผนกำลังคน ขยายเวลาฝึกงาน Dashboard ผู้บริหาร และ Export รายงาน",
  },
];

const T: Role[] = ["trainee"];
const M: Role[] = ["mentor"];
const A: Role[] = ["admin"];
const TM: Role[] = ["trainee", "mentor"];
const MA: Role[] = ["mentor", "admin"];
const ALL: Role[] = ["trainee", "mentor", "admin"];

export const pages: PageEntry[] = [
  // Sprint 1
  { code: "1.1", label: "เข้าสู่ระบบ", to: "/login", roles: ALL, sprint: 1, group: "บัญชีผู้ใช้", nav: false },
  { code: "1.2", label: "สมัครสมาชิก", to: "/register", roles: T, sprint: 1, group: "บัญชีผู้ใช้", nav: false },
  { code: "1.3", label: "ลืมรหัสผ่าน", to: "/forgot-password", roles: TM, sprint: 1, group: "บัญชีผู้ใช้", nav: false },
  { code: "1.3", label: "รีเซ็ตรหัสผ่าน", to: "/reset-password", roles: TM, sprint: 1, group: "บัญชีผู้ใช้", nav: false },
  { code: "3.1", label: "โปรไฟล์ของฉัน", to: "/profile", roles: ALL, sprint: 1, group: "โปรไฟล์" },
  { code: "3.2", label: "รายชื่อเทรนนี่", to: "/trainees", roles: MA, sprint: 1, group: "โปรไฟล์" },
  { code: "3.3", label: "รายละเอียดเทรนนี่", to: "/trainees/$traineeId", roles: MA, sprint: 1, group: "โปรไฟล์", nav: false },
  { code: "3.4", label: "รายชื่อพี่เลี้ยง", to: "/mentors", roles: ALL, sprint: 1, group: "โปรไฟล์" },
  { code: "3.5", label: "รายละเอียดพี่เลี้ยง", to: "/mentors/$mentorId", roles: ALL, sprint: 1, group: "โปรไฟล์", nav: false },
  { code: "15.1", label: "ผู้ใช้งานและสิทธิ์", to: "/admin/users", roles: A, sprint: 1, group: "จัดการระบบ" },
  { code: "15.2", label: "ข้อมูลอ้างอิง (ทีม/บ้าน)", to: "/admin/master-data", roles: A, sprint: 1, group: "จัดการระบบ" },

  // Sprint 2
  { code: "2.1", label: "ภาพรวมของฉัน", to: "/", roles: TM, sprint: 2, group: "หน้าหลัก" },
  { code: "7.1", label: "รายการโปรเจ็ค", to: "/projects", roles: ALL, sprint: 2, group: "โปรเจ็ค" },
  { code: "7.2", label: "รายละเอียดโปรเจ็ค", to: "/projects/$projectId", roles: ALL, sprint: 2, group: "โปรเจ็ค", nav: false },
  { code: "7.3", label: "แก้ไข Diagram โปรเจ็ค", to: "/projects/$projectId/diagram", roles: M, sprint: 2, group: "โปรเจ็ค", nav: false },
  { code: "7.4", label: "สร้างโปรเจ็คใหม่", to: "/projects/create", roles: A, sprint: 2, group: "โปรเจ็ค" },
  { code: "4.1", label: "Kanban งานของฉัน", to: "/tasks/board", roles: T, sprint: 2, group: "การจัดการงาน" },
  { code: "4.2", label: "รายละเอียดงาน", to: "/tasks/$taskId", roles: TM, sprint: 2, group: "การจัดการงาน", nav: false },
  { code: "4.3", label: "สร้าง/มอบหมายงาน", to: "/tasks/create", roles: M, sprint: 2, group: "การจัดการงาน" },
  { code: "4.4", label: "Kanban ติดตามทีม", to: "/tasks/team", roles: M, sprint: 2, group: "การจัดการงาน" },
  { code: "4.5", label: "คิว Review งาน", to: "/tasks/review", roles: M, sprint: 2, group: "การจัดการงาน" },

  // Sprint 3
  { code: "5.1", label: "ปฏิทินนัดหมาย", to: "/appointments", roles: TM, sprint: 3, group: "นัดหมาย" },
  { code: "5.2", label: "สร้างนัดหมาย", to: "/appointments/create", roles: M, sprint: 3, group: "นัดหมาย" },
  { code: "5.3", label: "รายละเอียดนัดหมาย", to: "/appointments/$appointmentId", roles: TM, sprint: 3, group: "นัดหมาย", nav: false },
  { code: "6.1", label: "รายการเอกสาร", to: "/documents", roles: ALL, sprint: 3, group: "เอกสาร" },
  { code: "6.2", label: "อัปโหลดเอกสาร", to: "/documents/upload", roles: TM, sprint: 3, group: "เอกสาร" },
  { code: "6.3", label: "รายละเอียดเอกสาร", to: "/documents/$documentId", roles: MA, sprint: 3, group: "เอกสาร", nav: false },
  { code: "11.1", label: "แจ้งปัญหา", to: "/issues/report", roles: T, sprint: 3, group: "ปัญหาและ Feedback" },
  { code: "11.2", label: "รายการปัญหา", to: "/issues", roles: M, sprint: 3, group: "ปัญหาและ Feedback" },
  { code: "11.3", label: "Feedback", to: "/feedback", roles: TM, sprint: 3, group: "ปัญหาและ Feedback" },

  // Sprint 4
  { code: "8.1", label: "รายการบทความ", to: "/knowledge", roles: ALL, sprint: 4, group: "คลังความรู้" },
  { code: "8.2", label: "รายละเอียดบทความ", to: "/knowledge/$articleId", roles: ALL, sprint: 4, group: "คลังความรู้", nav: false },
  { code: "8.3", label: "สร้าง/แก้ไขบทความ", to: "/knowledge/create", roles: TM, sprint: 4, group: "คลังความรู้" },
  { code: "8.4", label: "คิวอนุมัติบทความ", to: "/knowledge/approvals", roles: A, sprint: 4, group: "คลังความรู้" },
  { code: "12.1", label: "เช็คอิน Standup", to: "/standup", roles: T, sprint: 4, group: "Standup และการลา" },
  { code: "12.2", label: "ยื่นคำขอลา", to: "/leaves/request", roles: T, sprint: 4, group: "Standup และการลา" },
  { code: "12.3", label: "รายการการลา", to: "/leaves", roles: MA, sprint: 4, group: "Standup และการลา" },
  { code: "13.1", label: "ศูนย์การแจ้งเตือน", to: "/notifications", roles: ALL, sprint: 4, group: "การแจ้งเตือน" },
  { code: "13.2", label: "ตั้งค่าการแจ้งเตือน", to: "/notifications/settings", roles: TM, sprint: 4, group: "การแจ้งเตือน" },

  // Sprint 5
  { code: "9.1", label: "ยื่นคำขอขยายเวลา", to: "/extensions/request", roles: TM, sprint: 5, group: "ขยายเวลาฝึกงาน" },
  { code: "9.2", label: "รายการคำขอขยายเวลา", to: "/extensions", roles: A, sprint: 5, group: "ขยายเวลาฝึกงาน" },
  { code: "10.1", label: "ยื่นคำขอกำลังคน", to: "/manpower/request", roles: M, sprint: 5, group: "คำขอกำลังคน" },
  { code: "10.2", label: "รายการคำขอกำลังคน", to: "/manpower", roles: MA, sprint: 5, group: "คำขอกำลังคน" },
  { code: "2.2", label: "Dashboard ภาพรวมระบบ", to: "/dashboard", roles: A, sprint: 5, group: "หน้าหลัก" },
  { code: "14.1", label: "ค้นหา/กรองข้อมูล", to: "/search", roles: ALL, sprint: 5, group: "ค้นหาและรายงาน" },
  { code: "14.2", label: "Export รายงาน", to: "/reports", roles: A, sprint: 5, group: "ค้นหาและรายงาน" },
];

export function navForRole(role: Role) {
  const bySprint = sprints.map((s) => ({
    ...s,
    items: pages.filter((p) => p.sprint === s.id && p.nav !== false && p.roles.includes(role)),
  }));
  return bySprint.filter((s) => s.items.length > 0);
}

export function pagesForRole(role: Role) {
  return pages.filter((p) => p.roles.includes(role));
}
