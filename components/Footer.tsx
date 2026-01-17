"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Ceiling Lights", href: "/shop?category=ceiling-lights" },
    { name: "Chandeliers", href: "/shop?category=chandeliers" },
    { name: "Lamps", href: "/shop?category=lamps" },
    { name: "Lights", href: "/shop?category=lights" },
    { name: "Wall Mirrors", href: "/shop?category=wall-mirrors" },
    { name: "✨ Customization", href: "/customization" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Track Order", href: "/track-order" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/lumedecore_01?igsh=eWxkYzFicHE2aXN4", name: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@ld87751?_r=1&_t=ZS-939anxDlC6u", name: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-purple-950 text-white mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-3xl md:text-4xl mb-4">
                Join Our Luminous Community
              </h3>
              <p className="text-purple-200 text-lg">
                Subscribe for exclusive offers, design inspiration, and early access to new collections.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-purple-900/50 border border-purple-700 text-white placeholder:text-purple-300 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors group"
                >
                  Subscribe
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="font-display text-2xl font-semibold tracking-wide">
                LUME & DECOR
              </h2>
              <span className="text-xs text-purple-300 tracking-[0.2em]">
                Glow Up Every Corner
              </span>
            </Link>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              Transforming spaces with curated home decor that brings warmth, elegance, and personality to every corner of your home.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-purple-800/50 flex items-center justify-center hover:bg-purple-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white text-sm transition-colors hover:pl-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white text-sm transition-colors hover:pl-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white text-sm transition-colors hover:pl-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-purple-200 text-sm">
                  Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-purple-200 text-sm">+92 300 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-purple-200 text-sm">hello@lumendecor.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-300 text-sm">
              © 2026 Lume & Decor. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-purple-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-purple-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-purple-300 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

