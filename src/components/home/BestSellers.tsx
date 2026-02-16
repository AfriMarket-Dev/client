import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";

const BestSellers: React.FC = () => {
  const navigate = useNavigate();
  // Fetch best sellers (using views or just random for now with sort)
  const { data } = useGetListingsQuery({ 
    limit: 10, 
    type: "PRODUCT",
    sortBy: "views", // Assuming backend supports this, or just defaults
    sortOrder: "DESC"
  });
  const listings = data?.data ?? [];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                Top Rated Products
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase text-foreground mb-1 text-balance">
              Best Sellers
            </h2>
            <p className="text-muted-foreground text-md font-medium">
              Most popular products chosen by other builders.
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/products?sort=popular")}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm font-bold uppercase tracking-wide hidden md:flex shadow-none"
          >
            View all best sellers
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {listings.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm border border-border bg-muted/30 animate-pulse"
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

        <div className="mt-6 md:hidden">
          <Button
            variant="outline"
            className="w-full rounded-sm h-12 uppercase font-bold border border-border shadow-none"
            onClick={() => navigate("/products?sort=popular")}
          >
            View all best sellers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
