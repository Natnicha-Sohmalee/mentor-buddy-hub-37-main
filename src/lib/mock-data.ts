export type Role = "trainee" | "mentor" | "admin";

export const roleLabel: Record<Role, string> = {
  trainee: "เทรนนี่",
  mentor: "พี่เลี้ยง",
  admin: "แอดมิน",
};

export const houses = ["บ้านนวัตกรรม", "บ้านข้อมูล", "บ้านออกแบบ", "บ้านโครงสร้าง"] as const;
export const traineeTeams = ["Frontend", "Backend", "Data", "UX/UI", "QA"];
export const mentorTeams = ["Core Platform", "Product", "Design System", "Infra"];
export const projectTypes = ["Internal Tool", "Customer Product", "Research", "Migration"];

export type Trainee = {
  id: string;
  nickname: string;
  fullName: string;
  email: string;
  emailPublic: boolean;
  team: string;
  house: string;
  project: string;
  mentor: string;
  status: "มีงาน" | "ว่างงาน";
  startDate: string;
  endDate: string;
  position: string;
};

export const trainees: Trainee[] = [
  { id: "t1", nickname: "มายด์", fullName: "ณัฐณิชา โซ๊ะมาลี", email: "mind@trainee.co.th", emailPublic: true, team: "Frontend", house: "บ้านนวัตกรรม", project: "ระบบจัดการเทรนนี่", mentor: "พี่โอ๊ต", status: "มีงาน", startDate: "2026-05-04", endDate: "2026-08-28", position: "Frontend Trainee" },
  { id: "t2", nickname: "ปอนด์", fullName: "ธนดล ศรีสุข", email: "pond@trainee.co.th", emailPublic: true, team: "Backend", house: "บ้านข้อมูล", project: "ระบบจัดการเทรนนี่", mentor: "พี่โอ๊ต", status: "มีงาน", startDate: "2026-05-04", endDate: "2026-08-28", position: "Backend Trainee" },
  { id: "t3", nickname: "แพร", fullName: "พรรณิภา วงศ์ทอง", email: "prae@trainee.co.th", emailPublic: false, team: "UX/UI", house: "บ้านออกแบบ", project: "Design System 2.0", mentor: "พี่ตูน", status: "ว่างงาน", startDate: "2026-06-01", endDate: "2026-09-30", position: "UX Trainee" },
  { id: "t4", nickname: "บีม", fullName: "ภีมเดช จันทรา", email: "beam@trainee.co.th", emailPublic: true, team: "Data", house: "บ้านโครงสร้าง", project: "Data Lake Migration", mentor: "พี่กิ๊ฟ", status: "มีงาน", startDate: "2026-04-01", endDate: "2026-07-31", position: "Data Trainee" },
  { id: "t5", nickname: "ฟ้า", fullName: "ฟ้าใส อินทร์แก้ว", email: "fah@trainee.co.th", emailPublic: true, team: "QA", house: "บ้านนวัตกรรม", project: "ระบบจัดการเทรนนี่", mentor: "พี่แนน", status: "ว่างงาน", startDate: "2026-06-15", endDate: "2026-10-15", position: "QA Trainee" },
  { id: "t6", nickname: "กัน", fullName: "กันตพงศ์ เพชรดี", email: "gun@trainee.co.th", emailPublic: true, team: "Frontend", house: "บ้านข้อมูล", project: "Mobile Companion App", mentor: "พี่แนน", status: "มีงาน", startDate: "2026-05-04", endDate: "2026-08-28", position: "Frontend Trainee" },
  { id: "t7", nickname: "นิว", fullName: "ณัฐวุฒิ บุญมา", email: "new@trainee.co.th", emailPublic: false, team: "Backend", house: "บ้านออกแบบ", project: "Design System 2.0", mentor: "พี่ตูน", status: "มีงาน", startDate: "2026-03-02", endDate: "2026-06-30", position: "Backend Trainee" },
  { id: "t8", nickname: "จูน", fullName: "จุฑามาศ ทองเปลว", email: "june@trainee.co.th", emailPublic: true, team: "Data", house: "บ้านโครงสร้าง", project: "Data Lake Migration", mentor: "พี่กิ๊ฟ", status: "ว่างงาน", startDate: "2026-07-01", endDate: "2026-10-31", position: "Data Trainee" },
];

