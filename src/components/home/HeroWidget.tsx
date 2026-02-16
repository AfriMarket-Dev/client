import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className={`bg-card border border-border border-l-4 border-l-primary rounded-sm p-4 flex flex-col h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-black uppercase text-base md:text-lg tracking-wide text-foreground">
          {title}
        </h3>
        <Link to={href} className="text-muted-foreground hover:text-primary transition-colors bg-muted p-1.5 rounded-full hover:bg-primary/10">
            <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {displayItems.map((item, idx) => (
          <div key={idx} className="group/item flex flex-col">
            {item && typeof item === 'object' ? (
              <Link to={`/products/${item.id}`} className="block h-full transition-colors relative">
                {/* Image Container */}
                <div className="aspect-square bg-muted rounded-sm overflow-hidden border border-border group-hover/item:border-primary transition-colors relative mb-2">
                    <img
                    src={item.image}
                    alt={item.name || ""}
                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                    />
                    
                    {item.label && (
                        <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-sm shadow-sm z-10">
                            {item.label}
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div>
                     <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight mb-1 group-hover/item:text-primary transition-colors h-8">
                        {item.name || "Product Name"}
                     </h4>
                     {item.price !== undefined && (
                        <div className="text-sm font-black text-red-600">
                             RWF {item.price.toLocaleString()}
                        </div>
                     )}
                </div>
              </Link>
            ) : (
                // Placeholder
              <div className="w-full aspect-square bg-muted/30 rounded-sm border border-border/50 flex items-center justify-center mb-2">
                 <div className="w-4 h-4 bg-border/50 rounded-full" />
              </div>
            )}
          </div>
        ))}
      </div>
      
       <Link 
        to={href} 
        className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 mt-4 block text-center border border-primary/20 py-2 rounded-sm hover:bg-primary/5 transition-colors"
      >
        View All
      </Link>
    </div>
  );
};
