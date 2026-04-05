import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const openings = [
  {
    title: "SAP FICO Consultant",
    type: "Full-time",
    location: "Remote / India",
    experience: "3-7 years",
    desc: "Lead financial module configurations and implementations for enterprise clients. Strong knowledge of SAP FI/CO processes required."
  },
  {
    title: "SAP ABAP Developer",
    type: "Full-time",
    location: "Remote / India",
    experience: "2-5 years",
    desc: "Develop custom ABAP programs, enhancements, and interfaces. Experience with S/4HANA and Fiori is a plus."
  },
  {
    title: "SAP Basis Administrator",
    type: "Full-time / Contract",
    location: "Remote / India",
    experience: "3-6 years",
    desc: "Manage SAP system landscapes, performance tuning, upgrades, and migrations. HANA database experience preferred."
  },
  {
    title: "SAP Training Instructor",
    type: "Full-time / Part-time",
    location: "Remote / India",
    experience: "5+ years",
    desc: "Deliver high-quality SAP training programs across multiple modules. Strong communication and mentoring skills essential."
  },
  {
    title: "Business Development Manager",
    type: "Full-time",
    location: "India",
    experience: "4-8 years",
    desc: "Drive SAP consulting sales, build client relationships, and identify new opportunities in the enterprise IT space."
  },
];

const perks = [
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Clear career paths with continuous learning and SAP certification support." },
  { icon: Users, title: "Collaborative Culture", desc: "Work alongside experienced SAP professionals in a supportive team environment." },
  { icon: Clock, title: "Flexible Work", desc: "Remote-first culture with flexible hours to maintain work-life balance." },
  { icon: Heart, title: "Comprehensive Benefits", desc: "Competitive compensation, health insurance, and professional development allowances." },
];

export default function CareersPage() {
  return (
    <div data-testid="careers-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-40 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-[#1ab69e] rounded-full blur-[96px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Join Our Team</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="careers-title">
              Careers at EYESAP
            </h1>
            <p className="text-slate-400 font-body mt-6 max-w-xl text-lg leading-relaxed">
              Build your career with a team that's shaping the future of SAP consulting, staffing, and training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Why EYESAP</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Why Work With Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full hover:shadow-lg transition-all duration-300" data-testid={`perk-${i}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center mb-5">
                    <perk.icon className="w-6 h-6 text-[#1ab69e]" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-[#0F172A] mb-2">{perk.title}</h3>
                  <p className="text-[#64748B] font-body text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Openings</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Current Opportunities
            </h2>
            <p className="text-[#64748B] font-body mt-4 max-w-lg">
              We're always looking for talented individuals to join our team. Explore our current openings below.
            </p>
          </motion.div>
          <div className="space-y-6">
            {openings.map((job, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover:border-[#1ab69e]/20 transition-all duration-300 group" data-testid={`job-${i}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-2 group-hover:text-[#1ab69e] transition-colors">{job.title}</h3>
                      <p className="text-[#64748B] font-body text-sm leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex flex-wrap gap-3 text-xs font-body">
                        <span className="flex items-center gap-1.5 text-[#64748B]">
                          <Briefcase className="w-3.5 h-3.5 text-[#1ab69e]" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-[#64748B]">
                          <MapPin className="w-3.5 h-3.5 text-[#1ab69e]" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-[#64748B]">
                          <Clock className="w-3.5 h-3.5 text-[#1ab69e]" /> {job.experience}
                        </span>
                      </div>
                    </div>
                    <Link to="/contact">
                      <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-6 rounded-full shrink-0" data-testid={`apply-btn-${i}`}>
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Don't See a Fit? Reach Out Anyway
            </h2>
            <p className="text-slate-400 font-body mt-4 max-w-md mx-auto">
              We're always open to connecting with talented SAP professionals. Send us your resume.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base mt-8" data-testid="careers-cta">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
