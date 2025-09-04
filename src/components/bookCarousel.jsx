
import React, { useState } from "react";
import "./bookCarousel.css";

const BookCarousel = () => {
  const [liked, setLiked] = useState([false, false, false, false]);

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  return (
    <>
      <div>
        <div className="book-div">
          <div className="book-container ">
            <div className="book-itself book1">
              <div className="book-itself-card">
                <button
                  className="like-button"
                  onClick={() => toggleLike(0)}
                >
                  {liked[0] ? "❤️" : "🤍"}
                </button>
                Samantha McCoy’s future was perfectly planned—until a rare disease threatened to erase her memories before it could begin.
              </div>
            </div>
            <div className="book-info">
              <p className="book-name">The Imperfection Of Memory</p>
              <p id="book-rating">Google rating: 9.2 </p>
            </div>
          </div>

          <div className="book-container ">
            <div className="book-itself book2">
              <div className="book-itself-card">
                <button
                  className="like-button"
                  onClick={() => toggleLike(1)}
                >
                  {liked[1] ? "❤️" : "🤍"}
                </button>
                Never-Ending Sky brings to life the struggles and hopes of immigrants in New York’s tenements, told through powerful stories of resilience, dreams, and survival.
              </div>
            </div>
            <div className="book-info">
              <p className="book-name">Never Ending Sky</p>
              <p id="book-rating">Google rating: 8.8</p>
            </div>
          </div>

          <div className="book-container ">
            <div className="book-itself book3">
              <div className="book-itself-card">
                <button
                  className="like-button"
                  onClick={() => toggleLike(2)}
                >
                  {liked[2] ? "❤️" : "🤍"}
                </button>
                Soul is a haunting exploration of love, loss, and identity, as one woman unravels the ties between who she was and who she’s becoming in the wake of heartbreak.
              </div>
            </div>
            <div className="book-info">
              <p className="book-name">Soul</p>
              <p id="book-rating">Google rating: 9 </p>
            </div>
          </div>

          <div className="book-container ">
            <div className="book-itself book4">
              <div className="book-itself-card">
                <button
                  className="like-button"
                  onClick={() => toggleLike(3)}
                >
                  {liked[3] ? "❤️" : "🤍"}
                </button>
                The Key Master follows a boy who discovers a mysterious key that unlocks hidden worlds—each one more dangerous and magical than the last.
              </div>
            </div>
            <div className="book-info">
              <p className="book-name">The Keymasters</p>
              <p id="book-rating">Google rating: 8.9 </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCarousel;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { StarIcon, ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/solid";
// import { useNavigate } from "react-router-dom";

// const BookCarousel = () => {
//   const navigate = useNavigate();
//   const [liked, setLiked] = useState([false, false, false, false, false, false]);

//   const toggleLike = (index) => {
//     const updatedLikes = [...liked];
//     updatedLikes[index] = !updatedLikes[index];
//     setLiked(updatedLikes);
//   };

//   const handleShowBooks = (id) => {
//     navigate(`/showbooks/${id}`);
//   };

//   const handleBuyBook = (book) => {
//     navigate('/checkout', { state: { books: book } });
//   };

//   const books = [
//     {
//       _id: "1",
//       title: "The Imperfection Of Memory",
//       author: "Author Name",
//       rating: 9.2,
//       price: "$14.99",
//       availability: "In Stock",
//       description: "Samantha McCoy's future was perfectly planned—until a rare disease threatened to erase her memories before it could begin.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book1" }]
//     },
//     {
//       _id: "2",
//       title: "Never Ending Sky",
//       author: "Author Name",
//       rating: 8.8,
//       price: "$12.99",
//       availability: "In Stock",
//       description: "Never-Ending Sky brings to life the struggles and hopes of immigrants in New York's tenements.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book2" }]
//     },
//     {
//       _id: "3",
//       title: "Soul",
//       author: "Author Name",
//       rating: 9.0,
//       price: "$15.99",
//       availability: "Low Stock",
//       description: "Soul is a haunting exploration of love, loss, and identity.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book3" }]
//     },
//     {
//       _id: "4",
//       title: "The Keymasters",
//       author: "Author Name",
//       rating: 8.9,
//       price: "$13.99",
//       availability: "In Stock",
//       description: "The Key Master follows a boy who discovers a mysterious key that unlocks hidden worlds.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book4" }]
//     },
//     {
//       _id: "5",
//       title: "All That Life Can Afford",
//       author: "Author Name",
//       rating: 9.1,
//       price: "$16.99",
//       availability: "In Stock",
//       description: "A tender story of ambition, sacrifice, and self-discovery.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book5" }]
//     },
//     {
//       _id: "6",
//       title: "The Boy with Tiger's Heart",
//       author: "Author Name",
//       rating: 8.7,
//       price: "$11.99",
//       availability: "Out of Stock",
//       description: "The tale of a fearless boy with a wild spirit.",
//       images: [{ url: "https://via.placeholder.com/300x400?text=Book6" }]
//     }
//   ];

//   return (
//     <div className="relative">
//       <div className="flex overflow-x-auto pb-4 space-x-6 px-4 scrollbar-hide">
//         {books.map((book, index) => (
//           <motion.div
//             key={book._id}
//             className="flex-shrink-0 w-64"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
//               <div 
//                 className="relative h-48 overflow-hidden cursor-pointer"
//                 onClick={() => handleShowBooks(book._id)}
//               >
//                 <img
//                   src={book.images[0].url}
//                   alt={book.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-2 left-2 bg-white/90 text-red-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
//                   <StarIcon className="w-3 h-3 mr-1" />
//                   {book.rating}
//                 </div>
//                 {book.availability === "Low Stock" && (
//                   <div className="absolute top-2 right-2 bg-yellow-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                     Low Stock
//                   </div>
//                 )}
//                 {book.availability === "Out of Stock" && (
//                   <div className="absolute top-2 right-2 bg-red-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                     Out of Stock
//                   </div>
//                 )}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleLike(index);
//                   }}
//                   className="absolute top-2 right-10 p-1 rounded-full bg-white/90"
//                 >
//                   <HeartIcon className={`w-5 h-5 ${liked[index] ? "text-red-500 fill-current" : "text-gray-400"}`} />
//                 </button>
//               </div>

//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 
//                   className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 cursor-pointer"
//                   // onClick={() => handleShowBooks(book._id)}
//                 >
//                   {book.title}
//                 </h3>
//                 <p className="text-sm text-gray-800 mb-2">{book.author}</p>
//                 <p className="text-xs text-gray-600 mb-3 line-clamp-2">{book.description}</p>

//                 <div className="mt-auto">
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="text-right">
//                       <span className="font-bold text-gray-900">
//                         {book.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* <div className="flex space-x-2"> */}
//                     {/* <motion.button
//                       onClick={() => handleBuyBook(book)}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       disabled={book.availability === "Out of Stock"}
//                       className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${
//                         book.availability === "Out of Stock"
//                           ? "bg-gray-200 text-gray-800 cursor-not-allowed"
//                           : "bg-red-800 text-white hover:bg-red-900"
//                       }`}
//                     >
//                       <ShoppingCartIcon className="w-4 h-4 mr-1" />
//                       Buy
//                     </motion.button> */}
//                   {/* </div> */}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <button 
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//         onClick={() => navigate("/browse")}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default BookCarousel;