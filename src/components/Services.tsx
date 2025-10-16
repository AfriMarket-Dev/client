import React from 'react';
import { Shield, Truck, CreditCard, Users, Globe, Headphones, Award, TrendingUp, Package, Search, MessageCircle, CheckCircle } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: 'Verified Suppliers',
      description: 'All our suppliers undergo rigorous verification processes to ensure authenticity, quality, and reliability for your business.',
      features: ['Identity verification', 'Business license validation', 'Quality assurance checks', 'Regular performance monitoring'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find the right suppliers quickly with our comprehensive search and filtering system based on your specific needs.',
      features: ['Category-based filtering', 'Location-based search', 'Supplier specialties filtering', 'Advanced search options'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Truck,
      title: 'Supplier Services Info',
      description: 'Access detailed information about each supplier\'s shipping options, delivery times, and service capabilities.',
      features: ['Shipping options display', 'Delivery timeframes', 'Service area coverage', 'Minimum order details'],
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50'
    },
    {
      icon: Users,
      title: 'Direct Connection',
      description: 'Connect directly with suppliers without intermediaries. Build relationships and negotiate terms that work for your business.',
      features: ['Direct supplier contact', 'Business relationship building', 'Negotiation facilitation', 'Long-term partnerships'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Seamless communication tools including chat, video calls, and inquiry forms to connect directly with suppliers.',
      features: ['Inquiry forms', 'Contact information access', 'WhatsApp integration', 'Email communication'],
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support in multiple languages to assist with any questions or issues.',
      features: ['Multilingual support', 'Live chat assistance', 'Phone support', 'Email support'],
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50'
    }
  ];

  const stats = [
    { icon: Users, value: '2,500+', label: 'Verified Suppliers', color: 'text-orange-600' },
    { icon: Package, value: '50K+', label: 'Products Available', color: 'text-blue-600' },
    { icon: Globe, value: '54', label: 'African Countries', color: 'text-green-600' },
    { icon: TrendingUp, value: '98%', label: 'Connection Success', color: 'text-purple-600' }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="services-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <polygon points="60,20 80,40 60,60 40,40" fill="currentColor" opacity="0.3"/>
              <circle cx="60" cy="60" r="10" fill="currentColor" opacity="0.2"/>
              <path d="M30,30 L50,50 M70,30 L90,50 M30,70 L50,90 M70,70 L90,90" stroke="currentColor" strokeWidth="2" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-pattern)" className="text-orange-600"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-sm font-medium text-orange-700 border border-orange-200 mb-6">
            <Award className="w-4 h-4 mr-2" />
            Our Services
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Solutions for
            <span className="relative ml-3">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                African Trade
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12">
                <path d="M5,6 Q150,1 295,6" stroke="url(#services-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="services-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="50%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#eab308"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From supplier verification to direct connections, we provide comprehensive solutions 
            that make finding and connecting with wholesale suppliers across Africa seamless and efficient.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${
                  index === 0 ? 'from-orange-500 to-amber-500' :
                  index === 1 ? 'from-blue-500 to-cyan-500' :
                  index === 2 ? 'from-green-500 to-emerald-500' :
                  'from-purple-500 to-pink-500'
                } rounded-2xl mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${service.bgColor} rounded-3xl p-8 border border-orange-100/50 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl group overflow-hidden transform hover:-translate-y-2`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* African-inspired background pattern for each card */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 128 128" className="w-full h-full text-orange-500">
                  <pattern id={`service-pattern-${index}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <polygon points="16,4 28,16 16,28 4,16" fill="currentColor" opacity="0.3"/>
                    <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                  </pattern>
                  <rect width="128" height="128" fill={`url(#service-pattern-${index})`}/>
                </svg>
              </div>
              
              {/* Floating geometric decoration */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-400 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl text-white group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-10 h-10" />
                  </div>
                  {/* Small decorative element */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <polygon points="20,5 35,20 20,35 5,20" fill="currentColor" opacity="0.5"/>
                  <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" className="text-white"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses who trust AfrikaMarket to connect with reliable suppliers. 
              Start building valuable business relationships today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
      <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-amber-200 to-yellow-200 transform rotate-45 opacity-20 translate-x-12"></div>
    </section>
  );
};

export default Services;