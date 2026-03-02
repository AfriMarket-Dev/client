import { useNavigate } from "@tanstack/react-router";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiMoreLine,
  RiServiceLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/app/api/services";
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
import type { ColumnDef } from "@tanstack/react-table";

interface ServiceRow {
  id: string;
  name: string;
  category: string;
  supplier: string;
  supplierId: string;
  status: "active" | "inactive";
  price: number;
  views: number;
}

export default function AdminServicesPage() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: servicesResult, isLoading } = useGetServicesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [deleteService, { isLoading: deleting }] = useDeleteServiceMutation();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    serviceId: string;
    serviceName: string;
  }>({
    isOpen: false,
    serviceId: "",
    serviceName: "",
  });

  const services: ServiceRow[] = useMemo(() => {
    return (servicesResult?.data ?? []).map((service) => ({
      id: service.id,
      name: service.name,
      category: service.category?.name ?? "Uncategorized",
      supplier: service.company?.name ?? "Unknown supplier",
      supplierId: service.company?.id ?? "",
      status: service.isActive ? "active" : "inactive",
      price: Number(service.price) || 0,
      views: Number(service.views) || 0,
    }));
  }, [servicesResult]);

  const openDeleteModal = useCallback((row: ServiceRow) => {
    setDeleteModal({
      isOpen: true,
      serviceId: row.id,
      serviceName: row.name,
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, serviceId: "", serviceName: "" });
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteModal.serviceId) return;
    try {
      await deleteService(deleteModal.serviceId).unwrap();
      toast.success("Service deleted successfully");
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service");
    }
  }, [closeDeleteModal, deleteModal.serviceId, deleteService]);

  const columns: ColumnDef<ServiceRow>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Service" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-orange-100 bg-orange-50 p-2 shrink-0">
              <RiServiceLine size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-foreground">
                {row.original.name}
              </p>
              <p className="text-xs text-muted-foreground">{row.original.id}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
      },
      {
        accessorKey: "supplier",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supplier" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "active" ? "success" : "secondary"}
            className="uppercase tracking-wider text-[10px]"
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => (
          <span className="font-medium">
            RWF {row.original.price.toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "views",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Views" />
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
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
                  onClick={() =>
                    navigate({
                      to: `/services/${row.original.id}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!row.original.supplierId}
                  onClick={() =>
                    navigate({
                      to: `/admin/suppliers/${row.original.supplierId}/service/${row.original.id}/edit` as any,
                    })
                  }
                >
                  <RiEditLine className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => openDeleteModal(row.original)}
                >
                  <RiDeleteBinLine className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [navigate, openDeleteModal],
  );

  return (
    <div className="space-y-5 pb-10">
      <AdminPageHeader
        title="Services"
        subtitle="All service listings on the platform"
      />

      <AdminCard noPadding className="p-4">
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">
            Loading services...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={services}
            filterColumn="name"
            filterPlaceholder="Search services..."
            manualPagination
            pageCount={servicesResult?.meta?.totalPages || 0}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        )}
      </AdminCard>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Service"
        message={`Delete \"${deleteModal.serviceName}\"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isLoading={deleting}
      />
    </div>
  );
}
