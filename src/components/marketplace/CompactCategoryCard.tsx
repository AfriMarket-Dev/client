import React from "react";
import { Package, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompactCategoryCardProps {
  category: {
    id: string;
    name: string;
    productCount?: number;
    subcategories?: string[];
  };
}

export const CompactCategoryCard: React.FC<CompactCategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group bg-white dark:bg-slate-900 border border-border/60 hover:border-primary/40 rounded-lg p-4 transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      onClick={() => navigate(`/products?category=${category.id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Package size={16} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                {category.name}
            </h3>
        </div>
        <span className="text-[9px] font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm">
            {category.productCount ? `${category.productCount}+` : "1.2k+"} items
        </span>
      </div>

      <div className="space-y-1 mb-4 flex-1">
        {(category.subcategories || ["Raw Materials", "Components", "Industrial Tools"]).slice(0, 3).map((sub, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground/80 hover:text-foreground cursor-pointer group/sub">
                <ChevronRight size={10} className="text-primary/50 group-hover/sub:text-primary" />
                {sub}
            </div>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-border/30 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary/80 group-hover:text-primary">
        <span>Browse Catalog</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
