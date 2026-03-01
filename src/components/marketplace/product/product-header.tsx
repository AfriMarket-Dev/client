import { RiArrowLeftLine, RiHeartFill, RiHeartLine } from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
	onBack: () => void;
	isInWishlist: boolean;
	onToggleWishlist: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
	onBack,
	isInWishlist,
	onToggleWishlist,
}) => {
	return (
		<div className="items-center justify-between hidden md:flex py-8 px-6 text-sm max-w-[1600px] mx-auto w-full">
			<Button
				variant="ghost"
				onClick={onBack}
				className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
			>
				<RiArrowLeftLine size={16} />
				Back to Marketplace
			</Button>
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					className="font-heading uppercase tracking-wider text-xs rounded-sm border-primary/20 text-primary hover:bg-primary/5 transition-colors gap-2"
					onClick={onToggleWishlist}
				>
					{isInWishlist ? (
						<RiHeartFill className="w-4 h-4 text-primary" />
					) : (
						<RiHeartLine className="w-4 h-4" />
					)}
					{isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
				</Button>
			</div>
		</div>
	);
};
