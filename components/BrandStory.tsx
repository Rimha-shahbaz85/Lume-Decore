"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Heart, Sparkles, Star } from "lucide-react";

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-24 bg-cream relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/30 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-blue-200/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div 
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/chandeliers/chandelier-1.jpeg"
                alt="Our Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
              
              {/* Overlay content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Heart className="text-white fill-white" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Crafted with Passion</p>
                      <p className="text-sm text-gray-600">Since 2020</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex flex-col items-center justify-center shadow-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-white/30 rounded-full"
              />
              <Star className="text-white fill-white" size={24} />
              <span className="text-white text-xl font-bold">5+</span>
              <span className="text-white/80 text-xs">Years</span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-purple-600" />
              <span className="text-purple-700 text-sm font-semibold">Our Story</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Lighting Up{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Homes
              </span>{" "}
              with Love
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              What started as a passion for beautiful lighting has grown into Pakistan&apos;s most loved home decor destination. Every piece in our collection is handpicked to bring warmth, elegance, and personality to your space.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              We believe that the right lighting can transform any room into a sanctuary. From stunning chandeliers to cozy table lamps, we curate pieces that tell a story and create memories.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { number: "15K+", label: "Happy Homes" },
                { number: "500+", label: "Products" },
                { number: "4.9", label: "Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-display font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 transition-all"
              >
                Learn More About Us
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
