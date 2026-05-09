import {
	RiAddCircleLine,
	RiAuctionLine,
	RiDashboardLine,
	RiFileList3Line,
	RiSettings4Line,
	RiStore2Line,
} from "@remixicon/react";
import type React from "react";
import { useGetMyCompanyQuery } from "@/services/api/companies";
import { BaseSidebar } from "@/shared/components/layouts/base-sidebar";
import { ROUTES } from "@/shared/constants/routes";
import type { AuthUser, NavHeaderInfo } from "@/types";

interface DashboardSidebarProps {
	user: AuthUser | null;
}

const defaultInfo: NavHeaderInfo = {
	name: "Karibu",
	logo: RiStore2Line,
	plan: "Provider",
};

const navMain = [
	{
		title: "Dashboard",
		url: ROUTES.DASHBOARD.INDEX,
		icon: RiDashboardLine,
		isActive: true,
	},
	{
		title: "My Listings",
		url: ROUTES.DASHBOARD.LISTINGS.INDEX,
		icon: RiFileList3Line,
	},
	{
		title: "Add New Listing",
		url: ROUTES.DASHBOARD.LISTINGS.NEW,
		icon: RiAddCircleLine,
	},
	{
		title: "Auctions",
		url: ROUTES.DASHBOARD.AUCTIONS.INDEX,
		icon: RiAuctionLine,
	},
	{
		title: "Store Settings",
		url: ROUTES.PROTECTED.PROFILE,
		icon: RiSettings4Line,
	},
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
	const { data: companyData } = useGetMyCompanyQuery();

	const sidebarUser = {
		name: user?.name || "Provider",
		email: user?.email || "provider@karibu.rw",
		avatar: user?.avatar || "/avatars/provider.jpg",
		role: user?.role,
	};

	const headerInfo: NavHeaderInfo = companyData
		? {
				name: companyData.name,
				logoUrl: companyData.logoUrl,
				plan: companyData.type?.replace(/_/g, " ") || "Provider",
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
