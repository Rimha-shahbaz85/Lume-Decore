"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/shop" },
  { name: "Ceiling Lights", href: "/shop?category=ceiling-lights" },
  { name: "Chandeliers", href: "/shop?category=chandeliers" },
  { name: "Lamps", href: "/shop?category=lamps" },
  { name: "Lights", href: "/shop?category=lights" },
  { name: "Wall Mirrors", href: "/shop?category=wall-mirrors" },
  { name: "✨ Customization", href: "/customization" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/shop?search=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg shadow-purple-700/5"
            : "bg-transparent"
        }`}
      >
        {/* Announcement Bar */}
        <div className="bg-purple-700 text-white py-2 overflow-hidden">
          <div className="marquee flex whitespace-nowrap">
            <span className="mx-8 text-sm font-light tracking-wide">
              ✨ Free shipping on orders over Rs. 5,000 ✨ New arrivals every week ✨ Transform your space with Lume & Decor ✨ Free shipping on orders over Rs. 5,000 ✨ New arrivals every week ✨ Transform your space with Lume & Decor
            </span>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center"
              >
                <h1 className="font-display text-2xl md:text-3xl font-semibold text-purple-700 tracking-wide">
                  LUME & DECOR
                </h1>
                <span className="text-[10px] md:text-xs text-purple-500 tracking-[0.3em] font-light">
                  Glow Up Every Corner
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-purple-700 font-medium text-sm tracking-wide underline-animate transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-purple-700 transition-colors"
              >
                <Search size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 hover:text-purple-700 transition-colors hidden sm:block"
              >
                <Heart size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 hover:text-purple-700 transition-colors hidden sm:block"
              >
                <User size={20} />
              </motion.button>

              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-700 hover:text-purple-700 transition-colors relative"
                >
                  <ShoppingBag size={20} />
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-purple-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-purple-700 transition-colors lg:hidden"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-xl text-purple-700">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-700" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-lg text-gray-700 hover:text-purple-700 hover:pl-2 transition-all border-b border-purple-100"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-8 space-y-4">
                  <button className="w-full btn-primary">Sign In</button>
                  <button className="w-full btn-secondary">Create Account</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6"
            >
              <form onSubmit={handleSearch} className="flex items-center space-x-4">
                <Search size={24} className="text-purple-700" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 text-lg outline-none placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </form>
              <div className="mt-6 pt-6 border-t border-purple-100">
                <p className="text-sm text-gray-500 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Ceiling Lights", "Chandeliers", "Lamps", "Wall Mirrors", "Focus Lights", "Custom Mirror"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickSearch(term)}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
