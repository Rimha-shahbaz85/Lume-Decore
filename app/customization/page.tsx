"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Ruler,
  Palette,
  Frame,
  MessageSquare,
  ShoppingCart,
  Star,
  Heart,
  Zap,
  RotateCcw,
  Eye,
  Wand2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const designs = [
  {
    id: 1,
    name: "99 Names of Allah",
    image: "/customization/99-names-of-allah.webp",
    description: "Beautiful calligraphy featuring the 99 Names of Allah in elegant Arabic script",
    category: "Islamic",
    popular: true,
    gradient: "from-emerald-500 to-teal-600",
    price: 8000,
  },
  {
    id: 2,
    name: "Ayat ul Kursi / Islamic Pattern",
    image: "/customization/islamic.webp",
    description: "Stunning Ayat ul Kursi or geometric Islamic pattern with intricate details",
    category: "Islamic",
    popular: true,
    gradient: "from-purple-500 to-indigo-600",
    price: 10000,
  },
];

const mirrorShapes = [
  { id: "round", name: "Round", icon: "⭕", preview: "rounded-full" },
  { id: "rectangle", name: "Rectangle", icon: "⬜", preview: "rounded-lg" },
  { id: "oval", name: "Oval", icon: "🥚", preview: "rounded-[50%]" },
  { id: "arch", name: "Arch", icon: "🚪", preview: "rounded-t-full rounded-b-lg" },
  { id: "hexagon", name: "Hexagon", icon: "⬡", preview: "clip-hexagon" },
  { id: "custom", name: "Custom", icon: "✨", preview: "rounded-2xl" },
];

const mirrorSizes = [
  { id: "1.5x2", name: "1.5 x 2 ft", dimensions: "1.5 x 2 feet", price: 1800 },
  { id: "2x2", name: "2 x 2 ft", dimensions: "2 x 2 feet (Square)", price: 2200 },
  { id: "2x3", name: "2 x 3 ft", dimensions: "2 x 3 feet", price: 2800 },
  { id: "2x4", name: "2 x 4 ft", dimensions: "2 x 4 feet", price: 3500 },
  { id: "2x5", name: "2 x 5 ft", dimensions: "2 x 5 feet", price: 4200 },
  { id: "2x6", name: "2 x 6 ft", dimensions: "2 x 6 feet", price: 5000 },
  { id: "custom", name: "Custom Size", dimensions: "Your dimensions", price: 0 },
];

const frameStyles = [
  { id: "none", name: "No Frame", price: 0, color: "", borderWidth: "0" },
  { id: "gold", name: "Gold Frame", price: 800, color: "from-yellow-400 via-yellow-300 to-yellow-500", borderWidth: "8px" },
  { id: "silver", name: "Silver Frame", price: 700, color: "from-gray-300 via-white to-gray-400", borderWidth: "8px" },
  { id: "black", name: "Black Frame", price: 500, color: "from-gray-800 via-gray-700 to-gray-900", borderWidth: "8px" },
  { id: "white", name: "White Frame", price: 500, color: "from-gray-100 via-white to-gray-200", borderWidth: "8px" },
  { id: "rose-gold", name: "Rose Gold", price: 1000, color: "from-rose-300 via-rose-200 to-rose-400", borderWidth: "8px" },
];

// LED pricing: Rs. 30-40 per foot (calculated on perimeter)
// Example: 2x3 ft mirror = 10 ft perimeter = Rs. 350-400
const ledOptions = [
  { id: "none", name: "No LED", price: 0, glow: "", description: "No LED lighting" },
  { id: "warm", name: "Warm White LED", price: 350, glow: "shadow-[0_0_60px_rgba(255,200,100,0.5)]", description: "Rs. 35/ft" },
  { id: "cool", name: "Cool White LED", price: 350, glow: "shadow-[0_0_60px_rgba(200,220,255,0.6)]", description: "Rs. 35/ft" },
  { id: "rgb", name: "RGB Color LED", price: 500, glow: "shadow-[0_0_60px_rgba(147,51,234,0.5)]", description: "Rs. 50/ft" },
];

