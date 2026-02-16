import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  // Fetch only products
  const { data } = useGetListingsQuery({ limit: 10, type: "PRODUCT" });
  const listings = data?.data ?? [];

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Marketplace
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2 text-balance">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            High-quality construction materials and tools.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/products?type=PRODUCT")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm font-bold uppercase tracking-wide hidden md:flex shadow-none"
        >
          View all products
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/3 rounded-sm border border-border bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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
          className="w-full rounded-sm h-12 uppercase font-bold border border-border shadow-none"
          onClick={() => navigate("/products?type=PRODUCT")}
        >
          View all products
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
