import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Listing } from "@/app/api/listings";
import { useNavigate } from "react-router-dom";

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
      {/* Navigation Buttons */}
      {/* Navigation Buttons */}
      <div className="absolute -top-16 right-0 flex gap-1.5 z-10 bg-white dark:bg-slate-900 p-1 rounded-lg border border-border/40 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md hover:bg-muted hover:text-primary transition-colors"
          onClick={scrollPrev}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border/40 my-auto" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md hover:bg-muted hover:text-primary transition-colors"
          onClick={scrollNext}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 touch-pan-y">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_20%] min-w-0"
            >
              <ProductCard
                listing={listing}
                onClick={() => navigate(`/products/${listing.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
