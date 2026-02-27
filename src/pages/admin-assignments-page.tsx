import { RiLinkM, RiSearchLine } from "@remixicon/react";
import { useMemo, useState } from "react";
import { useGetServicesQuery } from "@/app/api/services";
import { AdminCard, AdminPageHeader, AdminTable } from "@/components/admin";
import { Badge } from "@/components/ui/badge";

interface AssignmentRow {
	id: string;
	supplier: string;
	service: string;
	assignedDate: string;
	status: "active" | "inactive";
	price: number;
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

export default function AdminAssignmentsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const { data: servicesResult, isLoading } = useGetServicesQuery({
		limit: 200,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});

	const assignments: AssignmentRow[] = useMemo(() => {
		return (servicesResult?.data ?? []).map((service) => ({
			id: service.id,
			supplier: service.company?.name ?? "Unknown supplier",
			service: service.name,
			assignedDate: formatDate(service.createdAt),
			status: service.isActive ? "active" : "inactive",
			price: service.price ?? 0,
		}));
	}, [servicesResult]);

	const filteredAssignments = useMemo(() => {
		const query = searchTerm.toLowerCase();
		return assignments.filter(
			(assignment) =>
				assignment.supplier.toLowerCase().includes(query) ||
				assignment.service.toLowerCase().includes(query),
		);
	}, [assignments, searchTerm]);

	return (
		<div className="space-y-5 pb-10">
			<AdminPageHeader
				title="Assignments"
				subtitle="Service-to-supplier assignments from live API data"
			/>

			<AdminCard noPadding>
				<div className="p-3">
					<div className="relative">
						<RiSearchLine className="absolute left-3 top-3 text-muted-foreground" size={18} />
						<input
							type="text"
							placeholder="Search assignments..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="h-11 w-full rounded-sm border border-border bg-background py-2 pr-4 pl-10 text-sm"
						/>
					</div>
				</div>
			</AdminCard>

			{isLoading ? (
				<div className="p-8 text-sm text-muted-foreground">Loading assignments...</div>
			) : filteredAssignments.length === 0 ? (
				<div className="rounded-sm border border-dashed border-border py-12 text-center text-muted-foreground">
					No assignments found.
				</div>
			) : (
				<AdminTable
					headers={[
						"Supplier",
						"Service",
						"Status",
						"Assigned",
						"Price",
					]}
				>
					{filteredAssignments.map((assignment) => (
						<tr key={assignment.id} className="transition-colors hover:bg-muted/50">
							<td className="px-4 py-4">
								<p className="text-sm font-heading font-bold text-foreground">{assignment.supplier}</p>
							</td>
							<td className="px-4 py-4">
								<div className="flex items-center gap-2">
									<div className="rounded-sm border border-blue-100 bg-blue-50 p-1.5">
										<RiLinkM size={12} className="text-blue-600" />
									</div>
									<span className="text-xs font-semibold text-foreground">{assignment.service}</span>
								</div>
							</td>
							<td className="px-4 py-4">
								<Badge variant={assignment.status === "active" ? "success" : "secondary"} className="uppercase text-[10px] tracking-wider">
									{assignment.status}
								</Badge>
							</td>
							<td className="px-4 py-4 text-xs text-muted-foreground">{assignment.assignedDate}</td>
							<td className="px-4 py-4 text-xs font-semibold text-foreground">RWF {assignment.price.toLocaleString()}</td>
						</tr>
					))}
				</AdminTable>
			)}
		</div>
	);
}
