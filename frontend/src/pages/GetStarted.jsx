import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiCheck, FiRepeat, FiLoader } from 'react-icons/fi';
import axios from '../api/axiosInstance';

const GetStarted = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isVerificationRequired, setIsVerificationRequired] = useState(false);
  const [messageType, setMessageType] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userPayload = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'CUSTOMER',
      };

      const response = await axios.post('/user/register', userPayload);

      setFormData(prev => ({
        ...prev,
        password: '',
        agreeTerms: false,
      }));

      setStatusMessage(response.data.message);
      setMessageType('success');
      setIsVerificationRequired(true);
    } catch (error) {
      console.error('Registration error:', error);
      setStatusMessage(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
      setMessageType('error');
      setIsVerificationRequired(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      setStatusMessage('');

      
      const response = await axios.get(`http://localhost:8110/api/user/resend-verification-email?username=${formData.name}`);

      if (response.status === 200) {
        setStatusMessage('Verification email resent successfully. Please check your inbox.');
        setMessageType('success');
      }
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || 'Failed to resend verification email. Please try again later.'
      );
      setMessageType('error');
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeRole = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-green-100 mt-1">Join GreenGrove in just 30 seconds</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min. 8 characters)"
                minLength="8"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="terms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

           
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 text-white rounded-lg transition flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account <FiCheck className="text-lg" />
                </>
              )}
            </button>
          </form>

       
          {statusMessage && (
            <p
              className={`mt-4 text-sm ${
                messageType === 'success' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {statusMessage}
            </p>
          )}

        
          {isVerificationRequired && (
            <div className="mt-4 text-center space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className={`text-green-600 hover:underline flex items-center gap-1 mx-auto text-sm ${
                  isResending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isResending ? (
                  <>
                    <FiLoader className="animate-spin text-lg" />
                    Resending...
                  </>
                ) : (
                  <>
                    <FiRepeat className="text-lg" /> Resend verification email
                  </>
                )}
              </button>

              <p className="text-gray-600 text-sm">
                Didn't receive the email? Check your spam folder or contact{' '}
                <a
                  href="mailto:support@greengrove.com"
                  className="text-green-600 hover:underline"
                >
                  our support team
                </a>
              </p>
            </div>
          )}

         
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-green-600 hover:underline">
              Sign in
            </Link>
          </div>

         
          <div className="mt-4 text-center">
            <button
              onClick={handleChangeRole}
              className="text-xs text-gray-500 hover:underline"
            >
              Go back to role selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
