import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { useState,type FormEvent } from "react";
import { AppShell,Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageHead } from "@/lib/head";
import { insertRow } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";
export const Route=createFileRoute("/appointments/create")({head:()=>pageHead("สร้างนัดหมาย","บันทึก Supabase"),component:CreateAppointment});
function CreateAppointment(){const{user}=useRole();const navigate=useNavigate();const[type,setType]=useState("");const[scheduledAt,setScheduledAt]=useState("");const[url,setUrl]=useState("");const[error,setError]=useState<string|null>(null);const submit=async(e:FormEvent)=>{e.preventDefault();if(!user)return;try{const a=await insertRow<{id:string}>("appointments",{type:type||null,scheduled_at:new Date(scheduledAt).toISOString(),location_url:url||null,created_by:user.id,title:type||"นัดหมาย",status:"scheduled"});await insertRow("appointment_participants",{appointment_id:a.id,user_id:user.id,participant_role:"organizer"});await navigate({to:"/appointments"});}catch(err){setError(err instanceof Error?err.message:"สร้างนัดหมายไม่สำเร็จ");}};return <AppShell title="สร้างนัดหมาย" description="สร้างนัดหมายส่วนตัวหรือขอคำปรึกษา และเพิ่มตัวคุณเป็นผู้เข้าร่วม"><Section><form className="grid max-w-xl gap-4" onSubmit={submit}><div><Label>ประเภทนัดหมาย</Label><Input value={type} onChange={e=>setType(e.target.value)} placeholder="เช่น ขอคำปรึกษา" /></div><div><Label>วันและเวลา</Label><Input type="datetime-local" value={scheduledAt} onChange={e=>setScheduledAt(e.target.value)} required/></div><div><Label>ลิงก์หรือสถานที่</Label><Input value={url} onChange={e=>setUrl(e.target.value)} /></div>{error&&<p className="text-sm text-destructive">{error}</p>}<Button>สร้างนัดหมาย</Button></form></Section></AppShell>;}
