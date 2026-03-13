import {
	RiDeleteBinLine,
	RiEditLine,
	RiEyeLine,
	RiMoreLine,
	RiPagesLine,
} from "@remixicon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductRow } from "@/types";

interface ProductColumnsProps {
	onViewProvider: (providerId: string) => void;
	onViewDetails: (productId: string) => void;
	onEdit: (providerId: string, productId: string) => void;
	onDelete: (product: ProductRow) => void;
}

export const getProductColumns = ({
	onViewProvider,
	onViewDetails,
	onEdit,
	onDelete,
}: ProductColumnsProps): ColumnDef<ProductRow>[] => [
	{
		accessorKey: "name",
		header: "Product",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<div className="rounded-sm border border-info/20 bg-info/5 p-2">
					<RiPagesLine size={16} className="text-info" />
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
		accessorKey: "provider",
		header: "Provider",
		cell: ({ row }) => (
			<span className="text-xs font-semibold text-foreground">
				{row.original.provider}
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
							disabled={!row.original.providerId}
							onClick={() => onViewProvider(row.original.providerId)}
						>
							<RiEyeLine className="mr-2 h-4 w-4" /> View provider
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onViewDetails(row.original.id)}>
							<RiEyeLine className="mr-2 h-4 w-4" /> View details
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onEdit(row.original.providerId, row.original.id)}
						>
							<RiEditLine className="mr-2 h-4 w-4" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-destructive focus:text-destructive"
							onClick={() => onDelete(row.original)}
						>
							<RiDeleteBinLine className="mr-2 h-4 w-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];
