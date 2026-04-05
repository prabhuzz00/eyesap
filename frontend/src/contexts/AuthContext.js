import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API = process.env.REACT_APP_BACKEND_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("eyesap_token") || null);

  const axiosAuth = useCallback(() => {
    const instance = axios.create({ baseURL: API, withCredentials: true });
    const t = token || localStorage.getItem("eyesap_token");
    if (t) instance.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    return instance;
  }, [token]);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axiosAuth().get("/api/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("eyesap_token");
    } finally {
      setLoading(false);
    }
  }, [axiosAuth]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { email, password }, { withCredentials: true });
    const t = res.data.token;
    setToken(t);
    localStorage.setItem("eyesap_token", t);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try { await axiosAuth().post("/api/auth/logout"); } catch {}
    setUser(null);
    setToken(null);
    localStorage.removeItem("eyesap_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, axiosAuth, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
