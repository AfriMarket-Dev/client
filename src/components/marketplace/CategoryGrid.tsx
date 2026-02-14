import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/mockData";
import {
  ArrowRight,
  Package,
  Tractor,
  BrickWall,
  Wrench,
  Zap,
  PaintBucket,
  Droplet,
} from "lucide-react";

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();

  const iconMap: Record<string, React.ElementType> = {
    Tractor: Tractor,
    BrickWall: BrickWall,
    Wrench: Wrench,
    Zap: Zap,
    PaintBucket: PaintBucket,
    Droplet: Droplet,
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-border pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-foreground mb-2">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-md font-medium">
            Find the specific materials and equipment you need
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/categories")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded font-bold uppercase tracking-wide shadow-none"
        >
          View all categories
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 6).map((category) => {
          const Icon = iconMap[category.icon as string] || Package;

          return (
            <div
              key={category.id}
              onClick={() => navigate(`/categories?category=${category.id}`)}
              className="group cursor-pointer bg-card rounded-sm border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden transform-gpu hover:-translate-y-1 p-px"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors duration-300 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors duration-300 rounded-br-sm pointer-events-none" />

              <div className="p-6 h-full flex flex-col items-start relative z-10">
                <div className="w-12 h-12 bg-muted/50 rounded-sm border border-border flex items-center justify-center mb-6 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-200">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.subcategories.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-1 rounded-sm border border-border"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground/70 px-2 py-1">
                      +{category.subcategories.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
