import { TrendingUp } from "lucide-react";
import type React from "react";
import { useGetProductsQuery } from "@/app/api/products";
import { ProductCarousel } from "@/components/home/product-carousel";
import { SectionHeader } from "../home/section-header";

const TrendingProducts: React.FC = () => {
	const { data } = useGetProductsQuery({
		limit: 10,
		sortBy: "views",
		sortOrder: "DESC",
	});
	const products = data?.data ?? [];

	return (
		<div className="max-w-[1600px] mx-auto px-4 lg:px-6">
			<SectionHeader
				title="Trending Now"
				subtitle="The most sought-after materials and equipment in the market today."
				label="Popular Picks"
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
	);
};

export default TrendingProducts;
