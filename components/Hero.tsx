"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Animated Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* Gradient Orbs with pulse */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/40 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/30 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/40 to-violet-400/30 rounded-full blur-2xl"
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(123,92,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(123,92,184,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,249,247,0.8)_70%)]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Stars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 left-1/4"
        >
          <Star size={24} className="text-purple-300 fill-purple-200" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-1/4"
        >
          <Star size={16} className="text-purple-400 fill-purple-300" />
        </motion.div>

        {/* Badge with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8 relative"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={18} className="text-purple-600" />
          </motion.div>
          <span className="text-sm text-purple-700 font-semibold tracking-wide">
            ✨ New Collection 2026 ✨
          </span>
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-400/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Main Heading with stagger animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Glow Up
            </span>
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative inline-block"
          >
            Every Corner
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <motion.path
                d="M2 8 Q75 2 150 8 T298 8"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7b5cb8" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.span>
        </motion.h1>

        {/* Subtitle with typing effect feel */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover our curated collection of exquisite home decor. From stunning lighting to elegant mirrors, transform your space into a sanctuary of style.
        </motion.p>

        {/* CTA Buttons with enhanced hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(123, 92, 184, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 text-lg group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative">Explore Collection</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.button>
          </Link>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 rounded-full font-semibold text-lg text-purple-700 border-2 border-purple-300 overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-purple-100"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "9999px" }}
              />
              <span className="relative">View Products</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats with count-up animation feel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "500+", label: "Unique Products", icon: "🏮" },
            { number: "15K+", label: "Happy Customers", icon: "💜" },
            { number: "4.9", label: "Average Rating", icon: "⭐" },
            { number: "Free", label: "Shipping Rs. 5K+", icon: "🚚" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all cursor-default"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="text-2xl mb-2"
              >
                {stat.icon}
              </motion.div>
              <div className="text-3xl md:text-4xl font-display font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-purple-400 tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
