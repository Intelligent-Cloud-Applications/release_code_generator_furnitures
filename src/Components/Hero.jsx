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
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-700/30" />

            {/* Centered Content */}
            <div className="relative h-full flex justify-center items-center px-8 text-center">
              <div className="max-w-2xl">
                <h1 className="text-gray-200">
                  <span className="block text-4xl md:text-6xl font-bold mb-2 transition-all duration-700 delay-200">
                    {slide.title}
                  </span>
                  <span className="block text-3xl md:text-5xl font-light text-gray-400 mb-6 transition-all duration-700 delay-300">
                    {slide.subtitle}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-8 transition-all duration-700 delay-400">
                  {slide.description}
                </p>

                {/* Updated "Explore Now" Button with Google Maps Link */}
                <a
                  href="https://maps.app.goo.gl/Ra79Scimee8tFGGy9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 rounded-full font-semibold text-gray-900 tracking-wide overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300 shadow-md border border-gray-300 transition-all duration-500 ease-in-out hover:shadow-lg hover:border-gray-400"
                >
                  <span className="relative z-10">Explore Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                </a>
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
              activeIndex === index ? "bg-gray-300 w-8" : "bg-gray-400 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Left Navigation Button */}
      <button
        onClick={() =>
          setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-gray-300 shadow-md text-gray-900 hover:bg-white/30 transition-all duration-300 ease-in-out"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={() =>
          setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-gray-300 shadow-md text-gray-900 hover:bg-white/30 transition-all duration-300 ease-in-out"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
