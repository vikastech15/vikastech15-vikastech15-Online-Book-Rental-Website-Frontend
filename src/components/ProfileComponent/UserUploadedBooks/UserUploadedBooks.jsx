import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const UserUploadedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/browse");
        const data = await response.json();
        setBooks(data.map((book) => ({ ...book, expanded: false })));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getBookType = (book) => {
    if (book.forRent && book.forSale) return "Both";
    if (book.forRent) return "Rental";
    if (book.forSale) return "Sale";
    return "None";
  };

  const getAvailability = (book) => {
    // You can implement your own availability logic here
    return "In Stock";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Uploaded Books
            </h1>
            <p className="mt-2 text-gray-600">
              {books.length} {books.length === 1 ? "book" : "books"} uploaded
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-red-100 text-red-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-red-100 text-red-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {books.map((book) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        book.images[0].url.startsWith("http")
                          ? book.images[0].url
                          : `http://localhost:5000/${book.images[0].url}`
                      }
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 text-red-900 px-2 py-1 rounded-full text-xs font-semibold">
                      {getBookType(book)}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-800 mb-2">{book.author}</p>
                    <p className="text-xs text-gray-500 mb-3">
                      {book.genre.join(", ")} • {book.condition}
                    </p>

                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-700">
                          {book.pages} pages
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-gray-900">
                            ₹{book.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {/* <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
                            book.forSale || book.forRent
                              ? "bg-red-800 text-white hover:bg-red-900"
                              : "bg-gray-200 text-gray-800 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingCartIcon className="w-4 h-4 mr-1" />
                          {getBookType(book)}
                        </motion.button> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {books.map((book) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={`http://localhost:3000/${book.images[0]?.url}`}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 md:w-3/4 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-900 mb-1">
                            {book.title}
                          </h3>
                          <p className="text-gray-900 mb-2">{book.author}</p>
                          <p className="text-sm text-gray-800 mb-3">
                            {book.genre.join(", ")} • {book.condition} •{" "}
                            {book.pages} pages
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {book.description}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{book.price}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            {getBookType(book)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                            book.forSale || book.forRent
                              ? "bg-red-800 text-white hover:bg-red-900"
                              : "bg-gray-200 text-gray-800 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingCartIcon className="w-4 h-4 mr-1" />
                          {getBookType(book)}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <BookOpenIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No books uploaded yet
            </h3>
            <p className="text-gray-800 text-center max-w-md">
              Upload your first book to get started
            </p>
            <button className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors">
              Upload Book
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserUploadedBooks;
