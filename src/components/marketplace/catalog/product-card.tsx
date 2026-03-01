import {
  RiHeartFill,
  RiHeartLine,
  RiShieldCheckLine,
  RiStarLine,
} from "@remixicon/react";
import { useRouter } from "@tanstack/react-router";
import React, { useMemo } from "react";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { MarketplaceItem } from "../types";

interface ProductCardProps {
  product: MarketplaceItem;
  viewMode?: "grid" | "list";
  onSupplierClick?: (e: React.MouseEvent) => void;
  onClick: () => void;
  isInWishlist?: boolean;
  onToggleWishlist?: (e: React.MouseEvent) => void;
}

function firstPrice(product: MarketplaceItem): number {
  if (product.price) return Number(product.price);
  const v = (product as any).variants?.[0];
  return v ? Number(v.price) : 0;
}

function firstImage(product: MarketplaceItem): string | null {
  const v = (product as any).variants?.[0];
  const imgs = v?.images;
  return imgs?.length ? imgs[0] : (product as any).images?.[0] || null;
}

function firstDiscount(product: MarketplaceItem): number {
  if ((product as any).discount) return (product as any).discount;
  const v = (product as any).variants?.[0];
  return v?.discount || 0;
}

function firstUnit(product: MarketplaceItem): string {
  const v = (product as any).variants?.[0];
  return v?.unit || "UNIT";
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({
    product,
    viewMode = "grid",
    onSupplierClick,
    onClick,
    isInWishlist,
    onToggleWishlist,
  }) => {
    const company = product.company;
    const basePrice = useMemo(() => firstPrice(product), [product]);
    const discount = useMemo(() => firstDiscount(product), [product]);
    const price = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
    const img = useMemo(() => firstImage(product), [product]);
    const unit = useMemo(() => firstUnit(product), [product]);
    const router = useRouter();

    const handleMouseEnter = () => {
      router.preloadRoute({
        to: "/products/$productId",
        params: { productId: product.id },
      });
    };

    if (viewMode === "list") {
      return (
        <div
          role="button"
          tabIndex={0}
          className="group flex gap-5 bg-card border border-border/20 hover:border-primary/30 rounded-none p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer relative overflow-hidden"
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          onMouseEnter={handleMouseEnter}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary/40 transition-all duration-500" />

          <div className="relative w-52 aspect-video shrink-0 overflow-hidden rounded-none bg-muted/30 border border-border/10">
            {img ? (
              <ImageWithFallback
                src={img}
                alt={product.name}
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
                <div className="text-[10px] font-bold text-primary/70 mb-1.5 uppercase tracking-[0.3em] font-display">
                  {product.category?.name ?? "General"}
                </div>
                <h3 className="text-lg font-display font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight uppercase tracking-tight">
                  {product.name}
                </h3>
              </div>
              {onToggleWishlist && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(e);
                  }}
                >
                  {isInWishlist ? (
                    <RiHeartFill className="text-destructive fill-destructive" />
                  ) : (
                    <RiHeartLine />
                  )}
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground/70 line-clamp-2 mt-3 max-w-3xl leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold text-foreground font-sans tracking-tight">
                    RWF {price.toLocaleString()}
                  </div>
                  {discount > 0 && (
                    <div className="text-xs font-medium text-muted-foreground line-through">
                      RWF {basePrice.toLocaleString()}
                    </div>
                  )}
                </div>
                {company && (
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer w-fit uppercase font-bold tracking-widest"
                    onClick={(e) => {
                      if (onSupplierClick) {
                        e.stopPropagation();
                        onSupplierClick(e);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (onSupplierClick) {
                          e.stopPropagation();
                          onSupplierClick(e as any);
                        }
                      }
                    }}
                  >
                    <div className="w-5 h-5 bg-primary/5 border border-primary/10 flex items-center justify-center text-[10px] font-bold text-primary rounded-none">
                      {company.name?.charAt(0) ?? "?"}
                    </div>
                    {company.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "group flex flex-col bg-card border transition-all duration-500 cursor-pointer h-full relative rounded-none overflow-hidden hover:shadow-2xl hover:shadow-primary/5 border-border/20 hover:border-primary/40",
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        onMouseEnter={handleMouseEnter}
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-px transition-all duration-500 z-20 bg-primary/0 group-hover:bg-primary/40",
          )}
        />
        <div className="relative aspect-4/3 md:aspect-square overflow-hidden bg-muted/10">
          {img ? (
            <ImageWithFallback
              src={img}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                No Data
              </span>
            </div>
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.isFeatured && (
              <div className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-widest shadow-2xl">
                Featured
              </div>
            )}
            {discount > 0 && (
              <div className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-widest shadow-2xl">
                {discount}% OFF
              </div>
            )}
          </div>

          {onToggleWishlist && (
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute top-2 right-2 shadow-2xl bg-background/80 md:backdrop-blur-md border-border/20 rounded-none w-8 h-8",
                {
                  "opacity-0 group-hover:opacity-100": !isInWishlist,
                },
              )}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(e);
              }}
            >
              {isInWishlist ? (
                <RiHeartFill className="fill-destructive text-destructive w-4 h-4" />
              ) : (
                <RiHeartLine className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>

        <div className="p-2 md:p-3.5 flex flex-col grow gap-1 md:gap-2.5">
          <div className="space-y-1.5">
            <h3 className="text-xs md:text-[13px] font-display font-extrabold text-foreground tracking-tight leading-tight line-clamp-2 md:min-h-10 group-hover:text-primary transition-colors uppercase">
              {product.name}
            </h3>

            <div className="flex items-center gap-1.5">
              <div className="flex flex-col">
                <div className="flex items-end gap-1.5">
                  <div className="text-xs md:text-sm font-bold text-foreground font-display tracking-tight">
                    RWF {price.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-widest mb-px">
                    / {unit}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="text-[9px] font-bold text-muted-foreground/30 line-through mt-0.5 uppercase tracking-widest leading-none">
                    RWF {basePrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block space-y-1.5">
            <div className="flex items-center justify-between text-[9px] text-muted-foreground/50 uppercase font-bold tracking-widest">
              <span>{product.category?.name ?? "Product"}</span>
              {discount > 0 && (
                <span className="text-[9px] bg-primary/5 text-primary px-1.5 py-0.5 rounded-none font-bold">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 opacity-60">
              <RiStarLine size={10} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-bold text-foreground font-display">
                -
              </span>
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">
                ({product.views || 0} VIEWS)
              </span>
            </div>
          </div>

          <div className="mt-auto pt-2 md:pt-2.5 border-t border-border/40 space-y-1.5 md:space-y-2">
            {company && (
              <div
                role="button"
                tabIndex={0}
                className="flex items-start justify-between gap-2 group/comp cursor-pointer"
                onClick={(e) => {
                  if (onSupplierClick) {
                    e.stopPropagation();
                    onSupplierClick(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (onSupplierClick) {
                      e.stopPropagation();
                      onSupplierClick(e as any);
                    }
                  }
                }}
              >
                <div className="flex items-start gap-2 overflow-hidden">
                  <div className="w-5 h-5 md:w-7 md:h-7 bg-muted/20 border border-border/10 flex items-center justify-center rounded-none shrink-0 text-[10px] font-bold text-primary">
                    {company.name?.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] md:text-[10px] font-bold text-foreground/80 truncate group-hover/comp:text-primary transition-colors uppercase tracking-tight">
                        {company.name}
                      </span>
                      {company.isVerified && (
                        <RiShieldCheckLine
                          size={10}
                          className="text-emerald-500 shrink-0 opacity-80"
                        />
                      )}
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-0.5">
                      <span>{company.type}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-border" />
                      <span>{company.district}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
