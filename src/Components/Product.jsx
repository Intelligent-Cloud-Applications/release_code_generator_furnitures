// Import images from assets
import BeigeImage from '../assets/beige.jpg';
import RedImage from '../assets/red.jpg';
import DownloadImage from '../assets/download.jpg';
import WhiteImage from '../assets/white.jpg';
import BlackImage from '../assets/blackmarble.jpg';

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: 'Calacatta Gold Marble',
      price: 249.99,
      rating: 4.8,
      reviews: 124,
      origin: 'Italy',
      description: 'Luxurious white marble with distinctive gold veining',
      imageUrl: BeigeImage,
      type: 'Premium'
    },
    {
      id: 2,
      name: 'Statuario Marble',
      price: 199.99,
      rating: 4.9,
      reviews: 89,
      origin: 'Italy',
      description: 'Classic white marble with elegant gray streaks',
      imageUrl: RedImage,
      type: 'Premium'
    },
    {
      id: 3,
      name: 'Emperador Dark',
      price: 179.99,
      rating: 4.7,
      reviews: 156,
      origin: 'Spain',
      description: 'Rich brown marble with fine veining patterns',
      imageUrl: DownloadImage,
      type: 'Classic'
    },
    {
      id: 4,
      name: 'Nero Marquina',
      price: 189.99,
      rating: 4.6,
      reviews: 92,
      origin: 'Spain',
      description: 'Striking black marble with white veining',
      imageUrl: BlackImage,
      type: 'Premium'
    },
    {
      id: 5,
      name: 'Carrara White',
      price: 159.99,
      rating: 4.8,
      reviews: 178,
      origin: 'Italy',
      description: 'Timeless white marble with soft gray veining',
      imageUrl: WhiteImage,
      type: 'Classic'
    },
    {
      id: 6,
      name: 'Portoro Gold',
      price: 299.99,
      rating: 4.9,
      reviews: 67,
      origin: 'Italy',
      description: 'Dramatic black marble with golden veining',
      imageUrl: BlackImage,
      type: 'Luxury'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mt-13">
  Luxury Marble Collection
</h1>

        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                  ${product.price}
                </span>
                <span className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Origin: {product.origin}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