// Aurora/Northern Lights effect
const AuroraEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    <motion.div
      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)
        `,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  </div>
);

// Morphing Blob Shape
const MorphingBlob = ({ className = "", color = "purple" }: { className?: string; color?: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    style={{
      background: color === "purple" 
        ? "linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3))"
        : "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.3))",
    }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      scale: [1, 1.1, 0.95, 1],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Floating Orbs with Trail
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-4 h-4 rounded-full"
        style={{
          background: `radial-gradient(circle, ${
            ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i]
          }, transparent)`,
          boxShadow: `0 0 20px ${['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i]}`,
          left: `${20 + i * 15}%`,
        }}
        animate={{
          y: [0, -100, -200, -100, 0],
          x: [0, 30, 0, -30, 0],
          opacity: [0.3, 0.8, 1, 0.8, 0.3],
          scale: [0.5, 1, 1.2, 1, 0.5],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Glowing Grid Lines
const GlowingGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <svg className="w-full h-full">
      <defs>
        <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {[...Array(10)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 10}%`}
            x2="100%"
            y2={`${i * 10}%`}
            stroke="url(#gridGlow)"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 10}%`}
            y1="0"
            x2={`${i * 10}%`}
            y2="100%"
            stroke="url(#gridGlow)"
            strokeWidth="0.5"
          />
        ))}
      </motion.g>
    </svg>
  </div>
);

// Floating sparkles component
const FloatingSparkles = () => {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{ left: sparkle.left }}
          initial={{ y: "110%", opacity: 0, scale: 0 }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        >
          <Sparkles 
            size={sparkle.size} 
            className="text-purple-400/60" 
          />
        </motion.div>
      ))}
    </div>
  );
};

// Ripple Effect Component
const RippleEffect = ({ trigger }: { trigger: boolean }) => (
  <AnimatePresence>
    {trigger && (
      <>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl border-2 border-purple-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        ))}
      </>
    )}
  </AnimatePresence>
);

// Particle Burst on Selection
const ParticleBurst = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * 30 * Math.PI) / 180) * 60,
              y: Math.sin((i * 30 * Math.PI) / 180) * 60,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </>
    )}
  </AnimatePresence>
);

