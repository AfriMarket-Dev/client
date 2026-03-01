import { Outlet } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export function AuthLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
