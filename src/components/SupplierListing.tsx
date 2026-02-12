import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, MapPin, MessageCircle, Phone, Mail, Heart, Eye, Package, Truck, Shield, ArrowRight, CheckCircle, Building, Users } from 'lucide-react';
import { suppliers, products, categories } from '../data/mockData';
import { type Supplier } from '../types';
import { useWishlist } from '../hooks/useWishlist';

interface SupplierListingProps {
  onBack?: () => void;
  onSupplierClick?: (supplierId: string) => void;
  initialSearchQuery?: string;
}

const SupplierListing: React.FC<SupplierListingProps> = ({ onBack, onSupplierClick, initialSearchQuery = '' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Get unique categories from suppliers and product categories
  const allCategories = [
    'all', 
    ...Array.from(new Set([
      ...suppliers.flatMap(s => s.specialties),
      ...categories.map(c => c.name),
      ...products.map(p => p.category)
    ]))
  ];

  // Enhanced filter function that searches across suppliers, products, and categories
  const filteredSuppliers = suppliers.filter(supplier => {
    let matchesSearch = false;
    
    if (searchQuery.trim() === '') {
      matchesSearch = true;
    } else {
      const query = searchQuery.toLowerCase();
      
      // Search in supplier information
      const supplierMatch = supplier.name.toLowerCase().includes(query) ||
                           supplier.description.toLowerCase().includes(query) ||
                           supplier.location.toLowerCase().includes(query) ||
                           supplier.specialties.some(spec => spec.toLowerCase().includes(query));
      
      // Search in supplier's products
      const supplierProducts = products.filter(p => p.supplierId === supplier.id);
      const productMatch = supplierProducts.some(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
      
      // Search in categories
      const categoryMatch = categories.some(category => 
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.subcategories.some(sub => sub.toLowerCase().includes(query))
      );
      
      matchesSearch = supplierMatch || productMatch || categoryMatch;
    }
    
    const matchesCategory = selectedCategory === 'all' || 
                           supplier.specialties.some(spec => spec === selectedCategory) ||
                           products.some(p => p.supplierId === supplier.id && p.category === selectedCategory);
    
    const matchesRating = selectedRating === 0 || supplier.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
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
                <div className="text-lg font-bold text-gray-900">{selectedSupplier.services.minimumOrder}</div>
                <div className="text-xs text-gray-500">Min Order</div>
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
              <h1 className="text-3xl font-bold text-gray-900">Browse Suppliers</h1>
              <p className="text-gray-600 mt-1">Discover verified wholesalers and importers across Africa</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Suppliers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search suppliers, products, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {allCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Specialties' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        {rating === 0 ? 'All Ratings' : (
                          <>
                            {rating}+ <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                          </>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRating(0);
                }}
                className="w-full text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Suppliers Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
               Showing {filteredSuppliers.length} of {suppliers.length} suppliers
               {searchQuery && (
                 <span className="ml-2 text-orange-600 font-medium">
                   for "{searchQuery}"
                 </span>
               )}
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredSuppliers.map(supplier => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => onSupplierClick?.(supplier.id)}
                >
                  {/* Cover Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={supplier.coverImage}
                      alt={supplier.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Verified Badge */}
                    {supplier.verified && (
                      <div className="absolute top-3 right-3 flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <div className="absolute top-3 left-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(supplier.id, 'supplier')) {
                            removeFromWishlist(supplier.id, 'supplier');
                          } else {
                            addToWishlist(supplier, 'supplier');
                          }
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${
                          isInWishlist(supplier.id, 'supplier') 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} />
                      </button>
                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-6 left-4">
                      <img
                        src={supplier.avatar}
                        alt={supplier.name}
                        className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
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

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {supplier.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {supplier.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{supplier.specialties.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center text-xs mb-4">
                      <div>
                        <div className="font-bold text-gray-900">{supplier.totalProducts}</div>
                        <div className="text-gray-500">Products</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{supplier.services.minimumOrder}</div>
                        <div className="text-gray-500">Min Order</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{supplier.rating}</div>
                        <div className="text-gray-500">Rating</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSupplierClick?.(supplier.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-semibold text-sm hover:from-orange-600 hover:to-amber-600 transition-colors flex items-center justify-center"
                      >
                        View Profile
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSupplier(supplier);
                          setShowContactModal(true);
                        }}
                        className="p-2 border-2 border-orange-200 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
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

export default SupplierListing;