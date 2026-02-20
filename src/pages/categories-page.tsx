import { useNavigate } from 'react-router-dom';
import CategoriesPage from '@/components/marketplace/categories-page';

const CategoriesPageWrapper = () => {
  const navigate = useNavigate();

  return (
    <CategoriesPage
      onBack={() => navigate('/')}
      onSupplierClick={(supplierId: string) => navigate(`/suppliers/${supplierId}`)}
    />
  );
};

export default CategoriesPageWrapper;
