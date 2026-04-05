import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SAPImplementationPage from "./pages/SAPImplementationPage";
import SAPStaffingPage from "./pages/SAPStaffingPage";
import SAPTrainingPage from "./pages/SAPTrainingPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout({ children, hideNavFooter }) {
  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <AppLayout hideNavFooter={isAdmin}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sap-implementation" element={<SAPImplementationPage />} />
        <Route path="/sap-staffing" element={<SAPStaffingPage />} />
        <Route path="/sap-training" element={<SAPTrainingPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
