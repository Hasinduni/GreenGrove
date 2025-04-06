import React, { useState, useCallback, useEffect } from 'react';
import { motion } from "framer-motion";
import { FadeLeft } from '../../utility/animation';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import axiosInstance from '../../api/axiosInstance';

const Menus = ({ addToCart }) => {
  const [menusData, setMenusData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [clickedButtons, setClickedButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get('/products/all');
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format received');
        }

        // Transform and validate backend data
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          title: item.name || 'Unnamed Product',
          img: item.imageUrl || '/default-veggie.png',
          pricePer100g: parseFloat(item.price) || 0,
          delay: (index + 1) * 0.3,
          stockQuantity: item.stockQuantity !== false,
          description: item.description || ''
        }));

        setMenusData(transformedData);
        
        // Initialize quantities
        const initialQuantities = {};
        transformedData.forEach(item => {
          initialQuantities[item.id] = 100;
        });
        setQuantities(initialQuantities);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query.toLowerCase().trim());
  }, []);

  const filteredMenus = menusData.filter(menu =>
    menu.title.toLowerCase().includes(searchQuery) ||
    menu.description.toLowerCase().includes(searchQuery)
  );

  const handleAddToCart = (item) => {
    if (!item.stockQuantity) {
      alert("This item is currently out of stock");
      return;
    }

    const quantity = quantities[item.id];
    if (quantity < 100) {
      alert("Minimum quantity is 100g");
      return;
    }
    
    const price = (item.pricePer100g * quantity) / 100;
    addToCart({
      ...item,
      quantity: quantity,
      price: parseFloat(price.toFixed(2))
    });

    setClickedButtons(prev => [...prev, item.id]);
    setTimeout(() => {
      setClickedButtons(prev => prev.filter(id => id !== item.id));
    }, 1000);
  };

  const updateQuantity = (id, grams) => {
    const newQuantity = Math.max(100, Math.min(5000, parseInt(grams) || 100));
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto text-center">
        {error}
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
      <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-3xl font-bold text-gray-800 mb-8 pt-16 text-center" // Added pt-16 for padding-top
>
  Fresh Organic Produce
</motion.h1>

        <div className="mb-8 max-w-md mx-auto">
          <SearchBar onSearch={handleSearch} placeholder="Search vegetables..." />
        </div>

        {filteredMenus.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No products matching your search</p>
            <button 
              onClick={() => setSearchQuery('')} 
              className="text-emerald-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu) => {
              const quantity = quantities[menu.id];
              const totalPrice = ((menu.pricePer100g * quantity) / 100).toFixed(2);
              const isClicked = clickedButtons.includes(menu.id);

              return (
                <motion.div
                  key={menu.id}
                  variants={FadeLeft(menu.delay)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="p-4 flex-grow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={menu.img}
                        alt={menu.title}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-veggie.png';
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 capitalize">{menu.title}</h3>
                    {menu.description && (
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{menu.description}</p>
                    )}
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-emerald-600 font-bold">
                        Rs.{menu.pricePer100g.toFixed(2)}/100g
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${menu.stockQuantity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {menu.stockQuantity ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(menu.id, quantity - 100)}
                          disabled={quantity <= 100}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FiMinus className="text-gray-600" />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => updateQuantity(menu.id, e.target.value)}
                          className="mx-2 w-16 text-center border rounded py-1"
                          min="100"
                          max="5000"
                        />
                        <button
                          onClick={() => updateQuantity(menu.id, quantity + 100)}
                          disabled={quantity >= 5000}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                          <FiPlus className="text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">{quantity}g</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(menu)}
                      disabled={isClicked || !menu.stockQuantity}
                      className={`w-full py-2 rounded flex items-center justify-center ${
                        isClicked
                          ? 'bg-green-500'
                          : menu.stockQuantity
                            ? 'bg-emerald-500 hover:bg-emerald-600'
                            : 'bg-gray-300 cursor-not-allowed'
                      } text-white transition-colors`}
                    >
                      <FiShoppingCart className="mr-2" />
                      {isClicked ? 'Added!' : `Add - Rs.${totalPrice}`}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

Menus.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Menus;