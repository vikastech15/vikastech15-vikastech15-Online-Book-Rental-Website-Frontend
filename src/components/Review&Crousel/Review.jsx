import React from "react";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const [expandedReview, setExpandedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleExpand = (idx) => {
    setExpandedReview(expandedReview === idx ? null : idx);
  };

  const [reviews, setReviews] = useState([
    {
      username: "Alice",
      date: "09.11.2025",
      rating: 5,
      comment:
        "I recently had the opportunity to use this product, and I must say I was quite impressed with its overall performance. The build quality feels premium, and it functions exactly as advertised. One of the standout features for me was the intuitive user interface, which made it incredibly easy to set up and start using right away. Additionally, the customer support team was very responsive and helpful when I had a minor question. I would definitely recommend this to anyone looking for a reliable solution in this category.",
    },
    {
      username: "Bob",
      date: "08.11.2025",
      rating: 4,
      comment: "Very insightful and well-written. The content was engaging and provided great value for readers interested in this topic.",
    },
    {
      username: "Charlie",
      date: "07.11.2025",
      rating: 3,
      comment: "It was okay, but I expected more depth in some sections. Overall decent read.",
    },
    {
      username: "Diana",
      date: "06.11.2025",
      rating: 5,
      comment: "Absolutely loved it! The author's perspective was refreshing and the examples were very relevant.",
    },
  ]);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Individual User Reviews */}
          <div className="w-full lg:w-8/12 space-y-4">
            <h2 className="text-2xl font-light text-gray-800 mb-4 pb-2 border-b border-gray-200 transition-all duration-500 delay-100">
              User Reviews
            </h2>

            <div className="flex flex-col gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((review, idx) => {
                  const isExpanded = expandedReview === idx;
                  return (
                    <div
                      key={idx}
                      className={`p-4 bg-white border border-gray-200 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-md ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex gap-4">
                        {/* User Profile */}
                        <div className="w-12 h-12 bg-red-600 rounded-full text-lg flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 hover:scale-110">
                          {review.username?.[0] || "R"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800 text-base">
                                {review.username}
                              </h3>
                              <p className="font-light text-gray-400 text-xs">
                                {review.date}
                              </p>
                            </div>
                            <div className="text-yellow-500 text-sm whitespace-nowrap">
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>
                          </div>

                          <p
                            className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ${
                              isExpanded ? '' : 'line-clamp-3'
                            }`}
                          >
                            {review.comment}
                          </p>

                          {review.comment.length > 120 && (
                            <button
                              onClick={() => toggleExpand(idx)}
                              className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 w-fit"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Rating Summary */}
          <div className="w-full lg:w-4/12">
            <div className="sticky top-6 space-y-6">
              {/* Average Rating Box */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-md">
                <h3 className="text-lg font-light text-gray-700 mb-3">
                  Average Rating
                </h3>
                <div className="flex items-center justify-center text-4xl font-light text-gray-900 mb-2">
                  {averageRating}
                  <span className="ml-1 text-yellow-500 text-3xl">★</span>
                </div>
                <p className="text-xs text-gray-500">
                  based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-500 delay-200 transform hover:scale-105 hover:shadow-md">
                <h3 className="text-lg font-light text-gray-800 mb-4">
                  Rating Distribution
                </h3>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length || 0;
                    const percentage = reviews.length > 0
                      ? Math.round((count / reviews.length) * 100)
                      : 0;

                    return (
                      <div key={star} className="flex items-center gap-3 group">
                        <span className="w-8 text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-red-400">
                          {star}★
                        </span>
                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-600 h-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8 text-right transition-colors duration-200 group-hover:text-red-400">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Review Button */}
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg max-w-md w-full p-6 transform animate-scaleIn">
            <ReviewForm
              onClose={() => setShowModal(false)}
              onSubmit={(newReview) => {
                setReviews([newReview, ...reviews]);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Review;
