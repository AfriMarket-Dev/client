import React, { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  ArrowRight,
  Users,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetCompanyCategoriesQuery } from "@/app/api/company-categories";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { Company } from "@/app/api/companies";

import { mockCompanies, mockCategories } from "@/data/mockData";

interface SupplierListingProps {
  onSupplierClick?: (supplierId: string) => void;
  initialSearchQuery?: string;
}

const PAGE_SIZE = 12;

const SupplierListing: React.FC<SupplierListingProps> = ({
  onSupplierClick,
  initialSearchQuery = "",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const { data: listData, isLoading } = useGetCompaniesQuery({
    page,
    limit: PAGE_SIZE,
    query: searchQuery || undefined,
    categoryId: selectedCategoryId === "all" ? undefined : selectedCategoryId,
  });

  const { data: categoriesData } = useGetCompanyCategoriesQuery({ limit: 50 });

  // Use mock data if API fails or returns empty
  const companies =
    listData?.data && listData.data.length > 0 ? listData.data : mockCompanies;
  const meta = listData?.meta;
  const categories = categoriesData?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b-2 border-border sticky top-0 z-30 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                <BadgeCheck className="w-4 h-4" />
                Verified Network
              </div>
              <h1 className="text-3xl font-heading font-bold uppercase text-foreground leading-tight tracking-wide">
                Construction Suppliers
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Direct access to reliable wholesalers and manufacturers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted border border-border p-1 rounded-sm">
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
              <Button
                variant="outline"
                className="rounded-sm border border-border lg:hidden font-heading uppercase tracking-wider text-xs"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside
            className={`lg:w-72 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="space-y-4 sticky top-28">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-10 rounded-sm bg-background border border-border uppercase placeholder:text-xs"
                />
              </div>

              <div>
                <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
                  Category
                </h3>
                <div className="flex flex-col gap-1">
                  <Button
                    variant={
                      selectedCategoryId === "all" ? "secondary" : "ghost"
                    }
                    className="justify-start rounded-sm font-bold uppercase text-xs tracking-wider"
                    onClick={() => setSelectedCategoryId("all")}
                  >
                    All
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={
                        selectedCategoryId === cat.id ? "secondary" : "ghost"
                      }
                      className="justify-start rounded-sm font-semibold text-xs uppercase tracking-wide hover:text-primary"
                      onClick={() => setSelectedCategoryId(cat.id)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="rounded-sm bg-foreground text-background border-none p-6 relative overflow-hidden">
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-background/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase mb-2 tracking-wide">
                    Provider?
                  </h4>
                  <p className="text-background/70 text-xs leading-relaxed">
                    Join the construction network.
                  </p>
                </div>
              </Card>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                <span className="text-foreground font-bold">
                  {meta?.total ?? 0}
                </span>{" "}
                Partners
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 rounded-sm border border-border bg-muted/30 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
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

                {companies.length === 0 && (
                  <div className="text-center py-20 bg-card rounded-sm border border-border">
                    <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
                      No Suppliers Found
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm mb-6">
                      Try a different search or category.
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-sm border border-border font-heading uppercase tracking-wider"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategoryId("all");
                        setPage(1);
                      }}
                    >
                      Clear
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
    <Card className="group border border-border bg-card hover:border-primary transition-all duration-300 rounded-sm overflow-hidden flex flex-col shadow-none">
      <div className="relative h-40 overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/50">
          {company.name?.charAt(0) ?? "?"}
        </div>
        {company.isVerified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-background/90 text-foreground border-none font-heading font-bold text-[10px] px-2.5 h-6 flex items-center gap-1.5 rounded-sm uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="pt-6 px-6 pb-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3 gap-3">
            <div>
              <h3 className="text-xl font-heading font-bold uppercase text-foreground group-hover:text-primary transition-colors leading-tight mb-1 tracking-wide">
                {company.name}
              </h3>
              {location && (
                <div className="flex items-center text-muted-foreground font-medium text-xs gap-1 uppercase tracking-wide">
                  <MapPin className="w-3 h-3 text-primary" />
                  {location}
                </div>
              )}
            </div>
            <div className="flex items-center bg-muted px-2 py-1 rounded-sm border border-border shrink-0">
              <Star className="w-3 h-3 text-warning mr-1" />
              <span className="font-heading font-bold text-foreground text-xs">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {company.description || "—"}
          </p>

          {company.category && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground text-[10px] font-bold border-none rounded-sm px-2 h-5 uppercase tracking-tight"
              >
                {(company.category as { name?: string }).name ?? "—"}
              </Badge>
            </div>
          )}
        </div>

        <Button
          onClick={onViewProfile}
          className="w-full rounded-sm h-11 font-heading font-bold uppercase tracking-wider text-xs group/btn"
        >
          View Profile
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default SupplierListing;
