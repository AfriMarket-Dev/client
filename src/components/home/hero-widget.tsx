import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { cn } from "@/lib/utils";

export interface HeroWidgetItem {
  id: string;
  image?: string;
  price?: number | string;
  name?: string;
  label?: string; // e.g. "-20%" or "NEW"
  subtitle?: string; // Widget subtitle
  stat?: string;    // "50%"
  statDesc?: string; // "Up to off"
  subtext?: string;  // "Lagos, Nigeria" or "Freight & logistics"
  rating?: number;
  type?: "product" | "supplier" | "service" | "stat";
}

interface HeroWidgetProps {
  title: string;
  subtitle?: string;
  items: HeroWidgetItem[];
  href: string;
  className?: string;
  variant?: "default" | "blue" | "emerald" | "orange";
}

export const HeroWidget: React.FC<HeroWidgetProps> = ({
  title,
  subtitle,
  items,
  href,
  className,
  variant = "default",
}) => {
  // Ensure we always have 4 slots, filling with placeholders if needed
  const displayItems = [...items, ...Array(4)].slice(0, 4);

  const getVariantStyles = () => {
    switch (variant) {
      case "blue": return "group-hover:border-blue-500/30";
      case "emerald": return "group-hover:border-emerald-500/30";
      case "orange": return "group-hover:border-orange-500/30";
      default: return "group-hover:border-primary/30";
    }
  };

  const getAccentColor = () => {
    switch (variant) {
      case "blue": return "text-blue-600 bg-blue-600";
      case "emerald": return "text-emerald-600 bg-emerald-600";
      case "orange": return "text-orange-600 bg-orange-600";
      default: return "text-primary bg-primary";
    }
  };

  const getTextAccentColor = () => {
    switch (variant) {
      case "blue": return "text-blue-600";
      case "emerald": return "text-emerald-600";
      case "orange": return "text-orange-600";
      default: return "text-primary";
    }
  };

  const getBgAccentColor = () => {
    switch (variant) {
      case "blue": return "bg-blue-600";
      case "emerald": return "bg-emerald-600";
      case "orange": return "bg-orange-600";
      default: return "bg-primary";
    }
  };

  return (
    <div
      className={cn(
        "bg-background border border-border/60 p-4 flex flex-col h-full transition-all duration-300 relative group/widget rounded-md overflow-hidden hover:shadow-sm",
        getVariantStyles(),
        className
      )}
    >
      <div className="absolute top-0 right-0 w-20 h-20 blueprint-grid opacity-[0.02] pointer-events-none" />
      
      <div className={cn("absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover/widget:opacity-100 transition-opacity duration-300", getBgAccentColor())} />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground tracking-tight flex items-center gap-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">{subtitle}</p>
          )}
        </div>
        <Link
          to={href as any}
          className="text-muted-foreground hover:text-foreground transition-all p-1 group/link"
        >
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {displayItems.map((item, idx) => (
          <div key={idx} className="group/item flex flex-col h-full relative">
            {item.type === "stat" ? (
              <Link to={href as any} className="block h-full bg-muted/20 rounded-md p-2 border border-border/40 hover:border-border transition-colors flex flex-col justify-center items-center text-center relative overflow-hidden group-hover/widget:bg-muted/30">
                <div className="relative z-10">
                  <div className={cn("text-2xl md:text-3xl font-black font-heading leading-none mb-1 group-hover/item:scale-105 transition-transform duration-500 ease-out", getTextAccentColor())}>
                    {item.stat}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">
                    {item.statDesc}
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/products/${item.id}` as any}
                className="block h-full transition-colors relative"
              >
                {/* Image Container */}
                <div className="aspect-square bg-muted rounded-md overflow-hidden border border-border/40 group-hover/item:border-border transition-all duration-300 relative mb-2">
                  {item.image ? (
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name || "Item Image"}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700 ease-out"
                      fallbackSrc="https://placehold.co/300x300/e2e8f0/1e293b?text=Image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground">
                      <div className="text-xl font-black opacity-20">{item.name?.charAt(0)}</div>
                    </div>
                  )}

                  {item.label && (
                    <div className={cn("absolute top-1.5 left-1.5 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-[2px] shadow-sm z-10 uppercase tracking-wider", getBgAccentColor())}>
                      {item.label}
                    </div>
                  )}
                  
                  {item.type === 'supplier' && item.rating && (
                     <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md text-white px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold flex items-center gap-0.5">
                        <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                     </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h4 className="text-[11px] font-bold text-foreground line-clamp-1 group-hover/item:text-foreground/80 transition-colors tracking-tight">
                    {item.name || "Item Name"}
                  </h4>
                  
                  {item.type === 'supplier' ? (
                     <div className="text-[9px] text-muted-foreground flex items-center gap-1 truncate font-mono">
                        {item.subtext}
                     </div>
                  ) : item.type === 'service' ? (
                      <div className="flex flex-col">
                        <div className="text-[9px] text-muted-foreground truncate mb-0.5">{item.subtext}</div>
                        <div className="text-[10px] font-bold text-foreground font-mono">{typeof item.price === 'number' ? `RWF ${item.price.toLocaleString()}` : item.price}</div>
                      </div>
                  ) : (
                      <div className="flex flex-col">
                        {item.subtext && <div className="text-[9px] text-muted-foreground truncate">{item.subtext}</div>}
                        {item.price && (
                          <div className={cn("text-[10px] font-bold font-mono", item.label ? getTextAccentColor() : "text-foreground")}>
                             {typeof item.price === 'number' ? `RWF ${item.price.toLocaleString()}` : item.price}
                          </div>
                        )}
                      </div>
                  )}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
