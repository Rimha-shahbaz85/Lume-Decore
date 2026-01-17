"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, Package, Home, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Browse & Discover",
    description: "Explore our curated collection of premium lighting and decor pieces",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: ShoppingCart,
    number: "02", 
    title: "Add to Cart",
    description: "Select your favorites and customize with colors and quantities",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Package,
    number: "03",
    title: "Fast Delivery",
    description: "We carefully pack and ship your order within 24-48 hours",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Home,
    number: "04",
    title: "Transform Your Space",
    description: "Install your new pieces and enjoy your beautifully lit home",
    color: "from-amber-500 to-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-72 h-72 border border-purple-100 rounded-full opacity-50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-48 h-48 border border-pink-100 rounded-full opacity-50"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          >
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold">Simple Process</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From browsing to beautifying your space, we make the process seamless
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 border border-purple-100 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 relative z-10"
              >
                {/* Step number */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-purple-700 font-bold text-sm">{step.number}</span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <step.icon size={28} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow indicator for next step */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-purple-300"
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
