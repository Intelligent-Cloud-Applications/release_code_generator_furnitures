//import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useData } from '../context/context';
import { motion } from 'framer-motion';

const Footer = () => {
  const { data, loading, error } = useData();
  
  if (loading || error) {
    return null; // Footer should silently wait for data or handle errors gracefully
  }

  const { footer } = data;
  
  const iconComponents = {
    Facebook: Facebook,
    Instagram: Instagram
  };

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
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              {footer.quickLinks.title}
            </h3>
            <ul className="space-y-3">
              {footer.quickLinks.items.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    tabIndex={0}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              {footer.contact.title}
            </h3>
            <motion.div 
              variants={itemVariants}
              className="space-y-3 text-gray-600"
            >
              <p>{footer.contact.companyName}</p>
              <p>{footer.contact.description}</p>
              <p>{footer.contact.location}</p>
              <p>Tel: {footer.contact.phone}</p>
            </motion.div>
          </motion.div>

          {/* Social Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              {footer.social.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {footer.social.description}
            </p>
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              {footer.social.links.map(({ name, href, icon, hoverClass }) => {
                const Icon = iconComponents[icon];
                return (
                  <motion.a
                    key={name}
                    href={href}
                    className={`w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 ${hoverClass}`}
                    aria-label={name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={0}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {footer.copyright.text}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;