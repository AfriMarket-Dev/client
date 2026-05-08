import { RiSettings4Line } from "@remixicon/react";
import type React from "react";
import { cn } from "@/lib/utils";

interface SpecificationListProps {
	specifications?: Record<string, string>;
	className?: string;
	title?: string;
}

export const SpecificationList: React.FC<SpecificationListProps> = ({
	specifications,
	className,
	title = "Specifications",
}) => {
	if (!specifications || Object.keys(specifications).length === 0) {
		return (
			<div className="py-12 text-center border border-dashed border-border bg-muted/5">
				<p className="text-sm text-muted-foreground">
					No specifications provided
				</p>
			</div>
		);
	}

	return (
		<div className={cn("space-y-4", className)}>
			{title && (
				<div className="flex items-center gap-2">
					<RiSettings4Line className="w-4 h-4 text-muted-foreground" />
					<h3 className="text-sm font-semibold text-foreground">
						{title}
					</h3>
				</div>
			)}

			<div className="border border-border overflow-hidden">
				{Object.entries(specifications).map(([key, value], index) => (
					<div
						key={key}
						className={cn(
							"flex items-center justify-between py-3 px-4",
							index % 2 === 0 ? "bg-muted/20" : "bg-background",
							index !== Object.entries(specifications).length - 1 && "border-b border-border"
						)}
					>
						<span className="text-xs font-medium text-muted-foreground">
							{key}
						</span>
						<span className="text-sm font-semibold text-foreground text-right max-w-[60%] truncate">
							{value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
