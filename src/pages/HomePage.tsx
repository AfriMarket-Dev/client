import React from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import TrendingProducts from "@/components/marketplace/TrendingProducts";
import FeaturedSuppliers from "@/components/supplier/FeaturedSuppliers";
import HotDeals from "@/components/home/HotDeals";
import CTASection from "@/components/home/CTASection";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />

      <section className="container mx-auto px-4">
        <CategoryGrid />
      </section>

      <div className="bg-muted/30 py-24 border-y-2 border-border">
        <section className="container mx-auto px-4">
          <TrendingProducts />
        </section>
      </div>

      <section className="container mx-auto px-4">
        <HotDeals />
      </section>

      <section className="container mx-auto px-4">
        <FeaturedSuppliers />
      </section>

      <CTASection />
    </div>
  );
};

export default HomePage;
