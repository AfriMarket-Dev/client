import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Settings,
  BarChart3,
  Package,
  Zap,
  Users,
  ShoppingCart,
  Bell,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { useSignOutMutation } from "@/app/api/auth";
import { logout } from "@/app/features/authSlice";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [signOut] = useSignOutMutation();

  const notifications = [
    { id: 1, message: "New supplier registration", time: "5 min ago" },
    { id: 2, message: "New product inquiry", time: "10 min ago" },
    { id: 3, message: "Customer support ticket", time: "1 hour ago" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch {}
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: BarChart3,
    },
    {
      label: "Suppliers",
      path: "/admin/suppliers",
      icon: Users,
    },
    {
      label: "Customers",
      path: "/admin/customers",
      icon: ShoppingCart,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: Package,
    },
    {
      label: "Services",
      path: "/admin/services",
      icon: Zap,
    },
    {
      label: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "Profile Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                AfriMarket
              </h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@afrimarket.com"}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 mt-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between h-16">
          <h2 className="text-2xl font-bold text-gray-900">
            {menuItems.find((item) => isActive(item.path))?.label ||
              "Dashboard"}
          </h2>
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all relative"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <p className="text-sm text-gray-900 font-medium">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@afrimarket.com"}
                </p>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => navigate("/admin/settings")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
