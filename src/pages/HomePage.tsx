import React from "react";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedServices from "@/components/home/FeaturedServices";
import FeaturedSuppliers from "@/components/supplier/FeaturedSuppliers";
import HotDeals from "@/components/home/HotDeals";
import CTASection from "@/components/home/CTASection";
import NewArrivals from "@/components/home/NewArrivals";
import PromoBanner from "@/components/home/PromoBanner";
import ProductShowcase from "@/components/home/ProductShowcase";
import BestSellers from "@/components/home/BestSellers";
import { useGetListingCategoriesQuery } from "@/app/api/listing-categories";

const HomePage: React.FC = () => {
  const { data: categoryData } = useGetListingCategoriesQuery({ limit: 5 });
  const categories = categoryData?.data ?? [];

  return (
    <div className="flex flex-col pb-12">
      <Hero />

      {/* Hot Deals - Urgency & Discounts */}
      <HotDeals />

      {/* Best Sellers - Social Proof */}
      <BestSellers />

      {/* Category Navigation - Browsing */}
      <section className="py-12 bg-muted/30 border-y border-border">
         <CategoryGrid />
      </section>

      {/* Dynamic Category Sections - Deep Dive */}
      <div className="flex flex-col">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
             {/* Alternate backgrounds for cleanliness */}
             <section className={`py-2 ${index % 2 === 0 ? "bg-background" : "bg-muted/10"} border-b border-border`}>
              <ProductShowcase
                title={category.name}
                subtitle={category.description || `Browse our best ${category.name} collection`}
                categoryId={category.id}
                limit={10}
              />
            </section>
            
            {/* Promo Banner Break */}
            {index === 1 && (
               <div className="py-8 bg-white">
                  <PromoBanner
                    title="Verified Suppliers"
                    subtitle="Source from the most trusted suppliers in the region."
                    ctaText="Find Suppliers"
                    variant="primary"
                  />
               </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* New Arrivals - Freshness */}
      <div className="py-12 bg-background border-b border-border">
          <section className="container mx-auto px-4">
            <NewArrivals />
          </section>
      </div>
      
      {/* Featured Services */}
      <div className="py-12 bg-muted/20 border-b border-border">
        <section className="container mx-auto px-4">
           <FeaturedServices />
        </section>
      </div>

      {/* Promo Break */}
      <PromoBanner
        title="Need Heavy Equipment?"
        subtitle="We have the largest inventory of construction machinery for rent or purchase."
        ctaText="View Equipment"
        variant="dark"
      />

       {/* Featured Products (General) */}
      <div className="py-12 bg-background border-t border-border">
        <section className="container mx-auto px-4">
          <FeaturedProducts />
        </section>
      </div>

      <section className="py-12 container mx-auto px-4">
        <FeaturedSuppliers />
      </section>

      <CTASection />
    </div>
  );
};

export default HomePage;
