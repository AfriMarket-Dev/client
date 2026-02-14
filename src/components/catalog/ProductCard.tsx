

import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { type Product, type Supplier } from "../../types";

interface ProductCardProps {
  product: Product;
  supplier?: Supplier;
  viewMode: "grid" | "list";
  isInWishlist: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onSupplierClick: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  supplier,
  viewMode,
  isInWishlist,
  onToggleWishlist,
  onSupplierClick,
  onClick,
}) => (
  <Card
    className={`group border-2 border-border bg-card hover:border-primary transition-all duration-300 overflow-hidden flex cursor-pointer ${
      viewMode === "list" ? "flex-row h-52" : "flex-col"
    }`}
    onClick={onClick}
  >
    <div
      className={`relative overflow-hidden ${
        viewMode === "list" ? "w-64 shrink-0" : "aspect-4/3"
      }`}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-sm bg-background/90 shadow-sm hover:bg-background h-8 w-8"
          onClick={onToggleWishlist}
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist ? "text-destructive fill-current" : ""}`}
          />
        </Button>
      </div>
      <div className="absolute top-2 left-2">
        <Badge className="bg-background/90 text-foreground border-none shadow-sm font-bold text-[10px] uppercase tracking-wider">
          {product.availability}
        </Badge>
      </div>
    </div>

    <CardContent className="p-5 flex flex-col grow">
      <div className="grow">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-muted text-muted-foreground text-[10px] font-bold border-none uppercase tracking-tight"
          >
            {product.category}
          </Badge>
        </div>
        <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-heading font-black text-primary">
            {product.priceRange.currency} {product.priceRange.min.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground font-bold uppercase">
            / unit
          </span>
        </div>

        {supplier && (
          <div className="pt-3 border-t-2 border-border flex items-center justify-between">
            <div
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={onSupplierClick}
            >
              <img
                src={supplier.avatar}
                className="w-6 h-6 rounded-sm object-cover"
                alt=""
              />
              <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                {supplier.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-sm text-primary hover:bg-primary/5"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
));

ProductCard.displayName = "ProductCard";
