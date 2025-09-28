

import React from "react";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review&Crousel/Review";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";


const ShowBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [book, setBook] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("book");
  const [isLoading, setIsLoading] = useState(true);

  const handleBuyBook = (bookId) => {
    navigate('/checkout', { state: { books: bookId } });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

    const backendUrl = API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${backendUrl}/api/books/${id}`);
        console.log(res.data);
        const Isbn = res.data.isbn;
        setBook(res.data);

        if (res.data.images && res.data.images.length > 0) {
          const firstImage = res.data.images[0].url.startsWith("http")
            ? res.data.images[0].url
            : `${backendUrl}/${res.data.images[0].url}`;
          setSelectedImage(firstImage);
        }
      } catch (error) {
        console.error("Error fetching book data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="w-20 h-6 bg-gray-200 rounded mb-4 mx-auto"></div>
            <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="w-48 h-4 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          {/* Book Detail Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            
            {/* Book Images Section */}
            <div className="w-full lg:w-2/5">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-64 object-contain rounded"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {book.images?.map((img, index) => {
                    const fullImageUrl = img.url.startsWith("http")
                      ? img.url
                      : `${backendUrl}/${img.url}`;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(fullImageUrl)}
                        className={`flex-shrink-0 transition-all duration-200 ${
                          selectedImage === fullImageUrl
                            ? "ring-2 ring-red-400 scale-105"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={fullImageUrl}
                          alt={img.filename}
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Book Details Section */}
            <div className="w-full lg:w-3/5">
              <div className="space-y-4">
                
                {/* Book Title and Author */}
                <div>
                  <h1 className="text-2xl font-light text-gray-900 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-base text-gray-600">
                    by {book.author}
                  </p>
                </div>

            {/* Action Buttons - Equal size buttons */}
<div className="flex flex-col xs:flex-row gap-2">
  <button
    onClick={() => handleBuyBook(book)}
    className="w-38 px-3 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium transition-colors duration-200 text-sm text-center"
  >
    {book.forRent ? "Rent Now" : "Buy Now"}
  </button>

  <button
    onClick={() => handleAddToCart(book)}
    className="w-38 px-3 py-2 bg-white border border-red-300 text-red-400 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-1.5 text-sm"
  >
    <IoCartSharp className="text-sm" />
    Add to Cart
  </button>
</div>



                {/* Tabs Section */}
                <div>
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("book")}
                      className={`px-3 py-2 font-medium transition-colors duration-200 text-sm ${
                        activeTab === "book"
                          ? "text-red-400 border-b-2 border-red-400"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      About Book
                    </button>
                    <button
                      onClick={() => setActiveTab("author")}
                      className={`px-3 py-2 font-medium transition-colors duration-200 text-sm ${
                        activeTab === "author"
                          ? "text-red-400 border-b-2 border-red-400"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      About Author
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="py-4">
                    {activeTab === "book" ? (
                      <div className="space-y-4">
                        {/* Book Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-600">Condition</p>
                            <p className="font-medium text-sm">
                              {book.condition || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Pages</p>
                            <p className="font-medium text-sm">
                              {book.pages || "Not specified"}
                            </p>
                          </div>
                        </div>

                        {/* Genre */}
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Genre</p>
                          <div className="flex flex-wrap gap-1">
                            {book.genre && book.genre.length > 0 ? (
                              book.genre.map((g, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-red-50 text-red-400 rounded-full text-xs"
                                >
                                  {g}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-xs">Not specified</span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Description</p>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {book.description || "No description available."}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">About Author</p>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {book.aboutAuthor || "Author information not available."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="space-y-12">

            {/* Reviews */}
            <div>
              <Review />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBook;
