import { RiLayoutGridLine } from "@remixicon/react";
import {
	LayoutList as RiListCheckLine,
	Package as RiPackageLine,
} from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

interface CatalogHeaderProps {
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
	viewMode,
	onViewModeChange,
}) => (
	<div className="bg-background border-b border-border">
		<div className="max-w-7xl mx-auto px-4 py-6">
			<div className="flex items-center justify-between">
				<div>
					<div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
						<RiPackageLine className="w-4 h-4" />
						Product Catalog
					</div>
					<h1 className="text-3xl font-heading font-bold uppercase text-foreground leading-tight tracking-wide">
						Construction Materials
					</h1>
				</div>

				<div className="flex items-center bg-muted border border-border p-1 rounded-sm">
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="icon"
						className="rounded-none h-8 w-8"
						onClick={() => onViewModeChange("grid")}
					>
						<RiLayoutGridLine className="w-4 h-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="icon"
						className="rounded-none h-8 w-8"
						onClick={() => onViewModeChange("list")}
					>
						<RiListCheckLine className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
);
