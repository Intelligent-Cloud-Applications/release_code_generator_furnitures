import { useState, useEffect } from "react";

const Card = ({ title, description, icon }) => (
  <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-600/0 rounded-2xl transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-600/5" />

    <div className="relative">
      <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  </div>
);

const Features = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose
          <span className="bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent">
            {" "}MarbleCo
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experience unparalleled quality and service with our premium marble solutions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card
          title="Premium Selection"
          description="Curated collection of the finest marble from around the world, ensuring exceptional quality and unique patterns."
          icon="💎"
        />
        <Card
          title="Expert Craftsmanship"
          description="Skilled artisans with decades of experience in marble cutting, polishing, and installation."
          icon="⚒️"
        />
        <Card
          title="Lifetime Warranty"
          description="Our confidence in quality is backed by a comprehensive lifetime warranty on all installations."
          icon="🛡️"
        />
      </div>
    </div>
  </section>
);

export default Features;
