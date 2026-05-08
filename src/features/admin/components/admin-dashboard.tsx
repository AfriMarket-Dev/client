import {
	RiAuctionLine,
	RiBuilding2Line,
	RiFileList3Line,
	RiShoppingBagLine as RiPackageLine,
	RiToolsLine,
	RiUserLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetDashboardStatsQuery as useGetStatsQuery } from "@/services/api/stats";
import { StatCard } from "@/shared/components/admin/stat-card";
import { StatsGrid } from "@/shared/components/stats-grid";

export function AdminDashboard() {
	const navigate = useNavigate();
	const { data: statsData, isLoading } = useGetStatsQuery();

	const stats = useMemo(
		() => [
			{
				label: "Marketplace Providers",
				value: statsData?.companies.total || 0,
				icon: RiBuilding2Line,
				change: "+5 this week",
			},
			{
				label: "Platform Users",
				value: statsData?.users.total || 0,
				icon: RiUserLine,
				change: "+12% total",
			},
			{
				label: "Live Products",
				value: statsData?.products.total || 0,
				icon: RiPackageLine,
				color: "text-blue-600",
				bgColor: "bg-blue-600/10",
			},
			{
				label: "Available Services",
				value: statsData?.services.total || 0,
				icon: RiToolsLine,
				color: "text-purple-600",
				bgColor: "bg-purple-600/10",
			},
			{
				label: "Platform Reviews",
				value: statsData?.reviews.total || 0,
				icon: RiFileList3Line,
				color: "text-orange-600",
				bgColor: "bg-orange-600/10",
			},
			{
				label: "Active Auctions",
				value: "14",
				icon: RiAuctionLine,
				color: "text-red-600",
				bgColor: "bg-red-600/10",
			},
		],
		[statsData],
	);

	const activities = [
		{
			id: "1",
			user: "Jean Doe",
			action: "updated stock for",
			item: "Premium Cement",
			time: "10 mins ago",
			type: "inventory",
			status: "success",
		},
		{
			id: "2",
			user: "Marie Claire",
			action: "registered as",
			item: "New Provider",
			time: "25 mins ago",
			type: "provider",
			status: "pending",
		},
		{
			id: "3",
			user: "System",
			action: "automated backup",
			item: "Database",
			time: "1 hour ago",
			type: "system",
			status: "success",
		},
		{
			id: "4",
			user: "Kevine P.",
			action: "requested verification for",
			item: "Eco Services Ltd",
			time: "2 hours ago",
			type: "provider",
			status: "warning",
		},
	];

	return (
		<div className="space-y-10">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
				<div className="space-y-1">
					<h2 className="text-2xl font-bold text-foreground tracking-tight">
						Administrative Control
					</h2>
					<p className="text-sm font-medium text-muted-foreground">
						Oversee platform operations and resource distribution
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{[
						{ label: "New Provider", to: "/admin/providers/new" },
						{ label: "Create Auction", to: "/admin/auctions/new" },
						{ label: "System Logs", to: "/admin/logs" },
					].map((op) => (
						<Button
							key={op.label}
							variant="outline"
							size="sm"
							onClick={() => navigate({ to: op.to as any })}
							className="h-10 rounded-none border-border font-bold uppercase text-[10px] tracking-widest shadow-none px-4"
						>
							{op.label}
						</Button>
					))}
				</div>
			</div>

			{/* Stats Grid */}
			<StatsGrid columns={3}>
				{isLoading ? (
					Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-32 bg-muted/30 rounded-none animate-pulse border border-border" />
					))
				) : (
					stats.map((stat) => (
						<StatCard key={stat.label} {...stat} />
					))
				)}
			</StatsGrid>

			{/* Recent Activity */}
			<div className="grid lg:grid-cols-1 gap-8">
				<div className="bg-background border border-border rounded-none shadow-none overflow-hidden">
					<div className="p-6 border-b border-border bg-muted/5 flex items-center justify-between">
						<h3 className="text-lg font-bold text-foreground">
							Live Operations Feed
						</h3>
						<Badge variant="outline" className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-none bg-background">
							Real-time
						</Badge>
					</div>
					<div className="divide-y divide-border">
						{activities.map((activity) => (
							<div
								key={activity.id}
								className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
							>
								<div className="flex items-start gap-4">
									<div className="mt-1">
										<Badge
											variant="secondary"
											className="rounded-none px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border"
										>
											{activity.type}
										</Badge>
									</div>
									<div>
										<h4 className="font-bold text-foreground text-base tracking-tight mb-1">
											{activity.user}{" "}
											<span className="text-muted-foreground font-medium">
												{activity.action}
											</span>{" "}
											{activity.item}
										</h4>
										<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
											{activity.time} • Status:{" "}
											<span
												className={cn(
													"font-black tracking-widest",
													activity.status === "success" && "text-success",
													activity.status === "pending" && "text-primary",
													activity.status === "warning" && "text-warning",
												)}
											>
												{activity.status}
											</span>
										</p>
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="h-10 px-4 rounded-none text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground border border-transparent hover:border-border shadow-none"
								>
									Inspect Operation
								</Button>
							</div>
						))}
					</div>
					<div className="p-4 bg-muted/5 border-t border-border text-center">
						<button
							type="button"
							className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
						>
							View Full Audit Log
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
