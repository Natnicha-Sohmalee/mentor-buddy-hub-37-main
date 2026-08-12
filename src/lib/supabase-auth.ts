const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type SupabaseUser = { id: string; email?: string };

type AuthSession = {
  access_token: string;
  refresh_token: string;
  user: SupabaseUser;
};

const sessionKey = "trainee-hub-supabase-session";

function requireConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env.local");
  }
  return { supabaseUrl, supabaseAnonKey };
}

function headers(accessToken?: string) {
  const { supabaseAnonKey } = requireConfig();
  return {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

async function readError(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as { msg?: string; message?: string };
  return payload.msg ?? payload.message ?? "ไม่สามารถเชื่อมต่อ Supabase ได้";
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(sessionKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as AuthSession;
  } catch {
    localStorage.removeItem(sessionKey);
    return null;
  }
}

export async function signInWithPassword(email: string, password: string) {
  const { supabaseUrl } = requireConfig();
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(await readError(response));
  const session = (await response.json()) as AuthSession;
  localStorage.setItem(sessionKey, JSON.stringify(session));
  return session;
}

export async function getCurrentUser(accessToken: string) {
  const { supabaseUrl } = requireConfig();
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: headers(accessToken) });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as SupabaseUser;
}

export async function getUserRole(accessToken: string, userId: string) {
  const { supabaseUrl } = requireConfig();
  const response = await fetch(`${supabaseUrl}/rest/v1/user_roles?select=role,status&id=eq.${encodeURIComponent(userId)}`, { headers: headers(accessToken) });
  if (!response.ok) throw new Error(await readError(response));
  const rows = (await response.json()) as { role: string; status: string }[];
  return rows[0] ?? null;
}

export async function signOut(accessToken?: string) {
  if (accessToken) {
    const { supabaseUrl } = requireConfig();
    await fetch(`${supabaseUrl}/auth/v1/logout`, { method: "POST", headers: headers(accessToken) });
  }
  localStorage.removeItem(sessionKey);
}
