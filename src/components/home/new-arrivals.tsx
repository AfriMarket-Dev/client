import { useNavigate } from "@tanstack/react-router";
import { RiSparklingLine } from "@remixicon/react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useGetProductsQuery } from "@/app/api/products";
import {
	useAddToWishlistMutation,
	useGetWishlistQuery,
	useRemoveFromWishlistMutation,
} from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { ProductCard } from "@/components/marketplace/catalog/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import { HomeSection } from "./home-section";

const NewArrivals: React.FC = () => {
	const navigate = useNavigate();
	const { data: productsResult, isLoading } = useGetProductsQuery({
		sortBy: "createdAt",
		sortOrder: "DESC",
		limit: 10,
	});
	const listings = productsResult?.data || [];

	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const { data: wishlist = [] } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [addToWishlist] = useAddToWishlistMutation();
	const [removeFromWishlist] = useRemoveFromWishlistMutation();

	const handleToggleWishlist = async (
		e: React.MouseEvent,
		productId: string,
	) => {
		e.stopPropagation();
		if (!isAuthenticated) {
			toast.error("Please login to add to wishlist");
			return;
		}
		try {
			const isInWishlist = wishlist.some(
				(l: { id: string }) => l.id === productId,
			);
			if (isInWishlist) {
				await removeFromWishlist({ id: productId, type: "product" }).unwrap();
				toast.success("Removed from wishlist");
			} else {
				await addToWishlist({ id: productId, type: "product" }).unwrap();
				toast.success("Added to wishlist");
			}
		} catch (error) {
			toast.error("Failed to update wishlist");
		}
	};

	if (!isLoading && listings.length === 0) return null;

	return (
		<HomeSection
			id="new-arrivals"
			variant="white"
			borderBottom
			className="py-10 lg:py-14"
		>
			<SectionHeader
				title="New Arrivals"
				subtitle="The latest verified industrial materials and equipment added to the marketplace."
				label="Latest Inventory"
				icon={<RiSparklingLine className="w-5 h-5" />}
				viewAllHref="/products?sort=newest"
				viewAllLabel="View All New Arrivals"
			/>

			{listings.length === 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="aspect-4/5 rounded-lg border border-border/40 bg-muted/20"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-4 lg:gap-6">
					{listings.map((listing) => (
						<ProductCard
							key={listing.id}
							listing={listing}
							onClick={() => navigate({ to: `/products/${listing.id}` } as any)}
							isInWishlist={wishlist.some(
								(l: { id: string }) => l.id === listing.id,
							)}
							onToggleWishlist={(e) => handleToggleWishlist(e, listing.id)}
						/>
					))}
				</div>
			)}

			<div className="mt-10 md:hidden">
				<Button
					variant="outline"
					size="lg"
					className="w-full rounded-lg h-14 font-semibold border-border/60 shadow-none"
					onClick={() =>
						navigate({ to: "/products", search: { sort: "newest" } } as any)
					}
				>
					View all new listings
				</Button>
			</div>
		</HomeSection>
	);
};

export default NewArrivals;
