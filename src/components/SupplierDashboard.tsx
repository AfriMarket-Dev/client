import React, { useState } from "react";
import {
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  Eye,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  BadgeCheck,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import ProductManagement from "./supplier/ProductManagement";
import MessageCenter from "./supplier/MessageCenter";
import InquiriesList from "./supplier/InquiriesList";
import AnalyticsDashboard from "./supplier/AnalyticsDashboard";
import ProfileSettings from "./supplier/ProfileSettings";

interface SupplierDashboardProps {
  onLogout: () => void;
  supplierData: any;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({
  onLogout,
  supplierData,
}) => {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "products"
    | "messages"
    | "inquiries"
    | "analytics"
    | "settings"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "inquiries", label: "Inquiries Queue", icon: Bell },
    { id: "messages", label: "Messages & Quotes", icon: MessageSquare },
    { id: "products", label: "My Listings", icon: Package },
    { id: "analytics", label: "Performance", icon: TrendingUp },
    { id: "settings", label: "Profile & Verification", icon: Settings },
  ];

  const stats = [
    {
      label: "Active Listings",
      value: "45",
      icon: Package,
      change: "+2 this week",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Pending Inquiries",
      value: "8",
      icon: Bell,
      change: "3 urgent",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Open Quotes",
      value: "12",
      icon: FileText,
      change: "RWF 4.5M value",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Profile Views",
      value: "1.2k",
      icon: Eye,
      change: "+15% vs last mo",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  const recentActivities = [
    {
      type: "inquiry",
      message: "New inquiry from Kigali Modern Builders for Cement",
      time: "2 hours ago",
      status: "new",
    },
    {
      type: "quote",
      message: "Quote #Q-2024-001 accepted by Jean-Paul",
      time: "4 hours ago",
      status: "success",
    },
    {
      type: "system",
      message: "Weekly performance report is ready",
      time: "1 day ago",
      status: "info",
    },
  ];

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-stone-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">
                Provider
              </h1>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all ${
                activeTab === item.id
                  ? "bg-white text-stone-900 shadow-lg"
                  : "text-stone-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? "text-primary" : "opacity-70"}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl mb-4">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                className="w-10 h-10 rounded-xl object-cover"
                alt=""
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-stone-900"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">{supplierData?.name || "Supplier"}</p>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                <BadgeCheck className="w-3 h-3" /> Verified
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const OverviewContent = () => (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-stone-900 mb-2">Overview</h1>
          <p className="text-stone-500 font-medium">Welcome back! Here's your business performance today.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
          <Package className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-stone-200 shadow-sm hover:shadow-md transition-shadow rounded-3xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <Badge variant="outline" className="border-stone-100 bg-stone-50 text-stone-500 font-bold">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-3xl font-black text-stone-900 mb-1">{stat.value}</p>
              <p className="text-sm font-bold text-stone-500 uppercase tracking-wide">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-stone-200 shadow-sm rounded-3xl bg-white">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-stone-900">Recent Activity</h3>
            <Button variant="ghost" className="text-primary font-bold">View All</Button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-stone-100">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-6 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === 'inquiry' ? 'bg-amber-100 text-amber-600' :
                    activity.type === 'quote' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'inquiry' ? <Bell className="w-5 h-5" /> :
                     activity.type === 'quote' ? <FileText className="w-5 h-5" /> :
                     <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 mb-1">{activity.message}</p>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wide">{activity.time}</p>
                  </div>
                  {activity.status === 'new' && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips Card */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 african-pattern opacity-10 invert" />
          <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">Boost Your Visibility</h3>
              <p className="text-stone-400 text-sm font-medium leading-relaxed mb-6">
                Suppliers who respond to inquiries within 1 hour get 3x more quote requests.
              </p>
            </div>
            <Button className="w-full bg-white text-stone-900 hover:bg-stone-100 font-bold h-12 rounded-xl">
              Check Response Time
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <Sidebar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-stone-200 lg:hidden p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-stone-600">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-stone-900">Supplier Dashboard</span>
          </div>
          <div className="w-8 h-8 bg-stone-200 rounded-full overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
              className="w-full h-full object-cover" 
              alt="" 
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === "overview" && <OverviewContent />}
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "messages" && <MessageCenter role="provider" />}
          {activeTab === "inquiries" && <InquiriesList />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "settings" && <ProfileSettings supplierData={supplierData} />}
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
