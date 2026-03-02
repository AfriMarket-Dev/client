import {
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Package,
  Wrench,
  Layers,
} from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketplaceFilters } from "@/hooks/use-marketplace-filters";
import { cn } from "@/lib/utils";
import { ActiveFilters } from "./active-filters";
import { FilterPanel } from "./filter-panel";
import { ProductListingView } from "./product-listing-view";
import { ServiceListingView } from "./service-listing-view";
import { CombinedView } from "./combined-view";
import type { MarketplaceItem } from "./types";

interface MarketplaceGridProps {
  onSupplierClick?: (supplierId: string) => void;
  onProductClick?: (item: MarketplaceItem) => void;
}

const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  onSupplierClick,
  onProductClick,
}) => {
  const {
    filters,
    patchFilters,
    resetFilters,
    searchInput,
    setSearchInput,
    priceRange,
    setPriceRange,
    commitPrice,
    hasActiveFilters,
  } = useMarketplaceFilters();

  const [showFilters, setShowFilters] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: categoriesData } = useGetProductCategoriesQuery({ limit: 50 });
  const categories = useMemo(
    () => categoriesData?.data ?? [],
    [categoriesData],
  );

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
          ? wishlistRaw.map((l: { id: string | number }) => String(l.id))
          : [],
      ),
    [wishlistRaw],
  );

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

  const renderView = () => {
    const commonProps = {
      viewMode,
      showFilters,
      isAuthenticated,
      wishlistIds,
      onToggleWishlist: handleToggleWishlist,
      onSupplierClick: handleSupplierClick,
    };

    if (filters.type === "PRODUCT") {
      return (
        <ProductListingView
          {...commonProps}
          onProductClick={(item) => onProductClick?.(item)}
        />
      );
    }
    if (filters.type === "SERVICE") {
      return (
        <ServiceListingView
          {...commonProps}
          onClick={(item) => onProductClick?.(item)}
        />
      );
    }
    return (
      <CombinedView
        {...commonProps}
        onProductClick={(item) => onProductClick?.(item)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4 md:py-5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h1 className="text-2xl md:text-3xl font-display font-black uppercase text-foreground tracking-tighter leading-none">
                Marketplace
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-6 bg-primary" />
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                  Procurement Infrastructure
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Tabs
                value={filters.type}
                onValueChange={(v) => patchFilters({ type: v as any, page: 1 })}
                className="w-full sm:w-auto"
              >
                <TabsList className="h-9 bg-muted/20 border border-border/10 p-0.5 rounded-none">
                  <TabsTrigger
                    value="all"
                    className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
                  >
                    <Layers className="w-3 h-3 mr-1.5" />
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="PRODUCT"
                    className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
                  >
                    <Package className="w-3 h-3 mr-1.5" />
                    Materials
                  </TabsTrigger>
                  <TabsTrigger
                    value="SERVICE"
                    className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
                  >
                    <Wrench className="w-3 h-3 mr-1.5" />
                    Services
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center bg-muted/20 border border-border/10 p-0.5 rounded-none hidden sm:flex h-9">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8 data-[state=active]:bg-background"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          {showFilters ? (
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/50 pr-4">
                <h2 className="text-[10px] font-display font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  Filters
                </h2>
                {hasActiveFilters ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-0 text-[8px] uppercase font-black tracking-widest text-muted-foreground/60 hover:text-destructive hover:bg-transparent"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                ) : null}
              </div>
              <div className="pr-4">
                <FilterPanel
                  filters={filters}
                  categories={categories}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  onPriceCommit={commitPrice}
                  onFilterChange={patchFilters}
                />
              </div>
            </aside>
          ) : null}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "hidden lg:flex shrink-0 rounded-none border-border/40 h-10 w-10",
                    showFilters &&
                      "bg-foreground text-background border-foreground hover:bg-foreground/90",
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
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
                        "inline-flex items-center justify-between whitespace-nowrap rounded-none text-[9px] font-display font-black uppercase tracking-widest ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border/40 bg-background hover:bg-muted h-10 px-4 w-full sm:w-auto gap-3 shrink-0 sm:justify-center transition-all",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5" />
                        Params
                        {hasActiveFilters ? (
                          <Badge
                            variant="secondary"
                            className="ml-1 h-4 px-1.5 text-[7px] font-black uppercase tracking-widest rounded-none bg-primary text-primary-foreground"
                          >
                            Set
                          </Badge>
                        ) : null}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform opacity-50",
                          isMobileFiltersOpen && "rotate-180",
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 p-6 border rounded-none border-border bg-background space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black uppercase text-xs tracking-[0.2em]">
                          System Filters
                        </h3>
                        {hasActiveFilters ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-[10px] font-bold uppercase tracking-widest h-6"
                          >
                            Clear All
                          </Button>
                        ) : null}
                      </div>
                      <FilterPanel
                        filters={filters}
                        categories={categories}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        onPriceCommit={commitPrice}
                        onFilterChange={patchFilters}
                      />
                      <Button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="w-full rounded-none font-display font-black uppercase tracking-widest h-14"
                      >
                        Apply Parameters
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search..."
                    className="pl-11 bg-muted/10 border-border/40 rounded-none focus:ring-0 focus:border-primary/60 h-10 w-full font-display font-bold uppercase tracking-wider text-[10px] transition-all"
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceGrid;
