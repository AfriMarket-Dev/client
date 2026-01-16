import { useNavigate } from 'react-router-dom';
import CategoriesPage from '@/components/CategoriesPage';

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
