import {
	RiEyeLine,
	RiMapPinLine,
	RiMoreLine,
	RiStarLine,
} from "@remixicon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CustomerRow } from "@/types";

export const customerColumns: ColumnDef<CustomerRow>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Customer" />
		),
		cell: ({ row }) => (
			<div>
				<p className="text-sm font-heading font-bold text-foreground">
					{row.original.name}
				</p>
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
				<p className="text-xs font-heading font-bold text-foreground">
					{(row.original.rating || 0).toFixed(1)}
				</p>
			</div>
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
				className="uppercase text-[10px] tracking-wider"
			>
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
				<DropdownMenuContent align="end" className="w-56">
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
];
