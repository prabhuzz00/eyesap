import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Services", path: "#",
    children: [
      { label: "SAP Implementation", path: "/sap-implementation" },
      { label: "SAP Staffing & Resourcing", path: "/sap-staffing" },
      { label: "SAP Training", path: "/sap-training" },
    ]
  },
  { label: "About Us", path: "/about" },
  { label: "Blogs", path: "/blogs" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;
  const isHeroPage = !scrolled;
  const isTransparent = !scrolled && isHeroPage;

  return (
    <motion.header
      data-testid="main-navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img
              src="https://customer-assets.emergentagent.com/job_eyesap-consulting/artifacts/uooqvbnr_Picsart_26-04-05_14-15-21-768.png"
              alt="EYESAP Technology"
              className="h-14 w-auto"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors rounded-lg ${
                      isTransparent ? "hover:bg-white/10" : "hover:bg-[#f0fdfa]"
                    } ${
                      link.children.some(c => isActive(c.path)) ? "text-[#1ab69e]" : isTransparent ? "text-white" : "text-[#334155]"
                    }`}
                    data-testid="services-dropdown"
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                            isActive(child.path)
                              ? "bg-[#f0fdfa] text-[#1ab69e] font-semibold"
                              : "text-[#334155] hover:bg-[#f0fdfa] hover:text-[#1ab69e]"
                          }`}
                          data-testid={`nav-${child.path.slice(1)}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-body font-medium transition-colors rounded-lg ${
                    isTransparent ? "hover:bg-white/10" : "hover:bg-[#f0fdfa]"
                  } ${
                    isActive(link.path) ? "text-[#1ab69e]" : isTransparent ? "text-white" : "text-[#334155]"
                  }`}
                  data-testid={`nav-${link.path === "/" ? "home" : link.path.slice(1)}`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden lg:block">
              <Button
                className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-6 rounded-full"
                data-testid="nav-cta-button"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className={`p-2 rounded-lg ${isTransparent ? "hover:bg-white/10" : "hover:bg-slate-100"}`} data-testid="mobile-menu-toggle">
                  <Menu className={`w-6 h-6 ${isTransparent ? "text-white" : "text-[#0F172A]"}`} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <div className="p-6">
                  <div className="flex items-center mb-8">
                    <img
                      src="https://customer-assets.emergentagent.com/job_eyesap-consulting/artifacts/uooqvbnr_Picsart_26-04-05_14-15-21-768.png"
                      alt="EYESAP Technology"
                      className="h-14 w-auto"
                    />
                  </div>
                  <nav className="space-y-1">
                    {navLinks.map((link) => (
                      link.children ? (
                        <div key={link.label}>
                          <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-[#334155] rounded-lg hover:bg-[#f0fdfa]"
                            data-testid="mobile-services-dropdown"
                          >
                            {link.label}
                            <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {link.children.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className={`block px-4 py-2.5 text-sm rounded-lg ${
                                      isActive(child.path) ? "text-[#1ab69e] font-semibold bg-[#f0fdfa]" : "text-[#64748B] hover:text-[#1ab69e]"
                                    }`}
                                    data-testid={`mobile-nav-${child.path.slice(1)}`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`block px-4 py-3 text-sm font-medium rounded-lg ${
                            isActive(link.path) ? "text-[#1ab69e] bg-[#f0fdfa]" : "text-[#334155] hover:bg-[#f0fdfa]"
                          }`}
                          data-testid={`mobile-nav-${link.path === "/" ? "home" : link.path.slice(1)}`}
                        >
                          {link.label}
                        </Link>
                      )
                    ))}
                  </nav>
                  <Link to="/contact" className="block mt-6">
                    <Button className="w-full bg-[#1ab69e] hover:bg-[#149380] text-white font-semibold rounded-full" data-testid="mobile-cta-button">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
