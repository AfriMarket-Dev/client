import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
// import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { SectionHeader } from "./section-header";
import { getMockProducts } from "@/data/mock-data";

const BestSellers: React.FC = () => {
  const navigate = useNavigate();
  // Fetch best sellers (using views or just random for now with sort)
  // const { data } = useGetListingsQuery({
  //   limit: 10,
  //   type: "PRODUCT",
  //   sortBy: "views", // Assuming backend supports this, or just defaults
  //   sortOrder: "DESC"
  // });
  // const listings = data?.data ?? [];
  const listings = getMockProducts().slice(0, 10);

  return (
    <>
      <SectionHeader
        title="Best Sellers"
        subtitle="Direct access to the most requested industrial assets and materials."
        label="Market Analytics"
        icon={<Trophy className="w-5 h-5" />}
        viewAllHref="/products?sort=popular"
        viewAllLabel="View Analytics"
      />

      {listings.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/5 rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 lg:gap-6">
          {listings.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              onClick={() => navigate(`/products/${listing.id}`)}
            />
          ))}
        </div>
      )}

      <div className="mt-8 md:hidden">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/products?sort=popular")}
        >
          View all best sellers
        </Button>
      </div>
    </>
  );
};

export default BestSellers;
