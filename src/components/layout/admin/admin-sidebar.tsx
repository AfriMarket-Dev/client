import {
	RiApps2Line,
	RiDashboardLine,
	RiFolderLine,
	RiPriceTag3Line,
	RiServiceLine,
	RiSettings4Line,
	RiTeamLine,
	RiUserLine,
} from "@remixicon/react";
import type React from "react";
import { useGetMyCompanyQuery } from "@/services/api/companies";
import { BaseSidebar } from "@/shared/components";
import type { NavHeaderInfo } from "@/types";

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
		<BaseSidebar
			headerInfo={headerInfo}
			navItems={navMain}
			user={sidebarUser}
		/>
	);
};
