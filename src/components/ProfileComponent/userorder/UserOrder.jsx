
import React, { useEffect, useState } from "react";
import { FaBook, FaSearch, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/order/user/681c2fb67a2b5b4d85d98a97"
        );
        const data = await response.json();
        setOrders(data.map(order => ({ ...order, expanded: false })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, expanded: !order.expanded } : order
    ));
  };

  const statusColors = {
    Delivered: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-gray-100 text-gray-800",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-1 text-gray-600">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FaBook className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-4">
              Your book orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow rounded-lg overflow-hidden">
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleOrder(order._id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.book.title}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        ₹{order.price}
                      </span>
                      <motion.div
                        animate={{ rotate: order.expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {order.expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4"
                    >
                      <div className="flex border-t border-gray-100 pt-4">
                        <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={`http://localhost:5000/${order.book.images[0].url}`}
                            alt={order.book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">{order.book.title}</h3>
                          <p className="text-sm text-gray-600">{order.book.author}</p>
                          <div className="mt-2 text-sm text-gray-500 space-y-1">
                            <p>Ordered: {formatDate(order.orderedAt)}</p>
                            <p>Type: {order.type}</p>
                            {order.type === "Rent" && (
                              <p>Rental period: {order.rentalPeriodDays} days</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm">
                        <h4 className="font-medium text-gray-900">Shipping Address</h4>
                        <p className="text-gray-600 mt-1">
                          {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                          {order.shippingAddress.state} - {order.shippingAddress.zip}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
