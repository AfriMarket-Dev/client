import React from "react";
import { useGetProductCategoriesQuery } from "@/app/api/product-categories";
import BestSellers from "@/components/home/best-sellers";
import CTASection from "@/components/home/cta-section";
import { FeaturedBrands } from "@/components/home/featured-brands";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedServices from "@/components/home/featured-services";
import Hero from "@/components/home/hero";
import HotDeals from "@/components/home/hot-deals";
import { MarketplaceSubNav } from "@/components/home/marketplace-sub-nav";
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
      <MarketplaceSubNav />
      <Hero />

      <HotDeals />

      <TrendingProducts />

      <BestSellers />

      <CategoryGrid />

      <div className="flex flex-col space-y-px bg-border/40">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <ProductShowcase
              title={category.name}
              subtitle={
                category.description ||
                `Industrial-grade assets and materials within the ${category.name} vertical.`
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

      <NewArrivals />

      <FeaturedBrands />

      <FeaturedServices />

      <PromoBanner
        title="Heavy Asset Acquisition"
        subtitle="Full inventory of construction machinery for strategic project deployment."
        ctaText="Explore Machinery"
        ctaLink="/products?category=heavy-equipment"
        variant="dark"
      />

      <FeaturedProducts />

      <CTASection />

      <FeaturedSuppliers />
    </div>
  );
};

export default HomePage;
