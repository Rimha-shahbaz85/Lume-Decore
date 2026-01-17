"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Headphones, RefreshCw, Sparkles } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over Rs. 5,000. Fast & reliable shipping across Pakistan.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout with SSL encryption. Your data is protected.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is here to help you anytime, anywhere.",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Not satisfied? Get a full refund.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-100",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-40 h-40 border border-purple-200/50 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-10 -left-10 w-32 h-32 border border-purple-200/50 rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          >
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold">Why Choose Us</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 h-full border border-purple-100 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-100/50">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <feature.icon
                    size={28}
                    className="relative z-10 text-purple-700 group-hover:text-white transition-colors duration-500"
                  />
                </motion.div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner decoration */}
                <motion.div
                  className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-200 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
