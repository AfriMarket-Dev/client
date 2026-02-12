import React from 'react';
import { suppliers } from '../data/mockData';
import { Star, MapPin, CheckCircle, ArrowRight, Package, MessageCircle, Heart } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

interface FeaturedSuppliersProps {
  onViewSupplier?: (supplierId: string) => void;
  onViewAllSuppliers?: () => void;
}

const FeaturedSuppliers: React.FC<FeaturedSuppliersProps> = ({ onViewSupplier, onViewAllSuppliers }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Suppliers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, top-rated wholesalers and importers who have proven track records 
            of quality and reliability across Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => onViewSupplier?.(supplier.id)}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={supplier.coverImage}
                  alt={supplier.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Verified Badge */}
                {supplier.verified && (
                  <div className="absolute top-4 right-4 flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-4 left-4">
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
                <div className="absolute -bottom-8 left-6">
                  <img
                    src={supplier.avatar}
                    alt={supplier.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 px-6 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{supplier.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">{supplier.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({supplier.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {supplier.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplier.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-1">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{supplier.totalProducts}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{supplier.services.minimumOrder}</div>
                    <div className="text-xs text-gray-500">Min. Order</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{supplier.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewSupplier?.(supplier.id);
                    }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-300 flex items-center justify-center"
                  >
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 border-2 border-primary/20 text-primary rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onViewAllSuppliers}
            className="bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary/90 hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Suppliers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSuppliers;