import {
  Building2,
  ChevronDown,
  Filter,
  Grid,
  List,
  PanelLeftOpen,
  PanelLeft as RiExpandLeftLine,
  Search,
  X,
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold uppercase text-foreground tracking-tighter leading-none mb-2">
                Supplier Directory
              </h1>
              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                Verified construction suppliers across Rwanda
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
                  <Grid className="w-4 h-4" />
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
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)] transition-all duration-300">
              <div className="flex items-center justify-between mb-8 pr-4">
                <h2 className="text-xs font-display font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  Filters
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[9px] uppercase font-bold tracking-widest text-muted-foreground/40 hover:text-destructive hover:bg-transparent"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
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
                <SupplierFilterPanel
                  filters={filters}
                  categories={categories}
                  onFilterChange={handleFiltersChange}
                />
              </ScrollArea>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar & Filter Toggle */}
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
                  {showFilters ? (
                    <RiExpandLeftLine className="w-4 h-4 text-primary" />
                  ) : (
                    <PanelLeftOpen className="w-4 h-4 text-muted-foreground" />
                  )}
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
                            className="ml-2 h-5 px-2 text-[9px] font-bold uppercase tracking-widest rounded-none bg-primary text-primary-foreground"
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
                        <h3 className="font-display font-bold uppercase text-xs tracking-widest">
                          Filter Directory
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
                      <SupplierFilterPanel
                        filters={filters}
                        categories={categories}
                        onFilterChange={handleFiltersChange}
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
                    placeholder="Search suppliers, manufacturers, retailers..."
                    className="pl-12 bg-muted/10 border-border/20 rounded-none focus:ring-0 focus:border-primary/40 h-11 w-full font-display font-semibold uppercase tracking-widest text-[10px] transition-all"
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
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {COMPANY_TYPES.find((t) => t.value === filters.type)
                        ?.label || filters.type}
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
                      {filters.district}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() => handleFiltersChange({ district: "" })}
                      />
                    </Badge>
                  )}
                  {Number(filters.minRating) > 0 && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {filters.minRating}+ Stars
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() => handleFiltersChange({ minRating: "0" })}
                      />
                    </Badge>
                  )}
                  {filters.verified && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      Verified Only
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() => handleFiltersChange({ verified: false })}
                      />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[9px] px-3 font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-none ml-2"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={`supplier-skeleton-${i}`}
                    className="h-72 rounded-none border border-border/5 bg-muted/5 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                {companies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center border border-border/20 rounded-none bg-muted/5 relative overflow-hidden">
                    {/* Blueprint grid depth */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                    <div className="w-24 h-24 bg-primary/5 rounded-none border border-primary/20 flex items-center justify-center mb-10 relative z-10 transition-transform duration-500 hover:scale-110">
                      <Building2 className="w-10 h-10 text-primary/40" />
                    </div>
                    <h3 className="text-3xl font-display font-extrabold uppercase text-foreground mb-4 tracking-tighter relative z-10">
                      No Suppliers Found
                    </h3>
                    <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.3em] max-w-md mx-auto mb-12 leading-relaxed relative z-10">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      size="lg"
                      className="rounded-none font-display font-bold uppercase tracking-[0.2em] h-14 px-10 relative z-10"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? cn(
                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                            showFilters
                              ? "xl:grid-cols-3"
                              : "xl:grid-cols-4 2xl:grid-cols-5",
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
