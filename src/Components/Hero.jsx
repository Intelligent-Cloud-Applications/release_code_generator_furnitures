import { useState, useEffect } from "react";
import bg1 from "../assets/background1.jpg";
import bg2 from "../assets/red.jpg";
import bg3 from "../assets/download.jpg";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      image: bg1,
      title: "Luxury Marble",
      subtitle: "Collection",
      description: "Timeless elegance for your space",
    },
    {
      image: bg2,
      title: "Premium",
      subtitle: "Quality",
      description: "Crafted with excellence",
    },
    {
      image: bg3,
      title: "Artistic",
      subtitle: "Design",
      description: "Where beauty meets functionality",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((current) =>
          current === slides.length - 1 ? 0 : current + 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  return (
    <div
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === activeIndex
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

            {/* Content */}
            <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-2xl">
                <h1 className="text-white">
                  <span className="block text-4xl md:text-6xl font-bold mb-2 transition-all duration-700 delay-200">
                    {slide.title}
                  </span>
                  <span className="block text-3xl md:text-5xl font-light text-gray-300 mb-6 transition-all duration-700 delay-300">
                    {slide.subtitle}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 transition-all duration-700 delay-400">
                  {slide.description}
                </p>

                <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all duration-300 hover:text-white">
                  <span className="relative z-10">Explore Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={() =>
          setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
