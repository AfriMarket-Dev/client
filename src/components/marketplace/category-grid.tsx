import { Package } from "lucide-react";
import React from "react";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import { SectionHeader } from "../home/section-header";
import { CompactCategoryCard } from "./compact-category-card";
import { HomeSection } from "../home/home-section";

const CategoryGrid: React.FC = () => {
	const { data: categoriesResult, isLoading } = useGetProductCategoriesQuery({
		limit: 8,
	});
	const categories = categoriesResult?.data || [];

	if (!isLoading && categories.length === 0) return null;

	return (
		<HomeSection
			id="categories"
			variant="muted"
			withGrid
			borderTop
			borderBottom
			className="py-16 lg:py-32"
		>
			<div className="space-y-16">
				<SectionHeader
					title="Browse Categories"
					subtitle="Discover specialized materials and services organized by industry sector."
					label="Industry Sectors"
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
		</HomeSection>
	);
};

export default CategoryGrid;
