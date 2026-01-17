"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  User,
  ArrowRight,
  Search,
  BookOpen,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Calendar,
} from "lucide-react";

const categories = [
  { id: "all", name: "All Posts", icon: "📚", count: 12 },
  { id: "lighting-tips", name: "Lighting Tips", icon: "💡", count: 4 },
  { id: "interior-design", name: "Interior Design", icon: "🏠", count: 3 },
  { id: "trends", name: "Trends 2026", icon: "✨", count: 2 },
  { id: "diy", name: "DIY & Ideas", icon: "🔧", count: 2 },
  { id: "islamic-art", name: "Islamic Art", icon: "🕌", count: 1 },
];

const featuredPost = {
  id: 1,
  title: "Transform Your Space: The Ultimate Guide to Statement Lighting",
  excerpt: "Discover how the right chandelier can completely transform your living room from ordinary to extraordinary. Learn expert tips for choosing the perfect centerpiece.",
  image: "/chandeliers/chandelier-1.jpeg",
  category: "Lighting Tips",
  author: "Lume & Decor Team",
  date: "Jan 12, 2026",
  readTime: "8 min read",
  likes: 234,
  comments: 45,
};

const blogPosts = [
  {
    id: 2,
    title: "5 Ways to Incorporate Islamic Art in Modern Interiors",
    excerpt: "Blend traditional Islamic calligraphy with contemporary design for a stunning fusion that honors heritage while embracing modernity.",
    image: "/customization/99-names-of-allah.webp",
    category: "Islamic Art",
    author: "Design Team",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    likes: 189,
    comments: 32,
    featured: true,
  },
  {
    id: 3,
    title: "LED Mirror Trends: What's Hot in 2026",
    excerpt: "From smart mirrors to RGB color-changing LEDs, explore the latest trends in mirror technology and design.",
    image: "/customization/islamic.webp",
    category: "Trends 2026",
    author: "Style Editor",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    likes: 156,
    comments: 28,
  },
  {
    id: 4,
    title: "Choosing the Perfect Chandelier Size for Your Room",
    excerpt: "Size matters! Learn the golden rules for selecting a chandelier that's perfectly proportioned for any space.",
    image: "/chandeliers/chandelier-2.jpeg",
    category: "Lighting Tips",
    author: "Interior Expert",
    date: "Jan 5, 2026",
    readTime: "4 min read",
    likes: 203,
    comments: 41,
  },
  {
    id: 5,
    title: "DIY: Create Your Own Ambient Lighting Setup",
    excerpt: "Transform any room with these simple DIY lighting tricks that won't break the bank but will make a huge impact.",
    image: "/lights/vanity-lights.jpeg",
    category: "DIY & Ideas",
    author: "DIY Specialist",
    date: "Jan 3, 2026",
    readTime: "7 min read",
    likes: 178,
    comments: 56,
  },
  {
    id: 6,
    title: "The Psychology of Light: How Lighting Affects Your Mood",
    excerpt: "Understand the science behind lighting and how to use it to create the perfect atmosphere in every room.",
    image: "/lights/kitchen-bar.jpeg",
    category: "Lighting Tips",
    author: "Wellness Team",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    likes: 245,
    comments: 38,
  },
  {
    id: 7,
    title: "Small Space Solutions: Mirrors That Make Rooms Look Bigger",
    excerpt: "Strategic mirror placement can transform cramped spaces. Discover the techniques interior designers swear by.",
    image: "/wall-mirrors/mirror-light-1.jpeg",
    category: "Interior Design",
    author: "Space Optimizer",
    date: "Dec 25, 2025",
    readTime: "5 min read",
    likes: 312,
    comments: 67,
  },
  {
    id: 8,
    title: "Vintage vs Modern: Mixing Lighting Styles Like a Pro",
    excerpt: "Learn how to blend antique chandeliers with modern fixtures for an eclectic look that's uniquely yours.",
    image: "/chandeliers/chandelier-3.jpeg",
    category: "Interior Design",
    author: "Style Expert",
    date: "Dec 22, 2025",
    readTime: "6 min read",
    likes: 198,
    comments: 44,
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
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
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

// Blog Card Component
const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-purple-100 relative"
    >
      {/* Featured Badge */}
      {post.featured && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
        >
          <TrendingUp size={12} />
          Featured
        </motion.div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <Bookmark
            size={18}
            className={isBookmarked ? "fill-purple-600 text-purple-600" : "text-gray-600"}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink-500 transition-colors"
            >
              <Heart
                size={16}
                className={isLiked ? "fill-pink-500 text-pink-500" : ""}
              />
              {post.likes + (isLiked ? 1 : 0)}
            </motion.button>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <MessageCircle size={16} />
              {post.comments}
            </span>
          </div>
          
          <Link href={`/blog/${post.id}`}>
            <motion.span
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-purple-600 font-medium text-sm"
            >
              Read More
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || 
      post.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
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
              <BookOpen size={18} />
            </motion.span>
            <span className="text-sm font-medium">Inspiration & Ideas</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Lume & Decor{" "}
            <span className="relative">
              <span className="text-gradient">Blog</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover lighting tips, interior design ideas, and inspiration to transform your space
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto mb-12"
        >
          <motion.div
            animate={{
              boxShadow: isSearchFocused 
                ? "0 20px 40px rgba(168, 85, 247, 0.2)" 
                : "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
            className="relative bg-white rounded-2xl overflow-hidden border border-purple-100"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
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

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
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
              <span>{category.icon}</span>
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

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-purple-900/20 lg:to-purple-900" />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <Sparkles size={16} />
                Featured Story
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-32 h-32 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
              />
              
              <span className="inline-block bg-purple-700/50 text-purple-200 px-3 py-1 rounded-full text-sm mb-4 w-fit">
                {featuredPost.category}
              </span>
              
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              
              <p className="text-purple-200 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-purple-300 text-sm mb-8">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {featuredPost.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featuredPost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Link href={`/blog/${featuredPost.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold flex items-center gap-2"
                  >
                    Read Article
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.button>
                </Link>
                
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Heart size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Share2 size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="font-display text-2xl font-semibold text-gray-900">
            Latest Articles
          </h2>
          <span className="text-gray-500 text-sm">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-purple-600 font-medium hover:text-purple-700"
              >
                Clear filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-purple-100"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/50 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/50 rounded-full"
          />

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl mb-6 relative"
          >
            ✉️
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4 relative">
            Subscribe to Our Newsletter
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-xl mx-auto relative">
            Get the latest design tips, trends, and exclusive offers delivered straight to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              Subscribe
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-4 relative">
            No spam, unsubscribe anytime ✨
          </p>
        </motion.div>
      </section>

      {/* Topics Cloud */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-semibold text-gray-900 mb-8">
            Popular Topics
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Chandeliers", "LED Mirrors", "Islamic Art", "Living Room",
              "Bedroom Lighting", "Modern Design", "Vintage Style", "DIY Projects",
              "Color Psychology", "Space Optimization", "Trends 2026", "Smart Lighting"
            ].map((topic, index) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white rounded-full text-gray-600 border border-purple-100 hover:border-purple-400 hover:text-purple-700 transition-all text-sm shadow-sm"
              >
                #{topic.replace(/\s+/g, "")}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

