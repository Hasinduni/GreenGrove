import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCreditCard, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Checkout = ({ cartItems, calculateTotal }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
      setError('Please fill all card details');
      setLoading(false);
      return;
    }

    try {
      // In a real app, you would get these from your backend
      const paymentData = {
        sandbox: true, // Set to false for production
        merchant_id: 'YOUR_MERCHANT_ID', // Replace with your PayHere merchant ID
        return_url: 'http://yourwebsite.com/payment-success',
        cancel_url: 'http://yourwebsite.com/payment-cancel',
        notify_url: 'http://yourwebsite.com/payment-notify',
        first_name: 'Customer', // Get from form
        last_name: 'Name', // Get from form
        email: 'customer@example.com', // Get from form
        phone: '0771234567', // Get from form
        address: 'No.1, Galle Road', // Get from form
        city: 'Colombo', // Get from form
        country: 'Sri Lanka', // Get from form
        order_id: 'ORDER_' + Math.random().toString(36).substr(2, 9),
        items: cartItems.map(item => item.title).join(', '),
        amount: calculateTotal().toFixed(2),
        currency: 'LKR',
        hash: 'GENERATED_HASH', // Generate this on your backend
        // Card details that will be pre-filled in PayHere modal
        card_number: cardDetails.number.replace(/\s/g, ''),
        card_expiry: cardDetails.expiry,
        card_cvv: cardDetails.cvc
      };

      // Create PayHere checkout
      const payhere = new window.PayHere({
        onCompleted: function(orderId) {
          setPaymentSuccess(true);
          console.log("Payment completed. Order ID:" + orderId);
        },
        onDismissed: function() {
          setError("Payment was dismissed by the user");
          setLoading(false);
        },
        onError: function(error) {
          setError("Payment failed: " + error);
          setLoading(false);
        }
      });

      payhere.startPayment(paymentData);

    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  // Format card number as user types
  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
    handleCardChange(e);
  };

  // Format expiry date as MM/YY
  const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    handleCardChange(e);
  };

  // Load PayHere script dynamically
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
                  <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded bg-gray-50 mb-3"
                    maxLength="19"
                    onChange={formatCardNumber}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded bg-gray-50"
                        maxLength="5"
                        onChange={formatExpiry}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvc"
                        placeholder="123"
                        className="w-full p-2 border rounded bg-gray-50"
                        maxLength="4"
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Billing Information</label>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-2 border rounded bg-gray-50 mb-3" 
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-2 border rounded bg-gray-50 mb-3" 
                    required
                  />
                </div>
                
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
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