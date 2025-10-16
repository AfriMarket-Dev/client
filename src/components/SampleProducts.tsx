import React from 'react';
import { ArrowRight, Eye, MapPin, User, Building, Package, Star, Heart } from 'lucide-react';
import { products, suppliers } from '../data/mockData';
import { Product } from '../types';
import { useWishlist } from '../hooks/useWishlist';

interface SampleProductsProps {
  onViewProducts?: () => void;
  onProductClick?: (product: Product) => void;
}

const SampleProducts: React.FC<SampleProductsProps> = ({ onViewProducts, onProductClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  // Get first 6 products for display
  const sampleProducts = products.slice(0, 6);

  const getSupplier = (supplierId: string) => suppliers.find(s => s.id === supplierId);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* African-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="products-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="currentColor" opacity="0.1"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1"/>
              <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="1" opacity="0.05"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#products-pattern)" className="text-orange-600"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-sm font-medium text-orange-700 border border-orange-200 mb-6">
            <Package className="w-4 h-4 mr-2" />
            Sample Products
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Quality Products from
            <span className="relative ml-3">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Trusted Suppliers
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12">
                <path d="M5,6 Q150,1 295,6" stroke="url(#products-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="products-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="50%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#eab308"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover a sample of quality products available from our verified suppliers. 
            From electronics to fashion, find everything you need to grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleProducts.map((product, index) => {
            const supplier = getSupplier(product.supplierId);
            
            return (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 rounded-3xl overflow-hidden border border-orange-100/50 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => onProductClick?.(product)}
              >
                {/* African-inspired background pattern for each card */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <svg viewBox="0 0 128 128" className="w-full h-full text-orange-500">
                    <pattern id={`product-pattern-${index}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                      <polygon points="16,4 28,16 16,28 4,16" fill="currentColor" opacity="0.3"/>
                      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                    </pattern>
                    <rect width="128" height="128" fill={`url(#product-pattern-${index})`}/>
                  </svg>
                </div>
                
                {/* Floating geometric decoration */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-400 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-300"></div>
                
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-orange-700 text-xs font-medium rounded-full border border-orange-200/50">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* View Button */}
                  <div className="absolute top-3 right-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(product.id, 'product')) {
                            removeFromWishlist(product.id, 'product');
                          } else {
                            addToWishlist(product, 'product');
                          }
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group-hover:scale-110"
                      >
                        <Heart className={`w-4 h-4 ${
                          isInWishlist(product.id, 'product') 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group-hover:scale-110">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Availability Badge */}
                  <div className="absolute bottom-3 right-3">
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

                <div className="relative z-10 p-6">
                  {/* Product Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                    {product.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        ${product.priceRange.min} - ${product.priceRange.max}
                      </div>
                      <div className="text-xs text-gray-500">Min. order: {product.minimumOrder} units</div>
                    </div>
                  </div>

                  {/* Supplier Information */}
                  {supplier && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={supplier.avatar}
                          alt={supplier.name}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Building className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold text-gray-900 text-sm">Company</span>
                          </div>
                          <div className="text-sm font-medium text-gray-800">{supplier.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-orange-600" />
                        <span className="font-semibold text-gray-900 text-sm">Business Representative</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-3">Contact Representative</div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Products Button */}
        <div className="text-center">
          <button 
            onClick={onViewProducts}
            className="group bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span className="flex items-center justify-center">
              View More Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
      <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-amber-200 to-yellow-200 transform rotate-45 opacity-20 translate-x-12"></div>
    </section>
  );
};

export default SampleProducts;