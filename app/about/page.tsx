"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Lightbulb, Award, Star, Users, Truck, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const values = [
  {
    icon: Lightbulb,
    title: "Premium Lighting",
    description: "From elegant chandeliers to modern ceiling lights, we bring brilliance to every corner of your home.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Heart,
    title: "Passion for Design",
    description: "Each piece is carefully selected to blend artistry with functionality, creating spaces you'll love.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "We source only the finest materials - from premium crystals to handcrafted mirror frames.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Award,
    title: "Custom Excellence",
    description: "Our custom mirror service lets you create one-of-a-kind pieces with Islamic art and LED lighting.",
    gradient: "from-purple-400 to-indigo-500",
  },
];

const stats = [
  { number: 500, suffix: "+", label: "Happy Customers", icon: Users },
  { number: 50, suffix: "+", label: "Lighting Collections", icon: Lightbulb },
  { number: 100, suffix: "%", label: "Quality Products", icon: Star },
  { number: 24, suffix: "/7", label: "Customer Support", icon: Truck },
];

const features = [
  {
    title: "Chandeliers & Ceiling Lights",
    description: "Transform your living spaces with our stunning collection of chandeliers and ceiling lights. From classic crystal designs to contemporary fixtures.",
    image: "/chandeliers/chandelier-1.jpeg",
  },
  {
    title: "Wall Mirrors",
    description: "Elegant wall mirrors that add depth and beauty to any room. Available in various shapes, sizes, and frame finishes.",
    image: "/wall-mirrors/mirror-light-1.jpeg",
  },
  {
    title: "Custom Mirror Design",
    description: "Create your perfect mirror with our customization service. Choose from Islamic calligraphy, LED lighting, frame styles, and more.",
    image: "/customization/99-names-of-allah.webp",
  },
];

// Floating Particles Component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#f59e0b', '#10b981'][i % 4]}, transparent)`,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: "100vh", opacity: 0 }}
        animate={{
          y: "-100vh",
          opacity: [0, 1, 1, 0],
          x: [0, Math.random() * 100 - 50, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    setHasAnimated(true);
    return () => clearInterval(timer);
  }, [target, hasAnimated]);

  return <span>{count}{suffix}</span>;
};

// Glowing Orb Component
const GlowingOrb = ({ color, size, position, delay }: { color: string; size: string; position: string; delay: number }) => (
  <motion.div
    className={`absolute ${size} ${position} rounded-full blur-3xl opacity-30`}
    style={{ background: color }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
    }}
  />
);

