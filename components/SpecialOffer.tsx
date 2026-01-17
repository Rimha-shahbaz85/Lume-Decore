"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Gift, Sparkles } from "lucide-react";

export default function SpecialOffer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set end date to 7 days from now (or any specific date)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] border border-white/20"
    >
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white font-display"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-white/70 text-xs uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  );

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900" />
          
          {/* Animated shapes */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
          />

          {/* Floating sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Sparkles size={16} className="text-yellow-300" />
            </motion.div>
          ))}

          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 md:p-16">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 backdrop-blur rounded-full mb-6"
              >
                <Gift size={18} className="text-yellow-300" />
                <span className="text-yellow-300 text-sm font-semibold">Limited Time Deal</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Flash Sale!{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Up to 40% Off
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg mb-8"
              >
                Don&apos;t miss out on our biggest sale of the season! Premium lighting and decor at unbeatable prices.
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                  <Clock size={18} className="text-white/70" />
                  <span className="text-white/70 text-sm">Hurry! Sale ends in:</span>
                </div>
                <div className="flex gap-3 justify-center lg:justify-start">
                  <TimeBox value={timeLeft.days} label="Days" />
                  <TimeBox value={timeLeft.hours} label="Hours" />
                  <TimeBox value={timeLeft.minutes} label="Mins" />
                  <TimeBox value={timeLeft.seconds} label="Secs" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl font-bold text-lg text-gray-900 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow flex items-center gap-3 mx-auto lg:mx-0"
                  >
                    Shop the Sale
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={22} />
                    </motion.span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4 }}
                className="relative h-[400px] rounded-3xl overflow-hidden"
              >
                <Image
                  src="/wall-mirrors/leaves-style.jpeg"
                  alt="Special Offer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                
                {/* Sale badge */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex flex-col items-center justify-center shadow-xl"
                >
                  <span className="text-2xl font-bold text-gray-900">40%</span>
                  <span className="text-xs font-semibold text-gray-800">OFF</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
