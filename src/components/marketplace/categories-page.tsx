import { useNavigate } from "@tanstack/react-router";
import { RiArrowLeftLine, RiPagesLine, RiSearchLine } from "@remixicon/react";
import type React from "react";
import { useState } from "react";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoriesPageProps {
  onBack: () => void;
  onSupplierClick?: (supplierId: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoriesResult, isLoading } = useGetProductCategoriesQuery({
    limit: 50,
  });
  const categories = categoriesResult?.data || [];

  const filtered = searchQuery.trim()
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.description ?? "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : categories;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b-2 border-border sticky top-0 z-30 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 font-heading uppercase text-xs tracking-wider rounded-sm"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            Back
          </Button>
          <div className="relative flex-1 max-w-md">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-sm border-border"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold uppercase text-foreground mb-2 tracking-wide">
          Product Categories
        </h1>
        <p className="text-muted-foreground mb-8">
          Browse products by category.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-sm border border-border bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-sm border border-border">
            <RiPagesLine className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  navigate({
                    to: "/marketplace",
                    search: { category: category.id } as any,
                  })
                }
                className="group text-left p-6 rounded-sm border border-border bg-card hover:border-primary transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-sm bg-muted/50 border border-border flex items-center justify-center mb-4 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  <RiPagesLine className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-heading font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {category.description || "Browse products in this category."}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
