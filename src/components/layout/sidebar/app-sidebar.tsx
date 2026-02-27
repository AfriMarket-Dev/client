"use client";

import {
	RiBookOpenLine,
	RiRobotLine,
	RiLayoutMasonryLine,
	RiGalleryLine,
	RiPieChartLine,
	RiSettings2Line,
	RiTerminalWindowLine,
} from "@remixicon/react";
import { Headphones as RiAudioLine } from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavProjects } from "@/components/layout/sidebar/nav-projects";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "AfrikaMarket Admin",
		email: "admin@afrikamarket.com",
		avatar: "/avatars/admin.jpg",
	},
	teams: [
		{
			name: "Main Branch",
			logo: RiGalleryLine,
			plan: "Enterprise",
		},
		{
			name: "Kigali Logistics",
			logo: RiAudioLine,
			plan: "Growth",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/admin",
			icon: RiTerminalWindowLine,
			isActive: true,
			items: [
				{
					title: "Overview",
					url: "/admin",
				},
				{
					title: "Analytics",
					url: "/admin/analytics",
				},
			],
		},
		{
			title: "Inventory",
			url: "/admin/products",
			icon: RiRobotLine,
			items: [
				{
					title: "Products",
					url: "/admin/products",
				},
				{
					title: "Categories",
					url: "/admin/categories",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: RiBookOpenLine,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: RiSettings2Line,
			items: [
				{
					title: "General",
					url: "/admin/settings",
				},
				{
					title: "Team",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Expansion Phase I",
			url: "#",
			icon: RiLayoutMasonryLine,
		},
		{
			name: "Logistics Optimization",
			url: "#",
			icon: RiPieChartLine,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