export type Mentor = {
  id: string;
  nickname: string;
  fullName: string;
  email: string;
  team: string;
  house: string;
  projects: string[];
  traineeCount: number;
};

export const mentors: Mentor[] = [
  {
    id: "m1",
    nickname: "พี่โอ๊ต",
    fullName: "อธิป เกษมสันต์",
    email: "oat@company.co.th",
    team: "Core Platform",
    house: houses[0],
    projects: ["ระบบจัดการเทรนนี่", "Data Lake Migration"],
    traineeCount: 4,
  },
  {
    id: "m2",
    nickname: "พี่แนน",
    fullName: "นันทิชา ปิ่นทอง",
    email: "nan@company.co.th",
    team: "Product",
    house: houses[1],
    projects: ["Mobile Companion App"],
    traineeCount: 3,
  },
  {
    id: "m3",
    nickname: "พี่ตูน",
    fullName: "อาทิตย์ รักไทย",
    email: "toon@company.co.th",
    team: "Design System",
    house: houses[2],
    projects: ["Design System 2.0"],
    traineeCount: 2,
  },
  {
    id: "m4",
    nickname: "พี่กิ๊ฟ",
    fullName: "กิตติยา สายลม",
    email: "gift@company.co.th",
    team: "Infra",
    house: houses[3],
    projects: ["Data Lake Migration"],
    traineeCount: 2,
  },
];

export type Project = {
  id: string;
  name: string;
  type: string;
  house: string;
  owner: string;
  traineeCount: number;
  mentorCount: number;
  progress: number;
  description: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    name: "ระบบจัดการเทรนนี่",
    type: "Internal Tool",
    house: houses[0],
    owner: "พี่โอ๊ต",
    traineeCount: 5,
    mentorCount: 2,
    progress: 68,
    description: "ระบบบริหารจัดการเทรนนี่ พี่เลี้ยง และโปรเจ็คภายในองค์กร",
  },
  {
    id: "p2",
    name: "Mobile Companion App",
    type: "Customer Product",
    house: houses[1],
    owner: "พี่แนน",
    traineeCount: 4,
    mentorCount: 2,
    progress: 41,
    description: "แอปมือถือสำหรับลูกค้าองค์กร เชื่อมต่อกับระบบหลัก",
  },
  {
    id: "p3",
    name: "Design System 2.0",
    type: "Research",
    house: houses[2],
    owner: "พี่ตูน",
    traineeCount: 3,
    mentorCount: 1,
    progress: 82,
    description: "ยกระดับ Design System ให้รองรับหลายผลิตภัณฑ์",
  },
  {
    id: "p4",
    name: "Data Lake Migration",
    type: "Migration",
    house: houses[3],
    owner: "พี่กิ๊ฟ",
    traineeCount: 2,
    mentorCount: 2,
    progress: 27,
    description: "ย้ายข้อมูลจากระบบเดิมสู่ Data Lake ใหม่",
  },
];

export type TaskStatus = "todo" | "inprogress" | "review" | "done";

export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: "To do",
  inprogress: "In Progress",
  review: "Review",
  done: "Done",
};

export type Task = {
  id: string;
  title: string;
  detail: string;
  project: string;
  assignee: string;
  mentor: string;
  status: TaskStatus;
  due: string;
  priority: "สูง" | "กลาง" | "ต่ำ";
  accepted: boolean;
  feedback?: string;
};

