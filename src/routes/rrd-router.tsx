import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/home-page";
import MarketplacePage from "@/pages/marketplace/marketplace-page";
import ProductPage from "@/pages/marketplace/product-page";
import ServicePage from "@/pages/marketplace/service-page";
import SupplierDetailsPage from "@/pages/supplier-details-page";
import SupplierListingPage from "@/pages/supplier-listing-page";
import CategoriesPage from "@/pages/categories-page";
import SignUpPage from "@/pages/sign-up-page";
import SignInPage from "@/pages/sign-in-page";
import AboutPage from "@/pages/about-page";
import HelpCenterPage from "@/pages/help-center-page";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminSuppliersPage from "@/pages/admin-suppliers-page";
import AdminAddSupplierPage from "@/pages/admin-add-supplier-page";
import AdminEditSupplierPage from "@/pages/admin-edit-supplier-page";
import AdminSupplierDetailsPage from "@/pages/admin-supplier-details-page";
import AdminProductDetailsPage from "@/pages/admin-product-details-page";
import AdminEditProductPage from "@/pages/admin-edit-product-page";
import AdminCategoriesPage from "@/pages/admin-categories-page";
import AdminProductsPage from "@/pages/admin-products-page";
import {
  MainLayout,
  AuthLayout,
  AdminLayout,
  AdminRoute,
  ProtectedRoute,
  ProviderRoute,
} from "@/components/layout";
import WishlistPage from "@/pages/wishlist-page";
import MessagesPage from "@/pages/messages-page";
import ProfilePage from "@/pages/profile-page";
import ProviderDashboardPage from "@/pages/provider-dashboard-page";
import ProviderListingFormPage from "@/pages/provider-listing-form-page";
import ProviderListingEditPage from "@/pages/provider-listing-edit-page";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "marketplace",
        element: <MarketplacePage />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
      },
      {
        path: "services/:serviceId",
        element: <ServicePage />,
      },
      {
        path: "suppliers",
        element: <SupplierListingPage />,
      },
      {
        path: "suppliers/:supplierId",
        element: <SupplierDetailsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "help",
        element: <HelpCenterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "wishlist", element: <WishlistPage /> },
          { path: "messages", element: <MessagesPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <ProviderRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <ProviderDashboardPage /> },
          { path: "listings/new", element: <ProviderListingFormPage /> },
          {
            path: "listings/:listingId/edit",
            element: <ProviderListingEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "suppliers",
            element: <AdminSuppliersPage />,
          },
          {
            path: "suppliers/new",
            element: <AdminAddSupplierPage />,
          },
          {
            path: "suppliers/:supplierId/edit",
            element: <AdminEditSupplierPage />,
          },
          {
            path: "suppliers/:supplierId/product/:productId/edit",
            element: <AdminEditProductPage />,
          },
          {
            path: "suppliers/:supplierId/product/:productId",
            element: <AdminProductDetailsPage />,
          },
          {
            path: "suppliers/:supplierId",
            element: <AdminSupplierDetailsPage />,
          },
          {
            path: "categories",
            element: <AdminCategoriesPage />,
          },
          {
            path: "products",
            element: <AdminProductsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
