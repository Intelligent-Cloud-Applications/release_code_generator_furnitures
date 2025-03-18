import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { API } from 'aws-amplify';
import { useData } from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const LoadingSpinner = () => (
  <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-gray-600 font-medium"
    >
      Loading contact information...
    </motion.p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100"
  >
    <div className="text-center px-4">
      <motion.h2 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-bold text-red-600 mb-4"
      >
        Something went wrong
      </motion.h2>
      <motion.p 
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className="text-gray-600 mb-6"
      >
        Unable to load contact information. Please check your connection and try again.
      </motion.p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Try Again
      </motion.button>
    </div>
  </motion.div>
);

const Contact = () => {
  const { data, loading, error } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (data && data.contact) {
      setIsDataReady(true);
    }
  }, [data]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading || !isDataReady) {
    return <LoadingSpinner />;
  }

  if (error || !data?.contact) {
    return <ErrorState onRetry={handleRetry} />;
  }

  const { contact } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !subject || !message) {
      return toast.error("All fields are required");
    }

    setIsSubmitting(true);

    try {
      const response = await API.put('main', `/any/create-query/${data.InstitutionId}`, {
        body: {
          fullName: name,
          emailId: email,
          subject: subject,
          message: message,
          userType: "member",
          adminEmail: contact.info.email,
          isPaymentRedirect: false
        }
      });

      if (response && !response.error) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        const errorMessage = response?.error?.message || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-16">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="px-6 py-8">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-center text-gray-800 mb-8"
          >
            {contact.hero.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 mb-8"
          >
            {contact.hero.subtitle}
          </motion.p>

          <motion.form 
            variants={formVariants}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={contact.form.namePlaceholder}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={contact.form.emailPlaceholder}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="subject"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={contact.form.subjectPlaceholder}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <textarea
                name="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={contact.form.messagePlaceholder}
                required
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? contact.form.loadingText : contact.form.submitButton}
            </motion.button>
          </motion.form>

          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600"
          >
            <p className="font-medium">Contact Information</p>
            <motion.p 
              variants={itemVariants}
              className="mt-2"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="inline w-5 h-5 mr-2" />
              {contact.info.email}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="mt-1"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="inline w-5 h-5 mr-2" />
              {contact.info.phone}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
