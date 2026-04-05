import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Server, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const values = [
  { icon: Target, title: "Mission", desc: "To empower businesses with cutting-edge SAP solutions while nurturing the next generation of IT professionals through comprehensive training programs." },
  { icon: Eye, title: "Vision", desc: "To be the most trusted SAP consulting and training partner, bridging the gap between education and the IT industry globally." },
  { icon: Heart, title: "Values", desc: "Integrity, innovation, and excellence drive everything we do. We believe in building lasting partnerships based on trust and mutual growth." },
];

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#1ab69e] rounded-full blur-[96px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">About Us</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="about-title">
              Who We Are
            </h1>
            <p className="text-slate-400 font-body mt-6 max-w-2xl text-lg leading-relaxed">
              Welcome to EYESAP Technologies. We are a full-service IT consulting company specializing in 
              IT services, outsourcing and Professional/Software training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <img
                src="https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDB8fHx8MTc3NTM3NTI2MXww&ixlib=rb-4.1.0&q=85"
                alt="Our team"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Our Story</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
                Bridging the Gap Between Education & Industry
              </h2>
              <div className="space-y-4 mt-6">
                <p className="text-[#334155] font-body leading-relaxed">
                  We provide best practice-oriented enterprise solutions to large and small-to-medium enterprises 
                  by delivering cost-effective IT solutions.
                </p>
                <p className="text-[#334155] font-body leading-relaxed">
                  We have been committed to bridge the gap between education and the IT industry by providing 
                  relevant training to students, working professionals, and IT experts with industry-relevant skills.
                </p>
                <p className="text-[#334155] font-body leading-relaxed">
                  We are also specialized in connecting innovative businesses with top-tier IT talent through 
                  our outsourcing program.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Our Foundation</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              What Drives Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 h-full hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#f0fdfa] flex items-center justify-center mb-6">
                    <v.icon className="w-7 h-7 text-[#1ab69e]" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-3">{v.title}</h3>
                  <p className="text-[#64748B] font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">What We Do</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Our Core Competencies
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Server, title: "SAP Implementation", desc: "Complete SAP project lifecycle management from assessment to go-live and beyond.", link: "/sap-implementation" },
              { icon: Users, title: "SAP Staffing", desc: "Connecting businesses with pre-vetted SAP professionals for all project needs.", link: "/sap-staffing" },
              { icon: GraduationCap, title: "SAP Training", desc: "Comprehensive training programs that prepare professionals for real-world SAP roles.", link: "/sap-training" },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <Link to={item.link} className="group block" data-testid={`about-service-${i}`}>
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-[#1ab69e] mb-4" />
                    <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-2">{item.title}</h3>
                    <p className="text-[#64748B] font-body text-sm leading-relaxed mb-4">{item.desc}</p>
                    <span className="text-[#1ab69e] font-body font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
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
              Let's Build Something Great Together
            </h2>
            <p className="text-slate-400 font-body mt-4 max-w-md mx-auto">
              Partner with EYESAP Technology for your next SAP initiative.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base mt-8" data-testid="about-cta">
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
