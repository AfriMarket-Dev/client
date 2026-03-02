import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PageHeaderProps } from "@/types";

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
				"rounded-none p-8 md:p-10 relative overflow-hidden border border-border/20 shadow-none transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5",
				dark ? "bg-slate-950 text-white" : "bg-card text-foreground",
				className,
			)}
		>
			{showPattern && (
				<div className="absolute inset-0 african-pattern pointer-events-none" />
			)}

			<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					{badge && (
						<Badge className="bg-primary/10 text-primary hover:bg-primary/20 rounded-none border border-primary/20 mb-6 font-display font-extrabold tracking-[0.3em] uppercase text-[10px] px-3 py-1">
							{badge}
						</Badge>
					)}
					<h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-4">
						{title}
					</h1>
					{subtitle && (
						<p
							className={cn(
								"text-sm font-bold max-w-xl uppercase tracking-[0.2em] leading-relaxed",
								dark ? "text-muted-foreground/50" : "text-muted-foreground/60",
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
