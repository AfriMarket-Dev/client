import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, CheckCircle, Phone, Mail, MessageCircle, Heart, Package, Truck, Shield, Clock, Award, Users, TrendingUp, Send, Verified, Eye, Plus, Minus } from 'lucide-react';
import { products, suppliers } from '../data/mockData';
import { type Product, type Supplier } from '../types';
import { useWishlist } from '../hooks/useWishlist';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onSupplierClick: (supplierId: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack, onSupplierClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === productId);
  const supplier = product ? suppliers.find(s => s.id === product.supplierId) : null;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product?.minimumOrder || 1);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    requestedQuantity: quantity.toString()
  });

  if (!product || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product inquiry submitted:', { ...inquiryForm, productId, supplierId: supplier.id });
    setShowInquiryForm(false);
    setInquiryForm({
      name: '', email: '', company: '', phone: '', message: '', requestedQuantity: quantity.toString()
    });
  };

  const InquiryModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Inquiry</h2>
            <p className="text-gray-600">{product.name}</p>
          </div>
          <button
            onClick={() => setShowInquiryForm(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleInquirySubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={inquiryForm.company}
                onChange={(e) => setInquiryForm({...inquiryForm, company: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Quantity</label>
            <input
              type="number"
              value={inquiryForm.requestedQuantity}
              onChange={(e) => setInquiryForm({...inquiryForm, requestedQuantity: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Number of units needed"
              min={product.minimumOrder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea
              required
              rows={5}
              value={inquiryForm.message}
              onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Describe your requirements, questions, or any specific details..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowInquiryForm(false)}
              className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    if (isInWishlist(product.id, 'product')) {
                      removeFromWishlist(product.id, 'product');
                    } else {
                      addToWishlist(product, 'product');
                    }
                  }}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <Heart className={`w-5 h-5 ${
                    isInWishlist(product.id, 'product') 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600'
                  }`} />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${
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

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  {product.subcategory}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Pricing</h3>
              <div className="space-y-3">
                {product.bulkPricing.map((tier, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-xl">
                    <span className="font-medium text-gray-700">{tier.quantity}+ units</span>
                    <span className="text-xl font-bold text-primary">
                      ${tier.price} {product.priceRange.currency}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Minimum Order:</span>
                  <span className="text-lg font-bold text-gray-900">{product.minimumOrder} units</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Order Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(product.minimumOrder, quantity - 1))}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minimumOrder, parseInt(e.target.value) || product.minimumOrder))}
                  min={product.minimumOrder}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-gray-600">units</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 rounded-xl font-bold text-lg hover:from-primary/90 hover:to-primary transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Product Inquiry
              </button>
              
              <button
                onClick={() => onSupplierClick(supplier.id)}
                className="w-full border-2 border-primary text-primary py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-colors"
              >
                View Supplier Profile
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Specifications */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">{key}</div>
                    <div className="font-semibold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Information */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Supplier</h3>
            
            <div className="flex items-start space-x-6">
              <img
                src={supplier.avatar}
                alt={supplier.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-bold text-gray-900">{supplier.name}</h4>
                  {supplier.verified && (
                    <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                      <Verified className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{supplier.rating}</span>
                    <span className="text-gray-500 ml-1">({supplier.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{supplier.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.totalProducts}</div>
                    <div className="text-sm text-gray-500">Products</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.services.minimumOrder}</div>
                    <div className="text-sm text-gray-500">Min Order</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{supplier.services.deliveryTime}</div>
                    <div className="text-sm text-gray-500">Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && <InquiryModal />}
    </div>
  );
};

export default ProductDetails;