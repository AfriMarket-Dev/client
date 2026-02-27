import { useNavigate } from "@tanstack/react-router";
import { RiTrophyLine } from "@remixicon/react";
import type React from "react";
import { useGetProductsQuery } from "@/app/api/products";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";

const BestSellers: React.FC = () => {
	const navigate = useNavigate();
	const { data: productsResult, isLoading } = useGetProductsQuery({
		sortBy: "views", // Backend supports this via views count
		sortOrder: "DESC",
		limit: 10,
	});
	const listings = productsResult?.data || [];

	return (
		<>
			<SectionHeader
				title="Best Sellers"
				subtitle="Direct access to the most requested industrial assets and materials."
				label="Market Analytics"
				icon={<RiTrophyLine className="w-5 h-5" />}
				viewAllHref="/products?sort=popular"
				viewAllLabel="View Analytics"
			/>

			{isLoading || listings.length === 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="aspect-4/5 rounded-lg border border-border/40 bg-muted/20 animate-pulse"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 lg:gap-6">
					{listings.map((listing: any) => (
						<ProductCard
							key={listing.id}
							listing={listing}
							onClick={() => navigate({ to: `/products/${listing.id}` as any })}
						/>
					))}
				</div>
			)}

			<div className="mt-8 md:hidden">
				<Button
					variant="outline"
					size="lg"
					onClick={() => navigate({ to: "/marketplace" as any })}
				>
					View all best sellers
				</Button>
			</div>
		</>
	);
};

export default BestSellers;
