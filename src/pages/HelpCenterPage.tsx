import { useNavigate } from 'react-router-dom';
import HelpCenter from '@/components/HelpCenter';

const HelpCenterPage = () => {
  const navigate = useNavigate();

  return (
    <HelpCenter onBack={() => navigate('/')} />
  );
};

export default HelpCenterPage;
