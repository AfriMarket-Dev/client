import React, { useState } from "react";
import {
  Heart,
  ArrowLeft,
  Package,
  Users,
  Trash2,
  Eye,
  MapPin,
  Grid,
  List,
  Star,
} from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { type Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface WishlistProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onSupplierClick: (supplierId: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({
  onBack,
  onProductClick,
  onSupplierClick,
}) => {
  const {
    getWishlistProducts,
    getWishlistSuppliers,
    removeFromWishlist,
    clearWishlist,
    wishlistCount,
  } = useWishlist();

  const [activeTab, setActiveTab] = useState<"products" | "suppliers">(
    "products",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const wishlistProducts = getWishlistProducts();
  const wishlistSuppliers = getWishlistSuppliers();

  const handleClearWishlist = () => {
    if (window.confirm("Clear entire wishlist?")) {
      clearWishlist();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <div className="bg-background border-b-2 border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="gap-2 font-heading uppercase text-xs tracking-wider rounded-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-heading font-bold uppercase text-foreground flex items-center gap-2 tracking-wide">
                  <Heart className="w-6 h-6 text-primary" />
                  Wishlist
                </h1>
                <p className="text-muted-foreground text-sm">
                  {wishlistCount} items saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted border border-border p-1 rounded-sm">
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {wishlistCount > 0 && (
                <Button
                  onClick={handleClearWishlist}
                  variant="ghost"
                  className="gap-2 text-destructive hover:bg-destructive/5 font-heading uppercase text-xs tracking-wider rounded-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="bg-background border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center py-4 px-2 border-b-2 font-heading font-bold text-xs uppercase tracking-wider transition-colors ${
                activeTab === "products"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="w-4 h-4 mr-2" />
              Products ({wishlistProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`flex items-center py-4 px-2 border-b-2 font-heading font-bold text-xs uppercase tracking-wider transition-colors ${
                activeTab === "suppliers"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Suppliers ({wishlistSuppliers.length})
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "products" && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-sm border-2 border-border">
                <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                  No Products
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Start adding products to your wishlist
                </p>
                <Button
                  onClick={onBack}
                  className="rounded-sm font-heading uppercase tracking-wider"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {wishlistProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="rounded-sm border-2 border-border shadow-none hover:border-primary transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button
                          onClick={() =>
                            removeFromWishlist(product.id, "product")
                          }
                          variant="ghost"
                          size="icon"
                          className="rounded-sm bg-background/90 h-8 w-8"
                        >
                          <Heart className="w-4 h-4 text-destructive fill-current" />
                        </Button>
                        <Button
                          onClick={() => onProductClick(product)}
                          variant="ghost"
                          size="icon"
                          className="rounded-sm bg-background/90 h-8 w-8"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-5">
                      <Badge
                        variant="secondary"
                        className="mb-2 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {product.category}
                      </Badge>

                      <h3 className="font-heading font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors text-lg tracking-wide">
                        {product.name}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-heading font-black text-primary">
                            ${product.priceRange.min} - $
                            {product.priceRange.max}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">
                            Min: {product.minimumOrder} units
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "suppliers" && (
          <div>
            {wishlistSuppliers.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-sm border-2 border-border">
                <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                  No Suppliers
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Start adding suppliers to your wishlist
                </p>
                <Button
                  onClick={onBack}
                  className="rounded-sm font-heading uppercase tracking-wider"
                >
                  Browse Suppliers
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {wishlistSuppliers.map((supplier) => (
                  <Card
                    key={supplier.id}
                    className="rounded-sm border-2 border-border shadow-none hover:border-primary transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => onSupplierClick(supplier.id)}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={supplier.coverImage}
                        alt={supplier.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-foreground/20"></div>

                      <div className="absolute top-3 right-3">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWishlist(supplier.id, "supplier");
                          }}
                          variant="ghost"
                          size="icon"
                          className="rounded-sm bg-background/90 h-8 w-8"
                        >
                          <Heart className="w-4 h-4 text-destructive fill-current" />
                        </Button>
                      </div>

                      <div className="absolute -bottom-6 left-4">
                        <img
                          src={supplier.avatar}
                          alt={supplier.name}
                          className="w-12 h-12 rounded-sm border-4 border-background object-cover"
                        />
                      </div>
                    </div>

                    <div className="pt-8 px-5 pb-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-heading font-bold uppercase text-foreground mb-1 group-hover:text-primary transition-colors tracking-wide">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="text-xs uppercase tracking-wide">
                              {supplier.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center bg-muted px-2 py-1 rounded-sm border border-border">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                          <span className="font-heading font-bold text-foreground text-xs">
                            {supplier.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {supplier.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {supplier.specialties
                          .slice(0, 2)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-[10px] font-bold uppercase tracking-tight"
                            >
                              {specialty}
                            </Badge>
                          ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center text-xs pt-3 border-t-2 border-border">
                        <div>
                          <div className="font-heading font-bold text-foreground">
                            {supplier.totalProducts}
                          </div>
                          <div className="text-muted-foreground uppercase tracking-wide">
                            Products
                          </div>
                        </div>
                        <div>
                          <div className="font-heading font-bold text-foreground">
                            {supplier.rating}
                          </div>
                          <div className="text-muted-foreground uppercase tracking-wide">
                            Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
