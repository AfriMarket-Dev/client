import { RiShieldCheckLine, RiStarLine } from "@remixicon/react";
import { useRouter } from "@tanstack/react-router";
import type React from "react";
import { ResourceCard } from "@/shared/components/catalog/resource-card";
import { formatCurrency } from "@/shared/utils/format";
import type { MarketplaceItem } from "@/types";

interface ProductCardProps {
	product: MarketplaceItem;
	viewMode?: "grid" | "list";
	onProviderClick?: (e: React.MouseEvent) => void;
	onClick: () => void;
	isInWishlist?: boolean;
	onToggleWishlist?: (e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	product,
	viewMode = "grid",
	onProviderClick,
	onClick,
	isInWishlist,
	onToggleWishlist,
}) => {
	const router = useRouter();

	const variant = "variants" in product ? product.variants?.[0] : null;
	const basePrice = Number(
		variant?.price || ("price" in product ? product.price : 0),
	);
	const discount = Number(
		variant?.discount || ("discount" in product ? product.discount : 0),
	);
	const price = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
	const img =
		variant?.images?.[0] || ("images" in product ? product.images?.[0] : null);
	const unit = variant?.unit || ("unit" in product ? product.unit : "UNIT");
	const company = product.company;

	const handleMouseEnter = () => {
		router.preloadRoute({
			to: "/products/$productId",
			params: { productId: product.id },
		});
	};

	const badges = (
		<>
			{product.isFeatured && (
				<div className="bg-warning text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none">
					Featured
				</div>
			)}
			{discount > 0 && (
				<div className="bg-success text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none">
					{discount}% OFF
				</div>
			)}
		</>
	);

	const footer = company && (
		<div
			role="button"
			tabIndex={0}
			className="flex items-start justify-between gap-3 group/comp cursor-pointer"
			onClick={(e) => {
				if (onProviderClick) {
					e.stopPropagation();
					onProviderClick(e);
				}
			}}
		>
			<div className="flex items-center gap-3 overflow-hidden text-left text-foreground/80 hover:text-primary transition-colors">
				<div className="w-8 h-8 bg-muted border border-border flex items-center justify-center rounded-none shrink-0 text-xs font-semibold text-foreground">
					{company.name?.charAt(0)}
				</div>
				<div className="flex flex-col min-w-0">
					<div className="flex items-center gap-1.5">
						<span className="text-xs font-semibold truncate">
							{company.name}
						</span>
						{company.isVerified && (
							<RiShieldCheckLine
								size={14}
								className="text-emerald-600 shrink-0"
							/>
						)}
					</div>
					<div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
						<span>{company.type}</span>
						<span className="w-1 h-1 rounded-full bg-border" />
						<span>{company.district}</span>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<ResourceCard
			id={product.id}
			name={product.name}
			image={img}
			categoryName={product.category?.name}
			viewMode={viewMode}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			isInWishlist={isInWishlist}
			onToggleWishlist={onToggleWishlist}
			badges={badges}
			footer={footer}
		>
			<div className="space-y-3">
				<div className="flex flex-col">
					<div className="flex items-baseline gap-1.5">
						<div className="text-lg font-bold text-foreground tracking-tight">
							{formatCurrency(price, "RWF")}
						</div>
						<div className="text-xs text-muted-foreground font-medium">
							/ {unit?.toLowerCase() || "unit"}
						</div>
					</div>
					{discount > 0 && (
						<div className="text-sm font-medium text-muted-foreground line-through mt-0.5">
							{formatCurrency(basePrice, "RWF")}
						</div>
					)}
				</div>

				{viewMode === "grid" && (
					<div className="hidden md:flex items-center gap-1.5 text-muted-foreground">
						<RiStarLine size={14} className="text-amber-500 fill-amber-500" />
						<span className="text-xs font-medium">
							{product.views || 0} views
						</span>
					</div>
				)}

				{viewMode === "list" && (
					<p className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed text-left">
						{product.description}
					</p>
				)}
			</div>
		</ResourceCard>
	);
};
