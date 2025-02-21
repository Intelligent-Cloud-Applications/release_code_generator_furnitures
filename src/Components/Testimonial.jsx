import { useState, useEffect } from "react";
import img1 from "../assets/Replacetestimonials1.jpeg";
import img2 from "../assets/testimonial2.jpg";
import img3 from "../assets/testimonial 3.jpg";

const TestimonialCard = ({ testimonial, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          {/* Customer Image */}
          <div className="h-48 sm:h-64 overflow-hidden">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              "{testimonial.review}"
            </p>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                <img
                  src={testimonial.profilePic}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      image: img1,
      profilePic: img1,
      review: "Absolutely stunning marble quality! The veining patterns are exactly what I was looking for in my latest design project.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Architect",
      image: img2,
      profilePic: img2,
      review: "The attention to detail in their marble selection is unmatched. A true game-changer for luxury spaces.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Home Owner",
      image: img3,
      profilePic: img3,
      review: "Working with MarbleCo was a dream. They helped me choose the perfect marble for my kitchen renovation.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Loved by
          <span className="bg-gradient-to-r from-stone-600 to-blue-600 bg-clip-text text-transparent">
            {" "}Our Clients
          </span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover why our clients choose us for their luxury marble needs.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Review Stats */}
      <div className="mt-16 max-w-7xl mx-auto">
        <div className="flex justify-center gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm w-40">
            <div className="text-3xl font-bold text-stone-600 text-center">4.9/5</div>
            <div className="text-sm text-gray-500 text-center">Average Rating</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm w-40">
            <div className="text-3xl font-bold text-stone-600 text-center">500+</div>
            <div className="text-sm text-gray-500 text-center">Happy Clients</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm w-40">
            <div className="text-3xl font-bold text-stone-600 text-center">100%</div>
            <div className="text-sm text-gray-500 text-center">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;