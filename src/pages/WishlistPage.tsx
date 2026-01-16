import { useNavigate } from 'react-router-dom';
import Wishlist from '@/components/Wishlist';
import { Product } from '@/types';

const WishlistPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Wishlist
      onBack={() => navigate('/')}
      onProductClick={handleProductClick}
      onSupplierClick={(supplierId: string) => navigate(`/suppliers/${supplierId}`)}
    />
  );
};

export default WishlistPage;
