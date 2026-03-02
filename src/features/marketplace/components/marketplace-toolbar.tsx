import {
	Layers,
	LayoutGrid,
	List,
	Package,
	Search,
	Wrench,
} from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ListingType } from "@/types";

interface MarketplaceToolbarProps {
	type: ListingType;
	onTypeChange: (type: ListingType) => void;
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onToggleFilters?: () => void;
	showFilters?: boolean;
}

export const MarketplaceToolbar: React.FC<MarketplaceToolbarProps> = ({
	type,
	onTypeChange,
	viewMode,
	onViewModeChange,
	searchQuery,
	onSearchChange,
}) => {
	return (
		<div className="flex flex-col gap-4 mb-8">
			<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 grow">
					<Tabs
						value={type}
						onValueChange={(v) => onTypeChange(v as ListingType)}
						className="w-full sm:w-auto"
					>
						<TabsList className="h-10 bg-muted/20 border border-border/10 p-0.5 rounded-none">
							<TabsTrigger
								value="all"
								className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
							>
								<Layers className="w-3.5 h-3.5 mr-1.5" />
								All
							</TabsTrigger>
							<TabsTrigger
								value="PRODUCT"
								className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
							>
								<Package className="w-3.5 h-3.5 mr-1.5" />
								Materials
							</TabsTrigger>
							<TabsTrigger
								value="SERVICE"
								className="rounded-none px-4 text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none h-full"
							>
								<Wrench className="w-3.5 h-3.5 mr-1.5" />
								Services
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="relative flex-1 group">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
						<Input
							placeholder="SEARCH MARKETPLACE..."
							className="pl-11 bg-muted/10 border-border/40 rounded-none focus:ring-0 focus:border-primary/60 h-10 w-full font-display font-bold uppercase tracking-wider text-[10px] transition-all"
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center bg-muted/20 border border-border/10 p-0.5 rounded-none hidden sm:flex h-10">
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="icon"
						className="rounded-none h-8 w-8"
						onClick={() => onViewModeChange("grid")}
					>
						<LayoutGrid className="w-3.5 h-3.5" />
					</Button>
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="icon"
						className="rounded-none h-8 w-8"
						onClick={() => onViewModeChange("list")}
					>
						<List className="w-3.5 h-3.5" />
					</Button>
				</div>
			</div>
		</div>
	);
};
