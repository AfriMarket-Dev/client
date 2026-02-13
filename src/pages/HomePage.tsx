import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import LandingPage from "./LandingPage";
import UserDashboard from "./UserDashboard";
import SupplierDashboardPage from "./SupplierDashboardPage";
import Header from "@/components/Header";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    if (user?.role === "supplier") {
      return <SupplierDashboardPage />;
    }
    
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <UserDashboard />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <LandingPage />
    </div>
  );
};

export default HomePage;
