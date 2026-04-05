import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: [
    { label: "SAP Implementation", path: "/sap-implementation" },
    { label: "SAP Staffing & Resourcing", path: "/sap-staffing" },
    { label: "SAP Training", path: "/sap-training" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact", path: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="https://customer-assets.emergentagent.com/job_eyesap-consulting/artifacts/uooqvbnr_Picsart_26-04-05_14-15-21-768.png"
                alt="EYESAP Technology"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm font-body leading-relaxed max-w-xs">
              Empowering Futures Through IT Excellence. Your trusted partner for SAP implementation, staffing, and training.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.15em] text-[#1ab69e] mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm font-body transition-colors flex items-center gap-1 group"
                    data-testid={`footer-${link.path.slice(1)}`}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.15em] text-[#1ab69e] mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm font-body transition-colors flex items-center gap-1 group"
                    data-testid={`footer-${link.path.slice(1)}`}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.15em] text-[#1ab69e] mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#1ab69e] mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm font-body">info@eyesaptechnology.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1ab69e] mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm font-body">+91-XXXX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1ab69e] mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm font-body">India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-body">
            &copy; {new Date().getFullYear()} EYESAP Technology. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-slate-500 hover:text-slate-300 text-xs font-body transition-colors" data-testid="footer-privacy-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 hover:text-slate-300 text-xs font-body transition-colors" data-testid="footer-terms-link">
              Terms & Conditions
            </Link>
            <Link to="/admin/login" className="text-slate-500 hover:text-slate-300 text-xs font-body transition-colors" data-testid="footer-admin-link">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
