import {
	RiAddLine,
	RiBuilding2Line,
	RiCheckboxCircleLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAdminTable } from "@/hooks/use-admin-table";
import {
	useDeleteCompanyMutation,
	useGetCompaniesQuery,
	useUpdateCompanyMutation,
} from "@/services/api/companies";
import { ActionModal } from "@/shared/components/action-modal";
import { AdminTableToolbar } from "@/shared/components/admin/admin-table-toolbar";
import { StatCard } from "@/shared/components/admin/stat-card";
import { ResourceManagementLayout } from "@/shared/components/layouts/resource-management-layout";
import { StatsGrid } from "@/shared/components/stats-grid";
import type { ProviderRow } from "@/types";
import { getProvidersColumns } from "../columns/providers-columns";

export function AdminProvidersPage() {
	const navigate = useNavigate();
	const { pagination, setPagination, page, limit } = useAdminTable();

	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		providerId: "",
		providerName: "",
	});
	const [suspendModal, setSuspendModal] = useState({
		isOpen: false,
		providerId: "",
		providerName: "",
	});
	const [verifyModal, setVerifyModal] = useState({
		isOpen: false,
		providerId: "",
		providerName: "",
		isVerified: false,
	});

	const { data: companiesResult, isLoading } = useGetCompaniesQuery({
		page,
		limit,
	});
	const [deleteCompany, { isLoading: deleting }] = useDeleteCompanyMutation();
	const [updateCompany, { isLoading: updating }] = useUpdateCompanyMutation();

	const providers: ProviderRow[] = useMemo(() => {
		return (companiesResult?.data ?? []).map((company) => ({
			id: company.id,
			name: company.name,
			type: company.type,
			district: company.district || "N/A",
			rating: Number(company.averageRating) || 5.0,
			status: company.isActive ? "active" : "suspended",
			isVerified: company.isVerified,
		}));
	}, [companiesResult]);

	const handleConfirmDelete = async () => {
		try {
			await deleteCompany(deleteModal.providerId).unwrap();
			toast.success("Provider deleted successfully");
			setDeleteModal({ isOpen: false, providerId: "", providerName: "" });
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete provider");
		}
	};

	const handleConfirmSuspend = async () => {
		try {
			const company = companiesResult?.data.find(
				(c) => c.id === suspendModal.providerId,
			);
			if (!company) return;

			await updateCompany({
				id: suspendModal.providerId,
				data: { isActive: !company.isActive, isVerified: company.isVerified },
			}).unwrap();

			toast.success(
				company.isActive ? "Provider suspended" : "Provider activated",
			);
			setSuspendModal({ isOpen: false, providerId: "", providerName: "" });
		} catch (error) {
			console.error(error);
			toast.error("Failed to update provider status");
		}
	};

	const handleConfirmVerify = async () => {
		try {
			await updateCompany({
				id: verifyModal.providerId,
				data: { isVerified: !verifyModal.isVerified },
			}).unwrap();

			toast.success(
				verifyModal.isVerified
					? "Verification removed"
					: "Provider marked as verified",
			);
			setVerifyModal({
				isOpen: false,
				providerId: "",
				providerName: "",
				isVerified: false,
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to update verification status");
		}
	};

	const columns = useMemo(
		() =>
			getProvidersColumns({
				onViewDetails: (id) =>
					navigate({
						to: "/admin/providers/$providerId",
						params: { providerId: id },
					}),
				onEdit: (id) =>
					navigate({
						to: "/admin/providers/$providerId/edit",
						params: { providerId: id },
					}),
				onSuspend: (id, name) =>
					setSuspendModal({ isOpen: true, providerId: id, providerName: name }),
				onVerify: (id, name, isVerified) =>
					setVerifyModal({
						isOpen: true,
						providerId: id,
						providerName: name,
						isVerified,
					}),
				onDelete: (id, name) =>
					setDeleteModal({ isOpen: true, providerId: id, providerName: name }),
			}),
		[navigate],
	);

	return (
		<ResourceManagementLayout
			title="Providers"
			subtitle="Manage verified provider entities"
			headerActions={
				<Button
					className="h-11 rounded-md px-6 font-semibold text-sm shadow-sm"
					onClick={() => navigate({ to: "/admin/providers/new" })}
				>
					<RiAddLine className="mr-2 h-4 w-4" /> Add Provider
				</Button>
			}
			stats={
				<StatsGrid columns={3}>
					<StatCard
						label="Total Providers"
						value={companiesResult?.meta?.total?.toString() || "0"}
						icon={RiBuilding2Line}
					/>
					<StatCard
						label="Active Providers"
						value={providers
							.filter((s) => s.status === "active")
							.length.toString()}
						icon={RiCheckboxCircleLine}
						change="+2 this month"
					/>
					<StatCard
						label="Verification Rate"
						value={
							providers.length > 0
								? `${Math.round(
										(providers.filter((s) => s.isVerified).length /
											providers.length) *
											100,
									)}%`
								: "0%"
						}
						icon={RiCheckboxCircleLine}
					/>
				</StatsGrid>
			}
			cardTitle="Provider Directory"
			cardSubtitle="Search and manage provider accounts"
			isLoading={isLoading}
			loadingText="Loading providers..."
			content={
				<DataTable
					columns={columns}
					data={providers}
					manualPagination
					pageCount={companiesResult?.meta?.totalPages || 0}
					onPaginationChange={setPagination}
					state={{ pagination }}
				>
					<DataTable.Toolbar>
						<AdminTableToolbar
							searchColumn="name"
							searchPlaceholder="Search providers..."
							statusColumn="status"
							statusOptions={[
								{ label: "Active", value: "active" },
								{ label: "Suspended", value: "suspended" },
							]}
						/>
					</DataTable.Toolbar>
					<DataTable.Content />
					<DataTable.Pagination />
				</DataTable>
			}
			modals={
				<>
					<ActionModal
						isOpen={deleteModal.isOpen}
						title="Delete Provider"
						description={`Are you sure you want to delete "${deleteModal.providerName}"? This action cannot be undone.`}
						type="delete"
						onConfirm={handleConfirmDelete}
						onCancel={() =>
							setDeleteModal({
								isOpen: false,
								providerId: "",
								providerName: "",
							})
						}
						isLoading={deleting}
					/>

					<ActionModal
						isOpen={suspendModal.isOpen}
						title={
							providers.find((s) => s.id === suspendModal.providerId)
								?.status === "active"
								? "Suspend Provider"
								: "Activate Provider"
						}
						description={`Are you sure you want to ${providers.find((s) => s.id === suspendModal.providerId)?.status === "active" ? "suspend" : "activate"} "${suspendModal.providerName}"?`}
						type={
							providers.find((s) => s.id === suspendModal.providerId)
								?.status === "active"
								? "suspend"
								: "info"
						}
						onConfirm={handleConfirmSuspend}
						onCancel={() =>
							setSuspendModal({
								isOpen: false,
								providerId: "",
								providerName: "",
							})
						}
						isLoading={updating}
					/>

					<ActionModal
						isOpen={verifyModal.isOpen}
						title={verifyModal.isVerified ? "Remove Verification" : "Verify Provider"}
						description={`Are you sure you want to ${verifyModal.isVerified ? "remove verification from" : "verify"} "${verifyModal.providerName}"?`}
						type={verifyModal.isVerified ? "suspend" : "info"}
						onConfirm={handleConfirmVerify}
						onCancel={() =>
							setVerifyModal({
								isOpen: false,
								providerId: "",
								providerName: "",
								isVerified: false,
							})
						}
						isLoading={updating}
					/>
				</>
			}
		/>
	);
}