// Sparkle Effect
const SparkleEffect = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 3) * 20}%`,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
      </motion.div>
    ))}
  </motion.div>
);

export default function AboutPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="pt-40 pb-20 bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GlowingOrb color="#a855f7" size="w-96 h-96" position="top-20 -left-48" delay={0} />
        <GlowingOrb color="#ec4899" size="w-80 h-80" position="bottom-40 -right-40" delay={2} />
        <GlowingOrb color="#8b5cf6" size="w-72 h-72" position="top-1/2 left-1/3" delay={4} />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              Welcome to Lume & Decor
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Glow Up{" "}
              </motion.span>
              <motion.span 
                className="text-gradient inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Every Corner
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              At Lume & Decor, we believe that beautiful lighting transforms houses into homes. 
              Our curated collection of chandeliers, ceiling lights, lamps, and designer mirrors 
              brings elegance and warmth to every space.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Based in Pakistan, we specialize in premium lighting solutions and custom-designed 
              mirrors featuring stunning Islamic calligraphy and LED backlighting. Every piece 
              we offer is selected for its exceptional quality and timeless appeal.
            </motion.p>
            
            {/* Quick Stats with Animation */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-100 shadow-lg cursor-pointer group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="flex items-center gap-3 relative">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <stat.icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                    </motion.div>
                    <div>
                      <motion.div 
                        className="text-2xl font-bold text-purple-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      >
                        {stat.number}{stat.suffix}
                      </motion.div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative perspective-1000"
          >
            <motion.div 
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Image
                src="/customization/islamic.webp"
                alt="Beautiful Islamic Mirror by Lume & Decor"
                fill
                className="object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              
              {/* Animated Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-200%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              />
            </motion.div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-purple-100"
            >
              <motion.div 
                className="text-4xl font-display font-semibold text-purple-700 mb-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                5+
              </motion.div>
              <div className="text-gray-600">Years of Excellence</div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>

            {/* Top Right Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-2xl px-4 py-2 shadow-lg"
            >
              <motion.span 
                className="text-sm font-medium flex items-center gap-1"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Premium Quality 
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </motion.span>
            </motion.div>

            {/* Decorative Floating Elements */}
            <motion.div
              className="absolute -right-6 top-1/3 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 blur-sm"
              animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-4 top-2/3 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-50 blur-sm"
              animate={{ y: [0, 15, 0], scale: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SparkleEffect />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              Our Collections
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              What We{" "}
              <motion.span 
                className="text-gradient inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Offer
              </motion.span>
            </h2>
            <motion.p 
              className="mt-4 text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              From stunning chandeliers to custom Islamic mirrors, we have everything to illuminate your space
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group bg-gradient-to-br from-purple-50 to-white rounded-3xl overflow-hidden shadow-lg border border-purple-100 relative"
              >
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899, #a855f7)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: hoveredFeature === index ? ["0% 0%", "100% 0%"] : "0% 0%",
                  }}
                  transition={{ duration: 1, repeat: hoveredFeature === index ? Infinity : 0 }}
                />
                <div className="absolute inset-[2px] bg-gradient-to-br from-purple-50 to-white rounded-3xl" />
                
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      animate={{ scale: hoveredFeature === index ? 1.1 : 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/20 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                    />
                    
                    {/* Hover Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: hoveredFeature === index ? 1 : 0,
                        scale: hoveredFeature === index ? 1 : 0,
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Floating Particles on Hover */}
                    <AnimatePresence>
                      {hoveredFeature === index && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-white rounded-full"
                              initial={{ 
                                x: "50%", 
                                y: "50%", 
                                opacity: 1,
                                scale: 0 
                              }}
                              animate={{ 
                                x: `${50 + (Math.random() - 0.5) * 100}%`,
                                y: `${50 + (Math.random() - 0.5) * 100}%`,
                                opacity: 0,
                                scale: 1
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="p-6 relative">
                    <motion.h3 
                      className="font-semibold text-xl text-gray-900 mb-3 group-hover:text-purple-700 transition-colors"
                      layout
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    {/* Arrow indicator */}
                    <motion.div
                      className="mt-4 flex items-center text-purple-600 font-medium"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Explore</span>
                      <motion.span
                        animate={{ x: hoveredFeature === index ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.6, repeat: hoveredFeature === index ? Infinity : 0 }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              Our <span className="text-gradient">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(168, 85, 247, 0.25)",
                }}
                className="text-center group bg-white rounded-3xl p-8 shadow-lg border border-purple-100 relative overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Rotating Border Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${value.gradient.includes('amber') ? '#f59e0b' : value.gradient.includes('pink') ? '#ec4899' : value.gradient.includes('emerald') ? '#10b981' : '#a855f7'}, transparent)`,
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[1px] bg-white rounded-3xl" />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg relative`}
                  >
                    <value.icon size={32} className="text-white" />
                    
                    {/* Pulse Ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2`}
                      style={{ borderColor: value.gradient.includes('amber') ? '#f59e0b' : value.gradient.includes('pink') ? '#ec4899' : value.gradient.includes('emerald') ? '#10b981' : '#a855f7' }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="font-semibold text-xl text-gray-900 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
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
        {[...Array(8)].map((_, i) => (
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trusted by Hundreds of Happy Customers
            </motion.h2>
            <motion.p 
              className="text-purple-200 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our commitment to quality and service has made us a preferred choice for home decor in Pakistan
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors"
                >
                  <stat.icon className="w-8 h-8 text-purple-200 group-hover:text-white transition-colors" />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-display font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </motion.div>
                <p className="text-purple-200 group-hover:text-white transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-12 shadow-xl border border-purple-100 relative overflow-hidden"
          >
            {/* Decorative Quote Marks */}
            <motion.div 
              className="absolute top-4 left-8 text-8xl text-purple-200 font-serif opacity-50"
              animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              &ldquo;
            </motion.div>
            <motion.div 
              className="absolute bottom-4 right-8 text-8xl text-purple-200 font-serif opacity-50"
              animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              &rdquo;
            </motion.div>
            
            <motion.p 
              className="font-display text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8 italic relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We believe that every space deserves beautiful lighting. Our mission is to help you 
              create an atmosphere that reflects your style and brings warmth to your everyday moments.
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Lume & Decor Team</p>
                <p className="text-sm text-purple-600">Illuminating Homes Since 2020</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2 block">
              Our Services
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              What We <span className="text-gradient">Provide</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Home Delivery",
                description: "Free delivery across Pakistan on orders above PKR 10,000. Safe and secure packaging guaranteed.",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: "🎨",
                title: "Custom Design",
                description: "Create your dream mirror with our customization service. Choose frames, LED lighting, and Islamic art.",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: "💬",
                title: "Expert Consultation",
                description: "Need help choosing? Our design experts are here to help you find the perfect lighting for your space.",
                color: "from-amber-400 to-orange-400",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 text-center border border-purple-100 shadow-lg relative overflow-hidden group"
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  className="text-6xl mb-6 relative"
                >
                  {service.icon}
                  
                  {/* Sparkle around emoji */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </motion.div>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"
            />
            
            {/* Floating Particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6 relative"
            >
              ✨
            </motion.div>
            
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-semibold text-white mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Space?
            </motion.h2>
            
            <motion.p 
              className="text-purple-200 mb-8 max-w-xl mx-auto relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Explore our collection and find the perfect lighting to illuminate your home with style and elegance.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative">Shop Now</span>
              </motion.a>
              
              <motion.a
                href="/customization"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold border border-purple-500 hover:bg-purple-500 transition-colors relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative">Design Custom Mirror</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
