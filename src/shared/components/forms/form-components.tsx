import type React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
	title,
	description,
	children,
	className,
}) => (
	<div
		className={cn(
			"space-y-6 pb-8 border-b border-border/10 last:border-0 last:pb-0",
			className,
		)}
	>
		<div>
			<h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-1.5">
				{title}
			</h3>
			{description && (
				<p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-relaxed">
					{description}
				</p>
			)}
		</div>
		<div className="space-y-5">{children}</div>
	</div>
);

interface FormGridProps {
	children: React.ReactNode;
	cols?: 1 | 2 | 3;
	className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({
	children,
	cols = 2,
	className,
}) => (
	<div
		className={cn(
			"grid gap-5",
			cols === 1 && "grid-cols-1",
			cols === 2 && "grid-cols-1 md:grid-cols-2",
			cols === 3 && "grid-cols-1 md:grid-cols-3",
			className,
		)}
	>
		{children}
	</div>
);
