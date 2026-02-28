import { TrendingUp } from "lucide-react";
import React from "react";
import { useGetProductsQuery } from "@/app/api/products";
import { ProductCarousel } from "@/components/home/product-carousel";
import { SectionHeader } from "../home/section-header";
import { HomeSection } from "../home/home-section";

const TrendingProducts: React.FC = () => {
	const { data, isLoading } = useGetProductsQuery({
		limit: 10,
		sortBy: "views",
		sortOrder: "DESC",
	});
	const products = data?.data ?? [];

	if (!isLoading && products.length === 0) return null;

	return (
		<HomeSection
			id="trending"
			variant="white"
			withGrid
			borderTop
			borderBottom
			className="py-16 lg:py-32"
		>
			<div className="space-y-16">
				<SectionHeader
					title="Trending Materials"
					subtitle="High-demand industrial assets live now based on real-time marketplace analytics."
					label="Market Velocity"
					viewAllHref="/marketplace?sort=trending"
					viewAllLabel="Analyze Trends"
					icon={<TrendingUp className="w-5 h-5" />}
				/>

				{products.length === 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
						{Array.from({ length: 5 }).map((_, i) => (
							<div
								key={i}
								className="aspect-4/3 rounded-lg border border-border/40 bg-muted/20"
							/>
						))}
					</div>
				) : (
					<ProductCarousel listings={products as any} />
				)}
			</div>
		</HomeSection>
	);
};

export default TrendingProducts;
