import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignIn from '@/components/SignIn';

const SignInPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleSignInComplete = (type: 'customer' | 'supplier', email: string) => {
    console.log('Sign in completed:', type, email);
    // Here you would typically authenticate the user
    if (type === 'supplier') {
      // Mock supplier data - in real app, this would come from your backend
      setCurrentUser({ 
        type: 'supplier', 
        email,
        name: 'AfroTech Imports',
        representativeName: 'John Doe'
      });
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <SignIn
      onBack={() => navigate('/')}
      onSignInComplete={handleSignInComplete}
      onSwitchToSignUp={() => navigate('/auth/signup')}
    />
  );
};

export default SignInPage;
