import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log(`Search for: ${searchQuery}`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">StyleShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">
              Home
            </Link>
            <Link to="/category/clothing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">
              Clothing
            </Link>
            <Link to="/category/electronics" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">
              Electronics
            </Link>
            <Link to="/category/accessories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">
              Accessories
            </Link>
          </nav>

          {/* Search, Cart and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative p-1">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 relative p-1">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/category/clothing" 
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clothing
            </Link>
            <Link 
              to="/category/electronics" 
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link 
              to="/category/accessories" 
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accessories
            </Link>
            
            <form onSubmit={handleSearchSubmit} className="relative px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-6 top-4.5 h-5 w-5 text-gray-400" />
            </form>
            
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;