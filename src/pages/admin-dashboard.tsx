import {
	RiAlertLine,
	RiPagesLine,
	RiShieldCheckLine,
	RiUserLine,
} from "@remixicon/react";
import { useMemo } from "react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetListingsQuery } from "@/app/api/listings";
import { useGetProductsQuery } from "@/app/api/products";
import { useGetServicesQuery } from "@/app/api/services";
import { useGetMarketplaceStatsQuery } from "@/app/api/stats";
import { AdminPageHeader, AdminStatCard } from "@/components/admin";
import { ModerationQueue } from "@/components/admin/dashboard/moderation-queue";
import { SystemActions } from "@/components/admin/dashboard/system-actions";

function compact(value: number) {
	if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
	return `${value}`;
}

function ago(dateLike?: string) {
	if (!dateLike) return "recently";
	const date = new Date(dateLike);
	if (Number.isNaN(date.getTime())) return "recently";
	const hours = Math.max(1, Math.round((Date.now() - date.getTime()) / 3600000));
	if (hours >= 24) return `${Math.round(hours / 24)}d ago`;
	return `${hours}h ago`;
}

export default function AdminDashboard() {
	const { data: stats } = useGetMarketplaceStatsQuery();
	const { data: companiesResult } = useGetCompaniesQuery({ limit: 200 });
	const { data: listingsResult } = useGetListingsQuery({ limit: 200 });
	const { data: productsResult } = useGetProductsQuery({ limit: 200 });
	const { data: servicesResult } = useGetServicesQuery({ limit: 200 });

	const companies = companiesResult?.data ?? [];
	const listings = listingsResult?.data ?? [];
	const products = productsResult?.data ?? [];
	const services = servicesResult?.data ?? [];

	const verifiedSuppliers =
		stats?.verifiedSuppliers ?? companies.filter((c) => c.isVerified).length;
	const activeListings = listings.filter((l) => l.isActive).length;
	const platformUsers = companies.length;
	const pendingReports =
		companies.filter((c) => !c.isVerified).length +
		products.filter((p) => !p.isActive).length +
		services.filter((s) => !s.isActive).length;

	const reports = useMemo(() => {
		const supplierAlerts = companies
			.filter((company) => !company.isVerified)
			.slice(0, 3)
			.map((company) => ({
				id: company.id.slice(0, 8),
				target: company.name,
				type: "Supplier",
				reason: "Verification pending",
				evidence: "Profile review required",
				status: "pending",
				count: 1,
				time: ago(company.updatedAt ?? company.createdAt),
			}));

		const productAlerts = products
			.filter((product) => !product.isActive)
			.slice(0, 2)
			.map((product) => ({
				id: product.id.slice(0, 8),
				target: product.name,
				type: "Listing",
				reason: "Inactive product listing",
				evidence: "Needs admin review",
				status: "reviewing",
				count: 1,
				time: ago(product.updatedAt ?? product.createdAt),
			}));

		return [...supplierAlerts, ...productAlerts].slice(0, 5);
	}, [companies, products]);

	return (
		<div className="space-y-6 pb-12">
			<AdminPageHeader
				title="Platform Control"
				subtitle="Live marketplace health and moderation"
				badge="Administrator"
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				<AdminStatCard
					label="Verified Suppliers"
					value={compact(verifiedSuppliers)}
					icon={RiShieldCheckLine}
					bgColor="bg-emerald-50"
					color="text-emerald-600"
				/>
				<AdminStatCard
					label="Active Listings"
					value={compact(activeListings)}
					icon={RiPagesLine}
					bgColor="bg-blue-50"
					color="text-blue-600"
				/>
				<AdminStatCard
					label="Supplier Accounts"
					value={compact(platformUsers)}
					icon={RiUserLine}
					bgColor="bg-violet-50"
					color="text-violet-600"
				/>
				<AdminStatCard
					label="Pending Alerts"
					value={compact(pendingReports)}
					icon={RiAlertLine}
					bgColor="bg-amber-50"
					color="text-amber-600"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				<ModerationQueue reports={reports} />
				<SystemActions />
			</div>
		</div>
	);
}
