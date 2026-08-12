import { getStoredSession } from "@/lib/supabase-auth";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function config() {
  const accessToken = getStoredSession()?.access_token;
  if (!url || !anonKey || !accessToken) throw new Error("ไม่พบ session สำหรับเรียกข้อมูล Supabase");
  return { accessToken, url, anonKey };
}

export async function selectRows<T>(table: string, select: string, filters = "", order?: string): Promise<T[]> {
  const { accessToken, url, anonKey } = config();
  const query = new URLSearchParams({ select });
  if (filters) new URLSearchParams(filters).forEach((value, key) => query.append(key, value));
  if (order) query.set("order", order);
  const response = await fetch(`${url}/rest/v1/${table}?${query.toString()}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message ?? "โหลดข้อมูลไม่สำเร็จ");
  return response.json() as Promise<T[]>;
}

export async function updateRows(table: string, filters: string, values: Record<string, unknown>) {
  const { accessToken, url, anonKey } = config();
  const response = await fetch(`${url}/rest/v1/${table}?${filters}`, {
    method: "PATCH",
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message ?? "บันทึกข้อมูลไม่สำเร็จ");
  return response.json();
}
