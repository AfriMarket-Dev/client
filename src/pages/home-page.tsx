import React from "react";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import BestSellers from "@/components/home/best-sellers";
import CTASection from "@/components/home/cta-section";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedServices from "@/components/home/featured-services";
import Hero from "@/components/home/hero";
import HotDeals from "@/components/home/hot-deals";
import { MarketplaceSubNav } from "@/components/home/marketplace-sub-nav";
import LiveDealsTicker from "@/components/home/live-deals-ticker";
import NewArrivals from "@/components/home/new-arrivals";
import ProductShowcase from "@/components/home/product-showcase";
import PromoBanner from "@/components/home/promo-banner";
import CategoryGrid from "@/components/marketplace/category-grid";
import TrendingProducts from "@/components/marketplace/trending-products";
import FeaturedSuppliers from "@/components/supplier/featured-suppliers";

const HomePage: React.FC = () => {
  const { data: categoriesResult } = useGetProductCategoriesQuery({ limit: 4 });
  const categories = categoriesResult?.data.slice(0, 2) || [];

  return (
    <div className="flex flex-col pb-20 industrial-grain bg-background min-h-screen">
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
        {categories.map((category, index) => (
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

            {index === 1 && (
              <PromoBanner
                title="Verified Suppliers"
                subtitle="Connect directly with verified local and international manufacturers."
                ctaText="Explore Suppliers"
                ctaLink="/suppliers"
                variant="primary"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div id="new-arrivals">
        <NewArrivals />
      </div>

      <FeaturedServices />

      <PromoBanner
        title="Heavy Equipment"
        subtitle="Browse construction machinery and heavy equipment from verified suppliers."
        ctaText="Explore Machinery"
        ctaLink="/products?category=heavy-equipment"
        variant="dark"
      />

      <div id="featured-products">
        <FeaturedProducts />
      </div>

      <CTASection />

      <FeaturedSuppliers />
    </div>
  );
};

export default HomePage;
