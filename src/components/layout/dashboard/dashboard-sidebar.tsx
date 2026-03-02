import {
	RiAddCircleLine,
	RiApps2Line,
	RiDashboardLine,
	RiFileList3Line,
	RiSettings4Line,
} from "@remixicon/react";
import type React from "react";
import { useGetMyCompanyQuery } from "@/services/api/companies";
import { BaseSidebar } from "@/shared/components";
import type { NavHeaderInfo } from "@/types";

interface DashboardSidebarProps {
	user: any;
}

const defaultInfo: NavHeaderInfo = {
	name: "AfrikaMarket",
	logo: RiApps2Line,
	plan: "Supplier",
};

const navMain = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: RiDashboardLine,
		isActive: true,
	},
	{
		title: "My Listings",
		url: "/dashboard/listings",
		icon: RiFileList3Line,
	},
	{
		title: "Add New Listing",
		url: "/dashboard/listings/new",
		icon: RiAddCircleLine,
	},
	{
		title: "Settings",
		url: "/profile",
		icon: RiSettings4Line,
	},
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
	const { data: companyData } = useGetMyCompanyQuery();

	const sidebarUser = {
		name: user?.name || "Supplier",
		email: user?.email || "supplier@afrikamarket.com",
		avatar: user?.avatar || "/avatars/supplier.jpg",
		role: user?.role,
	};

	const headerInfo: NavHeaderInfo = companyData
		? {
				name: companyData.name,
				logoUrl: companyData.logoUrl,
				plan: companyData.type || "Supplier",
			}
		: defaultInfo;

	return (
		<BaseSidebar
			headerInfo={headerInfo}
			navItems={navMain}
			user={sidebarUser}
		/>
	);
};
