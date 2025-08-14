import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

const USERS_KEY = "auth_users";
const SESSION_KEY = "auth_session";

type UserRecord = { email: string; password: string };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUsers(): UserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as UserRecord[]) : [];
  } catch {
    return [];
  }
}

function setUsers(users: UserRecord[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

function getSession(): { email: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as { email: string }) : null;
  } catch {
    return null;
  }
}

function setSession(user: { email: string } | null) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setLoading(false);
  }, []);

  const signIn: AuthContextType["signIn"] = async (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { error: { message: "Invalid credentials" } };
    setSession({ email });
    setUser({ email });
    return { error: null };
  };

  const signUp: AuthContextType["signUp"] = async (email, password) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { error: { message: "Email already registered" } };
    }
    users.push({ email, password });
    setUsers(users);
    setSession({ email });
    setUser({ email });
    return { error: null };
  };

  const signOut = async () => {
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};