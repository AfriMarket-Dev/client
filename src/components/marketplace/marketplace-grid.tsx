import { RiCloseLine } from "@remixicon/react";
import {
  Check,
  ChevronDown,
  Filter,
  Package,
  Search,
  X,
  ChevronLeft as RiExpandLeftLine, // Using ChevronLeft as a fallback if RiExpandLeftLine is missing
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import type { Product } from "@/app/api/products";
import { useGetProductsQuery } from "@/app/api/products";
import type { Service } from "@/app/api/services";
import { useGetServicesQuery } from "@/app/api/services";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductCard } from "./catalog/product-card";

/** unified UI type for grid items - merges Product and Service shapes */
export type MarketplaceItem =
  | (Product & { itemType: "PRODUCT" })
  | (Service & { itemType: "SERVICE" });

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface CatalogFiltersState {
  searchQuery: string;
  categoryId: string;
  type: "all" | "PRODUCT" | "SERVICE";
  district: string;
  minPrice: string;
  maxPrice: string;
  onlyInStock: boolean;
  companyType: string;
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
  onlyInStock: false,
  companyType: "all",
  sortBy: "createdAt",
  sortOrder: "DESC",
  page: 1,
});

interface MarketplaceGridProps {
  initialCategoryId?: string;
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (item: MarketplaceItem) => void;
}

const PAGE_SIZE = 30;

const COMPANY_TYPES = [
  { value: "MANUFACTURER", label: "Manufacturer" },
  { value: "WHOLESALER", label: "Wholesaler" },
  { value: "RETAILER", label: "Retailer" },
  { value: "SERVICE_PROVIDER", label: "Service Provider" },
];

interface FilterContentProps {
  filters: CatalogFiltersState;
  activeCategories: any[];
  priceRange: number[];
  handleFiltersChange: (updates: Partial<CatalogFiltersState>) => void;
  handleCategoryChange: (id: string) => void;
  handleTypeChange: (type: "all" | "PRODUCT" | "SERVICE") => void;
  handlePriceRangeChange: (value: number[]) => void;
  handlePriceFilterApply: () => void;
  setPriceRange: (val: number[]) => void;
}

