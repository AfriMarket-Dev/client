import React from "react";
import { Search, ShieldCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import type { ListingCategory } from "@/app/api/listing-categories";

export interface CatalogFiltersState {
  searchQuery: string;
  categoryId: string;
  type: "all" | "PRODUCT" | "SERVICE";
  minPrice: string;
  maxPrice: string;
  district: string;
  sortBy: "createdAt" | "name" | "price" | "views";
  sortOrder: "ASC" | "DESC";
}

interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  onFiltersChange: (f: Partial<CatalogFiltersState>) => void;
  categories: ListingCategory[];
  showFilters: boolean;
  isLoading?: boolean;
}

const defaultFilters: CatalogFiltersState = {
  searchQuery: "",
  categoryId: "all",
  type: "all",
  minPrice: "",
  maxPrice: "",
  district: "",
  sortBy: "createdAt",
  sortOrder: "DESC",
};

export const defaultCatalogFiltersState = (): CatalogFiltersState => ({ ...defaultFilters });

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  showFilters,
  isLoading,
}) => {
  const set = (key: keyof CatalogFiltersState, value: string | number) =>
    onFiltersChange({ [key]: value });

  return (
    <aside
      className={`lg:w-72 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
    >
      <div className="space-y-4 sticky top-24">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={filters.searchQuery}
            onChange={(e) => set("searchQuery", e.target.value)}
            className="h-11 pl-10 rounded-sm bg-background border border-border uppercase placeholder:text-xs"
          />
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Type
          </h3>
          <div className="flex flex-col gap-1">
            {(["all", "PRODUCT", "SERVICE"] as const).map((t) => (
              <Button
                key={t}
                variant={filters.type === t ? "secondary" : "ghost"}
                className="justify-start rounded-sm font-bold uppercase text-xs tracking-wider"
                onClick={() => set("type", t)}
              >
                {t === "all" ? "All" : t === "PRODUCT" ? "Products" : "Services"}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
            Category
          </h3>
          <div className="flex flex-col gap-1">
            <Button
              variant={filters.categoryId === "all" ? "secondary" : "ghost"}
              className="justify-start rounded-sm font-bold uppercase text-xs tracking-wider"
              onClick={() => set("categoryId", "all")}
            >
              All
            </Button>
            {!isLoading &&
              categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={filters.categoryId === cat.id ? "secondary" : "ghost"}
                  className="justify-start rounded-sm font-semibold text-xs uppercase tracking-wide hover:text-primary"
                  onClick={() => set("categoryId", cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
            Price range (RWF)
          </h3>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              step={100}
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => set("minPrice", e.target.value)}
              className="h-10"
            />
            <Input
              type="number"
              min={0}
              step={100}
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => set("maxPrice", e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
            District
          </h3>
          <Input
            placeholder="e.g. Gasabo"
            value={filters.district}
            onChange={(e) => set("district", e.target.value)}
            className="h-10"
          />
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
            Sort by
          </h3>
          <select
            value={filters.sortBy}
            onChange={(e) => set("sortBy", e.target.value as CatalogFiltersState["sortBy"])}
            className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm"
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="views">Views</option>
          </select>
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground mb-3 px-1 uppercase text-xs tracking-widest">
            Order
          </h3>
          <div className="flex gap-1">
            <Button
              variant={filters.sortOrder === "ASC" ? "secondary" : "ghost"}
              size="sm"
              className="flex-1 rounded-sm text-xs"
              onClick={() => set("sortOrder", "ASC")}
            >
              A–Z
            </Button>
            <Button
              variant={filters.sortOrder === "DESC" ? "secondary" : "ghost"}
              size="sm"
              className="flex-1 rounded-sm text-xs"
              onClick={() => set("sortOrder", "DESC")}
            >
              Z–A
            </Button>
          </div>
        </div>

        <Card className="rounded-sm border border-primary/20 bg-primary/5 p-5 shadow-none">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-heading font-bold uppercase text-foreground mb-1 tracking-wide">
                Direct from Source
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect directly with suppliers. No markup.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
};
