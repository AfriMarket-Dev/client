import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignUp from '@/components/SignUp';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleSignUpComplete = (type: 'customer' | 'supplier', data: any) => {
    console.log('Sign up completed:', type, data);
    // Here you would typically send the data to your backend
    if (type === 'supplier') {
      setCurrentUser({ type: 'supplier', ...data });
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <SignUp
      onBack={() => navigate('/')}
      onSignUpComplete={handleSignUpComplete}
    />
  );
};

export default SignUpPage;
