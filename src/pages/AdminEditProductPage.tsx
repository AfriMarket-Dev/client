import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save } from "lucide-react";
import { useState } from "react";
import { products, suppliers } from "@/data/mockData";

export default function AdminEditProductPage() {
  const { supplierId, productId } = useParams();
  const navigate = useNavigate();

  // Find product and supplier
  const product = products.find((p) => p.id === productId);
  const supplier = suppliers.find((s) => s.id === supplierId);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    minPrice: product?.priceRange.min || 0,
    maxPrice: product?.priceRange.max || 0,
    minimumOrder: product?.minimumOrder || 1,
    availability: product?.availability || "in-stock",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Product updated successfully!");
    setLoading(false);
    navigate(`/admin/suppliers/${supplierId}/product/${productId}`);
  };

  if (!product || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Back to Supplier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(`/admin/suppliers/${supplierId}/product/${productId}`)
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-sm text-gray-600">Updating: {product.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => setStep(s)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    step === s
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
                  }`}
                >
                  Step {s}
                </button>
                {s < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-2"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option>Electronics</option>
                    <option>Fashion & Textiles</option>
                    <option>Home & Garden</option>
                    <option>Beauty & Health</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/suppliers/${supplierId}/product/${productId}`,
                    )
                  }
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Availability */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Order *
                  </label>
                  <input
                    type="number"
                    name="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="pre-order">Pre-Order</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Image and specification updates will be
                  available in the next version.
                </p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/admin/suppliers/${supplierId}/product/${productId}`,
                    )
                  }
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
