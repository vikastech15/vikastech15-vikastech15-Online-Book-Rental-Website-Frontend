import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  CreditCardIcon,
  BookOpenIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
const location = useLocation();
  // const navigate = useNavigate();
const cartItemsFromRedux = useSelector((state) => state.cart.cartItems);
const cartItemsFromLocation = location.state?.books;

const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

// Normalize and assign default values

// Wrap object in array if needed, then add default values
const normalizedLocationItems = cartItemsFromLocation
  ? [{
      ...cartItemsFromLocation,
      rentalPeriodDays: cartItemsFromLocation.rentalPeriodDays ?? 1,
      quantity: cartItemsFromLocation.quantity ?? 1,
    }]
  : [];

const cartItems = normalizedLocationItems.length > 0 ? normalizedLocationItems : cartItemsFromRedux || [];




   

  console.log("Cart Items: ",cartItems);
  // const cartItems = book
  //   ? [{ ...book }]
  //   : [
  //       {
  //         id: "680e8663323d1bfe2cd32ffe",
  //         title: "The Great Gatsby",
  //         author: "F. Scott Fitzgerald",
  //         rentalPrice: 4.99,
  //         rentalPeriod: 14,
  //         image: "/book1.jpg",
  //       },
  //       {
  //         id: "6819af8d45a86039515d9ac4",
  //         title: "To Kill a Mockingbird",
  //         author: "Harper Lee",
  //         rentalPrice: 3.99,
  //         rentalPeriod: 21,
  //         image: "/book2.jpg",
  //       },
  //     ];
  // State for checkout flow
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  // State for address selection
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Mock cart data
  // const cartItems = [
  //   {
  //     id: "680e8663323d1bfe2cd32ffe",
  //     title: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     rentalPrice: 4.99,
  //     rentalPeriod: 14,
  //     image: "/book1.jpg",
  //   },
  //   {
  //     id: "6819af8d45a86039515d9ac4",
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     rentalPrice: 3.99,
  //     rentalPeriod: 21,
  //     image: "/book2.jpg",
  //   },
  // ];

  // Calculate totals
  // const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  // const tax = subtotal * 0.05; // 5% tax
  // const shipping = 2.99; // Flat rate shipping
  // const total = subtotal + tax + shipping;

