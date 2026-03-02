import {
  Building2,
  ChevronDown,
  Filter,
  Grid,
  List,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Company } from "@/app/api/companies";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetCompanyCategoriesQuery } from "@/app/api/company-categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useSupplierFilters } from "@/hooks/use-supplier-filters";
import { cn } from "@/lib/utils";
import { SupplierCard } from "./listing/supplier-card";
import { SupplierFilterPanel } from "./listing/supplier-filter-panel";

interface SupplierListingProps {
  onSupplierClick?: (supplierId: string) => void;
  initialSearchQuery?: string;
}

const PAGE_SIZE = 12;

const COMPANY_TYPES = [
  { value: "MANUFACTURER", label: "Manufacturer" },
  { value: "WHOLESALER", label: "Wholesaler" },
  { value: "RETAILER", label: "Retailer" },
  { value: "SERVICE_PROVIDER", label: "Service Provider" },
];

const SupplierListing: React.FC<SupplierListingProps> = ({
  onSupplierClick,
  initialSearchQuery = "",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { filters, handleFiltersChange, handleClearFilters } =
    useSupplierFilters(initialSearchQuery);

  const { data: listData, isLoading } = useGetCompaniesQuery({
    page: filters.page,
    limit: PAGE_SIZE,
    query: filters.searchQuery || undefined,
    categoryId: filters.categoryId === "all" ? undefined : filters.categoryId,
    district: filters.district || undefined,
    type: filters.type === "all" ? undefined : filters.type,
    minRating:
      Number(filters.minRating) > 0 ? Number(filters.minRating) : undefined,
    isVerified: filters.verified ? true : undefined,
  });

  const { data: categoriesData } = useGetCompanyCategoriesQuery({ limit: 50 });

  const companies: Company[] = listData?.data || [];
  const meta = listData?.meta;
  const categories = categoriesData?.data ?? [];

  const hasActiveFilters =
    filters.district ||
    filters.type !== "all" ||
    Number(filters.minRating) > 0 ||
    filters.categoryId !== "all" ||
    filters.verified;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4 md:py-5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h1 className="text-2xl md:text-3xl font-display font-black uppercase text-foreground tracking-tighter leading-none">
                Supplier Directory
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-6 bg-primary" />
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                  Verified Rwandan Providers
                </p>
              </div>
            </div>

            <div className="flex items-center bg-muted/20 border border-border/10 p-0.5 rounded-none hidden sm:flex h-9">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none h-8 w-8 data-[state=active]:bg-background"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-3.5 h-3.5" />
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

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          {showFilters && (
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
                    onClick={handleClearFilters}
                  >
                    Reset
                  </Button>
                ) : null}
              </div>
              <div className="pr-4">
                <SupplierFilterPanel
                  filters={filters}
                  categories={categories}
                  onFilterChange={handleFiltersChange}
                />
              </div>
            </aside>
          )}

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
                        {hasActiveFilters && (
                          <Badge
                            variant="secondary"
                            className="ml-1 h-4 px-1.5 text-[7px] font-black uppercase tracking-widest rounded-none bg-primary text-primary-foreground"
                          >
                            Set
                          </Badge>
                        )}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearFilters}
                          className="text-[10px] font-bold uppercase tracking-widest h-6"
                        >
                          Reset All
                        </Button>
                      </div>
                      <SupplierFilterPanel
                        filters={filters}
                        categories={categories}
                        onFilterChange={handleFiltersChange}
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
                    placeholder="Search suppliers..."
                    className="pl-11 bg-muted/10 border-border/40 rounded-none focus:ring-0 focus:border-primary/60 h-10 w-full font-display font-bold uppercase tracking-wider text-[10px] transition-all"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleFiltersChange({ searchQuery: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Active Filters Badges */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  {filters.categoryId !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
                    >
                      {categories.find((c) => c.id === filters.categoryId)
                        ?.name || "Category"}
                      <X
                        className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors"
                        onClick={() =>
                          handleFiltersChange({ categoryId: "all" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.type !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
                    >
                      {COMPANY_TYPES.find((t) => t.value === filters.type)
                        ?.label || filters.type}
                      <X
                        className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors"
                        onClick={() => handleFiltersChange({ type: "all" })}
                      />
                    </Badge>
                  )}
                  {filters.district && (
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
                    >
                      {filters.district}
                      <X
                        className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors"
                        onClick={() => handleFiltersChange({ district: "" })}
                      />
                    </Badge>
                  )}
                  {Number(filters.minRating) > 0 && (
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
                    >
                      {filters.minRating}+ Stars
                      <X
                        className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors"
                        onClick={() => handleFiltersChange({ minRating: "0" })}
                      />
                    </Badge>
                  )}
                  {filters.verified && (
                    <Badge
                      variant="secondary"
                      className="gap-2 rounded-none text-[9px] font-bold uppercase tracking-widest pl-3 pr-1.5 h-7 bg-muted/50 border-border/10"
                    >
                      Verified
                      <X
                        className="w-3.5 h-3.5 hover:text-destructive cursor-pointer transition-colors"
                        onClick={() => handleFiltersChange({ verified: false })}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {isLoading ? (
              <div
                className={cn(
                  "grid gap-6",
                  showFilters
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6",
                )}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`supplier-skeleton-${i}`}
                    className="h-72 rounded-none border border-border/10 bg-muted/5 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                {companies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center border border-border/20 rounded-none bg-muted/5 relative overflow-hidden">
                    <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
                    <Building2 className="w-12 h-12 text-primary/20 mb-6" />
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">
                      No Suppliers Found
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">
                      Try adjusting your filters
                    </p>
                    <Button
                      onClick={handleClearFilters}
                      className="rounded-none px-8 h-12 font-bold uppercase tracking-widest"
                    >
                      Reset Protocol
                    </Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? cn(
                            "grid gap-6",
                            showFilters
                              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
                              : "grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6",
                          )
                        : "flex flex-col gap-6"
                    }
                  >
                    {companies.map((company: Company) => (
                      <SupplierCard
                        key={company.id}
                        company={company}
                        onViewProfile={() => onSupplierClick?.(company.id)}
                      />
                    ))}
                  </div>
                )}

                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center gap-4 mt-16 pt-10 border-t border-border/20">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none font-display font-bold uppercase tracking-widest text-[9px] h-10 px-6 border-border/40"
                      disabled={filters.page <= 1}
                      onClick={() =>
                        handleFiltersChange({ page: filters.page - 1 })
                      }
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-6 text-[10px] font-display font-bold uppercase tracking-widest text-muted-foreground/30">
                      Page {meta.page} of {meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none font-display font-bold uppercase tracking-widest text-[9px] h-10 px-6 border-border/40"
                      disabled={filters.page >= meta.totalPages}
                      onClick={() =>
                        handleFiltersChange({ page: filters.page + 1 })
                      }
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

export default SupplierListing;
