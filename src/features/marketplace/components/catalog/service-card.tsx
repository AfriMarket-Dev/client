import { RiMapPinLine, RiStarFill } from "@remixicon/react";
import { useRouter } from "@tanstack/react-router";
import type React from "react";
import { ResourceCard } from "@/shared/components/catalog/resource-card";
import { formatCurrency } from "@/shared/utils/format";
import type { Service } from "@/types";

interface ServiceCardProps {
	service: Service;
	viewMode?: "grid" | "list";
	onProviderClick?: (e: React.MouseEvent) => void;
	onClick?: () => void;
	isInWishlist?: boolean;
	onToggleWishlist?: (e: React.MouseEvent) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
	service,
	viewMode = "grid",
	onProviderClick,
	onClick,
	isInWishlist,
	onToggleWishlist,
}) => {
	const router = useRouter();

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			router.navigate({ to: `/services/${service.id}` });
		}
	};

	const mainImage = service.images?.[0] || "";
	const company = service.company;

	const badges = service.priceType && (
		<div className="bg-background/90 text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border border-border">
			{service.priceType.replace("_", " ")}
		</div>
	);

	const footer = (
		<div className="flex items-center justify-between gap-4">
			<div className="flex flex-col min-w-0">
				<span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider mb-0.5 text-left">
					Rate from
				</span>
				<span className="text-base font-bold text-foreground truncate">
					{service.price ? formatCurrency(service.price, "RWF") : "Contact"}
				</span>
			</div>
			{company && (
				<div
					className="flex items-center gap-2 group/comp cursor-pointer shrink-0"
					onClick={(e) => {
						if (onProviderClick) {
							e.stopPropagation();
							onProviderClick(e);
						}
					}}
				>
					<div className="w-8 h-8 rounded-none border border-border flex items-center justify-center bg-muted group-hover/comp:bg-primary group-hover/comp:border-primary transition-all duration-300">
						<span className="text-xs font-semibold text-foreground group-hover/comp:text-primary-foreground">
							{company.name?.charAt(0)}
						</span>
					</div>
				</div>
			)}
		</div>
	);

	return (
		<ResourceCard
			id={service.id}
			name={service.name}
			image={mainImage}
			categoryName={service.category?.name || "General Service"}
			viewMode={viewMode}
			onClick={handleClick}
			isInWishlist={isInWishlist}
			onToggleWishlist={onToggleWishlist}
			badges={badges}
			footer={footer}
			imageClassName="aspect-video"
		>
			<div className="flex flex-col gap-2">
				{viewMode === "grid" && (
					<div className="flex items-center justify-between mb-1">
						<div className="flex items-center gap-1.5 text-muted-foreground text-left">
							<RiMapPinLine className="w-3.5 h-3.5" />
							<span className="text-xs font-medium">Kigali</span>
						</div>
						<div className="flex items-center gap-1.5 text-muted-foreground">
							<RiStarFill className="w-3 h-3 text-amber-500" />
							<span className="text-[10px] font-bold">
								{company?.rating || 5.0}
							</span>
						</div>
					</div>
				)}

				{viewMode === "list" && (
					<div className="flex items-center gap-1.5 text-muted-foreground text-left">
						<RiMapPinLine className="w-4 h-4" />
						<span className="text-xs font-medium">Kigali, Rwanda</span>
					</div>
				)}

				{viewMode === "list" && (
					<p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed text-left">
						{service.description}
					</p>
				)}
			</div>
		</ResourceCard>
	);
};
