import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/context";

const NavbarSkeleton = () => {
  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-screen-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-6 lg:px-12">
            {/* Logo Skeleton */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Navigation Items Skeleton */}
            <div className="hidden lg:flex items-center space-x-10">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>

            {/* Mobile Menu Button Skeleton */}
            <div className="lg:hidden">
              <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useData();

  if (loading) {
    return <NavbarSkeleton />;
  }

  const { logo, navigation } = data || {};

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-screen-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between h-16 px-6 lg:px-12">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className={`w-10 h-10 bg-gradient-to-r ${logo?.gradient?.from} ${logo?.gradient?.to} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">{logo?.firstLetter}</span>
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r ${logo?.gradient?.from} ${logo?.gradient?.to} bg-clip-text text-transparent`}>
                {logo?.text}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              {navigation?.items?.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group relative px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="relative z-10 flex items-center space-x-2 text-lg font-medium">
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
              className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <div className="w-7 h-7 flex flex-col justify-center space-y-2">
                <span
                  className={`block h-0.5 w-7 bg-gray-700 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-7 bg-gray-700 transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-7 bg-gray-700 transform transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-6 py-4 space-y-2 bg-gray-50">
              {navigation?.items?.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block text-lg px-5 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
