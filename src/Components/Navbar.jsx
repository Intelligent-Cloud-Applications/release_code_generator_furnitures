import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/Products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                JaganJu
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group relative px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="relative z-10 flex items-center space-x-2 text-sm font-medium">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5 relative">
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transform transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-4 py-2 space-y-1 bg-gray-50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-white rounded-lg transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
