import React, { useState } from 'react';
import { Package, MessageCircle, BarChart3, Settings, Plus, Edit, Eye, Search, Filter, Grid, List, Star, TrendingUp, Users, ShoppingCart, Bell, LogOut, Menu, X } from 'lucide-react';
import ProductManagement from './supplier/ProductManagement';
import MessageCenter from './supplier/MessageCenter';
import InquiriesList from './supplier/InquiriesList';
import AnalyticsDashboard from './supplier/AnalyticsDashboard';
import ProfileSettings from './supplier/ProfileSettings';

interface SupplierDashboardProps {
  onLogout: () => void;
  supplierData: any;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ onLogout, supplierData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'messages' | 'inquiries' | 'analytics' | 'settings'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'messages', label: 'Message Center', icon: MessageCircle },
    { id: 'inquiries', label: 'Inquiries', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Profile Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Products', value: '245', change: '+12%', icon: Package, color: 'blue' },
    { label: 'Active Inquiries', value: '18', change: '+5%', icon: MessageCircle, color: 'green' },
    { label: 'Profile Views', value: '1,234', change: '+23%', icon: Eye, color: 'purple' },
    { label: 'Conversion Rate', value: '12.5%', change: '+2.1%', icon: TrendingUp, color: 'orange' }
  ];

  const recentActivities = [
    { type: 'inquiry', message: 'New inquiry for Samsung Galaxy A54 5G', time: '2 hours ago', status: 'new' },
    { type: 'message', message: 'Message from Kigali Electronics Ltd', time: '4 hours ago', status: 'unread' },
    { type: 'product', message: 'Product "Wireless Earbuds" updated', time: '1 day ago', status: 'completed' },
    { type: 'inquiry', message: 'Quote request for bulk order', time: '2 days ago', status: 'responded' }
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            AfrikaMarket
          </h2>
          <p className="text-xs text-gray-500">Supplier Dashboard</p>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {supplierData?.name || 'Supplier'}!</h1>
        <p className="opacity-90">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'inquiry' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'message' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'inquiry' ? <Bell className="w-4 h-4" /> :
                   activity.type === 'message' ? <MessageCircle className="w-4 h-4" /> :
                   <Package className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'new' ? 'bg-red-100 text-red-700' :
                  activity.status === 'unread' ? 'bg-yellow-100 text-yellow-700' :
                  activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 mr-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {activeTab === 'overview' ? 'Dashboard' : activeTab.replace('-', ' ')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{supplierData?.name || 'Supplier'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && <OverviewContent />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'messages' && <MessageCenter />}
          {activeTab === 'inquiries' && <InquiriesList />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'settings' && <ProfileSettings supplierData={supplierData} />}
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;