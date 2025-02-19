
import { CheckCircle, Gem, Settings, Heart, Clock } from "lucide-react";

const AboutUs = () => {
  const benefits = [
    {
      icon: <Gem className="w-6 h-6" />,
      text: "High-quality, natural marble",
      description: "Sourced from the finest quarries worldwide"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      text: "Custom design and fabrication",
      description: "Tailored to your specific requirements"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Expert craftsmanship",
      description: "Skilled artisans with years of experience"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      text: "Exceptional customer service",
      description: "Dedicated support throughout your project"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Timely project completion",
      description: "Committed to meeting deadlines"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Story & Mission */}
          <div className="space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Welcome to <span className="font-semibold text-gray-900">MarbleWorks</span>,
                where craftsmanship meets excellence. With years of experience in the
                industry, we specialize in providing high-quality marble solutions
                for both residential and commercial projects.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to deliver premium marble products that enhance the
                beauty and value of every space. We take pride in sourcing the finest
                materials and combining them with expert craftsmanship to create
                timeless and durable designs.
              </p>
            </div>
          </div>

          {/* Right Column - Why Choose Us */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 p-3 bg-gray-900 text-white rounded-lg">
                    {benefit.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.text}</h3>
                    <p className="text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get a Quote
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;