import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Layers, Database, Settings, BarChart3, Shield, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const modules = [
  { icon: Database, title: "SAP S/4HANA", desc: "Next-gen ERP with in-memory computing for real-time analytics and simplified data models." },
  { icon: BarChart3, title: "SAP Analytics Cloud", desc: "Business intelligence, planning, and predictive analytics in one cloud solution." },
  { icon: Layers, title: "SAP BTP", desc: "Business Technology Platform for integration, extension, and AI-driven innovation." },
  { icon: Settings, title: "SAP FICO", desc: "Financial Accounting and Controlling for comprehensive financial management." },
  { icon: Shield, title: "SAP GRC", desc: "Governance, Risk, and Compliance solutions for regulatory adherence." },
  { icon: Rocket, title: "SAP Fiori", desc: "Modern UX design for intuitive and role-based SAP applications." },
];

const phases = [
  { num: "01", title: "Discovery & Assessment", desc: "Understanding your business processes, pain points, and objectives to create a tailored roadmap." },
  { num: "02", title: "Design & Blueprint", desc: "Detailed solution design including process mapping, gap analysis, and system architecture." },
  { num: "03", title: "Build & Configure", desc: "System configuration, custom development, integration setup, and data migration planning." },
  { num: "04", title: "Test & Validate", desc: "Comprehensive testing including unit, integration, UAT, and performance testing." },
  { num: "05", title: "Go-Live & Support", desc: "Smooth cutover, hypercare support, and ongoing optimization to ensure long-term success." },
];

export default function SAPImplementationPage() {
  return (
    <div data-testid="sap-implementation-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBkYXRhJTIwbmV0d29ya3xlbnwwfHx8fDE3NzUzNzUyNzJ8MA&ixlib=rb-4.1.0&q=85"
            alt="SAP Implementation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-[#0F172A]/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Services</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="sap-impl-title">
              SAP Implementation
            </h1>
            <p className="text-slate-300 font-body mt-6 max-w-xl text-lg leading-relaxed">
              End-to-end SAP implementation services tailored to your unique business requirements. 
              From greenfield to brownfield, we make digital transformation seamless.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-8 py-6 rounded-full text-base mt-8" data-testid="sap-impl-cta">
                Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Our Methodology</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Proven Implementation Approach
            </h2>
          </motion.div>
          <div className="space-y-6">
            {phases.map((phase, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 flex gap-6 items-start hover:shadow-lg transition-all duration-300 group" data-testid={`phase-${i}`}>
                  <span className="font-heading font-black text-4xl text-[#1ab69e]/20 group-hover:text-[#1ab69e]/40 transition-colors shrink-0">{phase.num}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-2">{phase.title}</h3>
                    <p className="text-[#64748B] font-body text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAP Modules */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Expertise</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              SAP Modules We Implement
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full" data-testid={`module-${i}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center mb-5">
                    <mod.icon className="w-6 h-6 text-[#1ab69e]" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-2">{mod.title}</h3>
                  <p className="text-[#64748B] font-body text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Benefits</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Why Choose EYESAP for Implementation
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Certified SAP consultants with 10+ years of experience",
              "Proven track record across 15+ industries",
              "Agile methodology for faster time-to-value",
              "Comprehensive post-go-live support",
              "Cost-effective solutions without compromising quality",
              "Seamless data migration and system integration",
            ].map((b, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#1ab69e] shrink-0 mt-0.5" />
                <p className="text-slate-300 font-body text-sm">{b}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base" data-testid="impl-bottom-cta">
                Discuss Your Project <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
