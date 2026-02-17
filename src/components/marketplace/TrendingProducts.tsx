import React from "react";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeader } from "../home/SectionHeader";
import { getMockProducts } from "@/data/mockData";

const TrendingProducts: React.FC = () => {
  const navigate = useNavigate();
  // const { data } = useGetListingsQuery({ limit: 10, sortBy: "views", sortOrder: "DESC" });
  // const listings = data?.data ?? [];
  const listings = getMockProducts().slice(0, 10);

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader 
        title="Trending Now"
        subtitle="The most sought-after materials and equipment in the market today."
        label="Popular Picks"
        icon={<TrendingUp className="w-5 h-5" />}
        viewAllHref="/products?sort=popular"
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
    </div>
  );
};

export default TrendingProducts;
