import { RiPagesLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoriesFilters } from "@/hooks/use-categories-filters";
import { useGetProductCategoriesQuery } from "@/services/api/product-categories";
import { MarketplaceLayout } from "@/shared/components/layouts/marketplace-layout";
import { ROUTES } from "@/shared/constants/routes";
import { MarketplaceToolbar } from "./marketplace-toolbar";

interface CategoriesPageProps {
  onBack: () => void;
  onProviderClick?: (providerId: string) => void;
}

const PAGE_SIZE = 12;

const CategoriesPage: React.FC<CategoriesPageProps> = () => {
  const {
    filters,
    searchInput,
    setSearchInput,
    handlePageChange,
    handleReset,
    isPending,
  } = useCategoriesFilters();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data: categoriesResult, isFetching } = useGetProductCategoriesQuery({
    page: filters.page,
    limit: PAGE_SIZE,
    searchQuery: filters.searchQuery,
  });

  const categories = categoriesResult?.data || [];
  const meta = categoriesResult?.meta;

  return (
    <MarketplaceLayout
      title="Product Categories"
      subtitle="Discover specialized materials and services"
      showFilters={false}
      hasActiveFilters={!!filters.searchQuery}
      onToggleFilters={() => {}}
      onResetFilters={handleReset}
      isMobileFiltersOpen={isMobileFiltersOpen}
      setIsMobileFiltersOpen={setIsMobileFiltersOpen}
      isPending={isPending}
      toolbar={
        <MarketplaceToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          searchPlaceholder="Search categories..."
          hideFilterButton
          hideViewMode
        />
      }
      content={
        isFetching && categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className="h-40 rounded-md border border-border"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 flex justify-center">
            <Empty className="max-w-md w-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RiPagesLine className="w-8 h-8 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>No Categories Found</EmptyTitle>
                <EmptyDescription>
                  We couldn't find any categories matching your current search.
                </EmptyDescription>
              </EmptyHeader>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="font-medium px-6 h-10"
                >
                  Clear Search
                </Button>
              </div>
            </Empty>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={ROUTES.PUBLIC.PRODUCTS}
                search={{ category: category.id }}
                className="group flex flex-col p-6 rounded-md border border-border bg-card hover:border-primary/50 transition-all duration-300 relative overflow-hidden hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-muted border border-border/50 flex items-center justify-center mb-5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                  <RiPagesLine className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {category.description ||
                    "Explore products and services in this category."}
                </p>
              </Link>
            ))}
          </div>
        )
      }
      pagination={
        meta &&
        meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="font-medium h-9 px-4"
              disabled={filters.page <= 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              {meta.page} / {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="font-medium h-9 px-4"
              disabled={filters.page >= meta.totalPages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )
      }
    />
  );
};

export default CategoriesPage;
