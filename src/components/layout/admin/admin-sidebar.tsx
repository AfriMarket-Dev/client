import {
	RiDashboardLine,
	RiUserLine,
	RiApps2Line,
	RiSettings4Line,
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
		title: "User Management",
		url: "/admin/suppliers",
		icon: RiUserLine,
		items: [
			{
				title: "Suppliers",
				url: "/admin/suppliers",
			},
			{
				title: "Customers",
				url: "/admin/customers",
			},
		],
	},
	{
		title: "Catalog",
		url: "/admin/products",
		icon: Package,
		items: [
			{
				title: "Products",
				url: "/admin/products",
			},
			{
				title: "Categories",
				url: "/admin/categories",
			},
			{
				title: "Services",
				url: "/admin/services",
			},
		],
	},
	{
		title: "Operations",
		url: "/admin/assignments",
		icon: RiApps2Line,
		items: [
			{
				title: "Assignments",
				url: "/admin/assignments",
			},
		],
	},
	{
		title: "System",
		url: "/admin/profile",
		icon: RiSettings4Line,
		items: [
			{
				title: "Profile Settings",
				url: "/admin/profile",
			},
		],
	},
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
	const sidebarUser = {
		name: user?.name || "Admin",
		email: user?.email || "admin@afrikamarket.com",
		avatar: user?.avatar || "/avatars/admin.jpg",
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
