import React from "react";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeader } from "./SectionHeader";
import { getMockProducts } from "@/data/mockData";

const NewArrivals: React.FC = () => {
  const navigate = useNavigate();
  // const { data } = useGetListingsQuery({
  //   limit: 10,
  //   sortOrder: "DESC",
  //   sortBy: "createdAt",
  // });
  // const listings = data?.data ?? [];
  const listings = getMockProducts().slice(0, 10);

  return (
    <>
      <SectionHeader
        title="New Inventory"
        subtitle="The latest verified industrial listings integrated into the marketplace."
        label="Recent Nodes"
        icon={<Sparkles className="w-5 h-5" strokeWidth={1.5} />}
        viewAllHref="/products?sort=newest"
        viewAllLabel="Browse Fresh Inventory"
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
          onClick={() => navigate("/products?sort=newest")}
        >
          View all new listings
        </Button>
      </div>
    </>
  );
};

export default NewArrivals;
