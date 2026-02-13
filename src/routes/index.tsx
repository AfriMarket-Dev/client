import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductCatalogPage from "@/pages/ProductCatalogPage";
import SupplierDetailsPage from "@/pages/SupplierDetailsPage";
import WishlistPage from "@/pages/WishlistPage";
import SupplierListingPage from "@/pages/SupplierListingPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import SupplierDashboardPage from "@/pages/SupplierDashboardPage";
import AboutPage from "@/pages/AboutPage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import BuyerMessagesPage from "@/pages/BuyerMessagesPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminSuppliersPage from "@/pages/AdminSuppliersPage";
import AdminAddSupplierPage from "@/pages/AdminAddSupplierPage";
import AdminEditSupplierPage from "@/pages/AdminEditSupplierPage";
import AdminSupplierDetailsPage from "@/pages/AdminSupplierDetailsPage";
import AdminProductDetailsPage from "@/pages/AdminProductDetailsPage";
import AdminEditProductPage from "@/pages/AdminEditProductPage";
import AdminCategoriesPage from "@/pages/AdminCategoriesPage";
import AdminServicesPage from "@/pages/AdminServicesPage";
import ServiceDetailsPage from "@/pages/ServiceDetailsPage";
import AdminProductsPage from "@/pages/AdminProductsPage";
import AdminAssignmentsPage from "@/pages/AdminAssignmentsPage";
import AdminCustomersPage from "@/pages/AdminCustomersPage";
import AdminProfileSettingsPage from "@/pages/AdminProfileSettingsPage";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

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
        path: "messages",
        element: <BuyerMessagesPage />,
      },
      // protected public routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "wishlist",
            element: <WishlistPage />,
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
  // protected supplier dashboard
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <SupplierDashboardPage />,
      },
    ],
  },
  // admin routes
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
            path: "services",
            element: <AdminServicesPage />,
          },
          {
            path: "services/:serviceId",
            element: <ServiceDetailsPage />,
          },
          {
            path: "products",
            element: <AdminProductsPage />,
          },
          {
            path: "assignments",
            element: <AdminAssignmentsPage />,
          },
          {
            path: "customers",
            element: <AdminCustomersPage />,
          },
          {
            path: "settings",
            element: <AdminProfileSettingsPage />,
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
