import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user && user.role === "admin") {
    navigate("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Admin only.");
      }
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6" data-testid="admin-login-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#f0fdfa] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#1ab69e]" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#0F172A]" data-testid="admin-login-title">Admin Login</h1>
            <p className="text-[#64748B] font-body text-sm mt-2">Sign in to manage your website</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="admin-login-form">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm font-medium text-[#0F172A]">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@eyesap.com"
                className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                data-testid="admin-email-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm font-medium text-[#0F172A]">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                data-testid="admin-password-input"
              />
            </div>
            {error && <p className="text-red-500 font-body text-sm" data-testid="admin-login-error">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold py-6 rounded-full text-base disabled:opacity-50"
              data-testid="admin-login-submit"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
