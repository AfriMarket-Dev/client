import React from "react";
import {
  Package,
  X,
  LogOut,
  BadgeCheck,
  LayoutDashboard,
  Bell,
  MessageSquare,
  TrendingUp,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DashboardTab =
  | "overview"
  | "products"
  | "messages"
  | "inquiries"
  | "analytics"
  | "settings";

interface NavigationItem {
  id: DashboardTab;
  label: string;
  icon: any;
}

const navigationItems: NavigationItem[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "inquiries", label: "Inquiries Queue", icon: Bell },
  { id: "messages", label: "Messages & Quotes", icon: MessageSquare },
  { id: "products", label: "My Listings", icon: Package },
  { id: "analytics", label: "Performance", icon: TrendingUp },
  { id: "settings", label: "Profile & Verification", icon: Settings },
];

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onClose: () => void;
  onLogout: () => void;
  supplierData: any;
  isOpen: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onTabChange,
  onClose,
  onLogout,
  supplierData,
  isOpen,
}) => (
  <div
    className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-foreground text-background transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 border-r border-border",
      isOpen ? "translate-x-0" : "-translate-x-full",
    )}
  >
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold uppercase tracking-widest leading-none">
              AfrikaMarket
            </h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 leading-none">
              Provider
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-sm text-muted-foreground hover:text-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              onClose();
            }}
            className={cn(
              "w-full flex items-center px-4 py-3.5 text-xs font-heading font-bold uppercase tracking-widest rounded-sm transition-all border-2",
              activeTab === item.id
                ? "bg-background text-foreground border-background shadow-md"
                : "text-muted-foreground border-transparent hover:bg-background/10 hover:text-background",
            )}
          >
            <item.icon
              className={cn(
                "w-4 h-4 mr-3",
                activeTab === item.id ? "text-primary" : "opacity-70",
              )}
            />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-background/10">
        <div className="flex items-center gap-3 px-4 py-3 bg-background/5 rounded-sm border border-background/10 mb-4 overflow-hidden">
          <div className="relative shrink-0">
            <img
              src={
                supplierData?.avatar ||
                "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              }
              className="w-10 h-10 rounded-sm object-cover border border-background/20"
              alt=""
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-foreground"></div>
          </div>
          <div className="flex-1 overflow-hidden min-w-0">
            <p className="text-sm font-bold truncate text-background">
              {supplierData?.name || "Supplier"}
            </p>
            <div className="flex items-center gap-1 text-success text-[10px] font-black uppercase tracking-widest">
              <BadgeCheck className="w-3 h-3" /> Verified
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center px-4 py-3 text-xs font-heading font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-sm transition-colors border-2 border-transparent hover:border-destructive/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  </div>
);
