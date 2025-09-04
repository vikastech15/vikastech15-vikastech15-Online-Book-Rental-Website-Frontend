import React from "react";

function BookCard({ title, author, price, img }) {
  return (
    <div className="text-sm">
      <img src={img} alt={title} className="w-full h-64 object-cover mb-2" />
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600">{author}</p>
      <p className="font-semibold mt-1">{price} ₽</p>
    </div>
  );
}

export default BookCard;
