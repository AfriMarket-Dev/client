import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from '@/components/ProductDetails';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  return (
    <ProductDetails
      productId={productId || ''}
      onBack={() => navigate('/products')}
      onSupplierClick={(supplierId: string) => navigate(`/suppliers/${supplierId}`)}
    />
  );
};

export default ProductDetailsPage;
