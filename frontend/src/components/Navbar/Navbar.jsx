import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ cartCount, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center gap-4 h-10.5">
          {/* Logo - Made non-shrinkable */}
          <Link to="/" className="shrink-0 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            GreenGrove
          </Link>

        

          {/* Navigation Links - Made non-shrinkable */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
            <NavLink to="/products" isActive={isActive('/products')}>Products</NavLink>
            <NavLink to="/about" isActive={isActive('/about')}>About</NavLink>
            <NavLink to="/contact" isActive={isActive('/contact')}>Contact</NavLink>
            
            <div className="flex items-center ml-4 pl-4 border-l border-gray-200 gap-2">
              <CartButton count={cartCount} />
              <Link to="/signin" className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
                <FiUser className="text-lg" />
                <span>Sign In</span>
              </Link>
              <Link to="/get-started" className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 rounded-full hover:shadow-md transition-all">
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="text-2xl text-gray-700" /> : <FiMenu className="text-2xl text-gray-700" />}
          </button>
        </div>

        {/* Mobile SearchBar - Only visible when menu is open */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <SearchBar onSearch={(query) => {
              onSearch(query);
              setIsOpen(false); // Close menu after search
            }} />
          </div>
        )}
      </div>

      {/* Mobile Menu Content */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/products" isActive={isActive('/products')} onClick={() => setIsOpen(false)}>Products</MobileNavLink>
          <MobileNavLink to="/about" isActive={isActive('/about')} onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/contact" isActive={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          
          <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <Link to="/signin" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>
                <FiUser />
                <span>Sign In</span>
              </Link>
              <CartButton count={cartCount} mobile onClick={() => setIsOpen(false)} />
            </div>
            <Link to="/get-started" className="w-full px-4 py-2.5 text-center font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg hover:shadow-md transition-all" onClick={() => setIsOpen(false)}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Helper Components (unchanged)
const NavLink = ({ to, children, isActive }) => (
  <Link to={to} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}>
    {children}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired
};

const MobileNavLink = ({ to, children, isActive, onClick }) => (
  <Link to={to} onClick={onClick} className={`px-4 py-2.5 font-medium rounded-lg transition-colors ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'}`}>
    {children}
  </Link>
);

const CartButton = ({ count, mobile, onClick }) => (
  <Link to="/cart" onClick={onClick} className={`flex items-center gap-1 ${mobile ? 'px-4 py-2' : 'p-2'} rounded-lg hover:bg-gray-100 transition-colors relative`}>
    <FiShoppingCart className="text-lg text-gray-700" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    )}
    {mobile && <span className="ml-1">Cart</span>}
  </Link>
);

// Updated PropTypes
Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired
};

CartButton.propTypes = {
  count: PropTypes.number.isRequired,
  mobile: PropTypes.bool,
  onClick: PropTypes.func
};

CartButton.defaultProps = {
  mobile: false,
  onClick: () => {}
};

export default Navbar;