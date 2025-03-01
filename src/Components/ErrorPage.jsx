import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state || {
    message: 'An unexpected error occurred',
    code: 500
  };

  const handleTryAgain = () => {
    // If we have a previous location, go back there
    if (location.key !== "default") {
      navigate(-1); // Go back to the previous page
    } else {
      // If no previous location, go to home
      navigate('/');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-red-600 mb-4"
          >
            Error {error.code}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mb-8"
          >
            {error.message}
          </motion.p>
          {error.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-500 mb-8"
            >
              Details: {error.error}
            </motion.p>
          )}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Go Home
            </button>
            <button
              onClick={handleTryAgain}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Try Again
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorPage; 