import React, { useState, useCallback, useMemo } from "react";
import { Package } from "lucide-react";
import { products, suppliers } from "../data/mockData";
import { type Product } from "../types";
import { useWishlist } from "../hooks/useWishlist";
import { Button } from "@/components/ui/Button";
import { CatalogHeader } from "./catalog/CatalogHeader";
import { CatalogFilters } from "./catalog/CatalogFilters";
import { ProductCard } from "./catalog/ProductCard";

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleToggleWishlist = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.stopPropagation();
      if (isInWishlist(product.id, "product")) {
        removeFromWishlist(product.id, "product");
      } else {
        addToWishlist(product, "product");
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist],
  );

  const handleSupplierClick = useCallback(
    (e: React.MouseEvent, supplierId: string) => {
      e.stopPropagation();
      onSupplierClick?.(supplierId);
    },
    [onSupplierClick],
  );

  return (
    <div className="min-h-screen bg-background">
      <CatalogHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CatalogFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFilters={showFilters}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                <span className="text-foreground font-bold">
                  {filteredProducts.length}
                </span>{" "}
                Results
              </p>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) => {
                const supplier = suppliers.find(
                  (s) => s.id === product.supplierId,
                );
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    supplier={supplier}
                    viewMode={viewMode}
                    isInWishlist={isInWishlist(product.id, "product")}
                    onToggleWishlist={(e) => handleToggleWishlist(e, product)}
                    onSupplierClick={(e) =>
                      supplier && handleSupplierClick(e, supplier.id)
                    }
                    onClick={() => onProductClick?.(product)}
                  />
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-card rounded-sm border-2 border-border">
                <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                  No Materials Found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
                  We couldn't find any products matching your current filters.
                </p>
                <Button
                  variant="outline"
                  className="rounded-sm border-2 border-border font-heading uppercase tracking-wider"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
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
