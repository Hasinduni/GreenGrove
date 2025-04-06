import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import contactHero from '../assets/contact.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Validate token on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isValid = validateToken();
      setAuthChecked(true);
      if (!isValid) {
        setError('Please log in to submit the contact form');
      }
    };
    checkAuth();
  }, []);

  const validateToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateToken()) {
      setError('Your session has expired. Please log in again.');
      setIsLoading(false);
      return;
    }

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const response = await axiosInstance.post('/contact/save', {
        ...formData,
        userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(
        error.response?.data?.message || 
        'Failed to submit form. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-6">Our Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Visit Us</h3>
                    <p className="text-gray-600">123 Main Street</p>
                    <p className="text-gray-600">City, Country</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="text-gray-600">contact@example.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Map Image */}
              <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={contactHero}
                  alt="Our Location"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Send Us a Message</h2>

            {!authChecked ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : !validateToken() ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-3">Authentication Required</h3>
                <p className="mb-4">Please log in to submit the contact form.</p>
                <button
                  onClick={() => navigate('/login?return=/contact')}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Log In
                </button>
                <p className="mt-3 text-sm">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate('/register')}
                    className="text-green-600 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            ) : isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center"
              >
                <FiCheckCircle className="text-green-500 text-xl mr-3" />
                <span>Thank you! We'll get back to you soon.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                    disabled={isLoading}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${isLoading ? 'bg-green-400' : 'bg-green-600'} text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-green-700 transition`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;