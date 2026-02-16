import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { Package } from "lucide-react";

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetListingCategoriesQuery({ limit: 6 });
  const categories = data?.data ?? [];

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-border pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-md font-medium">
            Find the specific materials and equipment you need
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/categories")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm font-bold uppercase tracking-wide shadow-none"
        >
          View all categories
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-sm border border-border bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="group cursor-pointer bg-card rounded-sm border border-border hover:border-primary transition-all duration-300 relative overflow-hidden p-6 text-left"
            >
              <div className="h-full flex flex-col items-start relative z-10">
                <div className="w-12 h-12 bg-muted/50 rounded-sm border border-border flex items-center justify-center mb-6 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-200">
                  <Package className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description || "Browse products in this category."}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
