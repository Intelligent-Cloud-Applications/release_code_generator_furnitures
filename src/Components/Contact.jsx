import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { API } from 'aws-amplify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return alert("All fields are required");
    }

    try {
      setIsLoading(true);
      const apiName = "main";
      const path = "/any/create-query";
      const myInit = {
        body: {
          fullName: formData.name,
          emailId: formData.email,
          message: formData.message,
          userType: "guest",
        },
      };

      await API.post(apiName, path, myInit);
      alert("Your message has been sent. We will get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert("Failed to send message. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p className="font-medium">Contact Information</p>
            <p className="mt-2">
              <Mail className="inline w-5 h-5 mr-2" /> email@example.com
            </p>
            <p className="mt-1">
              <Phone className="inline w-5 h-5 mr-2" /> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
