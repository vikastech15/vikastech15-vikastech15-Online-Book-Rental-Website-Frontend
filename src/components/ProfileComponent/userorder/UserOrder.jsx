// import React, { useState } from 'react';
// import { FaBook, FaSearch, FaCalendarAlt, FaTruck, FaCheckCircle, FaTimesCircle, FaChevronDown } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const MyOrdersPage = () => {
//   // Sample orders data
//   const [orders, setOrders] = useState([
//     {
//       id: 'ORD-78901',
//       date: '2023-11-15',
//       status: 'Delivered',
//       items: [
//         {
//           id: 1,
//           title: "The Midnight Library",
//           author: "Matt Haig",
//           coverImage: "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
//           rentalPeriod: '14 days',
//           dueDate: '2023-11-29',
//           price: 4.99
//         },
//         {
//           id: 2,
//           title: "Atomic Habits",
//           author: "James Clear",
//           coverImage: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
//           rentalPeriod: '7 days',
//           dueDate: '2023-11-22',
//           price: 3.99
//         }
//       ],
//       total: 8.98,
//       trackingNumber: 'TRK12345678',
//       deliveryDate: '2023-11-17',
//       expanded: false
//     },
//     {
//       id: 'ORD-78902',
//       date: '2023-11-10',
//       status: 'Shipped',
//       items: [
//         {
//           id: 3,
//           title: "Dune",
//           author: "Frank Herbert",
//           coverImage: "https://m.media-amazon.com/images/I/71OB5HxKsrL._AC_UF1000,1000_QL80_.jpg",
//           rentalPeriod: '21 days',
//           dueDate: '2023-12-01',
//           price: 599
//         }
//       ],
//       total: 599,
//       trackingNumber: 'TRK87654321',
//       estimatedDelivery: '2023-11-18',
//       expanded: false
//     },
//     {
//       id: 'ORD-78903',
//       date: '2023-11-05',
//       status: 'Cancelled',
//       items: [
//         {
//           id: 4,
//           title: "The Silent Patient",
//           author: "Alex Michaelides",
//           coverImage: "https://m.media-amazon.com/images/I/71MBv6aGdGL._AC_UF1000,1000_QL80_.jpg",
//           rentalPeriod: '14 days',
//           dueDate: '2023-11-19',
//           price: 499
//         }
//       ],
//       total: 499,
//       reason: 'Out of stock',
//       expanded: false
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [activeTab, setActiveTab] = useState('current');

//   // Filter orders based on search and status
//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.items.some(item => 
//       item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       item.author.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
//     const matchesTab = 
//       (activeTab === 'current' && order.status !== 'Delivered' && order.status !== 'Cancelled') ||
//       (activeTab === 'past' && (order.status === 'Delivered' || order.status === 'Cancelled'));
    
//     return matchesSearch && matchesStatus && matchesTab;
//   });

//   // Toggle order expansion
//   const toggleOrder = (orderId) => {
//     setOrders(orders.map(order => 
//       order.id === orderId ? { ...order, expanded: !order.expanded } : order
//     ));
//   };

//   // Cancel an order
//   const cancelOrder = (orderId) => {
//     if (window.confirm('Are you sure you want to cancel this order?')) {
//       setOrders(orders.map(order => 
//         order.id === orderId ? { ...order, status: 'Cancelled', reason: 'Cancelled by customer' } : order
//       ));
//     }
//   };

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   const statusColors = {
//     Delivered: 'bg-green-100 text-green-800',
//     Shipped: 'bg-red-100 text-red-800',
//     Processing: 'bg-yellow-100 text-yellow-800',
//     Cancelled: 'bg-red-100 text-red-800'
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
//         >
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
//             <p className="mt-2 text-gray-600">
//               View and manage your book rentals
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 relative w-full md:w-64">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search orders..."
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </motion.div>

//         {/* Tabs and Filters */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white shadow rounded-lg p-4 mb-8"
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex border-b border-gray-200 w-full sm:w-auto">
//               <button
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'current' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('current')}
//               >
//                 Current Rentals
//               </button>
//               <button
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'past' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('past')}
//               >
//                 Past Rentals
//               </button>
//             </div>
//             <div className="flex items-center space-x-4 w-full sm:w-auto">
//               <span className="text-gray-700 text-sm">Filter:</span>
//               <select
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </motion.div>

