import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  MessageSquare,
} from "lucide-react";

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const customers = [
    {
      id: 1,
      name: "ABC Trading Co.",
      email: "contact@abctrading.com",
      phone: "+234-123-456-7890",
      location: "Lagos, Nigeria",
      joinDate: "2024-01-15",
      status: "active",
      orders: 24,
      totalSpent: "$18,500",
      rating: 4.8,
      avatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Global Imports Ltd",
      email: "info@globalimports.com",
      phone: "+256-987-654-3210",
      location: "Kampala, Uganda",
      joinDate: "2023-11-22",
      status: "active",
      orders: 18,
      totalSpent: "$14,200",
      rating: 4.6,
      avatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Retail Solutions",
      email: "support@retailsol.com",
      phone: "+233-555-123-4567",
      location: "Accra, Ghana",
      joinDate: "2024-02-01",
      status: "active",
      orders: 31,
      totalSpent: "$24,800",
      rating: 4.9,
      avatar:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Fashion Hub Africa",
      email: "hello@fashionhub.com",
      phone: "+27-123-456-7890",
      location: "Cape Town, South Africa",
      joinDate: "2023-10-10",
      status: "inactive",
      orders: 12,
      totalSpent: "$8,600",
      rating: 4.5,
      avatar:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: 5,
      name: "Tech Distributors",
      email: "sales@techdist.com",
      phone: "+254-789-456-1230",
      location: "Nairobi, Kenya",
      joinDate: "2024-01-05",
      status: "active",
      orders: 27,
      totalSpent: "$21,900",
      rating: 4.7,
      avatar:
        "https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Customers Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and view all customers on the platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Customers
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {customers.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {customers.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {customers.reduce((sum, c) => sum + c.orders, 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Rating</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {(
                  customers.reduce((sum, c) => sum + c.rating, 0) /
                  customers.length
                ).toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </p>
                        <a
                          href={`mailto:${customer.email}`}
                          className="text-xs text-orange-600 hover:text-orange-700"
                        >
                          {customer.email}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <MapPin size={14} className="text-gray-500" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.orders}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.totalSpent}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <p className="text-sm font-medium text-gray-900">
                        {customer.rating}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status.charAt(0).toUpperCase() +
                        customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded transition-colors">
                        <Eye size={16} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-amber-50 rounded transition-colors">
                        <Edit size={16} className="text-amber-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors">
            1
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
