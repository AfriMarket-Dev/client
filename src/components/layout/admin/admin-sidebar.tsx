import {
  RiApps2Line,
  RiDashboardLine,
  RiUserLine,
  RiTeamLine,
  RiFolderLine,
  RiPriceTag3Line,
  RiServiceLine,
  RiSettings4Line,
} from "@remixicon/react";
import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "../sidebar/nav-main";
import { NavUser } from "../sidebar/nav-user";
import { NavHeader, type NavHeaderInfo } from "../sidebar/nav-header";
import { useGetMyCompanyQuery } from "@/app/api/companies";

interface AdminSidebarProps {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
  } | null;
}

const defaultCompany: NavHeaderInfo = {
  name: "AfrikaMarket",
  logo: RiApps2Line,
  plan: "Enterprise",
};
const navMain = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: RiDashboardLine,
    isActive: true,
  },
  {
    title: "Suppliers",
    url: "/admin/suppliers",
    icon: RiTeamLine,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: RiUserLine,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: RiFolderLine,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: RiPriceTag3Line,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: RiServiceLine,
  },
  {
    title: "Profile Settings",
    url: "/admin/profile",
    icon: RiSettings4Line,
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const { data: companyData } = useGetMyCompanyQuery();

  const sidebarUser = {
    name: user?.name || "Admin",
    email: user?.email || "admin@afrikamarket.com",
    avatar: user?.avatar || "/avatars/admin.jpg",
    role: user?.role,
  };

  const headerInfo: NavHeaderInfo = companyData
    ? {
        name: companyData.name,
        logoUrl: companyData.logoUrl,
        plan: companyData.type || "Enterprise",
      }
    : defaultCompany;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader>
        <NavHeader info={headerInfo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
