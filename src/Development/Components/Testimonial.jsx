import { useData } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialCard = ({ testimonial, index, variants }) => {
  return (
    <motion.div
      variants={variants}
      custom={index}
    >
      <motion.div 
        className="relative group"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          {/* Customer Image */}
          <div className="h-48 sm:h-64 overflow-hidden">
            <motion.img
              src={testimonial?.image || '/default-image.jpg'}
              alt={testimonial?.name || 'Customer'}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Rating */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-1 mb-3"
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`w-4 h-4 ${
                    i < (testimonial?.rating || 0) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>

            {/* Review */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-sm leading-relaxed mb-4"
            >
              "{testimonial?.review || 'No review available'}"
            </motion.p>

            {/* Profile */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial?.profilePic || '/default-profile.jpg'}
                  alt={testimonial?.name || 'Customer'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{testimonial?.name || 'Anonymous'}</h4>
                <p className="text-sm text-gray-500">{testimonial?.role || 'Customer'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-stone-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We're having trouble loading the testimonials.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { testimonials } = data;

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
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {testimonials.hero.title}
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-stone-600 to-blue-600 bg-clip-text text-transparent"
          >
            {" "}{testimonials.hero.highlightedText}
          </motion.span>
        </h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 max-w-xl mx-auto"
        >
          {testimonials.hero.subtitle}
        </motion.p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
        >
          {testimonials.reviews.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>

      {/* Review Stats */}
      <motion.div 
        variants={containerVariants}
        className="mt-16 max-w-7xl mx-auto"
      >
        <div className="flex justify-center gap-4">
          {Object.entries(testimonials.stats).map(([key, stat], index) => (
            <motion.div
              key={key}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-4 bg-white rounded-xl shadow-sm w-40"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-3xl font-bold text-stone-600 text-center"
              >
                {stat.value}
              </motion.div>
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-sm text-gray-500 text-center"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;