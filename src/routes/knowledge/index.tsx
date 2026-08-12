import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/head";
import { selectRows } from "@/lib/supabase-data";
import { useRole } from "@/lib/role-context";
type Article={id:string;title:string;content:string|null;status:string;created_at:string};
export const Route=createFileRoute("/knowledge/")({head:()=>pageHead("คลังความรู้","บทความจาก Supabase"),component:Knowledge});
function Knowledge(){const{role}=useRole();const[items,setItems]=useState<Article[]>([]);const[error,setError]=useState<string|null>(null);useEffect(()=>{selectRows<Article>("articles","id,title,content,status,created_at","","updated_at.desc").then(setItems).catch(e=>setError(e instanceof Error?e.message:"โหลดบทความไม่สำเร็จ"));},[]);return <AppShell title="คลังความรู้" description="บทความที่บัญชีของคุณเข้าถึงได้" actions={role!=="admin"?<Button asChild><Link to="/knowledge/create">เขียนบทความ</Link></Button>:undefined}><Section>{error&&<p className="text-sm text-destructive">{error}</p>}<div className="space-y-3">{items.map(a=><article key={a.id} className="rounded-lg border p-4"><div className="flex justify-between gap-2"><h2 className="font-semibold">{a.title}</h2><Badge variant="secondary">{a.status}</Badge></div>{a.content&&<p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.content}</p>}</article>)}</div>{!items.length&&!error&&<p className="text-sm text-muted-foreground">ยังไม่มีบทความ</p>}</Section></AppShell>;}
