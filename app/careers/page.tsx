"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Heart,
  Users,
  Zap,
  Coffee,
  Gift,
  Laptop,
  Star,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Coffee,
    title: "Flexible Hours",
    description: "Work-life balance with flexible scheduling",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Gift,
    title: "Employee Discounts",
    description: "50% off on all Lume & Decor products",
    color: "from-purple-400 to-indigo-500",
  },
  {
    icon: Laptop,
    title: "Remote Options",
    description: "Hybrid work model with remote flexibility",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular team building and social events",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap,
    title: "Growth & Learning",
    description: "Professional development and training programs",
    color: "from-violet-400 to-purple-500",
  },
];

const openPositions = [
  {
    id: 1,
    title: "Senior Interior Designer",
    department: "Design",
    location: "Lahore, Pakistan",
    type: "Full-time",
    description: "Lead our design team in creating stunning lighting concepts and mirror designs for our premium customers.",
    requirements: [
      "5+ years of interior design experience",
      "Proficiency in AutoCAD and 3D modeling",
      "Strong portfolio of residential/commercial projects",
      "Excellent client communication skills",
    ],
  },
  {
    id: 2,
    title: "E-Commerce Manager",
    department: "Marketing",
    location: "Karachi, Pakistan",
    type: "Full-time",
    description: "Drive our online sales strategy and manage our digital storefront to reach customers across Pakistan.",
    requirements: [
      "3+ years e-commerce experience",
      "Knowledge of Shopify/WooCommerce",
      "Data-driven decision making",
      "Experience with digital marketing",
    ],
  },
  {
    id: 3,
    title: "Customer Success Specialist",
    department: "Support",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers find the perfect lighting and decor solutions while ensuring exceptional service.",
    requirements: [
      "2+ years customer service experience",
      "Excellent communication in Urdu & English",
      "Problem-solving mindset",
      "Passion for home decor",
    ],
  },
  {
    id: 4,
    title: "Social Media Content Creator",
    department: "Marketing",
    location: "Islamabad, Pakistan",
    type: "Part-time",
    description: "Create engaging content showcasing our products and brand story across social platforms.",
    requirements: [
      "Experience with Instagram/TikTok",
      "Photography and video editing skills",
      "Creative storytelling ability",
      "Understanding of Pakistani market",
    ],
  },
];

const values = [
  {
    emoji: "✨",
    title: "Innovation",
    description: "We constantly push boundaries in design and customer experience",
  },
  {
    emoji: "🤝",
    title: "Collaboration",
    description: "Together we create magic that transforms spaces",
  },
  {
    emoji: "💎",
    title: "Quality",
    description: "Excellence in everything we do, from products to service",
  },
  {
    emoji: "🌱",
    title: "Growth",
    description: "We invest in our people and celebrate their success",
  },
];

