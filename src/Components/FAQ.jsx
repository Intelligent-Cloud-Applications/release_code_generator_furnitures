import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useData } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderAnswer = (answer) => {
    if (typeof answer === 'string') {
      return answer;
    }
    if (answer.type === 'link') {
      return (
        <a
          href={answer.url}
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${answer.text}`}
        >
          {answer.text}
        </a>
      );
    }
    return answer;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
        isOpen ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
        aria-expanded={isOpen}
      >
        <span className="flex-1 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <ChevronUp className="w-6 h-6 text-blue-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.25,
                  ease: "easeInOut"
                }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.25,
                  ease: "easeInOut"
                }
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.1
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                transition: {
                  duration: 0.2,
                  ease: "easeIn"
                }
              }}
              className="px-6 py-4 text-gray-600 bg-gray-50 rounded-b-xl border-t border-gray-200 overflow-hidden"
            >
              <div className="prose max-w-none">{renderAnswer(answer)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { data, loading, error } = useData();

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
          <p className="text-gray-600 mb-4">We're having trouble loading the FAQ content.</p>
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

  const { faq } = data;

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-stone-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            {faq.hero.title}
          </h2>
          <p className="text-lg text-gray-600">
            {faq.hero.subtitle}
          </p>
        </motion.div>

        <div className="space-y-6">
          {faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FAQItem question={item.question} answer={item.answer} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            {faq.contact.text}{' '}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              tabIndex={0}
              aria-label="Contact our team for more questions"
            >
              {faq.contact.linkText}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;