import {
  RiArrowLeftLine,
  RiHeartLine,
  RiLayoutGridLine,
  RiUserLine,
} from "@remixicon/react";
import {
  LayoutList as RiListCheckLine,
  Package as RiPackageLine,
  Settings as RiServiceLine,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./catalog/product-card";
import { ServiceCard } from "./catalog/service-card";

interface WishlistProps {
  onBack: () => void;
  onProductClick: (item: any) => void;
  onSupplierClick: (supplierId: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({
  onBack,
  onProductClick,
  onSupplierClick,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { data: wishlistRaw = [], isLoading } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [activeTab, setActiveTab] = useState<
    "products" | "services" | "suppliers"
  >("products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = useMemo(
    () =>
      Array.isArray(wishlistRaw)
        ? wishlistRaw.filter((item) => item.type === "product")
        : [],
    [wishlistRaw],
  );

  const services = useMemo(
    () =>
      Array.isArray(wishlistRaw)
        ? wishlistRaw.filter((item) => item.type === "service")
        : [],
    [wishlistRaw],
  );

  const wishlistCount = wishlistRaw.length;

  const handleToggleWishlist = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    removeFromWishlist({ id: item.id, type: item.type });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
          Loading Wishlist...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="gap-2 font-display uppercase text-[10px] font-bold tracking-widest rounded-none border border-border/10 h-10 px-4"
              >
                <RiArrowLeftLine className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-display font-extrabold uppercase text-foreground flex items-center gap-2 tracking-tight">
                  <RiHeartLine className="w-6 h-6 text-primary" />
                  Wishlist
                </h1>
                <p className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {wishlistCount} items saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted/30 border border-border/10 p-1 rounded-none">
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                >
                  <RiLayoutGridLine className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                >
                  <RiListCheckLine className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="bg-background border-b border-border/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`flex items-center py-5 px-1 border-b-2 font-display font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
                activeTab === "products"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground/40 hover:text-foreground"
              }`}
            >
              <RiPackageLine className="w-4 h-4 mr-2" />
              Products ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`flex items-center py-5 px-1 border-b-2 font-display font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
                activeTab === "services"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground/40 hover:text-foreground"
              }`}
            >
              <RiServiceLine className="w-4 h-4 mr-2" />
              Services ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("suppliers")}
              className={`flex items-center py-5 px-1 border-b-2 font-display font-bold text-[10px] uppercase tracking-[0.2em] transition-all opacity-30 cursor-not-allowed ${
                activeTab === "suppliers"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground/40"
              }`}
            >
              <RiUserLine className="w-4 h-4 mr-2" />
              Suppliers (0)
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        {activeTab === "products" && (
          <div>
            {products.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-border/20">
                <RiPackageLine className="w-12 h-12 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-sm font-display font-bold uppercase tracking-widest text-muted-foreground/40">
                  No products in wishlist
                </h3>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {products.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={{ ...item, itemType: "PRODUCT" } as any}
                    viewMode={viewMode}
                    isInWishlist={true}
                    onToggleWishlist={(e) => handleToggleWishlist(e, item)}
                    onClick={() => onProductClick(item)}
                    onSupplierClick={(e) => {
                      e.stopPropagation();
                      onSupplierClick(item.company?.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div>
            {services.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-border/20">
                <RiServiceLine className="w-12 h-12 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-sm font-display font-bold uppercase tracking-widest text-muted-foreground/40">
                  No services in wishlist
                </h3>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {services.map((item) => (
                  <ServiceCard
                    key={item.id}
                    service={item}
                    viewMode={viewMode}
                    isInWishlist={true}
                    onToggleWishlist={(e) => handleToggleWishlist(e, item)}
                    onClick={() => onProductClick(item)}
                    onSupplierClick={(e) => {
                      e.stopPropagation();
                      onSupplierClick(item.company?.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "suppliers" && (
          <div className="text-center py-32 border border-dashed border-border/20">
            <RiUserLine className="w-12 h-12 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-sm font-display font-bold uppercase tracking-widest text-muted-foreground/40">
              Supplier wishlist coming soon
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
