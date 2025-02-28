//import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Our Collections', href: '#' },
    { name: 'Custom Projects', href: '#' },
    { name: 'Installation Services', href: '#' },
    { name: 'Maintenance Guide', href: '#' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      Icon: Facebook,
      hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2]'
    },
    {
      name: 'Instagram',
      href: '#',
      Icon: Instagram,
      hoverClass: 'hover:bg-gradient-to-r hover:from-[#405DE6] hover:via-[#E1306C] hover:to-[#FFDC80] hover:border-[#E1306C]'
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Quick Links Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              Contact
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>Jaganju Marble & Granite </p>
              <p>Deals in : Granite ,Marble , Slabs ,Kadappa</p>
              <p>Location - Near Satsang Mandir , Junagard Road</p>
              <p>Tel: 9437283071</p>

            </div>
          </div>

          {/* Social Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              Connect With Us
            </h3>
            <p className="text-gray-600 mb-4">
              Follow us on social media for updates and inspiration.
            </p>
            <div className="flex justify-center space-x-4">
              {socialLinks.map(({ name, href, Icon, hoverClass }) => (
                <a
                  key={name}
                  href={href}
                  className={`w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 ${hoverClass}`}
                  aria-label={name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Marble Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;