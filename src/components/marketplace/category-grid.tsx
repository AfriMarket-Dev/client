import React from "react";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { Package } from "lucide-react";
import { SectionHeader } from "../home/section-header";
import { CompactCategoryCard } from "./compact-category-card";
import { mockCategories } from "@/data/mock-data";

const CategoryGrid: React.FC = () => {
  const { data, isLoading } = useGetListingCategoriesQuery({ limit: 8 });

  // Use mock data if API fails or returns empty, to ensure UI is not empty
  const categories =
    data?.data && data.data.length > 0 ? data.data : mockCategories.slice(0, 8);

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader
        title="Industrial Sectors"
        subtitle="Navigate through our specialized industrial procurement nodes."
        label="Market Segments"
        icon={<Package className="w-5 h-5" />}
        viewAllHref="/categories"
        viewAllLabel="All Categories"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CompactCategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