// Confetti component for success animation
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{ 
            left: `${piece.x}%`, 
            backgroundColor: piece.color,
            top: '-20px'
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ 
            y: '100vh', 
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

// Shimmer effect component
const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 -translate-x-full"
    animate={{ translateX: ['-100%', '200%'] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    style={{
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    }}
  />
);

// Pulse ring animation
const PulseRing = ({ color = "purple" }: { color?: string }) => (
  <motion.div
    className={`absolute inset-0 rounded-full border-2 border-${color}-400`}
    initial={{ scale: 1, opacity: 0.8 }}
    animate={{ scale: 1.5, opacity: 0 }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: "-100%",
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function CustomizationPage() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(1);
  const [selectedShape, setSelectedShape] = useState("round");
  const [selectedSize, setSelectedSize] = useState("2x3");
  const [selectedFrame, setSelectedFrame] = useState("gold");
  const [selectedLed, setSelectedLed] = useState("warm");
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [notes, setNotes] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pulsePrice, setPulsePrice] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  // Animate price when selections change
  useEffect(() => {
    setPulsePrice(true);
    const timer = setTimeout(() => setPulsePrice(false), 500);
    return () => clearTimeout(timer);
  }, [selectedDesign, selectedShape, selectedSize, selectedFrame, selectedLed]);

  const calculateTotal = () => {
    const sizePrice = mirrorSizes.find((s) => s.id === selectedSize)?.price || 0;
    const framePrice = frameStyles.find((f) => f.id === selectedFrame)?.price || 0;
    const ledPrice = ledOptions.find((l) => l.id === selectedLed)?.price || 0;
    const designPrice = selectedDesign ? (designs.find((d) => d.id === selectedDesign)?.price || 0) : 0;
    
    let total = sizePrice + framePrice + ledPrice + designPrice;
    
    if (selectedSize === "custom" && customWidth && customHeight) {
      // Custom size: Rs. 300 per square foot
      const sqFt = (parseInt(customWidth) * parseInt(customHeight)) / 144; // convert sq inches to sq feet
      total = Math.round(sqFt * 300) + framePrice + ledPrice + designPrice;
    }
    
    return total;
  };

  const handleAddToCart = () => {
    const design = designs.find((d) => d.id === selectedDesign);

    addItem({
      id: Date.now().toString(),
      name: `Custom Mirror - ${design?.name || "Plain"} ${selectedShape}`,
      price: calculateTotal(),
      image: design?.image || "/customization/islamic.webp",
      category: "customization",
    });

    setAddedToCart(true);
    setShowConfetti(true);
    setTimeout(() => {
      setAddedToCart(false);
      setShowConfetti(false);
    }, 3000);
  };

  const steps = [
    { id: 1, name: "Design", icon: Palette, color: "from-pink-500 to-rose-500" },
    { id: 2, name: "Shape & Size", icon: Ruler, color: "from-purple-500 to-indigo-500" },
    { id: 3, name: "Frame & LED", icon: Frame, color: "from-amber-500 to-orange-500" },
    { id: 4, name: "Review", icon: Check, color: "from-emerald-500 to-teal-500" },
  ];

  const selectedFrameStyle = frameStyles.find((f) => f.id === selectedFrame);
  const selectedLedStyle = ledOptions.find((l) => l.id === selectedLed);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 overflow-hidden">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Aurora Effect */}
        <AuroraEffect />
        
        {/* Morphing Blobs */}
        <MorphingBlob className="top-10 left-10 w-[400px] h-[400px]" color="purple" />
        <MorphingBlob className="bottom-20 right-20 w-[350px] h-[350px]" color="blue" />
        
        {/* Glowing Grid */}
        <GlowingGrid />
        
        {/* Floating Orbs */}
        <FloatingOrbs />
        
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-[200px]"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <FloatingSparkles />
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full mb-6 relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Wand2 className="text-purple-600" size={18} />
              </motion.div>
              <span className="text-purple-700 text-sm font-medium">Create Your Masterpiece</span>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-pink-500" size={18} />
              </motion.div>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
              <motion.span 
                className="text-gray-900 inline-block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Mirror
              </motion.span>{" "}
              <motion.span 
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent inline-block bg-[length:200%_auto]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ 
                  opacity: { delay: 0.5, duration: 0.6 },
                  x: { delay: 0.5, duration: 0.6 },
                  backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
                }}
              >
                Customization
              </motion.span>
            </h1>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Design your perfect Islamic mirror with beautiful calligraphy, custom shapes, elegant frames & LED lighting
            </motion.p>

            {/* Animated decorative elements */}
            <div className="flex justify-center gap-8 mt-8">
              {[
                { icon: "🪞", label: "Custom Designs", delay: 0.8, color: "from-purple-500 to-pink-500" },
                { icon: "✨", label: "LED Lighting", delay: 0.9, color: "from-amber-500 to-orange-500" },
                { icon: "🎨", label: "Premium Frames", delay: 1.0, color: "from-emerald-500 to-teal-500" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: item.delay, duration: 0.6, type: "spring" }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -10,
                    rotateY: 10,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg relative overflow-hidden`}
                    whileHover={{ 
                      boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.4)"
                    }}
                  >
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.span 
                      className="text-2xl relative z-10"
                      animate={{ 
                        y: [0, -3, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                    >
                      {item.icon}
                    </motion.span>
                  </motion.div>
                  <motion.span 
                    className="text-sm text-gray-500 font-medium group-hover:text-purple-600 transition-colors"
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Animated scroll indicator */}
            <motion.div
              className="mt-12 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-sm text-gray-400 mb-2">Start Customizing</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-purple-300 flex justify-center pt-2"
              >
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-3 rounded-full bg-purple-500"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />
          <motion.div 
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          
          <div className="relative flex items-center justify-between">
            {steps.map((step) => (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep(step.id)}
                className="flex flex-col items-center z-10"
              >
                <motion.div
                  animate={{
                    scale: currentStep === step.id ? 1.15 : 1,
                    boxShadow: currentStep >= step.id 
                      ? "0 4px 20px rgba(168, 85, 247, 0.4)" 
                      : "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                    currentStep >= step.id
                      ? `bg-gradient-to-r ${step.color}`
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <step.icon size={20} className={currentStep >= step.id ? "text-white" : "text-gray-400"} />
                  )}
                </motion.div>
                <span className={`text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? "text-purple-700" : "text-gray-400"
                }`}>
                  {step.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Customization Options */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Design Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-[100px]" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                      <Palette size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-gray-900">Choose Your Design</h2>
                      <p className="text-gray-500 text-sm">Select a beautiful Islamic calligraphy</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {designs.map((design, index) => (
                      <motion.div
                        key={design.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDesign(design.id)}
                        className={`relative cursor-pointer rounded-2xl overflow-hidden group border-2 ${
                          selectedDesign === design.id
                            ? "border-purple-500 shadow-xl shadow-purple-500/20"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        {/* Popular Badge */}
                        {design.popular && (
                          <motion.div 
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            className="absolute top-3 left-3 z-10"
                          >
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                              <Star size={12} fill="currentColor" />
                              Popular
                            </span>
                          </motion.div>
                        )}

                        {/* Selected Check */}
                        <AnimatePresence>
                          {selectedDesign === design.id && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute top-3 right-3 z-10 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check size={18} className="text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </div>

                        <div className="p-4 bg-white">
                          <span className={`text-xs font-bold uppercase tracking-wider text-purple-600`}>
                            {design.category}
                          </span>
                          <h3 className="font-semibold text-gray-900 mt-1">{design.name}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{design.description}</p>
                          <p className="text-purple-600 font-semibold mt-2 flex items-center gap-1">
                            <Sparkles size={14} />
                            + Rs. {design.price.toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Plain Mirror Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDesign(null)}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden group border-2 ${
                        selectedDesign === null
                          ? "border-purple-500 shadow-xl shadow-purple-500/20"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <AnimatePresence>
                        {selectedDesign === null && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Check size={18} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <motion.div 
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-xl"
                        >
                          <span className="text-5xl">🪞</span>
                        </motion.div>
                      </div>

                      <div className="p-4 bg-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Classic
                        </span>
                        <h3 className="font-semibold text-gray-900 mt-1">Plain Mirror</h3>
                        <p className="text-sm text-gray-500 mt-1">Simple elegant mirror without design</p>
                        <p className="text-emerald-600 font-semibold mt-2">✓ No extra charge</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(236, 72, 153, 0.3)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(2)}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all relative overflow-hidden group"
                  >
                    {/* Animated shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Continue to Shape & Size
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ChevronRight size={20} />
                      </motion.span>
                    </span>
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Shape & Size */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-[100px]" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Ruler size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-gray-900">Shape & Size</h2>
                      <p className="text-gray-500 text-sm">Select dimensions for your mirror</p>
                    </div>
                  </div>

                  {/* Shape Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-bold">1</span>
                      Mirror Shape
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {mirrorShapes.map((shape) => (
                        <motion.button
                          key={shape.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedShape(shape.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all text-center ${
                            selectedShape === shape.id
                              ? "bg-purple-50 border-purple-500 shadow-lg shadow-purple-500/20"
                              : "bg-gray-50 border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <span className="text-3xl block mb-2">{shape.icon}</span>
                          <span className="text-xs font-medium text-gray-700">{shape.name}</span>
                          {selectedShape === shape.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                              <Check size={12} className="text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-bold">2</span>
                      Mirror Size
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {mirrorSizes.map((size) => (
                        <motion.button
                          key={size.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSize(size.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                            selectedSize === size.id
                              ? "bg-purple-50 border-purple-500 shadow-lg shadow-purple-500/20"
                              : "bg-gray-50 border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">{size.name}</p>
                              <p className="text-sm text-gray-500">{size.dimensions}</p>
                            </div>
                            {selectedSize === size.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                              >
                                <Check size={14} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                          {size.price > 0 && (
                            <p className="text-purple-600 font-semibold mt-2">
                              Rs. {size.price.toLocaleString('en-US')}
                            </p>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Custom Size Input */}
                    <AnimatePresence>
                      {selectedSize === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl"
                        >
                          <p className="text-sm text-purple-700 mb-3 flex items-center gap-2">
                            <Ruler size={16} />
                            Enter your custom dimensions (in inches)
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-600 mb-1 block">Width</label>
                              <input
                                type="number"
                                value={customWidth}
                                onChange={(e) => setCustomWidth(e.target.value)}
                                placeholder="e.g., 24"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-gray-800"
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-600 mb-1 block">Height</label>
                              <input
                                type="number"
                                value={customHeight}
                                onChange={(e) => setCustomHeight(e.target.value)}
                                placeholder="e.g., 36"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-gray-800"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-gray-200"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >
                      Continue
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Frame & LED */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-[100px]" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <Frame size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-gray-900">Frame & Lighting</h2>
                      <p className="text-gray-500 text-sm">Add elegant frame and LED backlighting</p>
                    </div>
                  </div>

                  {/* Frame Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs text-white font-bold">1</span>
                      Frame Style
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {frameStyles.map((frame) => (
                        <motion.button
                          key={frame.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedFrame(frame.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all ${
                            selectedFrame === frame.id
                              ? "bg-amber-50 border-amber-500 shadow-lg shadow-amber-500/20"
                              : "bg-gray-50 border-gray-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {frame.color ? (
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${frame.color} shadow-md`} />
                            ) : (
                              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
                                <span className="text-gray-400 text-xs">None</span>
                              </div>
                            )}
                            <div className="text-left">
                              <p className="font-medium text-gray-800 text-sm">{frame.name}</p>
                              <p className="text-xs text-amber-600 font-semibold">
                                {frame.price > 0 ? `+ Rs. ${frame.price.toLocaleString('en-US')}` : "Free"}
                              </p>
                            </div>
                          </div>
                          {selectedFrame === frame.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md"
                            >
                              <Check size={14} className="text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* LED Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs text-white font-bold">2</span>
                      <Zap size={16} className="text-yellow-500" />
                      LED Backlighting
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {ledOptions.map((led) => (
                        <motion.button
                          key={led.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedLed(led.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                            selectedLed === led.id
                              ? "bg-amber-50 border-amber-500 shadow-lg shadow-amber-500/20"
                              : "bg-gray-50 border-gray-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800">{led.name}</p>
                              <p className="text-sm text-amber-600 font-semibold">
                                {led.price > 0 ? `+ Rs. ${led.price.toLocaleString('en-US')}` : "No LED"}
                              </p>
                            </div>
                            {selectedLed === led.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md"
                              >
                                <Check size={14} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <MessageSquare size={18} className="text-purple-500" />
                      Special Notes (Optional)
                    </h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or customization notes..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 resize-none text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-gray-200"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(4)}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-[100px]" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Check size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-gray-900">Review Your Order</h2>
                      <p className="text-gray-500 text-sm">Confirm your custom mirror details</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Design", value: selectedDesign ? designs.find((d) => d.id === selectedDesign)?.name : "Plain Mirror", price: selectedDesign ? `+ Rs. ${(designs.find((d) => d.id === selectedDesign)?.price || 0).toLocaleString()}` : "Free" },
                      { label: "Shape", value: mirrorShapes.find((s) => s.id === selectedShape)?.name, icon: mirrorShapes.find((s) => s.id === selectedShape)?.icon },
                      { label: "Size", value: selectedSize === "custom" && customWidth && customHeight ? `${customWidth}" x ${customHeight}" (Custom)` : `${mirrorSizes.find((s) => s.id === selectedSize)?.name} - ${mirrorSizes.find((s) => s.id === selectedSize)?.dimensions}`, price: `Rs. ${selectedSize === "custom" && customWidth && customHeight ? (parseInt(customWidth) * parseInt(customHeight) * 35).toLocaleString('en-US') : mirrorSizes.find((s) => s.id === selectedSize)?.price.toLocaleString('en-US')}` },
                      { label: "Frame", value: frameStyles.find((f) => f.id === selectedFrame)?.name, price: frameStyles.find((f) => f.id === selectedFrame)?.price ? `+ Rs. ${frameStyles.find((f) => f.id === selectedFrame)?.price.toLocaleString('en-US')}` : "Free" },
                      { label: "LED Lighting", value: ledOptions.find((l) => l.id === selectedLed)?.name, price: ledOptions.find((l) => l.id === selectedLed)?.price ? `+ Rs. ${ledOptions.find((l) => l.id === selectedLed)?.price.toLocaleString('en-US')}` : "Free" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-200"
                      >
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="font-medium text-gray-900 flex items-center gap-2">
                            {item.icon && <span>{item.icon}</span>}
                            {item.value}
                          </p>
                        </div>
                        <p className={`font-semibold ${item.price === "Free" ? "text-emerald-600" : "text-purple-600"}`}>
                          {item.price}
                        </p>
                      </motion.div>
                    ))}

                    {notes && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 bg-purple-50 border border-purple-200 rounded-2xl"
                      >
                        <p className="text-sm text-gray-500 mb-1">Special Notes</p>
                        <p className="text-gray-800">{notes}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-gray-200"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={addedToCart}
                      className={`flex-1 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-white ${
                        addedToCart 
                          ? "bg-emerald-500" 
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check size={20} />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          Add to Cart
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-40">
              {/* Preview Card with 3D effect */}
              <motion.div 
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 30px 60px -15px rgba(168, 85, 247, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100 mb-6 relative overflow-hidden"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Eye size={18} className="text-purple-500" />
                    Live Preview
                  </h3>
                  <motion.button
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                  >
                    <RotateCcw size={16} className="text-gray-500" />
                  </motion.button>
                </div>

                {/* Mirror Preview */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                  {/* Animated Background pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: "radial-gradient(circle at 2px 2px, #c4b5fd 1px, transparent 0)",
                      backgroundSize: "20px 20px"
                    }} />
                  </motion.div>

                  {/* Floating glow effect */}
                  <motion.div
                    className="absolute w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"
                    animate={{
                      x: [0, 50, -30, 0],
                      y: [0, -30, 50, 0],
                      scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Mirror with frame and LED */}
                  <motion.div
                    animate={{ 
                      scale: isPreviewMode ? 0.8 : 1,
                      rotateY: isPreviewMode ? 15 : 0,
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={`relative w-full h-full ${selectedLedStyle?.glow || ""}`}
                    style={{ perspective: "1000px" }}
                  >
                    {/* Frame */}
                    <div 
                      className={`absolute inset-0 ${selectedShape === "round" ? "rounded-full" : selectedShape === "oval" ? "rounded-[50%]" : selectedShape === "arch" ? "rounded-t-full" : "rounded-2xl"} ${selectedFrameStyle?.color ? `bg-gradient-to-br ${selectedFrameStyle.color}` : ""}`}
                      style={{ padding: selectedFrameStyle?.borderWidth || "0" }}
                    >
                      {/* Mirror surface */}
                      <div className={`w-full h-full ${selectedShape === "round" ? "rounded-full" : selectedShape === "oval" ? "rounded-[50%]" : selectedShape === "arch" ? "rounded-t-full" : "rounded-xl"} overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative`}>
                        {selectedDesign ? (
                          <Image
                            src={designs.find((d) => d.id === selectedDesign)?.image || ""}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <span className="text-4xl">🪞</span>
                          </div>
                        )}
                        {/* Reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200"
                  >
                    <Heart
                      size={18}
                      className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </motion.button>
                </div>

                {/* Quick Info */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
                    <p className="text-xs text-gray-500">Shape</p>
                    <p className="text-sm font-medium text-gray-800">{mirrorShapes.find((s) => s.id === selectedShape)?.name}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm font-medium text-gray-800">{mirrorSizes.find((s) => s.id === selectedSize)?.name}</p>
                  </div>
                </div>
              </motion.div>

              {/* Price Summary with animated border */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="relative rounded-3xl p-6 shadow-xl overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #db2777 100%)",
                      "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #9333ea 100%)",
                      "linear-gradient(135deg, #db2777 0%, #9333ea 50%, #7c3aed 100%)",
                      "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #db2777 100%)",
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating particles inside */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{ left: `${10 + i * 12}%` }}
                      animate={{
                        y: ["100%", "-100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      💎
                    </motion.span>
                    Order Summary
                  </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Base Price</span>
                    <span className="text-white">Rs. {(mirrorSizes.find((s) => s.id === selectedSize)?.price || 0).toLocaleString('en-US')}</span>
                  </div>
                  {selectedDesign && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">Design</span>
                      <span className="text-white">+ Rs. {(designs.find((d) => d.id === selectedDesign)?.price || 0).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedFrame !== "none" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">Frame</span>
                      <span className="text-white">+ Rs. {(frameStyles.find((f) => f.id === selectedFrame)?.price || 0).toLocaleString('en-US')}</span>
                    </div>
                  )}
                  {selectedLed !== "none" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">LED</span>
                      <span className="text-white">+ Rs. {(ledOptions.find((l) => l.id === selectedLed)?.price || 0).toLocaleString('en-US')}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-purple-400/30 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-100 font-medium">Total</span>
                    <motion.span 
                      key={calculateTotal()}
                      initial={{ scale: 1.3, color: "#fbbf24" }}
                      animate={{ 
                        scale: pulsePrice ? [1, 1.2, 1] : 1,
                        color: "#ffffff"
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-bold text-white"
                    >
                      Rs. {calculateTotal().toLocaleString('en-US')}
                    </motion.span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-4 p-3 bg-white/10 rounded-xl">
                  <p className="text-sm text-white flex items-center gap-2">
                    <span>🚚</span>
                    Delivery in 7-10 business days
                  </p>
                </div>

                {/* Contact */}
                <motion.div 
                  className="mt-3 p-3 bg-white/10 rounded-xl relative overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-sm text-purple-100 relative z-10">
                    Need help? <strong className="text-white">+92 300 123 4567</strong>
                  </p>
                </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      <AnimatePresence>
        {addedToCart && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div 
              className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center gap-3 relative overflow-hidden"
              animate={{ 
                boxShadow: [
                  "0 25px 50px -12px rgba(16, 185, 129, 0.3)",
                  "0 25px 50px -12px rgba(16, 185, 129, 0.6)",
                  "0 25px 50px -12px rgba(16, 185, 129, 0.3)",
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <motion.div 
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Check size={20} className="text-white" />
                </motion.div>
              </motion.div>
              <div>
                <motion.p 
                  className="font-semibold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Added to Cart! 🎉
                </motion.p>
                <motion.p 
                  className="text-sm text-emerald-100"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Your custom mirror is ready
                </motion.p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Link 
                  href="/cart" 
                  className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium text-white transition-colors flex items-center gap-2"
                >
                  <ShoppingCart size={16} />
                  View Cart
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
