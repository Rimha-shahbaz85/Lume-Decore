"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Package,
  Truck,
  CreditCard,
  RefreshCw,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  ShoppingBag,
  Palette,
  Shield,
  Clock,
} from "lucide-react";

const faqCategories = [
  { id: "all", name: "All Questions", icon: HelpCircle, count: 20 },
  { id: "orders", name: "Orders & Shipping", icon: Package, count: 6 },
  { id: "products", name: "Products", icon: ShoppingBag, count: 5 },
  { id: "customization", name: "Customization", icon: Palette, count: 4 },
  { id: "payments", name: "Payments", icon: CreditCard, count: 3 },
  { id: "returns", name: "Returns & Refunds", icon: RefreshCw, count: 2 },
];

const faqs = [
  // Orders & Shipping
  {
    id: 1,
    category: "orders",
    question: "How long does delivery take?",
    answer: "Standard delivery within Pakistan takes 3-7 business days. For Lahore, Karachi, and Islamabad, we offer express delivery within 2-3 days. Custom mirror orders may take 10-15 business days as they are made to order.",
    popular: true,
  },
  {
    id: 2,
    category: "orders",
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free shipping on all orders above PKR 10,000 within Pakistan. For orders below this amount, a flat shipping fee of PKR 500 applies. International shipping is available at additional cost.",
    popular: true,
  },
  {
    id: 3,
    category: "orders",
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email and SMS with your tracking number. You can also track your order by logging into your account or visiting our Track Order page with your order number.",
  },
  {
    id: 4,
    category: "orders",
    question: "Do you deliver to all cities in Pakistan?",
    answer: "Yes, we deliver to all major cities and towns across Pakistan through our trusted courier partners. Remote areas may have slightly longer delivery times.",
  },
  {
    id: 5,
    category: "orders",
    question: "Can I change or cancel my order?",
    answer: "You can modify or cancel your order within 2 hours of placing it by contacting our customer support. Once the order is processed or shipped, changes cannot be made, but you can initiate a return after delivery.",
  },
  {
    id: 6,
    category: "orders",
    question: "How are fragile items like chandeliers packaged?",
    answer: "All our lighting fixtures and mirrors are carefully packaged with multiple layers of protective foam, bubble wrap, and sturdy boxes. We also mark packages as 'FRAGILE' and use premium shipping for delicate items.",
  },

  // Products
  {
    id: 7,
    category: "products",
    question: "Are your products authentic and high quality?",
    answer: "Absolutely! We source all our products directly from premium manufacturers. Each item undergoes quality checks before shipping. Our chandeliers feature genuine crystals, and our mirrors use high-grade materials.",
    popular: true,
  },
  {
    id: 8,
    category: "products",
    question: "Do you provide installation services?",
    answer: "Yes, we offer professional installation services in Lahore, Karachi, and Islamabad for an additional fee. For other cities, we provide detailed installation guides and video tutorials with every purchase.",
  },
  {
    id: 9,
    category: "products",
    question: "What warranty do your products come with?",
    answer: "All our lighting products come with a 1-year warranty covering manufacturing defects. LED mirrors have a 2-year warranty. Warranty does not cover damage from improper installation or misuse.",
  },
  {
    id: 10,
    category: "products",
    question: "Can I see products in person before buying?",
    answer: "Yes! Visit our showroom in Gulberg III, Lahore to see our collection in person. We're open Monday-Saturday 10am-8pm and Sunday 2pm-7pm. You can also schedule a virtual consultation.",
  },
  {
    id: 11,
    category: "products",
    question: "Do your LED mirrors come with a remote control?",
    answer: "Yes, all our LED mirrors with RGB lighting come with a wireless remote control for easy color and brightness adjustments. Some models also support touch controls and smartphone connectivity.",
  },

  // Customization
  {
    id: 12,
    category: "customization",
    question: "How does the custom mirror service work?",
    answer: "Visit our Customization page to design your perfect mirror. Choose from our design templates (including Islamic calligraphy), select your shape, size, frame style, and LED options. Our team will create your unique piece within 10-15 business days.",
    popular: true,
  },
  {
    id: 13,
    category: "customization",
    question: "Can I request a custom design not shown on your website?",
    answer: "Absolutely! Contact us with your design ideas, and our team will work with you to create a custom piece. We can incorporate personal calligraphy, family names, or specific patterns based on your requirements.",
  },
  {
    id: 14,
    category: "customization",
    question: "What sizes are available for custom mirrors?",
    answer: "Our custom mirrors range from 12x12 inches to 48x48 inches. We can also create larger pieces for commercial projects. Custom dimensions are available upon request with adjusted pricing.",
  },
  {
    id: 15,
    category: "customization",
    question: "Can I see a preview before my custom mirror is made?",
    answer: "Yes! After placing your order, our design team will send you a digital mockup within 48 hours. You can request revisions before we begin production to ensure you're completely satisfied.",
  },

  // Payments
  {
    id: 16,
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment options including EasyPaisa, JazzCash, bank transfers, and Cash on Delivery (COD). Credit/Debit card payments are also available through our secure payment gateway.",
    popular: true,
  },
  {
    id: 17,
    category: "payments",
    question: "Is Cash on Delivery available?",
    answer: "Yes, COD is available for orders up to PKR 50,000 across Pakistan. A verification call will be made before dispatch. For orders above this amount, advance payment is required.",
  },
  {
    id: 18,
    category: "payments",
    question: "Do you offer installment plans?",
    answer: "We're working on introducing installment plans through various banks. Currently, you can use your bank's own installment plan if they offer one on your credit card purchases.",
  },

  // Returns & Refunds
  {
    id: 19,
    category: "returns",
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for non-customized items in original condition with packaging. Custom-made products are non-returnable unless there's a manufacturing defect. Return shipping is free for defective items.",
  },
  {
    id: 20,
    category: "returns",
    question: "How long do refunds take?",
    answer: "Once we receive and inspect the returned item, refunds are processed within 3-5 business days. Bank refunds may take an additional 5-7 days to reflect in your account depending on your bank.",
  },
];

