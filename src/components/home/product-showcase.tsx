import React from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
// import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { SectionHeader } from "./section-header";
import { getMockProducts } from "@/data/mock-data";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  categoryId?: string;
  limit?: number;
  className?: string;
  icon?: React.ReactNode;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  subtitle,
  categoryId,
  limit = 10,
  className = "",
  icon,
}) => {
  const navigate = useNavigate();
  // Fetch products, filtered by category if provided
  // const { data } = useGetListingsQuery({
  //   limit,
  //   type: "PRODUCT",
  //   categoryId,
  // });
  // const listings = data?.data ?? [];
  const listings = getMockProducts()
    .filter((p) => !categoryId || p.categoryId === categoryId)
    .slice(0, limit);

  return (
    <div className={`py-12 ${className}`}>
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          label="Curated Selection"
          icon={icon || <Package className="w-5 h-5" />}
          viewAllHref="/marketplace"
        />

        {listings.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg border border-border/40 bg-muted/20"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {listings.map((listing) => (
              <ProductCard
                key={listing.id}
                listing={listing}
                onClick={() => navigate({ to: `/products/${listing.id}` as any })}
              />
            ))}
          </div>
        )}

        <div className="mt-8 md:hidden">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              navigate({
                to: "/marketplace",
                search: {
                  type: "PRODUCT",
                  category: categoryId || undefined,
                } as any,
              });
            }}
          >
            View all {title}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
