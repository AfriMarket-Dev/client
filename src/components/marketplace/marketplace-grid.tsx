import {
  Check,
  ChevronDown,
  ChevronLeft,
  Filter,
  LayoutGrid,
  List,
  Package,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import type { Product } from "@/app/api/products";
import {
  selectProductsData,
  selectProductsMeta,
  useGetProductsQuery,
} from "@/app/api/products";
import type { Service } from "@/app/api/services";
import {
  selectServicesData,
  selectServicesMeta,
  useGetServicesQuery,
} from "@/app/api/services";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ProductCard } from "./catalog/product-card";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ListingType = "all" | "PRODUCT" | "SERVICE";

export type MarketplaceItem =
  | (Product & { itemType: "PRODUCT" })
  | (Service & { itemType: "SERVICE" });

export interface CatalogFilters {
  searchQuery: string;
  categoryId: string;
  type: ListingType;
  district: string;
  minPrice: string;
  maxPrice: string;
  onlyInStock: boolean;
  companyType: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
  page: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PAGE_SIZE = 30;

const COMPANY_TYPES = [
  { value: "MANUFACTURER", label: "Manufacturer" },
  { value: "WHOLESALER", label: "Wholesaler" },
  { value: "RETAILER", label: "Retailer" },
  { value: "SERVICE_PROVIDER", label: "Service Provider" },
] as const;

const DEFAULT_PRICE_MAX = 1_000_000;

function defaultFilters(
  overrides: Partial<CatalogFilters> = {},
): CatalogFilters {
  return {
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
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MarketplaceGridProps {
  initialCategoryId?: string;
  initialType?: ListingType;
  onTypeChange?: (type: ListingType) => void;
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (item: MarketplaceItem) => void;
}

// ---------------------------------------------------------------------------
// Filter panel
// ---------------------------------------------------------------------------

interface FilterPanelProps {
  filters: CatalogFilters;
  categories: Array<{ id: string; name: string }>;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  onPriceCommit: () => void;
  onFilterChange: (patch: Partial<CatalogFilters>) => void;
}

const FilterPanel = memo<FilterPanelProps>(
  ({
    filters,
    categories,
    priceRange,
    onPriceRangeChange,
    onPriceCommit,
    onFilterChange,
  }) => {
    return (
      <div className="space-y-8 p-1">
        {/* Category */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Category Verticals
          </Label>
          <Select
            value={filters.categoryId}
            onValueChange={(val) =>
              onFilterChange({ categoryId: val, page: 1 })
            }
          >
            <SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border/20">
              <SelectItem value="all" className="rounded-none">
                All Categories
              </SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="rounded-none">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="opacity-10" />

        {/* Company Type */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Supplier Class
          </Label>
          <Select
            value={filters.companyType}
            onValueChange={(val) =>
              onFilterChange({ companyType: val, page: 1 })
            }
          >
            <SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border/20">
              <SelectItem value="all" className="rounded-none">
                All Classes
              </SelectItem>
              {COMPANY_TYPES.map((t) => (
                <SelectItem
                  key={t.value}
                  value={t.value}
                  className="rounded-none"
                >
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="opacity-10" />

        {/* Listing Type */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Protocol Type
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {(["all", "PRODUCT", "SERVICE"] as const).map((t) => (
              <Button
                key={t}
                variant={filters.type === t ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange({ type: t, page: 1 })}
                className={cn(
                  "w-full text-[9px] font-black uppercase tracking-widest h-9 rounded-none transition-all",
                  filters.type === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/20",
                )}
              >
                {t === "all" ? "Any" : t === "PRODUCT" ? "Product" : "Service"}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="opacity-10" />

        {/* Sort */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Operational Order
          </Label>
          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(val) => onFilterChange({ sortBy: val, page: 1 })}
            >
              <SelectTrigger className="flex-1 bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border/20">
                <SelectItem
                  value="createdAt"
                  className="rounded-none text-[10px] font-bold uppercase tracking-widest"
                >
                  Newest
                </SelectItem>
                <SelectItem
                  value="price"
                  className="rounded-none text-[10px] font-bold uppercase tracking-widest"
                >
                  Price
                </SelectItem>
                <SelectItem
                  value="name"
                  className="rounded-none text-[10px] font-bold uppercase tracking-widest"
                >
                  Name
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 px-3 rounded-none border-border/20 h-10"
              onClick={() =>
                onFilterChange({
                  sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
                  page: 1,
                })
              }
            >
              {filters.sortOrder === "ASC" ? "↑" : "↓"}
            </Button>
          </div>
        </div>

        <Separator className="opacity-10" />

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Capital Range
          </Label>
          <Slider
            value={priceRange}
            max={2_000_000}
            step={10_000}
            onValueChange={(val) => onPriceRangeChange(val as [number, number])}
            onValueCommit={onPriceCommit}
            className="py-4"
          />
          <div className="flex items-center justify-between text-[9px] font-black text-primary uppercase tracking-widest">
            <span>{priceRange[0].toLocaleString()} RWF</span>
            <span>{priceRange[1].toLocaleString()}+ RWF</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0] || ""}
              onChange={(e) =>
                onPriceRangeChange([Number(e.target.value), priceRange[1]])
              }
              className="h-10 bg-background rounded-none border-border/20 text-[10px] font-bold uppercase tracking-widest"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1] || ""}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], Number(e.target.value)])
              }
              className="h-10 bg-background rounded-none border-border/20 text-[10px] font-bold uppercase tracking-widest"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-[10px] font-black uppercase tracking-[0.2em] h-10 rounded-none bg-muted/50 border border-border/10 hover:bg-primary hover:text-white transition-all"
            onClick={onPriceCommit}
          >
            Update Range
          </Button>
        </div>

        <Separator className="opacity-10" />

        {/* District */}
        <div className="space-y-4">
          <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-[0.2em] block">
            Location Node
          </Label>
          <Input
            placeholder="e.g. Gasabo, Kicukiro..."
            value={filters.district}
            onChange={(e) =>
              onFilterChange({ district: e.target.value, page: 1 })
            }
            className="h-10 bg-background rounded-none border-border/20 text-[10px] font-bold uppercase tracking-widest placeholder:text-muted-foreground/30"
          />
        </div>

        <Separator className="opacity-10" />

        {/* In Stock */}
        <div className="flex items-center justify-between border p-4 rounded-none border-border/20 bg-muted/5">
          <Label
            htmlFor="stock-toggle"
            className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
          >
            Available Now
          </Label>
          <Switch
            id="stock-toggle"
            className="rounded-none scale-90"
            checked={filters.onlyInStock}
            onCheckedChange={(checked) =>
              onFilterChange({ onlyInStock: checked, page: 1 })
            }
          />
        </div>
      </div>
    );
  },
);
FilterPanel.displayName = "FilterPanel";

// ---------------------------------------------------------------------------
// Active filter badges
// ---------------------------------------------------------------------------

interface ActiveFiltersProps {
  filters: CatalogFilters;
  categories: Array<{ id: string; name: string }>;
  onFilterChange: (patch: Partial<CatalogFilters>) => void;
}

const ActiveFilters = memo<ActiveFiltersProps>(
  ({ filters, categories, onFilterChange }) => {
    const active =
      filters.categoryId !== "all" ||
      filters.type !== "all" ||
      filters.companyType !== "all" ||
      filters.district ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.onlyInStock;

    if (!active) return null;

    return (
      <div className="flex flex-wrap gap-2 items-center mt-2">
        {filters.categoryId !== "all" && (
          <FilterBadge
            label={
              categories.find((c) => c.id === filters.categoryId)?.name ??
              "Category"
            }
            onRemove={() => onFilterChange({ categoryId: "all", page: 1 })}
          />
        )}
        {filters.companyType !== "all" && (
          <FilterBadge
            label={
              COMPANY_TYPES.find((t) => t.value === filters.companyType)
                ?.label ?? filters.companyType
            }
            onRemove={() => onFilterChange({ companyType: "all", page: 1 })}
          />
        )}
        {filters.type !== "all" && (
          <FilterBadge
            label={filters.type}
            onRemove={() => onFilterChange({ type: "all", page: 1 })}
          />
        )}
        {filters.district && (
          <FilterBadge
            label={`Loc: ${filters.district}`}
            onRemove={() => onFilterChange({ district: "", page: 1 })}
          />
        )}
        {(filters.minPrice || filters.maxPrice) && (
          <FilterBadge
            label={`${Number(filters.minPrice || 0).toLocaleString()} – ${Number(
              filters.maxPrice || DEFAULT_PRICE_MAX,
            ).toLocaleString()} RWF`}
            onRemove={() =>
              onFilterChange({ minPrice: "", maxPrice: "", page: 1 })
            }
          />
        )}
        {filters.onlyInStock && (
          <FilterBadge
            label="In Stock"
            onRemove={() => onFilterChange({ onlyInStock: false, page: 1 })}
          />
        )}
      </div>
    );
  },
);
ActiveFilters.displayName = "ActiveFilters";

const FilterBadge: React.FC<{ label: string; onRemove: () => void }> = ({
  label,
  onRemove,
}) => (
  <Badge
    variant="secondary"
    className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
    >
      <X className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors" />
    </button>
  </Badge>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  initialCategoryId = "all",
  initialType = "all",
  onTypeChange,
  onSupplierClick,
  onProductClick,
}) => {
  const [filters, setFilters] = useState<CatalogFilters>(() =>
    defaultFilters({ categoryId: initialCategoryId, type: initialType }),
  );

  const [searchInput, setSearchInput] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    DEFAULT_PRICE_MAX,
  ]);
  const [showFilters, setShowFilters] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const patchFilters = useCallback(
    (patch: Partial<CatalogFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        if (patch.type != null && patch.type !== prev.type) {
          onTypeChange?.(patch.type);
        }
        return next;
      });
    },
    [onTypeChange],
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters());
    setSearchInput("");
    setPriceRange([0, DEFAULT_PRICE_MAX]);
    onTypeChange?.("all");
  }, [onTypeChange]);

  const searchDebounce = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      patchFilters({ searchQuery: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(searchDebounce.current);
  }, [searchInput, patchFilters]);

  const commitPrice = useCallback(() => {
    patchFilters({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      page: 1,
    });
  }, [priceRange, patchFilters]);

  useEffect(() => {
    if (!filters.minPrice && !filters.maxPrice) {
      setPriceRange([0, DEFAULT_PRICE_MAX]);
    }
  }, [filters.minPrice, filters.maxPrice]);

  const sharedParams = useMemo(
    () => ({
      page: filters.page,
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
    }),
    [filters],
  );

  const skipProducts = filters.type === "SERVICE";
  const skipServices = filters.type === "PRODUCT";

  const { data: productsData, isFetching: productsFetching } =
    useGetProductsQuery(
      {
        ...sharedParams,
        inStock: filters.onlyInStock ? true : undefined,
      },
      {
        skip: skipProducts,
        selectFromResult: (res) => ({
          data: {
            data: selectProductsData(res.data),
            meta: selectProductsMeta(res.data),
          },
          isFetching: res.isFetching,
        }),
      },
    );

  const { data: servicesData, isFetching: servicesFetching } =
    useGetServicesQuery(sharedParams, {
      skip: skipServices,
      selectFromResult: (res) => ({
        data: {
          data: selectServicesData(res.data),
          meta: selectServicesMeta(res.data),
        },
        isFetching: res.isFetching,
      }),
    });

  const isFetching = productsFetching || servicesFetching;

  const { data: categoriesData } = useGetProductCategoriesQuery({ limit: 50 });

  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const { data: wishlistRaw = [] } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const wishlistIds = useMemo(
    () =>
      new Set(
        Array.isArray(wishlistRaw)
          ? wishlistRaw.map((l: { id: string }) => l.id)
          : [],
      ),
    [wishlistRaw],
  );

  const items = useMemo<MarketplaceItem[]>(() => {
    const products = (productsData?.data ?? []).map(
      (p): MarketplaceItem => ({ ...p, itemType: "PRODUCT" }),
    );
    const services = (servicesData?.data ?? []).map(
      (s): MarketplaceItem => ({ ...s, itemType: "SERVICE" }),
    );
    return [...products, ...services];
  }, [productsData?.data, servicesData?.data]);

  const categories = useMemo(
    () => categoriesData?.data ?? [],
    [categoriesData?.data],
  );

  const paginationMeta = useMemo(() => {
    if (filters.type === "PRODUCT") {
      return productsData?.meta ?? null;
    }
    if (filters.type === "SERVICE") {
      return servicesData?.meta ?? null;
    }
    const totalPages = Math.max(
      productsData?.meta?.totalPages ?? 1,
      servicesData?.meta?.totalPages ?? 1,
    );
    return { page: filters.page, totalPages };
  }, [filters.type, filters.page, productsData?.meta, servicesData?.meta]);

  const handleSupplierClick = useCallback(
    (e: React.MouseEvent, companyId: string) => {
      e.stopPropagation();
      onSupplierClick?.(companyId);
    },
    [onSupplierClick],
  );

  const handleToggleWishlist = useCallback(
    (e: React.MouseEvent, item: MarketplaceItem) => {
      e.stopPropagation();
      const type = item.itemType.toLowerCase() as "product" | "service";
      if (wishlistIds.has(item.id)) {
        removeFromWishlist({ id: item.id, type });
      } else {
        addToWishlist({ id: item.id, type });
      }
    },
    [wishlistIds, addToWishlist, removeFromWishlist],
  );

  const filterPanelProps: FilterPanelProps = useMemo(
    () => ({
      filters,
      categories,
      priceRange,
      onPriceRangeChange: setPriceRange,
      onPriceCommit: commitPrice,
      onFilterChange: patchFilters,
    }),
    [filters, categories, priceRange, commitPrice, patchFilters],
  );

  const hasActiveFilters =
    filters.categoryId !== "all" ||
    filters.type !== "all" ||
    filters.companyType !== "all" ||
    !!filters.district ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    filters.onlyInStock;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-black uppercase text-foreground tracking-tighter leading-none mb-2">
                Market Registry
              </h1>
              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                Asset protocol / Global inventory nodes
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-muted/30 border border-border/10 p-1 rounded-none">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)]">
              <div className="flex items-center justify-between mb-8 pr-4">
                <h2 className="text-xs font-display font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Parameters
                </h2>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[9px] uppercase font-black tracking-widest text-muted-foreground/40 hover:text-destructive hover:bg-transparent"
                      onClick={resetFilters}
                    >
                      Reset Protocol
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground md:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                <FilterPanel {...filterPanelProps} />
              </ScrollArea>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6 sticky top-16 lg:top-0 z-20 bg-background/95 backdrop-blur-md py-2 lg:py-4">
              <div className="flex gap-4 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "hidden lg:flex shrink-0 rounded-none border-border/20",
                    showFilters && "bg-muted/30 border-primary/20",
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                  title={showFilters ? "Hide Filters" : "Show Filters"}
                >
                  <SlidersHorizontal
                    className={cn(
                      "w-4 h-4",
                      hasActiveFilters && "text-primary",
                    )}
                  />
                </Button>

                {/* Mobile Filter */}
                <div className="lg:hidden w-full sm:w-auto">
                  <Collapsible
                    open={isMobileFiltersOpen}
                    onOpenChange={setIsMobileFiltersOpen}
                    className="w-full"
                  >
                    <CollapsibleTrigger
                      className={cn(
                        "inline-flex items-center justify-between whitespace-nowrap rounded-none text-[10px] font-display font-bold uppercase tracking-widest ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border/20 bg-background hover:bg-muted h-10 px-4 w-full sm:w-auto gap-4 shrink-0 sm:justify-center transition-all",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                        {hasActiveFilters && (
                          <Badge
                            variant="secondary"
                            className="ml-2 h-5 px-2 text-[9px] font-black uppercase tracking-widest rounded-none bg-primary text-primary-foreground"
                          >
                            Active
                          </Badge>
                        )}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isMobileFiltersOpen && "rotate-180",
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 p-4 border rounded-none border-border/20 bg-background shadow-sm space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-black uppercase text-xs tracking-widest">
                          Refine Registry
                        </h3>
                        {hasActiveFilters && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-[10px] font-black uppercase tracking-widest h-6"
                          >
                            Reset All
                          </Button>
                        )}
                      </div>
                      <FilterPanel {...filterPanelProps} />
                      <Button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="w-full mt-6 rounded-none font-display font-black uppercase tracking-widest h-12"
                      >
                        Apply Filters
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="SEARCH REGISTRY NODES..."
                    className="pl-12 bg-muted/10 border-border/20 rounded-none focus:ring-0 focus:border-primary/40 h-11 w-full font-display font-bold uppercase tracking-widest text-[10px] transition-all"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              <ActiveFilters
                filters={filters}
                categories={categories}
                onFilterChange={patchFilters}
              />
            </div>

            {/* Results */}
            {isFetching && items.length === 0 ? (
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                  showFilters
                    ? "xl:grid-cols-3"
                    : "xl:grid-cols-4 2xl:grid-cols-5",
                )}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 rounded-none border border-border/5 bg-muted/5 animate-pulse"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-border/20 rounded-none bg-muted/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="w-24 h-24 bg-primary/5 rounded-none border border-primary/20 flex items-center justify-center mb-10 relative z-10 transition-transform duration-500 hover:scale-110">
                  <Package className="w-10 h-10 text-primary/40" />
                </div>
                <h3 className="text-3xl font-display font-black uppercase text-foreground mb-4 tracking-tighter relative z-10">
                  No Assets Registry
                </h3>
                <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.3em] max-w-md mx-auto mb-12 leading-relaxed relative z-10">
                  Criteria mismatch / Asset node not found
                </p>
                <Button
                  size="lg"
                  className="rounded-none font-display font-black uppercase tracking-[0.2em] h-14 px-10 relative z-10"
                  onClick={resetFilters}
                >
                  Reset Protocol
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? cn(
                          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                          showFilters
                            ? "xl:grid-cols-3"
                            : "xl:grid-cols-4 2xl:grid-cols-5",
                        )
                      : "flex flex-col gap-6",
                    isFetching &&
                      "opacity-60 pointer-events-none transition-opacity",
                  )}
                >
                  {items.map((item) => (
                    <ProductCard
                      key={item.id}
                      listing={item}
                      viewMode={viewMode}
                      onSupplierClick={
                        item.company
                          ? (e) =>
                              handleSupplierClick(
                                e,
                                (item.company as { id: string }).id,
                              )
                          : undefined
                      }
                      onClick={() => onProductClick?.(item)}
                      isInWishlist={isAuthenticated && wishlistIds.has(item.id)}
                      onToggleWishlist={
                        isAuthenticated
                          ? (e) => handleToggleWishlist(e, item)
                          : undefined
                      }
                    />
                  ))}
                </div>

                {/* Pagination */}
                {paginationMeta && paginationMeta.totalPages > 1 && (
                  <div className="flex justify-center gap-4 mt-16 pt-10 border-t border-border/20">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none font-display font-bold uppercase tracking-widest text-[9px] h-10 px-6 border-border/40"
                      disabled={filters.page <= 1}
                      onClick={() => patchFilters({ page: filters.page - 1 })}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-6 text-[10px] font-display font-black uppercase tracking-widest text-muted-foreground/30">
                      Registry Node {paginationMeta.page} of{" "}
                      {paginationMeta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none font-display font-bold uppercase tracking-widest text-[9px] h-10 px-6 border-border/40"
                      disabled={filters.page >= paginationMeta.totalPages}
                      onClick={() => patchFilters({ page: filters.page + 1 })}
                    >
                      Next
                    </Button>
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildPageNumbers(currentPage: number, totalPages: number): number[] {
  const windowSize = Math.min(5, totalPages);
  let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
