import React from "react";
import BestSellers from "@/features/home/components/best-sellers";
import FeaturedProducts from "@/features/home/components/featured-products";
import Hero from "@/features/home/components/hero";
import HotDeals from "@/features/home/components/hot-deals";
import LiveDealsTicker from "@/features/home/components/live-deals-ticker";
import { MarketplaceSubNav } from "@/features/home/components/marketplace-sub-nav";
import NewArrivals from "@/features/home/components/new-arrivals";
import ProductShowcase from "@/features/home/components/product-showcase";
import PromoBanner from "@/features/home/components/promo-banner";
import CategoryGrid from "@/features/marketplace/components/category-grid";
import TrendingProducts from "@/features/marketplace/components/trending-products";
import { useGetProductCategoriesQuery } from "@/services/api/product-categories";
import { ROUTES } from "@/shared/constants/routes";

const CTASection = React.lazy(
	() => import("@/features/home/components/cta-section"),
);
const FeaturedServices = React.lazy(
	() => import("@/features/home/components/featured-services"),
);
const FeaturedProviders = React.lazy(
	() => import("@/features/provider/components/featured-providers"),
);

export function HomePage() {
	const { data: categoriesResult } = useGetProductCategoriesQuery({ limit: 4 });
	const categories = React.useMemo(
		() => categoriesResult?.data.slice(0, 2) || [],
		[categoriesResult?.data],
	);

	return (
		<div className="flex flex-col pb-24 industrial-grain bg-background min-h-screen">
			<LiveDealsTicker />
			<MarketplaceSubNav />
			<Hero />

			<div id="hot-deals">
				<HotDeals />
			</div>

			<div id="trending">
				<TrendingProducts />
			</div>

			<div id="best-sellers">
				<BestSellers />
			</div>

			<CategoryGrid />

			<div className="flex flex-col space-y-px bg-border/40">
				{categories.map(
					(
						category: { id: string; name: string; description?: string },
						index: number,
					) => (
						<React.Fragment key={category.id}>
							<ProductShowcase
								title={category.name}
								subtitle={
									category.description ||
									`Explore ${category.name} products and materials.`
								}
								categoryId={category.id}
								limit={10}
								className="py-10 lg:py-14"
								variant={index % 2 !== 0 ? "background" : "white"}
								withGrid={index % 2 === 0}
							/>

							{index === 1 ? (
								<PromoBanner
									title="Verified Providers"
									subtitle="Connect directly with verified local and international manufacturers."
									ctaText="Explore Providers"
									ctaLink={ROUTES.PUBLIC.SUPPLIERS}
									variant="primary"
								/>
							) : null}
						</React.Fragment>
					),
				)}
			</div>

			<div id="new-arrivals">
				<NewArrivals />
			</div>

			<React.Suspense
				fallback={<div className="h-40 animate-pulse bg-muted/20" />}
			>
				<FeaturedServices />

				<PromoBanner
					title="Heavy Equipment"
					subtitle="Browse construction machinery and heavy equipment from verified providers."
					ctaText="Explore Machinery"
					ctaLink={ROUTES.PUBLIC.PRODUCTS}
					variant="dark"
				/>

				<div id="featured-products">
					<FeaturedProducts />
				</div>

				<CTASection />

				<FeaturedProviders />
			</React.Suspense>
		</div>
	);
}
