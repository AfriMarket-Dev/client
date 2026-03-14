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
    query: filters.searchQuery,
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
          searchPlaceholder="SEARCH CATEGORIES..."
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
                className="h-40 rounded-none border border-border/10"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 flex justify-center">
            <Empty className="max-w-md">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RiPagesLine className="w-4 h-4 text-primary" />
                </EmptyMedia>
                <EmptyTitle className="text-xl font-display font-black uppercase">
                  No Categories Found
                </EmptyTitle>
                <EmptyDescription className="uppercase tracking-widest text-[10px]">
                  We couldn't find any categories matching your current search.
                </EmptyDescription>
              </EmptyHeader>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="rounded-none h-11 px-8 font-black uppercase text-[10px] tracking-widest border-primary/20 hover:bg-primary/5 text-primary"
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
                className="group text-left p-8 rounded-none border border-border/10 bg-card hover:border-primary/40 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute top-0 left-0 w-px h-full bg-primary/0 group-hover:bg-primary/40 transition-all duration-500" />

                <div className="w-12 h-12 rounded-none bg-muted/20 border border-border/10 flex items-center justify-center mb-6 text-muted-foreground/60 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
                  <RiPagesLine className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                  {category.name}
                </h2>
                <p className="text-muted-foreground/60 text-[10px] font-medium uppercase tracking-widest leading-relaxed line-clamp-2">
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
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-12 pt-8 border-t border-border/20">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none font-display font-bold uppercase tracking-widest text-[8px] sm:text-[9px] h-9 sm:h-10 px-4 sm:px-6 border-border/40"
              disabled={filters.page <= 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Prev
            </Button>
            <span className="flex items-center px-4 text-[9px] sm:text-[10px] font-display font-bold uppercase tracking-widest text-muted-foreground/30">
              {meta.page} / {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none font-display font-bold uppercase tracking-widest text-[8px] sm:text-[9px] h-9 sm:h-10 px-4 sm:px-6 border-border/40"
              disabled={filters.page >= meta.totalPages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              Next
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        )
      }
    />
  );
};

export default CategoriesPage;
