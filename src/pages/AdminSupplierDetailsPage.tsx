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
  Truck,
  CheckCircle,
  AlertCircle,
  Zap,
  Settings,
} from "lucide-react";
import {
  suppliers,
  products as mockProducts,
  services as mockServices,
} from "@/data/mockData";
import { AdminStatCard, AdminCard } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

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
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    "products",
  );

  const mockSupplier = suppliers.find((s) => s.id === supplierId);
  const supplierProducts = mockProducts.filter(
    (p) => p.supplierId === supplierId,
  );
  const supplierServices = mockServices.filter(
    (s) => s.provider.fullName === mockSupplier?.name,
  );

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
          ]
        : [];

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

  const products: Product[] = supplierProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.priceRange.min,
    stock: product.availability === "in-stock" ? 100 : 0,
    status:
      product.availability === "in-stock"
        ? "active"
        : product.availability === "pre-order"
          ? "pending-review"
          : "inactive",
    views: Math.floor(Math.random() * 500),
    inquiries: Math.floor(Math.random() * 50),
  }));

  const services: Service[] = sampleServices.map((service) => ({
    id: service.id.toString(),
    name: service.name,
    category: service.description,
    description: service.description,
    pricing: service.price,
    status: "active",
    inquiries: service.pendingRequests,
  }));

  const handleEditSupplier = () => {
    navigate(`/admin/suppliers/${supplierId}/edit`);
  };

  const confirmSuspend = () => {
    alert(`${supplier.name} has been suspended successfully.`);
    setShowSuspendModal(false);
    navigate("/admin/suppliers");
  };

  const confirmDelete = () => {
    alert(`${supplier.name} has been deleted successfully.`);
    setShowDeleteModal(false);
    setDeleteConfirmation("");
    navigate("/admin/suppliers");
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/suppliers")}
          className="group flex items-center gap-2 text-foreground hover:bg-muted py-2 px-3 rounded-sm transition-colors font-heading font-bold uppercase text-xs tracking-wider"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Suppliers
        </Button>
      </div>

      <AdminCard noPadding className="overflow-hidden">
        <div className="bg-muted h-32 relative">
          <div className="absolute inset-0 african-pattern opacity-10" />
          <div className="absolute inset-0 bg-linear-to-t from-muted/80 to-transparent" />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start justify-between -mt-12 relative z-10 gap-6">
            <div className="flex items-end gap-6">
              <div className="w-28 h-24 bg-primary text-primary-foreground rounded-sm border-4 border-background flex items-center justify-center text-4xl font-heading font-bold shadow-xl">
                {supplier.name.charAt(0)}
              </div>
              <div className="pb-1">
                <h1 className="text-3xl font-heading font-bold text-foreground uppercase tracking-tight leading-none mb-3">
                  {supplier.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <Badge
                    variant="outline"
                    className={`rounded-sm border font-heading font-bold uppercase text-[10px] tracking-widest px-2.5 py-1 ${
                      supplier.verificationStatus === "verified"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}
                  >
                    {supplier.verificationStatus === "verified" ? (
                      <CheckCircle size={12} className="mr-1.5" />
                    ) : (
                      <AlertCircle size={12} className="mr-1.5" />
                    )}
                    {supplier.verificationStatus}
                  </Badge>

                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="font-heading font-bold text-foreground text-[10px] uppercase tracking-widest">
                      {supplier.averageRating} / 5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleEditSupplier}
                variant="outline"
                className="rounded-sm h-11 px-6 border border-border font-heading font-bold uppercase text-xs tracking-wider"
              >
                <Edit size={14} className="mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => setShowSuspendModal(true)}
                className="rounded-sm h-11 px-6 bg-warning text-warning-foreground hover:bg-warning/90 font-heading font-bold uppercase text-xs tracking-wider border-none shadow-lg shadow-warning/20"
              >
                Suspend
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                className="rounded-sm h-11 px-6 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-heading font-bold uppercase text-xs tracking-wider border-none shadow-lg shadow-destructive/20"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Customers"
          value={supplier.customerCount}
          icon={Users}
          bgColor="bg-info/10"
          color="text-info"
        />
        <AdminStatCard
          label="Total Orders"
          value={supplier.ordersCount}
          icon={ShoppingCart}
        />
        <AdminStatCard
          label="Products Listed"
          value={supplier.productCount}
          icon={Package}
          bgColor="bg-primary/10"
          color="text-primary"
        />
        <AdminStatCard
          label="Member Since"
          value={new Date(supplier.joinDate).getFullYear()}
          icon={Calendar}
          bgColor="bg-success/10"
          color="text-success"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard
          title="Contact Information"
          subtitle="Primary business reach"
          headerActions={<Mail size={16} className="text-primary" />}
        >
          <div className="space-y-6">
            <div className="border-b-2 border-border border-dashed pb-4 last:border-0 last:pb-0">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Email Address
              </label>
              <p className="text-foreground text-sm font-mono font-bold uppercase tracking-tight">
                {supplier.email}
              </p>
            </div>
            <div className="border-b-2 border-border border-dashed pb-4 last:border-0 last:pb-0">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Location
              </label>
              <p className="text-foreground text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                {supplier.location}
              </p>
            </div>
          </div>
        </AdminCard>
        <AdminCard
          title="Verification Details"
          subtitle="Trust and status metrics"
          headerActions={<Shield size={16} className="text-primary" />}
        >
          <div className="space-y-6">
            <div className="border-b-2 border-border border-dashed pb-4 last:border-0 last:pb-0">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Verification Status
              </label>
              <div className="flex items-center gap-2 mt-1">
                {supplier.verificationStatus === "verified" ? (
                  <span className="text-success text-xs font-heading font-bold uppercase tracking-widest flex items-center gap-2 bg-success/5 px-3 py-1.5 rounded-sm border border-success/10">
                    <CheckCircle size={14} /> Verified Supplier
                  </span>
                ) : (
                  <span className="text-warning text-xs font-heading font-bold uppercase tracking-widest flex items-center gap-2 bg-warning/5 px-3 py-1.5 rounded-sm border border-warning/10">
                    <AlertCircle size={14} /> Pending Review
                  </span>
                )}
              </div>
            </div>
            <div className="border-b-2 border-border border-dashed pb-4 last:border-0 last:pb-0">
              <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Account Status
              </label>
              <p className="text-foreground text-sm uppercase tracking-widest font-black">
                {supplier.status === "active"
                  ? "Active"
                  : supplier.status === "pending"
                    ? "Pending Approval"
                    : "Inactive"}
              </p>
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard noPadding className="overflow-hidden">
        <div className="border-b-2 border-border bg-muted/30">
          <div className="flex">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-3 px-8 py-5 font-heading font-bold uppercase text-xs tracking-widest transition-all border-r-2 border-border ${activeTab === "products" ? "bg-background text-primary border-b-2 border-b-primary" : "bg-transparent text-muted-foreground hover:bg-background/50"}`}
            >
              <Package size={16} /> Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-3 px-8 py-5 font-heading font-bold uppercase text-xs tracking-widest transition-all border-r-2 border-border ${activeTab === "services" ? "bg-background text-primary border-b-2 border-b-primary" : "bg-transparent text-muted-foreground hover:bg-background/50"}`}
            >
              <Zap size={16} /> Services ({services.length})
            </button>
          </div>
        </div>
        {activeTab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border bg-muted/10">
                  <th className="px-6 py-4 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() =>
                      navigate(`/admin/suppliers/${supplierId}/product/${p.id}`)
                    }
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-sm border border-primary/10 group-hover:bg-primary/10 transition-colors">
                          <Package size={14} className="text-primary" />
                        </div>
                        <span className="font-heading font-bold text-xs uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-black text-foreground">
                      RWF {p.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          p.stock > 0
                            ? "bg-success/5 text-success border-success/10 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm"
                            : "bg-destructive/5 text-destructive border-destructive/10 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm"
                        }
                      >
                        {p.stock} units
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-heading font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest border ${p.status === "active" ? "bg-success/5 text-success border-success/10" : p.status === "pending-review" ? "bg-warning/5 text-warning border-warning/10" : "bg-destructive/5 text-destructive border-destructive/10"}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/admin/suppliers/${supplierId}/product/${p.id}`,
                            );
                          }}
                          className="p-2 hover:bg-primary/10 rounded-sm transition-colors text-primary border border-transparent hover:border-primary"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground border border-transparent hover:border-border"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/admin/suppliers/${supplierId}/product/${p.id}/edit`,
                            );
                          }}
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10">
              <AlertCircle className="text-destructive" />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the supplier account and all
              associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Type "{supplier.name}" to confirm</Label>
              <Input
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={supplier.name}
                className="h-11 shadow-none"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={
                deleteConfirmation.toLowerCase() !== supplier.name.toLowerCase()
              }
              variant="destructive"
            >
              Delete Supplier
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuspendModal} onOpenChange={setShowSuspendModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-warning/10">
              <AlertCircle className="text-warning" />
            </AlertDialogMedia>
            <AlertDialogTitle>Suspend Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              The supplier will not be able to log in or access their account.
              Their products will be hidden from the marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSuspendModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmSuspend}>
              Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