export const tasks: Task[] = [
  {
    id: "TSK-101",
    title: "ทำหน้า Kanban งานของฉัน",
    detail: "สร้างหน้าบอร์ดงานพร้อมลากเปลี่ยนสถานะ และแท็กชื่อโปรเจ็คบนการ์ด",
    project: "ระบบจัดการเทรนนี่",
    assignee: "มายด์",
    mentor: "พี่โอ๊ต",
    status: "inprogress",
    due: "2026-08-14",
    priority: "สูง",
    accepted: true,
  },
  {
    id: "TSK-102",
    title: "ออกแบบ API คำขอกำลังคน",
    detail: "ร่างสัญญา API สำหรับยื่นและอนุมัติคำขอกำลังคน",
    project: "ระบบจัดการเทรนนี่",
    assignee: "ปอนด์",
    mentor: "พี่โอ๊ต",
    status: "review",
    due: "2026-08-12",
    priority: "สูง",
    accepted: true,
  },
  {
    id: "TSK-103",
    title: "ทำ Wireframe หน้าโปรไฟล์",
    detail: "ออกแบบ Wireframe หน้าโปรไฟล์ทั้งเวอร์ชัน desktop และ mobile",
    project: "Design System 2.0",
    assignee: "แพร",
    mentor: "พี่ตูน",
    status: "todo",
    due: "2026-08-18",
    priority: "กลาง",
    accepted: false,
  },
  {
    id: "TSK-104",
    title: "เขียนสคริปต์ย้ายข้อมูลลูกค้า",
    detail: "สคริปต์ ETL ย้ายข้อมูลลูกค้าเข้าสู่ Data Lake",
    project: "Data Lake Migration",
    assignee: "บีม",
    mentor: "พี่กิ๊ฟ",
    status: "inprogress",
    due: "2026-08-20",
    priority: "สูง",
    accepted: true,
  },
  {
    id: "TSK-105",
    title: "เขียน Test Case หน้าเข้าสู่ระบบ",
    detail: "ครอบคลุมกรณีรหัสผ่านผิด ล็อคบัญชี และรีเซ็ตรหัสผ่าน",
    project: "ระบบจัดการเทรนนี่",
    assignee: "ฟ้า",
    mentor: "พี่แนน",
    status: "review",
    due: "2026-08-11",
    priority: "กลาง",
    accepted: true,
  },
  {
    id: "TSK-106",
    title: "สรุปผลทดสอบ Usability",
    detail: "สรุปผลการทดสอบกับผู้ใช้ 5 คน พร้อมข้อเสนอแนะ",
    project: "Mobile Companion App",
    assignee: "กัน",
    mentor: "พี่แนน",
    status: "done",
    due: "2026-08-05",
    priority: "ต่ำ",
    accepted: true,
  },
  {
    id: "TSK-107",
    title: "ทำ Component Table ใหม่",
    detail: "รองรับ sort, filter และ pagination",
    project: "Design System 2.0",
    assignee: "นิว",
    mentor: "พี่ตูน",
    status: "todo",
    due: "2026-08-22",
    priority: "กลาง",
    accepted: false,
  },
  {
    id: "TSK-108",
    title: "ตรวจสอบคุณภาพข้อมูลหลังย้าย",
    detail: "เทียบจำนวนแถวและ checksum ระหว่างระบบเดิมกับใหม่",
    project: "Data Lake Migration",
    assignee: "จูน",
    mentor: "พี่กิ๊ฟ",
    status: "done",
    due: "2026-08-01",
    priority: "สูง",
    accepted: true,
    feedback: "งานเรียบร้อยดีมาก ครั้งหน้าแนบผลรันด้วยนะ",
  },
];

export type Appointment = {
  id: string;
  title: string;
  type: "นิเทศฝึกงาน" | "ปรึกษา" | "ประชุม" | "อื่นๆ";
  date: string;
  time: string;
  mode: "online" | "on-site";
  place: string;
  participants: string[];
  note: string;
};

