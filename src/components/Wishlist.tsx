import React, { useState } from 'react';
import { Heart, ArrowLeft, Package, Users, Trash2, Eye, MessageCircle, MapPin, Star, Building, User, Grid, List } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { Product, Supplier } from '../types';

interface WishlistProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onSupplierClick: (supplierId: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ onBack, onProductClick, onSupplierClick }) => {
  const { 
    getWishlistProducts, 
    getWishlistSuppliers, 
    removeFromWishlist, 
    clearWishlist,
    wishlistCount 
  } = useWishlist();
  
  const [activeTab, setActiveTab] = useState<'products' | 'suppliers'>('products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const wishlistProducts = getWishlistProducts();
  const wishlistSuppliers = getWishlistSuppliers();

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Heart className="w-8 h-8 text-red-500 mr-3" />
                  My Wishlist
                </h1>
                <p className="text-gray-600 mt-1">{wishlistCount} items saved</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {wishlistCount > 0 && (
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'products'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="w-4 h-4 mr-2" />
              Products ({wishlistProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'suppliers'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Suppliers ({wishlistSuppliers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products in wishlist</h3>
                <p className="text-gray-600 mb-6">Start adding products you're interested in to your wishlist</p>
                <button
                  onClick={onBack}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {wishlistProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => removeFromWishlist(product.id, 'product')}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </button>
                        <button
                          onClick={() => onProductClick(product)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            ${product.priceRange.min} - ${product.priceRange.max}
                          </div>
                          <div className="text-xs text-gray-500">Min. order: {product.minimumOrder} units</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div>
            {wishlistSuppliers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No suppliers in wishlist</h3>
                <p className="text-gray-600 mb-6">Start adding suppliers you want to work with to your wishlist</p>
                <button
                  onClick={onBack}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Browse Suppliers
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {wishlistSuppliers.map(supplier => (
                  <div
                    key={supplier.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => onSupplierClick(supplier.id)}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={supplier.coverImage}
                        alt={supplier.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWishlist(supplier.id, 'supplier');
                          }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </button>
                      </div>

                      <div className="absolute -bottom-6 left-4">
                        <img
                          src={supplier.avatar}
                          alt={supplier.name}
                          className="w-12 h-12 rounded-full border-4 border-white object-cover"
                        />
                      </div>
                    </div>

                    <div className="pt-8 px-4 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="text-sm">{supplier.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-gray-900 text-sm">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {supplier.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {supplier.specialties.slice(0, 2).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center text-xs">
                        <div>
                          <div className="font-bold text-gray-900">{supplier.totalProducts}</div>
                          <div className="text-gray-500">Products</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{supplier.rating}</div>
                          <div className="text-gray-500">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;