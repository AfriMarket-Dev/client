import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import type React from "react";
import { useCallback } from "react";
import type { Listing } from "@/app/api/listings";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "../ui/button-group";

interface ProductCarouselProps {
	listings: Listing[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
	listings,
}) => {
	const navigate = useNavigate();
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		dragFree: true,
	});

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);

	if (listings.length === 0) return null;

	return (
		<div className="relative group/carousel">
			<div className="absolute -top-18 right-0 z-10">
				<ButtonGroup>
					<Button variant="outline" size="icon" onClick={scrollPrev}>
						<RiArrowLeftSLine />
					</Button>
					<Button variant="outline" size="icon" onClick={scrollNext}>
						<RiArrowRightSLine />
					</Button>
				</ButtonGroup>
			</div>

			{/* Carousel Viewport */}
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-3 md:gap-4 lg:gap-6 touch-pan-y">
					{listings.map((listing) => (
						<div
							key={listing.id}
							className="flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_20%] min-w-0"
						>
							<ProductCard
								listing={listing}
								onClick={() =>
									navigate({ to: `/products/${listing.id}` as any })
								}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
