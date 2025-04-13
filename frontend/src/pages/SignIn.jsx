import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password
      });

      const token = response.data.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      
      alert("Login Successful!");
      
      switch (decoded.role) {
        case "CUSTOMER":
          navigate("/");
          break;
        case "ADMIN":
          navigate("/a-home");
          break;
        default:
          alert("Unknown role. Please contact support.");
          navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setErrorMsg("Your email is not verified. Please check your inbox.");
        setShowResend(true);
      } else {
        setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await axiosInstance.get(
        `/api/user/resend-verification-email?email=${encodeURIComponent(email)}`
      );
      setErrorMsg("Verification email resent - please check your inbox");
      setShowResend(false);
    } catch (error) {
      setErrorMsg("Failed to resend verification email. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setForgotPasswordMsg("Please enter your email address.");
      return;
    }

    try {
      await axiosInstance.post(
        `/api/auth/forgot-password?email=${encodeURIComponent(forgotPasswordEmail)}`
      );
      setForgotPasswordMsg("Password reset instructions sent to your email");
    } catch (error) {
      setForgotPasswordMsg(
        error.response?.data?.message || "Failed to send password reset email."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {errorMsg}
              {showResend && (
                <button
                  onClick={handleResendVerification}
                  className="ml-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => document.getElementById('forgot-password-modal').showModal()}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                isLoading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'
              } transition flex justify-center items-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate("/sign-up")}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <dialog id="forgot-password-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Forgot Password</h3>
            <div className="py-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              {forgotPasswordMsg && (
                <p className={`text-sm ${
                  forgotPasswordMsg.includes("sent") ? "text-green-600" : "text-red-600"
                }`}>
                  {forgotPasswordMsg}
                </p>
              )}
            </div>
            <div className="modal-action">
              <button
                className="btn bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </button>
              <button
                className="btn ml-2"
                onClick={() => document.getElementById('forgot-password-modal').close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default SignIn;