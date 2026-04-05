import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, UserCheck, Briefcase, Clock, Globe, Award, Handshake } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staffingModels = [
  { icon: Clock, title: "Contract Staffing", desc: "Engage experienced SAP consultants for specific project phases without long-term commitments. Scale up or down as needed." },
  { icon: Briefcase, title: "Permanent Placement", desc: "Build your core SAP team with top-tier talent through our extensive network of pre-vetted professionals." },
  { icon: UserCheck, title: "Team Augmentation", desc: "Scale your existing team quickly with consultants who can integrate seamlessly and hit the ground running." },
  { icon: Globe, title: "Offshore Development", desc: "Access cost-effective SAP expertise from our global talent pool without compromising on quality." },
];

const expertise = [
  "SAP FICO Consultants", "SAP MM/SD Specialists", "SAP ABAP Developers", "SAP Basis Administrators",
  "SAP BW/BI Analysts", "SAP HANA Architects", "SAP Fiori/UI5 Developers", "SAP Project Managers",
  "SAP Solution Architects", "SAP Security Consultants", "SAP SuccessFactors Experts", "SAP Ariba Consultants"
];

export default function SAPStaffingPage() {
  return (
    <div data-testid="sap-staffing-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDB8fHx8MTc3NTM3NTI2MXww&ixlib=rb-4.1.0&q=85"
            alt="SAP Staffing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-[#0F172A]/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Services</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="sap-staffing-title">
              SAP Staffing & Resourcing
            </h1>
            <p className="text-slate-300 font-body mt-6 max-w-xl text-lg leading-relaxed">
              Connecting innovative businesses with top-tier SAP talent. Our staffing solutions ensure you have the right people for every project phase.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-8 py-6 rounded-full text-base mt-8" data-testid="staffing-cta">
                Find SAP Talent <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Staffing Models */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Staffing Models</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Flexible Engagement Options
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staffingModels.map((model, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.12 }}>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-testid={`staffing-model-${i}`}>
                  <div className="w-14 h-14 rounded-2xl bg-[#f0fdfa] flex items-center justify-center mb-6">
                    <model.icon className="w-7 h-7 text-[#1ab69e]" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-3">{model.title}</h3>
                  <p className="text-[#64748B] font-body text-sm leading-relaxed">{model.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Talent Pool</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              SAP Expertise We Staff
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {expertise.map((role, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <div className="bg-[#f0fdfa] rounded-xl p-5 border border-[#ccfbf1] hover:bg-[#ccfbf1] transition-colors duration-300 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1ab69e] shrink-0" />
                  <span className="text-[#0F172A] font-body text-sm font-medium">{role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Our Process</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-3">
              How We Work
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, num: "01", title: "Requirement Analysis", desc: "We understand your project needs, technology stack, and cultural fit requirements." },
              { icon: UserCheck, num: "02", title: "Talent Matching", desc: "Our curated pool is screened rigorously for technical skills, certifications, and experience." },
              { icon: Handshake, num: "03", title: "Seamless Onboarding", desc: "Quick integration with your team, ongoing support, and performance monitoring." },
            ].map((step, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#1ab69e]/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-[#1ab69e]" />
                  </div>
                  <span className="text-[#1ab69e]/40 font-heading font-black text-sm">{step.num}</span>
                  <h3 className="font-heading font-semibold text-lg text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-slate-400 font-body text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base" data-testid="staffing-bottom-cta">
                Request Staffing <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
