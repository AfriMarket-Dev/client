import {
	RiDownloadLine,
	RiEyeLine,
	RiMapPinLine,
	RiStarLine,
	RiUserLine,
} from "@remixicon/react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useGetCompaniesQuery } from "@/services/api/companies";
import type { CustomerRow } from "@/types";
import { customerColumns } from "../columns/customers-columns";
import { Card } from "./card";
import { PageHeader } from "./page-header";
import { StatCard } from "./stat-card";

function formatDate(value?: string) {
	if (!value) return "-";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "-";
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function AdminCustomersPage() {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data: companiesResult, isLoading } = useGetCompaniesQuery({
		page: pagination.pageIndex + 1,
		limit: pagination.pageSize,
	});

	const customers: CustomerRow[] = useMemo(() => {
		return (companiesResult?.data ?? []).map((company) => ({
			id: company.id,
			name: company.name,
			location: [company.district, company.province].filter(Boolean).join(", "),
			joinDate: formatDate(company.createdAt),
			status: company.isActive ? "active" : "inactive",
			visits: Number(company.visits) || 0,
			rating: Number(company.averageRating) || 0,
		}));
	}, [companiesResult]);

	const averageRating =
		customers.length > 0
			? customers.reduce((sum, customer) => sum + customer.rating, 0) /
				customers.length
			: 0;

	return (
		<div className="space-y-5 pb-10">
			<PageHeader
				title="Customers"
				subtitle="Customer accounts from live platform data"
				actions={
					<Button
						variant="outline"
						className="h-11 rounded-sm border border-border px-6 text-xs font-heading font-bold uppercase tracking-wider"
					>
						<RiDownloadLine size={16} className="mr-2" /> Export
					</Button>
				}
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Total Customers"
					value={customers.length}
					icon={RiUserLine}
					bgColor="bg-blue-50"
					color="text-blue-600"
				/>
				<StatCard
					label="Active"
					value={customers.filter((c) => c.status === "active").length}
					icon={RiEyeLine}
					bgColor="bg-green-50"
					color="text-green-600"
				/>
				<StatCard
					label="Total Visits"
					value={customers.reduce((sum, c) => sum + c.visits, 0)}
					icon={RiMapPinLine}
				/>
				<StatCard
					label="Avg. Rating"
					value={averageRating.toFixed(1)}
					icon={RiStarLine}
					bgColor="bg-yellow-50"
					color="text-yellow-600"
				/>
			</div>

			<Card noPadding className="p-4">
				{isLoading ? (
					<div className="p-8 text-sm text-muted-foreground">
						Loading customers...
					</div>
				) : (
					<DataTable
						columns={customerColumns}
						data={customers}
						filterColumn="name"
						filterPlaceholder="Search by name..."
						manualPagination
						pageCount={companiesResult?.meta?.totalPages || 0}
						onPaginationChange={setPagination}
						state={{ pagination }}
					/>
				)}
			</Card>
		</div>
	);
}
