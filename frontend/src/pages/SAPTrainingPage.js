import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, BookOpen, Monitor, Users, Award, Clock, Star } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const courses = [
  { title: "SAP FICO", desc: "Financial Accounting & Controlling - Master the backbone of any SAP implementation.", duration: "8 Weeks", level: "Beginner to Advanced" },
  { title: "SAP MM/SD", desc: "Materials Management & Sales Distribution - End-to-end supply chain expertise.", duration: "8 Weeks", level: "Beginner to Advanced" },
  { title: "SAP ABAP", desc: "Advanced Business Application Programming - Custom development & enhancement skills.", duration: "10 Weeks", level: "Intermediate" },
  { title: "SAP Basis", desc: "System Administration - Landscape management, monitoring, and troubleshooting.", duration: "6 Weeks", level: "Intermediate" },
  { title: "SAP S/4HANA", desc: "Next-gen ERP - Migration strategies, Fiori apps, and embedded analytics.", duration: "10 Weeks", level: "Advanced" },
  { title: "SAP SuccessFactors", desc: "Human Capital Management - Cloud-based HR solutions and talent management.", duration: "6 Weeks", level: "Beginner to Intermediate" },
];

const features = [
  { icon: Monitor, title: "Live SAP Access", desc: "Hands-on practice on real SAP systems, not just theoretical learning." },
  { icon: Users, title: "Expert Instructors", desc: "Learn from certified SAP consultants with 10+ years of industry experience." },
  { icon: BookOpen, title: "Project-Based Learning", desc: "Work on real-world scenarios and end-to-end business processes." },
  { icon: Award, title: "Certification Prep", desc: "Comprehensive preparation for SAP certification exams with practice tests." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Weekend and evening batches available for working professionals." },
  { icon: Star, title: "Placement Support", desc: "Resume building, interview prep, and direct placement assistance." },
];

export default function SAPTrainingPage() {
  return (
    <div data-testid="sap-training-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1970801/pexels-photo-1970801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="SAP Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-[#0F172A]/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Services</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="sap-training-title">
              SAP Training
            </h1>
            <p className="text-slate-300 font-body mt-6 max-w-xl text-lg leading-relaxed">
              Industry-relevant SAP training programs designed to bridge the gap between education and the IT industry. Accelerate your career today.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-8 py-6 rounded-full text-base mt-8" data-testid="training-cta">
                Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Programs</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Training Programs
            </h2>
            <p className="text-[#64748B] font-body mt-4 max-w-lg">
              Comprehensive SAP training for students, working professionals, and IT experts.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-testid={`course-${i}`}>
                  <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-3">{course.title}</h3>
                  <p className="text-[#64748B] font-body text-sm leading-relaxed mb-6">{course.desc}</p>
                  <div className="flex items-center gap-4 text-xs font-body">
                    <span className="bg-[#f0fdfa] text-[#1ab69e] px-3 py-1.5 rounded-full font-semibold">{course.duration}</span>
                    <span className="text-[#64748B]">{course.level}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Why Train With Us</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              What Makes Us Different
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="flex gap-5 items-start" data-testid={`feature-${i}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center shrink-0">
                    <f.icon className="w-6 h-6 text-[#1ab69e]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-[#0F172A] mb-1">{f.title}</h3>
                    <p className="text-[#64748B] font-body text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-24 lg:py-32 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">For Everyone</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-3">
                Who Should Attend?
              </h2>
              <div className="space-y-4 mt-8">
                {[
                  "Fresh graduates looking to start a career in SAP",
                  "Working professionals seeking to upskill or transition to SAP roles",
                  "IT professionals wanting SAP certification",
                  "Business analysts looking to understand SAP processes",
                  "Project managers handling SAP implementations",
                  "Entrepreneurs wanting to leverage SAP for their business"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1ab69e] shrink-0" />
                    <span className="text-slate-300 font-body text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="text-center">
              <div className="bg-[#1ab69e]/10 rounded-2xl p-10 border border-[#1ab69e]/20">
                <h3 className="font-heading font-bold text-2xl text-white mb-4">Ready to Start?</h3>
                <p className="text-slate-400 font-body text-sm mb-8">Enroll now and take the first step towards your SAP career.</p>
                <Link to="/contact">
                  <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base" data-testid="training-bottom-cta">
                    Enquire Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
