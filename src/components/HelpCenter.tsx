import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Phone, Mail, Book, Users, Package, CreditCard, Truck, Shield, Star, ChevronDown, ChevronRight, ExternalLink, Clock, CheckCircle } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      description: 'Learn the basics of using AfrikaMarket',
      color: 'from-blue-500 to-cyan-500',
      articles: 12
    },
    {
      id: 'suppliers',
      title: 'For Suppliers',
      icon: Users,
      description: 'Everything suppliers need to know',
      color: 'from-green-500 to-emerald-500',
      articles: 18
    },
    {
      id: 'buyers',
      title: 'For Buyers',
      icon: Package,
      description: 'Guide for retailers and buyers',
      color: 'from-orange-500 to-amber-500',
      articles: 15
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: CreditCard,
      description: 'Payment methods and billing info',
      color: 'from-purple-500 to-pink-500',
      articles: 8
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: Truck,
      description: 'Shipping options and delivery info',
      color: 'from-indigo-500 to-blue-500',
      articles: 10
    },
    {
      id: 'security',
      title: 'Security & Trust',
      icon: Shield,
      description: 'Safety and security measures',
      color: 'from-red-500 to-pink-500',
      articles: 6
    }
  ];

  const faqs = [
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I create an account on AfrikaMarket?',
      answer: 'Creating an account is simple! Click on "Sign Up" in the top right corner, choose whether you\'re a supplier or buyer, fill in your details, and verify your email address. For suppliers, we\'ll also need to verify your business credentials.'
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'Is AfrikaMarket free to use?',
      answer: 'Yes! Creating an account and browsing products is completely free. Suppliers can list their first 10 products for free, with premium features available for expanded listings and enhanced visibility.'
    },
    {
      id: '3',
      category: 'suppliers',
      question: 'How do I get verified as a supplier?',
      answer: 'To get verified, you\'ll need to provide: business registration documents, tax identification number, proof of address, and product samples or certifications. Our verification team reviews applications within 3-5 business days.'
    },
    {
      id: '4',
      category: 'suppliers',
      question: 'How do I add products to my catalog?',
      answer: 'Go to your supplier dashboard, click "Product Management", then "Add New Product". Fill in product details, upload high-quality images, set your pricing tiers and minimum order quantities, then publish your listing.'
    },
    {
      id: '5',
      category: 'buyers',
      question: 'How do I find reliable suppliers?',
      answer: 'Look for the "Verified" badge on supplier profiles, check their ratings and reviews, review their business credentials, and start with smaller orders to test quality and reliability before placing larger orders.'
    },
    {
      id: '6',
      category: 'buyers',
      question: 'Can I negotiate prices with suppliers?',
      answer: 'Absolutely! Most suppliers are open to price negotiations, especially for bulk orders. Use our messaging system to discuss pricing, or submit a formal inquiry with your requirements for a custom quote.'
    },
    {
      id: '7',
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We support various payment methods including bank transfers, letters of credit, mobile money (in supported countries), and major credit cards. Payment methods may vary by supplier and region.'
    },
    {
      id: '8',
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption and work with certified payment processors. We never store your complete payment information on our servers, and all transactions are monitored for security.'
    },
    {
      id: '9',
      category: 'shipping',
      question: 'How does shipping work?',
      answer: 'Shipping is arranged between you and the supplier. Most suppliers offer multiple shipping options including air freight, sea freight, and express delivery. Shipping costs and timeframes vary by location and method.'
    },
    {
      id: '10',
      category: 'shipping',
      question: 'Can I track my shipment?',
      answer: 'Yes! Once your order ships, the supplier will provide tracking information. You can monitor your shipment\'s progress through your dashboard or directly with the shipping carrier.'
    }
  ];

  const popularArticles = [
    {
      title: 'Complete Guide to Wholesale Buying on AfrikaMarket',
      category: 'Buyers Guide',
      readTime: '8 min read',
      views: '2.3k views'
    },
    {
      title: 'How to Verify Supplier Credentials',
      category: 'Safety Tips',
      readTime: '5 min read',
      views: '1.8k views'
    },
    {
      title: 'Setting Up Your Supplier Profile for Success',
      category: 'Supplier Guide',
      readTime: '12 min read',
      views: '1.5k views'
    },
    {
      title: 'Understanding Minimum Order Quantities (MOQ)',
      category: 'Trading Basics',
      readTime: '6 min read',
      views: '1.2k views'
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri, 8AM-6PM WAT',
      action: 'Call Now',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 mt-1">Find answers to your questions and get support</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl text-white mb-6">
            <HelpCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Search our knowledge base or browse categories to find the answers you need.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-32">
              <h3 className="font-semibold text-gray-900 mb-4">Browse by Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      selectedCategory === category.id ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Categories Grid */}
            {!selectedCategory && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Help Topics</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center text-orange-600 text-sm font-medium">
                        <span>{category.articles} articles</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Articles */}
            {!selectedCategory && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {article.readTime}
                            </div>
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.title} FAQs` : 'Frequently Asked Questions'}
              </h2>
              <div className="bg-white rounded-xl border border-gray-100">
                {filteredFAQs.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredFAQs.map(faq => (
                      <div key={faq.id} className="p-6">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedFAQ === faq.id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Still need help?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {contactOptions.map((option, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl text-white mb-4`}>
                      <option.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                    <p className="text-gray-500 text-xs mb-4">{option.availability}</p>
                    <button className={`w-full bg-gradient-to-r ${option.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}>
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-8 text-white">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pro Tips for Success</h3>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      Always verify supplier credentials before placing large orders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      Use our messaging system to negotiate better prices for bulk orders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      Read reviews and ratings from other buyers before making decisions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      Keep your profile updated to build trust with trading partners
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;