import { useState } from 'react';
import { useData } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';

const TilePage = () => {
  const { data, loading, error } = useData();
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (productId) => {
    setLoadedImages(prev => ({ ...prev, [productId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We're having trouble loading the products.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { product2 } = data;

  const toggleDetails = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        {/* Heading with elegant typography */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 text-center mt-16 mb-2 tracking-wide">
            {product2.hero.title}
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto font-light">
            {product2.hero.subtitle}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {product2.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              style={{ perspective: '1000px' }}
            >
              {/* Card container with flip animation */}
              <motion.div
                animate={{
                  rotateY: expandedProductId === product.id ? 180 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="relative w-full h-full flex-grow flex flex-col"
                style={{
                  transformStyle: 'preserve-3d',
                  minHeight: '500px',
                }}
              >
                {/* Front side */}
                <div
                  className="absolute w-full h-full backface-hidden flex flex-col rounded-xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Image Container */}
                  <div className="h-56 sm:h-64 overflow-hidden relative">
                    {/* Skeleton Loader */}
                    <AnimatePresence>
                      {!loadedImages[product.id] && (
                        <motion.div
                          initial={{ opacity: 0.6 }}
                          animate={{ 
                            opacity: [0.6, 0.8, 0.6],
                            transition: {
                              repeat: Infinity,
                              duration: 1.5
                            }
                          }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg 
                              className="w-10 h-10 text-gray-400 animate-spin" 
                              viewBox="0 0 24 24"
                            >
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                                fill="none"
                              />
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actual Image */}
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: loadedImages[product.id] ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={() => handleImageLoad(product.id)}
                    />
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {product.type}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    {/* Title and Origin */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">
                        Origin: {product.origin}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ₹{
                              index < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-xs sm:text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Description with fixed height for consistency */}
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="bg-gray-100 rounded-lg p-3 mb-4 flex justify-center items-center">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">per sq ft</span>
                    </div>

                    {/* View Details Button - Fixed position at bottom */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 mt-auto text-sm sm:text-base font-medium"
                      onClick={() => toggleDetails(product.id)}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>

                {/* Back side */}
                <div
                  className="absolute w-full h-full backface-hidden overflow-hidden rounded-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Aesthetic black background with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900"></div>

                  {/* Subtle marble texture overlay with low opacity */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                      backgroundImage: `url(${product.image})`
                    }}
                  ></div>

                  {/* Details content with elegant typography */}
                  <div className="relative text-white p-5 sm:p-7 h-full flex flex-col">
                    {/* Elegant header with subtle border */}
                    <div className="mb-6 pb-4 border-b border-gray-700 border-opacity-50">
                      <h3 className="text-xl sm:text-2xl font-light tracking-wider mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300 text-xs sm:text-sm font-light tracking-wide">
                          <span className="mr-2">{product.origin}</span>•
                          <span className="mx-2">{product.type}</span>•
                          <span className="ml-2 text-yellow-400">{product.rating} ★</span>
                        </p>
                        <div className="bg-black bg-opacity-40 px-4 py-2 rounded-lg">
                          <span className="text-lg sm:text-xl font-light tracking-wider text-white">₹{product.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Product details with elegant styling and enhanced scrollbar */}
                    <div className="space-y-5 flex-grow overflow-y-auto pr-1 custom-scrollbar scroll-reveal">
                      {/* Specifications section */}
                      <div className="mb-5">
                        <h4 className="font-light text-base sm:text-lg tracking-wider border-l-2 border-gray-500 pl-3 mb-4">
                          Product Specifications
                        </h4>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Durability</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.durability}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Expected Lifetime</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.lifetime}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Applications</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.applications}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Maintenance</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.maintenance}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Availability</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back to Product Button - Updated with aesthetic color */}
                    <div className="mt-5">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-light tracking-wider py-2 sm:py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base hover:from-white hover:to-white"
                        onClick={() => toggleDetails(product.id)}
                      >
                        Back to Product
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>
        {`
          /* Custom Scrollbar for Product Cards */
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* Add the scroll reveal animation */
          .scroll-reveal {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default TilePage;