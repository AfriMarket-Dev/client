import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import Services from "@/components/Services";
import FeaturedSuppliers from "@/components/FeaturedSuppliers";
import HowItWorks from "@/components/HowItWorks";
import Newsletter from "@/components/Newsletter";
import TrendingProducts from "@/components/TrendingProducts";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryGrid />
      <TrendingProducts />
      <FeaturedSuppliers />
      <Services />
      <HowItWorks />
      <Newsletter />
    </div>
  );
};

export default LandingPage;
