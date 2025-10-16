import React, { useState } from 'react';
import { Search, Menu, User, Heart, MapPin, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

interface HeaderProps {
  onNavigate?: () => void;
  onWishlistClick?: () => void;
  onSearch?: (query: string) => void;
  onSignUpClick?: () => void;
  onSignInClick?: () => void;
  onAboutClick?: () => void;
  onHelpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onWishlistClick, onSearch, onSignUpClick, onSignInClick, onAboutClick, onHelpClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                Free shipping across Africa on orders $500+
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>24/7 Support</span>
              <span>•</span>
              <span>Multi-currency</span>
              <span>•</span>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={onNavigate} className="flex-shrink-0 cursor-pointer">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                AfrikaMarket
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Wholesale Hub</p>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchInput}
                placeholder="Search suppliers, products, or categories..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onWishlistClick}
              className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              <button 
                onClick={onAboutClick}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={onHelpClick}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                Help
              </button>
              <button 
                onClick={onSignInClick}
                className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onSignUpClick}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                Join as Supplier
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchInput}
              placeholder="Search suppliers, products, or categories..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Browse Categories
            </button>
            <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Find Suppliers
            </button>
            <button 
              onClick={onAboutClick}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={onHelpClick}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Help Center
            </button>
            <button 
              onClick={onWishlistClick}
              className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </button>
            <button 
              onClick={onSignInClick}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onSignUpClick}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-colors"
            >
              Join as Supplier
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;