import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/app/store';
import { logout } from '@/app/features/auth-slice';
import SupplierDashboard from '@/components/supplier/supplier-dashboard';

const SupplierDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <SupplierDashboard
      onLogout={handleLogout}
      supplierData={user}
    />
  );
};

export default SupplierDashboardPage;
