import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "worker" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  platform: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole, location: string, platform: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "worker@gigshield.in": {
    password: "worker123",
    user: {
      id: "w1",
      name: "Rahul Kumar",
      email: "worker@gigshield.in",
      role: "worker",
      location: "Mumbai, Maharashtra",
      platform: "Zomato",
    },
  },
  "admin@gigshield.in": {
    password: "admin123",
    user: {
      id: "a1",
      name: "Priya Sharma",
      email: "admin@gigshield.in",
      role: "admin",
      location: "Delhi, NCR",
      platform: "GigShield",
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, _password: string, role: UserRole, location: string, platform: string): boolean => {
    setUser({ id: `u_${Date.now()}`, name, email, role, location, platform });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
