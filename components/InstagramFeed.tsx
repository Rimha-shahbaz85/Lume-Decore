"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";

const instagramPosts = [
  "/ceiling-lights/ceiling-light-1.jpeg",
  "/chandeliers/chandelier-1.jpeg",
  "/lamps/lamp-black.jpeg",
  "/lamps/lamp-classic.jpeg",
  "/lights/focus-light.jpeg",
  "/lights/lights.jpeg",
  "/lights/rotating-light.jpeg",
  "/wall-mirrors/wall-mirror-1.jpeg",
];

export default function InstagramFeed() {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          >
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold">Our Gallery</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            <a 
              href="https://www.instagram.com/lumedecore_01?igsh=eWxkYzFicHE2aXN4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              @lumedecore_01
            </a>
          </h2>
          <p className="text-gray-600">
            Explore our beautiful lighting and decor collection
          </p>
        </motion.div>
      </div>

      {/* Product Images Grid - Full Width */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
        {instagramPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="group relative aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 cursor-pointer"
          >
            <Image
              src={post}
              alt={`Product ${index + 1}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-700/50 to-transparent flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
              >
                <Eye size={20} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-200%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>

      {/* View Gallery Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.a
          href="https://www.instagram.com/lumedecore_01?igsh=eWxkYzFicHE2aXN4"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 transition-all"
        >
          Follow Us on Instagram
        </motion.a>
      </motion.div>
    </section>
  );
}
