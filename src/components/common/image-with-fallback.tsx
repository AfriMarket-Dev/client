import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
	src,
	alt,
	className,
	fallbackSrc = "https://images.unsplash.com/photo-1581094794329-cd56b5095bb4?auto=format&fit=crop&q=80&w=800",
	...props
}) => {
	const [error, setError] = useState(false);

	return (
		<img
			src={error ? fallbackSrc : src}
			alt={alt}
			onError={() => setError(true)}
			className={cn(className)}
			{...props}
		/>
	);
};
