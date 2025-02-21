import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is marble?",
    answer: "Marble is a natural stone used for construction and decoration."
  },
  {
    question: "How do I order marble?",
    answer: "You can place an order via our website or contact our sales team."
  },
  {
    question: "Where can I learn more about marble?",
    answer: (
      <a
        href="https://awsaiapp.com/"
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        awsaiapp.com
      </a>
    )
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="prose max-w-none">{answer}</div>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="bg-gradient-to-br from-zinc-50 to-stone-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our marble products and services
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Contact our team
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