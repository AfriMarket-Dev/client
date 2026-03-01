import {
  RiMapPinLine,
  RiStarFill,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import type { Service } from "@/app/api/services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  viewMode?: "grid" | "list";
  onSupplierClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  isInWishlist?: boolean;
  onToggleWishlist?: (e: React.MouseEvent) => void;
}

export const ServiceCard = memo(
  ({
    service,
    viewMode = "grid",
    onSupplierClick,
    onClick,
    isInWishlist,
    onToggleWishlist,
  }: ServiceCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else {
        navigate({ to: `/services/${service.id}` });
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleClick();
      }
    };

    const mainImage = service.images?.[0] || "/placeholder-service.jpg";

    if (viewMode === "list") {
      return (
        <div
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          className="group flex gap-5 bg-card border border-border/20 hover:border-primary/30 rounded-none p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer relative overflow-hidden"
        >
          <div className="relative w-52 aspect-video shrink-0 overflow-hidden rounded-none bg-muted/30 border border-border/10">
            <img
              src={mainImage}
              alt={service.name}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col grow py-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-primary/70 mb-1.5 uppercase tracking-[0.3em] font-display">
                  {service.category?.name || "General Service"}
                </div>
                <h3 className="text-lg font-display font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight uppercase tracking-tight">
                  {service.name}
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

            <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
              <RiMapPinLine className="w-3 h-3" />
              <span className="text-[10px] font-medium uppercase tracking-tight">
                Kigali, Rwanda
              </span>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <div>
                <div className="text-lg font-semibold text-foreground font-sans tracking-tight">
                  {service.price
                    ? `RWF ${service.price.toLocaleString()}`
                    : "Contact for Pricing"}
                </div>
                {service.company && (
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
                  >
                    <div className="w-5 h-5 bg-primary/5 border border-primary/10 flex items-center justify-center text-[10px] font-bold text-primary rounded-none">
                      {service.company.name?.charAt(0)}
                    </div>
                    {service.company.name}
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
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        className="group cursor-pointer bg-white border border-border/40 hover:border-primary/20 transition-all duration-500 overflow-hidden rounded-none h-full flex flex-col"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <img
            src={mainImage}
            alt={service.name}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          />
          {service.priceType && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md border border-border/20 z-10">
              <span className="text-[9px] font-black uppercase tracking-widest">
                {service.priceType.replace("_", " ")}
              </span>
            </div>
          )}
          {onToggleWishlist && (
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute top-2 right-2 shadow-2xl bg-background/80 backdrop-blur-md border border-border/20 rounded-none w-8 h-8 z-10",
                { "opacity-0 group-hover:opacity-100": !isInWishlist },
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

        <div className="p-4 flex flex-col grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5">
              {service.category?.name || "General Service"}
            </span>
            <div className="flex items-center gap-1">
              <RiStarFill className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-bold">
                {service.company?.rating || 5.0}
              </span>
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {service.name}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
            <RiMapPinLine className="w-3 h-3" />
            <span className="text-[10px] font-medium uppercase tracking-tight">
              Kigali, Rwanda
            </span>
          </div>

          <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
            <div>
              <span className="text-[9px] block uppercase font-bold text-muted-foreground tracking-tighter mb-0.5 text-left">
                Rate from
              </span>
              <span className="text-xs font-black">
                {service.price
                  ? `RWF ${service.price.toLocaleString()}`
                  : "Contact"}
              </span>
            </div>
            {service.company && (
              <div
                className="flex items-center gap-2"
                onClick={(e) => {
                  if (onSupplierClick) {
                    e.stopPropagation();
                    onSupplierClick(e);
                  }
                }}
              >
                <div className="w-6 h-6 rounded-none border border-border/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <span className="text-[10px] font-bold group-hover:text-white">
                    {service.company.name?.charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ServiceCard.displayName = "ServiceCard";
