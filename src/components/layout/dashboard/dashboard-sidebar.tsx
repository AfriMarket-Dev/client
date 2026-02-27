import {
	RiDashboardLine,
	RiApps2Line,
	RiSettings4Line,
	RiArrowLeftLine,
} from "@remixicon/react";
import { Package } from "lucide-react";
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
		title: "Inventory",
		url: "/dashboard/listings",
		icon: Package,
		items: [
			{
				title: "My Listings",
				url: "/dashboard/listings",
			},
			{
				title: "Add New Listing",
				url: "/dashboard/listings/new",
			},
		],
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
