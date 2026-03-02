import { useNavigate } from "@tanstack/react-router";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiMoreLine,
  RiServiceLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/app/api/services";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { ActionModal } from "@/components/common/action-modal";
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
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

interface ServiceRow {
  id: string;
  name: string;
  category: string;
  supplier: string;
  supplierId: string;
  status: "active" | "inactive";
  createdDate: string;
  views: number;
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
      category: service.category?.name ?? "General",
      supplier: service.company?.name ?? "Unknown supplier",
      supplierId: service.company?.id ?? "",
      status: service.isActive ? "active" : "inactive",
      createdDate: toDateLabel(service.createdAt),
      views: service.views,
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
        header: "Service",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="rounded-sm border border-orange-100 bg-orange-50 p-2">
              <RiServiceLine size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground">
                {row.original.name}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {row.original.category}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "supplier",
        header: "Provider",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground">
            {row.original.supplier}
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
        accessorKey: "createdDate",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.createdDate}
          </span>
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
                  onClick={() =>
                    navigate({
                      to: `/suppliers/${row.original.supplierId}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View provider
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: `/admin/suppliers/${row.original.supplierId}/edit` as any,
                    })
                  }
                >
                  <RiEditLine className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
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
      <AdminPageHeader title="Services" subtitle="Manage catalog services" />

      <AdminCard>
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground text-center">
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

      <ActionModal
        isOpen={deleteModal.isOpen}
        title="Delete Service"
        description={`Are you sure you want to delete "${deleteModal.serviceName}"? This action cannot be undone.`}
        type="delete"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isLoading={deleting}
      />
    </div>
  );
}
