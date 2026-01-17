"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Search,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Box,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  Calendar,
  User,
  CreditCard,
  ShoppingBag,
  Home,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Mock order data - in real app this would come from API
const mockOrders: Record<string, OrderData> = {
  "LD-2026-001234": {
    orderNumber: "LD-2026-001234",
    status: "in_transit",
    statusText: "In Transit",
    estimatedDelivery: "January 18, 2026",
    placedDate: "January 12, 2026",
    shippedDate: "January 14, 2026",
    customerName: "Ahmed Khan",
    email: "ahmed.k***@gmail.com",
    phone: "+92 300 ***4567",
    shippingAddress: "House 123, Street 5, Gulberg III, Lahore",
    paymentMethod: "Cash on Delivery",
    subtotal: 25000,
    shipping: 0,
    total: 25000,
    carrier: "TCS",
    trackingNumber: "TCS-786543210",
    items: [
      { name: "Crystal Chandelier - Gold", quantity: 1, price: 18000, image: "/chandeliers/chandelier-1.jpeg" },
      { name: "LED Wall Mirror - Round", quantity: 1, price: 7000, image: "/customization/islamic.webp" },
    ],
    timeline: [
      { status: "ordered", title: "Order Placed", date: "Jan 12, 2026 - 2:30 PM", description: "Your order has been confirmed", completed: true },
      { status: "confirmed", title: "Order Confirmed", date: "Jan 12, 2026 - 2:35 PM", description: "Payment verified successfully", completed: true },
      { status: "processing", title: "Processing", date: "Jan 13, 2026 - 10:00 AM", description: "Order is being prepared", completed: true },
      { status: "shipped", title: "Shipped", date: "Jan 14, 2026 - 3:45 PM", description: "Package handed to TCS courier", completed: true },
      { status: "in_transit", title: "In Transit", date: "Jan 15, 2026 - 9:00 AM", description: "Package is on its way to Lahore", completed: true, current: true },
      { status: "out_for_delivery", title: "Out for Delivery", date: "Expected Jan 18", description: "Package will be delivered today", completed: false },
      { status: "delivered", title: "Delivered", date: "Expected Jan 18", description: "Package delivered successfully", completed: false },
    ],
    updates: [
      { time: "Jan 15, 2026 - 9:00 AM", location: "Karachi Hub", message: "Package departed from sorting facility" },
      { time: "Jan 14, 2026 - 6:30 PM", location: "Karachi Hub", message: "Package arrived at sorting facility" },
      { time: "Jan 14, 2026 - 3:45 PM", location: "Karachi", message: "Package picked up by courier" },
      { time: "Jan 14, 2026 - 2:00 PM", location: "Warehouse", message: "Package ready for dispatch" },
    ],
  },
  "LD-2026-005678": {
    orderNumber: "LD-2026-005678",
    status: "delivered",
    statusText: "Delivered",
    estimatedDelivery: "January 10, 2026",
    placedDate: "January 5, 2026",
    shippedDate: "January 7, 2026",
    deliveredDate: "January 10, 2026",
    customerName: "Sara Ali",
    email: "sara.a***@yahoo.com",
    phone: "+92 321 ***8901",
    shippingAddress: "Flat 45, Block B, DHA Phase 5, Karachi",
    paymentMethod: "EasyPaisa",
    subtotal: 12500,
    shipping: 0,
    total: 12500,
    carrier: "Leopards",
    trackingNumber: "LEO-123456789",
    items: [
      { name: "Custom Islamic Mirror - 99 Names", quantity: 1, price: 12500, image: "/customization/99-names-of-allah.webp" },
    ],
    timeline: [
      { status: "ordered", title: "Order Placed", date: "Jan 5, 2026 - 11:00 AM", description: "Your order has been confirmed", completed: true },
      { status: "confirmed", title: "Order Confirmed", date: "Jan 5, 2026 - 11:05 AM", description: "Payment verified successfully", completed: true },
      { status: "processing", title: "Processing", date: "Jan 6, 2026 - 9:00 AM", description: "Custom mirror being crafted", completed: true },
      { status: "shipped", title: "Shipped", date: "Jan 7, 2026 - 4:00 PM", description: "Package handed to Leopards courier", completed: true },
      { status: "in_transit", title: "In Transit", date: "Jan 8, 2026 - 10:00 AM", description: "Package in transit", completed: true },
      { status: "out_for_delivery", title: "Out for Delivery", date: "Jan 10, 2026 - 9:00 AM", description: "Package out for delivery", completed: true },
      { status: "delivered", title: "Delivered", date: "Jan 10, 2026 - 2:30 PM", description: "Package delivered successfully", completed: true, current: true },
    ],
    updates: [
      { time: "Jan 10, 2026 - 2:30 PM", location: "Karachi", message: "Package delivered to customer" },
      { time: "Jan 10, 2026 - 9:00 AM", location: "Karachi Hub", message: "Out for delivery" },
      { time: "Jan 9, 2026 - 8:00 PM", location: "Karachi Hub", message: "Arrived at destination city" },
    ],
  },
  "LD-2026-009999": {
    orderNumber: "LD-2026-009999",
    status: "processing",
    statusText: "Processing",
    estimatedDelivery: "January 25, 2026",
    placedDate: "January 14, 2026",
    customerName: "Fatima Hassan",
    email: "fatima.h***@gmail.com",
    phone: "+92 333 ***2345",
    shippingAddress: "House 78, F-10/3, Islamabad",
    paymentMethod: "Bank Transfer",
    subtotal: 45000,
    shipping: 0,
    total: 45000,
    carrier: "TCS",
    trackingNumber: "Pending",
    items: [
      { name: "Luxury Crystal Chandelier - Large", quantity: 1, price: 35000, image: "/chandeliers/chandelier-2.jpeg" },
      { name: "Vanity LED Lights Set", quantity: 2, price: 5000, image: "/lights/vanity-lights.jpeg" },
    ],
    timeline: [
      { status: "ordered", title: "Order Placed", date: "Jan 14, 2026 - 5:00 PM", description: "Your order has been confirmed", completed: true },
      { status: "confirmed", title: "Order Confirmed", date: "Jan 14, 2026 - 5:10 PM", description: "Payment verified successfully", completed: true },
      { status: "processing", title: "Processing", date: "Jan 15, 2026 - 10:00 AM", description: "Order is being prepared", completed: true, current: true },
      { status: "shipped", title: "Shipped", date: "Expected Jan 17", description: "Will be handed to courier", completed: false },
      { status: "in_transit", title: "In Transit", date: "Expected Jan 18-22", description: "Package will be in transit", completed: false },
      { status: "out_for_delivery", title: "Out for Delivery", date: "Expected Jan 25", description: "Will be out for delivery", completed: false },
      { status: "delivered", title: "Delivered", date: "Expected Jan 25", description: "Will be delivered", completed: false },
    ],
    updates: [
      { time: "Jan 15, 2026 - 10:00 AM", location: "Warehouse", message: "Order being packed with care" },
      { time: "Jan 14, 2026 - 5:10 PM", location: "System", message: "Payment confirmed" },
    ],
  },
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface TimelineStep {
  status: string;
  title: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

interface TrackingUpdate {
  time: string;
  location: string;
  message: string;
}

interface OrderData {
  orderNumber: string;
  status: string;
  statusText: string;
  estimatedDelivery: string;
  placedDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  carrier: string;
  trackingNumber: string;
  items: OrderItem[];
  timeline: TimelineStep[];
  updates: TrackingUpdate[];
}

// Status colors and icons
const statusConfig: Record<string, { color: string; bgColor: string; icon: typeof Package }> = {
  ordered: { color: "text-blue-600", bgColor: "bg-blue-100", icon: ShoppingBag },
  confirmed: { color: "text-purple-600", bgColor: "bg-purple-100", icon: CheckCircle },
  processing: { color: "text-amber-600", bgColor: "bg-amber-100", icon: RefreshCw },
  shipped: { color: "text-indigo-600", bgColor: "bg-indigo-100", icon: Box },
  in_transit: { color: "text-cyan-600", bgColor: "bg-cyan-100", icon: Truck },
  out_for_delivery: { color: "text-orange-600", bgColor: "bg-orange-100", icon: MapPin },
  delivered: { color: "text-emerald-600", bgColor: "bg-emerald-100", icon: CheckCircle },
};

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#10b981'][i % 3]}, transparent)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "updates">("timeline");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order = mockOrders[orderNumber.toUpperCase()];
    
    if (order) {
      setOrderData(order);
    } else {
      setError("Order not found. Please check your order number and try again.");
      setOrderData(null);
    }
    
    setIsSearching(false);
  };

  const copyTrackingNumber = () => {
    if (orderData?.trackingNumber && orderData.trackingNumber !== "Pending") {
      navigator.clipboard.writeText(orderData.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusProgress = () => {
    if (!orderData) return 0;
    const completedSteps = orderData.timeline.filter(s => s.completed).length;
    return (completedSteps / orderData.timeline.length) * 100;
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 -top-48 -left-48 bg-purple-300/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bottom-20 -right-40 bg-pink-300/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Package size={18} />
            </motion.span>
            <span className="text-sm font-medium">Real-time Tracking</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Your{" "}
            <span className="relative">
              <span className="text-gradient">Order</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your order number to see real-time delivery status and updates
          </p>
        </motion.div>
      </section>

      {/* Search Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleTrackOrder}
          className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Number *
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., LD-2026-001234"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-lg"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Find your order number in your confirmation email or SMS
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For additional verification"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSearching || !orderNumber}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Track Order
                </>
              )}
            </motion.button>
          </div>

          {/* Demo Orders */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Try demo order numbers:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(mockOrders).map((id) => (
                <motion.button
                  key={id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderNumber(id)}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {id}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </section>

      {/* Order Results */}
      <AnimatePresence>
        {orderData && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Status Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-purple-100 mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-2xl font-semibold text-gray-900">
                      Order {orderData.orderNumber}
                    </h2>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusConfig[orderData.status]?.bgColor || "bg-gray-100"
                      } ${statusConfig[orderData.status]?.color || "text-gray-600"}`}
                    >
                      {orderData.statusText}
                    </motion.span>
                  </div>
                  <p className="text-gray-600">
                    Placed on {orderData.placedDate}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {orderData.trackingNumber !== "Pending" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyTrackingNumber}
                      className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          {orderData.trackingNumber}
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getStatusProgress()}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {orderData.status === "delivered" ? "Delivered on" : "Estimated Delivery"}
                </span>
                <span className="font-semibold text-purple-700 flex items-center gap-2">
                  <Calendar size={16} />
                  {orderData.status === "delivered" ? orderData.deliveredDate : orderData.estimatedDelivery}
                </span>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Timeline & Updates */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-purple-100 flex gap-2">
                  {[
                    { id: "timeline", label: "Order Timeline", icon: Clock },
                    { id: "updates", label: "Tracking Updates", icon: MapPin },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id as "timeline" | "updates")}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-purple-50"
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                {/* Timeline Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "timeline" ? (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100"
                    >
                      <div className="space-y-0">
                        {orderData.timeline.map((step, index) => {
                          const config = statusConfig[step.status] || statusConfig.ordered;
                          const Icon = config.icon;
                          
                          return (
                            <motion.div
                              key={step.status}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative flex gap-4"
                            >
                              {/* Line */}
                              {index < orderData.timeline.length - 1 && (
                                <div className={`absolute left-5 top-12 w-0.5 h-full ${
                                  step.completed ? "bg-purple-300" : "bg-gray-200"
                                }`} />
                              )}
                              
                              {/* Icon */}
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                                  step.current
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                                    : step.completed
                                    ? config.bgColor
                                    : "bg-gray-100"
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${
                                  step.current ? "text-white" : step.completed ? config.color : "text-gray-400"
                                }`} />
                              </motion.div>
                              
                              {/* Content */}
                              <div className={`flex-1 pb-8 ${step.current ? "" : ""}`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-semibold ${
                                    step.current ? "text-purple-700" : step.completed ? "text-gray-900" : "text-gray-400"
                                  }`}>
                                    {step.title}
                                  </h3>
                                  {step.current && (
                                    <motion.span
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                      className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full"
                                    >
                                      Current
                                    </motion.span>
                                  )}
                                </div>
                                <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                                  {step.description}
                                </p>
                                <p className={`text-xs mt-1 ${step.completed ? "text-gray-500" : "text-gray-400"}`}>
                                  {step.date}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="updates"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100"
                    >
                      <div className="space-y-4">
                        {orderData.updates.map((update, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl ${
                              index === 0 ? "bg-purple-50 border border-purple-200" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index === 0 ? "bg-purple-200" : "bg-gray-200"
                              }`}>
                                <MapPin className={`w-4 h-4 ${
                                  index === 0 ? "text-purple-700" : "text-gray-500"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <p className={`font-medium ${
                                  index === 0 ? "text-purple-700" : "text-gray-700"
                                }`}>
                                  {update.message}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                  <span>{update.location}</span>
                                  <span>•</span>
                                  <span>{update.time}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Details Sidebar */}
              <div className="space-y-6">
                {/* Items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                    Order Items ({orderData.items.length})
                  </h3>
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-16 h-16 bg-purple-100 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                          <p className="text-purple-700 font-semibold text-sm">
                            PKR {item.price.toLocaleString('en-US')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>PKR {orderData.subtotal.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-emerald-600">
                        {orderData.shipping === 0 ? "FREE" : `PKR ${orderData.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-purple-700">PKR {orderData.total.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Shipping Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-purple-600" />
                    Shipping Details
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{orderData.customerName}</p>
                        <p className="text-gray-500">{orderData.email}</p>
                        <p className="text-gray-500">{orderData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Home className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-gray-600">{orderData.shippingAddress}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-gray-600">{orderData.paymentMethod}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Box className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-gray-600">Carrier: {orderData.carrier}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Need Help */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-3xl p-6 border border-purple-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Have questions about your order?
                  </p>
                  <div className="space-y-2">
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-purple-600 text-white py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <Phone size={16} />
                        Contact Support
                      </motion.button>
                    </Link>
                    <Link href="/faq">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-purple-700 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-purple-200"
                      >
                        <Sparkles size={16} />
                        View FAQs
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* No Order State */}
      {!orderData && !isSearching && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-3xl p-8 md:p-12 text-center border border-purple-100"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📦
            </motion.div>
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Track Your Order Status
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter your order number above to see real-time updates on your delivery, 
              including package location and estimated arrival time.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { icon: Package, label: "Order Confirmation", desc: "Instant updates" },
                { icon: Truck, label: "Live Tracking", desc: "Real-time location" },
                { icon: CheckCircle, label: "Delivery Updates", desc: "SMS & Email alerts" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-purple-100"
                >
                  <feature.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900 text-sm">{feature.label}</h3>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}

