import { CheckCircle, Gem, Settings, Heart, Clock } from "lucide-react";
import data from "../../utils/data.json";

const AboutUs = () => {
  const { aboutUs } = data;
  
  const iconComponents = {
    Gem: <Gem className="w-6 h-6" />,
    Settings: <Settings className="w-6 h-6" />,
    CheckCircle: <CheckCircle className="w-6 h-6" />,
    Heart: <Heart className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url('${aboutUs.hero.backgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
          <h1 className="text-5xl font-bold text-white">{aboutUs.hero.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutUs.story.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{aboutUs.story.content}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutUs.mission.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{aboutUs.mission.content}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{aboutUs.benefits.title}</h2>
            <div className="space-y-6">
              {aboutUs.benefits.items.map((benefit, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 p-3 bg-gray-900 text-white rounded-lg">
                    {iconComponents[benefit.icon]}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
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
            {aboutUs.cta.text}
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