"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag, Truck, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "lume10") {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-purple-700" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-6 p-6 bg-white rounded-2xl mb-4 shadow-sm"
                >
                  {/* Image */}
                  <Link href={`/product/${item.id}`}>
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-ivory flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-purple-700 transition-colors mb-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 capitalize mb-4">{item.category}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-purple-700"
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-purple-700"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-purple-700">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link href="/shop">
              <motion.button
                whileHover={{ gap: "12px" }}
                className="flex items-center gap-2 text-purple-700 font-medium mt-6"
              >
                <ArrowRight size={18} className="rotate-180" />
                Continue Shopping
              </motion.button>
            </Link>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 sticky top-40">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-sm"
                      disabled={promoApplied}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-4 py-3 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {promoApplied ? "Applied!" : "Apply"}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Try code: LUME10</p>
              </div>

              {/* Totals */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? "Free" : `Rs. ${shipping.toLocaleString()}`}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-purple-700">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-2 mt-6 py-4"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </motion.button>
              </Link>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                Secure checkout with SSL encryption
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 5000 && (
                <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-700">Free shipping progress</span>
                    <span className="text-gray-600">Rs. {(5000 - subtotal).toLocaleString()} away</span>
                  </div>
                  <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                      className="h-full bg-purple-600 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Add Rs. {(5000 - subtotal).toLocaleString()} more for free shipping!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

