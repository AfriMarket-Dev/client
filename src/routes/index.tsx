import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ProductCatalogPage from '@/pages/ProductCatalogPage';
import SupplierDetailsPage from '@/pages/SupplierDetailsPage';
import WishlistPage from '@/pages/WishlistPage';
import SupplierListingPage from '@/pages/SupplierListingPage';
import CategoriesPage from '@/pages/CategoriesPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import SignUpPage from '@/pages/SignUpPage';
import SignInPage from '@/pages/SignInPage';
import SupplierDashboardPage from '@/pages/SupplierDashboardPage';
import AboutPage from '@/pages/AboutPage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductCatalogPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'suppliers',
        element: <SupplierListingPage />,
      },
      {
        path: 'suppliers/:supplierId',
        element: <SupplierDetailsPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'help',
        element: <HelpCenterPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <SupplierDashboardPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