const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.rentalPeriod * item.quantity,
  0
);

  const shipping = subtotal > 20 ? 0 : 3.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  // Fetch addresses from backend
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoadingAddresses(true);
      const email = localStorage.getItem("userEmail");
      try {
        // Replace with your actual API call
        const response = await fetch("http://localhost:5000/api/get-address", {
          method: "POST", // Changed from GET to POST to send email in body
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setAddresses(data.address);
        if (data.address.length > 0) {
          setSelectedAddress(data.address[0]);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:5000/api/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          addressId: selectedAddress,
          cartItems,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsProcessing(false);
        setOrderComplete(true);
        setStep(4);
      } else {
        setIsProcessing(false);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setIsProcessing(false);
      alert("There was an error processing your order.");
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Progress Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute mb-5 w-[97%]  left-0 right-0 h-2.5 bg-gray-100 z-0 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-full bg-gradient-to-r from-white to-red-700 rounded-full shadow-[0_2px_4px_rgba(59,130,246,0.3)]"
                  initial={{
                    width: "0%",
                    opacity: 0.7,
                    scaleX: 0.8,
                  }}
                  animate={{
                    width: `${Math.min(
                      100,
                      Math.max(0, ((step - 1) / 3) * 100)
                    )}%`,
                    opacity: 1,
                    scaleX: 1,
                  }}
                  transition={{
                    width: {
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1],
                    },
                    opacity: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                    scaleX: {
                      duration: 0.6,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  }}
                  style={{
                    transformOrigin: "left center",
                    willChange: "transform, width",
                  }}
                >
                  <motion.div
                    className="absolute right-0 top-0 h-full w-3 bg-white/30"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: ["0%", "50%", "100%"],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      repeatDelay: 0.5,
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {[1, 2, 3, 4].map((stepNumber) => (
                <button
                  key={stepNumber}
                  onClick={() => stepNumber < step && setStep(stepNumber)}
                  className={`flex flex-col items-center z-10 ${
                    stepNumber <= step ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === stepNumber
                        ? "bg-red-600 text-white"
                        : stepNumber < step
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      step >= stepNumber ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {stepNumber === 1 && "Cart"}
                    {stepNumber === 2 && "Delivery"}
                    {stepNumber === 3 && "Payment"}
                    {stepNumber === 4 && "Complete"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Steps */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Cart Review (visible on step 1) */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <BookOpenIcon className="w-5 h-5 mr-2 text-red-600" />
                      Your Rental Cart
                    </h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start border-b pb-4"
                        >
                          <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden mr-4">
                            <img
                              src={
                                item.images[0].url.startsWith("http")
                                  ? item.images[0].url
                                  : `http://localhost:5000/${item.images[0].url}`
                              }
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-600">
                              {item.author}
                            </p>
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Rs{item.price} * {item.quantity} = Rs{item.price * item.quantity}</span>
                            </div>
                          </div>
                          <button className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Proceed to Delivery
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: Delivery Address (visible on step 2) */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-red-600" />
                      Delivery Address
                    </h2>

                    {isLoadingAddresses ? (
                      <div className="flex justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">
                          Select a delivery address:
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {addresses.map((address) => (
                            <motion.div
                              key={address._id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedAddress(address._id)}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                selectedAddress === address.id
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start">
                                <input
                                  type="radio"
                                  checked={selectedAddress === address._id}
                                  onChange={() => {
                                    setSelectedAddress(address.id);
                                  }}
                                  className="mt-1 mr-2"
                                />
                                <div>
                                  <p className="font-medium">{address.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {address.street}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {address.city}, {address.state}{" "}
                                    {address.zip}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {address.phone}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {addresses.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No saved addresses found. Please add an address.
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                        >
                          + Add New Address
                        </motion.button>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Back to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        disabled={!selectedAddress}
                        className={`px-6 py-2 rounded-md transition-colors ${
                          selectedAddress
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Payment
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Payment (visible on step 3) */}
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <CreditCardIcon className="w-5 h-5 mr-2 text-red-600" />
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setPaymentMethod("credit")}
                          className={`px-4 py-2 rounded-md border ${
                            paymentMethod === "credit"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          Credit Card
                        </button>
                        <button
                          onClick={() => setPaymentMethod("paypal")}
                          className={`px-4 py-2 rounded-md border ${
                            paymentMethod === "paypal"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          PayPal
                        </button>
                      </div>

                      {paymentMethod === "credit" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === "paypal" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center"
                        >
                          <p>
                            You'll be redirected to PayPal to complete your
                            payment
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Back to Delivery
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className={`px-6 py-2 rounded-md transition-colors flex items-center ${
                          isProcessing
                            ? "bg-red-400 text-white"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Place Your Order"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Order Complete (visible on step 4) */}
              <AnimatePresence>
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow text-center"
                  >
                    <div className="flex justify-center">
                      <CheckCircleIcon className="w-16 h-16 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold mt-4">
                      Order Confirmed!
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Your books will be delivered to your selected address
                      within 3-5 business days.
                    </p>
                    <div className="mt-8 bg-gray-50 p-4 rounded-md text-left">
                      <h3 className="font-medium">Delivery Details</h3>
                      {selectedAddress &&
                        addresses.find((a) => a.id === selectedAddress) && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>
                              {
                                addresses.find((a) => a.id === selectedAddress)
                                  .name
                              }
                            </p>
                            <p>
                              {
                                addresses.find((a) => a.id === selectedAddress)
                                  .street
                              }
                            </p>
                            <p>
                              {
                                addresses.find((a) => a.id === selectedAddress)
                                  .city
                              }
                              ,{" "}
                              {
                                addresses.find((a) => a.id === selectedAddress)
                                  .state
                              }{" "}
                              {
                                addresses.find((a) => a.id === selectedAddress)
                                  .zip
                              }
                            </p>
                          </div>
                        )}
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        A confirmation email has been sent to your registered
                        email address.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Back to Bookstore
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleSection("items")}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        Books ({cartItems.length})
                      </span>
                      {expandedSection === "items" ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedSection === "items" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 space-y-2 overflow-hidden"
                        >
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm text-gray-600"
                            >
                              <span>{item.title}</span>
                              <span>Rs {item.price}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-1">
                      <span>Subtotal</span>
                      <span>Rs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Shipping</span>
                      <span>Rs {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Tax</span>
                      <span>Rs {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>

              {step === 2 && selectedAddress && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-red-600" />
                    Delivery Address
                  </h2>
                  {addresses.find((a) => a.id === selectedAddress) && (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">
                        {addresses.find((a) => a.id === selectedAddress).name}
                      </p>
                      <p>
                        {addresses.find((a) => a.id === selectedAddress).street}
                      </p>
                      <p>
                        {addresses.find((a) => a.id === selectedAddress).city},{" "}
                        {addresses.find((a) => a.id === selectedAddress).state}{" "}
                        {addresses.find((a) => a.id === selectedAddress).zip}
                      </p>
                      <p className="mt-2">
                        {addresses.find((a) => a.id === selectedAddress).phone}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutPage;
