import {
	RiAlertLine,
	RiApps2Line,
	RiFolder2Line,
	RiShieldCheckLine,
	RiUserLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGetCompaniesQuery } from "@/services/api/companies";
import { useGetProductsQuery } from "@/services/api/products";
import { useGetServicesQuery } from "@/services/api/services";
import { useGetMarketplaceStatsQuery } from "@/services/api/stats";
import { PageContainer, StatsGrid } from "@/shared/components";
import { ROUTES } from "@/shared/constants/routes";
import { formatDate } from "@/shared/utils/format";
import { Card } from "./card";
import { PageHeader } from "./page-header";
import { StatCard } from "./stat-card";

function compact(value: number) {
	if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
	return `${value}`;
}

export function AdminDashboard() {
	const navigate = useNavigate();
	const { data: stats } = useGetMarketplaceStatsQuery();
	const { data: companiesResult } = useGetCompaniesQuery({
		limit: 100,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});
	const { data: productsResult } = useGetProductsQuery({
		limit: 100,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});
	const { data: servicesResult } = useGetServicesQuery({
		limit: 100,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});

	const companies = companiesResult?.data ?? [];
	const products = productsResult?.data ?? [];
	const services = servicesResult?.data ?? [];

	const verifiedSuppliers =
		Number(stats?.verifiedSuppliers) ||
		companies.filter((company) => company.isVerified).length;
	const activeProducts = products.filter((p) => p.isActive).length;
	const activeServices = services.filter((s) => s.isActive).length;
	const activeListings = activeProducts + activeServices;
	const catalogItems = products.length + services.length;
	const pendingReviewCount =
		companies.filter((company) => !company.isVerified).length +
		products.filter((p) => !p.isActive).length +
		services.filter((s) => !s.isActive).length;

	const recentActivity = useMemo(() => {
		const recentCompanies = companies.slice(0, 3).map((company) => ({
			id: company.id,
			type: "Supplier",
			name: company.name,
			status: company.isVerified ? "Verified" : "Pending verification",
			date: company.createdAt,
		}));

		const recentProducts = products.slice(0, 3).map((p) => ({
			id: p.id,
			type: "Product",
			name: p.name,
			status: p.isActive ? "Active" : "Inactive",
			date: p.createdAt,
		}));

		const recentServices = services.slice(0, 3).map((s) => ({
			id: s.id,
			type: "Service",
			name: s.name,
			status: s.isActive ? "Active" : "Inactive",
			date: s.createdAt,
		}));

		return [...recentCompanies, ...recentProducts, ...recentServices]
			.sort(
				(a, b) =>
					new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
			)
			.slice(0, 6);
	}, [companies, products, services]);

	return (
		<PageContainer>
			<PageHeader
				title="Admin Dashboard"
				subtitle="Live operational metrics and quick admin actions"
				badge="Administrator"
			/>

			<StatsGrid>
				<StatCard
					label="Verified Suppliers"
					value={compact(verifiedSuppliers)}
					icon={RiShieldCheckLine}
					bgColor="bg-emerald-50"
					color="text-emerald-600"
				/>
				<StatCard
					label="Active Listings"
					value={compact(activeListings)}
					icon={RiApps2Line}
					bgColor="bg-blue-50"
					color="text-blue-600"
				/>
				<StatCard
					label="Catalog Items"
					value={compact(catalogItems)}
					icon={RiFolder2Line}
					bgColor="bg-violet-50"
					color="text-violet-600"
				/>
				<StatCard
					label="Needs Review"
					value={compact(pendingReviewCount)}
					icon={RiAlertLine}
					bgColor="bg-amber-50"
					color="text-amber-600"
				/>
			</StatsGrid>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				<Card
					title="Quick Actions"
					subtitle="Go directly to key admin sections"
					className="xl:col-span-1"
				>
					<div className="space-y-3">
						<Button
							variant="outline"
							className="w-full justify-start rounded-none uppercase text-[10px] font-black tracking-widest h-11"
							onClick={() => navigate({ to: ROUTES.ADMIN.SUPPLIERS.INDEX })}
						>
							<RiUserLine className="mr-2 h-4 w-4" /> Manage Suppliers
						</Button>
						<Button
							variant="outline"
							className="w-full justify-start rounded-none uppercase text-[10px] font-black tracking-widest h-11"
							onClick={() => navigate({ to: ROUTES.ADMIN.PRODUCTS })}
						>
							<RiFolder2Line className="mr-2 h-4 w-4" /> Manage Products
						</Button>
						<Button
							variant="outline"
							className="w-full justify-start rounded-none uppercase text-[10px] font-black tracking-widest h-11"
							onClick={() => navigate({ to: ROUTES.ADMIN.SERVICES })}
						>
							<RiApps2Line className="mr-2 h-4 w-4" /> Review Services
						</Button>
						<Button
							variant="outline"
							className="w-full justify-start rounded-none uppercase text-[10px] font-black tracking-widest h-11"
							onClick={() => navigate({ to: ROUTES.ADMIN.CATEGORIES })}
						>
							<RiShieldCheckLine className="mr-2 h-4 w-4" /> Manage Categories
						</Button>
					</div>
				</Card>

				<Card
					title="Recent Activity"
					subtitle="Latest suppliers and listings"
					className="xl:col-span-2"
				>
					{recentActivity.length === 0 ? (
						<div className="py-10 text-sm text-muted-foreground uppercase font-bold tracking-widest text-center border border-dashed border-border/40">
							No recent activity yet.
						</div>
					) : (
						<div className="space-y-3">
							{recentActivity.map((item) => (
								<div
									key={`${item.type}-${item.id}`}
									className="flex items-center justify-between rounded-none border border-border/40 px-4 py-3 hover:bg-muted/5 transition-colors"
								>
									<div>
										<p className="text-[8px] uppercase tracking-[0.3em] font-black text-primary">
											{item.type}
										</p>
										<p className="font-display font-black text-foreground uppercase tracking-tight">
											{item.name}
										</p>
									</div>
									<div className="text-right">
										<p className="text-[10px] font-bold text-foreground uppercase tracking-widest">
											{item.status}
										</p>
										<p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">
											{formatDate(item.date)}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</Card>
			</div>
		</PageContainer>
	);
}
