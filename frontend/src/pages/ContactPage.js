import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/api/contact`, form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Get in Touch</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="contact-title">
              Contact Us
            </h1>
            <p className="text-slate-400 font-body mt-6 max-w-xl text-lg leading-relaxed">
              Have a question or ready to start your SAP journey? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              {success ? (
                <div className="bg-[#f0fdfa] rounded-2xl p-10 border border-[#ccfbf1] text-center" data-testid="contact-success">
                  <CheckCircle2 className="w-16 h-16 text-[#1ab69e] mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-2">Thank You!</h3>
                  <p className="text-[#64748B] font-body">We've received your message and will get back to you soon.</p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-8 rounded-full mt-6"
                    data-testid="send-another-btn"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body text-sm font-medium text-[#0F172A]">Full Name *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="John Doe"
                        className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body text-sm font-medium text-[#0F172A]">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                        className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-body text-sm font-medium text-[#0F172A]">Phone</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXX XXXXXX"
                        className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                        data-testid="contact-phone-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-body text-sm font-medium text-[#0F172A]">Subject</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e]"
                        data-testid="contact-subject-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-body text-sm font-medium text-[#0F172A]">Message *</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Tell us about your project or query..."
                      className="rounded-xl border-slate-200 focus:border-[#1ab69e] focus:ring-[#1ab69e] resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>
                  {error && <p className="text-red-500 font-body text-sm" data-testid="contact-error">{error}</p>}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body font-semibold px-10 py-6 rounded-full text-base disabled:opacity-50"
                    data-testid="contact-submit-button"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-2">
              <div className="bg-[#0F172A] rounded-2xl p-8 lg:p-10 text-white">
                <h3 className="font-heading font-bold text-xl mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1ab69e]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#1ab69e]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-body uppercase tracking-wider mb-1">Email</p>
                      <p className="font-body text-sm">info@eyesaptechnology.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1ab69e]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#1ab69e]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-body uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-body text-sm">+91-XXXX-XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1ab69e]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#1ab69e]" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-body uppercase tracking-wider mb-1">Location</p>
                      <p className="font-body text-sm">India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-700">
                  <h4 className="font-heading font-semibold text-sm mb-4">Business Hours</h4>
                  <div className="space-y-2 text-sm text-slate-400 font-body">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
