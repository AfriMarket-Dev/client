import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Edit,
  Trash2,
  Share2,
  Star,
  ShoppingCart,
  Eye,
  Check,
  AlertCircle,
  Package,
  DollarSign,
  Tag,
  Calendar,
  X,
  FileText,
  MessageSquare,
  CheckCircle,
  Building2,
  Layers,
  Clock,
} from "lucide-react";
import { products, suppliers, orders, inquiries } from "@/data/mockData";
import { useState } from "react";

export default function AdminProductDetailsPage() {
  const { supplierId, productId } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "inquiries">("orders");

  // Find product and supplier
  const product = products.find((p) => p.id === productId);
  const supplier = suppliers.find((s) => s.id === supplierId);

  if (!product || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Supplier
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = () => {
    if (deleteConfirmation.toLowerCase() === product.name.toLowerCase()) {
      alert(`Product "${product.name}" deleted successfully!`);
      navigate(`/admin/suppliers/${supplierId}`);
    }
  };

  // Delete Modal Component
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete Product
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteConfirmation("");
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Type the product name to confirm deletion:
            </label>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder={product.name}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter: <span className="font-semibold">{product.name}</span>
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteConfirmation("");
            }}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProduct}
            disabled={
              deleteConfirmation.toLowerCase() !== product.name.toLowerCase()
            }
            className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Details
              </h1>
              <p className="text-sm text-gray-600">Managing {product.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="p-4 border-t border-gray-100 flex gap-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? "border-primary ring-2 ring-primary/20"
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

            {/* Product Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
                  {product.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold">
                  {product.subcategory}
                </span>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    product.availability === "in-stock"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.availability === "in-stock"
                    ? "In Stock"
                    : "Pre-Order"}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={18} className="text-primary" />
                    <p className="text-sm font-medium text-gray-600">
                      Price Range
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {product.priceRange.currency} {product.priceRange.min} -{" "}
                    {product.priceRange.max}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart size={18} className="text-primary" />
                    <p className="text-sm font-medium text-gray-600">
                      Minimum Order
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {product.minimumOrder} units
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={18} className="text-primary" />
                    <p className="text-sm font-medium text-gray-600">
                      Total Images
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {product.images.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers size={24} className="text-primary" />
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-600">{key}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Pricing */}
            {product.bulkPricing.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={24} className="text-primary" />
                  Bulk Pricing Tiers
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                          Total (100 units)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.bulkPricing.map((tier, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {tier.quantity}+ units
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {product.priceRange.currency} {tier.price}
                          </td>
                          <td className="px-4 py-3 font-semibold text-primary">
                            {product.priceRange.currency}{" "}
                            {(tier.price * 100).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supplier Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-primary" />
                Supplier
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={supplier.avatar}
                  alt={supplier.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{supplier.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {supplier.rating} / 5.0
                    </span>
                  </div>
                </div>
                {supplier.verified && (
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check size={16} className="text-green-600" />
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
                className="w-full px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors"
              >
                View Supplier
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye size={18} className="text-primary" />
                    <span className="text-sm font-medium text-gray-600">
                      Views
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">1,245</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-primary" />
                    <span className="text-sm font-medium text-gray-600">
                      Inquiries
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">87</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span className="text-sm font-medium text-gray-600">
                      Listed
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">45 days ago</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  navigate(
                    `/admin/suppliers/${supplierId}/product/${productId}/edit`,
                  )
                }
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Edit size={18} />
                Edit Product
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete Product
              </button>
            </div>
          </div>
        </div>

        {/* Orders & Inquiries Tabs Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-6 py-4 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "orders"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText size={20} />
              Orders
              <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                {orders.filter((o) => o.productId === productId).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex-1 px-6 py-4 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "inquiries"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MessageSquare size={20} />
              Inquiries
              <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                {inquiries.filter((i) => i.productId === productId).length}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                {orders.filter((o) => o.productId === productId).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Order ID
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Buyer
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Total
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Shipping
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders
                          .filter((o) => o.productId === productId)
                          .map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-900">
                                #{order.id}
                              </td>
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {order.buyerName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {order.buyerEmail}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {order.quantity} units
                              </td>
                              <td className="px-4 py-3 font-semibold text-gray-900">
                                ${order.totalPrice.toLocaleString()}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    order.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    order.shippingStatus === "delivered"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.shippingStatus
                                    .charAt(0)
                                    .toUpperCase() +
                                    order.shippingStatus.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {new Date(order.orderDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText
                      size={40}
                      className="text-gray-300 mx-auto mb-2"
                    />
                    <p className="text-gray-500">
                      No orders yet for this product
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === "inquiries" && (
              <div>
                {inquiries.filter((i) => i.productId === productId).length >
                0 ? (
                  <div className="space-y-4">
                    {inquiries
                      .filter((i) => i.productId === productId)
                      .map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {inquiry.buyerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {inquiry.buyerEmail}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                                inquiry.status === "replied"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              {inquiry.status === "replied" ? (
                                <>
                                  <CheckCircle size={14} />
                                  Replied
                                </>
                              ) : (
                                <>
                                  <Clock size={14} />
                                  Pending
                                </>
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">
                            {inquiry.message}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-gray-600">
                              <span className="flex items-center gap-1">
                                <Package size={14} />
                                {inquiry.quantity} units interested
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(inquiry.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                            <button className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare
                      size={40}
                      className="text-gray-300 mx-auto mb-2"
                    />
                    <p className="text-gray-500">
                      No inquiries yet for this product
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
