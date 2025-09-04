import React, { useState } from "react";


const ReviewForm = ({ onClose, onSubmit }) => {

    const [username, setUsername] = useState("");
    const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      username,
      rating: parseInt(rating),
      comment,
      date: new Date().toLocaleDateString("en-GB"), // e.g., 09.11.2025
    };

    onSubmit(newReview);
    onClose(); // close the modal
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-prose shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Add a Review for Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="flex items-center space-x-1">
            <label htmlFor="" className="mr-2 text-base font-medium">Rating :</label>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-3xl ${
            rating >= star ? "text-yellow-400" : "text-gray-300"
          } focus:outline-none`}
        >
          ★
        </button>
      ))}
    </div>

         <label htmlFor="" className="mr-2 text-base font-medium">Feedback</label>
          <textarea
            placeholder="Enter your Feedback"
            className="w-full outline-none border border-gray-300 rounded px-3 py-2"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
