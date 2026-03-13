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
	title = "Technical Specifications",
}) => {
	if (!specifications || Object.keys(specifications).length === 0) {
		return (
			<div className="py-10 text-center border border-dashed border-border/40 bg-muted/5">
				<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
					No specifications provided
				</p>
			</div>
		);
	}

	return (
		<div className={cn("space-y-6", className)}>
			{title && (
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-none bg-muted flex items-center justify-center">
						<RiSettings4Line className="w-4 h-4 text-muted-foreground" />
					</div>
					<h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
						{title}
					</h3>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/40 border border-border/40 overflow-hidden shadow-sm">
				{Object.entries(specifications).map(([key, value]) => (
					<div
						key={key}
						className="bg-background p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
					>
						<span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest shrink-0">
							{key}
						</span>
						<span className="text-[11px] font-bold uppercase text-foreground text-right break-all">
							{value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
