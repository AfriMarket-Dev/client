import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 african-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
              Browse by Industry
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight font-display">
              Construction Equipment <br /> & Materials
            </h2>
          </div>

          <Button
            variant="ghost"
            className="text-primary hover:bg-primary/5 font-semibold group h-12 rounded-xl"
            onClick={() => navigate("/categories")}
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category) => {
            const Icon = iconMap[category.icon as string] || Package;

            return (
              <Card
                key={category.id}
                onClick={() => navigate(`/categories?category=${category.id}`)}
                className="group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer border-border/60 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-6 border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((sub, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-lg bg-stone-100 text-stone-600 border-none font-medium px-2.5 py-0.5"
                      >
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-xs font-semibold text-muted-foreground/60 flex items-center px-1">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
