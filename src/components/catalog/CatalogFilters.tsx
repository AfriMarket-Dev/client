import React, { useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/Sheet";
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
  onClearFilters: () => void;
  categories: ListingCategory[];
  isLoading?: boolean;
}

export const defaultCatalogFiltersState = (): CatalogFiltersState => ({
  searchQuery: "",
  categoryId: "all",
  type: "all",
  minPrice: "",
  maxPrice: "",
  district: "",
  sortBy: "createdAt",
  sortOrder: "DESC",
});

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  categories,
  isLoading,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const set = (key: keyof CatalogFiltersState, value: string) =>
    onFiltersChange({ [key]: value });

  // Helper to handle combined sort change
  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-");
    onFiltersChange({
      sortBy: field as CatalogFiltersState["sortBy"],
      sortOrder: order as CatalogFiltersState["sortOrder"],
    });
  };

  const activeFilterCount = [
    filters.categoryId !== "all",
    filters.type !== "all",
    filters.minPrice !== "",
    filters.maxPrice !== "",
    filters.district !== "",
  ].filter(Boolean).length;

  return (
    <div className="bg-background border-b border-border sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
        {/* TOP BAR: Search + Sort + Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Search Input (Flex Grow) */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) => set("searchQuery", e.target.value)}
              className="h-10 pl-9 pr-8 bg-muted/40 hover:bg-muted/60 transition-colors border-border focus:bg-background rounded-sm"
            />
            {filters.searchQuery && (
              <button
                onClick={() => set("searchQuery", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown (Hidden on very small screens? No, keep it) */}
          <div className="hidden sm:block w-[180px]">
            <Select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="h-10 bg-background border-border rounded-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-DESC">Newest Arrivals</SelectItem>
                <SelectItem value="price-ASC">Price: Low to High</SelectItem>
                <SelectItem value="price-DESC">Price: High to Low</SelectItem>
                <SelectItem value="name-ASC">Name: A to Z</SelectItem>
                <SelectItem value="views-DESC">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Sheet Trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant={activeFilterCount > 0 ? "secondary" : "outline"} 
                className={`h-10 gap-2 rounded-sm border-border ${activeFilterCount > 0 ? "text-foreground bg-secondary/80 hover:bg-secondary" : ""}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden xs:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-l border-border">
              <SheetHeader className="px-6 py-4 border-b border-border">
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>Refine your search results.</SheetDescription>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                {/* Mobile Sort (Visible only in sheet on small screens if needed, but we keep it separate generally. Let's add it here for mobile convenience) */}
                <div className="sm:hidden space-y-3">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-full">
                       <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="createdAt-DESC">Newest Arrivals</SelectItem>
                        <SelectItem value="price-ASC">Price: Low to High</SelectItem>
                        <SelectItem value="price-DESC">Price: High to Low</SelectItem>
                        <SelectItem value="name-ASC">Name: A to Z</SelectItem>
                        <SelectItem value="views-DESC">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={filters.categoryId}
                    onValueChange={(value) => set("categoryId", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {!isLoading &&
                        categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Listing Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "PRODUCT", "SERVICE"].map((type) => (
                        <Button
                            key={type}
                            type="button"
                            variant={filters.type === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => set("type", type as any)}
                            className="w-full capitalize"
                        >
                            {type.toLowerCase()}
                        </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Price Range (RWF)</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => set("minPrice", e.target.value)}
                      className="h-10"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => set("maxPrice", e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* District */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Location / District</label>
                  <Input
                    placeholder="e.g. Gasabo"
                    value={filters.district}
                    onChange={(e) => set("district", e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <SheetFooter className="border-t border-border p-6 bg-muted/20 mt-auto">
                 <div className="flex w-full gap-3">
                    <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={onClearFilters}
                    >
                        Reset
                    </Button>
                    <SheetClose asChild>
                        <Button className="flex-1" type="submit">
                            Show Results
                        </Button>
                    </SheetClose>
                 </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* ACTIVE FILTERS (Chips) */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-1 animate-in fade-in slide-in-from-top-1">
            {filters.categoryId !== "all" && (
                <Badge variant="secondary" className="rounded-sm px-2 py-1 gap-1 text-xs font-normal border-border hover:bg-secondary/80">
                    Category: {categories.find(c => c.id === filters.categoryId)?.name || filters.categoryId}
                    <button onClick={() => set("categoryId", "all")} className="ml-1 hover:text-foreground/70"><X className="w-3 h-3" /></button>
                </Badge>
            )}
            {filters.type !== "all" && (
                <Badge variant="secondary" className="rounded-sm px-2 py-1 gap-1 text-xs font-normal border-border hover:bg-secondary/80 capitalize">
                    Type: {filters.type.toLowerCase()}
                    <button onClick={() => set("type", "all")} className="ml-1 hover:text-foreground/70"><X className="w-3 h-3" /></button>
                </Badge>
            )}
            {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="secondary" className="rounded-sm px-2 py-1 gap-1 text-xs font-normal border-border hover:bg-secondary/80">
                   Price: {filters.minPrice || "0"} - {filters.maxPrice || "Any"}
                   <button onClick={() => onFiltersChange({ minPrice: "", maxPrice: "" })} className="ml-1 hover:text-foreground/70"><X className="w-3 h-3" /></button>
                </Badge>
            )}
            {filters.district && (
                <Badge variant="secondary" className="rounded-sm px-2 py-1 gap-1 text-xs font-normal border-border hover:bg-secondary/80">
                   Location: {filters.district}
                   <button onClick={() => set("district", "")} className="ml-1 hover:text-foreground/70"><X className="w-3 h-3" /></button>
                </Badge>
            )}
            <Button 
                variant="link" 
                size="sm" 
                onClick={onClearFilters}
                className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive transition-colors ml-auto"
            >
                Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};