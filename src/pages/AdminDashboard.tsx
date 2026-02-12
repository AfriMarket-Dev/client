import {
  BarChart3,
  Users,
  Package,
  Zap,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Suppliers", value: "1,234", icon: Users, change: "+12%" },
    { label: "Total Categories", value: "48", icon: Package, change: "+3%" },
    { label: "Total Services", value: "156", icon: Zap, change: "+8%" },
    {
      label: "Total Products",
      value: "5,678",
      icon: BarChart3,
      change: "+24%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "supplier",
      message: "New supplier registered: TechHub Limited",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "product",
      message: "Product review pending: Industrial Pumps",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "service",
      message: "Service created: Express Delivery",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "supplier",
      message: "Supplier verified: Global Exports Ltd",
      time: "2 days ago",
      status: "completed",
    },
  ];

    const getColorStyles = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      default: { bg: "bg-primary/10", text: "text-primary" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
    };
    return colors[color] || colors.default;
  };

  const statsWithColors = stats.map((stat, index) => ({
    ...stat,
    color: ["default", "green", "purple", "blue"][index],
  }));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="opacity-90">
          Here's what's happening on your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsWithColors.map((stat, index) => {
          const Icon = stat.icon;
          const styles = getColorStyles(stat.color);
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${styles.bg}`}>
                  <Icon className={`w-6 h-6 ${styles.text}`} />
                </div>
                <span
                  className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "pending"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      <AlertCircle
                        size={16}
                        className={
                          activity.status === "pending"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      activity.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium py-2 px-4 rounded-lg transition-all">
              Add Service
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
              Add Product
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
              Manage Categories
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
              Review Suppliers
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Health
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Platform Performance
              </span>
              <span className="text-sm text-green-600 font-medium">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                style={{ width: "98%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Database Health
              </span>
              <span className="text-sm text-green-600 font-medium">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                API Response Time
              </span>
              <span className="text-sm text-green-600 font-medium">120ms</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
