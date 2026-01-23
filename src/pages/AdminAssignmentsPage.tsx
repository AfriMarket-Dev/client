import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";

interface Assignment {
  id: string;
  supplier: string;
  supplierEmail: string;
  service: string;
  assignedDate: string;
  status: "active" | "inactive";
  assignments: number;
}

export default function AdminAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const assignments: Assignment[] = [
    {
      id: "1",
      supplier: "TechHub Limited",
      supplierEmail: "contact@techhub.com",
      service: "Express Delivery",
      assignedDate: "2024-01-20",
      status: "active",
      assignments: 3,
    },
    {
      id: "2",
      supplier: "Global Exports Ltd",
      supplierEmail: "info@globalexports.com",
      service: "Payment Processing",
      assignedDate: "2024-01-18",
      status: "active",
      assignments: 5,
    },
    {
      id: "3",
      supplier: "African Traders Co",
      supplierEmail: "support@africantrade.com",
      service: "Warranty Support",
      assignedDate: "2024-01-15",
      status: "active",
      assignments: 2,
    },
  ];

  const suppliers = [
    { id: "1", name: "TechHub Limited" },
    { id: "2", name: "Global Exports Ltd" },
    { id: "3", name: "African Traders Co" },
  ];

  const services = [
    { id: "1", name: "Express Delivery" },
    { id: "2", name: "Payment Processing" },
    { id: "3", name: "Warranty Support" },
    { id: "4", name: "Premium Packaging" },
  ];

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAssignService = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setSelectedSupplier("");
    setSelectedServices([]);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Supplier Assignments
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Assign services and products to suppliers
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={20} />
          New Assignment
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Supplier
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Service
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Assigned Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Total Assignments
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAssignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-gray-50 transition-all"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {assignment.supplier}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {assignment.supplierEmail}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {assignment.service}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {assignment.assignedDate}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {assignment.assignments}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
                      <LinkIcon size={16} />
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

      {/* Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Assign Services
            </h2>
            <form onSubmit={handleAssignService} className="space-y-4">
              {/* Supplier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Supplier
                </label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Choose a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Services
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        {service.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
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
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg transition-all"
                  disabled={!selectedSupplier || selectedServices.length === 0}
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