// Floating Particles
const FloatingLights = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      >
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${['from-purple-400 to-pink-400', 'from-amber-400 to-orange-400', 'from-cyan-400 to-blue-400'][i % 3]}`} />
      </motion.div>
    ))}
  </div>
);

// Glowing Orb
const GlowingOrb = ({ className, color }: { className: string; color: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
    }}
  />
);

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <GlowingOrb className="w-96 h-96 -top-48 -left-48" color="#a855f7" />
        <GlowingOrb className="w-80 h-80 top-1/3 -right-40" color="#ec4899" />
        <GlowingOrb className="w-72 h-72 bottom-20 left-1/4" color="#8b5cf6" />
        <FloatingLights />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
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
              ✨
            </motion.span>
            <span className="text-sm font-medium">We&apos;re Hiring!</span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Join Our{" "}
            <span className="relative">
              <span className="text-gradient">Creative</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <motion.path
                  d="M0 6 Q50 0, 100 6 T200 6"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>{" "}
            Team
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Help us illuminate homes across Pakistan. We&apos;re looking for passionate 
            individuals who share our love for beautiful design and exceptional service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#positions"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg"
            >
              View Open Positions
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.a>
            <motion.a
              href="#culture"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold border-2 border-purple-200 hover:border-purple-400 transition-colors"
            >
              Our Culture
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "20+", label: "Team Members", delay: 0 },
            { number: "5+", label: "Years Growing", delay: 0.1 },
            { number: "100%", label: "Remote Friendly", delay: 0.2 },
            { number: "4.8★", label: "Glassdoor Rating", delay: 0.3 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + stat.delay, type: "spring" }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-purple-100"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-purple-700 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section id="culture" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block">
              Our Culture
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              What We <span className="text-gradient">Believe In</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 text-center border border-purple-100 shadow-lg relative overflow-hidden group"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  className="text-5xl mb-4 relative inline-block"
                >
                  {value.emoji}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </motion.div>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 relative">{value.title}</h3>
                <p className="text-gray-600 relative">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block">
              Perks & Benefits
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              Why You&apos;ll <span className="text-gradient">Love It Here</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredBenefit(index)}
                onHoverEnd={() => setHoveredBenefit(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 relative overflow-hidden group cursor-pointer"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${benefit.color.split(' ')[0].replace('from-', '')}, ${benefit.color.split(' ')[1].replace('to-', '')})`,
                    opacity: hoveredBenefit === index ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4 relative">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: hoveredBenefit === index ? 1 : 0,
                    x: hoveredBenefit === index ? 0 : -10,
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <ChevronRight className="w-5 h-5 text-purple-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/10 rounded-full"
        />

        {/* Floating Stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-purple-300 text-sm font-medium tracking-wider uppercase mb-2 block">
              Open Positions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Dream Role</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {openPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer border transition-all duration-300 ${
                    selectedJob === job.id 
                      ? "border-purple-400 bg-white/20" 
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          animate={{ rotate: selectedJob === job.id ? 180 : 0 }}
                          className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"
                        >
                          <Briefcase className="w-4 h-4 text-white" />
                        </motion.div>
                        <h3 className="font-semibold text-xl text-white">{job.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-purple-300">
                          <Star size={14} /> {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-purple-300">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-purple-300">
                          <Clock size={14} /> {job.type}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedJob === job.id ? 90 : 0 }}
                      className="hidden md:block"
                    >
                      <ChevronRight className="w-6 h-6 text-purple-300" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {selectedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/10">
                          <p className="text-purple-200 mb-4">{job.description}</p>
                          <h4 className="text-white font-medium mb-3">Requirements:</h4>
                          <ul className="space-y-2 mb-6">
                            {job.requirements.map((req, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2 text-purple-200"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                {req}
                              </motion.li>
                            ))}
                          </ul>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2"
                          >
                            Apply Now <Send size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24 relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block">
              Don&apos;t See Your Role?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              Send Us Your <span className="text-gradient">Resume</span>
            </h2>
            <p className="mt-4 text-gray-600">
              We&apos;re always looking for talented people. Drop your resume and we&apos;ll reach out when we have the perfect opportunity.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                      placeholder="you@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    placeholder="+92 300 1234567"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area of Interest
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white">
                    <option value="">Select department</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="support">Customer Support</option>
                    <option value="operations">Operations</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                    placeholder="Share your experience and why you'd be great fit..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV
                  </label>
                  <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <input type="file" className="hidden" id="resume" />
                    <label htmlFor="resume" className="cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-xl flex items-center justify-center"
                      >
                        <Send className="w-6 h-6 text-purple-600" />
                      </motion.div>
                      <p className="text-gray-600">
                        <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-400 mt-1">PDF, DOC up to 10MB</p>
                    </label>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Submit Application
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Send size={20} />
                    </motion.span>
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-12 shadow-xl border border-purple-100 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Application Received!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in joining Lume & Decor. We&apos;ll review your application and get back to you soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormSubmitted(false)}
                  className="text-purple-600 font-medium hover:text-purple-700"
                >
                  Submit Another Application
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-32 h-32 bg-purple-200/50 rounded-full -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200/50 rounded-full translate-y-1/2 -translate-x-1/2"
            />

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              💼
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4 relative">
              Have Questions About Working Here?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto relative">
              We&apos;d love to hear from you! Reach out to our HR team for any questions about careers at Lume & Decor.
            </p>
            <motion.a
              href="mailto:careers@lumedecor.pk"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg relative"
            >
              <Send size={20} />
              careers@lumedecor.pk
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

