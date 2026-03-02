import { ShieldCheck } from "lucide-react";
import type React from "react";
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
import { Switch } from "@/components/ui/switch";
import type { SupplierFiltersState } from "@/types";

const COMPANY_TYPES = [
	{ value: "MANUFACTURER", label: "Manufacturer" },
	{ value: "WHOLESALER", label: "Wholesaler" },
	{ value: "RETAILER", label: "Retailer" },
	{ value: "SERVICE_PROVIDER", label: "Service Provider" },
];

interface SupplierFilterPanelProps {
	filters: SupplierFiltersState;
	categories: Array<{ id: string; name: string }>;
	onFilterChange: (updates: Partial<SupplierFiltersState>) => void;
}

export const SupplierFilterPanel: React.FC<SupplierFilterPanelProps> = ({
	filters,
	categories,
	onFilterChange,
}) => {
	return (
		<div className="space-y-6 p-1">
			{/* Category */}
			<div className="space-y-4">
				<Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
					Category
				</Label>
				<Select
					value={filters.categoryId}
					onValueChange={(val) => onFilterChange({ categoryId: val as string })}
				>
					<SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent className="rounded-none border-border/20">
						<SelectItem value="all" className="rounded-none">
							All Categories
						</SelectItem>
						{categories.map((cat) => (
							<SelectItem key={cat.id} value={cat.id} className="rounded-none">
								{cat.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Separator />

			{/* Company Type */}
			<div className="space-y-4">
				<Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
					Business Type
				</Label>
				<Select
					value={filters.type}
					onValueChange={(val) => onFilterChange({ type: val as string })}
				>
					<SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
						<SelectValue placeholder="All Types" />
					</SelectTrigger>
					<SelectContent className="rounded-none border-border/20">
						<SelectItem value="all" className="rounded-none">
							All Types
						</SelectItem>
						{COMPANY_TYPES.map((t) => (
							<SelectItem
								key={t.value}
								value={t.value}
								className="rounded-none"
							>
								{t.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Separator />

			{/* Location */}
			<div className="space-y-4">
				<Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
					Location (District)
				</Label>
				<Input
					placeholder="e.g. Gasabo, Kicukiro"
					value={filters.district}
					onChange={(e) => onFilterChange({ district: e.target.value })}
					className="bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10 placeholder:text-muted-foreground/30"
				/>
			</div>

			<Separator />

			{/* Rating */}
			<div className="space-y-4">
				<Label className="uppercase text-xs font-bold text-muted-foreground tracking-wider block mb-2">
					Min Rating
				</Label>
				<Select
					value={filters.minRating}
					onValueChange={(val) => onFilterChange({ minRating: val as string })}
				>
					<SelectTrigger className="w-full bg-background rounded-none border-border/20 font-display font-medium uppercase tracking-widest text-[10px] h-10">
						<SelectValue placeholder="Any Rating" />
					</SelectTrigger>
					<SelectContent className="rounded-none border-border/20">
						<SelectItem value="0" className="rounded-none">
							Any Rating
						</SelectItem>
						<SelectItem value="4" className="rounded-none">
							4+ Stars
						</SelectItem>
						<SelectItem value="4.5" className="rounded-none">
							4.5+ Stars
						</SelectItem>
						<SelectItem value="5" className="rounded-none">
							5 Stars
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Separator />

			{/* Verified Only */}
			<div className="flex items-center justify-between space-x-2 border p-4 rounded-none border-border/20 bg-muted/5">
				<Label
					htmlFor="verified-mode"
					className="text-[10px] font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 text-foreground/70"
				>
					<ShieldCheck className="w-3.5 h-3.5 text-primary" />
					Verified Only
				</Label>
				<Switch
					id="verified-mode"
					className="rounded-none scale-90"
					checked={filters.verified}
					onCheckedChange={(checked) => onFilterChange({ verified: checked })}
				/>
			</div>
		</div>
	);
};
