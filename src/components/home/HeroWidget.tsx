import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export interface HeroWidgetItem {
  id: string;
  image: string;
  price?: number;
  name?: string;
  label?: string; // e.g. "-20%"
}

interface HeroWidgetProps {
  title: string;
  items: HeroWidgetItem[];
  href: string;
  className?: string;
}

export const HeroWidget: React.FC<HeroWidgetProps> = ({
  title,
  items,
  href,
  className,
}) => {
  // Ensure we always have 4 slots, filling with placeholders if needed
  const displayItems = [...items, ...Array(4)].slice(0, 4);

  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-border/60 p-6 flex flex-col h-full hover:shadow-lg transition-all duration-500 relative group/widget rounded-lg ${className}`}
    >
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-12 h-12 blueprint-grid opacity-10 pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-base text-foreground tracking-tight flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          {title}
        </h3>
        <Link
          to={href}
          className="text-muted-foreground hover:text-primary transition-all p-1 group"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {displayItems.map((item, idx) => (
          <div key={idx} className="group/item flex flex-col">
            <Link
              to={`/products/${item.id}`}
              className="block h-full transition-colors relative"
            >
              {/* Image Container */}
              <div className="aspect-square bg-muted/20 overflow-hidden border border-border/40 group-hover/item:border-primary/30 transition-all duration-500 relative mb-2">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name || "Product Image"}
                  className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                  fallbackSrc="https://placehold.co/300x300/e2e8f0/1e293b?text=Product"
                />

                {item.label && (
                  <div className="absolute top-0 left-0 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 shadow-sm z-10 uppercase tracking-tighter">
                    {item.label}
                  </div>
                )}

                <div className="absolute bottom-0 right-0 bg-background/80 backdrop-blur-sm text-[7px] font-black px-1 py-0.5 uppercase tracking-tighter text-muted-foreground border-tl border-border/40">
                  {idx % 2 === 0 ? "Popular" : "Verified"}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-0.5">
                <h4 className="text-[10px] font-bold text-foreground/80 line-clamp-1 leading-tight group-hover/item:text-primary transition-colors uppercase tracking-wide">
                  {item.name || "Product Name"}
                </h4>
                {item.price !== undefined && (
                  <div className="text-[13px] font-bold text-foreground font-sans">
                    RWF {item.price.toLocaleString()}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link
        to={href}
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 hover:text-primary mt-6 pt-4 border-t border-border/40 block text-center transition-colors"
      >
        Enter Node / 0{Math.floor(Math.random() * 9) + 1}
      </Link>
    </div>
  );
};
