"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Interior Designer",
    content: "Lume & Decor has become my go-to source for unique pieces. The quality is exceptional, and my clients are always impressed with the curated selection.",
    rating: 5,
    avatar: "SM",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Homeowner",
    content: "The pendant lights I purchased completely transformed my living room. The attention to detail and craftsmanship is evident in every piece.",
    rating: 5,
    avatar: "JR",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Architect",
    content: "Finally, a home decor store that understands modern aesthetics without sacrificing quality. The shipping was fast and everything arrived perfectly packaged.",
    rating: 5,
    avatar: "EC",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    id: 4,
    name: "Michael Torres",
    role: "Boutique Hotel Owner",
    content: "We've furnished three of our boutique hotels with Lume & Decor pieces. Our guests constantly compliment the unique lighting and decor choices.",
    rating: 5,
    avatar: "MT",
    gradient: "from-green-500 to-teal-500",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Star size={12} className="text-white/30 fill-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-4"
          >
            <Sparkles size={16} className="text-pink-300" />
            <span className="text-white/90 text-sm font-semibold">Customer Love</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            What People Say
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative h-[400px] md:h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 h-full">
                {/* Quote Icon */}
                <motion.div 
                  className={`absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br ${testimonials[currentIndex].gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Quote size={24} className="text-white" />
                </motion.div>

                {/* Content */}
                <div className="pt-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star size={22} className="text-amber-400 fill-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <motion.p 
                    className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-display italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </motion.p>

                  {/* Author */}
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonials[currentIndex].gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">
                        {testimonials[currentIndex].avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-purple-200 text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
