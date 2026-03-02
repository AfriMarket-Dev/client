import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { CatalogFilters } from "./types";

const COMPANY_TYPES = [
  { value: "MANUFACTURER", label: "Manufacturer" },
  { value: "WHOLESALER", label: "Wholesaler" },
  { value: "RETAILER", label: "Retailer" },
  { value: "SERVICE_PROVIDER", label: "Service Provider" },
] as const;

interface FilterPanelProps {
  filters: CatalogFilters;
  categories: Array<{ id: string; name: string }>;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  onPriceCommit: () => void;
  onFilterChange: (patch: Partial<CatalogFilters>) => void;
}

export const FilterPanel = memo<FilterPanelProps>(
  ({
    filters,
    categories,
    priceRange,
    onPriceRangeChange,
    onPriceCommit,
    onFilterChange,
  }) => {
    return (
      <div className="space-y-5 p-1">
        {/* Category */}
        <div className="space-y-2">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            Material Sector
          </Label>
          <Select
            value={filters.categoryId}
            onValueChange={(val) =>
              onFilterChange({ categoryId: val ?? undefined, page: 1 })
            }
          >
            <SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[9px] h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border/20">
              <SelectItem value="all" className="rounded-none text-[9px] uppercase tracking-widest">
                All Categories
              </SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="rounded-none text-[9px] uppercase tracking-widest">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="opacity-10" />

        {/* Company Type */}
        <div className="space-y-2">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            Supplier Class
          </Label>
          <Select
            value={filters.companyType}
            onValueChange={(val) =>
              onFilterChange({ companyType: val ?? undefined, page: 1 })
            }
          >
            <SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[9px] h-9">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border/20">
              <SelectItem value="all" className="rounded-none text-[9px] uppercase tracking-widest">
                All Classes
              </SelectItem>
              {COMPANY_TYPES.map((t) => (
                <SelectItem
                  key={t.value}
                  value={t.value}
                  className="rounded-none text-[9px] uppercase tracking-widest"
                >
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="opacity-10" />

        {/* Listing Type */}
        <div className="space-y-2">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            Protocol Type
          </Label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["all", "PRODUCT", "SERVICE"] as const).map((t) => (
              <Button
                key={t}
                variant={filters.type === t ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange({ type: t, page: 1 })}
                className={cn(
                  "w-full text-[8px] font-bold uppercase tracking-widest h-8 rounded-none transition-all",
                  filters.type === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/20",
                )}
              >
                {t === "all" ? "Any" : t === "PRODUCT" ? "Mat" : "Serv"}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="opacity-10" />

        {/* Sort */}
        <div className="space-y-2">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            Sorting
          </Label>
          <div className="flex gap-1.5">
            <Select
              value={filters.sortBy}
              onValueChange={(val) =>
                onFilterChange({ sortBy: val ?? undefined, page: 1 })
              }
            >
              <SelectTrigger className="flex-1 bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[9px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border/20">
                <SelectItem
                  value="createdAt"
                  className="rounded-none text-[9px] font-bold uppercase tracking-widest"
                >
                  Newest
                </SelectItem>
                <SelectItem
                  value="price"
                  className="rounded-none text-[9px] font-bold uppercase tracking-widest"
                >
                  Price
                </SelectItem>
                <SelectItem
                  value="name"
                  className="rounded-none text-[9px] font-bold uppercase tracking-widest"
                >
                  Name
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 px-2 rounded-none border-border/20 h-9"
              onClick={() =>
                onFilterChange({
                  sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
                  page: 1,
                })
              }
            >
              {filters.sortOrder === "ASC" ? "↑" : "↓"}
            </Button>
          </div>
        </div>

        <Separator className="opacity-10" />

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            Price Range
          </Label>
          <Slider
            value={priceRange}
            max={2_000_000}
            step={10_000}
            onValueChange={(val) => onPriceRangeChange(val as [number, number])}
            onValueCommitted={onPriceCommit}
            className="py-2"
          />
          <div className="flex items-center justify-between text-[8px] font-bold text-primary uppercase tracking-widest">
            <span>{priceRange[0].toLocaleString()} RWF</span>
            <span>{priceRange[1].toLocaleString()}+ RWF</span>
          </div>
          <div className="flex gap-1.5">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0] || ""}
              onChange={(e) =>
                onPriceRangeChange([Number(e.target.value), priceRange[1]])
              }
              className="h-8 bg-background rounded-none border-border/20 text-[9px] font-bold uppercase tracking-widest"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1] || ""}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], Number(e.target.value)])
              }
              className="h-8 bg-background rounded-none border-border/20 text-[9px] font-bold uppercase tracking-widest"
            />
          </div>
        </div>

        <Separator className="opacity-10" />

        {/* District */}
        <div className="space-y-2">
          <Label className="uppercase text-[9px] font-bold text-muted-foreground tracking-[0.2em] block">
            District Node
          </Label>
          <Input
            placeholder="Search District..."
            value={filters.district}
            onChange={(e) =>
              onFilterChange({ district: e.target.value, page: 1 })
            }
            className="h-9 bg-background rounded-none border-border/20 text-[9px] font-bold uppercase tracking-widest placeholder:text-muted-foreground/30"
          />
        </div>

        <Separator className="opacity-10" />

        {/* In Stock */}
        <div className="flex items-center justify-between border p-3 rounded-none border-border/20 bg-muted/5">
          <Label
            htmlFor="stock-toggle"
            className="text-[9px] font-bold uppercase tracking-widest cursor-pointer"
          >
            Available Now
          </Label>
          <Switch
            id="stock-toggle"
            className="rounded-none scale-75"
            checked={filters.onlyInStock}
            onCheckedChange={(checked) =>
              onFilterChange({ onlyInStock: checked, page: 1 })
            }
          />
        </div>
      </div>
    );
  },
);

FilterPanel.displayName = "FilterPanel";
