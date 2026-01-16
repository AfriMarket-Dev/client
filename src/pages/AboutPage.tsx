import { useNavigate } from 'react-router-dom';
import AboutPage from '@/components/AboutPage';

const AboutPageWrapper = () => {
  const navigate = useNavigate();

  return (
    <AboutPage onBack={() => navigate('/')} />
  );
};

export default AboutPageWrapper;
