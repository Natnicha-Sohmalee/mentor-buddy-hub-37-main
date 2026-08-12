import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "@/lib/navigation";
import {
  getCurrentUser,
  getStoredSession,
  getUserRole,
  signInWithPassword,
  signOut as revokeSession,
  type SupabaseUser,
} from "@/lib/supabase-auth";

type Ctx = {
  role: Role | null;
  user: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Role>;
  signOut: () => Promise<void>;
};

const RoleContext = createContext<Ctx>({
  role: null,
  user: null,
  loading: true,
  signIn: async () => "trainee",
  signOut: async () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuthenticatedUser = useCallback(async (accessToken: string): Promise<Role> => {
    const currentUser = await getCurrentUser(accessToken);
    const userRole = await getUserRole(accessToken, currentUser.id);
    if (!userRole || userRole.status !== "active") {
      throw new Error("บัญชีนี้ยังไม่มีสิทธิ์เข้าใช้งาน หรือถูกระงับแล้ว");
    }
    if (userRole.role !== "trainee" && userRole.role !== "mentor" && userRole.role !== "admin") {
      throw new Error("บทบาทของบัญชีนี้ยังไม่รองรับในระบบ");
    }
    setUser(currentUser);
    setRole(userRole.role);
    return userRole.role;
  }, []);

  useEffect(() => {
    const session = getStoredSession();
    if (!session) {
      setLoading(false);
      return;
    }
    setAuthenticatedUser(session.access_token)
      .catch(() => revokeSession())
      .finally(() => setLoading(false));
  }, [setAuthenticatedUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    const session = await signInWithPassword(email, password);
    try {
      return await setAuthenticatedUser(session.access_token);
    } catch (error) {
      await revokeSession(session.access_token);
      throw error;
    }
  }, [setAuthenticatedUser]);

  const signOut = useCallback(async () => {
    const session = getStoredSession();
    await revokeSession(session?.access_token);
    setUser(null);
    setRole(null);
  }, []);

  return <RoleContext.Provider value={{ role, user, loading, signIn, signOut }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
