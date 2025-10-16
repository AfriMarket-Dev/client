import React, { useState } from 'react';
import { TrendingUp, Eye, MessageCircle, ShoppingCart, Users, Package, DollarSign, Calendar, ArrowUp, ArrowDown, BarChart3, PieChart, Activity, Target, Clock, Star } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeChart, setActiveChart] = useState<'inquiries' | 'views' | 'conversion'>('inquiries');

  const stats = [
    {
      label: 'Total Views',
      value: '12,456',
      change: '+23.5%',
      trend: 'up',
      icon: Eye,
      color: 'blue',
      description: 'Profile and product views'
    },
    {
      label: 'Product Inquiries',
      value: '342',
      change: '+12.3%',
      trend: 'up',
      icon: MessageCircle,
      color: 'green',
      description: 'Customer inquiries received'
    },
    {
      label: 'Conversion Rate',
      value: '8.7%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange',
      description: 'Views to inquiries ratio'
    },
    {
      label: 'Response Rate',
      value: '94.2%',
      change: '-1.2%',
      trend: 'down',
      icon: Activity,
      color: 'purple',
      description: 'Inquiry response rate'
    }
  ];

  const topProducts = [
    {
      name: 'Samsung Galaxy A54 5G',
      views: 2456,
      inquiries: 45,
      conversionRate: 12.3,
      revenue: 15600,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Wireless Bluetooth Earbuds',
      views: 1890,
      inquiries: 38,
      conversionRate: 9.8,
      revenue: 12400,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Premium Cotton Ankara Fabric',
      views: 1567,
      inquiries: 29,
      conversionRate: 8.2,
      revenue: 8900,
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Modern Living Room Set',
      views: 1234,
      inquiries: 22,
      conversionRate: 7.1,
      revenue: 18500,
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const chartData = {
    inquiries: [
      { month: 'Jan', value: 45, secondary: 42 },
      { month: 'Feb', value: 52, secondary: 48 },
      { month: 'Mar', value: 48, secondary: 46 },
      { month: 'Apr', value: 61, secondary: 58 },
      { month: 'May', value: 55, secondary: 52 },
      { month: 'Jun', value: 67, secondary: 63 }
    ],
    views: [
      { month: 'Jan', value: 1200, secondary: 980 },
      { month: 'Feb', value: 1450, secondary: 1200 },
      { month: 'Mar', value: 1380, secondary: 1150 },
      { month: 'Apr', value: 1650, secondary: 1400 },
      { month: 'May', value: 1580, secondary: 1320 },
      { month: 'Jun', value: 1820, secondary: 1560 }
    ],
    conversion: [
      { month: 'Jan', value: 6.2, secondary: 5.8 },
      { month: 'Feb', value: 7.1, secondary: 6.5 },
      { month: 'Mar', value: 6.8, secondary: 6.2 },
      { month: 'Apr', value: 8.3, secondary: 7.9 },
      { month: 'May', value: 7.9, secondary: 7.4 },
      { month: 'Jun', value: 8.7, secondary: 8.2 }
    ]
  };

  const categoryPerformance = [
    { category: 'Electronics', percentage: 45, value: 156, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { category: 'Fashion & Textiles', percentage: 25, value: 87, color: 'bg-green-500', textColor: 'text-green-600' },
    { category: 'Home & Garden', percentage: 20, value: 69, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { category: 'Beauty & Health', percentage: 10, value: 35, color: 'bg-purple-500', textColor: 'text-purple-600' }
  ];

  const recentActivities = [
    { 
      type: 'view', 
      message: 'Samsung Galaxy A54 5G viewed by John Kamau from Nairobi Electronics', 
      time: '2 hours ago',
      icon: Eye,
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      type: 'inquiry', 
      message: 'New inquiry for Wireless Earbuds from Sarah Mwangi (Kigali Fashion)', 
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-green-600 bg-green-100'
    },
    { 
      type: 'response', 
      message: 'Responded to David Ochieng\'s furniture inquiry with custom quote', 
      time: '6 hours ago',
      icon: Activity,
      color: 'text-orange-600 bg-orange-100'
    },
    { 
      type: 'view', 
      message: 'Ankara Fabric collection viewed 15 times from 8 different customers', 
      time: '8 hours ago',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const getCurrentChartData = () => chartData[activeChart];
  const getMaxValue = () => Math.max(...getCurrentChartData().map(d => Math.max(d.value, d.secondary)));

  const getChartLabels = () => {
    switch (activeChart) {
      case 'inquiries': return { primary: 'Inquiries', secondary: 'Responses' };
      case 'views': return { primary: 'Profile Views', secondary: 'Product Views' };
      case 'conversion': return { primary: 'Conversion Rate', secondary: 'Industry Average' };
      default: return { primary: 'Primary', secondary: 'Secondary' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Calendar className="w-4 h-4 text-gray-500 mx-2" />
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'text-green-700 bg-green-100' 
                  : 'text-red-700 bg-red-100'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Performance Trends</h3>
            <div className="flex items-center space-x-2">
              {[
                { id: 'inquiries', label: 'Inquiries', icon: MessageCircle },
                { id: 'views', label: 'Views', icon: Eye },
                { id: 'conversion', label: 'Conversion', icon: TrendingUp }
              ].map(chart => (
                <button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id as any)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeChart === chart.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <chart.icon className="w-4 h-4 mr-1" />
                  {chart.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">{getChartLabels().primary}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">{getChartLabels().secondary}</span>
            </div>
          </div>
          
          {/* Chart Container */}
          <div className="relative">
            <div className="h-80 flex items-end justify-between space-x-4 px-4">
              {getCurrentChartData().map((data, index) => {
                const maxValue = getMaxValue();
                const primaryHeight = (data.value / maxValue) * 280;
                const secondaryHeight = (data.secondary / maxValue) * 280;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-center space-x-1 mb-3">
                      {/* Primary Bar */}
                      <div className="relative group">
                        <div 
                          className="w-8 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-500 hover:from-orange-600 hover:to-orange-500"
                          style={{ height: `${primaryHeight}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.value}
                        </div>
                      </div>
                      
                      {/* Secondary Bar */}
                      <div className="relative group">
                        <div 
                          className="w-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500"
                          style={{ height: `${secondaryHeight}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.secondary}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 mt-2">{data.month}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>{getMaxValue()}</span>
              <span>{Math.round(getMaxValue() * 0.75)}</span>
              <span>{Math.round(getMaxValue() * 0.5)}</span>
              <span>{Math.round(getMaxValue() * 0.25)}</span>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Category Performance Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Category Performance</h3>
          
          {/* Pie Chart Visualization */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {categoryPerformance.map((category, index) => {
                const startAngle = categoryPerformance.slice(0, index).reduce((sum, cat) => sum + (cat.percentage * 3.6), 0);
                const endAngle = startAngle + (category.percentage * 3.6);
                const largeArcFlag = category.percentage > 50 ? 1 : 0;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={category.color.replace('bg-', '').replace('-500', '')}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    style={{
                      fill: category.color === 'bg-blue-500' ? '#3b82f6' :
                            category.color === 'bg-green-500' ? '#10b981' :
                            category.color === 'bg-orange-500' ? '#f97316' :
                            '#a855f7'
                    }}
                  />
                );
              })}
              <circle cx="50" cy="50" r="20" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
          
          {/* Category Legend */}
          <div className="space-y-3">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${category.color} rounded-full mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${category.textColor}`}>{category.percentage}%</div>
                  <div className="text-xs text-gray-500">{category.value} inquiries</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performing Products */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top Performing Products</h3>
            <div className="flex items-center text-sm text-gray-500">
              <BarChart3 className="w-4 h-4 mr-1" />
              Last 30 days
            </div>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-gray-500">Views:</span>
                      <div className="font-semibold text-blue-600">{product.views.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Inquiries:</span>
                      <div className="font-semibold text-green-600">{product.inquiries}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Conv.:</span>
                      <div className="font-semibold text-orange-600">{product.conversionRate}%</div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-gray-900">#{index + 1}</div>
                  <div className="text-xs text-gray-500">${product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Live updates
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All Activities
            </button>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-white/20 rounded-xl mr-4">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Performance Summary</h3>
                <p className="opacity-90">Your business is performing excellently this month!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">94.2%</div>
                <div className="text-sm opacity-90">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">8.7%</div>
                <div className="text-sm opacity-90">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">4.8/5</div>
                <div className="text-sm opacity-90">Avg. Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">+23.5%</div>
                <div className="text-sm opacity-90">Growth Rate</div>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <div className="bg-white/20 rounded-2xl p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-3" />
              <div className="text-lg font-bold">Top Performer</div>
              <div className="text-sm opacity-90">Electronics Category</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Add New Product', icon: Package, color: 'from-blue-500 to-blue-600' },
          { label: 'View Messages', icon: MessageCircle, color: 'from-green-500 to-green-600' },
          { label: 'Check Inquiries', icon: Users, color: 'from-purple-500 to-purple-600' },
          { label: 'Update Profile', icon: Activity, color: 'from-orange-500 to-orange-600' }
        ].map((action, index) => (
          <button
            key={index}
            className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <action.icon className="w-5 h-5 mx-auto mb-2" />
            <div className="text-sm">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;