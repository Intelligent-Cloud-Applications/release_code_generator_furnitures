import { useData } from "../context/context";
import { motion } from "framer-motion";

const Card = ({ title, description, icon, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -5 }}
    className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl"
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-600/0 rounded-2xl transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-600/5" 
    />

    <div className="relative">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl"
      >
        {icon}
      </motion.div>

      <motion.h3 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-800 dark:text-white mb-2"
      >
        {title}
      </motion.h3>

      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-300"
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

const Features = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">We're having trouble loading the services.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { services } = data;

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
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {services.hero.title}
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              {" "}{services.hero.highlightedText}
            </motion.span>
          </h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {services.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.features.map((feature) => (
            <Card
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
