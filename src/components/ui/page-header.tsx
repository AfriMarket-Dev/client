import type React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
	title: string;
	subtitle?: string;
	badge?: string;
	actions?: React.ReactNode;
	showPattern?: boolean;
	dark?: boolean;
	className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	subtitle,
	badge,
	actions,
	showPattern = false,
	dark = false,
	className,
}) => {
	return (
		<div
			className={cn(
				"rounded-sm p-8 relative overflow-hidden border border-border shadow-none",
				dark
					? "bg-foreground text-background"
					: "bg-background text-foreground",
				className,
			)}
		>
			{showPattern && (
				<div className="absolute inset-0 african-pattern pointer-events-none" />
			)}

			<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					{badge && (
						<Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm border-none mb-4 font-heading font-bold tracking-widest uppercase text-[10px]">
							{badge}
						</Badge>
					)}
					<h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight leading-none mb-2">
						{title}
					</h1>
					{subtitle && (
						<p
							className={cn(
								"text-lg font-medium max-w-md uppercase tracking-wider text-xs",
								dark ? "text-muted-foreground" : "text-muted-foreground",
							)}
						>
							{subtitle}
						</p>
					)}
				</div>
				{actions && <div className="flex gap-3 shrink-0">{actions}</div>}
			</div>
		</div>
	);
};
