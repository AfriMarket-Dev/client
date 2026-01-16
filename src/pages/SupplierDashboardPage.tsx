import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SupplierDashboard from '@/components/SupplierDashboard';

const SupplierDashboardPage = () => {
  const navigate = useNavigate();
  // In a real app, this would come from a global state management solution or context
  const [currentUser] = useState<any>({
    type: 'supplier',
    email: 'supplier@example.com',
    name: 'AfroTech Imports',
    representativeName: 'John Doe'
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <SupplierDashboard
      onLogout={handleLogout}
      supplierData={currentUser}
    />
  );
};

export default SupplierDashboardPage;
