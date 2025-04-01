// Menus.js
import React, { useState, useCallback } from 'react';
import { motion } from "framer-motion";
import { FadeLeft } from '../../utility/animation';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';

// Import your images
import Vegi1 from '../../assets/vege1.png';
import Vegi2 from '../../assets/Vege2.png';
import Vegi3 from '../../assets/Vege3.png';
import Vegi4 from '../../assets/Vege4.png';

const MenusData = [
  { id: 1, title: "Green Beans", img: Vegi1, pricePer100g: 15.00, delay: 0.3 },
  { id: 2, title: "Carrot", img: Vegi2, pricePer100g: 12.00, delay: 0.6 },
  { id: 3, title: "Pumpkin", img: Vegi4, pricePer100g: 7.00, delay: 0.9 },
  { id: 4, title: "Tomato", img: Vegi3, pricePer100g: 15.00, delay: 1.2 }
];

const Menus = ({ addToCart }) => {
  const [quantities, setQuantities] = useState(
    MenusData.reduce((acc, item) => ({ ...acc, [item.id]: 100 }), {})
  );
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredMenus = MenusData.filter(menu =>
    menu.title.toLowerCase().includes(searchQuery)
  );

  const handleAddToCart = (item) => {
    if (quantities[item.id] < 100) {
      alert("Minimum quantity is 100g");
      return;
    }
    addToCart({
      ...item,
      quantity: quantities[item.id],
      price: (item.pricePer100g * quantities[item.id]) / 100
    });
  };

  const updateQuantity = (id, grams) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(100, grams) }));
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 pb-12 text-center"
        >
          Fresh Organic Produce (Price per 100g)
        </motion.h1>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <motion.div
              key={menu.id}
              variants={FadeLeft(menu.delay)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src={menu.img} 
                    alt={menu.title}
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {menu.title}
                </h3>
                <p className="text-emerald-600 font-bold mb-4">
                  ${menu.pricePer100g.toFixed(2)}/100g
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(menu.id, quantities[menu.id] - 100)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      <FiMinus className="text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={quantities[menu.id]}
                      onChange={(e) => updateQuantity(menu.id, parseInt(e.target.value) || 100)}
                      className="mx-2 w-20 text-center border rounded-lg"
                      min="100"
                    />
                    <button
                      onClick={() => updateQuantity(menu.id, quantities[menu.id] + 100)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      <FiPlus className="text-gray-600" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    {quantities[menu.id]}g
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(menu)}
                  className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Menus.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Menus;