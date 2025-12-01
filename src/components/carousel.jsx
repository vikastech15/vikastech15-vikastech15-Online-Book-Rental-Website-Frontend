

// Carousel.js
import React, { useEffect, useState } from "react";
import Slides from "./carouselDiv";
import "./carousel.css";

const Carousel = () => {
  const slides = Slides();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide">{slides[current]}</div>

      <button className="nav left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
