import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function TermsPage() {
  return (
    <div data-testid="terms-page">
      <section className="relative pt-32 pb-16 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Legal</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="terms-title">
              Terms & Conditions
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="space-y-8 text-[#334155] font-body leading-relaxed">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the EYESAP Technology website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">2. Services</h2>
              <p>EYESAP Technology provides SAP implementation, staffing & resourcing, and training services. The specific terms of each engagement will be outlined in separate service agreements between EYESAP Technology and the client.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">3. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of EYESAP Technology and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You agree to provide accurate information when using our contact forms or services</li>
                <li>You will not use our website for any unlawful purpose</li>
                <li>You will not attempt to gain unauthorized access to our systems</li>
                <li>You are responsible for maintaining the confidentiality of any account information</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">5. Limitation of Liability</h2>
              <p>EYESAP Technology shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">6. Confidentiality</h2>
              <p>Both parties agree to maintain the confidentiality of proprietary information shared during the course of business. This obligation extends beyond the termination of any service agreement.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">7. Termination</h2>
              <p>We reserve the right to terminate or suspend access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">8. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">9. Contact</h2>
              <p>For any questions about these Terms, please <Link to="/contact" className="text-[#1ab69e] hover:underline font-semibold">contact us</Link>.</p>
            </div>
            <p className="text-[#64748B] text-sm italic">Last updated: December 2025</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
