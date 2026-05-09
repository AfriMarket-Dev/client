import {
	RiChat3Line,
	RiEyeLine,
	RiInboxLine,
	RiStarFill,
} from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
	name: string;
	description?: string;
	price: number;
	unit?: string;
	priceType?: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
	stock?: number;
	views?: number;
	onInquire?: () => void;
	categoryName?: string;
	brandName?: string;
	averageRating: number;
	reviewCount: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
	name,
	description,
	price,
	unit,
	priceType = "FIXED",
	stock = 0,
	views = 0,
	onInquire,
	categoryName,
	averageRating = 0,
	reviewCount = 0,
	// brandName is accepted but unused for now
}) => {
	return (
		<div className="space-y-0">
			{/* Category & Title */}
			<div className="pb-6">
				<div className="flex items-center justify-between mb-2">
					<span className="text-xs font-medium text-muted-foreground">
						{categoryName || "Product"}
					</span>
					{reviewCount > 0 && (
						<div className="flex items-center gap-1">
							<div className="flex items-center gap-0.5 mr-1.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<RiStarFill
										key={i}
										size={10}
										className={cn(
											i < Math.round(averageRating)
												? "text-primary"
												: "text-muted-foreground/30",
										)}
									/>
								))}
							</div>
							<span className="text-[10px] font-bold text-foreground leading-none">
								{averageRating.toFixed(1)}
							</span>
							<span className="text-[10px] text-muted-foreground font-medium leading-none">
								({reviewCount})
							</span>
						</div>
					)}
				</div>
				<h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
					{name}
				</h1>
			</div>

			{/* Price — the most important piece, visually anchored */}
			<div className="py-5 px-5 bg-muted/30 border border-border mb-6">
				<span className="text-xs font-medium text-muted-foreground block mb-1">
					Price
				</span>
				<div className="flex items-baseline gap-2">
					<span className="text-2xl font-bold text-foreground tracking-tight">
						{priceType === "NEGOTIABLE" ? (
							"Negotiable"
						) : (
							<>
								{priceType === "STARTS_AT" && (
									<span className="text-sm text-muted-foreground font-medium mr-1">
										From
									</span>
								)}
								RWF {price.toLocaleString()}
							</>
						)}
					</span>
					{priceType !== "NEGOTIABLE" && (
						<span className="text-sm text-muted-foreground font-medium">
							/ {unit ?? "unit"}
						</span>
					)}
				</div>
			</div>

			{/* Quick Stats — compact horizontal row */}
			<div className="grid grid-cols-3 divide-x divide-border border border-border mb-6">
				{[
					{ label: "Category", value: categoryName || "—", icon: RiInboxLine },
					{
						label: "Stock",
						value: stock > 0 ? `${stock.toLocaleString()}` : "Out of stock",
						icon: RiInboxLine,
						highlight: stock === 0,
					},
					{ label: "Views", value: views.toLocaleString(), icon: RiEyeLine },
				].map((stat, i) => (
					<div key={i} className="py-3 px-4 flex flex-col gap-0.5">
						<span className="text-[11px] font-medium text-muted-foreground">
							{stat.label}
						</span>
						<span
							className={cn(
								"text-sm font-semibold truncate",
								stat.highlight && "text-destructive",
							)}
						>
							{stat.value}
						</span>
					</div>
				))}
			</div>

			{/* Description */}
			<div className="py-6 border-t border-border">
				<p className="text-sm text-muted-foreground leading-relaxed">
					{description || "No description provided."}
				</p>
			</div>

			{/* Primary Action */}
			<div className="pt-2">
				<Button
					onClick={onInquire}
					size="lg"
					className="h-11 w-full rounded-none text-sm font-semibold shadow-none"
				>
					<RiChat3Line size={16} className="mr-2" />
					Send Inquiry
				</Button>
			</div>
		</div>
	);
};
