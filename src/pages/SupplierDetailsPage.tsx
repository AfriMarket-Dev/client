import { useNavigate, useParams } from 'react-router-dom';
import SupplierDetails from '@/components/SupplierDetails';
import { Product } from '@/types';

const SupplierDetailsPage = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <SupplierDetails
      supplierId={supplierId || ''}
      onBack={() => navigate('/products')}
      onProductClick={handleProductClick}
    />
  );
};

export default SupplierDetailsPage;
