import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCreditCard, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Checkout = ({ cartItems, calculateTotal }) => {
  // State management
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('address'); // 'address' or 'payment'
  
  // Address form state
  const [address, setAddress] = useState({
    full_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'LK',
    phone: '',
    email: ''
  });

  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  // Load PayHere script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  // Handle card input changes
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
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

  // Validate address form
  const validateAddress = () => {
    const requiredFields = ['full_name', 'address_line1', 'city', 'zip_code', 'phone', 'email'];
    return requiredFields.every(field => address[field].trim() !== '');
  };

  // Validate payment form
  const validatePayment = () => {
    return cardDetails.number.replace(/\s/g, '').length === 16 && 
           cardDetails.expiry.length === 5 && 
           cardDetails.cvc.length >= 3;
  };

  // Handle address form submission
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!validateAddress()) {
      setError('Please fill all required address fields');
      return;
    }
    setError(null);
    setActiveTab('payment');
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validatePayment()) {
      setError('Please enter valid card details');
      setLoading(false);
      return;
    }

    try {
      const paymentData = {
        sandbox: true, // Set to false for production
        merchant_id: 'YOUR_MERCHANT_ID',
        return_url: 'http://yourwebsite.com/payment-success',
        cancel_url: 'http://yourwebsite.com/payment-cancel',
        notify_url: 'http://yourwebsite.com/payment-notify',
        first_name: address.full_name.split(' ')[0],
        last_name: address.full_name.split(' ').slice(1).join(' '),
        email: address.email,
        phone: address.phone,
        address: `${address.address_line1} ${address.address_line2 || ''}`.trim(),
        city: address.city,
        country: address.country === 'LK' ? 'Sri Lanka' : 'United States',
        order_id: 'ORDER_' + Math.random().toString(36).substr(2, 9),
        items: cartItems.map(item => item.title).join(', '),
        amount: calculateTotal().toFixed(2),
        currency: 'LKR',
        hash: 'GENERATED_HASH', // Generate this on your backend
        card_number: cardDetails.number.replace(/\s/g, ''),
        card_expiry: cardDetails.expiry,
        card_cvv: cardDetails.cvc
      };

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
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-between items-center text-sm">
              <div 
                className={`flex flex-col items-center ${activeTab === 'address' ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('address')}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${activeTab === 'address' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100'}`}>
                  1
                </div>
                <span>Shipping</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-2"></div>
              <div 
                className={`flex flex-col items-center ${activeTab === 'payment' ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}
                onClick={() => validateAddress() && setActiveTab('payment')}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${activeTab === 'payment' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100'}`}>
                  2
                </div>
                <span>Payment</span>
              </div>
            </div>

            {/* Order Summary */}
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

            {/* Address Form */}
            {activeTab === 'address' && (
              <form onSubmit={handleAddressSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={address.full_name}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Address Line 1</label>
                    <input
                      type="text"
                      name="address_line1"
                      value={address.address_line1}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="address_line2"
                      value={address.address_line2}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zip_code"
                      value={address.zip_code}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                    >
                      <option value="LK">Sri Lanka</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded bg-gray-50"
                      required
                    />
                  </div>
                </div>
                
                {error && <div className="text-red-500 mt-4">{error}</div>}
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={!validateAddress()}
                    className={`px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 ${
                      !validateAddress() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {/* Payment Form */}
            {activeTab === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <FaCreditCard className="text-emerald-600" /> Payment Details
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('address')}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    ← Back to Address
                  </button>
                </div>
                
                <div className="flex gap-3 mb-4 text-gray-600">
                  <FaCcVisa className="text-3xl" />
                  <FaCcMastercard className="text-3xl" />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded bg-gray-50"
                    maxLength="19"
                    onChange={formatCardNumber}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total Amount</span>
                    <span>Rs {calculateTotal()}</span>
                  </div>
                  
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  
                  <button
                    type="submit"
                    disabled={loading || !validatePayment()}
                    className={`w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors ${
                      loading ? 'opacity-70' : ''
                    } ${
                      !validatePayment() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay Rs ${calculateTotal()}`
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;