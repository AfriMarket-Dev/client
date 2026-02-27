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
  RiPauseLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
} from "@/app/api/companies";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { ConfirmationModal } from "@/components/common/confirmation-modal";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SupplierRow {
  id: string;
  name: string;
  email: string;
  location: string;
  status: "active" | "pending" | "inactive";
  verificationStatus: "verified" | "unverified";
  joinDate: string;
  visits: number;
}

function toDateLabel(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

  const { data: companiesResult, isLoading } = useGetCompaniesQuery({
    limit: 200,
  });
  const [deleteCompany, { isLoading: deleting }] = useDeleteCompanyMutation();
  const [updateCompany, { isLoading: suspending }] = useUpdateCompanyMutation();

  const suppliers: SupplierRow[] = useMemo(() => {
    return (companiesResult?.data ?? []).map((company) => ({
      id: company.id,
      name: company.name,
      email: company.category?.description ?? "No email available",
      location: [company.district, company.province].filter(Boolean).join(", "),
      status: !company.isActive
        ? "inactive"
        : company.isVerified
          ? "active"
          : "pending",
      verificationStatus: company.isVerified ? "verified" : "unverified",
      joinDate: toDateLabel(company.createdAt),
      visits: company.visits ?? 0,
    }));
  }, [companiesResult]);

  const handleViewDetails = useCallback(
    (supplierId: string) => {
      navigate({ to: `/admin/suppliers/${supplierId}` as any });
    },
    [navigate],
  );

  const handleEditSupplier = useCallback(
    (supplierId: string) => {
      navigate({ to: `/admin/suppliers/${supplierId}/edit` as any });
    },
    [navigate],
  );

  const handleDeleteClick = useCallback((supplier: SupplierRow) => {
    setDeleteModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteModal.supplierId) return;
    try {
      await deleteCompany(deleteModal.supplierId).unwrap();
      toast.success("Supplier deleted successfully");
      setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete supplier");
    }
  }, [deleteCompany, deleteModal.supplierId]);

  const handleSuspendClick = useCallback((supplier: SupplierRow) => {
    setSuspendModal({
      isOpen: true,
      supplierId: supplier.id,
      supplierName: supplier.name,
    });
  }, []);

  const handleConfirmSuspend = useCallback(async () => {
    if (!suspendModal.supplierId) return;
    try {
      await updateCompany({
        id: suspendModal.supplierId,
        data: { isActive: false },
      }).unwrap();
      toast.success("Supplier suspended successfully");
      setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to suspend supplier");
    }
  }, [suspendModal.supplierId, updateCompany]);

  const columns: ColumnDef<SupplierRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supplier" />
        ),
        cell: ({ row }) => {
          const supplier = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-sm border border-primary/20 bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-foreground">
                  {supplier.name}
                </p>
                <div className="mt-0.5 flex items-center gap-1">
                  {supplier.verificationStatus === "verified" ? (
                    <>
                      <RiCheckboxCircleLine
                        size={12}
                        className="text-success"
                      />
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-success">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <RiErrorWarningLine size={12} className="text-warning" />
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-warning">
                        Pending
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Location" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant={
                status === "active"
                  ? "success"
                  : status === "pending"
                    ? "warning"
                    : "secondary"
              }
              className="uppercase tracking-wider text-[10px]"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "visits",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Visits" />
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
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleViewDetails(supplier.id)}
                  >
                    <RiEyeLine className="mr-2 h-4 w-4" /> View details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleEditSupplier(supplier.id)}
                  >
                    <RiEditLine className="mr-2 h-4 w-4" /> Edit supplier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleSuspendClick(supplier)}
                  >
                    <RiPauseLine className="mr-2 h-4 w-4" /> Suspend supplier
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteClick(supplier)}
                  >
                    <RiDeleteBinLine className="mr-2 h-4 w-4" /> Delete supplier
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [
      handleDeleteClick,
      handleEditSupplier,
      handleSuspendClick,
      handleViewDetails,
    ],
  );

  return (
    <div className="space-y-5 pb-10">
      <AdminPageHeader
        title="Suppliers"
        subtitle="Manage all supplier accounts"
        actions={
          <Button
            onClick={() => navigate({ to: "/admin/suppliers/new" })}
            className="h-11 rounded-sm px-6 font-heading font-bold uppercase text-xs tracking-wider"
          >
            <RiAddLine size={18} className="mr-2" />
            Add Supplier
          </Button>
        }
      />

      <AdminCard noPadding className="p-4">
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">
            Loading suppliers...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={suppliers}
            filterColumn="name"
            filterPlaceholder="Search suppliers..."
          />
        )}
      </AdminCard>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Supplier"
        message={`Delete \"${deleteModal.supplierName}\"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
        isLoading={deleting}
      />

      <ConfirmationModal
        isOpen={suspendModal.isOpen}
        title="Suspend Supplier"
        message={`Suspend \"${suspendModal.supplierName}\"? The supplier account will be disabled.`}
        confirmText="Suspend"
        cancelText="Cancel"
        type="suspend"
        onConfirm={handleConfirmSuspend}
        onCancel={() =>
          setSuspendModal({ isOpen: false, supplierId: "", supplierName: "" })
        }
        isLoading={suspending}
      />
    </div>
  );
}