export const appointments: Appointment[] = [
  {
    id: "a1",
    title: "นิเทศฝึกงาน มายด์ (ครั้งที่ 2)",
    type: "นิเทศฝึกงาน",
    date: "2026-08-13",
    time: "10:00 - 11:00",
    mode: "on-site",
    place: "ห้องประชุม 3 ชั้น 12",
    participants: ["มายด์", "พี่โอ๊ต", "อาจารย์นิเทศ"],
    note: "เตรียมรายงานความคืบหน้าและเอกสารจากมหาวิทยาลัย",
  },
  {
    id: "a2",
    title: "ปรึกษาโครงสร้าง API",
    type: "ปรึกษา",
    date: "2026-08-12",
    time: "14:00 - 15:00",
    mode: "online",
    place: "Google Meet",
    participants: ["ปอนด์", "พี่โอ๊ต"],
    note: "ทบทวนสัญญา API คำขอกำลังคน",
  },
  {
    id: "a3",
    title: "ประชุมสรุปสัปดาห์ทีม Design",
    type: "ประชุม",
    date: "2026-08-14",
    time: "16:00 - 17:00",
    mode: "online",
    place: "Discord: #design-standup",
    participants: ["แพร", "นิว", "พี่ตูน"],
    note: "รีวิว Component ใหม่",
  },
  {
    id: "a4",
    title: "Workshop เขียน Test อัตโนมัติ",
    type: "อื่นๆ",
    date: "2026-08-18",
    time: "09:30 - 12:00",
    mode: "on-site",
    place: "Training Room A",
    participants: ["เทรนนี่ทุกคน"],
    note: "เตรียมโน้ตบุ๊กส่วนตัว",
  },
];

export type DocItem = {
  id: string;
  name: string;
  type: "รายงานฝึกงาน" | "เอกสารโปรเจ็ค" | "อื่นๆ";
  project: string;
  owner: string;
  size: string;
  uploadedAt: string;
  signed: "รอเซ็นรับรอง" | "เซ็นรับรองแล้ว" | "ไม่ต้องเซ็น";
};

export const documents: DocItem[] = [
  {
    id: "d1",
    name: "รายงานฝึกงาน-สัปดาห์ที่-12.pdf",
    type: "รายงานฝึกงาน",
    project: "ระบบจัดการเทรนนี่",
    owner: "มายด์",
    size: "1.4 MB",
    uploadedAt: "2026-08-10",
    signed: "รอเซ็นรับรอง",
  },
  {
    id: "d2",
    name: "API-Contract-Manpower-v2.docx",
    type: "เอกสารโปรเจ็ค",
    project: "ระบบจัดการเทรนนี่",
    owner: "ปอนด์",
    size: "320 KB",
    uploadedAt: "2026-08-09",
    signed: "ไม่ต้องเซ็น",
  },
  {
    id: "d3",
    name: "Usability-Test-Result.pdf",
    type: "เอกสารโปรเจ็ค",
    project: "Mobile Companion App",
    owner: "กัน",
    size: "2.1 MB",
    uploadedAt: "2026-08-06",
    signed: "ไม่ต้องเซ็น",
  },
  {
    id: "d4",
    name: "แบบประเมินจากมหาวิทยาลัย.pdf",
    type: "รายงานฝึกงาน",
    project: "-",
    owner: "บีม",
    size: "880 KB",
    uploadedAt: "2026-07-30",
    signed: "เซ็นรับรองแล้ว",
  },
];

