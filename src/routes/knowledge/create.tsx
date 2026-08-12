import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/head";
import { useRole } from "@/lib/role-context";
import { insertRow } from "@/lib/supabase-data";
export const Route=createFileRoute("/knowledge/create")({head:()=>pageHead("เขียนบทความ","บันทึกลง Supabase"),component:CreateArticle});
function CreateArticle(){const{user}=useRole();const navigate=useNavigate();const[title,setTitle]=useState("");const[content,setContent]=useState("");const[error,setError]=useState<string|null>(null);const[saving,setSaving]=useState(false);const submit=async(e:FormEvent)=>{e.preventDefault();if(!user)return;setSaving(true);setError(null);try{await insertRow("articles",{title,content,author_id:user.id,status:"pending"});await navigate({to:"/knowledge"});}catch(err){setError(err instanceof Error?err.message:"บันทึกบทความไม่สำเร็จ");}finally{setSaving(false);}};return <AppShell title="เขียนบทความ" description="บทความจะถูกบันทึกเป็นสถานะรออนุมัติ"><Section><form className="grid max-w-2xl gap-4" onSubmit={submit}><div><Label>หัวข้อ</Label><Input value={title} onChange={e=>setTitle(e.target.value)} required/></div><div><Label>เนื้อหา</Label><Textarea className="min-h-56" value={content} onChange={e=>setContent(e.target.value)} required/></div>{error&&<p className="text-sm text-destructive">{error}</p>}<Button disabled={saving}>{saving?"กำลังบันทึก...":"ส่งขออนุมัติ"}</Button></form></Section></AppShell>;}
