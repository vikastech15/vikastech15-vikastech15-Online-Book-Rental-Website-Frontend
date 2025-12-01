import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { BookOpenIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/navbar";
import { CartCard } from "../components/cart/CartCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {

  const navigate1 = useNavigate();
  
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate1("/login");
      }
    }, [navigate1]);


  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

const subtotal = cartItems.reduce(
 (sum, item) => sum + item.price * item.rentalPeriod * item.quantity,
  0
);

  const shipping = subtotal > 20 ? 0 : 3.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;


  function handleNavigate() {
    navigate("/Checkout")
  }

    function handleNavigateBrowse() {
    navigate("/Browse")
  }


  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex items-center mb-8">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" color="black" />
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Browse our collection to find your next great read!</p>
                  <button onClick={handleNavigateBrowse} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Browse Books
                  </button>
                </motion.div>
              ) : (
                cartItems.map((item) => (
                  <CartCard book={item}></CartCard>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6"
            >
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `Rs${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-red-600">Rs {total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={cartItems.length === 0}
                onClick={handleNavigate}
                className={`w-full mt-6 py-3 px-4 rounded-md text-white font-medium transition-colors ${
                  cartItems.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Proceed to Checkout
              </motion.button>

              {cartItems.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 text-sm text-gray-500 text-center"
                >
                  or <button className="text-red-600 hover:underline">continue shopping</button>
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartPage;
