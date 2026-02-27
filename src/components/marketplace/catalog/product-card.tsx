import { RiHeartLine, RiChat1Line, RiShieldCheckLine, RiStarLine, RiHeartFill } from "@remixicon/react";
import React from "react";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
	listing: any;
	viewMode?: "grid" | "list";
	onSupplierClick?: (e: React.MouseEvent) => void;
	onClick: () => void;
	isInWishlist?: boolean;
	onToggleWishlist?: (e: React.MouseEvent) => void;
}

function firstPrice(listing: any): number {
	if (listing.price) return Number(listing.price);
	const v = listing.variants?.[0];
	return v ? Number(v.price) : 0;
}

function firstImage(listing: any): string | null {
	const v = listing.variants?.[0];
	const imgs = v?.images;
	return imgs?.length ? imgs[0] : listing.images?.[0] || null;
}

function firstDiscount(listing: any): number {
	if (listing.discount) return listing.discount;
	const v = listing.variants?.[0];
	return v?.discount || 0;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
	({
		listing,
		viewMode = "grid",
		onSupplierClick,
		onClick,
		isInWishlist,
		onToggleWishlist,
	}) => {
		const company = listing.company;
		const basePrice = firstPrice(listing);
		const discount = firstDiscount(listing);
		const price = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
		const img = firstImage(listing);

		if (viewMode === "list") {
			return (
				<div
					className="group flex gap-5 bg-card border border-border/40 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
					onClick={onClick}
				>
					<div className="relative w-52 aspect-video shrink-0 overflow-hidden rounded-md bg-muted/30">
						{img ? (
							<ImageWithFallback
								src={img}
								alt={listing.name}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
								<span className="text-xs font-medium opacity-50">No image</span>
							</div>
						)}
					</div>

					<div className="flex flex-col grow py-1">
						<div className="flex justify-between items-start">
							<div>
								<div className="text-[10px] font-semibold text-primary/70 mb-1.5 uppercase tracking-wider">
									{listing.category?.name ?? "General"}
								</div>
								<h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
									{listing.name}
								</h3>
							</div>
							{onToggleWishlist && (
								<Button
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.stopPropagation();
										onToggleWishlist(e);
									}}
								>
									{isInWishlist ? (
										<RiHeartFill className="text-destructive fill-destructive" />
									) : (
										<RiHeartLine />
									)}
								</Button>
							)}
						</div>

						<p className="text-sm text-muted-foreground/70 line-clamp-2 mt-3 max-w-3xl leading-relaxed">
							{listing.description}
						</p>

						<div className="mt-auto flex items-end justify-between">
							<div>
								<div className="flex items-center gap-2">
									<div className="text-lg font-semibold text-foreground font-sans tracking-tight">
										RWF {price.toLocaleString()}
									</div>
									{discount > 0 && (
										<div className="text-xs font-medium text-muted-foreground line-through">
											RWF {basePrice.toLocaleString()}
										</div>
									)}
								</div>
								{company && (
									<div
										className="flex items-center gap-2 mt-2 text-xs text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer w-fit"
										onClick={(e) => {
											if (onSupplierClick) {
												e.stopPropagation();
												onSupplierClick(e);
											}
										}}
									>
										<div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center text-[10px] font-bold text-primary">
											{company.name?.charAt(0) ?? "?"}
										</div>
										{company.name}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div
				className="group flex flex-col bg-white dark:bg-slate-900 border border-border/60 hover:border-primary transition-all duration-300 cursor-pointer h-full relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl"
				onClick={onClick}
			>
				{/* Visual Header */}
				<div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-muted/10">
					{img ? (
						<ImageWithFallback
							src={img}
							alt={listing.name}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20">
							<span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
								No Data
							</span>
						</div>
					)}

					{/* Status Overlays */}
					<div className="absolute top-2 left-2 flex flex-col gap-1">
						{listing.isFeatured && (
							<div className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">
								Featured
							</div>
						)}
						{discount > 0 && (
							<div className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">
								{discount}% OFF
							</div>
						)}
						{listing.type === "SERVICE" && (
							<div className="bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">
								Verified Pro
							</div>
						)}
					</div>

					{onToggleWishlist && (
						<Button
							variant="outline"
							size="icon"
							className={cn("absolute top-2 right-2 shadow-md", {
								"opacity-0 group-hover:opacity-100": !isInWishlist,
							})}
							onClick={(e) => {
								e.stopPropagation();
								onToggleWishlist(e);
							}}
						>
							{isInWishlist ? (
								<RiHeartFill className="fill-current" />
							) : (
								<RiHeartLine />
							)}
						</Button>
					)}
				</div>

				<div className="p-2 md:p-3.5 flex flex-col grow gap-1 md:gap-2.5">
					<div className="space-y-0.5 md:space-y-1">
						<h3 className="text-xs md:text-sm font-sans font-semibold text-foreground/90 leading-tight line-clamp-2 min-h-0 md:min-h-[2.5rem] group-hover:text-primary transition-colors">
							{listing.name}
						</h3>

						<div className="flex items-center gap-1.5">
							<div className="flex flex-col">
								<div className="flex items-end gap-1.5">
									<div className="text-xs md:text-sm font-bold text-foreground font-sans">
										RWF {price.toLocaleString()}
									</div>
									<div className="text-[10px] text-muted-foreground font-medium mb-[1px]">
										/ unit
									</div>
								</div>
								{discount > 0 && (
									<div className="text-[10px] font-medium text-muted-foreground line-through mt-0.5">
										RWF {basePrice.toLocaleString()}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="hidden md:block space-y-1.5">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>
								MOQ:{" "}
								<span className="text-foreground font-semibold">10 units</span>
							</span>
							{discount > 0 && (
								<span className="text-[10px] bg-primary/5 text-primary px-1 rounded-sm font-bold tracking-tighter">
									{discount}% OFF
								</span>
							)}
						</div>

						<div className="flex items-center gap-1">
							<RiStarLine size={10} className="text-amber-500 fill-amber-500" />
							<span className="text-[10px] font-bold text-foreground">4.8</span>
							<span className="text-[9px] text-muted-foreground">
								(120+ sold)
							</span>
						</div>
					</div>

					{/* Supplier Block - Busy Style */}
					<div className="mt-auto pt-2 md:pt-2.5 border-t border-border/40 space-y-1.5 md:space-y-2">
						{company && (
							<div
								className="flex items-start justify-between gap-2 group/comp cursor-pointer"
								onClick={(e) => {
									if (onSupplierClick) {
										e.stopPropagation();
										onSupplierClick(e);
									}
								}}
							>
								<div className="flex items-start gap-2 overflow-hidden">
									<div className="w-5 h-5 md:w-7 md:h-7 bg-muted/30 border border-border flex items-center justify-center rounded shrink-0 text-[9px] md:text-[10px] font-bold text-primary">
										{company.name?.charAt(0)}
									</div>
									<div className="flex flex-col min-w-0">
										<div className="flex items-center gap-1">
											<span className="text-[9px] md:text-[10px] font-bold text-foreground truncate group-hover/comp:text-primary transition-colors">
												{company.name}
											</span>
											<RiShieldCheckLine
												size={10}
												className="text-emerald-500 shrink-0"
											/>
										</div>
										<div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
											{/* <span>3Yrs Platform</span> */}
											<span>{company.type}</span>
											<span className="w-1 h-1 rounded-full bg-border" />
											<span>{company.district}</span>
										</div>
									</div>
								</div>
							</div>
						)}

						<div className="flex gap-1.5">
							<Button
								size="sm"
								className="flex-1 h-6 md:h-8 text-[10px] font-bold uppercase tracking-widest rounded-sm"
							>
								Inquiry
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-6 w-6 md:h-7 md:w-7 shrink-0 rounded-sm border-border/60 hover:bg-muted p-1"
							>
								<RiChat1Line className="w-full h-full" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	},
);

ProductCard.displayName = "ProductCard";
