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
// import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";
import { LiveDealsTicker } from "@/components/home/LiveDealsTicker";
import CTASection from "@/components/home/CTASection";
import { HomeSection } from "@/components/home/HomeSection";
import { mockCategories } from "@/data/mockData";

const HomePage: React.FC = () => {
  // const { data: categoryData } = useGetListingCategoriesQuery({ limit: 5 });
  // const categories = categoryData?.data ?? [];
  const categories = mockCategories.slice(0, 5);

  return (
    <div className="flex flex-col pb-24 industrial-grain">
      <LiveDealsTicker />
      <Hero />

      {/* Hot Deals - High Urgency */}
      <HomeSection variant="red" borderTop withGrid>
        <HotDeals />
      </HomeSection>

      {/* Trending Products - Market Momentum */}
      <HomeSection variant="white" withGrid borderBottom>
        <TrendingProducts />
      </HomeSection>

      {/* Best Sellers - Social Proof */}
      <HomeSection variant="background" borderBottom>
        <BestSellers />
      </HomeSection>

      {/* Category Navigation - Browsing */}
      <HomeSection variant="muted" withGrid borderBottom>
        <CategoryGrid />
      </HomeSection>

      {/* Dynamic Category Sections - Deep Dive */}
      <div className="flex flex-col">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <HomeSection 
              variant={index % 2 !== 0 ? "background" : "white"} 
              withGrid={index % 2 !== 0}
              borderBottom
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

      {/* New Arrivals - Freshness */}
      <HomeSection variant="white" borderBottom>
        <NewArrivals />
      </HomeSection>

      {/* Featured Brands */}
      <HomeSection variant="background" borderBottom>
        <FeaturedBrands />
      </HomeSection>

      {/* Featured Services */}
      <HomeSection variant="muted" withGrid borderBottom>
        <FeaturedServices />
      </HomeSection>

      <PromoBanner
        title="Heavy Asset Acquisition"
        subtitle="Full inventory of construction machinery for strategic project deployment."
        ctaText="Explore Machinery"
        ctaLink="/products?category=heavy-equipment"
        variant="dark"
      />

      {/* Featured Products (General) */}
      <HomeSection variant="background" borderBottom>
        <FeaturedProducts />
      </HomeSection>

      <CTASection />

      <HomeSection variant="white" withGrid borderBottom>
        <FeaturedSuppliers />
      </HomeSection>
    </div>
  );
};

export default HomePage;
