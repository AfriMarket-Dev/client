import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardProps {
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
	className?: string;
	headerActions?: React.ReactNode;
	noPadding?: boolean;
}

export const CardWrapper: React.FC<CardProps> = ({
	title,
	subtitle,
	children,
	className,
	headerActions,
	noPadding = false,
}) => {
	return (
		<Card className={cn("rounded-none border-border shadow-none", className)}>
			{(title || subtitle || headerActions) && (
				<CardHeader className="border-b border-border bg-muted/5 py-4 px-6">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							{title && (
								<CardTitle className="font-semibold text-base">
									{title}
								</CardTitle>
							)}
							{subtitle && (
								<p className="text-sm text-muted-foreground">{subtitle}</p>
							)}
						</div>
						{headerActions}
					</div>
				</CardHeader>
			)}
			<CardContent className={cn(noPadding ? "p-0" : "p-6")}>
				{children}
			</CardContent>
		</Card>
	);
};

export { CardWrapper as Card };
