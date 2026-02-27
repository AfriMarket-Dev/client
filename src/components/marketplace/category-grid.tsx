import { Package } from "lucide-react";
import type React from "react";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import { SectionHeader } from "../home/section-header";
import { CompactCategoryCard } from "./compact-category-card";

const CategoryGrid: React.FC = () => {
	const { data: categoriesResult, isLoading } = useGetProductCategoriesQuery({
		limit: 8,
	});
	const categories = categoriesResult?.data || [];

	return (
		<div className="max-w-[1600px] mx-auto px-4 lg:px-6">
			<SectionHeader
				title="Industrial Sectors"
				subtitle="Navigate through our specialized industrial procurement nodes."
				label="Market Segments"
				icon={<Package className="w-5 h-5" />}
				viewAllHref="/categories"
				viewAllLabel="All Categories"
			/>

			{isLoading || categories.length === 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="h-40 rounded-lg border border-border/40 bg-muted/20 animate-pulse"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{categories.map((category) => (
						<CompactCategoryCard key={category.id} category={category} />
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryGrid;
