"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Check,
  ChevronRight,
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-purple-600 hover:text-purple-700">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
    }
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  return (
    <div className="pt-40 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-50 bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check size={18} />
            Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-purple-600">
            Shop
          </Link>
          <ChevronRight size={14} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-purple-600 capitalize">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-ivory mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.newArrival && (
                  <span className="px-4 py-2 bg-purple-700 text-white text-sm font-medium rounded-full">
                    New Arrival
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Like & Share */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isLiked ? "bg-rose-500 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden ${
                    selectedImage === index
                      ? "ring-2 ring-purple-700 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Category */}
            <p className="text-purple-600 text-sm font-medium tracking-wider uppercase mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-semibold text-purple-700">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-600 text-sm font-medium rounded-full">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  Color: <span className="text-purple-700">{product.colors[selectedColor]}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(index)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                        selectedColor === index
                          ? "border-purple-700 bg-purple-50 text-purple-700"
                          : "border-gray-200 text-gray-600 hover:border-purple-300"
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-700"
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-purple-700"
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
                <span className="text-gray-500 text-sm">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={20} />
                Add to Cart - Rs. {(product.price * quantity).toLocaleString()}
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-purple-50 rounded-2xl">
              <div className="text-center">
                <Truck size={24} className="mx-auto text-purple-700 mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">Over Rs. 5,000</p>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto text-purple-700 mb-2" />
                <p className="text-sm font-medium text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-500">Full Coverage</p>
              </div>
              <div className="text-center">
                <RefreshCw size={24} className="mx-auto text-purple-700 mb-2" />
                <p className="text-sm font-medium text-gray-900">30 Day Returns</p>
                <p className="text-xs text-gray-500">Hassle-free</p>
              </div>
            </div>

            {/* Specs */}
            {(product.dimensions || product.material) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
                <dl className="space-y-3">
                  {product.dimensions && (
                    <div className="flex">
                      <dt className="w-32 text-gray-500">Dimensions</dt>
                      <dd className="text-gray-900">{product.dimensions}</dd>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex">
                      <dt className="w-32 text-gray-500">Material</dt>
                      <dd className="text-gray-900">{product.material}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <h2 className="font-display text-3xl font-semibold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

