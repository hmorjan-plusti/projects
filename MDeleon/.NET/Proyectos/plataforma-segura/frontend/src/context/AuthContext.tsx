// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginApi, register as registerApi, getProfile } from "../api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Cargar sesión si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      console.log("✅ accessToken login:", data.accessToken);
      localStorage.setItem("token", data.accessToken);
      const profile = await getProfile(data.accessToken);
      setUser(profile);
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerApi(name, email, password);
      console.log("✅ accessToken register:", data.accessToken);
      localStorage.setItem("token", data.accessToken);
      const profile = await getProfile(data.accessToken);
      setUser(profile);
    } catch (error) {
      console.error("❌ Error en register:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
