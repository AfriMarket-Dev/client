import React from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedServices from "@/components/home/FeaturedServices";
import FeaturedSuppliers from "@/components/supplier/FeaturedSuppliers";
import HotDeals from "@/components/home/HotDeals";
import NewArrivals from "@/components/home/NewArrivals";
import PromoBanner from "@/components/home/PromoBanner";
import ProductShowcase from "@/components/home/ProductShowcase";
import BestSellers from "@/components/home/BestSellers";
import TrendingProducts from "@/components/marketplace/TrendingProducts";
import { FeaturedBrands } from "@/components/home/FeaturedBrands";
// import { LiveDealsTicker } from "@/components/home/LiveDealsTicker";
import { MarketplaceSubNav } from "@/components/home/MarketplaceSubNav";
import CTASection from "@/components/home/CTASection";
import { HomeSection } from "@/components/home/HomeSection";
import { mockCategories } from "@/data/mockData";

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
