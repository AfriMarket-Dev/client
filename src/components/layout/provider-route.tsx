import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";

const PROVIDER_ROLES = ["provider", "admin", "agent"];

export const ProviderRoute = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!user?.role || !PROVIDER_ROLES.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
