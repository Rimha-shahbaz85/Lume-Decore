"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  Check,
  ChevronLeft,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Smartphone,
  Banknote,
  Wallet,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type Step = "shipping" | "payment" | "confirmation";
type PaymentMethod = "easypaisa" | "jazzcash" | "cod" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("easypaisa");

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Pakistan",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    mobileAccount: "",
  });

  const paymentMethods = [
    {
      id: "easypaisa" as PaymentMethod,
      name: "EasyPaisa",
      icon: Smartphone,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      description: "Pay with your EasyPaisa mobile wallet",
    },
    {
      id: "jazzcash" as PaymentMethod,
      name: "JazzCash",
      icon: Wallet,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      description: "Pay with your JazzCash mobile account",
    },
    {
      id: "cod" as PaymentMethod,
      name: "Cash on Delivery",
      icon: Banknote,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
      description: "Pay when you receive your order",
    },
    {
      id: "card" as PaymentMethod,
      name: "Credit/Debit Card",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      description: "Pay with Visa, Mastercard, or other cards",
    },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setCurrentStep("confirmation");
    clearCart();
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    router.push("/cart");
    return null;
  }

  const steps = [
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "confirmation", label: "Confirmation", icon: Check },
  ];

  return (
    <div className="pt-40 pb-20 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        {currentStep !== "confirmation" && (
          <Link
            href={currentStep === "payment" ? "#" : "/cart"}
            onClick={(e) => {
              if (currentStep === "payment") {
                e.preventDefault();
                setCurrentStep("shipping");
              }
            }}
          >
            <motion.div
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-700 mb-8"
            >
              <ChevronLeft size={20} />
              {currentStep === "payment" ? "Back to Shipping" : "Back to Cart"}
            </motion.div>
          </Link>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    steps.findIndex((s) => s.id === currentStep) >= index
                      ? "#7b5cb8"
                      : "#e5e7eb",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                <step.icon
                  size={18}
                  className={
                    steps.findIndex((s) => s.id === currentStep) >= index
                      ? "text-white"
                      : "text-gray-400"
                  }
                />
              </motion.div>
              <span
                className={`ml-2 text-sm font-medium ${
                  steps.findIndex((s) => s.id === currentStep) >= index
                    ? "text-purple-700"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 md:w-24 h-0.5 mx-4 ${
                    steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-purple-700"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Confirmation Step */}
        <AnimatePresence mode="wait">
          {currentStep === "confirmation" ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="bg-white rounded-3xl p-12 shadow-lg">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <Check size={40} className="text-green-600" />
                </motion.div>
                <h1 className="font-display text-3xl font-semibold text-gray-900 mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-gray-600 mb-2">
                  Thank you for your purchase. Your order has been placed successfully.
                </p>
                <p className="text-purple-700 font-medium mb-4">
                  Order #LUM{Date.now().toString().slice(-8)}
                </p>
                <div className="bg-purple-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-purple-700 font-medium">
                    Payment Method: {paymentMethod === "easypaisa" ? "EasyPaisa" : paymentMethod === "jazzcash" ? "JazzCash" : paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
                  </p>
                  {paymentMethod === "cod" && (
                    <p className="text-xs text-purple-600 mt-1">Please keep exact cash ready for delivery</p>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-8">
                  A confirmation SMS has been sent to {shippingInfo.phone || "your phone"}
                </p>
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form Section */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {currentStep === "shipping" ? (
                  <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-8">
                    <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <MapPin size={24} className="text-purple-700" />
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            required
                            value={shippingInfo.firstName}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, email: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, phone: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <Home
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          required
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, state: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.zip}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, zip: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, country: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 bg-white"
                        >
                          <option>Pakistan</option>
                          <option>United Arab Emirates</option>
                          <option>Saudi Arabia</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary py-4"
                    >
                      Continue to Payment
                    </motion.button>
                  </form>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="bg-white rounded-2xl p-8">
                    <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <CreditCard size={24} className="text-purple-700" />
                      Payment Method
                    </h2>

                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {paymentMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                            paymentMethod === method.id
                              ? `${method.borderColor} ${method.bgColor}`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {/* Selected indicator */}
                          {paymentMethod === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center"
                            >
                              <Check size={14} className="text-white" />
                            </motion.div>
                          )}
                          
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center mb-2`}>
                            <method.icon size={20} className="text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{method.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Payment Details based on method */}
                    <AnimatePresence mode="wait">
                      {(paymentMethod === "easypaisa" || paymentMethod === "jazzcash") && (
                        <motion.div
                          key="mobile-payment"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6"
                        >
                          <div className={`p-4 rounded-xl mb-4 ${
                            paymentMethod === "easypaisa" ? "bg-green-50" : "bg-red-50"
                          }`}>
                            <p className="text-sm text-gray-700">
                              {paymentMethod === "easypaisa" 
                                ? "Enter your EasyPaisa registered mobile number. You will receive a payment request on your phone."
                                : "Enter your JazzCash registered mobile number. You will receive a payment request on your phone."
                              }
                            </p>
                          </div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Account Number
                          </label>
                          <div className="relative">
                            <Smartphone
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="03XX XXXXXXX"
                              value={paymentInfo.mobileAccount}
                              onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, mobileAccount: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === "cod" && (
                        <motion.div
                          key="cod-payment"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6"
                        >
                          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <Banknote size={20} className="text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-amber-800 mb-1">Cash on Delivery</h4>
                                <p className="text-sm text-amber-700">
                                  Pay in cash when your order arrives at your doorstep. Please keep exact change ready for the delivery person.
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs text-amber-600">
                                  <Check size={14} />
                                  <span>No advance payment required</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === "card" && (
                        <motion.div
                          key="card-payment"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <div className="relative">
                              <CreditCard
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="text"
                                required
                                placeholder="1234 5678 9012 3456"
                                value={paymentInfo.cardNumber}
                                onChange={(e) =>
                                  setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                                }
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="MM/YY"
                                value={paymentInfo.expiry}
                                onChange={(e) =>
                                  setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <input
                                type="text"
                                required
                                placeholder="123"
                                value={paymentInfo.cvv}
                                onChange={(e) =>
                                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                              />
                            </div>
                          </div>

                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              required
                              value={paymentInfo.nameOnCard}
                              onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-all duration-300 ${
                        paymentMethod === "easypaisa" 
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          : paymentMethod === "jazzcash"
                          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          : paymentMethod === "cod"
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                          : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          {paymentMethod === "cod" ? (
                            <>
                              <Banknote size={18} />
                              Place Order (Pay on Delivery)
                            </>
                          ) : (
                            <>
                              <Lock size={18} />
                              Pay Rs. {total.toLocaleString()}
                            </>
                          )}
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                      <Lock size={14} />
                      Your payment information is secure and encrypted
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-2xl p-8 sticky top-40">
                  <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ivory flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-700 text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                        </div>
                        <span className="text-sm font-medium">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `Rs. ${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>Rs. {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-purple-700">Rs. {total.toLocaleString()}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="mt-2 p-2 bg-amber-50 rounded-lg">
                        <p className="text-xs text-amber-700 text-center">💵 Pay on Delivery</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

