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
	fallbackSrc = "/logo.svg",
	...props
}) => {
	const [error, setError] = useState(false);

	return (
		<img
			src={error ? fallbackSrc : src}
			alt={alt}
			onError={() => setError(true)}
			className={cn(className)}
			loading="lazy"
			decoding="async"
			{...props}
		/>
	);
};
