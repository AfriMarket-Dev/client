import React, { useState, useCallback, useEffect } from "react";
import { Package, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { useGetListingsQuery } from "@/app/api/listings";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import { Button } from "@/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { ProductCard } from "./catalog/ProductCard";
import type { Listing } from "@/app/api/listings";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export interface CatalogFiltersState {
  searchQuery: string;
  categoryId: string;
  type: "all" | "PRODUCT" | "SERVICE";
  district: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
  page: number;
}

export const defaultCatalogFiltersState = (): CatalogFiltersState => ({
  searchQuery: "",
  categoryId: "all",
  type: "all",
  district: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "createdAt",
  sortOrder: "DESC",
  page: 1,
});

interface MarketplaceGridProps {
  initialCategoryId?: string;
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (listing: Listing) => void;
}

const PAGE_SIZE = 12;

const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dummy Data for Development
  const dummyCategories = [
    {
      id: "1",
      name: "Construction Materials",
      description: "Cement, Steel, Wood",
    },
    { id: "2", name: "Heavy Equipment", description: "Excavators, Cranes" },
    { id: "3", name: "Electrical & Plumbing", description: "Wires, Pipes" },
    {
      id: "4",
      name: "Professional Services",
      description: "Architects, Engineers",
    },
    { id: "5", name: "Finishing & Decor", description: "Tiles, Paint" },
  ];

  const dummyListings: Listing[] = [
    {
      id: "d1",
      name: "Premium Portland Cement",
      description:
        "High-grade cement suitable for all general construction purposes. 50kg bags.",
      type: "PRODUCT",
      priceType: "FIXED",
      isActive: true,
      views: 120,
      category: { id: "1", name: "Construction Materials" },
      company: {
        id: "c1",
        name: "Kigali Cement Co.",
        slug: "kigali-cement",
        district: "Kicukiro",
        isVerified: true,
      },
      variants: [
        {
          id: "v1",
          name: "50kg Bag",
          price: 12500,
          stock: 1000,
          images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=500",
          ],
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "d2",
      name: "Steel Rebar 12mm",
      description:
        "High-tensile steel reinforcement bars for structural concrete.",
      type: "PRODUCT",
      priceType: "FIXED",
      isActive: true,
      views: 85,
      category: { id: "1", name: "Construction Materials" },
      company: {
        id: "c2",
        name: "Rwanda Steel",
        slug: "rwanda-steel",
        district: "Bugesera",
        isVerified: true,
      },
      variants: [
        {
          id: "v2",
          name: "12mm Bar (12m)",
          price: 9500,
          stock: 500,
          images: [
            "https://images.unsplash.com/photo-1535063406622-4a0b25e792c3?auto=format&fit=crop&q=80&w=500",
          ],
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "d3",
      name: "Excavator Rental Service",
      description: "Daily rental of CAT 320D Excavator with operator.",
      type: "SERVICE",
      priceType: "STARTS_AT",
      isActive: true,
      views: 200,
      category: { id: "2", name: "Heavy Equipment" },
      company: {
        id: "c3",
        name: "BuildTech Rentals",
        slug: "buildtech",
        district: "Gasabo",
        isVerified: true,
      },
      variants: [
        {
          id: "v3",
          name: "Daily Rate",
          price: 350000,
          stock: 1,
          images: [
            "https://images.unsplash.com/photo-1567156948011-d055a6d9255a?auto=format&fit=crop&q=80&w=500",
          ],
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "d4",
      name: "Architectural Planning",
      description:
        "Complete architectural design and permit processing services.",
      type: "SERVICE",
      priceType: "NEGOTIABLE",
      isActive: true,
      views: 150,
      category: { id: "4", name: "Professional Services" },
      company: {
        id: "c4",
        name: "Urban Design Studio",
        slug: "urban-design",
        district: "Nyarugenge",
        isVerified: true,
      },
      variants: [
        {
          id: "v4",
          name: "Consultation",
          price: 50000,
          stock: 1,
          images: [
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=500",
          ],
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "d5",
      name: "Interior Paint - White",
      description: "Premium washable interior paint, 20L bucket.",
      type: "PRODUCT",
      priceType: "FIXED",
      isActive: true,
      views: 95,
      category: { id: "5", name: "Finishing & Decor" },
      company: {
        id: "c5",
        name: "ColorWorld",
        slug: "color-world",
        district: "Gasabo",
        isVerified: false,
      },
      variants: [
        {
          id: "v5",
          name: "20L Bucket",
          price: 45000,
          stock: 200,
          images: [
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500",
          ],
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    setFilters((f) => ({ ...f, categoryId: initialCategoryId }));
    setPage(1);
  }, [initialCategoryId]);

  const { data: listData, isLoading: listLoading } = useGetListingsQuery({
    page,
    limit: PAGE_SIZE,
    query: filters.searchQuery.trim() || undefined,
    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
    type:
      filters.type === "all"
        ? undefined
        : (filters.type as "PRODUCT" | "SERVICE"),
    district: filters.district.trim() || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetListingCategoriesQuery({ limit: 50 });

  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const listings = listData?.data ?? [];
  const meta = listData?.meta;
  const categories = categoriesData?.data ?? [];
  const wishlistIds = new Set(
    Array.isArray(wishlist) ? wishlist.map((l: { id: string }) => l.id) : [],
  );

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

  // Use dummy data if API returns empty
  const isDummyMode = !listData?.data || listData.data.length === 0;

  const activeListings = isDummyMode ? dummyListings : listData.data;
  const activeCategories =
    categoriesData?.data && categoriesData.data.length > 0
      ? categoriesData.data
      : dummyCategories;

  // Create activeMeta to support pagination in dummy mode
  const activeMeta = isDummyMode
    ? { page, limit: PAGE_SIZE, total: 50, totalPages: 5 } // 5 pages of dummy data
    : listData.meta;

  const showDummyWarning = !listData?.data || listData.data.length === 0;

  const handleTypeChange = (type: "all" | "PRODUCT" | "SERVICE") => {
    setFilters((f) => ({ ...f, type, page: 1 }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters((f) => ({
      ...f,
      categoryId: f.categoryId === categoryId ? "all" : categoryId,
      page: 1,
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Premium Editorial Header */}
      <div className="relative bg-muted/20 border-b border-border mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
            Marketplace
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
            Source premium materials, equipment, and professional services from
            verified African suppliers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Type Toggle & Categories */}
        <div className="flex flex-col gap-6 mb-8 sticky top-16 z-30 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b md:border-none border-border transition-all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search & Type Toggle */}
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-center">
              <div className="relative flex-1 md:w-80 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 bg-muted/30 border-border rounded-sm focus:ring-1 focus:ring-primary h-10"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFiltersChange({ searchQuery: e.target.value })
                  }
                />
              </div>

              <div className="flex p-1 bg-muted/30 rounded-sm border border-border w-full sm:w-auto">
                {(["all", "PRODUCT", "SERVICE"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                      filters.type === type
                        ? "bg-background text-primary shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {type === "all"
                      ? "All"
                      : type === "PRODUCT"
                        ? "Products"
                        : "Services"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest hidden md:inline-block">
                {listData?.meta?.total ?? 5} Items
              </span>
              <Select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onValueChange={(val) => {
                  const [sortBy, sortOrder] = val.split("-");
                  handleFiltersChange({
                    sortBy: sortBy as any,
                    sortOrder: sortOrder as any,
                  });
                }}
              >
                <SelectTrigger className="w-[160px] h-10 border-border bg-background rounded-sm text-xs font-bold uppercase tracking-wide">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">
                    Newest Arrivals
                  </SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Horizontal Category Scroll */}
          {/* Using dummyCategories if loaded is empty/loading since we want to show UI */}
          {activeCategories.length > 0 && (
            <div className="w-full overflow-x-auto no-scrollbar pb-2 -mb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wide border rounded-sm transition-colors ${
                    filters.categoryId === "all" || !filters.categoryId
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  All Categories
                </button>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wide border rounded-sm transition-colors ${
                      filters.categoryId === cat.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {false ? ( // Forced false to show data for now, or revert to listLoading if needed. actually listLoading might be true initially.
          // Let's use listLoading BUT if we have dummy data we show it.
          // Since we want to show dummy data, we should probably ignore loading state if we are showing dummy data.
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-sm border border-border bg-muted/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                  : "flex flex-col gap-6"
              }
            >
              {activeListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  listing={listing}
                  viewMode={viewMode}
                  onSupplierClick={(e) =>
                    listing.company &&
                    handleSupplierClick(
                      e,
                      (listing.company as { id: string }).id,
                    )
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

            {activeListings.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-sm bg-muted/5">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase text-foreground mb-3 tracking-wide">
                  No Results Found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                  We couldn't find any listings matching your current criteria.
                  Try adjusting your search or clearing filters.
                </p>
                <Button
                  size="lg"
                  className="rounded-sm font-heading uppercase tracking-wider h-12 px-8"
                  onClick={handleClearFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {activeMeta && activeMeta.totalPages > 1 && (
              <div className="mt-16 pt-8 border-t border-border">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* Page Numbers - Simple Sliding Window */}
                    {Array.from({
                      length: Math.min(5, activeMeta.totalPages),
                    }).map((_, i) => {
                      let pNum = i + 1;
                      if (activeMeta.totalPages > 5) {
                        if (page > 3) pNum = page - 2 + i;
                        // Adjust if we are near the end
                        if (activeMeta.totalPages - page < 2) {
                          pNum = activeMeta.totalPages - 4 + i;
                        }
                        // Safety clamp
                        if (pNum < 1) pNum = i + 1;
                      }

                      return (
                        <PaginationItem key={pNum}>
                          <PaginationLink
                            href="#"
                            isActive={page === pNum}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pNum);
                            }}
                            className="cursor-pointer"
                          >
                            {pNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < activeMeta.totalPages) setPage(page + 1);
                        }}
                        className={
                          page >= activeMeta.totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketplaceGrid;
