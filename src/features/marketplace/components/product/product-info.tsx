import { RiChat3Line, RiShieldCheckLine, RiEyeLine, RiInboxLine, RiBuilding4Line, RiHistoryLine } from "@remixicon/react";
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
	brandName,
}) => {
	return (
		<div className="space-y-10">
			{/* Title & Technical ID */}
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-px bg-primary" />
					<span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
						Industrial Component
					</span>
				</div>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground uppercase tracking-tighter leading-[0.95]">
					{name}
				</h1>
			</div>

			{/* High-Density Stats Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border border-border/40 overflow-hidden shadow-sm">
				<div className="bg-background p-4 flex flex-col gap-1.5 group hover:bg-muted/5 transition-colors">
					<span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<RiBuilding4Line size={12} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
						Industry
					</span>
					<span className="text-[11px] font-bold uppercase truncate">
						{categoryName || "General Material"}
					</span>
				</div>
				<div className="bg-background p-4 flex flex-col gap-1.5 group hover:bg-muted/5 transition-colors">
					<span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<RiHistoryLine size={12} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
						Brand
					</span>
					<span className="text-[11px] font-bold uppercase truncate">
						{brandName || "Verified OEM"}
					</span>
				</div>
				<div className="bg-background p-4 flex flex-col gap-1.5 group hover:bg-muted/5 transition-colors">
					<span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<RiInboxLine size={12} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
						Stock
					</span>
					<span className={cn(
						"text-[11px] font-bold uppercase truncate",
						stock > 0 ? "text-success" : "text-destructive"
					)}>
						{stock > 0 ? `${stock} units` : "Out of stock"}
					</span>
				</div>
				<div className="bg-background p-4 flex flex-col gap-1.5 group hover:bg-muted/5 transition-colors">
					<span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<RiEyeLine size={12} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
						Views
					</span>
					<span className="text-[11px] font-bold uppercase">
						{views.toLocaleString()}
					</span>
				</div>
			</div>

			{/* Price Configuration */}
			<div className="p-8 bg-muted/10 border border-border/40 relative overflow-hidden">
				<div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
				<div className="relative z-10 space-y-4">
					<div className="flex flex-col gap-1">
						<span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
							Commercial Terms
						</span>
						<div className="flex items-baseline gap-2 pt-2">
							<span className="text-4xl md:text-5xl font-heading font-black text-foreground tracking-tighter">
								{priceType === "NEGOTIABLE" ? (
									"PRICE NEGOTIABLE"
								) : (
									<>
										{priceType === "STARTS_AT" && (
											<span className="text-sm uppercase mr-2 text-muted-foreground font-bold tracking-widest">
												From
											</span>
										)}
										<span className="text-foreground">RWF {price.toLocaleString()}</span>
									</>
								)}
							</span>
							{priceType !== "NEGOTIABLE" && (
								<span className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">
									/ {unit ?? "UNIT"}
								</span>
							)}
						</div>
					</div>
					
					<div className="pt-4 border-t border-border/20 flex items-center gap-6">
						<div className="flex items-center gap-2">
							<RiShieldCheckLine size={14} className="text-success" />
							<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
								Verified Listing
							</span>
						</div>
						<div className="flex items-center gap-2">
							<RiHistoryLine size={14} className="text-primary" />
							<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
								Fast Fulfillment
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Technical Abstract */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
						Product Abstract
					</span>
					<div className="h-px flex-1 bg-border/20" />
				</div>
				<p className="text-xs md:text-sm text-muted-foreground font-medium uppercase leading-relaxed tracking-wider max-w-2xl">
					{description ||
						"Professional industrial-grade resource optimized for enterprise deployment and high-volume operations. Engineered for durability and peak performance within technical environments."}
				</p>
			</div>

			{/* Primary Action Sequence */}
			<div className="pt-4 flex flex-col sm:flex-row gap-4">
				<Button
					onClick={onInquire}
					size="lg"
					className="h-16 flex-1 rounded-none bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-500 font-heading font-black uppercase tracking-[0.3em] text-[11px] shadow-xl shadow-primary/20 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
				>
					<RiChat3Line size={18} className="mr-3" />
					Initiate Inquiry
				</Button>
			</div>
		</div>
	);
};
