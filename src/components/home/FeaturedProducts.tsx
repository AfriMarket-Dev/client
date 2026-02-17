import React from "react";
import { Button } from "@/components/ui/Button";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeader } from "./SectionHeader";
import { getMockProducts } from "@/data/mockData";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  // Fetch only products
  // const { data } = useGetListingsQuery({ limit: 10, type: "PRODUCT" });
  // const listings = data?.data ?? [];
  const listings = getMockProducts().slice(0, 10);

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader 
        title="Featured Products"
        subtitle="High-quality construction materials and specialized tools for your next project."
        label="Marketplace"
        icon={<Package className="w-5 h-5" />}
        viewAllHref="/products?type=PRODUCT"
        viewAllLabel="View all products"
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
              onClick={() => navigate(`/products/${listing.id}`)}
            />
          ))}
        </div>
      )}

      <div className="mt-10 md:hidden">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-lg h-14 font-semibold border-border/60 shadow-none"
          onClick={() => navigate("/products?type=PRODUCT")}
        >
          View all products
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
