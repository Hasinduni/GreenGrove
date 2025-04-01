import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCreditCard, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Checkout = ({ cartItems, calculateTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // In a real app, you would fetch this from your backend
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: calculateTotal() * 100 }), // Convert to cents
      });
      
      const { clientSecret } = await response.json();

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        setPaymentSuccess(true);
        // Here you would typically clear the cart and show success
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/cart" className="flex items-center text-emerald-600 mb-4">
          <FiArrowLeft className="mr-1" /> Back to Cart
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        {paymentSuccess ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Thank you for your order.</p>
            <Link 
              to="/products" 
              className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.title} ({item.quantity}g)</span>
                    <span>Rs {((item.pricePer100g * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs {calculateTotal()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaCreditCard className="text-emerald-600" /> Payment Details
              </h2>
              <div className="flex gap-3 mb-4 text-gray-600">
                <FaCcVisa className="text-3xl" />
                <FaCcMastercard className="text-3xl" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Enter your card information</label>
                  <div className="border rounded p-3 bg-gray-50">
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: 'transparent', // Makes placeholder text invisible
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                        hidePostalCode: true,
                        placeholder: '', // Empty placeholder text
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                    <input type="text" placeholder="XXX" className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 transition-colors"
                >
                  {loading ? "Processing..." : `Pay Rs ${calculateTotal()}`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;