
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Search,
  Calculator,
  Globe,
  Zap,
  Star,
  Phone,
  Mail,
  Box,
  ArrowRight,
} from "lucide-react";

// Shipping zones data
const shippingZones = [
  {
    zone: "Zone A",
    name: "Major Cities",
    cities: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"],
    standardDays: "2-3",
    expressDays: "1-2",
    standardRate: 0,
    expressRate: 500,
    freeShippingMin: 10000,
    color: "from-emerald-400 to-teal-500",
  },
  {
    zone: "Zone B",
    name: "Secondary Cities",
    cities: ["Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad"],
    standardDays: "3-5",
    expressDays: "2-3",
    standardRate: 300,
    expressRate: 700,
    freeShippingMin: 15000,
    color: "from-purple-400 to-indigo-500",
  },
  {
    zone: "Zone C",
    name: "Other Areas",
    cities: ["All other cities and towns"],
    standardDays: "5-7",
    expressDays: "3-4",
    standardRate: 500,
    expressRate: 1000,
    freeShippingMin: 20000,
    color: "from-amber-400 to-orange-500",
  },
];

const shippingFeatures = [
  {
    icon: Shield,
    title: "Secure Packaging",
    description: "All items are carefully wrapped with multiple protection layers",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Truck,
    title: "Real-time Tracking",
    description: "Track your order from dispatch to doorstep delivery",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Clock,
    title: "On-time Delivery",
    description: "95% of orders delivered within estimated timeframe",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Package,
    title: "Safe Handling",
    description: "Special care for fragile chandeliers and mirrors",
    color: "from-emerald-400 to-teal-500",
  },
];

const packagingSteps = [
  { step: 1, title: "Quality Check", description: "Each item inspected before packing", icon: "✅" },
  { step: 2, title: "Bubble Wrap", description: "Multiple layers of protective wrap", icon: "🫧" },
  { step: 3, title: "Foam Padding", description: "Custom foam inserts for fragile items", icon: "📦" },
  { step: 4, title: "Sturdy Box", description: "Double-walled corrugated boxes", icon: "🎁" },
  { step: 5, title: "Fragile Labels", description: "Clear handling instructions", icon: "⚠️" },
  { step: 6, title: "Dispatch", description: "Handed to trusted courier partner", icon: "🚚" },
];

const deliveryPartners = [
  { name: "TCS", logo: "🚚", rating: 4.8, deliveries: "50K+" },
  { name: "Leopards", logo: "🐆", rating: 4.7, deliveries: "30K+" },
  { name: "M&P", logo: "📦", rating: 4.6, deliveries: "20K+" },
];

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#f59e0b'][i % 3]}, transparent)`,
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

