import { API_URL } from "../config";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../../redux/features/cart/cartSlice"; // Make sure you have updateCartItem action
import {
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export function CartCard({ book }) {
  const item = book;
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    console.log(item)
    dispatch(
      updateCartItem({
        id: item._id,
        quantity: newQuantity,
      })
    );
  };

  const updateRentalPeriod = (item, newRentalPeriod) => {
    if (newRentalPeriod < 1) return; // Minimum 1 day

    dispatch(
      updateCartItem({
        id: item._id,
        rentalPeriod: newRentalPeriod,
      })
    );
  };

  return (
    <motion.div
      key={item._id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, height: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full sm:w-32 h-48 sm:h-36 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
        >
          <img
            src={
              item.images[0].url.startsWith("http")
                ? item.images[0].url
                : `${API_URL}/${item.images[0].url}`
            }
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.author}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {item.forSale ? `Sale` : `Rent`}
              </p>
              <p className="text-sm text-gray-600">{item.genre[0]}</p>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between">
            {!item.forSale && (
              <div className="mb-3 sm:mb-0 flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  Rental period (weeks):
                </span>
                <button
                  onClick={() =>
                    updateRentalPeriod(item, item.rentalPeriod - 1)
                  }
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  disabled={item.rentalPeriod <= 1}
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <span className="mx-2 w-8 text-center">
                  {item.rentalPeriod}
                </span>
                <button
                  onClick={() =>
                    updateRentalPeriod(item, item.rentalPeriod + 1)
                  }
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}
            {!item.forRent && (
              <div className="mb-3 sm:mb-0 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Quantity:</span>
                <button
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="w-full sm:w-auto mt-3 sm:mt-0 text-right">
              <span className="text-lg font-semibold text-red-600">
                Rs {(item.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
