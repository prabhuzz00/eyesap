import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function PrivacyPolicyPage() {
  return (
    <div data-testid="privacy-policy-page">
      <section className="relative pt-32 pb-16 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Legal</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="privacy-title">
              Privacy Policy
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="space-y-8 text-[#334155] font-body leading-relaxed">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you information about our services, including SAP implementation, staffing, and training</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law. We may share information with trusted service providers who assist us in operating our website and conducting our business.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">5. Cookies</h2>
              <p>Our website uses cookies and similar technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us at info@eyesaptechnology.com.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#0F172A] mb-3">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-[#1ab69e] hover:underline font-semibold">contact us</Link>.</p>
            </div>
            <p className="text-[#64748B] text-sm italic">Last updated: December 2025</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
