import React, { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  MessageSquare,
  Heart,
  Eye,
  Package,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { products, suppliers, categories as mockCategories } from "../data/mockData";
import { type Product, type Supplier } from "../types";
import { useWishlist } from "../hooks/useWishlist";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

interface ProductCatalogProps {
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (product: Product) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSupplierClick,
  onProductClick,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const getSupplier = (supplierId: string) =>
    suppliers.find((s) => s.id === supplierId);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50/50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                <Package className="w-4 h-4" />
                Marketplace
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-stone-900 font-display">
                Construction Catalog
              </h1>
              <p className="text-stone-500 mt-2 text-lg">
                Discover materials and equipment from verified Rwandan suppliers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-stone-100 p-1 rounded-xl">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="rounded-xl border-stone-200 lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="space-y-6 sticky top-24">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-11 rounded-xl bg-white border-stone-200"
                />
              </div>

              <div>
                <h3 className="font-bold text-stone-900 mb-4 px-1 uppercase text-xs tracking-widest">Categories</h3>
                <div className="flex flex-col gap-1">
                  <Button
                    variant={selectedCategory === "all" ? "secondary" : "ghost"}
                    className="justify-start rounded-xl font-semibold"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Categories
                  </Button>
                  {mockCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.name ? "secondary" : "ghost"}
                      className="justify-start rounded-xl font-semibold text-stone-600 hover:text-primary"
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="rounded-2xl border-primary/10 bg-primary/5 p-6 border-none shadow-none">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-stone-900 mb-1">Direct from Source</p>
                    <p className="text-xs text-stone-600 leading-relaxed"> AfrikaMarket connects you directly with manufacturers. No markup on prices.</p>
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-stone-500 font-medium">
                Found <span className="text-stone-900 font-bold">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
              : "flex flex-col gap-6"
            }>
              {filteredProducts.map((product) => {
                const supplier = getSupplier(product.supplierId);

                return (
                  <Card
                    key={product.id}
                    className={`group border-stone-200/60 bg-white hover:border-primary/30 transition-all duration-300 overflow-hidden flex ${viewMode === "list" ? "flex-row h-64" : "flex-col"}`}
                    onClick={() => onProductClick?.(product)}
                  >
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-72 shrink-0" : "aspect-[4/3]"}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white text-stone-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id, "product")) {
                              removeFromWishlist(product.id, "product");
                            } else {
                              addToWishlist(product, "product");
                            }
                          }}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id, "product") ? "text-destructive fill-current" : ""}`} />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-stone-900 border-none backdrop-blur-sm shadow-sm font-bold text-[10px]">
                          {product.availability.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-stone-100 text-stone-500 text-[10px] font-bold border-none uppercase tracking-tighter">
                            {product.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-2xl font-black text-primary">
                            {product.priceRange.currency} {product.priceRange.min.toLocaleString()}
                          </span>
                          <span className="text-xs text-stone-400 font-bold uppercase">/ unit</span>
                        </div>

                        {supplier && (
                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <div 
                              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSupplierClick?.(supplier.id);
                              }}
                            >
                              <img src={supplier.avatar} className="w-6 h-6 rounded-lg object-cover" alt="" />
                              <span className="text-xs font-bold text-stone-700">{supplier.name}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-lg text-primary hover:bg-primary/5"
                              onClick={(e) => {
                                e.stopPropagation();
                                onProductClick?.(product);
                              }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-100">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-stone-300" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  No materials found
                </h3>
                <p className="text-stone-500 max-w-sm mx-auto">
                  We couldn't find any products matching your current filters. Try broadening your search.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8 rounded-xl"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Product Catalog
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover quality products from verified African suppliers
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${showFilters ? "block" : "hidden"} lg:block w-80 flex-shrink-0`}
          >
            <div className="bg-card rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-foreground mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-foreground capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price Range (USD)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 1000,
                      ])
                    }
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => {
                const supplier = getSupplier(product.supplierId);

                return (
                  <div
                    key={product.id}
                    className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => onProductClick?.(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInWishlist(product.id, "product")) {
                              removeFromWishlist(product.id, "product");
                            } else {
                              addToWishlist(product, "product");
                            }
                          }}
                          className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isInWishlist(product.id, "product")
                                ? "text-destructive fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                        <button className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.availability === "in-stock"
                              ? "bg-success/20 text-success"
                              : product.availability === "pre-order"
                                ? "bg-warning/20 text-warning"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {product.availability.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-lg font-bold text-primary">
                            ${product.priceRange.min} - $
                            {product.priceRange.max}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Min. order: {product.minimumOrder} units
                          </div>
                        </div>
                      </div>

                      {supplier && (
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div
                            className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSupplierClick?.(supplier.id);
                            }}
                          >
                            <img
                              src={supplier.avatar}
                              alt={supplier.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <div className="text-xs font-medium text-foreground">
                                {supplier.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {supplier.location}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSupplier(supplier);
                              setShowContactModal(true);
                            }}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && <ContactModal />}
    </div>
  );
};

export default ProductCatalog;
