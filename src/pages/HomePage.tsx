import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import Services from '@/components/Services';
import FeaturedSuppliers from '@/components/FeaturedSuppliers';
import ConstructionSuppliers from '@/components/ConstructionSuppliers';
import SampleProducts from '@/components/SampleProducts';
import HowItWorks from '@/components/HowItWorks';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { type Product } from '@/types';

const HomePage = () => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <Hero 
        onBrowseProducts={() => navigate('/products')} 
        onBrowseSuppliers={() => navigate('/suppliers')} 
        onSignUpClick={() => navigate('/auth/signup')} 
      />
      <CategoryGrid 
        onViewCategory={() => navigate('/products')} 
        onViewAllCategories={() => navigate('/categories')} 
      />
      <Services />
      <ConstructionSuppliers 
        onViewSupplier={(supplierId: string) => navigate(`/suppliers/${supplierId}`)} 
        onViewAllSuppliers={() => navigate('/suppliers')} 
      />
      <SampleProducts 
        onViewProducts={() => navigate('/products')} 
        onProductClick={handleProductClick} 
      />
      <FeaturedSuppliers 
        onViewSupplier={(supplierId: string) => navigate(`/suppliers/${supplierId}`)} 
        onViewAllSuppliers={() => navigate('/suppliers')} 
      />
      <HowItWorks />
      <Newsletter />
      <Footer 
        onAboutClick={() => navigate('/about')} 
        onHelpClick={() => navigate('/help')} 
      />
    </>
  );
};

export default HomePage;
