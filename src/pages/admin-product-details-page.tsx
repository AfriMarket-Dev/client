import { useParams, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Edit,
  Trash2,
  Share2,
  Star,
  ShoppingCart,
  Eye,
  Package,
  DollarSign,
  Tag,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  Building2,
  Users,
  Layers,
  Clock,
} from "lucide-react";
import { products, suppliers, orders, inquiries } from "@/data/mock-data";
import { useState } from "react";
import { ActionModal } from "@/components/common/action-modal";
import { AdminPageHeader, AdminCard, AdminTable } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminProductDetailsPage() {
  const { supplierId, productId } = useParams({ from: "/admin/suppliers/$supplierId/product/$productId/" });
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AdminCard className="text-center p-8 max-w-sm">
          <h1 className="text-xl font-heading font-bold text-foreground mb-4 uppercase tracking-widest">
            Product Not Found
          </h1>
          <Button
            onClick={() => navigate({ to: `/admin/suppliers/${supplierId}` as any })}
            className="w-full rounded-sm h-11 font-heading font-bold uppercase text-xs tracking-wider"
          >
            Back to Supplier
          </Button>
        </AdminCard>
      </div>
    );
  }

  const handleDeleteProduct = () => {
    if (deleteConfirmation.toLowerCase() === product.name.toLowerCase()) {
      alert(`Product "${product.name}" deleted successfully!`);
      navigate({ to: `/admin/suppliers/${supplierId}` as any });
    } else {
      alert("Product name does not match.");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: `/admin/suppliers/${supplierId}` as any })}
          className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Supplier
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-sm border border-border h-10 w-10">
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      <AdminPageHeader
        title={product.name}
        subtitle={`Managed inventory for ${supplier.name}`}
        badge="Product Control"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Images Section */}
          <AdminCard noPadding className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden relative">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
            </div>

            {product.images.length > 1 && (
              <div className="p-4 border-t-2 border-border flex gap-3 overflow-x-auto bg-muted/30">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-sm border overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? "border-primary scale-105 shadow-lg"
                        : "border-border hover:border-primary/50"
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
          </AdminCard>

          {/* Product Information */}
          <AdminCard title="Product Details" subtitle="General listing data">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-heading text-[10px] tracking-widest uppercase">
                {product.category}
              </Badge>
              <Badge variant="outline" className="bg-muted text-muted-foreground border-border px-3 py-1 font-heading text-[10px] tracking-widest uppercase">
                {product.subcategory}
              </Badge>
              <Badge
                variant="outline"
                className={`px-3 py-1 font-heading text-[10px] tracking-widest uppercase border ${
                  product.availability === "in-stock"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : "bg-yellow-50 text-yellow-700 border-yellow-100"
                }`}
              >
                {product.availability === "in-stock" ? "In Stock" : "Pre-Order"}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-10 font-mono border-l-4 border-primary/20 pl-6 py-4 bg-muted/5 italic">
              "{product.description}"
            </p>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/30 rounded-sm p-5 border border-border relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={16} className="text-primary" />
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Price Range
                  </p>
                </div>
                <p className="text-xl font-heading font-bold text-foreground">
                  {product.priceRange.currency} {product.priceRange.min.toLocaleString()}
                </p>
              </div>

              <div className="bg-muted/30 rounded-sm p-5 border border-border relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart size={16} className="text-primary" />
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Min Order
                  </p>
                </div>
                <p className="text-xl font-heading font-bold text-foreground">
                  {product.minimumOrder} units
                </p>
              </div>

              <div className="bg-muted/30 rounded-sm p-5 border border-border relative overflow-hidden group hover:border-primary transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-primary" />
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Listing Health
                  </p>
                </div>
                <p className="text-xl font-heading font-bold text-foreground uppercase tracking-widest text-xs">
                  Optimized
                </p>
              </div>
            </div>
          </AdminCard>

          {/* Specifications */}
          <AdminCard title="Technical Specifications" subtitle="Detailed product parameters" headerActions={<Layers size={16} className="text-primary" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 bg-muted/10 rounded-sm border border-border border-dashed flex justify-between items-center"
                >
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    {key}
                  </p>
                  <p className="text-sm font-black text-foreground uppercase tracking-tight">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>
          </AdminCard>

          {/* Bulk Pricing */}
          {product.bulkPricing.length > 0 && (
            <AdminCard title="Wholesale Tiers" subtitle="Volume-based pricing" headerActions={<Tag size={16} className="text-primary" />}>
              <AdminTable headers={["Volume Tier", "Unit Price", "Value @ 100u"]}>
                {product.bulkPricing.map((tier: { quantity: number; price: number }, idx: number) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 font-heading font-bold text-foreground text-xs uppercase tracking-widest">
                      {tier.quantity}+ units
                    </td>
                    <td className="px-4 py-4 text-primary text-sm font-mono font-black">
                      {product.priceRange.currency} {tier.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 font-black text-foreground text-sm font-mono">
                      {product.priceRange.currency} {(tier.price * 100).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </AdminTable>
            </AdminCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Supplier Card */}
          <AdminCard title="Provider" headerActions={<Building2 size={16} className="text-primary" />}>
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted/20 border border-border rounded-sm">
              <div className="w-14 h-14 rounded-sm bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-2xl border border-background shadow-lg">
                {supplier.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-foreground uppercase tracking-widest truncate">
                  {supplier.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {supplier.rating} / 5.0
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate({ to: `/admin/suppliers/${supplierId}` as any })}
              className="w-full border border-border rounded-sm h-11 font-heading font-bold uppercase text-[10px] tracking-widest"
            >
              Access Profile
            </Button>
          </AdminCard>

          {/* Performance Stats */}
          <AdminCard title="Metrics" subtitle="Real-time listing reach">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 border border-border border-dashed rounded-sm">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-primary" />
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Views
                  </span>
                </div>
                <span className="font-black text-foreground text-sm font-mono tracking-tighter">
                  1,245
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 border border-border border-dashed rounded-sm">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-primary" />
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Inquiries
                  </span>
                </div>
                <span className="font-black text-foreground text-sm font-mono tracking-tighter">
                  87
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 border border-border border-dashed rounded-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Live For
                  </span>
                </div>
                <span className="font-black text-foreground text-xs uppercase tracking-widest">
                  45 Days
                </span>
              </div>
            </div>
          </AdminCard>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4 border-t-2 border-border">
            <Button
              onClick={() =>
                navigate({
                  to: `/admin/suppliers/${supplierId}/product/${productId}/edit` as any,
                })
              }
              className="w-full h-14 font-heading font-bold uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
            >
              <Edit size={16} className="mr-2" />
              Edit Inventory
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(true)}
              className="w-full h-14 border border-red-200 text-red-600 bg-red-50/50 hover:bg-red-50 font-heading font-bold uppercase text-xs tracking-widest"
            >
              <Trash2 size={16} className="mr-2" />
              Purge Listing
            </Button>
          </div>
        </div>
      </div>

      {/* Orders & Inquiries Tabs Section */}
      <AdminCard noPadding className="mt-8">
        {/* Tab Navigation */}
        <div className="flex border-b-2 border-border bg-muted/20">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 px-8 py-5 flex items-center justify-center gap-3 transition-all font-heading font-bold uppercase text-xs tracking-widest border-r-2 border-border ${
              activeTab === "orders"
                ? "text-primary bg-background border-b-2 border-b-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <FileText size={16} />
            Supply Orders
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20 px-2 font-black text-[10px]">
              {orders.filter((o) => o.productId === productId).length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex-1 px-8 py-5 flex items-center justify-center gap-3 transition-all font-heading font-bold uppercase text-xs tracking-widest ${
              activeTab === "inquiries"
                ? "text-primary bg-background border-b-2 border-b-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <MessageSquare size={16} />
            Leads & Inquiries
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20 px-2 font-black text-[10px]">
              {inquiries.filter((i) => i.productId === productId).length}
            </Badge>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "orders" && (
            <div>
              {orders.filter((o) => o.productId === productId).length > 0 ? (
                <AdminTable headers={["Order ID", "Entity", "Vol", "Gross", "Status", "Timestamp"]}>
                  {orders
                    .filter((o) => o.productId === productId)
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 font-mono text-xs font-black text-foreground">
                          #{order.id}
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-foreground">
                              {order.buyerName}
                            </p>
                            <p className="text-[9px] text-muted-foreground font-mono uppercase">
                              {order.buyerEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-foreground">
                          {order.quantity}u
                        </td>
                        <td className="px-4 py-4 font-mono text-xs font-black text-primary">
                          ${order.totalPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <Badge
                            variant="outline"
                            className={`font-heading font-bold uppercase text-[9px] tracking-widest px-2 py-0.5 rounded-sm border ${
                              order.status === "completed"
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-yellow-50 text-yellow-700 border-yellow-100"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">
                          {new Date(order.orderDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                </AdminTable>
              ) : (
                <div className="text-center py-20 border border-dashed border-border rounded-sm bg-muted/5">
                  <FileText size={40} className="text-muted-foreground/10 mx-auto mb-4" />
                  <p className="text-[10px] text-muted-foreground font-heading font-bold uppercase tracking-widest">
                    Zero transaction history detected
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {inquiries.filter((i) => i.productId === productId).length > 0 ? (
                inquiries
                  .filter((i) => i.productId === productId)
                  .map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="border border-border rounded-sm p-6 hover:border-primary/50 transition-all bg-background relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/10 group-hover:border-primary transition-colors" />
                      
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center rounded-sm">
                            <Users size={18} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-heading font-bold text-sm uppercase tracking-widest text-foreground">
                              {inquiry.buyerName}
                            </p>
                            <p className="text-[10px] text-muted-foreground font-mono font-bold uppercase">
                              {inquiry.buyerEmail}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`font-heading font-bold uppercase text-[9px] tracking-widest px-2 py-1 rounded-sm border flex items-center gap-1.5 ${
                            inquiry.status === "replied"
                              ? "bg-green-50 text-green-700 border-green-100"
                              : "bg-primary/5 text-primary border-primary/20"
                          }`}
                        >
                          {inquiry.status === "replied" ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {inquiry.status === "replied" ? "Handled" : "Awaiting"}
                        </Badge>
                      </div>
                      
                      <p className="text-foreground/80 text-sm mb-6 font-mono leading-relaxed border-l-4 border-primary/10 pl-6 py-2 bg-muted/5 italic">
                        "{inquiry.message}"
                      </p>
                      
                      <div className="flex items-center justify-between border-t-2 border-border border-dashed pt-6 mt-2">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                            <Package size={14} className="text-primary" />
                            {inquiry.quantity} Units Requested
                          </div>
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                            <Calendar size={14} className="text-primary" />
                            {new Date(inquiry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </div>
                        <Button variant="outline" className="px-4 py-1.5 h-9 bg-primary/5 text-primary font-heading font-bold uppercase text-[9px] tracking-widest rounded-sm border border-primary/10 hover:border-primary">
                          Intercept Stream
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-20 border border-dashed border-border rounded-sm bg-muted/5">
                  <MessageSquare size={40} className="text-muted-foreground/10 mx-auto mb-4" />
                  <p className="text-[10px] text-muted-foreground font-heading font-bold uppercase tracking-widest">
                    No active leads for this SKU
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </AdminCard>

      <ActionModal
        isOpen={showDeleteModal}
        type="delete"
        title="Purge Inventory SKU"
        description={`Are you sure you want to delete "${product.name}"?`}
        message="This will permanently remove the product from the marketplace and disconnect all active inquiries."
        inputLabel="SKU Verification"
        inputPlaceholder={product.name}
        inputValue={deleteConfirmation}
        onInputChange={setDeleteConfirmation}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation("");
        }}
        onConfirm={handleDeleteProduct}
        confirmText="Confirm Purge"
        cancelText="Cancel"
        isDisabled={deleteConfirmation.toLowerCase() !== product.name.toLowerCase()}
      />
    </div>
  );
}
