import React from "react";
import { Grid, List, Filter, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CatalogHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onToggleFilters: () => void;
  showFilters: boolean;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  viewMode,
  onViewModeChange,
  onToggleFilters,
  showFilters,
}) => (
  <div className="bg-background border-b-2 border-border sticky top-0 z-30 h-20 flex items-center">
    <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
      <div className="py-4">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
          <Package className="w-4 h-4" />
          Product Catalog
        </div>
        <h1 className="text-3xl font-heading font-bold uppercase text-foreground leading-tight tracking-wide">
          Construction Materials
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-muted border border-border p-1 rounded-sm">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-none h-8 w-8"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-none h-8 w-8"
            onClick={() => onViewModeChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="rounded-sm border-2 border-border lg:hidden font-heading uppercase tracking-wider text-xs"
          onClick={onToggleFilters}
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? "Hide" : "Filter"}
        </Button>
      </div>
    </div>
  </div>
);
