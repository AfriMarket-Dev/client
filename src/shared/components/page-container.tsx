import type React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
	children: React.ReactNode;
	className?: string;
	isFluid?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
	children,
	className,
	isFluid = false,
}) => {
	return (
		<div
			className={cn(
				"py-6 md:py-10",
				!isFluid && "container mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8",
				className,
			)}
		>
			{children}
		</div>
	);
};
