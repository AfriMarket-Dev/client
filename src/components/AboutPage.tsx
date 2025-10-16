import React from 'react';
import { ArrowLeft, Globe, Target, Eye, Users, Award, TrendingUp, Heart, Shield, Handshake, Star, CheckCircle, MapPin, Calendar, Building } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const stats = [
    { icon: Users, value: '2,500+', label: 'Verified Suppliers', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, value: '54', label: 'African Countries', color: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, value: '50K+', label: 'Products Available', color: 'from-orange-500 to-amber-500' },
    { icon: Award, value: '98%', label: 'Success Rate', color: 'from-purple-500 to-pink-500' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We verify every supplier and ensure transparent business practices across our platform.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Handshake,
      title: 'Partnership Focus',
      description: 'Building lasting business relationships between suppliers and retailers across Africa.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Supporting African businesses to grow and thrive in the global marketplace.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Innovation & Growth',
      description: 'Leveraging technology to create opportunities and drive economic growth.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const team = [
    {
      name: 'Amara Okafor',
      position: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former McKinsey consultant with 15+ years in African trade and commerce.',
      location: 'Lagos, Nigeria'
    },
    {
      name: 'Kwame Asante',
      position: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Tech entrepreneur who built successful fintech platforms across West Africa.',
      location: 'Accra, Ghana'
    },
    {
      name: 'Fatima Al-Rashid',
      position: 'Head of Operations',
      image: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Supply chain expert with deep knowledge of African logistics and trade.',
      location: 'Cairo, Egypt'
    },
    {
      name: 'Thandiwe Mthembu',
      position: 'Head of Business Development',
      image: 'https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Business strategist focused on expanding trade relationships across Southern Africa.',
      location: 'Cape Town, South Africa'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'AfrikaMarket Founded',
      description: 'Started with a vision to connect African businesses and promote intra-African trade.'
    },
    {
      year: '2021',
      title: 'First 100 Suppliers',
      description: 'Reached our first milestone of 100 verified suppliers across 10 African countries.'
    },
    {
      year: '2022',
      title: 'Platform Expansion',
      description: 'Expanded to 25 countries and launched advanced features for better supplier-buyer matching.'
    },
    {
      year: '2023',
      title: 'Major Growth',
      description: 'Achieved 1,000+ suppliers and facilitated over $50M in trade volume.'
    },
    {
      year: '2024',
      title: 'Continental Reach',
      description: 'Now serving 54 African countries with 2,500+ verified suppliers and growing.'
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">About AfrikaMarket</h1>
            <p className="text-gray-600 mt-1">Connecting Africa through trade and commerce</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="about-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <polygon points="60,20 90,50 60,80 30,50" fill="currentColor" opacity="0.4"/>
                <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M30,30 L90,90 M90,30 L30,90" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-pattern)" className="text-orange-600"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-orange-700 border-2 border-orange-200 shadow-lg mb-8">
            <Globe className="w-5 h-5 mr-2" />
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-semibold">
              Empowering African Commerce
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Building Africa's
            <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Digital Marketplace
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            AfrikaMarket is more than a platform – we're a movement dedicated to transforming 
            African commerce by connecting verified suppliers with retailers across the continent, 
            fostering economic growth and building lasting business relationships.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl text-white mb-4 mx-auto`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl text-white mr-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To revolutionize African commerce by creating a trusted, transparent, and efficient 
                  digital marketplace that connects verified suppliers with retailers across the continent, 
                  enabling businesses to grow, thrive, and contribute to Africa's economic transformation.
                </p>
                <div className="space-y-3">
                  {[
                    'Connect verified suppliers with quality retailers',
                    'Facilitate transparent and secure business transactions',
                    'Support African businesses in scaling their operations',
                    'Promote intra-African trade and economic integration'
                  ].map((point, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white mr-4">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To become Africa's leading wholesale marketplace, where every business – from small 
                  retailers to large enterprises – can easily discover, connect with, and trade with 
                  trusted suppliers, driving sustainable economic growth across the continent.
                </p>
                <div className="space-y-3">
                  {[
                    'Be the go-to platform for African wholesale trade',
                    'Foster a community of successful African businesses',
                    'Drive digital transformation in African commerce',
                    'Create lasting economic impact across all 54 countries'
                  ].map((point, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve the African business community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl text-white mb-4`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders from across Africa, united by a shared vision of transforming African commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.position}</p>
                <div className="flex items-center justify-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to Africa's premier wholesale marketplace – here's how we've grown.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="text-2xl font-bold text-orange-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join the AfrikaMarket Community</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Whether you're a supplier looking to expand your reach or a retailer seeking quality products, 
            AfrikaMarket is your gateway to African commerce success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Become a Supplier
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;