//         {/* Orders List */}
//         <AnimatePresence>
//           {filteredOrders.length > 0 ? (
//             <motion.div
//               variants={container}
//               initial="hidden"
//               animate="show"
//               className="space-y-6"
//             >
//               {filteredOrders.map((order) => (
//                 <motion.div
//                   key={order.id}
//                   variants={item}
//                   layout
//                   className="bg-white shadow rounded-lg overflow-hidden"
//                 >
//                   <div 
//                     className={`p-4 cursor-pointer ${order.expanded ? 'border-b border-gray-200' : ''}`}
//                     onClick={() => toggleOrder(order.id)}
//                   >
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                       <div className="flex items-center space-x-4 mb-2 md:mb-0">
//                         <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
//                           {order.status}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Order #{order.id}
//                         </div>
//                         <div className="text-sm text-gray-500 flex items-center">
//                           <FaCalendarAlt className="mr-1" />
//                           {order.date}
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <div className="text-sm font-medium">
//                           Total: {order.total.toFixed(2)}
//                         </div>
//                         <motion.div
//                           animate={{ rotate: order.expanded ? 180 : 0 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <FaChevronDown className="text-gray-400" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </div>

//                   <AnimatePresence>
//                     {order.expanded && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="p-4"
//                       >
//                         <div className="space-y-4">
//                           {order.items.map((item) => (
//                             <div key={item.id} className="flex border-b border-gray-100 pb-4 last:border-0">
//                               <div className="flex-shrink-0 h-24 w-16 overflow-hidden rounded-md">
//                                 <img
//                                   src={item.coverImage}
//                                   alt={item.title}
//                                   className="h-full w-full object-cover"
//                                 />
//                               </div>
//                               <div className="ml-4 flex-1">
//                                 <div className="flex justify-between text-base font-medium text-gray-900">
//                                   <h3>{item.title}</h3>
//                                   <p className="ml-4">{item.price.toFixed(2)}</p>
//                                 </div>
//                                 <p className="text-sm text-gray-500">{item.author}</p>
//                                 <div className="flex mt-2 text-sm text-gray-500 space-x-4">
//                                   <div className="flex items-center">
//                                     <FaCalendarAlt className="mr-1 text-gray-400" />
//                                     <span>Due: {item.dueDate}</span>
//                                   </div>
//                                   <div>
//                                     <span>Rental period: {item.rentalPeriod}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}

//                           <div className="border-t border-gray-200 pt-4">
//                             {order.trackingNumber && (
//                               <div className="flex items-center text-sm text-gray-500 mb-2">
//                                 <FaTruck className="mr-2 text-gray-400" />
//                                 <span className="font-medium">Tracking #: </span>
//                                 <span className="ml-1">{order.trackingNumber}</span>
//                                 {order.deliveryDate && (
//                                   <span className="ml-4">
//                                     Delivered on {order.deliveryDate}
//                                   </span>
//                                 )}
//                                 {order.estimatedDelivery && (
//                                   <span className="ml-4">
//                                     Estimated delivery: {order.estimatedDelivery}
//                                   </span>
//                                 )}
//                               </div>
//                             )}

//                             {order.reason && (
//                               <div className="flex items-center text-sm text-red-500 mb-2">
//                                 <FaTimesCircle className="mr-2" />
//                                 <span>Reason: {order.reason}</span>
//                               </div>
//                             )}

//                             <div className="flex justify-end space-x-4">
//                               {order.status === 'Processing' && (
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => cancelOrder(order.id)}
//                                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                                 >
//                                   Cancel Order
//                                 </motion.button>
//                               )}
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
//                               >
//                                 {order.status === 'Delivered' ? 'Rent Again' : 'View Details'}
//                               </motion.button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="bg-white rounded-lg shadow p-8 text-center"
//             >
//               <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
//                 <FaBook className="h-full w-full" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-1">
//                 {searchTerm ? 'No matching orders found' : 'No orders yet'}
//               </h3>
//               <p className="text-gray-500 mb-4">
//                 {searchTerm
//                   ? 'Try adjusting your search or filter'
//                   : 'Your rental orders will appear here'}
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Browse Books
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default MyOrdersPage;




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