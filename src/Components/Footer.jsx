//import React from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Our Collections', href: '#' },
    { name: 'Custom Projects', href: '#' },
    { name: 'Installation Services', href: '#' },
    { name: 'Maintenance Guide', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              About Us
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Crafting excellence in marble since 1995. We pride ourselves on delivering the finest quality marble products and exceptional craftsmanship.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
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
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              Contact
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>123 Marble Avenue</p>
              <p>New York, NY 10001</p>
              <p>Tel: (555) 123-4567</p>
              <p>Email: info@marblecompany.com</p>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-0.5 after:bg-gray-400">
              Connect With Us
            </h3>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest projects and exclusive offers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon.charAt(0).toUpperCase()}</span>
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