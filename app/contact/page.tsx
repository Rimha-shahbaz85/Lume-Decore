"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Headphones,
  Package,
  HelpCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 300 1234567", "+92 42 35678901"],
    description: "Mon-Sat, 9am-8pm PKT",
    color: "from-emerald-400 to-teal-500",
    action: "tel:+923001234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hello@lumedecor.pk", "support@lumedecor.pk"],
    description: "We reply within 24 hours",
    color: "from-purple-400 to-indigo-500",
    action: "mailto:hello@lumedecor.pk",
  },
  {
    icon: MapPin,
    title: "Showroom",
    details: ["123 Design District", "Gulberg III, Lahore"],
    description: "Visit our display center",
    color: "from-rose-400 to-pink-500",
    action: "#map",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 10am - 8pm", "Sunday: 2pm - 7pm"],
    description: "Pakistan Standard Time",
    color: "from-amber-400 to-orange-500",
    action: null,
  },
];

const quickHelp = [
  {
    icon: Package,
    title: "Track Your Order",
    description: "Check the status of your delivery",
    link: "/track-order",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Find answers to common questions",
    link: "/faq",
  },
  {
    icon: Headphones,
    title: "Live Chat",
    description: "Chat with our support team",
    link: "#chat",
  },
];

const socialLinks = [
  { icon: Instagram, name: "Instagram", handle: "@lumedecor.pk", followers: "25K", color: "from-pink-500 to-rose-500" },
  { icon: Facebook, name: "Facebook", handle: "LumeDecorPK", followers: "18K", color: "from-blue-500 to-indigo-500" },
  { icon: Twitter, name: "Twitter", handle: "@LumeDecorPK", followers: "8K", color: "from-cyan-400 to-blue-500" },
];

// Floating Particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#f59e0b', '#10b981'][i % 4]}, transparent)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 5 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

// Glowing Orbs
const GlowingOrb = ({ className, color }: { className: string; color: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
    }}
  />
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <GlowingOrb className="w-96 h-96 -top-48 -left-48 opacity-30" color="#a855f7" />
        <GlowingOrb className="w-80 h-80 top-1/2 -right-40 opacity-20" color="#ec4899" />
        <GlowingOrb className="w-72 h-72 bottom-20 left-1/3 opacity-25" color="#8b5cf6" />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle size={18} />
            </motion.span>
            <span className="text-sm font-medium">We&apos;d Love to Hear From You</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in{" "}
            <span className="relative">
              <span className="text-gradient">Touch</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need help with your order? 
            Our team is here to help you create your perfect space.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.action || undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100 relative overflow-hidden group cursor-pointer"
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <info.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {info.title}
              </h3>
              
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-700 font-medium">
                  {detail}
                </p>
              ))}
              
              <p className="text-gray-500 text-sm mt-2">{info.description}</p>

              {info.action && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-4 right-4"
                >
                  <ChevronRight className="w-5 h-5 text-purple-500" />
                </motion.div>
              )}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Main Content - Form & Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
              
              <div className="relative">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and we&apos;ll get back to you within 24 hours
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <motion.input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            animate={{
                              boxShadow: focusedField === "name" 
                                ? "0 0 0 3px rgba(168, 85, 247, 0.2)" 
                                : "0 0 0 0px rgba(168, 85, 247, 0)",
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <motion.input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            animate={{
                              boxShadow: focusedField === "email" 
                                ? "0 0 0 3px rgba(168, 85, 247, 0.2)" 
                                : "0 0 0 0px rgba(168, 85, 247, 0)",
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 outline-none transition-all"
                            placeholder="you@example.com"
                          />
                        </motion.div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <motion.input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            animate={{
                              boxShadow: focusedField === "phone" 
                                ? "0 0 0 3px rgba(168, 85, 247, 0.2)" 
                                : "0 0 0 0px rgba(168, 85, 247, 0)",
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 outline-none transition-all"
                            placeholder="+92 300 1234567"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                          </label>
                          <motion.select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            onFocus={() => setFocusedField("subject")}
                            onBlur={() => setFocusedField(null)}
                            animate={{
                              boxShadow: focusedField === "subject" 
                                ? "0 0 0 3px rgba(168, 85, 247, 0.2)" 
                                : "0 0 0 0px rgba(168, 85, 247, 0)",
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 outline-none transition-all bg-white"
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="order">Order Support</option>
                            <option value="custom">Custom Mirror Design</option>
                            <option value="wholesale">Wholesale Inquiry</option>
                            <option value="feedback">Feedback</option>
                          </motion.select>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message *
                        </label>
                        <motion.textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          animate={{
                            boxShadow: focusedField === "message" 
                              ? "0 0 0 3px rgba(168, 85, 247, 0.2)" 
                              : "0 0 0 0px rgba(168, 85, 247, 0)",
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 outline-none transition-all resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden disabled:opacity-70"
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <Send size={20} />
                              </motion.span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                        }}
                        className="text-purple-600 font-medium hover:text-purple-700"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Map & Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map */}
            <div id="map" className="bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100 relative h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl mb-4"
                  >
                    📍
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Our Showroom</h3>
                  <p className="text-gray-600 text-sm">123 Design District, Gulberg III</p>
                  <p className="text-gray-600 text-sm">Lahore, Pakistan</p>
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-3">
                {quickHelp.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(168, 85, 247, 0.05)" }}
                    className="flex items-center gap-4 p-3 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl p-6 relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-24 h-24 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
              />
              
              <h3 className="font-semibold text-lg text-white mb-4 relative">
                Connect With Us
              </h3>
              <div className="space-y-3 relative">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="flex items-center gap-4 p-3 rounded-xl transition-colors group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">
                        {social.name}
                      </h4>
                      <p className="text-sm text-purple-300">{social.handle}</p>
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-purple-200">
                      {social.followers} followers
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-purple-100"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/50 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/50 rounded-full"
          />

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl mb-6 relative"
          >
            💬
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4 relative">
            Still Have Questions?
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-xl mx-auto relative">
            Check out our frequently asked questions or start a live chat with our support team
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <motion.a
              href="/faq"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg inline-flex items-center justify-center gap-2"
            >
              <HelpCircle size={20} />
              View FAQs
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold border-2 border-purple-200 hover:border-purple-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Start Live Chat
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

