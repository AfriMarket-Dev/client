import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Listing, CompanyRef } from "@/app/api/listings";

interface ProductCardProps {
  listing: Listing;
  viewMode: "grid" | "list";
  onSupplierClick: (e: React.MouseEvent) => void;
  onClick: () => void;
  isInWishlist?: boolean;
  onToggleWishlist?: (e: React.MouseEvent) => void;
}

function firstPrice(listing: Listing): number {
  const v = listing.variants?.[0];
  return v ? Number(v.price) : 0;
}

function firstImage(listing: Listing): string | null {
  const v = listing.variants?.[0];
  const imgs = v?.images;
  return imgs?.length ? imgs[0] : null;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ listing, viewMode, onSupplierClick, onClick, isInWishlist, onToggleWishlist }) => {
    const company = listing.company as CompanyRef | undefined;
    const price = firstPrice(listing);
    const img = firstImage(listing);

    return (
      <Card
        className={`group border border-border bg-card hover:border-primary transition-all duration-300 overflow-hidden flex cursor-pointer ${
          viewMode === "list" ? "flex-row h-52" : "flex-col"
        }`}
        onClick={onClick}
      >
        <div
          className={`relative overflow-hidden bg-muted ${
            viewMode === "list" ? "w-64 shrink-0" : "aspect-[4/3]"
          }`}
        >
          {img ? (
            <img
              src={img}
              alt={listing.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-xs font-bold uppercase">No image</span>
            </div>
          )}
          {onToggleWishlist && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-sm bg-background/90 h-8 w-8"
              onClick={onToggleWishlist}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
            </Button>
          )}
          <div className="absolute top-2 left-2">
            <Badge className="bg-background/90 text-foreground border-none shadow-none font-bold text-[10px] uppercase tracking-wider">
              {listing.type}
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
                {listing.category?.name ?? "—"}
              </Badge>
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight uppercase tracking-wide">
              {listing.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
              {listing.description || "—"}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-heading font-black text-primary">
                RWF {price.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground font-bold uppercase">
                / unit
              </span>
            </div>

            {company && (
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={onSupplierClick}
                >
                  <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    {company.name?.charAt(0) ?? "?"}
                  </div>
                  <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                    {company.name}
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
    );
  },
);

ProductCard.displayName = "ProductCard";