export default function ShippingPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [calculatedShipping, setCalculatedShipping] = useState<{
    zone: typeof shippingZones[0] | null;
    standardCost: number;
    expressCost: number;
    freeShipping: boolean;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("domestic");

  // Find zone by city
  const findZoneByCity = (city: string) => {
    const lowerCity = city.toLowerCase();
    for (const zone of shippingZones) {
      if (zone.cities.some(c => c.toLowerCase().includes(lowerCity))) {
        return zone;
      }
    }
    // Default to Zone C for unlisted cities
    return shippingZones[2];
  };

  // Calculate shipping
  const calculateShipping = () => {
    if (!searchCity || !orderValue) return;
    
    const zone = findZoneByCity(searchCity);
    const value = parseFloat(orderValue);
    const freeShipping = value >= zone.freeShippingMin;
    
    setCalculatedShipping({
      zone,
      standardCost: freeShipping ? 0 : zone.standardRate,
      expressCost: zone.expressRate,
      freeShipping,
    });
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
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
              <Truck size={18} />
            </motion.span>
            <span className="text-sm font-medium">Fast & Secure Delivery</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Shipping{" "}
            <span className="relative">
              <span className="text-gradient">Information</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We deliver across Pakistan with special care for your precious lighting and decor items
          </p>
        </motion.div>
      </section>

      {/* Shipping Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shippingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 text-center group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shipping Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
              >
                <Calculator className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-gray-900">
                  Shipping Calculator
                </h2>
                <p className="text-gray-600 text-sm">Calculate your delivery cost and time</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="Enter your city name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Value (PKR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₨</span>
                  <input
                    type="number"
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value)}
                    placeholder="Enter order amount"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateShipping}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              Calculate Shipping
            </motion.button>

            {/* Results */}
            <AnimatePresence>
              {calculatedShipping && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-purple-100"
                >
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium text-gray-900">
                        {calculatedShipping.zone?.name} - {calculatedShipping.zone?.zone}
                      </span>
                    </div>
                    
                    {calculatedShipping.freeShipping && (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4"
                      >
                        <Star className="w-4 h-4" />
                        <span className="font-medium">🎉 You qualify for FREE shipping!</span>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-gray-900">Standard Delivery</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {calculatedShipping.standardCost === 0 ? "FREE" : `PKR ${calculatedShipping.standardCost}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {calculatedShipping.zone?.standardDays} business days
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-amber-500" />
                          <span className="font-medium text-gray-900">Express Delivery</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          PKR {calculatedShipping.expressCost}
                        </div>
                        <div className="text-sm text-gray-500">
                          {calculatedShipping.zone?.expressDays} business days
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Shipping Zones */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
            Shipping <span className="text-gradient">Zones</span>
          </h2>
          <p className="text-gray-600">Delivery times and rates vary by location</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {shippingZones.map((zone, index) => (
            <motion.div
              key={zone.zone}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedZone(selectedZone === zone.zone ? null : zone.zone)}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg border cursor-pointer transition-all ${
                selectedZone === zone.zone ? "border-purple-400 ring-2 ring-purple-200" : "border-purple-100"
              }`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${zone.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium opacity-90">{zone.zone}</span>
                  <MapPin className="w-5 h-5 opacity-80" />
                </div>
                <h3 className="text-xl font-semibold">{zone.name}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Standard Delivery</span>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {zone.standardRate === 0 ? "FREE*" : `PKR ${zone.standardRate}`}
                      </div>
                      <div className="text-xs text-gray-500">{zone.standardDays} days</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Express Delivery</span>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">PKR {zone.expressRate}</div>
                      <div className="text-xs text-gray-500">{zone.expressDays} days</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free shipping over PKR {zone.freeShippingMin.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>

                {/* Cities */}
                <AnimatePresence>
                  {selectedZone === zone.zone && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pt-4 border-t border-gray-100"
                    >
                      <p className="text-sm font-medium text-gray-700 mb-2">Covered Cities:</p>
                      <div className="flex flex-wrap gap-2">
                        {zone.cities.map((city) => (
                          <span
                            key={city}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: selectedZone === zone.zone ? 180 : 0 }}
                  className="flex justify-center mt-4"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packaging Process */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
            Our Packaging <span className="text-gradient">Process</span>
          </h2>
          <p className="text-gray-600">Every item is packed with care to ensure safe delivery</p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
            {packagingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100 text-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-3xl mb-2"
                >
                  {step.icon}
                </motion.div>
                <div className="w-8 h-8 mx-auto mb-2 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Partners */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-3xl p-8 border border-purple-100"
        >
          <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 text-center">
            Our Trusted <span className="text-gradient">Delivery Partners</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {deliveryPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100"
              >
                <div className="text-4xl mb-3">{partner.logo}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{partner.name}</h3>
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{partner.rating}</span>
                </div>
                <p className="text-sm text-gray-500">{partner.deliveries} deliveries</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* International Shipping */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center"
            >
              <Globe className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-gray-900">
                International Shipping
              </h2>
              <p className="text-gray-600">We ship to select countries worldwide</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Supported Countries</h3>
              <div className="flex flex-wrap gap-2">
                {["UAE", "Saudi Arabia", "UK", "USA", "Canada", "Australia"].map((country) => (
                  <span
                    key={country}
                    className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">International Rates</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Rates calculated at checkout
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  7-14 business days delivery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Full tracking provided
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Customs duties may apply
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl font-semibold text-gray-900">
            Shipping <span className="text-gradient">FAQs</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: "How are fragile items like chandeliers shipped?",
              a: "All fragile items are wrapped in multiple layers of bubble wrap, placed in custom foam inserts, and shipped in reinforced double-walled boxes. We mark all packages as 'FRAGILE' and use premium shipping services.",
            },
            {
              q: "Can I change my delivery address after placing an order?",
              a: "Yes, you can change your delivery address within 2 hours of placing the order by contacting our support team. After the order is dispatched, address changes are not possible.",
            },
            {
              q: "What happens if my package is damaged during delivery?",
              a: "If you receive a damaged package, please document it with photos and contact us within 24 hours. We offer full replacement or refund for items damaged during transit.",
            },
            {
              q: "Do you offer same-day delivery?",
              a: "Same-day delivery is available in Lahore for orders placed before 12 PM on weekdays. Additional charges apply. Contact us to arrange same-day delivery.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Box className="w-5 h-5 text-purple-600" />
                {faq.q}
              </h3>
              <p className="text-gray-600 pl-7">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full"
          />
          
          <div className="relative text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              📦
            </motion.div>
            
            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              Questions About Shipping?
            </h2>
            <p className="text-purple-200 mb-8 max-w-xl mx-auto">
              Our support team is ready to help with any shipping inquiries
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+923001234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                +92 300 1234567
              </motion.a>
              <motion.a
                href="mailto:shipping@lumedecor.pk"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-700 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2 border border-purple-600"
              >
                <Mail size={18} />
                shipping@lumedecor.pk
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

