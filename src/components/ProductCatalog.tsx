import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, MapPin, MessageCircle, Phone, Mail, Heart, Eye, Package, Truck, Shield, ArrowRight } from 'lucide-react';
import { products, suppliers } from '../data/mockData';
import { Product, Supplier } from '../types';
import { useWishlist } from '../hooks/useWishlist';

interface ProductCatalogProps {
  onBackToHome?: () => void;
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (product: Product) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onBackToHome, onSupplierClick, onProductClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const categories = ['all', 'Electronics', 'Fashion & Textiles', 'Home & Garden', 'Beauty & Health', 'Automotive', 'Industrial Equipment'];

  const getSupplier = (supplierId: string) => suppliers.find(s => s.id === supplierId);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.priceRange.min >= priceRange[0] && product.priceRange.max <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const ContactModal = () => {
    if (!selectedSupplier) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
          <button
            onClick={() => setShowContactModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          
          <div className="text-center mb-6">
            <img
              src={selectedSupplier.avatar}
              alt={selectedSupplier.name}
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h3 className="text-xl font-bold text-gray-900">{selectedSupplier.name}</h3>
            <p className="text-gray-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedSupplier.location}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${selectedSupplier.contact.phone}`}
              className="flex items-center w-full p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Call Now</div>
                <div className="text-sm text-gray-600">{selectedSupplier.contact.phone}</div>
              </div>
            </a>

            {selectedSupplier.contact.whatsapp && (
              <a
                href={`https://wa.me/${selectedSupplier.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">WhatsApp</div>
                  <div className="text-sm text-gray-600">{selectedSupplier.contact.whatsapp}</div>
                </div>
              </a>
            )}

            <a
              href={`mailto:${selectedSupplier.contact.email}`}
              className="flex items-center w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Send Email</div>
                <div className="text-sm text-gray-600">{selectedSupplier.contact.email}</div>
              </div>
            </a>

            <button
              onClick={() => {
                onSupplierClick?.(selectedSupplier.id);
                setShowContactModal(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
            >
              View Full Profile
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{selectedSupplier.rating}</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{selectedSupplier.totalProducts}</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{selectedSupplier.services.deliveryTime}</div>
                <div className="text-xs text-gray-500">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
              <p className="text-gray-600 mt-1">Discover quality products from verified African suppliers</p>
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
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 flex-shrink-0`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (USD)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => {
                const supplier = getSupplier(product.supplierId);
                
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => onProductClick?.(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id, 'product')) {
                              removeFromWishlist(product.id, 'product');
                            } else {
                              addToWishlist(product, 'product');
                            }
                          }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${
                            isInWishlist(product.id, 'product') 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600'
                          }`} />
                        </button>
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.availability === 'in-stock' 
                            ? 'bg-green-100 text-green-700'
                            : product.availability === 'pre-order'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.availability.replace('-', ' ').toUpperCase()}
                        </span>
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

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-lg font-bold text-orange-600">
                            ${product.priceRange.min} - ${product.priceRange.max}
                          </div>
                          <div className="text-xs text-gray-500">Min. order: {product.minimumOrder} units</div>
                        </div>
                      </div>

                      {supplier && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div 
                            className="flex items-center space-x-2 cursor-pointer hover:text-orange-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSupplierClick?.(supplier.id);
                            }}
                          >
                            <img
                              src={supplier.avatar}
                              alt={supplier.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">{supplier.name}</div>
                              <div className="text-xs text-gray-500">{supplier.location}</div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSupplier(supplier);
                              setShowContactModal(true);
                            }}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && <ContactModal />}
    </div>
  );
};

export default ProductCatalog;