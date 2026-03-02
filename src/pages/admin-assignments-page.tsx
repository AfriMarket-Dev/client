import { RiLinkM, RiMoreLine, RiEyeLine } from "@remixicon/react";
import { useMemo, useState } from "react";
import { useGetServicesQuery } from "@/app/api/services";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

interface AssignmentRow {
  id: string;
  supplier: string;
  service: string;
  assignedDate: string;
  status: "active" | "inactive";
  price: number;
  supplierId: string;
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

  const assignments: AssignmentRow[] = useMemo(() => {
    return (servicesResult?.data ?? []).map((service) => ({
      id: service.id,
      supplier: service.company?.name ?? "Unknown supplier",
      supplierId: service.company?.id ?? "",
      service: service.name,
      assignedDate: formatDate(service.createdAt),
      status: service.isActive ? "active" : "inactive",
      price: Number(service.price) || 0,
    }));
  }, [servicesResult]);

  const columns: ColumnDef<AssignmentRow>[] = useMemo(
    () => [
      {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => (
          <p className="text-sm font-heading font-bold text-foreground">
            {row.original.supplier}
          </p>
        ),
      },
      {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="rounded-sm border border-blue-100 bg-blue-50 p-1.5">
              <RiLinkM size={12} className="text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {row.original.service}
            </span>
          </div>
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
        accessorKey: "assignedDate",
        header: "Assigned",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.assignedDate}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground">
            RWF {row.original.price.toLocaleString()}
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
                      to: `/suppliers/${row.original.supplierId}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View supplier
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate({
                      to: `/services/${row.original.id}` as any,
                    })
                  }
                >
                  <RiEyeLine className="mr-2 h-4 w-4" /> View service
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [navigate],
  );

  return (
    <div className="space-y-5 pb-10">
      <AdminPageHeader
        title="Assignments"
        subtitle="Manage service-to-supplier assignments"
        badge="Live Nodes"
      />

      <AdminCard>
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">
            Loading assignments...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={assignments}
            filterColumn="service"
            filterPlaceholder="Search services..."
            manualPagination
            pageCount={servicesResult?.meta?.totalPages || 0}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        )}
      </AdminCard>
    </div>
  );
}
