import React from 'react';
import { ArrowRight, Users, Package, Globe, TrendingUp, Star, Shield, Zap, CheckCircle, MapPin, Settings, Clock, Percent, Gift, Tag, Siren as Fire, Crown, Truck, Phone } from 'lucide-react';

interface HeroProps {
  onBrowseProducts?: () => void;
  onBrowseSuppliers?: () => void;
  onSignUpClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowseProducts, onBrowseSuppliers, onSignUpClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
        >
          <defs>
            <pattern
              id="african-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="60,10 90,40 60,70 30,40"
                fill="currentColor"
                opacity="0.3"
              />
              <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.2" />
              <path
                d="M20,20 L40,40 M80,20 L100,40 M20,80 L40,100 M80,80 L100,100"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#african-pattern)"
            className="text-orange-600"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Promotional Banner - Amazon Style */}
        <div className="py-4 mt-3">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                  <Fire className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold">FLASH SALE</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Up to 50% OFF Construction Equipment
                  </h3>
                  <p className="text-sm opacity-90">
                    Limited time offer - Ends in 2 days!
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">02</div>
                  <div className="text-xs opacity-80">DAYS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">14</div>
                  <div className="text-xs opacity-80">HOURS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">35</div>
                  <div className="text-xs opacity-80">MINS</div>
                </div>
                <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="py-4">
          <div className="text-center mb-2">
            {/* <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-orange-700 border-2 border-orange-200 shadow-lg mb-6">
              <Globe className="w-5 h-5 mr-2" />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-semibold">
                Africa's Premier Wholesale Marketplace
              </span>
            </div> */}

            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Connect with
              <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Trusted African Suppliers
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Discover quality products from verified wholesalers and importers
              across Africa. Build lasting business relationships and grow your
              retail business with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-0">
              <button
                onClick={onBrowseProducts}
                className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  Browse Products
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={onSignUpClick}
                className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg"
              >
                Browse Services
              </button>
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">2,500+ Verified Suppliers</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium">Secure Transactions</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-medium">54 African Countries</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Promotional Cards Grid - Amazon/eBay Style */}
        <div className="pb-16">
     
          <div className="grid md:grid-cols-2 gap-6 mb-0">
           
            {/* <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Crown className="w-6 h-6 mr-2" />
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM DEALS
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Electronics Mega Sale
                </h3>
                <p className="text-white/90 mb-4">
                  Latest smartphones, tablets & accessories
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold">40% OFF</span>
                  <div className="text-sm">
                    <div>Starting from $199</div>
                    <div className="opacity-75">Min. order: 50 units</div>
                  </div>
                </div>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Shop Electronics
                </button>
              </div>
            </div> */}

           
            {/* <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <Gift className="w-6 h-6 mr-2" />
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                    NEW ARRIVALS
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Fashion & Textiles</h3>
                <p className="text-white/90 mb-4">
                  Premium African prints & modern fabrics
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold">25% OFF</span>
                  <div className="text-sm">
                    <div>From $8 per yard</div>
                    <div className="opacity-75">Bulk pricing available</div>
                  </div>
                </div>
                <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Shop Fashion
                </button>
              </div>
            </div> */}
          </div>

          {/* Main Promotional Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* Hot Deals Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                    <Fire className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Hot Deals
                    </h3>
                    <p className="text-sm text-gray-600">Limited time offers</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">50%</div>
                  <div className="text-xs text-gray-500">Up to off</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  {
                    image:
                      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "30%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "25%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "40%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "35%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "30%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "25%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "40%",
                  },
                  {
                    image:
                      "https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop",
                    discount: "35%",
                  },
                ].map((deal, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={deal.image}
                      alt="Deal"
                      className="w-full h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      {deal.discount} OFF
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-colors flex items-center justify-center">
                View All Deals
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Top Products Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Top Products
                    </h3>
                    <p className="text-sm text-gray-600">Trending items</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">50K+</div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Samsung Galaxy A54 5G",
                    category: "Electronics",
                    price: "$280-320",
                    image:
                      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "BESTSELLER",
                  },
                  {
                    name: "Ankara Fabric Rolls",
                    category: "Fashion",
                    price: "$8-15",
                    image:
                      "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "NEW",
                  },
                  {
                    name: "Living Room Set",
                    category: "Furniture",
                    price: "$800-1200",
                    image:
                      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "TRENDING",
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div
                        className={`absolute -top-1 -right-1 text-xs px-1 py-0.5 rounded-full font-bold ${
                          product.badge === "BESTSELLER"
                            ? "bg-yellow-500 text-white"
                            : product.badge === "NEW"
                            ? "bg-green-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {product.badge}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.category}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-blue-600">
                      {product.price}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onBrowseProducts}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-colors flex items-center justify-center"
              >
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Top Suppliers Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Top Suppliers
                    </h3>
                    <p className="text-sm text-gray-600">Verified partners</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    2.5K+
                  </div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "AfroTech Imports",
                    location: "Lagos, Nigeria",
                    rating: 4.8,
                    avatar:
                      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "VERIFIED",
                  },
                  {
                    name: "Sahara Fashion Hub",
                    location: "Accra, Ghana",
                    rating: 4.6,
                    avatar:
                      "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "TOP RATED",
                  },
                  {
                    name: "Kigali Home Solutions",
                    location: "Kigali, Rwanda",
                    rating: 4.7,
                    avatar:
                      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
                    badge: "FEATURED",
                  },
                ].map((supplier, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={supplier.avatar}
                        alt={supplier.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div
                        className={`absolute -top-1 -right-1 text-xs px-1 py-0.5 rounded-full font-bold ${
                          supplier.badge === "VERIFIED"
                            ? "bg-green-500 text-white"
                            : supplier.badge === "TOP RATED"
                            ? "bg-yellow-500 text-white"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        ★
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {supplier.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {supplier.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs font-semibold text-gray-700">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onBrowseSuppliers}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors flex items-center justify-center"
              >
                View All Suppliers
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Services Showcase */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Top Services
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional solutions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    24/7
                  </div>
                  <div className="text-xs text-gray-500">Support</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Equipment Rental",
                    description: "Heavy machinery & tools",
                    icon: Settings,
                    price: "From $350/day",
                  },
                  {
                    name: "Bulk Shipping",
                    description: "Freight & logistics",
                    icon: Truck,
                    price: "Custom quotes",
                  },
                  {
                    name: "Trade Support",
                    description: "24/7 customer service",
                    icon: Phone,
                    price: "Free included",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">
                        {service.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {service.description}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-emerald-600">
                      {service.price}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-colors flex items-center justify-center">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Bottom Promotional Strip - eBay Style */}
          <div className="mt-2 grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <Percent className="w-4 h-4 mr-1" />
                    <span className="text-sm font-bold">BULK DISCOUNTS</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Save more on larger orders
                  </p>
                </div>
                <div className="text-2xl font-bold">15%</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <Truck className="w-4 h-4 mr-1" />
                    <span className="text-sm font-bold">FREE SHIPPING</span>
                  </div>
                  <p className="text-sm opacity-90">On orders over $500</p>
                </div>
                <div className="text-lg font-bold">FREE</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-sm font-bold">VERIFIED ONLY</span>
                  </div>
                  <p className="text-sm opacity-90">100% verified suppliers</p>
                </div>
                <div className="text-lg font-bold">✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Promotion Badges */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-orange-200 ">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-gray-900">Live Deals</span>
          </div>
        </div>

        <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full px-4 py-2 shadow-lg">
          <div className="text-xs font-bold">50+ Active Deals</div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path
            d="M0,60 C300,20 600,100 900,60 C1000,40 1100,80 1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;