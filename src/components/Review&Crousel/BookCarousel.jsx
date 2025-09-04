import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";



const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SL1500_.jpg",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1500_.jpg",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SL1500_.jpg",
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    image: "https://m.media-amazon.com/images/I/81bpkjY5hHL._SL1500_.jpg",
  },
  {
    title: "Ikigai",
    author: "Héctor García",
    image: "https://m.media-amazon.com/images/I/81l3rZK4lnL._SL1500_.jpg",
  },
];

const BookCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleBooks = books.slice(startIndex, startIndex + 4);

  const next = () => {
    if (startIndex + 4 < books.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 border-gray-300 border-b-2 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold pb-2">Recommended Books</h2>
        <div>
          <button
            onClick={prev}
            className="px-3 py-1 pb-2 h-8 bg-gray-200 rounded-l hover:bg-gray-300"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={next}
            className="px-3 py-1 pb-2 h-8 bg-gray-200 rounded-r hover:bg-gray-300"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 transition-all duration-300">
        {visibleBooks.map((book, index) => (
          <div
            key={index}
            className=" shadow-md overflow-hidden"
            // style={{
            //   background: "#E9D9DA",
            // }}
          >
            {/* Image container */}
            <div className="h-[280px] pt-4 pb-4 flex items-center justify-center " 
            style={{
                background: "#E9D9DA",
              }}>
              <img
                src={book.image}
                alt={book.title}
                style={{
                  background: "#E9D9DA",
                }}
                className="w-full h-full object-contain "
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
