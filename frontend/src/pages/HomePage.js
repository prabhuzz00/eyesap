import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Server, Users, GraduationCap, CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const services = [
  {
    icon: Server,
    title: "SAP Implementation",
    desc: "End-to-end SAP implementation services tailored to your business needs. From planning to go-live, we ensure seamless digital transformation.",
    path: "/sap-implementation",
    color: "from-[#1ab69e]/10 to-[#1ab69e]/5"
  },
  {
    icon: Users,
    title: "SAP Staffing & Resourcing",
    desc: "Connect with top-tier SAP professionals. Our staffing solutions bridge the gap between innovative businesses and expert talent.",
    path: "/sap-staffing",
    color: "from-[#0F172A]/5 to-[#0F172A]/10"
  },
  {
    icon: GraduationCap,
    title: "SAP Training",
    desc: "Industry-relevant SAP training programs for students, professionals, and IT experts. Accelerate your career with hands-on learning.",
    path: "/sap-training",
    color: "from-[#1ab69e]/5 to-[#1ab69e]/10"
  },
];

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "SAP Consultants" },
  { value: "200+", label: "Professionals Trained" },
  { value: "15+", label: "Industries Served" },
];

const whyUs = [
  { icon: Zap, title: "Agile Methodology", desc: "Fast, iterative delivery that adapts to your evolving needs." },
  { icon: Shield, title: "Proven Expertise", desc: "Certified SAP consultants with deep industry experience." },
  { icon: TrendingUp, title: "Cost Effective", desc: "Best practice-oriented solutions that maximize your ROI." },
  { icon: CheckCircle2, title: "End-to-End Support", desc: "From implementation to training, we cover the entire spectrum." },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1765696300043-142687b6b4a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMG9mZmljZSUyMGJ1aWxkaW5nJTIwZGF5bGlnaHR8ZW58MHx8fHwxNzc1Mzc1MjczfDA&ixlib=rb-4.1.0&q=85"
            alt="Modern office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body" data-testid="hero-overline">
              EYESAP Technology
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4 leading-[1.05]" data-testid="hero-title">
              Let's Grow Together by Empowering Futures Through{" "}
              <span className="text-[#1ab69e]">IT Excellence</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-body mt-6 leading-relaxed max-w-2xl" data-testid="hero-subtitle">
              Full-service IT consulting specializing in SAP Implementation, Staffing, and Professional Training for enterprises of all sizes.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/contact">
                <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-8 py-6 rounded-full text-base" data-testid="hero-cta-primary">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-body font-semibold px-8 py-6 rounded-full text-base" data-testid="hero-cta-secondary">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-[#1ab69e] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F172A] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} {...fadeUp} className="text-center">
                <span className="font-heading font-black text-3xl sm:text-4xl text-[#1ab69e]" data-testid={`stat-value-${i}`}>{s.value}</span>
                <p className="text-slate-400 text-sm font-body mt-2">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Our Services</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
              Comprehensive SAP Solutions
            </h2>
            <p className="text-[#64748B] font-body mt-4 max-w-lg">
              We deliver cost-effective IT solutions that drive business growth and digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <Link to={service.path} className="group block" data-testid={`service-card-${i}`}>
                  <div className={`bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon className="w-7 h-7 text-[#1ab69e]" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-[#0F172A] tracking-tight mb-3">{service.title}</h3>
                    <p className="text-[#64748B] font-body text-sm leading-relaxed mb-6">{service.desc}</p>
                    <span className="text-[#1ab69e] font-body font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32" data-testid="why-us-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Why Choose Us</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight mt-3">
                Your Trusted SAP Partner
              </h2>
              <p className="text-[#64748B] font-body mt-4 leading-relaxed">
                With a team of certified SAP consultants and deep industry expertise, we deliver solutions that transform businesses and empower professionals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#1ab69e]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-[#0F172A]">{item.title}</h4>
                      <p className="text-[#64748B] font-body text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBkYXRhJTIwbmV0d29ya3xlbnwwfHx8fDE3NzUzNzUyNzJ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Digital transformation"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#1ab69e] rounded-2xl p-6 text-white shadow-xl">
                  <span className="font-heading font-black text-3xl">10+</span>
                  <p className="text-sm font-body mt-1 text-white/80">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#0F172A]" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-400 font-body mt-4 max-w-lg mx-auto">
              Let's discuss how EYESAP Technology can help you achieve your SAP goals.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base mt-8" data-testid="cta-button">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
