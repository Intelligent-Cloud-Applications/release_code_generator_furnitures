//import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';

const ProductSection = () => {
  const { data, loading, error } = useData();
  
  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skeleton for title */}
          <div className="text-center mb-12">
            <motion.div 
              className="h-8 w-64 mx-auto bg-gray-200 rounded-lg mb-3"
              animate={{ 
                opacity: [0.6, 0.8, 0.6],
                transition: {
                  repeat: Infinity,
                  duration: 1.5
                }
              }}
            />
            <motion.div 
              className="h-4 w-96 mx-auto bg-gray-200 rounded-lg"
              animate={{ 
                opacity: [0.6, 0.8, 0.6],
                transition: {
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.2
                }
              }}
            />
          </div>

          {/* Skeleton for product cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image skeleton */}
                <div className="relative h-64">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                    animate={{ 
                      opacity: [0.6, 0.8, 0.6],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5
                      }
                    }}
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
                </div>

                {/* Content skeleton */}
                <div className="p-6">
                  <motion.div 
                    className="h-6 w-32 bg-gray-200 rounded-lg mb-4"
                    animate={{ 
                      opacity: [0.6, 0.8, 0.6],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0.3
                      }
                    }}
                  />
                  <motion.div 
                    className="h-4 w-full bg-gray-200 rounded-lg mb-2"
                    animate={{ 
                      opacity: [0.6, 0.8, 0.6],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0.4
                      }
                    }}
                  />
                  <motion.div 
                    className="h-4 w-3/4 bg-gray-200 rounded-lg"
                    animate={{ 
                      opacity: [0.6, 0.8, 0.6],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0.5
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // The context will handle navigation to error page
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gray-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-semibold text-gray-900">
            {data.products.hero.title}
          </h2>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            {data.products.hero.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.products.categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={category.link} className="block">
                <motion.div 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image Container */}
                  <div className="relative">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={category.image}
                      alt={`${category.name} collection`}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60"; // Fallback image
                      }}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
                    >
                      <motion.h3 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-white p-6"
                      >
                        {category.name}
                      </motion.h3>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600 mb-4"
                    >
                      {category.description}
                    </motion.p>

                    {/* Action Button */}
                    <motion.div 
                      className="inline-flex items-center font-medium text-gray-900 group"
                      whileHover={{ x: 5 }}
                    >
                      Explore Collection
                      <motion.svg
                        className="ml-2 w-5 h-5"
                        initial={{ x: 0 }}
                        animate={{ x: 3 }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 1
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSection;