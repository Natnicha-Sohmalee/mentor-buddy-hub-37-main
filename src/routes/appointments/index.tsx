import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect,useState } from "react";
import { AppShell,Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";
type Appointment={id:string;type:string|null;scheduled_at:string;location_url:string|null};
export const Route=createFileRoute("/appointments/")({head:()=>pageHead("นัดหมาย","ข้อมูลจาก Supabase"),component:Appointments});
function Appointments(){const{role}=useRole();const[items,setItems]=useState<Appointment[]>([]);const[error,setError]=useState<string|null>(null);useEffect(()=>{selectRows<Appointment>("appointments","id,type,scheduled_at,location_url","","scheduled_at.asc").then(setItems).catch(e=>setError(e instanceof Error?e.message:"โหลดนัดหมายไม่สำเร็จ"));},[]);return <AppShell title="นัดหมาย" description="นัดหมายที่คุณเป็นผู้เข้าร่วม" actions={role==="mentor"?<Button asChild><Link to="/appointments/create">สร้างนัดหมาย</Link></Button>:undefined}><Section>{error&&<p className="text-sm text-destructive">{error}</p>}<ul className="space-y-3">{items.map(a=><li key={a.id} className="rounded-lg border p-4"><p className="font-semibold">{a.type??"นัดหมาย"}</p><p className="mt-1 text-sm text-muted-foreground">{new Date(a.scheduled_at).toLocaleString("th-TH")}</p>{a.location_url&&<a className="mt-2 block text-sm text-primary hover:underline" href={a.location_url} target="_blank" rel="noreferrer">เปิดลิงก์นัดหมาย</a>}</li>)}</ul>{!items.length&&!error&&<p className="text-sm text-muted-foreground">ยังไม่มีนัดหมาย</p>}</Section></AppShell>;}
