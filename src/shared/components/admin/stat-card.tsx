import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: React.ElementType;
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
		<Card className="rounded-none border-border shadow-none overflow-hidden relative group">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-4">
					<div className={cn("p-2 rounded-none", bgColor)}>
						<Icon
							className={cn("w-5 h-5", color)}
						/>
					</div>
					{change && (
						<Badge
							variant="outline"
							className="text-xs font-medium bg-success/5 text-success border-success/10 rounded-none px-2 py-0.5"
						>
							{change}
						</Badge>
					)}
				</div>
				<h3 className="text-muted-foreground text-xs font-medium mb-1 truncate">
					{label}
				</h3>
				<p className="text-2xl font-bold text-foreground tracking-tight">
					{value}
				</p>
			</CardContent>
		</Card>
	);
};
