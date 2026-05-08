import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PageHeaderProps } from "@/types";

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	subtitle,
	badge,
	actions,
	dark = false,
	className,
}) => {
	return (
		<div
			className={cn(
				"rounded-none p-4 sm:p-6 md:p-8 relative overflow-hidden border border-border",
				dark ? "bg-foreground text-background" : "bg-card text-foreground",
				className,
			)}
		>
			<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div className="min-w-0">
					{badge && (
						<Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-none border border-primary/20 mb-3 md:mb-4 font-medium tracking-normal px-2.5 py-0.5 text-xs">
							{badge}
						</Badge>
					)}
					<h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2 md:mb-3 truncate md:whitespace-normal">
						{title}
					</h1>
					{subtitle && (
						<p
							className={cn(
								"text-sm font-normal max-w-xl leading-relaxed",
								dark ? "text-muted-foreground/50" : "text-muted-foreground",
							)}
						>
							{subtitle}
						</p>
					)}
				</div>
				{actions && (
					<div className="flex flex-col sm:flex-row gap-2 md:gap-3 shrink-0 w-full md:w-auto">
						{actions}
					</div>
				)}
			</div>
		</div>
	);
};
