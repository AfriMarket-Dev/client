import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "../image-with-fallback";

export interface ResourceCardProps {
	id: string;
	name: string;
	image?: string | null;
	categoryName?: string;
	viewMode?: "grid" | "list";
	onClick?: () => void;
	onMouseEnter?: () => void;
	isInWishlist?: boolean;
	onToggleWishlist?: (e: React.MouseEvent) => void;
	children: React.ReactNode;
	badges?: React.ReactNode;
	topRight?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
	imageClassName?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
	name,
	image,
	categoryName,
	viewMode = "grid",
	onClick,
	onMouseEnter,
	isInWishlist,
	onToggleWishlist,
	children,
	badges,
	topRight,
	footer,
	className,
	imageClassName,
}) => {
	const wishlistButton = onToggleWishlist && (
		<Button
			data-testid="wishlist-button"
			variant={viewMode === "grid" ? "secondary" : "ghost"}
			size="icon"
			className={cn(
				viewMode === "grid"
					? "absolute top-2 right-2 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-none w-8 h-8 z-10"
					: "",
				viewMode === "grid" &&
					!isInWishlist &&
					"opacity-0 group-hover:opacity-100 transition-opacity",
			)}
			onClick={(e) => {
				e.stopPropagation();
				onToggleWishlist(e);
			}}
		>
			{isInWishlist ? (
				<RiHeartFill className="fill-destructive text-destructive w-4 h-4" />
			) : (
				<RiHeartLine className="w-4 h-4 text-muted-foreground" />
			)}
		</Button>
	);

	if (viewMode === "list") {
		return (
			<div
				role="button"
				tabIndex={0}
				className={cn(
					"group flex gap-6 bg-card border border-border hover:border-primary/50 rounded-none p-5 transition-all duration-300 cursor-pointer relative overflow-hidden",
					className,
				)}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
			>
				<div
					className={cn(
						"relative w-48 aspect-video shrink-0 overflow-hidden rounded-none bg-muted/30 border border-border/50",
						imageClassName,
					)}
				>
					<ImageWithFallback
						src={image || undefined}
						alt={name}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				</div>

				<div className="flex flex-col grow py-1 min-w-0">
					<div className="flex justify-between items-start gap-4">
						<div className="min-w-0">
							{categoryName && (
								<div className="text-xs font-medium text-muted-foreground mb-1.5">
									{categoryName}
								</div>
							)}
							<h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
								{name}
							</h3>
						</div>
						{wishlistButton}
					</div>

					<div className="flex-1 mt-2">{children}</div>
					{footer && <div className="mt-4">{footer}</div>}
				</div>
			</div>
		);
	}

	return (
		<div
			role="button"
			tabIndex={0}
			className={cn(
				"group flex flex-col bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full relative rounded-none overflow-hidden",
				className,
			)}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
		>
			<div
				className={cn(
					"relative aspect-[4/3] overflow-hidden bg-muted/10 border-b border-border/50",
					imageClassName,
				)}
			>
				<ImageWithFallback
					src={image || undefined}
					alt={name}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{badges && (
					<div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
						{badges}
					</div>
				)}

				{topRight && (
					<div className="absolute top-2 right-2 z-10">
						{topRight}
					</div>
				)}

				{!topRight && wishlistButton}
			</div>

			<div className="p-4 flex flex-col grow gap-2">
				<div className="flex items-center justify-between gap-2">
					{categoryName && (
						<div className="text-xs font-medium text-muted-foreground">
							{categoryName}
						</div>
					)}
					{topRight && wishlistButton && (
						<div className="-mr-2">{wishlistButton}</div>
					)}
				</div>
				<h3 className="text-base font-semibold text-foreground tracking-tight line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
					{name}
				</h3>

				<div className="flex-1 mt-1">{children}</div>
				{footer && (
					<div className="mt-4 pt-4 border-t border-border/50">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
};
