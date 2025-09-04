
import React from "react";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review&Crousel/Review";
import BookCarousel from "../components/Review&Crousel/BookCarousel";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const ShowBook = () => {
  const navigate = useNavigate()

  const handleBuyBook = (bookId) => {
    navigate('/checkout', { state: { books:bookId } });
  }
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  // Image paths stored in the 'public/images/' folder
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // Default: First image

  const [activeTab, setActiveTab] = useState("book"); // "book" or "author"

  const backendUrl = API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
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
      }
    };
    fetchBook();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className=" h-full w-full flex flex-col overflow-x-hidden "
      style={{
        background: "#F3F0ED",
      }}>

        {/* book detail and author detail as well as image of book */}
      <div className=" h-auto  flex justify-center ">
        <div className=" flex gap-8 m-5 p-5 w-10/12 mt-10 border-gray-300 border-b-2 pb-15">
          {/* This consists of the details related to books */}
          <div className="w-6/12 h-auto p-5 overflow-y-auto">
            {/* Book Title and Author */}
            <div>
              <h1 className="font-serif text-4xl font-medium">{book.title}</h1>
              <h3 className="text-md mt-1 font-semibold text-gray-700">
                {book.author}
              </h3>
            </div>

            {/* Tabs Section (About Book / About Author) */}
            <div className="flex gap-6 mt-6 border-b border-gray-300 text-blue-700 font-medium">
              <button
                onClick={() => setActiveTab("book")}
                className={`pb-2 ${
                  activeTab === "book" ? "border-b-2 border-blue-700" : ""
                }`}
              >
                About The Book
              </button>
              <button
                onClick={() => setActiveTab("author")}
                className={`pb-2 ${
                  activeTab === "author" ? "border-b-2 border-blue-700" : ""
                }`}
              >
                About The Author
              </button>
            </div>

            {/* Genre and Pages */}
            {activeTab === "book" ? (
              <div className="flex flex-col gap-3 mt-4">
                <div>
                  <p>
                    <span className="font-semibold">Condition:</span>{" "}
                    {book.condition ? book.condition : "Detail not available"}
                  </p>
                </div>

                

                {/* Genre */}
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="font-semibold">Genre:</p>
                  {book.genre && book.genre.length > 0 ? (
                    book.genre.map((g, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Detail not available</span>
                  )}
                </div>

                {/* Pages */}
                <div>
                  <p>
                    <span className="font-semibold">Pages:</span>{" "}
                    {book.pages ? book.pages : "Detail not available"}
                  </p>
                </div>
              </div>
            ): (
              <div className="flex flex-col gap-3 mt-4">
                  {/* Author */}
                <div>
                  <p>
                    <span className="font-semibold">Author:</span>{" "}
                    {book.author ? book.author : "Detail not available"}
                  </p>
                </div>
              </div>

            )
          }

            {/* Conditional Content */}
            <div className="mt-4">
              {activeTab === "book" ? (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    About the Book
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    {book.description || "No description available."}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    About the Author
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    {book.aboutAuthor || "Author information not available."}
                  </p>
                </div>
              )}
            </div>

            {/* Rent or Buy Button */}
            <div className="mt-6 flex gap-4">
              <button
               onClick={() => handleBuyBook(book)}
                className={`w-full border-2 px-4 py-2 rounded-2xl transition duration-200 ${
                  book.forRent
                    ? "border-blue-700 hover:bg-blue-700 hover:text-white"
                    : "border-green-700 hover:bg-green-700 hover:text-white"
                }`}
              >
                {book.forRent ? "Rent" : "Buy"}
              </button>

              {/*cart button  */}

              <button
              onClick={() => handleAddToCart(book)}
               >
              <span><IoCartSharp className="text-2xl text-yellow-400"/>  </span> 
              </button>
            </div>
          </div>

          {/* This is an image section */}
          <div className="flex gap-12 w-6/12 h-auto p-5 self-start">
            <div
              className=" h-125 w-3/5 py-3 flex justify-center items-center "
              style={{
                background: "#E9D9DA",
              }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-7/8 h-6/8 object-contain rounded-lg "
                />
              )}
            </div>

            {/* Thumbnail Section */}
            <div className="flex flex-col gap-5 space-x-3  ">
              {book.images?.map((img, index) => {
                const fullImageUrl = img.url.startsWith("http")
                  ? img.url
                  : `${backendUrl}/${img.url}`;
                return (
                  <img
                    key={index}
                    src={fullImageUrl}
                    alt={img.filename}
                    className={`w-27 h-27 border-2  cursor-pointer transition-transform transform ${
                      selectedImage === fullImageUrl
                        ? "border-red-100 scale-110"
                        : "border-none"
                    }`}
                    onClick={() => setSelectedImage(fullImageUrl)} // Click to update big preview
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-full  flex justify-center">
      <BookCarousel />
      </div>

       <div className=" h-full  flex justify-center">
         <Review />
         </div>
      </div>
    </>
  );
};

export default ShowBook;

