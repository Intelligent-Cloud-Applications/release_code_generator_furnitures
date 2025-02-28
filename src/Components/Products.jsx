//import React from 'react';
import { Link } from 'react-router-dom';
import BeigeImage from '../assets/beige.jpg';
import GrayImage from '../assets/blackmarble.jpg';
import CeramicImage from '../assets/red.jpg';

const ProductSection = () => {
  // Product category data
  const categories = [
    {
      id: 1,
      name: 'Marble',
      description: 'Discover our exquisite selection of premium marble slabs and tiles, sourced from the finest quarries around the world.',
      imageUrl: BeigeImage,
      link: '/Product'
    },
    {
      id: 2,
      name: 'Granite',
      description: 'Explore our extensive selection of durable, natural granite stone for countertops, flooring, and outdoor applications.',
      imageUrl: GrayImage,
      link: '/granite'
    },
    {
      id: 3,
      name: 'Tile',
      description: 'Browse our curated selection of ceramic, porcelain, and natural stone tiles for floors, walls, and decorative accents.',
      imageUrl: CeramicImage,
      link: '/tile'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">Our Product Collections</h2>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our premium natural stone and tile collections for your home or commercial projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="block">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                {/* Image Container */}
                <div className="relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-2xl font-bold text-white p-6">{category.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>

                  {/* Action Button */}
                  <div className="inline-flex items-center font-medium text-gray-900 group">
                    Explore Collection
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;