import { RiArrowLeftSLine, RiHeartFill, RiHeartLine } from "@remixicon/react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "./types";

interface ServiceHeaderProps {
	service: Service;
	isInWishlist: boolean;
	onBack: () => void;
	onToggleWishlist: () => void;
	onInquire: () => void;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({
	service,
	isInWishlist,
	onBack,
	onToggleWishlist,
	onInquire,
}) => {
	return (
		<>
			{/* Desktop Header */}
			<div className="items-center justify-between hidden md:flex py-8 px-6 text-sm max-w-[1600px] mx-auto w-full">
				<Button
					variant="ghost"
					onClick={onBack}
					className="gap-2 font-heading uppercase tracking-wider text-xs rounded-sm pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
				>
					<RiArrowLeftSLine size={16} />
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

			{/* Mobile Edge-to-Edge Header */}
			<div className="md:hidden -mt-4 mb-8 relative h-[40vh] bg-background flex flex-col justify-end p-6 overflow-hidden">
				<div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
				<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

				<div className="relative z-10 space-y-4">
					<Badge className="bg-primary text-white border-none uppercase text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-none shadow-lg">
						Service Listing
					</Badge>
					<h1 className="text-4xl font-display font-black uppercase text-foreground tracking-tighter leading-[0.85]">
						{service.name}
					</h1>
				</div>

				{/* Back Button Overlay */}
				<button
					onClick={onBack}
					className="absolute top-6 left-6 w-10 h-10 border border-border bg-background/80 backdrop-blur-sm rounded-none flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
					type="button"
				>
					<RiArrowLeftSLine className="w-5 h-5" />
				</button>
			</div>
		</>
	);
};
