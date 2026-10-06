import { User } from "@/modules/models/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  login as LoginService,
  getUserLogin,
  logout as LogoutService,
} from "@/modules/auth/services/auth.service";
interface AuthContextType {
  user: User | undefined | null;
  roles: string[];
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    const dataUser = await LoginService(email, password);

    setUser(dataUser?.user);
    setRoles(dataUser?.roles);
    setLoading(false);
    return dataUser?.user;
  }

  async function getUser() {
    try {
      const responseBody = await getUserLogin();
      setUser(responseBody.user);
      setRoles(responseBody.roles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await LogoutService();
    localStorage.clear();
    setUser(null);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, roles, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
