"use client";

import { motion } from "framer-motion";
import { Shield, Award, Leaf, Heart, Zap, CheckCircle } from "lucide-react";

const badges = [
  { icon: Shield, text: "100% Secure", subtext: "Payment" },
  { icon: Award, text: "Premium", subtext: "Quality" },
  { icon: Leaf, text: "Eco", subtext: "Friendly" },
  { icon: Heart, text: "Made with", subtext: "Love" },
  { icon: Zap, text: "Fast", subtext: "Delivery" },
  { icon: CheckCircle, text: "Satisfaction", subtext: "Guaranteed" },
];

export default function TrustBadges() {
  return (
    <section className="py-8 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-y border-purple-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Scrolling badges */}
        <div className="relative">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate badges for seamless loop */}
            {[...badges, ...badges, ...badges].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{badge.text}</p>
                  <p className="text-xs text-gray-500">{badge.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
