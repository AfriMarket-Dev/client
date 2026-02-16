import React, { useState, useCallback, useEffect } from "react";
import { Package } from "lucide-react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { useGetListingsQuery } from "@/app/api/listings";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/app/api/wishlist";
import { Button } from "@/components/ui/Button";
import { CatalogHeader } from "./catalog/CatalogHeader";
import { CatalogFilters, defaultCatalogFiltersState, type CatalogFiltersState } from "./catalog/CatalogFilters";
import { ProductCard } from "./catalog/ProductCard";
import type { Listing } from "@/app/api/listings";

interface ProductCatalogProps {
  initialCategoryId?: string;
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (listing: Listing) => void;
}

const PAGE_SIZE = 12;

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialCategoryId = "all",
  onSupplierClick,
  onProductClick,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<CatalogFiltersState>(() => ({
    ...defaultCatalogFiltersState(),
    categoryId: initialCategoryId,
  }));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilters((f) => ({ ...f, categoryId: initialCategoryId }));
    setPage(1);
  }, [initialCategoryId]);

  const { data: listData, isLoading: listLoading } = useGetListingsQuery({
    page,
    limit: PAGE_SIZE,
    query: filters.searchQuery.trim() || undefined,
    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
    type: filters.type === "all" ? undefined : (filters.type as "PRODUCT" | "SERVICE"),
    district: filters.district.trim() || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetListingCategoriesQuery({ limit: 50 });

  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const listings = listData?.data ?? [];
  const meta = listData?.meta;
  const categories = categoriesData?.data ?? [];
  const wishlistIds = new Set(Array.isArray(wishlist) ? wishlist.map((l: { id: string }) => l.id) : []);

  const handleSupplierClick = useCallback(
    (e: React.MouseEvent, companyId: string) => {
      e.stopPropagation();
      onSupplierClick?.(companyId);
    },
    [onSupplierClick],
  );

  const handleFiltersChange = (updates: Partial<CatalogFiltersState>) => {
    setFilters((f) => ({ ...f, ...updates }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(defaultCatalogFiltersState());
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <CatalogHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <CatalogFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        categories={categories}
        isLoading={categoriesLoading}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
            <span className="text-foreground font-bold">
              {meta?.total ?? 0}
            </span>{" "}
            Results
          </p>
        </div>

        {listLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-sm border border-border bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {listings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  listing={listing}
                  viewMode={viewMode}
                  onSupplierClick={(e) =>
                    listing.company &&
                    handleSupplierClick(e, (listing.company as { id: string }).id)
                  }
                  onClick={() => onProductClick?.(listing)}
                  isInWishlist={isAuthenticated && wishlistIds.has(listing.id)}
                  onToggleWishlist={
                    isAuthenticated
                      ? (e) => {
                          e.stopPropagation();
                          if (wishlistIds.has(listing.id)) {
                            removeFromWishlist(listing.id);
                          } else {
                            addToWishlist(listing.id);
                          }
                        }
                      : undefined
                  }
                />
              ))}
            </div>

            {listings.length === 0 && (
              <div className="text-center py-12 md:py-20 bg-card rounded-sm border border-border">
                <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                  No Materials Found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
                  We couldn&apos;t find any products matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="rounded-sm border border-border font-heading uppercase tracking-wider"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {meta.page} of {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;