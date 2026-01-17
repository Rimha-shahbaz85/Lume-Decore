"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent"
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-200%" }}
              animate={{ x: isHovered ? "200%" : "-200%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.newArrival && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1"
                >
                  <Sparkles size={12} />
                  New
                </motion.span>
              )}
              {product.originalPrice && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </motion.span>
              )}
              {product.bestSeller && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg"
                >
                  ⭐ Best Seller
                </motion.span>
              )}
            </div>

            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isLiked
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                  : "bg-white/90 backdrop-blur text-gray-700 hover:bg-white"
              }`}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </motion.div>
            </motion.button>

            {/* Added to Cart Animation */}
            <AnimatePresence>
              {showAddedAnimation && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-purple-600/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-white text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-2"
                    >
                      ✓
                    </motion.div>
                    <p className="font-semibold">Added to Cart!</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4 flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-white text-purple-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-purple-700 hover:text-white transition-colors shadow-xl"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white text-gray-700 rounded-2xl flex items-center justify-center hover:bg-purple-700 hover:text-white transition-colors shadow-xl"
              >
                <Eye size={16} />
              </motion.button>
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div 
            className="p-5"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">
              {product.category.replace("-", " ")}
            </p>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1 text-lg">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Star
                      size={14}
                      className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </motion.div>

          {/* Bottom gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
