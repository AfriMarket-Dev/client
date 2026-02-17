import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Listing, CompanyRef } from "@/app/api/listings";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

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
            className="group flex gap-5 bg-card border border-border/40 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={onClick}
        >
             <div className="relative w-52 aspect-video shrink-0 overflow-hidden rounded-md bg-muted/30">
                 {img ? (
                    <ImageWithFallback
                      src={img}
                      alt={listing.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                      <span className="text-xs font-medium opacity-50">No image</span>
                    </div>
                  )}
             </div>
             
             <div className="flex flex-col grow py-1">
                 <div className="flex justify-between items-start">
                     <div>
                        <div className="text-[10px] font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">
                          {listing.category?.name ?? "General"}
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {listing.name}
                        </h3>
                     </div>
                      {onToggleWishlist && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 -mt-1 -mr-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                          onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(e);
                          }}
                        >
                          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
                        </Button>
                      )}
                 </div>
                 
                 <p className="text-sm text-muted-foreground/70 line-clamp-2 mt-3 max-w-3xl leading-relaxed">
                    {listing.description}
                 </p>

                 <div className="mt-auto flex items-end justify-between">
                     <div>
                        <div className="text-lg font-semibold text-foreground font-sans tracking-tight">
                            RWF {price.toLocaleString()}
                        </div>
                        {company && (
                             <div 
                                className="flex items-center gap-2 mt-2 text-xs text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer w-fit"
                                onClick={(e) => {
                                    if(onSupplierClick) {
                                        e.stopPropagation();
                                        onSupplierClick(e);
                                    }
                                }}
                             >
                                <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center text-[10px] font-bold text-primary">
                                    {company.name?.charAt(0) ?? "?"}
                                </div>
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
        className="group flex flex-col bg-white dark:bg-slate-900 border border-border/60 hover:border-primary transition-all duration-500 cursor-pointer h-full relative rounded-lg overflow-hidden shadow-sm hover:shadow-md"
        onClick={onClick}
      >
        {/* Architectural Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden transition-all duration-700">
          {img ? (
            <ImageWithFallback
              src={img}
              alt={listing.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">No Image Data</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />

          {/* Wishlist Button - Precise Design */}
          {onToggleWishlist && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 h-10 w-10 rounded-md bg-white dark:bg-slate-900 shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
              onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(e);
              }}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
            </Button>
          )}

          {/* Type Badge */}
          <div className="absolute bottom-0 left-0 bg-foreground text-background px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500">
             {listing.type || "Asset"}
          </div>
        </div>

        {/* Structured Metadata */}
        <div className="p-5 flex flex-col grow gap-3.5 border-t border-border/40">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-[0.15em]">
                {listing.category?.name ?? "General Material"}
                </span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground/90 leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[2.75rem]">
              {listing.name}
            </h3>
          </div>

          <div className="mt-auto space-y-3.5">
            <div className="flex items-end justify-between">
               <div className="flex flex-col">
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-widest mb-0.5">Valuation</span>
                  <span className="text-lg font-semibold text-foreground font-sans tracking-tight">
                    RWF {price.toLocaleString()}
                  </span>
               </div>
               
               {company && (
                  <div 
                    className="flex items-center justify-center w-9 h-9 bg-muted/20 text-[11px] text-muted-foreground/70 font-bold border border-border/40 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all rounded-md"
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
            
            {/* Visual Indicator of detail availability */}
            <div className="h-[1px] w-full bg-border/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
