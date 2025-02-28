import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import data from '../../utils/data.json';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderAnswer = (answer) => {
    if (typeof answer === 'string') {
      return answer;
    }
    if (answer.type === 'link') {
      return (
        <a
          href={answer.url}
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          {answer.text}
        </a>
      );
    }
    return answer;
  };

  return (
    <div
      className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isOpen ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
      >
        <span className="flex-1 pr-4">{question}</span>
        <ChevronUp
          className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="px-6 py-4 text-gray-600 bg-gray-50 rounded-b-xl border-t border-gray-200"
          style={{
            animation: isOpen ? 'slideDown 0.2s ease-out' : 'slideUp 0.2s ease-out',
          }}
        >
          <div className="prose max-w-none">{renderAnswer(answer)}</div>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const { faq } = data;

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-stone-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            {faq.hero.title}
          </h2>
          <p className="text-lg text-gray-600">
            {faq.hero.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {faq.items.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {faq.contact.text}{' '}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {faq.contact.linkText}
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}