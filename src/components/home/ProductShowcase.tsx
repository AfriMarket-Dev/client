import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "@/app/api/listings";
import { ProductCard } from "@/components/catalog/ProductCard";

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
  const { data } = useGetListingsQuery({
    limit,
    type: "PRODUCT",
    categoryId,
  });
  const listings = data?.data ?? [];

  return (
    <div className={`py-2 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {icon || <Package className="w-5 h-5 text-primary" />}
              <span className="text-sm font-bold uppercase tracking-widest text-primary">
                Specific Selection
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase text-foreground mb-1 text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-md font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              const url = categoryId
                ? `/products?type=PRODUCT&category=${categoryId}`
                : "/products?type=PRODUCT";
              navigate(url);
            }}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm font-bold uppercase tracking-wide hidden md:flex shadow-none"
          >
            View all
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

        <div className="mt-6 md:hidden">
          <Button
            variant="outline"
            className="w-full rounded-sm h-12 uppercase font-bold border border-border shadow-none"
            onClick={() => {
              const url = categoryId
                ? `/products?type=PRODUCT&category=${categoryId}`
                : "/products?type=PRODUCT";
              navigate(url);
            }}
          >
            View all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
