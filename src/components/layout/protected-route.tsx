"use no memo"

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
