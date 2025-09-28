
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/features/cart/cartSlice';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import {
  StarIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  ArrowPathIcon,
  FunnelIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const TopOrderPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'


  const dispatch = useDispatch();
  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };
  const navigate = useNavigate();


  const handleBuyBook = (bookId) => {
    navigate('/checkout', { state: { books:bookId } });
  }
  const handleShowBooks = (productId) => {
    navigate(`/showbooks/${productId}`);
  };


  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/browse`);
        const data = await response.json();

        let filteredBooks = [...data];

        if (filter !== "all") {
          if (filter === "rental") {
            filteredBooks = filteredBooks.filter(
              
              (book) => book.forRent ===true
            );
          } else if (filter === "sale") {
            filteredBooks = filteredBooks.filter(
              (book) => book.forSale ===true
            );
          } else {
            filteredBooks = filteredBooks.filter(
              (book) => book.genre[0] === filter
            );
          }
        }

        filteredBooks.sort((a, b) => {
          if (sortBy === "popularity") return b.reviews - a.reviews;
          if (sortBy === "rating") return b.rating - a.rating;
          if (sortBy === "price-low") return a.price - b.price;
          if (sortBy === "price-high") return b.price - a.price;
          return 0;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, [filter, sortBy]);

  const genres = [
     "all",
    "Mystery",
    "Romance",
    "Fiction",
    "Science",
    "Competitive",
    "Fantasy",
    
  ];

  const availabilityOptions = [
    { value: "all", label: "All" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 w-full"
    >
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <p className="text-gray-900 mt-1">
              Rent or buy your next favorite book
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-800" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>

              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === "all"
                      ? "bg-red-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Books
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter("rental")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === "rental"
                      ? "bg-red-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rentals
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter("sale")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === "sale"
                      ? "bg-red-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  For Sale
                </motion.button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            {genres.map(
              (genre) =>
                genre !== "all" && (
                  <motion.button
                    key={genre}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFilter(genre)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      filter === genre
                        ? "bg-red-800 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {genre}
                  </motion.button>
                )
            )}
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  
                >
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => handleShowBooks(book._id)}  >
                    <img
                      src={
                        book.images[0].url.startsWith("http")
                          ? book.images[0].url
                          : `${API_URL}/${book.images[0].url}`
                      }
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 text-red-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <StarIcon className="w-3 h-3 mr-1" />
                      {book.rating}
                    </div>
                    {book.availability === "Low Stock" && (
                      <div className="absolute top-2 right-2 bg-yellow-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                      </div>
                    )}
                    {book.availability === "Out of Stock" && (
                      <div className="absolute top-2 right-2 bg-red-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-800 mb-2">{book.author}</p>

                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        {book.rentalPrice ? (
                          <div className="flex items-center"></div>
                        ) : null}

                        <div className="text-right">
                          <span className="font-bold text-gray-900">
                            {book.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleBuyBook(book)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={book.availability === "Out of Stock"}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
                            book.availability === "Out of Stock"
                              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                              : "bg-red-800 text-white hover:bg-red-900"
                          }`}
                        >
                          <ShoppingCartIcon className="w-4 h-4 mr-1" />
                          {book.forRent ? "Rent" : "Buy"}
                        </motion.button>

                        <motion.button
                        onClick={() => handleAddToCart(book)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          {/* <BookmarkIcon className="w-4 h-4" /> */}
                          <ShoppingCartIcon className="w-4 h-4 mr-1"  />
                        </motion.button>
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
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={
                            book.images[0].url.startsWith("http")
    ? book.images[0].url
    : `/${book.images[0].url}`
                        }
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
                          <div className="flex items-center mb-3">
                            <span className="bg-red-100 text-red-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center mr-2">
                              <StarIcon className="w-3 h-3 mr-1" />
                              {book.rating}
                            </span>
                            <span className="text-sm text-gray-800">
                              {book.genre}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          {book.rentalPrice && (
                            <div className="mb-2">
                              <span className="text-sm text-gray-800">
                                Rent for
                              </span>
                            </div>
                          )}
                          <p className="text-2xl font-bold text-gray-900">
                            {book.price}
                          </p>
                          {book.availability !== "In Stock" && (
                            <p
                              className={`text-xs mt-1 ${
                                book.availability === "Low Stock"
                                  ? "text-yellow-900"
                                  : "text-red-900"
                              }`}
                            >
                              {book.availability}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex space-x-2">
                        <motion.button
                          onClick={() => handleBuyBook(book)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={book.availability === "Out of Stock"}
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                            book.availability === "Out of Stock"
                              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                              : "bg-red-800 text-white hover:bg-red-900"
                          }`}
                        >
                          <ShoppingCartIcon className="w-4 h-4 mr-1" />
                          {book.rentalPrice ? "Rent" : "Buy"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium flex items-center hover:bg-gray-50"
                        >
                          {/* <BookmarkIcon className="w-4 h-4 mr-1" /> */}
                          <ShoppingCartIcon className="w-4 h-4 mr-1" />
                          Save
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
              No books found
            </h3>
            <p className="text-gray-800 text-center max-w-md">
              Try adjusting your filters or check back later for new arrivals
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TopOrderPage;

