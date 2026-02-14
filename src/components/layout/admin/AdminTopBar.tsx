import React from "react";
import {
  Search,
  Bell,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/Sidebar";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface AdminTopBarProps {
  user: any;
}

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Suppliers", path: "/admin/suppliers", icon: Users },
  { label: "Customers", path: "/admin/customers", icon: ShoppingCart },
  { label: "Categories", path: "/admin/categories", icon: Package },
  { label: "Services", path: "/admin/services", icon: Zap },
  { label: "Products", path: "/admin/products", icon: Package },
];

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const currentLabel =
    menuItems.find((item) => isActive(item.path))?.label || "Console";

  return (
    <header className="h-20 border-b-2 border-border flex items-center px-8 bg-background/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="border-2 border-border rounded-sm hover:border-primary transition-colors h-10 w-10" />
        <Separator orientation="vertical" className="h-8 bg-border w-[2px]" />
        <div className="hidden md:flex items-center gap-2 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <span
            className="hover:text-foreground transition-colors cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            Root
          </span>
          <span>/</span>
          <span className="text-primary">{currentLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Shortcut */}
        <div className="hidden lg:flex items-center gap-3 px-4 h-10 bg-muted/50 border-2 border-border rounded-sm text-muted-foreground transition-all hover:border-primary/50 group w-64">
          <Search
            size={16}
            className="group-hover:text-primary transition-colors"
          />
          <span className="text-[10px] font-heading font-bold uppercase tracking-widest flex-1">
            Global Scan
          </span>
          <Badge
            variant="outline"
            className="h-5 px-1.5 font-mono text-[9px] border-border bg-background"
          >
            CMD+K
          </Badge>
        </div>

        {/* Notifications */}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 border-2 border-border rounded-sm relative hover:border-primary transition-all group shadow-none"
        >
          <Bell
            size={18}
            className="text-muted-foreground group-hover:text-primary transition-colors"
          />
          <span className="absolute top-[-2px] right-[-2px] w-3 h-3 bg-primary border-2 border-background rounded-full"></span>
        </Button>

        <Separator orientation="vertical" className="h-8 bg-border w-[2px]" />

        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] font-heading font-bold text-foreground uppercase tracking-widest">
              {user?.name || "Admin"}
            </span>
            <span className="text-[8px] font-mono text-primary font-black uppercase tracking-tighter italic">
              Authorized
            </span>
          </div>
          <Avatar className="h-10 w-10 rounded-sm border-2 border-border shadow-md">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-foreground text-background font-heading font-bold text-xs uppercase">
              {user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
