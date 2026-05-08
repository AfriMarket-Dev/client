import type React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/shared/components/image-with-fallback";

interface ProductGalleryProps {
	name: string;
	images: string[];
	selectedImageIndex: number;
	onImageSelect: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
	name,
	images,
	selectedImageIndex,
	onImageSelect,
}) => {
	return (
		<div className="flex flex-col md:flex-row gap-8 h-full">
			{/* Main Image Stage */}
			<div className="flex-1 aspect-square md:aspect-auto overflow-hidden bg-muted/5 relative group border-none shadow-none">
				{images[selectedImageIndex] ? (
					<ImageWithFallback
						src={images[selectedImageIndex]}
						alt={name}
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground">
						Preview Unavailable
					</div>
				)}
				
				{/* Image Counter Badge */}
				<div className="absolute bottom-4 right-4">
					<Badge className="bg-background/80 backdrop-blur-sm text-foreground border-none rounded-none px-3 py-1 text-xs font-medium shadow-none">
						{selectedImageIndex + 1} / {images.length || 1}
					</Badge>
				</div>
			</div>

			{/* Thumbnails Navigation */}
			{images.length > 1 && (
				<div className="w-full md:w-28 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
					{images.map((image, idx) => (
						<button
							type="button"
							key={image}
							onClick={() => onImageSelect(idx)}
							className={cn(
								"flex-1 md:flex-none aspect-square w-20 md:w-full shrink-0 overflow-hidden rounded-none border transition-all duration-200 p-0 shadow-none",
								selectedImageIndex === idx
									? "border-foreground bg-background opacity-100"
									: "border-transparent opacity-60 hover:opacity-100 hover:border-border/40"
							)}
						>
							<ImageWithFallback
								src={image}
								alt=""
								className="h-full w-full object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
