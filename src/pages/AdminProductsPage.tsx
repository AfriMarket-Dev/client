import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, Package } from "lucide-react";

interface PlatformProduct {
  id: string;
  name: string;
  category: string;
  supplier: string;
  status: "active" | "inactive" | "pending-review";
  createdDate: string;
  views: number;
  inquiries: number;
}

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "pending-review"
  >("all");
  const [showModal, setShowModal] = useState(false);

  const products: PlatformProduct[] = [
    {
      id: "1",
      name: "Industrial Pump Series 200",
      category: "Construction",
      supplier: "TechHub Limited",
      status: "pending-review",
      createdDate: "2024-01-20",
      views: 125,
      inquiries: 8,
    },
    {
      id: "2",
      name: "Solar Panel 500W",
      category: "Electronics",
      supplier: "Global Exports Ltd",
      status: "active",
      createdDate: "2024-01-15",
      views: 542,
      inquiries: 34,
    },
    {
      id: "3",
      name: "Premium Cotton Fabric Roll",
      category: "Textiles",
      supplier: "African Traders Co",
      status: "active",
      createdDate: "2024-01-10",
      views: 789,
      inquiries: 56,
    },
    {
      id: "4",
      name: "LED Lighting System",
      category: "Electronics",
      supplier: "TechHub Limited",
      status: "inactive",
      createdDate: "2024-01-05",
      views: 234,
      inquiries: 12,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage all platform products
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending-review">Pending Review</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Supplier
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Views
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Inquiries
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.supplier}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : product.status === "pending-review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status === "pending-review"
                      ? "Pending Review"
                      : product.status.charAt(0).toUpperCase() +
                        product.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {product.views}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {product.inquiries}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-all text-primary">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-all text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Product
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Construction</option>
                  <option>Textiles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-lg transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
