"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100/60 to-pink-100/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-100/50 to-blue-100/30 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          >
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold">Shop By Category</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From stunning chandeliers to elegant wall mirrors, find everything you need to illuminate your space.
          </p>
        </motion.div>

        {/* Categories Grid - 5 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={category.id === "customization" ? "/customization" : `/shop?category=${category.id}`}>
                <motion.div 
                  className="group relative h-[280px] md:h-[380px] rounded-3xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Animated Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent"
                    whileHover={{ opacity: 0.9 }}
                  />

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-200%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <motion.div
                      initial={false}
                      className="transform transition-all duration-500 group-hover:-translate-y-3"
                    >
                      <motion.span 
                        className="inline-flex items-center gap-1 text-purple-200 text-xs mb-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Sparkles size={10} />
                        {category.count} Products
                      </motion.span>
                      <h3 className="font-display text-xl md:text-2xl text-white mb-2 font-semibold">
                        {category.name}
                      </h3>
                      <motion.div 
                        className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <span>Shop Now</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowUpRight size={16} />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/40 transition-all duration-500"
                    whileHover={{ 
                      boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)",
                    }}
                  />

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/50 rounded-tr-xl transition-all duration-500"
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/50 rounded-bl-xl transition-all duration-500"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
