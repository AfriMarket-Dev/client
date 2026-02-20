import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Package, DollarSign } from "lucide-react";
import { useState } from "react";
import { products, suppliers } from "@/data/mock-data";
import { AdminPageHeader, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/button";

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

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("SKU updated successfully!");
    setLoading(false);
    navigate(`/admin/suppliers/${supplierId}/product/${productId}`);
  };

  if (!product || !supplier) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AdminCard className="text-center p-8 max-w-sm">
          <h1 className="text-xl font-heading font-bold text-foreground mb-4 uppercase tracking-widest">
            SKU Not Found
          </h1>
          <Button
            onClick={() => navigate(`/admin/suppliers/${supplierId}`)}
            className="w-full rounded-sm h-11 font-heading font-bold uppercase text-xs tracking-wider"
          >
            Return to Provider
          </Button>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(`/admin/suppliers/${supplierId}/product/${productId}`)}
          className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Cancel Modification
        </Button>
      </div>

      <AdminPageHeader
        title="Modify Inventory"
        subtitle={`Updating SKU: ${product.id}`}
        badge="SKU Management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <AdminCard title="Identity Parameters" subtitle="Override primary SKU data" headerActions={<Package size={16} className="text-primary" />}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Product Descriptor
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-wider"
                  placeholder="SKU NAME..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Technical Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none bg-background font-medium uppercase tracking-wider leading-relaxed"
                  placeholder="SKU PARAMETERS..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Primary Stream
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-wider"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Sub-Classification
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold uppercase tracking-wider"
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <AdminCard title="Financial Controls" subtitle="Margin & Flow parameters" headerActions={<DollarSign size={16} className="text-primary" />}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Floor Price
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Ceiling Price
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-mono font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Volume Threshold (Min)
                </label>
                <input
                  type="number"
                  name="minimumOrder"
                  value={formData.minimumOrder}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Provision Status
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary h-12 text-sm bg-background font-heading font-bold uppercase tracking-widest"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </AdminCard>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full h-14 rounded-sm shadow-xl shadow-primary/20 font-heading font-bold uppercase text-xs tracking-widest"
          >
            {loading ? "Synchronizing..." : "Synchronize SKU"}
            {!loading && <Save size={18} className="ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
