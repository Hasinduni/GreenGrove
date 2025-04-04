import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLeaf, FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12 mt-24">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Link to="/" className="text-2xl flex items-center gap-2 font-bold">
              <FaLeaf className="text-green-400" />
              <span>GreenGrove</span>
            </Link>
            <p className="text-sm text-green-100">
              Fresh organic vegetables delivered to your doorstep. 
              Committed to quality and sustainable farming.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-300 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-green-300 transition">Shop</Link></li>
              <li><Link to="/about" className="hover:text-green-300 transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-green-300 transition">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarker className="text-green-400" />
                <span>No:88, Main Street, Weerawila, Thissamaharama</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-400" />
                <span>+94-7755411</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-400" />
                <span>hello@greengrove.com</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-green-100">
              Subscribe for updates and special offers
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-800 flex-grow"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-green-300 transition">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-green-300 transition">Privacy Policy</Link>
          </div>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaInstagram />
            </a>
          </div>
          <div>© 2024 GreenGrove. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;