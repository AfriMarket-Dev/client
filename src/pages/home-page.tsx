import React from "react";
import Hero from "@/components/home/hero";
import CategoryGrid from "@/components/marketplace/category-grid";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedServices from "@/components/home/featured-services";
import FeaturedSuppliers from "@/components/supplier/featured-suppliers";
import HotDeals from "@/components/home/hot-deals";
import NewArrivals from "@/components/home/new-arrivals";
import PromoBanner from "@/components/home/promo-banner";
import ProductShowcase from "@/components/home/product-showcase";
import BestSellers from "@/components/home/best-sellers";
import TrendingProducts from "@/components/marketplace/trending-products";
import { FeaturedBrands } from "@/components/home/featured-brands";
// import { LiveDealsTicker } from "@/components/home/live-deals-ticker";
import { MarketplaceSubNav } from "@/components/home/marketplace-sub-nav";
import CTASection from "@/components/home/cta-section";
import { HomeSection } from "@/components/home/home-section";
import { mockCategories } from "@/data/mock-data";

const HomePage: React.FC = () => {
  const categories = mockCategories.slice(0, 2);

  return (
    <div className="flex flex-col pb-20 industrial-grain bg-background min-h-screen">
      <MarketplaceSubNav />
      <Hero />

      <HomeSection id="flash-deals" variant="background" className="py-6 lg:py-10">
        <HotDeals />
      </HomeSection>

      <HomeSection id="trending" variant="white" withGrid borderTop borderBottom className="py-8 lg:py-12">
        <TrendingProducts />
      </HomeSection>

      <HomeSection id="best-sellers" variant="background" className="py-8 lg:py-12">
        <BestSellers />
      </HomeSection>

      <HomeSection id="categories" variant="muted" withGrid borderTop borderBottom className="py-10 lg:py-16">
        <CategoryGrid />
      </HomeSection>

      <div className="flex flex-col space-y-px bg-border/40">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <HomeSection
              variant={index % 2 !== 0 ? "background" : "white"}
              withGrid={index % 2 === 0}
              className="py-10 lg:py-14"
            >
              <ProductShowcase
                title={category.name}
                subtitle={
                  category.description ||
                  `Industrial-grade assets and materials within the ${category.name} vertical.`
                }
                categoryId={category.id}
                limit={10}
                className="py-0"
              />
            </HomeSection>

            {index === 1 && (
              <PromoBanner
                title="Verified Supplier Nodes"
                subtitle="Connect directly with verified local and international manufacturers."
                ctaText="Access Node Directory"
                ctaLink="/suppliers"
                variant="primary"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <HomeSection id="new-arrivals" variant="white" borderBottom className="py-10 lg:py-14">
        <NewArrivals />
      </HomeSection>

      <HomeSection variant="background" borderBottom className="py-8 lg:py-10">
        <FeaturedBrands />
      </HomeSection>

      <HomeSection id="services" variant="muted" withGrid borderBottom className="py-10 lg:py-16">
        <FeaturedServices />
      </HomeSection>

      <PromoBanner
        title="Heavy Asset Acquisition"
        subtitle="Full inventory of construction machinery for strategic project deployment."
        ctaText="Explore Machinery"
        ctaLink="/products?category=heavy-equipment"
        variant="dark"
      />

      <HomeSection id="marketplace" variant="background" className="py-10 lg:py-16">
        <FeaturedProducts />
      </HomeSection>

      <CTASection />

      <HomeSection id="suppliers" variant="white" withGrid borderTop className="py-10 lg:py-16">
        <FeaturedSuppliers />
      </HomeSection>
    </div>
  );
};

export default HomePage;
