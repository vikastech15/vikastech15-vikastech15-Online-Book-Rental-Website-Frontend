// import React, { useState } from "react";
// import { FaBook, FaHeart, FaSearch, FaRegClock, FaTimes, FaRegBell } from "react-icons/fa";

// const WishlistPage = () => {
//   // Sample wishlist data (in a real app, fetch from API/localStorage)
//   const [wishlist, setWishlist] = useState([
//     {
//       id: 1,
//       title: "The Midnight Library",
//       author: "Matt Haig",
//       coverImage: "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
//       rating: 4.5,
//       available: true,
//       addedDate: "2023-10-15",
//     },
//     {
//       id: 2,
//       title: "Atomic Habits",
//       author: "James Clear",
//       coverImage: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
//       rating: 4.7,
//       available: false,
//       addedDate: "2023-10-10",
//     },
//     {
//       id: 3,
//       title: "Dune",
//       author: "Frank Herbert",
//       coverImage: "https://m.media-amazon.com/images/I/71OB5HxKsrL._AC_UF1000,1000_QL80_.jpg",
//       rating: 4.8,
//       available: false,
//       addedDate: "2023-09-28",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   // Filter books based on search & availability
//   const filteredBooks = wishlist.filter((book) => {
//     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = selectedFilter === "all" || 
//                          (selectedFilter === "available" && book.available) ||
//                          (selectedFilter === "unavailable" && !book.available);
//     return matchesSearch && matchesFilter;
//   });

//   // Remove a book from wishlist
//   const removeFromWishlist = (bookId) => {
//     setWishlist(wishlist.filter((book) => book.id !== bookId));
//   };

//   // Clear entire wishlist
//   const clearWishlist = () => {
//     if (confirm("Are you sure you want to clear your wishlist?")) {
//       setWishlist([]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div className="flex items-center mb-4 md:mb-0">
//             <FaHeart className="text-2xl text-red-500 mr-3" />
//             <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
//           </div>
//           {wishlist.length > 0 && (
//             <button
//               onClick={clearWishlist}
//               className="text-red-500 hover:text-red-700 flex items-center"
//             >
//               <FaTimes className="mr-1" /> Clear All
//             </button>
//           )}
//         </div>

//         {/* Search & Filter */}
//         <div className="bg-white shadow rounded-lg p-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by title or author..."
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-700">Filter:</span>
//               <select
//                 className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 value={selectedFilter}
//                 onChange={(e) => setSelectedFilter(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 <option value="available">Available Now</option>
//                 <option value="unavailable">Currently Unavailable</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Wishlist Books */}
//         {filteredBooks.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBooks.map((book) => (
//               <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="relative">
//                   <img
//                     src={book.coverImage}
//                     alt={`Cover of ${book.title}`}
//                     className="w-full h-48 object-cover"
//                   />
//                   <button
//                     onClick={() => removeFromWishlist(book.id)}
//                     className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
//                     title="Remove from wishlist"
//                   >
//                     <FaTimes className="text-gray-500 text-sm" />
//                   </button>
//                   {!book.available && (
//                     <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                       Currently Unavailable
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{book.title}</h3>
//                     <div className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
//                       {book.rating} ★
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-3">{book.author}</p>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center text-gray-500 text-sm">
//                       <FaRegClock className="mr-1" />
//                       Added {book.addedDate}
//                     </div>
//                     <button
//                       className={`px-3 py-1 rounded-md text-sm font-medium ${book.available ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
//                       disabled={!book.available}
//                     >
//                       {book.available ? 'Rent Now' : 'Notify Me'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <FaBook className="mx-auto text-4xl text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchTerm ? 'No matching books found' : 'Your wishlist is empty'}
//             </h3>
//             <p className="text-gray-500">
//               {searchTerm
//                 ? 'Try adjusting your search or filter'
//                 : 'Save books you love by clicking the ❤️ icon'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


import React, { useState } from "react";
import { FaBook, FaHeart, FaSearch, FaRegClock, FaTimes, FaRegBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "The Library",
      author: "Matt Haig",
      coverImage: "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.5,
      available: true,
      addedDate: "2023-10-15",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.7,
      available: false,
      addedDate: "2023-10-10",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      coverImage: "https://m.media-amazon.com/images/I/71OB5HxKsrL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.8,
      available: false,
      addedDate: "2023-09-28",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isClearing, setIsClearing] = useState(false);

  const filteredBooks = wishlist.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "available" && book.available) ||
                         (selectedFilter === "unavailable" && !book.available);
    return matchesSearch && matchesFilter;
  });

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter((book) => book.id !== bookId));
  };

  const clearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      setIsClearing(true);
      setTimeout(() => {
        setWishlist([]);
        setIsClearing(false);
      }, 500);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <FaHeart className="text-2xl text-red-500 mr-3" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          {wishlist.length > 0 && (
            <motion.button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes className="mr-1" /> Clear All
            </motion.button>
          )}
        </motion.div>

        {/* Search & Filter with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow rounded-lg p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaTimes className="text-gray-400 hover:text-gray-500" />
                </motion.button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Filter:</span>
              <motion.select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                whileHover={{ scale: 1.02 }}
              >
                <option value="all">All</option>
                <option value="available">Available Now</option>
                <option value="unavailable">Currently Unavailable</option>
              </motion.select>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Books with animations */}
        <AnimatePresence>
          {filteredBooks.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate={isClearing ? "hidden" : "show"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  variants={item}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <motion.img
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.button
                      onClick={() => removeFromWishlist(book.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      title="Remove from wishlist"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes className="text-gray-500 text-sm" />
                    </motion.button>
                    {!book.available && (
                      <motion.div 
                        className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                      >
                        Currently Unavailable
                      </motion.div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{book.title}</h3>
                      <motion.div 
                        className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        {book.rating} ★
                      </motion.div>
                    </div>
                    <p className="text-gray-600 mb-3">{book.author}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaRegClock className="mr-1" />
                        Added {book.addedDate}
                      </div>
                      <motion.button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${book.available ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                        disabled={!book.available}
                        whileHover={book.available ? { scale: 1.05 } : {}}
                        whileTap={book.available ? { scale: 0.95 } : {}}
                      >
                        {book.available ? 'Rent Now' : 'Notify Me'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow p-8 text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaBook className="mx-auto text-4xl text-gray-400 mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No matching books found' : 'Your wishlist is empty'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? 'Try adjusting your search or filter'
                  : 'Save books you love by clicking the ❤️ icon'}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Browse Books
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;