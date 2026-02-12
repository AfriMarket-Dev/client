import { useNavigate } from 'react-router-dom';
import ProductCatalog from '@/components/ProductCatalog';
import { type Product } from '@/types';

const ProductCatalogPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <ProductCatalog 
      onBackToHome={() => navigate('/')}
      onSupplierClick={(supplierId: string) => navigate(`/suppliers/${supplierId}`)}
      onProductClick={handleProductClick}
    />
  );
};

export default ProductCatalogPage;
