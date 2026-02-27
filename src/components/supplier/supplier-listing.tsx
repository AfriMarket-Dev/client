import {
  ArrowRight,
  Building2,
  ChevronDown,
  Filter,
  Grid,
  Hexagon,
  List,
  MapPin,
  PanelLeft as RiExpandLeftLine,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Company } from "@/app/api/companies";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetCompanyCategoriesQuery } from "@/app/api/company-categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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

interface SupplierFiltersState {
  searchQuery: string;
  categoryId: string;
  district: string;
  type: string;
  minRating: string;
  verified: boolean;
  page: number;
}

const defaultFilters: SupplierFiltersState = {
  searchQuery: "",
  categoryId: "all",
  district: "",
  type: "all",
  minRating: "0",
  verified: false,
  page: 1,
};

const SupplierListing: React.FC<SupplierListingProps> = ({
  onSupplierClick,
  initialSearchQuery = "",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SupplierFiltersState>({
    ...defaultFilters,
    searchQuery: initialSearchQuery,
  });

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

  const handleFiltersChange = (updates: Partial<SupplierFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6 p-1">
      {/* Category */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Category
        </Label>
        <Select
          value={filters.categoryId}
          onValueChange={(val) =>
            handleFiltersChange({ categoryId: val as string })
          }
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Company Type */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Business Type
        </Label>
        <Select
          value={filters.type}
          onValueChange={(val) => handleFiltersChange({ type: val as string })}
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="All Types" />
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

      {/* Location */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Location (District)
        </Label>
        <Input
          placeholder="e.g. Gasabo, Kicukiro"
          value={filters.district}
          onChange={(e) => handleFiltersChange({ district: e.target.value })}
          className="bg-background"
        />
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-4">
        <Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
          Min Rating
        </Label>
        <Select
          value={filters.minRating}
          onValueChange={(val) =>
            handleFiltersChange({ minRating: val as string })
          }
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Verified Only */}
      <div className="flex items-center justify-between space-x-2 border p-3 rounded-md border-border bg-background">
        <Label
          htmlFor="verified-mode"
          className="text-sm font-medium cursor-pointer flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-primary" />
          Verified Only
        </Label>
        <Switch
          id="verified-mode"
          checked={filters.verified}
          onCheckedChange={(checked) =>
            handleFiltersChange({ verified: checked })
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-30 py-4">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold uppercase text-foreground tracking-wide">
                Supplier Directory
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted/50 border border-border p-1 rounded-sm">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-sm h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-sm h-8 w-8"
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
              <div className="flex items-center justify-between mb-4 pr-4">
                <h2 className="text-sm font-heading font-bold uppercase tracking-wide flex items-center gap-2">
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
                <FilterContent />
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
                    "hidden lg:flex shrink-0",
                    showFilters && "bg-muted/50",
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                  title={showFilters ? "Hide Filters" : "Show Filters"}
                >
                  {showFilters ? (
                    <RiExpandLeftLine className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <PanelLeftOpen className="w-5 h-5 text-muted-foreground" />
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
                        "inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full sm:w-auto gap-2 shrink-0 sm:justify-center",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                        {(filters.district ||
                          filters.type !== "all" ||
                          Number(filters.minRating) > 0 ||
                          filters.categoryId !== "all" ||
                          filters.verified) && (
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
                      <FilterContent />
                      <Button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="w-full mt-4"
                      >
                        Close Filters
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID..."
                    className="pl-9 bg-muted/30 border-border rounded-sm focus:ring-1 focus:ring-primary h-10 w-full"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleFiltersChange({ searchQuery: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Active Filters Badges */}
              {(filters.categoryId !== "all" ||
                filters.type !== "all" ||
                filters.district ||
                Number(filters.minRating) > 0 ||
                filters.verified) && (
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  {filters.categoryId !== "all" && (
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-sm text-[10px] pl-2 pr-1 h-6"
                    >
                      {categories.find((c) => c.id === filters.categoryId)
                        ?.name || "Category"}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
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
                    className="h-6 text-[10px] px-2 text-destructive hover:bg-destructive/10"
                    onClick={handleClearFilters}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 rounded-sm border border-border bg-muted/30 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                {companies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-sm bg-muted/5">
                    <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6">
                      <Building2 className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold uppercase text-foreground mb-3 tracking-wide">
                      No Suppliers Found
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                      We couldn't find any suppliers matching your current
                      criteria. Try adjusting filters or searching for something
                      else.
                    </p>
                    <Button
                      size="lg"
                      className="rounded-sm font-heading uppercase tracking-wider h-12 px-8"
                      onClick={handleClearFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? cn(
                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            showFilters
                              ? "xl:grid-cols-3"
                              : "xl:grid-cols-4 2xl:grid-cols-5",
                          )
                        : "flex flex-col gap-4"
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
                  <div className="flex justify-center gap-2 mt-12 pt-8 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={filters.page <= 1}
                      onClick={() =>
                        handleFiltersChange({ page: filters.page - 1 })
                      }
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-4 text-sm text-muted-foreground font-medium">
                      Page {meta.page} of {meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
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

function SupplierCard({
  company,
  onViewProfile,
}: {
  company: Company;
  onViewProfile: () => void;
}) {
  const rating = Number(company.averageRating ?? 0);
  const location = [company.district, company.province]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="group border border-border bg-card hover:border-primary transition-all duration-300 rounded-sm overflow-hidden flex flex-col shadow-none h-full">
      <div className="relative h-48 overflow-hidden bg-muted">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <Hexagon className="w-16 h-16 text-muted-foreground/20 stroke-1" />
            <span className="absolute text-4xl font-bold text-muted-foreground/30">
              {company.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {company.isVerified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-background/90 text-foreground border-none font-heading font-bold text-[9px] px-2 h-5 flex items-center gap-1.5 rounded-sm uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Verified
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-heading font-bold uppercase leading-tight mb-1 tracking-wide truncate pr-6">
            {company.name}
          </h3>
          {location && (
            <div className="flex items-center text-white/80 font-medium text-[10px] gap-1 uppercase tracking-wide">
              <MapPin className="w-3 h-3 text-white/60" />
              {location}
            </div>
          )}
        </div>
      </div>

      <CardContent className="pt-5 px-5 pb-5 flex-grow flex flex-col bg-card">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4 gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant="outline"
                className="bg-muted/50 text-muted-foreground text-[9px] font-bold border-border rounded-sm px-2 h-5 uppercase tracking-tight"
              >
                {company.type?.replace(/_/g, " ") || "Supplier"}
              </Badge>
            </div>
            <div className="flex items-center bg-muted px-1.5 py-0.5 rounded-sm border border-border shrink-0">
              <Star className="w-3 h-3 text-warning fill-warning mr-1" />
              <span className="font-heading font-bold text-foreground text-[10px]">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4 h-9">
            {company.description ||
              "Leading provider of construction materials and heavy equipment solutions."}
          </p>
        </div>

        <Button
          onClick={onViewProfile}
          className="w-full rounded-sm h-10 font-heading font-bold uppercase tracking-wider text-[10px] group/btn bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
        >
          View Profile
          <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default SupplierListing;
