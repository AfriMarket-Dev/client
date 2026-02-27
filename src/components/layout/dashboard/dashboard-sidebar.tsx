import {
	RiDashboardLine,
	RiApps2Line,
	RiSettings4Line,
	RiArrowLeftLine,
	RiFileList3Line,
	RiAddCircleLine,
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
import { TeamSwitcher } from "../sidebar/team-switcher";

interface DashboardSidebarProps {
	user: any;
}

const teams = [
	{
		name: "AfrikaMarket",
		logo: RiApps2Line,
		plan: "Supplier",
	},
];

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
	{
		title: "Exit",
		url: "/",
		icon: RiArrowLeftLine,
	},
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
	const sidebarUser = {
		name: user?.name || "Supplier",
		email: user?.email || "supplier@afrikamarket.com",
		avatar: user?.avatar || "/avatars/supplier.jpg",
		role: user?.role,
	};

	return (
		<Sidebar collapsible="icon" className="border-r border-border">
			<SidebarHeader>
				<TeamSwitcher teams={teams} />
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
