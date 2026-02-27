import {
	RiApps2Line,
	RiDashboardLine,
	RiUserLine,
	RiTeamLine,
	RiFolderLine,
	RiPriceTag3Line,
	RiServiceLine,
	RiGitMergeLine,
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
import { TeamSwitcher } from "../sidebar/team-switcher";

interface AdminSidebarProps {
	user: any;
}

const teams = [
	{
		name: "AfrikaMarket",
		logo: RiApps2Line,
		plan: "Enterprise",
	},
];

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
		title: "Assignments",
		url: "/admin/assignments",
		icon: RiGitMergeLine,
	},
	{
		title: "Profile Settings",
		url: "/admin/profile",
		icon: RiSettings4Line,
	},
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
	const sidebarUser = {
		name: user?.name || "Admin",
		email: user?.email || "admin@afrikamarket.com",
		avatar: user?.avatar || "/avatars/admin.jpg",
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
