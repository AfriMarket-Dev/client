import React from 'react';
import { Search, Users, Handshake, TrendingUp, ArrowRight, CheckCircle, Star, Globe } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover Suppliers',
      description: 'Browse through thousands of verified wholesalers and importers across Africa. Use our advanced filters to find exactly what you need.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      accentColor: 'blue'
    },
    {
      icon: Users,
      title: 'Connect & Communicate',
      description: 'Reach out directly to suppliers through our platform. Ask questions, request samples, and negotiate terms that work for your business.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      accentColor: 'green'
    },
    {
      icon: Handshake,
      title: 'Build Relationships',
      description: 'Establish long-term partnerships with reliable suppliers. Our platform facilitates secure connections and ongoing communication.',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50',
      accentColor: 'orange'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Scale your operations with consistent supply chains. Access better pricing through bulk orders and exclusive supplier deals.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      accentColor: 'purple'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* Enhanced African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="how-it-works-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <polygon points="60,20 90,50 60,80 30,50" fill="currentColor" opacity="0.4"/>
              <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <path d="M30,30 L90,90 M90,30 L30,90" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
              <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.6"/>
              <circle cx="90" cy="30" r="3" fill="currentColor" opacity="0.6"/>
              <circle cx="30" cy="90" r="3" fill="currentColor" opacity="0.6"/>
              <circle cx="90" cy="90" r="3" fill="currentColor" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#how-it-works-pattern)" className="text-orange-600"/>
        </svg>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-full text-sm font-semibold text-orange-700 border-2 border-orange-200/50 mb-8 shadow-lg backdrop-blur-sm">
            <Globe className="w-5 h-5 mr-3" />
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Simple Process, Powerful Results
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            How It
            <span className="relative ml-4">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Works
              </span>
              <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 200 16">
                <path d="M5,8 Q100,2 195,8" stroke="url(#works-gradient)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="works-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="50%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#eab308"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connect with trusted African suppliers in four simple steps. Our streamlined process 
            makes it easy to find, connect, and build lasting business relationships.
          </p>
        </div>

        {/* Enhanced Steps Grid */}
        <div className="relative">
          {/* Connection Lines - Desktop Only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 to-purple-200 transform -translate-y-1/2 rounded-full opacity-60"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Step Card */}
                <div className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-8 border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm`}>
                  {/* African-inspired corner decorations */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-orange-300/50 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-orange-300/50 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-orange-300/50 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-orange-300/50 rounded-br-3xl"></div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-white to-gray-100 border-4 border-orange-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <step.icon className="w-10 h-10" />
                    </div>
                    
                    {/* Floating accent elements */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${step.color} rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300`}></div>
                    <div className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${step.color} rounded-full opacity-40 group-hover:scale-150 transition-transform duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {step.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-${step.accentColor}-700 border border-${step.accentColor}-200/50 shadow-sm`}>
                        <CheckCircle className={`w-3 h-3 mr-2 text-${step.accentColor}-500`} />
                        Step {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Connection Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-orange-200 group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <pattern id="cta-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <polygon points="25,5 45,25 25,45 5,25" fill="currentColor" opacity="0.6"/>
                    <circle cx="25" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.8"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-pattern)" className="text-white"/>
              </svg>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 border border-white/30 mb-6">
                <Star className="w-4 h-4 mr-2" />
                Join Thousands of Successful Businesses
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform Your Business?
              </h3>
              
              <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful retailers who have transformed their businesses 
                through our marketplace. Start connecting with suppliers today and unlock new opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center">
                  Browse Suppliers Now
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Register as Supplier
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="flex items-center text-white/90">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">2,500+ Verified Suppliers</span>
                </div>
                <div className="flex items-center text-white/90">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">50K+ Products Available</span>
                </div>
                <div className="flex items-center text-white/90">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">98% Connection Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;