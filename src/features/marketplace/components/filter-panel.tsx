import { memo, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { CatalogFilters } from "@/types";

const COMPANY_TYPE_LABELS: Record<string, string> = {
	SUPPLIER_DEALER: "Dealer",
	SUPPLIER_RETAILER: "Retailer",
	SUPPLIER_WHOLESALER: "Wholesaler/Importer",
	MANUFACTURER_RWANDA: "Factory (Rwanda)",
	MANUFACTURER_EAC: "Factory (EAC)",
	SERVICE_PROVIDER: "Service Provider",
};

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
		const stockToggleId = useId();

		return (
			<div className="space-y-6">
				{/* Category */}
				<div className="space-y-3">
					<Label className="text-sm font-bold text-foreground uppercase tracking-widest">
						Category
					</Label>
					<Select
						value={filters.categoryId}
						onValueChange={(val) =>
							onFilterChange({ categoryId: val ?? undefined, page: 1 })
						}
					>
						<SelectTrigger className="w-full bg-background rounded-none border-border h-10 text-sm shadow-none">
							<SelectValue placeholder="All Categories">
								{filters.categoryId === "all" || !filters.categoryId
									? "All Categories"
									: categories.find(
											(c) => String(c.id) === String(filters.categoryId),
										)?.name || filters.categoryId}
							</SelectValue>
						</SelectTrigger>
						<SelectContent className="rounded-none border-border">
							<SelectItem value="all" className="text-sm rounded-none">
								All Categories
							</SelectItem>
							{categories.map((c) => (
								<SelectItem
									key={c.id}
									value={c.id}
									className="text-sm rounded-none"
								>
									{c.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Separator />

				{/* Company Type */}
				<div className="space-y-3">
					<Label className="text-sm font-bold text-foreground uppercase tracking-widest">
						Provider Type
					</Label>
					<Select
						value={filters.companyType}
						onValueChange={(val) =>
							onFilterChange({ companyType: val ?? undefined, page: 1 })
						}
					>
						<SelectTrigger className="w-full bg-background rounded-none border-border h-10 text-sm shadow-none">
							<SelectValue placeholder="All Types">
								{filters.companyType === "all" || !filters.companyType
									? "All Types"
									: COMPANY_TYPE_LABELS[filters.companyType] ||
										filters.companyType}
							</SelectValue>
						</SelectTrigger>
						<SelectContent className="rounded-none border-border">
							<SelectItem value="all" className="text-sm rounded-none">
								All Types
							</SelectItem>
							<SelectGroup>
								<SelectLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 px-2">
									Provider
								</SelectLabel>
								<SelectItem
									value="SUPPLIER_DEALER"
									className="text-sm rounded-none pl-6"
								>
									Dealer
								</SelectItem>
								<SelectItem
									value="SUPPLIER_RETAILER"
									className="text-sm rounded-none pl-6"
								>
									Retailer
								</SelectItem>
								<SelectItem
									value="SUPPLIER_WHOLESALER"
									className="text-sm rounded-none pl-6"
								>
									Wholesaler/Importer
								</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 px-2">
									Manufacturer
								</SelectLabel>
								<SelectItem
									value="MANUFACTURER_RWANDA"
									className="text-sm rounded-none pl-6"
								>
									Factory (Rwanda)
								</SelectItem>
								<SelectItem
									value="MANUFACTURER_EAC"
									className="text-sm rounded-none pl-6"
								>
									Factory (EAC)
								</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 px-2">
									Service
								</SelectLabel>
								<SelectItem
									value="SERVICE_PROVIDER"
									className="text-sm rounded-none pl-6"
								>
									Service Provider
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<Separator />

				{/* Sort */}
				<div className="space-y-3">
					<Label className="text-sm font-bold text-foreground uppercase tracking-widest">
						Sorting
					</Label>
					<div className="flex gap-2">
						<Select
							value={filters.sortBy}
							onValueChange={(val) =>
								onFilterChange({ sortBy: val ?? undefined, page: 1 })
							}
						>
							<SelectTrigger className="flex-1 bg-background rounded-none border-border h-10 text-sm shadow-none">
								<SelectValue placeholder="Sorting">
									{filters.sortBy === "createdAt"
										? "Newest"
										: filters.sortBy === "price"
											? "Price"
											: filters.sortBy === "name"
												? "Name"
												: "Sorting"}
								</SelectValue>
							</SelectTrigger>
							<SelectContent className="rounded-none border-border">
								<SelectItem value="createdAt" className="text-sm rounded-none">
									Newest
								</SelectItem>
								<SelectItem value="price" className="text-sm rounded-none">
									Price
								</SelectItem>
								<SelectItem value="name" className="text-sm rounded-none">
									Name
								</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 rounded-none border-border h-10 w-10 shadow-none"
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

				<Separator />

				{/* Price Range */}
				<div className="space-y-4">
					<Label className="text-sm font-bold text-foreground uppercase tracking-widest">
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
					<div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
						<span>{priceRange[0].toLocaleString()} RWF</span>
						<span>{priceRange[1].toLocaleString()}+ RWF</span>
					</div>
					<div className="flex gap-2">
						<Input
							type="number"
							placeholder="Min"
							value={priceRange[0] || ""}
							onChange={(e) =>
								onPriceRangeChange([Number(e.target.value), priceRange[1]])
							}
							className="h-10 bg-background rounded-none border-border text-sm shadow-none"
						/>
						<Input
							type="number"
							placeholder="Max"
							value={priceRange[1] || ""}
							onChange={(e) =>
								onPriceRangeChange([priceRange[0], Number(e.target.value)])
							}
							className="h-10 bg-background rounded-none border-border text-sm shadow-none"
						/>
					</div>
				</div>

				<Separator />

				{/* District */}
				<div className="space-y-3">
					<Label className="text-sm font-bold text-foreground uppercase tracking-widest">
						District
					</Label>
					<Input
						placeholder="Search district..."
						value={filters.district}
						onChange={(e) =>
							onFilterChange({ district: e.target.value, page: 1 })
						}
						className="h-10 bg-background rounded-none border-border text-sm placeholder:text-muted-foreground/50 shadow-none"
					/>
				</div>

				<Separator />

				{/* In Stock */}
				<div className="flex items-center justify-between border p-4 rounded-none border-border bg-muted/20">
					<Label
						htmlFor={stockToggleId}
						className="text-xs font-bold uppercase tracking-widest cursor-pointer"
					>
						Available Now
					</Label>
					<Switch
						id={stockToggleId}
						checked={filters.onlyInStock}
						onCheckedChange={(checked) =>
							onFilterChange({ onlyInStock: checked, page: 1 })
						}
						className="rounded-none"
					/>
				</div>
			</div>
		);
	},
);

FilterPanel.displayName = "FilterPanel";
