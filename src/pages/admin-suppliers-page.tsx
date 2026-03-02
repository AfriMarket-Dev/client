import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiErrorWarningLine,
  RiEyeLine,
  RiMoreLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
} from "@/app/api/companies";
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionModal } from "@/components/common/action-modal";
import { toast } from "sonner";

interface SupplierRow {
  id: string;
  name: string;
  type: string;
  district: string;
  rating: number;
  status: "active" | "suspended" | "pending";
  isVerified: boolean;
}

export default function AdminSuppliersPage() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const [suspendModal, setSuspendModal] = useState({
    isOpen: false,
    supplierId: "",
    supplierName: "",
  });
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: companiesResult, isLoading } = useGetCompaniesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  const [deleteCompany, { isLoading: deleting }] = useDeleteCompanyMutation();
  const [updateCompany, { isLoading: suspending }] = useUpdateCompanyMutation();

  const suppliers: SupplierRow[] = useMemo(() => {
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

  const handleViewDetails = useCallback(
    (id: string) => {
      navigate({ to: `/suppliers/${id}` as any });
    },
    [navigate],
  );

  const handleConfirmDelete = async () => {
    try {
      await deleteCompany(deleteModal.supplierId).unwrap();
      toast.success("Supplier deleted successfully");
      setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete supplier");
    }
  };

  const handleConfirmSuspend = async () => {
    try {
      const company = companiesResult?.data.find(c => c.id === suspendModal.supplierId);
      if (!company) return;
      
      await updateCompany({
        id: suspendModal.supplierId,
        data: { isActive: !company.isActive },
      }).unwrap();
      
      toast.success(company.isActive ? "Supplier suspended" : "Supplier activated");
      setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update supplier status");
    }
  };

  const columns: ColumnDef<SupplierRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Supplier Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-muted font-heading font-black text-primary text-sm border border-border">
              {row.original.name.charAt(0)}
            </div>
            <div>
              <p className="font-heading font-bold text-foreground leading-none mb-1">
                {row.original.name}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {row.original.type}
                </span>
                {row.original.isVerified && (
                  <RiCheckboxCircleLine className="h-3 w-3 text-emerald-500" />
                )}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "district",
        header: "Location",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.district}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "active" ? "success" : "secondary"}
            className="uppercase text-[10px] tracking-wider"
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const supplier = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <RiMoreLine className="h-4 w-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleViewDetails(supplier.id)}
                  >
                    <RiEyeLine className="mr-2 h-4 w-4" /> View profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      navigate({ to: `/admin/suppliers/${supplier.id}/edit` as any })
                    }
                  >
                    <RiEditLine className="mr-2 h-4 w-4" /> Edit details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setSuspendModal({
                        isOpen: true,
                        supplierId: supplier.id,
                        supplierName: supplier.name,
                      })
                    }
                  >
                    <RiErrorWarningLine className="mr-2 h-4 w-4" />{" "}
                    {supplier.status === "active" ? "Suspend" : "Activate"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        supplierId: supplier.id,
                        supplierName: supplier.name,
                      })
                    }
                  >
                    <RiDeleteBinLine className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleViewDetails, navigate],
  );

  return (
    <div className="space-y-6 pb-10">
      <AdminPageHeader
        title="Suppliers"
        subtitle="Manage verified supplier entities"
        actions={
          <Button 
            className="h-11 rounded-sm px-6 font-heading font-bold uppercase text-xs tracking-wider"
            onClick={() => navigate({ to: "/admin/suppliers/new" as any })}
          >
            <RiAddLine className="mr-2 h-4 w-4" /> Add Supplier
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminStatCard
          label="Total Suppliers"
          value={companiesResult?.meta?.total?.toString() || "0"}
          icon={RiBuilding2Line}
        />
        <AdminStatCard
          label="Active Nodes"
          value={suppliers.filter((s) => s.status === "active").length.toString()}
          icon={RiCheckboxCircleLine}
          trend="+2 this month"
        />
        <AdminStatCard
          label="Verification Rate"
          value={
            suppliers.length > 0
              ? `${Math.round(
                  (suppliers.filter((s) => s.isVerified).length / suppliers.length) *
                    100,
                )}%`
              : "0%"
          }
          icon={RiCheckboxCircleLine}
        />
      </div>

      <AdminCard>
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading suppliers...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={suppliers}
            filterColumn="name"
            filterPlaceholder="Search suppliers..."
            manualPagination
            pageCount={companiesResult?.meta?.totalPages || 0}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        )}
      </AdminCard>

      <ActionModal
        isOpen={deleteModal.isOpen}
        title="Delete Supplier"
        description={`Are you sure you want to delete "${deleteModal.supplierName}"? This action cannot be undone.`}
        type="delete"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
        isLoading={deleting}
      />

      <ActionModal
        isOpen={suspendModal.isOpen}
        title={suppliers.find(s => s.id === suspendModal.supplierId)?.status === 'active' ? "Suspend Supplier" : "Activate Supplier"}
        description={`Are you sure you want to ${suppliers.find(s => s.id === suspendModal.supplierId)?.status === 'active' ? 'suspend' : 'activate'} "${suspendModal.supplierName}"?`}
        type={suppliers.find(s => s.id === suspendModal.supplierId)?.status === 'active' ? "suspend" : "info"}
        onConfirm={handleConfirmSuspend}
        onCancel={() =>
          setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
        isLoading={suspending}
      />
    </div>
  );
}

import { RiBuilding2Line } from "@remixicon/react";