export type Article = {
  id: string;
  title: string;
  category: "คู่มือทำงาน" | "กฎระเบียบ" | "แชร์ความรู้" | "อื่นๆ";
  author: string;
  publishedAt: string;
  status: "เผยแพร่แล้ว" | "รออนุมัติ" | "ฉบับร่าง";
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    id: "k1",
    title: "แนวทางการเขียน Commit Message ให้ทีมอ่านรู้เรื่อง",
    category: "คู่มือทำงาน",
    author: "พี่โอ๊ต",
    publishedAt: "2026-07-21",
    status: "เผยแพร่แล้ว",
    excerpt: "รูปแบบ commit ที่ทีมใช้ร่วมกัน พร้อมตัวอย่างที่ดีและไม่ดี",
    body: [
      "Commit message ที่ดีช่วยให้ทีมย้อนดูประวัติงานได้เร็วขึ้นมาก โดยเฉพาะเวลาที่ต้องแก้บั๊กย้อนหลัง",
      "รูปแบบที่ทีมเราใช้คือ type(scope): summary เช่น feat(task): เพิ่มปุ่มส่งงานเข้ารีวิว",
      "หลีกเลี่ยงข้อความกำกวมอย่าง fix bug หรือ update code เพราะไม่บอกอะไรกับคนอ่านเลย",
    ],
  },
  {
    id: "k2",
    title: "กฎระเบียบการเข้า Standup และการลาสำหรับเทรนนี่",
    category: "กฎระเบียบ",
    author: "แอดมินระบบ",
    publishedAt: "2026-06-02",
    status: "เผยแพร่แล้ว",
    excerpt: "รอบเวลา Standup ทั้ง 3 รอบ และขั้นตอนการยื่นลาที่ถูกต้อง",
    body: [
      "เทรนนี่ต้องเช็คอิน Standup ตามรอบที่ได้รับมอบหมาย หากพลาดรอบให้แจ้งพี่เลี้ยงทันที",
      "การลาป่วยสามารถยื่นย้อนหลังได้ภายใน 1 วันทำการ ส่วนลากิจต้องยื่นล่วงหน้าอย่างน้อย 2 วัน",
    ],
  },
  {
    id: "k3",
    title: "สรุปสิ่งที่ได้เรียนรู้จากการทำ Data Migration",
    category: "แชร์ความรู้",
    author: "จูน",
    publishedAt: "2026-08-08",
    status: "รออนุมัติ",
    excerpt: "บทเรียนจากการย้ายข้อมูลจริงกว่า 12 ล้านแถว",
    body: [
      "สิ่งแรกที่ควรทำคือการทำ inventory ข้อมูลทั้งหมดก่อน ไม่ใช่เริ่มเขียนสคริปต์ทันที",
      "ทุกครั้งที่ย้ายเสร็จ ต้องมีขั้นตอนตรวจสอบ checksum เสมอ",
    ],
  },
  {
    id: "k4",
    title: "เริ่มต้นใช้งาน Design Token ในโปรเจ็คใหม่",
    category: "แชร์ความรู้",
    author: "แพร",
    publishedAt: "2026-08-09",
    status: "รออนุมัติ",
    excerpt: "วิธีนำ token จาก Design System 2.0 ไปใช้",
    body: ["Token ทั้งหมดถูกประกาศไว้ที่ชั้น theme และไม่ควร hardcode ค่าสีในคอมโพเนนต์"],
  },
];

export const notifications = [
  { id: "n1", title: "คุณได้รับมอบหมายงานใหม่ TSK-103", type: "งาน", time: "5 นาทีที่แล้ว", unread: true },
  { id: "n2", title: "นัดหมายนิเทศฝึกงานพรุ่งนี้ 10:00 น.", type: "นัดหมาย", time: "1 ชั่วโมงที่แล้ว", unread: true },
  { id: "n3", title: "คำขอลาของคุณได้รับการอนุมัติ", type: "การลา", time: "3 ชั่วโมงที่แล้ว", unread: true },
  { id: "n4", title: "งาน TSK-102 ถูกส่งเข้าคิวรีวิว", type: "งาน", time: "เมื่อวาน", unread: false },
  { id: "n5", title: "บทความของคุณได้รับการอนุมัติเผยแพร่", type: "บทความ", time: "2 วันที่แล้ว", unread: false },
  { id: "n6", title: "มีคำขอกำลังคนใหม่จากโปรเจ็ค Data Lake Migration", type: "คำขอ", time: "3 วันที่แล้ว", unread: false },
];

