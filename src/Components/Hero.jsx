import { useState, useEffect } from "react";
import { useData } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";
import bg1 from "../assets/background1.jpg";
import bg2 from "../assets/red.jpg";
import bg3 from "../assets/download.jpg";

const Hero = () => {
  const { data, loading, error } = useData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imageMap = {
    bg1,
    bg2,
    bg3
  };

  useEffect(() => {
    if (!isHovered && !loading && !error) {
      const interval = setInterval(() => {
        setActiveIndex((current) =>
          current === data.hero.slides.length - 1 ? 0 : current + 1
        );
      }, data.hero.settings.slideInterval);

      return () => clearInterval(interval);
    }
  }, [isHovered, data?.hero?.slides?.length, data?.hero?.settings?.slideInterval, loading, error]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Unable to load content</h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { hero } = data;

  return (
    <div
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          {hero.slides.map((slide, index) => (
            index === activeIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageMap[slide.image]})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-700/30" />

                {/* Centered Content */}
                <div className="relative h-full flex justify-center items-center px-8 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="max-w-2xl"
                  >
                    <h1 className="text-gray-200">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="block text-4xl md:text-6xl font-bold mb-2"
                      >
                        {slide.title}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="block text-3xl md:text-5xl font-light text-gray-400 mb-6"
                      >
                        {slide.subtitle}
                      </motion.span>
                    </h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="text-lg md:text-xl text-gray-400 mb-8"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Explore Now Button */}
                    <motion.a
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={hero.button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-8 py-4 rounded-full font-semibold text-gray-900 tracking-wide overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300 shadow-md border border-gray-300 transition-all duration-500 ease-in-out hover:shadow-lg hover:border-gray-400"
                    >
                      <span className="relative z-10">{hero.button.text}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {hero.slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-gray-300 w-8" : "bg-gray-400 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          setActiveIndex(activeIndex === 0 ? hero.slides.length - 1 : activeIndex - 1)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-gray-300 shadow-md text-gray-900 hover:bg-white/30 transition-all duration-300 ease-in-out"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          setActiveIndex(activeIndex === hero.slides.length - 1 ? 0 : activeIndex + 1)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-gray-300 shadow-md text-gray-900 hover:bg-white/30 transition-all duration-300 ease-in-out"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Hero;
