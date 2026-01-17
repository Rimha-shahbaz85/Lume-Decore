"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-100/50 to-pink-100/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-100/40 to-blue-100/30 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-purple-600" />
              </motion.div>
              <span className="text-purple-700 text-sm font-semibold">Curated For You</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/shop">
              <motion.div
                whileHover={{ x: 5 }}
                className="group inline-flex items-center gap-2 text-purple-700 font-semibold mt-4 md:mt-0 px-6 py-3 rounded-full border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                View All Products
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
