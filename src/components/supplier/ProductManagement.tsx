import React, { useState, useMemo } from "react";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Grid,
  List,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AdminCard } from "@/components/admin/AdminCard";
import { ProductForm } from "@/components/forms/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  price: { min: number; max: number };
  stock: number;
  status: "active" | "inactive" | "out-of-stock";
  images: string[];
  moq: number;
  views: number;
  inquiries: number;
}

const ProductManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Samsung Galaxy A54 5G (Bulk Pack)",
      category: "Electronics",
      price: { min: 280, max: 320 },
      stock: 150,
      status: "active",
      images: [
        "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300",
      ],
      moq: 10,
      views: 234,
      inquiries: 12,
    },
    {
      id: "2",
      name: "Premium Cotton Ankara Fabric Rolls",
      category: "Fashion & Textiles",
      price: { min: 8, max: 15 },
      stock: 0,
      status: "out-of-stock",
      images: [
        "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=300",
      ],
      moq: 50,
      views: 189,
      inquiries: 8,
    },
    {
      id: "3",
      name: "Wireless Bluetooth Earbuds (Bulk)",
      category: "Electronics",
      price: { min: 25, max: 45 },
      stock: 300,
      status: "active",
      images: [
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
      ],
      moq: 50,
      views: 456,
      inquiries: 23,
    },
  ]);

  const categories = [
    "all",
    "Electronics",
    "Fashion & Textiles",
    "Home & Garden",
    "Beauty & Health",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
            Product Management
          </h2>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest mt-1">
            Maintain inventory and catalog parameters
          </p>
        </div>
        <Button
          onClick={() => setShowAddProduct(true)}
          className="rounded-sm h-12 px-6 font-heading font-bold uppercase tracking-widest shadow-none"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Listing
        </Button>
      </div>

      <AdminCard noPadding>
        <div className="p-3 flex flex-col lg:flex-row gap-4 bg-muted/10">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="SEARCH CATALOG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background border-2 border-border uppercase text-xs font-bold tracking-widest shadow-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border-2 border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background h-11 font-heading font-bold uppercase text-[10px] tracking-widest"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "ALL SECTORS" : category.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="flex items-center bg-muted border-2 border-border rounded-sm p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-sm transition-all",
                viewMode === "grid"
                  ? "bg-background text-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-sm transition-all",
                viewMode === "list"
                  ? "bg-background text-primary shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AdminCard>

      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1",
        )}
      >
        {filteredProducts.map((product) => (
          <AdminCard
            key={product.id}
            noPadding
            className="hover:border-primary transition-colors flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden border-b-2 border-border">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    product.status === "active" ? "success" : "destructive"
                  }
                  className="uppercase text-[9px] font-black tracking-[0.2em]"
                >
                  {product.status}
                </Badge>
              </div>
              <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
            </div>

            <div className="p-5 flex-grow">
              <div className="mb-3">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded-sm border border-primary/10">
                  {product.category}
                </span>
              </div>

              <h3 className="font-heading font-bold text-foreground mb-4 uppercase tracking-tight text-lg leading-tight line-clamp-2">
                {product.name}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y-2 border-border border-dashed">
                <div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-1">
                    Price Matrix
                  </span>
                  <div className="font-bold text-foreground text-sm">
                    ${product.price.min} - ${product.price.max}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-1">
                    Inventory
                  </span>
                  <div
                    className={cn(
                      "font-bold text-sm",
                      product.stock > 0 ? "text-success" : "text-destructive",
                    )}
                  >
                    {product.stock} units
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                {[
                  { label: "Views", val: product.views },
                  { label: "Leads", val: product.inquiries },
                  { label: "MOQ", val: product.moq },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-muted/30 p-2 rounded-sm border border-border"
                  >
                    <div className="font-bold text-foreground text-sm">
                      {m.val}
                    </div>
                    <div className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 rounded-sm h-10 font-heading font-bold uppercase tracking-widest text-[10px] shadow-none"
                >
                  <Edit className="w-3.5 h-3.5 mr-1.5" />
                  Override
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-2 border-border rounded-sm hover:border-primary"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-2 border-border rounded-sm hover:border-destructive hover:bg-destructive/5 group"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                </Button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-muted/5 border-2 border-dashed border-border rounded-sm">
          <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
          <h3 className="text-xl font-heading font-bold text-foreground mb-2 uppercase tracking-widest">
            Stream Empty
          </h3>
          <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider mb-8">
            No listing nodes match your current parameters
          </p>
          <Button
            onClick={() => setShowAddProduct(true)}
            className="rounded-sm h-12 px-8 font-heading font-bold uppercase tracking-widest shadow-none"
          >
            Create First Node
          </Button>
        </div>
      )}

      {/* Forms using base components */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="max-w-md p-0 overflow-hidden shadow-none border-2 border-border rounded-sm">
          <div className="bg-muted/30 p-6 border-b-2 border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/20" />
            <DialogHeader>
              <DialogTitle className="text-lg font-heading font-bold uppercase tracking-wide">
                Initialize Product
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-6">
            <ProductForm
              onSubmit={(v) => {
                console.log("Add:", v);
                setShowAddProduct(false);
              }}
              onCancel={() => setShowAddProduct(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingProduct}
        onOpenChange={(o) => !o && setEditingProduct(null)}
      >
        <DialogContent className="max-w-md p-0 overflow-hidden shadow-none border-2 border-border rounded-sm">
          <div className="bg-muted/30 p-6 border-b-2 border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/20" />
            <DialogHeader>
              <DialogTitle className="text-lg font-heading font-bold uppercase tracking-wide">
                Override Product
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-6">
            {editingProduct && (
              <ProductForm
                initialValues={{
                  name: editingProduct.name,
                  category: editingProduct.category,
                  description: "", // Mock
                }}
                onSubmit={(v) => {
                  console.log("Edit:", v);
                  setEditingProduct(null);
                }}
                onCancel={() => setEditingProduct(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
