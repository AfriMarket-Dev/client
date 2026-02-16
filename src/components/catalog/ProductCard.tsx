import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Listing, CompanyRef } from "@/app/api/listings";

interface ProductCardProps {
  listing: Listing;
  viewMode?: "grid" | "list";
  onSupplierClick?: (e: React.MouseEvent) => void;
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
  ({ listing, viewMode = "grid", onSupplierClick, onClick, isInWishlist, onToggleWishlist }) => {
    const company = listing.company as CompanyRef | undefined;
    const price = firstPrice(listing);
    const img = firstImage(listing);

    if (viewMode === "list") {
       return (
        <div
            className="group flex gap-4 bg-card border border-border/50 hover:border-primary/50 rounded-sm p-3 transition-all duration-200 hover:shadow-sm cursor-pointer"
            onClick={onClick}
        >
             <div className="relative w-48 aspect-4/3 shrink-0 overflow-hidden rounded-sm bg-muted">
                 {img ? (
                    <img
                      src={img}
                      alt={listing.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider">No image</span>
                    </div>
                  )}
             </div>
             
             <div className="flex flex-col grow py-1">
                 <div className="flex justify-between items-start">
                     <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {listing.category?.name ?? "General"}
                        </div>
                        <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {listing.name}
                        </h3>
                     </div>
                      {onToggleWishlist && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 -mt-1 -mr-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                          onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(e);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
                        </Button>
                      )}
                 </div>
                 
                 <p className="text-xs text-muted-foreground line-clamp-2 mt-2 max-w-2xl">
                    {listing.description}
                 </p>

                 <div className="mt-auto flex items-end justify-between">
                     <div>
                        <div className="text-lg font-bold text-foreground">
                            RWF {price.toLocaleString()}
                        </div>
                        {company && (
                             <div 
                                className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit"
                                onClick={(e) => {
                                    if(onSupplierClick) {
                                        e.stopPropagation();
                                        onSupplierClick(e);
                                    }
                                }}
                             >
                                <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold">
                                    {company.name?.charAt(0) ?? "?"}
                                </span>
                                {company.name}
                             </div>
                        )}
                     </div>
                 </div>
             </div>
        </div>
       )
    }

    return (
      <div
        className="group flex flex-col bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden cursor-pointer h-full"
        onClick={onClick}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {img ? (
            <img
              src={img}
              alt={listing.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">No image</span>
            </div>
          )}
          
          {/* Wishlist Button - Only visible on hover/active */}
          {onToggleWishlist && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-destructive text-muted-foreground"
              onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(e);
              }}
            >
              <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
            </Button>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
             {/* Add badges here if needed based on valid data */}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col grow gap-2">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1 truncate">
               {listing.category?.name ?? "General"}
            </div>
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-10">
              {listing.name}
            </h3>
          </div>

          <div className="mt-auto">
             {/* Divider */}
             <div className="h-px w-full bg-border/40 mb-2.5" />
             
            <div className="flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">From</span>
                  <span className="text-sm font-bold text-foreground">
                    RWF {price.toLocaleString()}
                  </span>
               </div>
               
               {company && (
                  <div 
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-muted/50 text-[10px] text-muted-foreground font-bold hover:bg-primary/10 hover:text-primary transition-colors"
                    title={company.name}
                    onClick={(e) => {
                        if (onSupplierClick) {
                            e.stopPropagation();
                            onSupplierClick(e);
                        }
                    }}
                  >
                     {company.name?.charAt(0) ?? "?"}
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
