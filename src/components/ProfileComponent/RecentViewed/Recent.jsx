import React, { useState } from 'react';
import { FaBook, FaClock, FaHeart, FaRegHeart, FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const RecentlyViewedBooks = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
      lastViewed: "2 hours ago",
      rating: 4.2,
      available: true,
      saved: false
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
      lastViewed: "1 day ago",
      rating: 4.7,
      available: true,
      saved: true
    },
    // ... other books
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isClearing, setIsClearing] = useState(false);

  const toggleSaveBook = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId ? {...book, saved: !book.saved} : book
    ));
  };

  const clearHistory = () => {
    setIsClearing(true);
    setTimeout(() => {
      setBooks([]);
      setIsClearing(false);
    }, 500);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <motion.span 
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
              >
                <FaClock className="text-red-600" />
              </motion.span>
              Recently Viewed
            </h1>
            <p className="mt-2 text-gray-600">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your history
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative w-full md:w-64"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaTimes className="text-gray-400 hover:text-gray-500" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* Book grid with animations */}
        <AnimatePresence>
          {filteredBooks.length > 0 ? (
            <>
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
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="relative flex-grow">
                      <motion.img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.button
                        onClick={() => toggleSaveBook(book.id)}
                        className={`absolute top-2 right-2 p-2 rounded-full ${book.saved ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-sm hover:bg-red-100 transition-colors`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {book.saved ? <FaHeart className="fill-current" /> : <FaRegHeart />}
                      </motion.button>
                      {!book.available && (
                        <motion.div 
                          className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                          initial={{ x: -20 }}
                          animate={{ x: 0 }}
                        >
                          Currently Unavailable
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1" />
                          <span>{book.lastViewed}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 font-bold mr-1">★</span>
                          <span>{book.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <Link
                          to={`/books/${book.id}`}
                          className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                        >
                          <FaBook className="mr-1" /> Details
                        </Link>
                        <motion.button
                          disabled={!book.available}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${book.available ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                          whileHover={book.available ? { scale: 1.05 } : {}}
                          whileTap={book.available ? { scale: 0.95 } : {}}
                        >
                          {book.available ? 'Rent Now' : 'Unavailable'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Clear History Button */}
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  onClick={clearHistory}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All History
                </motion.button>
              </motion.div>
            </>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow p-8 text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaBook className="mx-auto text-5xl text-gray-300 mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {searchTerm ? 'No matching books found' : 'No Recently Viewed Books'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? 'Try a different search term'
                  : 'Your recently viewed books will appear here. Start browsing our collection!'}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/books"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Browse Books
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentlyViewedBooks;