import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // New component we'll create
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import GetStarted from './pages/GetStarted';
import Gallery from './components/Galley/Gallery';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLIC_KEY');

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === newItem.id);
      return existingItem 
        ? prevCart.map(item => 
            item.id === newItem.id 
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...prevCart, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === itemId ? { ...item, quantity: Math.max(100, newQuantity) } : item
    ));
  };

  // Calculate total for checkout
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.pricePer100g * item.quantity) / 100, 0)
      .toFixed(2);
  };

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart 
              cartItems={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          } />
          <Route path="/checkout" element={
            <Checkout 
              cartItems={cart}
              calculateTotal={calculateTotal}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="gallery" element={<Gallery/>}/>
        </Routes>
        <Footer />
      </Elements>
    </Router>
  );
};

export default App;