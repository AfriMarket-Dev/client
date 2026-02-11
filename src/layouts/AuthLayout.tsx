import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const AuthLayout = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  if (isAuthenticated) {
    const isAdmin = user?.role === "admin" || user?.role === "agent";
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
