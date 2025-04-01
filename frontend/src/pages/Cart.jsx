import React from 'react';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PropTypes from 'prop-types';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const calculateTotal = () => 
    cartItems.reduce((total, item) => total + (item.pricePer100g * item.quantity) / 100, 0)
      .toFixed(2);

  const calculateItemCount = () => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return Math.round(totalQuantity / 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2 sticky top-16 bg-gray-50 z-10 py-4"> {/* Added sticky positioning and z-index */}
          <FiShoppingBag className="text-emerald-600" />
          Your Shopping Cart
          {cartItems.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({calculateItemCount()} {calculateItemCount() === 1 ? 'item' : 'items'})
            </span>
          )}
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm max-w-md mx-auto">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
                  />
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Rs {item.pricePer100g.toFixed(2)} per 100g
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-normal">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 100)}
                        className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 100}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="text-gray-600" />
                      </button>
                      <div className="px-3 py-1 bg-white text-center min-w-[60px]">
                        {item.quantity}g
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 100)}
                        className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="text-gray-600" />
                      </button>
                    </div>

                    {/* Item Subtotal */}
                    <p className="text-emerald-600 font-bold min-w-[100px] text-right">
                      Rs {((item.pricePer100g * item.quantity) / 100).toFixed(2)}
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span className="truncate max-w-[200px]">
                      {item.title} ({item.quantity}g)
                    </span>
                    <span>Rs {((item.pricePer100g * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-emerald-600">
                    Rs {calculateTotal()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <Link
                    to="/products"
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/checkout"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-center font-medium"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

   
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      pricePer100g: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Cart;