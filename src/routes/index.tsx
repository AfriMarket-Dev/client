import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductCatalogPage from "@/pages/ProductCatalogPage";
import SupplierDetailsPage from "@/pages/SupplierDetailsPage";
import SupplierListingPage from "@/pages/SupplierListingPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import AboutPage from "@/pages/AboutPage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminSuppliersPage from "@/pages/AdminSuppliersPage";
import AdminAddSupplierPage from "@/pages/AdminAddSupplierPage";
import AdminEditSupplierPage from "@/pages/AdminEditSupplierPage";
import AdminSupplierDetailsPage from "@/pages/AdminSupplierDetailsPage";
import AdminProductDetailsPage from "@/pages/AdminProductDetailsPage";
import AdminEditProductPage from "@/pages/AdminEditProductPage";
import AdminCategoriesPage from "@/pages/AdminCategoriesPage";
import AdminProductsPage from "@/pages/AdminProductsPage";
import {
  MainLayout,
  AuthLayout,
  AdminLayout,
  AdminRoute,
  ProtectedRoute,
  ProviderRoute,
} from "@/components/layout";
import WishlistPage from "@/pages/WishlistPage";
import MessagesPage from "@/pages/MessagesPage";
import ProfilePage from "@/pages/ProfilePage";
import ProviderDashboardPage from "@/pages/ProviderDashboardPage";
import ProviderListingFormPage from "@/pages/ProviderListingFormPage";
import ProviderListingEditPage from "@/pages/ProviderListingEditPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

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
        path: "products",
        element: <ProductCatalogPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />,
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
          { path: "listings/:listingId/edit", element: <ProviderListingEditPage /> },
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
