import {
  ChevronDown,
  ChevronLeft,
  Filter,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold uppercase text-foreground tracking-tighter leading-none mb-2">
                Marketplace
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-[0.3em]">
                Direct source for materials & services
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
          {showFilters ? (
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)]">
              <div className="flex items-center justify-between mb-8 pr-4">
                <h2 className="text-xs font-display font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Parameters
                </h2>
                <div className="flex items-center gap-2">
                  {hasActiveFilters ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[9px] uppercase font-bold tracking-widest text-muted-foreground/40 hover:text-destructive hover:bg-transparent"
                      onClick={resetFilters}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
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
                <FilterPanel
                  filters={filters}
                  categories={categories}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  onPriceCommit={commitPrice}
                  onFilterChange={patchFilters}
                />
              </ScrollArea>
            </aside>
          ) : null}

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
                        {hasActiveFilters ? (
                          <Badge
                            variant="secondary"
                            className="ml-2 h-5 px-2 text-[9px] font-bold uppercase tracking-widest rounded-none bg-primary text-primary-foreground"
                          >
                            Active
                          </Badge>
                        ) : null}
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
                        <h3 className="font-display font-bold uppercase text-xs tracking-widest">
                          Filter Results
                        </h3>
                        {hasActiveFilters ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-[10px] font-bold uppercase tracking-widest h-6"
                          >
                            Reset All
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
                        className="w-full mt-6 rounded-none font-display font-bold uppercase tracking-widest h-12"
                      >
                        Apply Filters
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search materials, services, suppliers..."
                    className="pl-12 bg-muted/10 border-border/20 rounded-none focus:ring-0 focus:border-primary/40 h-11 w-full font-display font-semibold uppercase tracking-widest text-[10px] transition-all"
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
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceGrid;