// Reusable Filter Content Component
const FilterContent: React.FC<FilterContentProps> = ({
  filters,
  activeCategories,
  priceRange,
  handleFiltersChange,
  handleCategoryChange,
  handleTypeChange,
  handlePriceRangeChange,
  handlePriceFilterApply,
  setPriceRange,
}) => {
  return (
    <div className="space-y-8 p-1">
      {/* Category */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Category
        </Label>
        <Select
          value={filters.categoryId}
          onValueChange={(val) => handleCategoryChange(val || "all")}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {activeCategories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Company Type */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Company Type
        </Label>
        <Select
          value={filters.companyType}
          onValueChange={(val) =>
            handleFiltersChange({ companyType: val || "all" })
          }
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="All Company Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {COMPANY_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Listing Type */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Listing Type
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {(["all", "PRODUCT", "SERVICE"] as const).map((t) => (
            <Button
              key={t}
              variant={filters.type === t ? "default" : "outline"}
              size="sm"
              onClick={() => handleTypeChange(t)}
              className={cn(
                "w-full text-xs justify-start",
                filters.type === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-background",
              )}
            >
              {filters.type === t && <Check className="w-3 h-3 mr-1" />}
              {t === "all" ? "Any" : t === "PRODUCT" ? "Product" : "Service"}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider">
            Price Range
          </Label>
        </div>
        <Slider
          defaultValue={[0, 1000000]}
          value={priceRange}
          max={2000000}
          step={10000}
          onValueChange={(val) => handlePriceRangeChange(val as number[])}
          onValueCommitted={handlePriceFilterApply}
          className="py-4"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{priceRange[0].toLocaleString()} RWF</span>
          <span>{priceRange[1].toLocaleString()}+ RWF</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="h-8 text-xs bg-background"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="h-8 text-xs bg-background"
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="w-full text-xs mt-2"
          onClick={handlePriceFilterApply}
        >
          Apply Price
        </Button>
      </div>

      <Separator />

      {/* District */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Location
        </Label>
        <Input
          placeholder="e.g. Gasabo, Kicukiro..."
          value={filters.district}
          onChange={(e) => handleFiltersChange({ district: e.target.value })}
          className="h-9 bg-background"
        />
      </div>

      <Separator />

      {/* Availability */}
      <div className="flex items-center justify-between space-x-2 border p-3 rounded-md border-border bg-background">
        <Label
          htmlFor="stock-mode"
          className="text-sm font-medium cursor-pointer"
        >
          In Stock Only
        </Label>
        <Switch
          id="stock-mode"
          checked={filters.onlyInStock}
          onCheckedChange={(checked: boolean) =>
            handleFiltersChange({ onlyInStock: checked })
          }
        />
      </div>
    </div>
  );
};

const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  initialCategoryId = "all",
  onSupplierClick,
  onProductClick,
}) => {
  const [viewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<CatalogFiltersState>(() => ({
    ...defaultCatalogFiltersState(),
    categoryId: initialCategoryId,
  }));
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [page, setPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFiltersChange({ searchQuery: searchInput });
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Sync slider with filters
  useEffect(() => {
    if (filters.minPrice || filters.maxPrice) {
      setPriceRange([
        Number(filters.minPrice) || 0,
        Number(filters.maxPrice) || 1000000,
      ]);
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setFilters((f) => ({ ...f, categoryId: initialCategoryId }));
    setPage(1);
  }, [initialCategoryId]);

  const sharedQueryParams = {
    page,
    limit: PAGE_SIZE,
    query: filters.searchQuery.trim() || undefined,
    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
    district: filters.district.trim() || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    companyType:
      filters.companyType === "all" ? undefined : filters.companyType,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  const skipProducts = filters.type === "SERVICE";
  const skipServices = filters.type === "PRODUCT";

  const { data: productsData } = useGetProductsQuery(
    { ...sharedQueryParams, inStock: filters.onlyInStock ? true : undefined },
    { skip: skipProducts },
  );

  const { data: servicesData } = useGetServicesQuery(sharedQueryParams, {
    skip: skipServices,
  });

  const { data: categoriesData } = useGetProductCategoriesQuery({ limit: 50 });

  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

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
    setSearchInput("");
    setPriceRange([0, 1000000]);
    setPage(1);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    setFilters((f) => ({
      ...f,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      page: 1,
    }));
  };

  const handleTypeChange = (type: "all" | "PRODUCT" | "SERVICE") => {
    setFilters((f) => ({ ...f, type, page: 1 }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters((f) => ({
      ...f,
      categoryId,
      page: 1,
    }));
  };

  // Merge product and service API streams for unified rendering.
  const apiProducts: MarketplaceItem[] = (productsData?.data ?? []).map(
    (p) => ({ ...p, itemType: "PRODUCT" as const }),
  );
  const apiServices: MarketplaceItem[] = (servicesData?.data ?? []).map(
    (s) => ({ ...s, itemType: "SERVICE" as const }),
  );
  const apiItems = [...apiProducts, ...apiServices];
  const activeItems = apiItems;
  const activeCategories = categoriesData?.data ?? [];

  const combinedTotal =
    (productsData?.meta?.total ?? 0) + (servicesData?.meta?.total ?? 0);

  const activeMeta =
    filters.type === "PRODUCT"
      ? productsData?.meta
      : filters.type === "SERVICE"
        ? servicesData?.meta
        : {
            page,
            limit: PAGE_SIZE,
            total: combinedTotal,
            totalPages: Math.max(1, Math.ceil(combinedTotal / PAGE_SIZE)),
          };

  const commonFilterProps = {
    filters,
    activeCategories,
    priceRange,
    handleFiltersChange,
    handleCategoryChange,
    handleTypeChange,
    handlePriceRangeChange,
    handlePriceFilterApply: applyPriceFilter,
    setPriceRange,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {showFilters && (
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pr-4">
                <h2 className="text-lg font-heading font-bold uppercase tracking-wide flex items-center gap-2">
                  Filters
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] uppercase font-bold text-muted-foreground hover:text-destructive"
                    onClick={handleClearFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground md:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    <RiExpandLeftLine className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                <FilterContent {...commonFilterProps} />
              </ScrollArea>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar & Mobile Filters */}
            <div className="flex flex-col gap-4 mb-6 sticky top-16 lg:top-0 z-30 bg-background/95 backdrop-blur-md py-4 border-b border-border">
              <div className="flex gap-4 items-center">
                {/* Desktop Toggle Button (when hidden) */}
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "hidden lg:flex shrink-0",
                    showFilters && "bg-muted/50",
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                  title={showFilters ? "Hide Filters" : "Show Filters"}
                >
                  {showFilters ? (
                    <RiExpandLeftLine className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <RiCloseLine className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full sm:w-auto">
                  <Collapsible
                    open={isMobileFiltersOpen}
                    onOpenChange={setIsMobileFiltersOpen}
                    className="w-full"
                  >
                    <CollapsibleTrigger
                      className={cn(
                        "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full sm:w-auto gap-2 shrink-0 sm:justify-center",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                        {(filters.minPrice ||
                          filters.maxPrice ||
                          filters.district ||
                          filters.type !== "all" ||
                          filters.categoryId !== "all" ||
                          filters.onlyInStock ||
                          filters.companyType !== "all") && (
                          <Badge
                            variant="secondary"
                            className="ml-1 h-5 px-1.5 text-[10px]"
                          >
                            Active
                          </Badge>
                        )}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isMobileFiltersOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 p-4 border rounded-md bg-background shadow-sm space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading font-bold uppercase text-sm">
                          Refine Search
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearFilters}
                          className="text-xs h-6"
                        >
                          Reset All
                        </Button>
                      </div>
                      <FilterContent {...commonFilterProps} />
                      <Button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="w-full mt-4"
                      >
                        Close Filters
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="relative flex-1 hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products, services..."
                    className="pl-9 bg-muted/30 border-border rounded-sm focus:ring-1 focus:ring-primary h-10 w-full"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* Mobile Search (visible only on mobile) */}
              <div className="relative flex-1 sm:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 bg-muted/30 border-border rounded-sm focus:ring-1 focus:ring-primary h-10 w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              {/* Active Filters Badges (Mobile/Desktop) */}
              {(filters.categoryId !== "all" ||
                filters.type !== "all" ||
                filters.companyType !== "all" ||
                filters.district ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.onlyInStock) && (
                <div className="flex flex-wrap gap-2 items-center">
                  {filters.categoryId !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {activeCategories.find((c) => c.id === filters.categoryId)
                        ?.name || "Category"}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onChange={() => handleCategoryChange("all")}
                        onClick={() => handleCategoryChange("all")}
                      />
                    </Badge>
                  )}
                  {filters.companyType !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {COMPANY_TYPES.find(
                        (t) => t.value === filters.companyType,
                      )?.label || filters.companyType}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() =>
                          handleFiltersChange({ companyType: "all" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.type !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {filters.type}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() => handleFiltersChange({ type: "all" })}
                      />
                    </Badge>
                  )}
                  {filters.district && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      Loc: {filters.district}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() => handleFiltersChange({ district: "" })}
                      />
                    </Badge>
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {Number(filters.minPrice || 0).toLocaleString()} -{" "}
                      {Number(filters.maxPrice || 1000000).toLocaleString()} RWF
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() =>
                          handleFiltersChange({ minPrice: "", maxPrice: "" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.onlyInStock && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      In Stock
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() =>
                          handleFiltersChange({ onlyInStock: false })
                        }
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            {activeItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-sm bg-muted/5">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase text-foreground mb-3 tracking-wide">
                  No Results Found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                  We couldn't find any products or services matching your
                  current criteria. Try adjusting your search or clearing
                  filters.
                </p>
                <Button
                  size="lg"
                  className="rounded-sm font-heading uppercase tracking-wider h-12 px-8"
                  onClick={handleClearFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? cn(
                          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                          showFilters ? "xl:grid-cols-4" : "xl:grid-cols-5",
                        )
                      : "flex flex-col gap-6"
                  }
                >
                  {activeItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      listing={item as any}
                      viewMode={viewMode}
                      onSupplierClick={(e) =>
                        item.company &&
                        handleSupplierClick(
                          e,
                          (item.company as { id: string }).id,
                        )
                      }
                      onClick={() => onProductClick?.(item)}
                      isInWishlist={isAuthenticated && wishlistIds.has(item.id)}
                      onToggleWishlist={
                        isAuthenticated
                          ? (e) => {
                              e.stopPropagation();
                              const typeStr = item.itemType?.toLowerCase() as
                                | "product"
                                | "service";
                              if (wishlistIds.has(item.id)) {
                                removeFromWishlist({
                                  id: item.id,
                                  type: typeStr,
                                });
                              } else {
                                addToWishlist({ id: item.id, type: typeStr });
                              }
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>

                {/* Pagination */}
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
                        {/* Page Numbers */}
                        {Array.from({
                          length: Math.min(5, activeMeta.totalPages),
                        }).map((_, i) => {
                          let pNum = i + 1;
                          if (activeMeta.totalPages > 5) {
                            if (page > 3) pNum = page - 2 + i;
                            if (activeMeta.totalPages - page < 2) {
                              pNum = activeMeta.totalPages - 4 + i;
                            }
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
                              if (page < activeMeta.totalPages)
                                setPage(page + 1);
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
      </div>
    </div>
  );
};

export default MarketplaceGrid;
