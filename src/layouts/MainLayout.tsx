import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigate={() => navigate('/')} 
        onWishlistClick={() => navigate('/wishlist')}
        onSearch={(query: string) => {
          // Navigate to suppliers page with search query
          navigate('/suppliers', { state: { searchQuery: query } });
        }}
        onSignUpClick={() => navigate('/auth/signup')}
        onSignInClick={() => navigate('/auth/signin')}
        onAboutClick={() => navigate('/about')}
        onHelpClick={() => navigate('/help')}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