// Floating Particles
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
          scale: [1, 1.3, 1],
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

// FAQ Accordion Item
const FAQItem = ({ faq, isOpen, onToggle, index }: { 
  faq: typeof faqs[0]; 
  isOpen: boolean; 
  onToggle: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="relative"
  >
    <motion.div
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen 
          ? "border-purple-300 shadow-lg shadow-purple-100" 
          : "border-purple-100 hover:border-purple-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start gap-4"
      >
        <motion.div
          animate={{ 
            backgroundColor: isOpen ? "#a855f7" : "#f3e8ff",
            scale: isOpen ? 1.1 : 1,
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        >
          <HelpCircle className={`w-5 h-5 ${isOpen ? "text-white" : "text-purple-600"}`} />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {faq.popular && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Popular
              </span>
            )}
          </div>
          <h3 className={`font-semibold text-lg transition-colors ${
            isOpen ? "text-purple-700" : "text-gray-900"
          }`}>
            {faq.question}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-purple-600" : "text-gray-400"}`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pl-20">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 leading-relaxed"
              >
                {faq.answer}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 flex items-center gap-4 text-sm"
              >
                <span className="text-gray-500">Was this helpful?</span>
                <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                  👍 Yes
                </button>
                <button className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1">
                  👎 No
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.popular);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 -top-48 -left-48 bg-purple-300/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 top-1/3 -right-40 bg-pink-300/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HelpCircle size={18} />
            </motion.span>
            <span className="text-sm font-medium">Help Center</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked{" "}
            <span className="relative">
              <span className="text-gradient">Questions</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find quick answers to common questions about orders, products, customization, and more
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <motion.div
              animate={{
                boxShadow: isSearchFocused 
                  ? "0 20px 40px rgba(168, 85, 247, 0.2)" 
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
              className="relative bg-white rounded-2xl overflow-hidden border border-purple-100"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-4 outline-none text-gray-700 placeholder:text-gray-400"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {faqCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-purple-100 hover:border-purple-300"
              }`}
            >
              <category.icon size={16} />
              {category.name}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id
                  ? "bg-white/20"
                  : "bg-purple-100 text-purple-600"
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Popular Questions - Only show when "All" is selected */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-3xl p-8 border border-purple-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                🔥
              </motion.div>
              <h2 className="font-display text-xl font-semibold text-gray-900">
                Most Popular Questions
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.map((faq, index) => (
                <motion.button
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(168, 85, 247, 0.05)" }}
                  onClick={() => {
                    setOpenFAQ(faq.id);
                    document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl text-left border border-purple-100 hover:border-purple-300 transition-all group"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors line-clamp-1">
                    {faq.question}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AnimatePresence mode="wait">
          {filteredFAQs.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => (
                <div key={faq.id} id={`faq-${faq.id}`}>
                  <FAQItem
                    faq={faq}
                    isOpen={openFAQ === faq.id}
                    onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    index={index}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or browse all categories</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                Clear filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quick Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Response Time", value: "< 24 hours", color: "from-emerald-400 to-teal-500" },
            { icon: MessageCircle, label: "Questions Answered", value: "10,000+", color: "from-purple-400 to-indigo-500" },
            { icon: Shield, label: "Satisfaction Rate", value: "98%", color: "from-amber-400 to-orange-500" },
            { icon: Sparkles, label: "Happy Customers", value: "500+", color: "from-pink-400 to-rose-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 rounded-full"
          />
          
          {/* Floating Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          <div className="relative text-center">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              💬
            </motion.div>
            
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Still Have Questions?
            </h2>
            
            <p className="text-purple-200 mb-8 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our friendly support team is here to help!
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              {[
                { icon: Phone, label: "Call Us", value: "+92 300 1234567", href: "tel:+923001234567" },
                { icon: Mail, label: "Email Us", value: "support@lumedecor.pk", href: "mailto:support@lumedecor.pk" },
                { icon: MessageCircle, label: "Live Chat", value: "Available Now", href: "#chat" },
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
                >
                  <contact.icon className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <div className="text-white font-medium">{contact.label}</div>
                  <div className="text-purple-300 text-sm">{contact.value}</div>
                </motion.a>
              ))}
            </div>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
              >
                Contact Us
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

