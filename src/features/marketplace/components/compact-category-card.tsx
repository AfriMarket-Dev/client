import { RiArrowRightLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { ROUTES } from "@/shared/constants/routes";

interface CompactCategoryCardProps {
	category: {
		id: string;
		name: string;
		productCount?: number;
		subcategories?: string[];
	};
}

export const CompactCategoryCard: React.FC<CompactCategoryCardProps> = ({
	category,
}) => {
	return (
		<Link
			to={ROUTES.PUBLIC.PRODUCTS}
			search={{ category: category.id }}
			className="group bg-card border border-border hover:border-primary/50 rounded-md p-5 transition-all duration-300 hover:shadow-sm flex flex-col h-full cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
		>
			<div className="flex items-start justify-between mb-4 gap-4">
				<div className="space-y-1">
					<h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
						{category.name}
					</h3>
				</div>
				<div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
					{category.productCount ? `${category.productCount} Items` : "Catalog"}
				</div>
			</div>

			<div className="space-y-2 mb-6 flex-1">
				{(category.subcategories || []).slice(0, 3).map((sub, idx) => (
					<div
						key={idx}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/sub"
					>
						<div className="w-1 h-1 rounded-full bg-border group-hover/sub:bg-primary transition-colors flex-shrink-0" />
						<span className="truncate">{sub}</span>
					</div>
				))}
			</div>

			<div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm font-medium text-primary/80 group-hover:text-primary transition-all">
				<span>Browse Category</span>
				<RiArrowRightLine
					size={16}
					className="group-hover:translate-x-1 transition-transform"
				/>
			</div>
		</Link>
	);
};
