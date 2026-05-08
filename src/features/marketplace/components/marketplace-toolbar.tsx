import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MarketplaceToolbarProps {
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onToggleFilters?: () => void;
	showFilters?: boolean;
	searchPlaceholder?: string;
	hideFilterButton?: boolean;
	hideViewMode?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export const MarketplaceToolbar: React.FC<MarketplaceToolbarProps> = ({
	viewMode,
	onViewModeChange,
	searchQuery,
	onSearchChange,
	onToggleFilters,
	showFilters,
	searchPlaceholder = "Search...",
	hideFilterButton = false,
	hideViewMode = false,
	className,
	children,
}) => {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 grow">
					<div className="relative flex-1 group">
						<div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
							<Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						</div>
						<Input
							placeholder={searchPlaceholder}
							className="pl-9 bg-background border-border rounded-md h-10 w-full text-sm transition-all"
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3">
					{children}
					{onToggleFilters && !hideFilterButton && (
						<Button
							variant={showFilters ? "default" : "outline"}
							size="sm"
							className={cn(
								"hidden lg:flex rounded-md border-border h-10 font-medium px-4",
							)}
							onClick={onToggleFilters}
						>
							<SlidersHorizontal className="w-4 h-4 mr-2" />
							{showFilters ? "Hide Filters" : "Show Filters"}
						</Button>
					)}

					{!hideViewMode && (
						<div className="flex items-center bg-muted/20 border border-border/50 p-1 rounded-md hidden sm:flex h-10">
							<Button
								variant={viewMode === "grid" ? "secondary" : "ghost"}
								size="icon"
								className="rounded-sm h-7 w-7"
								onClick={() => onViewModeChange("grid")}
							>
								<LayoutGrid className="w-4 h-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "secondary" : "ghost"}
								size="icon"
								className="rounded-sm h-7 w-7"
								onClick={() => onViewModeChange("list")}
							>
								<List className="w-4 h-4" />
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
