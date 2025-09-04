import React from "react";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const toggleExpand = (idx) => {
    setExpandedReview(expandedReview === idx ? null : idx);
  };

  const [reviews, setReviews] = useState([
    // your existing initial reviews here...
  
    {
      username: "Alice",
      date: "09.11.2025",
      rating: 5,
      comment:
        "I recently had the opportunity to use this product, and I must say I was quite impressed with its overall performance. The build quality feels premium, and it functions exactly as advertised. One of the standout features for me was the intuitive user interface, which made it incredibly easy to set up and start using right away. Additionally, the customer support team was very responsive and helpful when I had a minor question. I would definitely recommend this to anyone looking for a reliable solution in this category.",
    },
    {
      username: "Alice",
      date: "09.11.2025",
      rating: 5,
      comment:
        "I recently had the opportunity to use this product, and I must say I was quite impressed with its overall performance. The build quality feels premium, and it functions exactly as advertised. One of the standout features for me was the intuitive user interface, which made it incredibly easy to set up and start using right away. Additionally, the customer support team was very responsive and helpful when I had a minor question. I would definitely recommend this to anyone looking for a reliable solution in this category.",
    },
    {
      username: "Bob",
      date: "09.11.2025",
      rating: 4,
      comment: "Very insightful.",
    },
    {
      username: "Charlie",
      date: "09.11.2025",
      rating: 3,
      comment: "It was okay.",
    },
  ]);

  return (
    <>
      <div className="flex items-start gap-8 m-5 p-5 w-10/12 ">
        {/* Left Side - Individual User Reviews */}
        <div className="w-8/12 space-y-4 p-3 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2  pb-2">
            User Reviews
          </h2>

          <div className="flex flex-col gap-3 ">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, idx) => {
                const isExpanded = expandedReview === idx;
                return (
                  <div
                    key={idx}
                    className="p-4 border flex gap-3 border-gray-200 rounded-lg shadow-sm "
                  >
                    {/* user profile */}
                    <div className="w-20 h-20 bg-blue-500 rounded-full text-2xl flex items-center justify-center text-white flex-shrink-0">
                      {review.username?.[0] || "R"}
                    </div>

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-start w-full mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 text-lg">
                            {review.username}
                          </h3>
                          <p className="font-light text-gray-400 text-sm">
                            {review.date}
                          </p>
                        </div>
                        <div className="text-yellow-500 text-normal whitespace-nowrap pl-3">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>

                      <p
                        className={`text-sm text-gray-700 ${
                          isExpanded ? "" : "line-clamp-2"
                        }`}
                      >
                        {review.comment}
                      </p>

                      {review.comment.length > 100 && (
                        <button
                          onClick={() => toggleExpand(idx)}
                          className="mt-1 text-blue-600 text-sm underline w-fit"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Side - Summary of Total Reviews */}
        <div className="w-4/12">

          {/* Average Rating Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-center shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Average Student Rating
              </h3>
              <div className="flex items-center justify-center text-yellow-500 text-3xl font-bold">
                {reviews && reviews.length > 0
                  ? (
                      reviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "N/A"}
                <span className="ml-1 text-yellow-400">★</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                based on {reviews?.length || 0} reviews
              </p>
            </div>

          <div className="sticky top-50 h-60 p-5  rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 pb-2">
              Overall Rating
            </h2>

            

            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                reviews?.filter((r) => r.rating === star).length || 0;
              const percentage =
                reviews?.length > 0
                  ? Math.round((count / reviews.length) * 100)
                  : 0;

              return (
                <div key={star} className="flex items-center gap-5">
                  <span className="w-10 text-sm font-medium text-gray-700">
                    {star}★
                  </span>
                  <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                    <div
                      className="bg-green-400 h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 border-2 rounded-lg w-full mt-5 h-10 text-white font-semibold">
            Add Review
          </button>
        </div>

        {showModal && (
      <ReviewForm
    onClose={() => setShowModal(false)}
    onSubmit={(newReview) => setReviews([newReview, ...reviews])}
    />
)}

      </div>
    </>
  );
};

export default Review;
