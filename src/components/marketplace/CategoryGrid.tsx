import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { Package, ArrowRight } from "lucide-react";
import { SectionHeader } from "../home/SectionHeader";

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetListingCategoriesQuery({ limit: 6 });
  const categories = data?.data ?? [];

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
      <SectionHeader 
        title="Browse by Category"
        subtitle="Find the specific materials and equipment you need for your project."
        label="Navigation"
        icon={<Package className="w-5 h-5" />}
        viewAllHref="/categories"
        viewAllLabel="View all categories"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-lg border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border/40">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border-r border-b border-border/40 hover:bg-muted/10 transition-all duration-500 relative overflow-hidden p-12 text-left rounded-lg"
            >
              {/* Blueprint Grid Overlay on hover */}
              <div className="absolute inset-0 blueprint-grid opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
              
              <div className="h-full flex flex-col items-start relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Package className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="h-[1px] w-12 bg-border group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                </div>

                <h3 className="text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight">
                  {category.name}
                </h3>
                <p className="text-muted-foreground/70 text-lg leading-relaxed line-clamp-3 font-normal max-w-sm mb-8">
                  {category.description || "Comprehensive node for high-quality industrial materials and equipment."}
                </p>
                
                <div className="mt-auto flex items-center gap-3 text-xs font-bold text-primary tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   Enter Directory <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="absolute top-0 right-0 p-8 text-foreground/5 font-display text-8xl font-black italic pointer-events-none group-hover:text-primary/5 transition-colors">
                 0{Math.floor(Math.random() * 9) + 1}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
