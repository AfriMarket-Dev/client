import React from "react";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { categories as mockCategories } from "../../data/mockData";

interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFilters: boolean;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showFilters,
}) => (
  <aside
    className={`lg:w-72 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
  >
    <div className="space-y-4 sticky top-24">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search materials..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 pl-10 rounded-sm bg-background border-2 border-border uppercase placeholder:text-xs"
        />
      </div>

      <div>
        <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          <Button
            variant={selectedCategory === "all" ? "secondary" : "ghost"}
            className="justify-start rounded-sm font-bold uppercase text-xs tracking-wider"
            onClick={() => onCategoryChange("all")}
          >
            All Products
          </Button>
          {mockCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.name ? "secondary" : "ghost"}
              className="justify-start rounded-sm font-semibold text-xs uppercase tracking-wide hover:text-primary"
              onClick={() => onCategoryChange(cat.name)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <Card className="rounded-sm border-2 border-primary/20 bg-primary/5 p-5 shadow-none">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-heading font-bold uppercase text-foreground mb-1 tracking-wide">
              Direct from Source
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect directly with manufacturers. No markup.
            </p>
          </div>
        </div>
      </Card>
    </div>
  </aside>
);
