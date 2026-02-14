import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Settings,
  Package,
  Zap,
  Users,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/authSlice";
import { useSignOutMutation } from "@/app/api/auth";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface AdminSidebarProps {
  user: any;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut] = useSignOutMutation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch {}
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Suppliers", path: "/admin/suppliers", icon: Users },
    { label: "Customers", path: "/admin/customers", icon: ShoppingCart },
    { label: "Categories", path: "/admin/categories", icon: Package },
    { label: "Services", path: "/admin/services", icon: Zap },
    { label: "Products", path: "/admin/products", icon: Package },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r-2 border-border">
      <SidebarHeader className="h-20 flex items-center px-6 border-b-2 border-border bg-foreground text-background">
        <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 border border-primary/20 transition-transform hover:scale-105">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden animate-in fade-in duration-300">
            <h1 className="text-lg font-heading font-bold uppercase tracking-widest leading-none">
              AfrikaMarket
            </h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 leading-none">
              Admin System
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-background pt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "h-12 rounded-sm transition-all duration-200 font-heading font-bold uppercase text-[10px] tracking-widest border-2",
                      isActive(item.path)
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-background text-muted-foreground border-transparent hover:border-border hover:bg-muted hover:text-foreground",
                    )}
                    tooltip={item.label}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden ml-2">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t-2 border-border bg-muted/30">
        <div className="space-y-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate("/admin/settings")}
                className="h-10 rounded-sm font-heading font-bold uppercase text-[10px] tracking-widest text-muted-foreground hover:text-foreground"
                tooltip="Settings"
              >
                <Settings className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden ml-2">
                  Settings
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="group-data-[collapsible=icon]:hidden px-2">
            <div className="p-4 bg-foreground rounded-sm border-2 border-border relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 african-pattern opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] font-bold text-background uppercase tracking-widest">
                    Network Live
                  </p>
                </div>
              </div>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      className="h-12 rounded-sm bg-background border-2 border-border hover:border-primary transition-all overflow-hidden"
                      tooltip={user?.name || "Admin"}
                    >
                      <Avatar className="h-6 w-6 rounded-sm border border-border shrink-0">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-primary text-white font-heading font-bold text-[10px]">
                          {user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 text-left group-data-[collapsible=icon]:hidden ml-2">
                        <span className="text-[10px] font-heading font-bold text-foreground truncate uppercase">
                          {user?.name || "Admin"}
                        </span>
                        <span className="text-[8px] font-mono text-muted-foreground truncate">
                          {user?.role?.toUpperCase() || "SUPERUSER"}
                        </span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  }
                />
                <DropdownMenuContent
                  className="w-56 p-2 rounded-sm border-2 border-border"
                  side="right"
                  align="end"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-3 bg-muted/50 rounded-sm mb-2 border border-border">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-heading font-bold text-foreground uppercase tracking-widest">
                          {user?.name}
                        </p>
                        <p className="text-[9px] font-mono text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/settings")}
                      className="rounded-sm h-10 font-heading font-bold text-[10px] uppercase tracking-widest"
                    >
                      Profile Config
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2 bg-border h-[2px]" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-sm h-10 font-heading font-bold text-[10px] uppercase tracking-widest text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Terminate Session
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
