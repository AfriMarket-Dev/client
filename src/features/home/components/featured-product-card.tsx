import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/shared/components/image-with-fallback";
import type { HeroFeaturedProduct } from "@/shared/utils/transformers";

export const FeaturedProductCard: React.FC<{
	product: HeroFeaturedProduct;
	isActive?: boolean;
}> = ({ product, isActive = true }) => {
	const navigate = useNavigate();

	return (
		<div
			className={`absolute inset-0 transition-opacity duration-1000 ${
				isActive
					? "opacity-100 pointer-events-auto scale-100"
					: "opacity-0 pointer-events-none scale-105"
			} transition-transform`}
		>
			<div className="absolute inset-0">
				<ImageWithFallback
					src={product.image}
					alt={product.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/40 to-transparent" />
				<div className="absolute inset-0 bg-industrial/20" />
			</div>

			{/* Top Bar with Badges */}
			<div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20">
				<Badge className="bg-primary text-primary-foreground border-none text-[9px] font-black tracking-[0.2em] px-2.5 py-1.5 h-auto rounded-none uppercase shadow-xl">
					{product.tag}
				</Badge>
				{product.discount && (
					<div className="bg-success text-success-foreground text-[9px] font-black rounded-none px-2 py-1 uppercase tracking-widest shadow-xl">
						{product.discount}
					</div>
				)}
			</div>

			{/* Bottom Content Area */}
			<div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 pt-6 md:pt-10 pb-20 md:pb-16 bg-gradient-to-t from-industrial to-transparent pointer-events-none">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-4 h-px bg-primary" />
					<p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">
						{product.category}
					</p>
				</div>

				<h3 className="text-white font-black text-lg md:text-xl lg:text-2xl leading-tight mb-2 uppercase tracking-tighter">
					{product.name}
				</h3>

				<div className="flex items-center gap-1.5 mb-2 opacity-70">
					<div className="flex items-center gap-0.5">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`w-2 h-2 ${
									star <= Math.floor(product.rating)
										? "fill-warning text-warning"
										: "fill-white/20 text-white/20"
								}`}
							/>
						))}
					</div>
					<span className="text-white text-[7px] font-black uppercase tracking-widest">
						{product.rating > 0 ? product.rating : "N/A"} · {product.reviews}{" "}
						VIEWS
					</span>
				</div>
			</div>

			{/* Action Bar - Price & View Button */}
			<div className="absolute bottom-10 md:bottom-12 left-4 right-4 md:left-6 md:right-6 z-30 flex items-end justify-between gap-4 pointer-events-auto">
				<div className="inline-flex flex-col gap-0.5 border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-sm">
					<span className="text-white font-black text-sm md:text-lg tracking-tighter">
						{product.price}
					</span>
				</div>
				<Button
					onClick={() => navigate({ to: "/products" })}
					className="bg-background hover:bg-muted text-foreground rounded-none h-9 px-4 text-[8px] font-black tracking-[0.2em] uppercase gap-2 group border-none shadow-xl"
				>
					VIEW{" "}
					<ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
				</Button>
			</div>
		</div>
	);
};
