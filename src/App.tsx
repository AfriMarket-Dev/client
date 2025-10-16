import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import Services from './components/Services';
import FeaturedSuppliers from './components/FeaturedSuppliers';
import ConstructionSuppliers from './components/ConstructionSuppliers';
import SampleProducts from './components/SampleProducts';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductCatalog from './components/ProductCatalog';
import SupplierDetails from './components/SupplierDetails';
import Wishlist from './components/Wishlist';
import SupplierListing from './components/SupplierListing';
import CategoriesPage from './components/CategoriesPage';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SupplierDashboard from './components/SupplierDashboard';
import AboutPage from './components/AboutPage';
import HelpCenter from './components/HelpCenter';
import { Product } from './types';

type PageType = 'home' | 'products' | 'supplier-details' | 'wishlist' | 'suppliers' | 'categories' | 'product-details' | 'signup' | 'signin' | 'supplier-dashboard' | 'about' | 'help';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const navigateToProducts = () => setCurrentPage('products');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToSupplier = (supplierId: string) => {
    setSelectedSupplierId(supplierId);
    setCurrentPage('supplier-details');
  };
  const navigateToWishlist = () => setCurrentPage('wishlist');
  const navigateToSuppliers = () => setCurrentPage('suppliers');
  const navigateToCategories = () => setCurrentPage('categories');
  const navigateToSignUp = () => setCurrentPage('signup');
  const navigateToSignIn = () => setCurrentPage('signin');
  const navigateToAbout = () => setCurrentPage('about');
  const navigateToHelp = () => setCurrentPage('help');
  const navigateToProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-details');
  };

  const handleSearch = (query: string) => {
    // Navigate to suppliers page with search query
    setCurrentPage('suppliers');
    // You can pass the search query to the SupplierListing component
    // For now, we'll navigate and the user can search again
  };

  const handleProductClick = (product: Product) => {
    navigateToProductDetails(product.id);
  };

  const handleSignUpComplete = (type: 'customer' | 'supplier', data: any) => {
    console.log('Sign up completed:', type, data);
    // Here you would typically send the data to your backend
    if (type === 'supplier') {
      setCurrentUser({ type: 'supplier', ...data });
      setCurrentPage('supplier-dashboard');
    } else {
      navigateToHome();
    }
  };

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
      setCurrentPage('supplier-dashboard');
    } else {
      navigateToHome();
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateToHome();
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'signup' && currentPage !== 'signin' && currentPage !== 'supplier-dashboard' && (
        <Header 
          onNavigate={navigateToHome} 
          onWishlistClick={navigateToWishlist}
          onSearch={handleSearch}
          onSignUpClick={navigateToSignUp}
          onSignInClick={navigateToSignIn}
          onAboutClick={navigateToAbout}
          onHelpClick={navigateToHelp}
        />
      )}
      
      {currentPage === 'home' && (
        <>
          <Hero onBrowseProducts={navigateToProducts} onBrowseSuppliers={navigateToSuppliers} onSignUpClick={navigateToSignUp} />
          <CategoryGrid onViewCategory={navigateToProducts} onViewAllCategories={navigateToCategories} />
          <Services />
          <ConstructionSuppliers onViewSupplier={navigateToSupplier} onViewAllSuppliers={navigateToSuppliers} />
          <SampleProducts onViewProducts={navigateToProducts} onProductClick={handleProductClick} />
          <FeaturedSuppliers onViewSupplier={navigateToSupplier} onViewAllSuppliers={navigateToSuppliers} />
          <HowItWorks />
          <Newsletter />
          <Footer onAboutClick={navigateToAbout} onHelpClick={navigateToHelp} />
        </>
      )}
      
      {currentPage === 'products' && (
        <ProductCatalog 
          onBackToHome={navigateToHome}
          onSupplierClick={navigateToSupplier}
          onProductClick={handleProductClick}
        />
      )}
      
      {currentPage === 'suppliers' && (
        <SupplierListing
          onBack={navigateToHome}
          onSupplierClick={navigateToSupplier}
        />
      )}
      
      {currentPage === 'supplier-details' && (
        <SupplierDetails
          supplierId={selectedSupplierId}
          onBack={() => setCurrentPage('products')}
          onProductClick={handleProductClick}
        />
      )}
      
      {currentPage === 'wishlist' && (
        <Wishlist
          onBack={navigateToHome}
          onProductClick={handleProductClick}
          onSupplierClick={navigateToSupplier}
        />
      )}
      
      {currentPage === 'categories' && (
        <CategoriesPage
          onBack={navigateToHome}
          onSupplierClick={navigateToSupplier}
        />
      )}
      
      {currentPage === 'product-details' && (
        <ProductDetails
          productId={selectedProductId}
          onBack={() => setCurrentPage('products')}
          onSupplierClick={navigateToSupplier}
        />
      )}
      
      {currentPage === 'signup' && (
        <SignUp
          onBack={navigateToHome}
          onSignUpComplete={handleSignUpComplete}
        />
      )}
      
      {currentPage === 'signin' && (
        <SignIn
          onBack={navigateToHome}
          onSignInComplete={handleSignInComplete}
          onSwitchToSignUp={navigateToSignUp}
          onSwitchToSignUp={navigateToSignUp}
        />
      )}
      
      {currentPage === 'supplier-dashboard' && (
        <SupplierDashboard
          onLogout={handleLogout}
          supplierData={currentUser}
        />
      )}
      
      {currentPage === 'about' && (
        <AboutPage onBack={navigateToHome} />
      )}
      
      {currentPage === 'help' && (
        <HelpCenter onBack={navigateToHome} />
      )}
    </div>
  );
}

export default App;