import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Pause,
} from "lucide-react";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Supplier {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "active" | "pending" | "inactive";
  verificationStatus: "verified" | "unverified";
  joinDate: string;
  productCount: number;
}

export default function AdminSuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "pending" | "inactive"
  >("all");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const [suspendModal, setSuspendModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const navigate = useNavigate();

  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "TechHub Limited",
      email: "contact@techhub.com",
      location: "Lagos, Nigeria",
      status: "pending",
      verificationStatus: "unverified",
      joinDate: "2024-01-15",
      productCount: 0,
    },
    {
      id: "2",
      name: "Global Exports Ltd",
      email: "info@globalexports.com",
      location: "Cairo, Egypt",
      status: "active",
      verificationStatus: "verified",
      joinDate: "2023-08-20",
      productCount: 45,
    },
    {
      id: "3",
      name: "African Traders Co",
      email: "support@africantrade.com",
      location: "Nairobi, Kenya",
      status: "active",
      verificationStatus: "verified",
      joinDate: "2023-11-10",
      productCount: 32,
    },
  ];

  const handleViewDetails = (supplierId: string) => {
    navigate(`/admin/suppliers/${supplierId}`);
  };

  const handleEditSupplier = (supplierId: string) => {
    navigate(`/admin/suppliers/${supplierId}/edit`);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setDeleteModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  };

  const handleConfirmDelete = () => {
    console.log("Deleting supplier:", deleteModal.supplierId);
    setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" });
    // Here you would call your API to delete the supplier
  };

  const handleSuspendClick = (supplier: Supplier) => {
    setSuspendModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  };

  const handleConfirmSuspend = () => {
    console.log("Suspending supplier:", suspendModal.supplierId);
    setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" });
    // Here you would call your API to suspend the supplier
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Suppliers Management
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage all platform suppliers
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/suppliers/new")}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={20} />
          Add Supplier
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
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
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Supplier
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Products
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Join Date
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {supplier.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {supplier.verificationStatus === "verified" ? (
                          <>
                            <CheckCircle size={14} className="text-green-600" />
                            <span className="text-xs text-green-600">
                              Verified
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle
                              size={14}
                              className="text-yellow-600"
                            />
                            <span className="text-xs text-yellow-600">
                              Unverified
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {supplier.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {supplier.location}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      supplier.status === "active"
                        ? "bg-green-100 text-green-800"
                        : supplier.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {supplier.status.charAt(0).toUpperCase() +
                      supplier.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {supplier.productCount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {supplier.joinDate}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewDetails(supplier.id)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-all text-primary tooltip"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditSupplier(supplier.id)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-all text-blue-600 tooltip"
                      title="Edit Supplier"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleSuspendClick(supplier)}
                      className="p-2 hover:bg-yellow-100 rounded-lg transition-all text-yellow-600 tooltip"
                      title="Suspend Supplier"
                    >
                      <Pause size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(supplier)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-all text-red-600 tooltip"
                      title="Delete Supplier"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Supplier"
        message={`Are you sure you want to delete ${deleteModal.supplierName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
      />

      {/* Suspend Confirmation Modal */}
      <ConfirmationModal
        isOpen={suspendModal.isOpen}
        title="Suspend Supplier"
        message={`Are you sure you want to suspend ${suspendModal.supplierName}? They will not be able to access their account or sell products.`}
        confirmText="Suspend"
        cancelText="Cancel"
        type="suspend"
        onConfirm={handleConfirmSuspend}
        onCancel={() =>
          setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
      />
    </div>
  );
}