export const extensionRequests = [
  { id: "e1", trainee: "บีม", project: "Data Lake Migration", currentEnd: "2026-07-31", newEnd: "2026-08-31", reason: "งาน Migration ยังไม่เสร็จสมบูรณ์", status: "รอพิจารณา", submittedAt: "2026-07-18" },
  { id: "e2", trainee: "นิว", project: "Design System 2.0", currentEnd: "2026-06-30", newEnd: "2026-08-15", reason: "ขอต่อเวลาเพื่อทำโปรเจ็คจบร่วมกับทีม", status: "อนุมัติ", submittedAt: "2026-06-10" },
  { id: "e3", trainee: "ฟ้า", project: "ระบบจัดการเทรนนี่", currentEnd: "2026-10-15", newEnd: "2026-11-30", reason: "มหาวิทยาลัยขยายระยะเวลาฝึกงาน", status: "ไม่อนุมัติ", submittedAt: "2026-08-01" },
];

export const manpowerRequests = [
  { id: "mp1", project: "Data Lake Migration", team: "Data", position: "Data Trainee", amount: 2, house: houses[3], requester: "พี่กิ๊ฟ", status: "เปิดรับ", createdAt: "2026-08-05" },
  { id: "mp2", project: "Mobile Companion App", team: "Frontend", position: "Frontend Trainee", amount: 1, house: houses[1], requester: "พี่แนน", status: "เปิดรับ", createdAt: "2026-08-07" },
  { id: "mp3", project: "Design System 2.0", team: "UX/UI", position: "UX Trainee", amount: 1, house: houses[2], requester: "พี่ตูน", status: "ปิดรับ", createdAt: "2026-07-20" },
];

export const issues = [
  { id: "i1", title: "รันโปรเจ็คในเครื่องไม่ผ่าน ติด error dependency", reporter: "มายด์", project: "ระบบจัดการเทรนนี่", severity: "สูง", status: "กำลังช่วยเหลือ", createdAt: "2026-08-10", reply: "ลองลบ node_modules แล้วติดตั้งใหม่ด้วย bun install นะ" },
  { id: "i2", title: "เข้าถึงฐานข้อมูล staging ไม่ได้", reporter: "ปอนด์", project: "ระบบจัดการเทรนนี่", severity: "สูง", status: "รอรับเรื่อง", createdAt: "2026-08-09", reply: "" },
  { id: "i3", title: "ไม่แน่ใจ flow การอนุมัติบทความ", reporter: "แพร", project: "Design System 2.0", severity: "ต่ำ", status: "แก้ไขแล้ว", createdAt: "2026-08-04", reply: "ดูได้จากบทความคู่มือทำงานหัวข้อการอนุมัติ" },
];

export const feedbacks = [
  { id: "f1", from: "พี่โอ๊ต", to: "มายด์", direction: "พี่เลี้ยง → เทรนนี่", date: "2026-08-08", rating: 4, text: "งานละเอียดดี แต่ควรสื่อสารความคืบหน้าให้ถี่ขึ้นอีกนิด" },
  { id: "f2", from: "มายด์", to: "พี่โอ๊ต", direction: "เทรนนี่ → พี่เลี้ยง", date: "2026-08-08", rating: 5, text: "พี่ให้คำแนะนำชัดเจนมาก ช่วยให้เข้าใจภาพรวมระบบเร็วขึ้น" },
  { id: "f3", from: "พี่แนน", to: "กัน", direction: "พี่เลี้ยง → เทรนนี่", date: "2026-07-30", rating: 4, text: "สรุปผลทดสอบได้ดี ลองเพิ่มข้อเสนอแนะเชิงปฏิบัติมากขึ้น" },
];

export const standupRounds = [
  { id: "r1", name: "รอบที่ 1", window: "08:30 - 10:00" },
  { id: "r2", name: "รอบที่ 2", window: "08:30 - 10:00" },
  { id: "r3", name: "รอบที่ 3", window: "17:30 - 18:00" },
];

