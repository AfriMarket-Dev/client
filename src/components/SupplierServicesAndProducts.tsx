import { Package, Zap, Calendar, CheckCircle } from "lucide-react";

interface SupplierAssignedService {
  id: string;
  name: string;
  description: string;
  assignedDate: string;
  status: "active" | "inactive";
}

interface SupplierOwnedProduct {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive" | "pending-review";
  createdDate: string;
  inquiries: number;
  views: number;
}

/**
 * Component that can be integrated into the Supplier Dashboard
 * Shows suppliers their assigned services and products
 */
export default function SupplierServicesAndProducts() {
  // Mock data - would be fetched from API with supplier ID
  const assignedServices: SupplierAssignedService[] = [
    {
      id: "1",
      name: "Express Delivery",
      description: "Fast delivery within 24-48 hours",
      assignedDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Payment Processing",
      description: "Secure payment gateway integration",
      assignedDate: "2024-01-10",
      status: "active",
    },
  ];

  const ownedProducts: SupplierOwnedProduct[] = [
    {
      id: "1",
      name: "Industrial Pump Series 200",
      category: "Construction",
      status: "pending-review",
      createdDate: "2024-01-20",
      inquiries: 8,
      views: 125,
    },
    {
      id: "2",
      name: "Solar Panel 500W",
      category: "Electronics",
      status: "active",
      createdDate: "2024-01-15",
      inquiries: 34,
      views: 542,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Assigned Services Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap size={24} className="text-orange-600" />
            Your Assigned Services
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Services you are authorized to offer on the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-orange-600">
                  <CheckCircle size={20} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  Assigned: {service.assignedDate}
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Products Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package size={24} className="text-emerald-600" />
            Your Products
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Products you have created and published on the platform
          </p>
        </div>

        {ownedProducts.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ownedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Package size={16} className="text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
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
                          : product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {product.views}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {product.inquiries}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.createdDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No products created yet</p>
            <button className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all">
              Create Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Integration Tips */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Integration Note
        </h3>
        <p className="text-sm text-blue-800">
          This component can be integrated into your existing Supplier Dashboard
          page. It shows suppliers their assigned services and the products they
          have created, providing complete visibility into their platform
          activity.
        </p>
      </div>
    </div>
  );
}
