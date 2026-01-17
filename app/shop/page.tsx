"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-2000", label: "Under Rs. 2,000" },
  { value: "2000-5000", label: "Rs. 2,000 - 5,000" },
  { value: "5000-10000", label: "Rs. 5,000 - 10,000" },
  { value: "10000+", label: "Rs. 10,000+" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [gridCols, setGridCols] = useState(3);
  const [showFilters, setShowFilters] = useState(false);

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Update search query when URL param changes
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
      setSelectedCategory("all"); // Reset category when searching
    }
  }, [searchParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range (in PKR)
    if (priceRange !== "all") {
      if (priceRange === "10000+") {
        result = result.filter((p) => p.price >= 10000);
      } else {
        const [min, max] = priceRange.split("-").map(Number);
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  const getCategoryName = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (selectedCategory === "all") return "All Products";
    const cat = categories.find((c) => c.id === selectedCategory);
    return cat?.name || "Shop";
  };

  const clearSearch = () => {
    setSearchQuery("");
    window.history.pushState({}, "", "/shop");
  };

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            {getCategoryName()}
          </h1>
          <p className="text-gray-600">
            Discover our curated collection of premium lighting and decor
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100"
        >
          {/* Left: Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-purple-700 text-white"
                  : "bg-purple-50 text-gray-700 hover:bg-purple-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-purple-700 text-white"
                    : "bg-purple-50 text-gray-700 hover:bg-purple-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right: View & Sort */}
          <div className="flex items-center gap-4">
            {/* Filters Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-purple-50 rounded-full p-1">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 rounded-full transition-colors ${
                  gridCols === 2 ? "bg-white shadow-sm text-purple-700" : "text-gray-500"
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-full transition-colors ${
                  gridCols === 3 ? "bg-white shadow-sm text-purple-700" : "text-gray-500"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors">
                Sort by
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-purple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                      sortBy === option.value ? "text-purple-700 bg-purple-50" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="fixed inset-0 z-50 bg-white p-6 lg:static lg:z-auto lg:p-0 lg:w-64 flex-shrink-0"
              >
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={24} />
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setPriceRange(range.value)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          priceRange === range.value
                            ? "bg-purple-100 text-purple-700"
                            : "text-gray-600 hover:bg-purple-50"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory !== "all" || priceRange !== "all" || searchQuery) && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Active Filters</h4>
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setPriceRange("all");
                          clearSearch();
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Search: {searchQuery}
                          <button onClick={clearSearch}>
                            <X size={14} />
                          </button>
                        </span>
                      )}
                      {selectedCategory !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {categories.find((c) => c.id === selectedCategory)?.name}
                          <button onClick={() => setSelectedCategory("all")}>
                            <X size={14} />
                          </button>
                        </span>
                      )}
                      {priceRange !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {priceRanges.find((p) => p.value === priceRange)?.label}
                          <button onClick={() => setPriceRange("all")}>
                            <X size={14} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full btn-primary lg:hidden"
                >
                  Show {filteredProducts.length} Products
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar - Always visible on lg+ */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      priceRange === range.value
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || priceRange !== "all" || searchQuery) && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Active Filters</h4>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange("all");
                      clearSearch();
                    }}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      Search: {searchQuery}
                      <button onClick={clearSearch}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory("all")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {priceRanges.find((p) => p.value === priceRange)?.label}
                      <button onClick={() => setPriceRange("all")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-6">
              Showing {filteredProducts.length} products
            </p>

            <div
              className={`grid gap-6 ${
                gridCols === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange("all");
                  }}
                  className="text-purple-600 font-medium hover:text-purple-700"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