export const standupHistory = [
  { date: "2026-08-11", round: "รอบที่ 1", time: "08:42", status: "ตรงเวลา" },
  { date: "2026-08-10", round: "รอบที่ 1", time: "09:05", status: "ตรงเวลา" },
  { date: "2026-08-09", round: "รอบที่ 3", time: "18:12", status: "สาย" },
  { date: "2026-08-08", round: "รอบที่ 1", time: "-", status: "ขาด (ลาป่วย)" },
  { date: "2026-08-07", round: "รอบที่ 1", time: "08:35", status: "ตรงเวลา" },
];

export const leaves = [
  { id: "l1", trainee: "มายด์", type: "ลาป่วย", from: "2026-08-08", to: "2026-08-08", days: 1, reason: "เป็นไข้", status: "อนุมัติ" },
  { id: "l2", trainee: "ปอนด์", type: "ลากิจ", from: "2026-08-14", to: "2026-08-15", days: 2, reason: "ธุระที่มหาวิทยาลัย", status: "รอพิจารณา" },
  { id: "l3", trainee: "จูน", type: "ลาป่วย", from: "2026-08-03", to: "2026-08-04", days: 2, reason: "พักฟื้นหลังผ่าตัดเล็ก", status: "อนุมัติ" },
];

export const users = [
  { id: "u1", nickname: "มายด์", email: "t1@trainee.co.th", role: "trainee", status: "ใช้งาน", lastActive: "วันนี้ 09:12" },
  { id: "u2", nickname: "ปอนด์", email: "t2@trainee.co.th", role: "trainee", status: "ใช้งาน", lastActive: "วันนี้ 08:40" },
  { id: "u3", nickname: "พี่โอ๊ต", email: "oat@company.co.th", role: "mentor", status: "ใช้งาน", lastActive: "วันนี้ 10:02" },
  { id: "u4", nickname: "พี่แนน", email: "nan@company.co.th", role: "mentor", status: "ใช้งาน", lastActive: "เมื่อวาน" },
  { id: "u5", nickname: "แอดมินระบบ", email: "admin@company.co.th", role: "admin", status: "ใช้งาน", lastActive: "วันนี้ 07:55" },
  { id: "u6", nickname: "โบว์", email: "bow@alumni.co.th", role: "alumni", status: "ระงับ", lastActive: "3 เดือนที่แล้ว" },
];

export const cohortStats = [
  { cohort: "รอบ ม.ค. 69", entering: 12, graduating: 12 },
  { cohort: "รอบ มี.ค. 69", entering: 18, graduating: 15 },
  { cohort: "รอบ พ.ค. 69", entering: 24, graduating: 8 },
  { cohort: "รอบ ก.ค. 69", entering: 20, graduating: 0 },
  { cohort: "รอบ ก.ย. 69 (คาดการณ์)", entering: 28, graduating: 0 },
];

export const workflowSteps = [
  { id: "s1", name: "รับ Requirement", owner: "พี่เลี้ยง", detail: "รวบรวมความต้องการจากผู้ใช้งานจริงและสรุปเป็นเอกสาร" },
  { id: "s2", name: "ออกแบบระบบ", owner: "พี่เลี้ยง + เทรนนี่", detail: "ออกแบบสถาปัตยกรรม ฐานข้อมูล และ UX Flow" },
  { id: "s3", name: "พัฒนา", owner: "เทรนนี่", detail: "พัฒนาตามงานที่ได้รับมอบหมายบนบอร์ด Kanban" },
  { id: "s4", name: "รีวิวงาน", owner: "พี่เลี้ยง", detail: "ตรวจงาน อนุมัติหรือตีกลับพร้อม Feedback" },
  { id: "s5", name: "ทดสอบ", owner: "เทรนนี่ (QA)", detail: "ทดสอบระบบตาม Test Case ที่กำหนด" },
  { id: "s6", name: "ส่งมอบ", owner: "พี่เลี้ยง", detail: "ส่งมอบงานและจัดทำเอกสารประกอบ" },
];
