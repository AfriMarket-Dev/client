import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, AlertCircle, Eye, Reply, Star, MapPin, Package, DollarSign, Calendar, User, Building } from 'lucide-react';

interface Inquiry {
  id: string;
  customerName: string;
  customerCompany: string;
  customerAvatar: string;
  customerLocation: string;
  productName: string;
  productImage: string;
  message: string;
  requestedQuantity: number;
  budgetRange: { min: number; max: number };
  urgency: 'low' | 'medium' | 'high';
  status: 'new' | 'responded' | 'quoted' | 'closed';
  createdAt: string;
  lastActivity: string;
}

const InquiriesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const [inquiries] = useState<Inquiry[]>([
    {
      id: '1',
      customerName: 'John Kamau',
      customerCompany: 'Nairobi Electronics Ltd',
      customerAvatar: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      customerLocation: 'Nairobi, Kenya',
      productName: 'Samsung Galaxy A54 5G (Bulk Pack)',
      productImage: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      message: 'Hi, I\'m interested in bulk purchasing Samsung Galaxy A54 5G phones for my retail chain. Could you provide pricing for different quantities and delivery terms to Nairobi?',
      requestedQuantity: 100,
      budgetRange: { min: 25000, max: 30000 },
      urgency: 'high',
      status: 'new',
      createdAt: '2 hours ago',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      customerName: 'Sarah Mwangi',
      customerCompany: 'Kigali Fashion House',
      customerAvatar: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      customerLocation: 'Kigali, Rwanda',
      productName: 'Premium Cotton Ankara Fabric Rolls',
      productImage: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=300',
      message: 'We\'re looking for high-quality Ankara fabric for our upcoming collection. Need various patterns and colors. What\'s your best price for bulk orders?',
      requestedQuantity: 200,
      budgetRange: { min: 1500, max: 2500 },
      urgency: 'medium',
      status: 'responded',
      createdAt: '1 day ago',
      lastActivity: '6 hours ago'
    },
    {
      id: '3',
      customerName: 'David Ochieng',
      customerCompany: 'Kampala Home Supplies',
      customerAvatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      customerLocation: 'Kampala, Uganda',
      productName: 'Modern Living Room Furniture Set',
      productImage: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300',
      message: 'I need furniture sets for a new hotel project. Looking for modern, durable pieces. Can you provide a detailed quote with delivery timeline?',
      requestedQuantity: 25,
      budgetRange: { min: 15000, max: 25000 },
      urgency: 'low',
      status: 'quoted',
      createdAt: '3 days ago',
      lastActivity: '1 day ago'
    },
    {
      id: '4',
      customerName: 'Grace Akinyi',
      customerCompany: 'Dar Beauty Salon',
      customerAvatar: 'https://images.pexels.com/photos/5625135/pexels-photo-5625135.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      customerLocation: 'Dar es Salaam, Tanzania',
      productName: 'Korean Skincare Bundle Pack',
      productImage: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=300',
      message: 'Interested in Korean skincare products for my salon. Need authentic products with good margins. What packages do you offer?',
      requestedQuantity: 50,
      budgetRange: { min: 2000, max: 3000 },
      urgency: 'medium',
      status: 'new',
      createdAt: '5 hours ago',
      lastActivity: '5 hours ago'
    }
  ]);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.customerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || inquiry.urgency === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-700';
      case 'responded': return 'bg-blue-100 text-blue-700';
      case 'quoted': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseMessage.trim() && selectedInquiry) {
      console.log('Sending response:', responseMessage);
      setResponseMessage('');
      setSelectedInquiry(null);
    }
  };

  const InquiryModal = () => {
    if (!selectedInquiry) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={selectedInquiry.customerAvatar}
                  alt={selectedInquiry.customerName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-semibold text-gray-900">{selectedInquiry.customerName}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Building className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{selectedInquiry.customerCompany}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{selectedInquiry.customerLocation}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Inquiry Date: {selectedInquiry.createdAt}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Last Activity: {selectedInquiry.lastActivity}</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className={`w-4 h-4 mr-2 ${getUrgencyColor(selectedInquiry.urgency)}`} />
                        <span className={`font-medium capitalize ${getUrgencyColor(selectedInquiry.urgency)}`}>
                          {selectedInquiry.urgency} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Inquiry</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={selectedInquiry.productImage}
                  alt={selectedInquiry.productName}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedInquiry.productName}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-orange-600 mr-2" />
                      <span className="text-gray-600">Quantity: {selectedInquiry.requestedQuantity} units</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-orange-600 mr-2" />
                      <span className="text-gray-600">
                        Budget: ${selectedInquiry.budgetRange.min.toLocaleString()} - ${selectedInquiry.budgetRange.max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Message</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed">{selectedInquiry.message}</p>
              </div>
            </div>

            {/* Response Form */}
            <form onSubmit={handleSendResponse} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Response</h3>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="Type your response to the customer..."
                required
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Inquiries</h2>
        <p className="text-gray-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="responded">Responded</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="font-medium">{filteredInquiries.length}</span>
            <span className="ml-1">inquiries found</span>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map(inquiry => (
          <div key={inquiry.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src={inquiry.customerAvatar}
                  alt={inquiry.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{inquiry.customerName}</h3>
                  <p className="text-sm text-gray-600">{inquiry.customerCompany}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {inquiry.customerLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status.toUpperCase()}
                </span>
                <span className={`text-xs font-medium ${getUrgencyColor(inquiry.urgency)}`}>
                  {inquiry.urgency.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-4">
              <img
                src={inquiry.productImage}
                alt={inquiry.productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">{inquiry.productName}</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Package className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Qty: {inquiry.requestedQuantity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Budget: ${inquiry.budgetRange.min.toLocaleString()} - ${inquiry.budgetRange.max.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    <span>{inquiry.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 text-sm line-clamp-2">{inquiry.message}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Last activity: {inquiry.lastActivity}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedInquiry(inquiry)}
                  className="flex items-center px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button
                  onClick={() => setSelectedInquiry(inquiry)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Respond
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Inquiry Modal */}
      {selectedInquiry && <InquiryModal />}
    </div>
  );
};

export default InquiriesList;