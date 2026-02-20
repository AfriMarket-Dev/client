import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, Plus, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export const DashboardLayout = () => {
  const location = useLocation();

  const nav = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/listings/new", label: "Add Listing", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Link
            to="/dashboard"
            className="font-heading font-bold uppercase tracking-wide text-foreground"
          >
            Provider Dashboard
          </Link>
        </div>
        <nav className="p-2 flex-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Package className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
