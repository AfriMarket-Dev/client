import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: any;
	change?: string;
	bgColor?: string;
	color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
	label,
	value,
	icon: Icon,
	change,
	bgColor = "bg-primary/5",
	color = "text-primary",
}) => {
	return (
		<Card className="rounded-none border-border/40 shadow-sm overflow-hidden relative group">
			<div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-primary transition-all duration-500" />
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-4">
					<div className={cn("p-2 rounded-none", bgColor)}>
						<Icon className={cn("w-5 h-5", color)} />
					</div>
					{change && (
						<Badge
							variant="outline"
							className="text-[9px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 border-emerald-100 rounded-none"
						>
							{change}
						</Badge>
					)}
				</div>
				<h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
					{label}
				</h3>
				<p className="text-3xl font-display font-black text-foreground tracking-tighter">
					{value}
				</p>
			</CardContent>
		</Card>
	);
};
