import type { ColumnDef } from "@tanstack/react-table";
import {
	RiDownloadLine,
	RiEyeLine,
	RiMapPinLine,
	RiMoreLine,
	RiStarLine,
	RiUserLine,
} from "@remixicon/react";
import { useMemo } from "react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerRow {
	id: string;
	name: string;
	location: string;
	joinDate: string;
	status: "active" | "inactive";
	visits: number;
	rating: number;
}

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

export default function AdminCustomersPage() {
	const { data: companiesResult, isLoading } = useGetCompaniesQuery({ limit: 200 });

	const customers: CustomerRow[] = useMemo(() => {
		return (companiesResult?.data ?? []).map((company) => ({
			id: company.id,
			name: company.name,
			location: [company.district, company.province].filter(Boolean).join(", "),
			joinDate: formatDate(company.createdAt),
			status: company.isActive ? "active" : "inactive",
			visits: company.visits ?? 0,
			rating: company.averageRating ?? 0,
		}));
	}, [companiesResult]);

	const columns: ColumnDef<CustomerRow>[] = useMemo(
		() => [
			{
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Customer" />
				),
				cell: ({ row }) => (
					<div>
						<p className="text-sm font-heading font-bold text-foreground">{row.original.name}</p>
						<p className="text-[10px] text-muted-foreground">{row.original.id}</p>
					</div>
				),
			},
			{
				accessorKey: "location",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Location" />
				),
				cell: ({ row }) => (
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<RiMapPinLine size={12} className="text-primary" />
						{row.original.location || "-"}
					</div>
				),
			},
			{
				accessorKey: "visits",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Visits" />
				),
			},
			{
				accessorKey: "rating",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Rating" />
				),
				cell: ({ row }) => (
					<div className="flex w-fit items-center gap-1.5 rounded-sm border border-amber-100 bg-amber-50 px-2 py-0.5">
						<RiStarLine size={12} className="fill-yellow-500 text-yellow-500" />
						<p className="text-xs font-heading font-bold text-foreground">{row.original.rating.toFixed(1)}</p>
					</div>
				),
			},
			{
				accessorKey: "status",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ row }) => (
					<Badge variant={row.original.status === "active" ? "success" : "secondary"} className="uppercase text-[10px] tracking-wider">
						{row.original.status}
					</Badge>
				),
			},
			{
				accessorKey: "joinDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Joined" />
				),
			},
			{
				id: "actions",
				cell: () => (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<RiMoreLine className="h-4 w-4" />
								</Button>
							}
						/>
						<DropdownMenuContent align="end">
							<DropdownMenuGroup>
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem>
									<RiEyeLine className="mr-2 h-4 w-4" /> View details
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[],
	);

	const averageRating =
		customers.length > 0
			? customers.reduce((sum, customer) => sum + customer.rating, 0) / customers.length
			: 0;

	return (
		<div className="space-y-5 pb-10">
			<AdminPageHeader
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
				<AdminStatCard label="Total Customers" value={customers.length} icon={RiUserLine} bgColor="bg-blue-50" color="text-blue-600" />
				<AdminStatCard label="Active" value={customers.filter((c) => c.status === "active").length} icon={RiEyeLine} bgColor="bg-green-50" color="text-green-600" />
				<AdminStatCard label="Total Visits" value={customers.reduce((sum, c) => sum + c.visits, 0)} icon={RiMapPinLine} />
				<AdminStatCard label="Avg. Rating" value={averageRating.toFixed(1)} icon={RiStarLine} bgColor="bg-yellow-50" color="text-yellow-600" />
			</div>

			<AdminCard noPadding className="p-4">
				{isLoading ? (
					<div className="p-8 text-sm text-muted-foreground">Loading customers...</div>
				) : (
					<DataTable
						columns={columns}
						data={customers}
						filterColumn="name"
						filterPlaceholder="Search by name..."
					/>
				)}
			</AdminCard>
		</div>
	);
}
