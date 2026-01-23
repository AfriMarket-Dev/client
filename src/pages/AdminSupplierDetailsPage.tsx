import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  MapPin,
  Calendar,
  Package,
  Shield,
  Users,
  ShoppingCart,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Zap,
  X,
  Truck,
  Settings,
} from "lucide-react";
import {
  suppliers,
  products as mockProducts,
  services as mockServices,
} from "@/data/mockData";
import ActionModal from "@/components/ActionModal";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "pending-review";
  views: number;
  inquiries: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  status: "active" | "inactive" | "pending-review";
  inquiries: number;
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "active" | "pending" | "inactive";
  verificationStatus: "verified" | "unverified";
  joinDate: string;
  productCount: number;
  customerCount: number;
  ordersCount: number;
  averageRating: number;
}

export default function AdminSupplierDetailsPage() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    "products",
  );

  // Get supplier from mock data
  const mockSupplier = suppliers.find((s) => s.id === supplierId);

  // Get products from mock data based on supplierId
  const supplierProducts = mockProducts.filter(
    (p) => p.supplierId === supplierId,
  );

  // Get services from mock data based on supplier name
  const supplierServices = mockServices.filter(
    (s) => s.provider.fullName === mockSupplier?.name,
  );

  // If no services found, create sample construction-related services
  const sampleServices: any[] =
    supplierServices.length > 0
      ? supplierServices
      : mockSupplier
        ? [
            {
              id: 101,
              name: "Equipment Rental",
              description:
                "Heavy machinery & construction equipment rental including excavators, concrete mixers, scaffolding, and power tools",
              price: "From $150/day",
              icon: Truck,
              totalRequests: 85,
              pendingRequests: 7,
              provider: {
                id: 1,
                fullName: mockSupplier.name,
                role: "Equipment Manager",
                phone: mockSupplier.contact.phone,
                email: mockSupplier.contact.email,
                experience: "8+ years",
                rating: mockSupplier.rating,
              },
            },
            {
              id: 102,
              name: "On-site Consultation",
              description:
                "Expert consultation for construction projects, site assessment, material selection, and project planning",
              price: "From $200/hour",
              icon: Settings,
              totalRequests: 56,
              pendingRequests: 4,
              provider: {
                id: 1,
                fullName: mockSupplier.name,
                role: "Consultant",
                phone: mockSupplier.contact.phone,
                email: mockSupplier.contact.email,
                experience: "10+ years",
                rating: mockSupplier.rating,
              },
            },
            {
              id: 103,
              name: "Installation & Support",
              description:
                "Professional installation service, technical support, and quality assurance for all materials and equipment",
              price: "Custom quotes",
              icon: Zap,
              totalRequests: 92,
              pendingRequests: 6,
              provider: {
                id: 1,
                fullName: mockSupplier.name,
                role: "Installation Lead",
                phone: mockSupplier.contact.phone,
                email: mockSupplier.contact.email,
                experience: "12+ years",
                rating: mockSupplier.rating,
              },
            },
          ]
        : [];

  // Map mock supplier to admin supplier interface
  const supplier: Supplier = mockSupplier
    ? {
        id: mockSupplier.id,
        name: mockSupplier.name,
        email: mockSupplier.contact.email,
        location: mockSupplier.location,
        status: "active",
        verificationStatus: mockSupplier.verified ? "verified" : "unverified",
        joinDate: mockSupplier.joinedDate,
        productCount: mockSupplier.totalProducts,
        customerCount: mockSupplier.reviewCount,
        ordersCount: 0,
        averageRating: mockSupplier.rating,
      }
    : {
        id: supplierId || "1",
        name: "Unknown Supplier",
        email: "info@supplier.com",
        location: "Location",
        status: "active",
        verificationStatus: "unverified",
        joinDate: "2023-01-01",
        productCount: 0,
        customerCount: 0,
        ordersCount: 0,
        averageRating: 0,
      };

  // Map mock products to admin product interface
  const products: Product[] = supplierProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.priceRange.min,
    stock:
      product.availability === "in-stock"
        ? 100
        : product.availability === "pre-order"
          ? 0
          : 0,
    status:
      product.availability === "in-stock"
        ? "active"
        : product.availability === "pre-order"
          ? "pending-review"
          : "inactive",
    views: Math.floor(Math.random() * 500),
    inquiries: Math.floor(Math.random() * 50),
  }));

  // Map mock services to admin service interface
  const services: Service[] = sampleServices.map((service) => ({
    id: service.id.toString(),
    name: service.name,
    category: service.description,
    description: service.description,
    pricing: service.price,
    status: "active",
    inquiries: service.pendingRequests,
  }));

  // Action Handlers
  const handleEditSupplier = () => {
    navigate(`/admin/suppliers/${supplierId}/edit`);
  };

  const handleSuspendAccount = () => {
    setShowSuspendModal(true);
  };

  const confirmSuspend = () => {
    alert(`${supplier.name} has been suspended successfully.`);
    setShowSuspendModal(false);
    navigate("/admin/suppliers");
  };

  const handleDeleteSupplier = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmation.toLowerCase() === supplier.name.toLowerCase()) {
      alert(`${supplier.name} has been deleted successfully.`);
      setShowDeleteModal(false);
      setDeleteConfirmation("");
      navigate("/admin/suppliers");
    } else {
      alert("Supplier name does not match. Please try again.");
    }
  };

  // Product Details Modal Component
  const ProductDetailsModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Details
            </h2>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setSelectedImageIndex(0);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Image */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedProduct.images[selectedImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx
                            ? "border-orange-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`thumbnail-${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      {selectedProduct.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProduct.availability === "in-stock"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedProduct.availability === "in-stock"
                        ? "In Stock"
                        : "Pre-Order"}
                    </span>
                  </div>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Regular Price:</span>
                      <span className="font-bold text-lg text-gray-900">
                        RWF {selectedProduct.priceRange.min.toLocaleString()} -{" "}
                        {selectedProduct.priceRange.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Order:</span>
                      <span className="font-medium text-gray-900">
                        {selectedProduct.minimumOrder} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bulk Pricing */}
                {selectedProduct.bulkPricing.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Bulk Pricing
                    </h4>
                    <div className="space-y-2">
                      {selectedProduct.bulkPricing.map(
                        (tier: any, idx: number) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-gray-600">
                              {tier.quantity}+ units:
                            </span>
                            <span className="font-medium text-blue-700">
                              RWF {tier.price.toLocaleString()}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedProduct.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <p className="text-sm font-medium text-gray-600">{key}</p>
                      <p className="text-sm text-gray-900 font-semibold mt-1">
                        {String(value)}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Tags */}
            {selectedProduct.tags.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-6 flex gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedImageIndex(0);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors flex items-center justify-center gap-2">
                <Edit size={18} />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/suppliers")}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Suppliers
        </button>
      </div>

      {/* Supplier Header Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between -mt-16 relative z-10">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {supplier.name.charAt(0)}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {supplier.name}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  {supplier.verificationStatus === "verified" ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <AlertCircle size={18} className="text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-600">
                        Unverified
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star
                      size={18}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {supplier.averageRating} / 5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
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
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Total Customers
            </span>
            <Users className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {supplier.customerCount}
          </p>
          <p className="text-xs text-gray-500 mt-2">Active customers</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Total Orders
            </span>
            <ShoppingCart className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {supplier.ordersCount}
          </p>
          <p className="text-xs text-gray-500 mt-2">Completed orders</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Products Listed
            </span>
            <Package className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {supplier.productCount}
          </p>
          <p className="text-xs text-gray-500 mt-2">Active & inactive</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              Member Since
            </span>
            <Calendar className="text-orange-600" size={20} />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {new Date(supplier.joinDate).getFullYear()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(supplier.joinDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Contact & Business Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail size={20} className="text-orange-600" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <p className="text-gray-900 mt-1">{supplier.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MapPin size={14} />
                Location
              </label>
              <p className="text-gray-900 mt-1">{supplier.location}</p>
            </div>
          </div>
        </div>

        {/* Verification Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-orange-600" />
            Verification Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <div className="flex items-center gap-2 mt-2">
                {supplier.verificationStatus === "verified" ? (
                  <>
                    <CheckCircle size={18} className="text-green-600" />
                    <span className="text-green-700 font-medium">
                      Verified Supplier
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} className="text-yellow-600" />
                    <span className="text-yellow-700 font-medium">
                      Pending Verification
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Account Status
              </label>
              <p className="text-gray-900 mt-1 capitalize">
                {supplier.status === "active"
                  ? "Active and in good standing"
                  : supplier.status === "pending"
                    ? "Pending approval"
                    : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products & Services Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === "products"
                  ? "text-orange-600 border-orange-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Package size={20} />
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === "services"
                  ? "text-orange-600 border-orange-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <Zap size={20} />
              Services ({services.length})
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Engagement
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() =>
                      navigate(
                        `/admin/suppliers/${supplierId}/product/${product.id}`,
                      )
                    }
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Package size={16} className="text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      RWF {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span
                        className={`font-medium ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock} units
                      </span>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Eye size={14} />
                          {product.views}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <ShoppingCart size={14} />
                          {product.inquiries}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/admin/suppliers/${supplierId}/product/${product.id}`,
                            );
                          }}
                          className="p-2 hover:bg-orange-100 rounded-lg transition-all text-orange-600"
                        >
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
            {products.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Package size={32} className="mx-auto mb-2 opacity-50" />
                <p>No products listed yet</p>
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Service Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Pricing
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Inquiries
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Zap size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {service.pricing}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ShoppingCart size={14} />
                        {service.inquiries}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-all text-blue-600">
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
        )}
        {services.length === 0 && activeTab === "services" && (
          <div className="p-8 text-center text-gray-500">
            <Zap size={32} className="mx-auto mb-2 opacity-50" />
            <p>No services listed yet</p>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleEditSupplier}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Edit size={18} />
          Edit Supplier
        </button>
        <button
          onClick={handleSuspendAccount}
          className="flex-1 px-6 py-3 border border-yellow-300 text-yellow-700 font-medium rounded-lg hover:bg-yellow-50 transition-all flex items-center justify-center gap-2"
        >
          <AlertTriangle size={18} />
          Suspend Account
        </button>
        <button
          onClick={handleDeleteSupplier}
          className="flex-1 px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Delete Supplier
        </button>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={showDeleteModal}
        type="delete"
        title="Delete Supplier"
        description="This action cannot be undone"
        message={`Warning: Deleting ${supplier.name} will permanently remove all their products, customer records, and transaction history. This cannot be reversed.`}
        icon={<Trash2 size={24} className="text-red-600" />}
        inputLabel="Type supplier name to confirm deletion"
        inputPlaceholder={supplier.name}
        inputValue={deleteConfirmation}
        confirmValue={supplier.name}
        onInputChange={setDeleteConfirmation}
        confirmText="Delete Supplier"
        cancelText="Cancel"
        isDisabled={
          deleteConfirmation.toLowerCase() !== supplier.name.toLowerCase()
        }
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation("");
        }}
      />
      <ActionModal
        isOpen={showSuspendModal}
        type="suspend"
        title="Suspend Account"
        description="Temporarily disable this supplier"
        icon={<AlertTriangle size={24} className="text-yellow-600" />}
        message={`Suspending ${supplier.name} will:\n• Prevent customers from viewing their products\n• Disable new orders and inquiries\n• Keep existing records intact\n• Allow reactivation at any time`}
        confirmText="Suspend Account"
        cancelText="Cancel"
        onConfirm={confirmSuspend}
        onCancel={() => setShowSuspendModal(false)}
      />
      {selectedProduct && <ProductDetailsModal />}
    </div>
  );
}
