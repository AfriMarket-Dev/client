import { RiAddLine, RiLayoutGridLine, RiSearchLine } from "@remixicon/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGetProductsQuery } from "@/services/api/products";
import { PageHeader } from "@/shared/components/admin/page-header";
import { StatCard } from "@/shared/components/admin/stat-card";
import { StatsGrid } from "@/shared/components/stats-grid";

export function ProviderProductManagement() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const { data: productsResult, isLoading } = useGetProductsQuery({});

	const products = productsResult?.data || [];

	return (
		<div className="space-y-8 pb-10">
			<PageHeader
				title="Inventory Management"
				subtitle="Manage your catalog, stock levels, and marketplace presence"
				badge="Provider Dashboard"
				actions={
					<Button className="h-11 rounded-none px-6 font-bold uppercase text-xs tracking-wider shadow-none">
						<RiAddLine size={18} className="mr-2" />
						Add New Resource
					</Button>
				}
			/>

			{/* Stats Overview */}
			<StatsGrid columns={4}>
				<StatCard
					label="Total Products"
					value={products.length}
					icon={RiLayoutGridLine}
				/>
				<StatCard
					label="Active Listings"
					value={products.filter((p) => p.isActive).length}
					icon={RiLayoutGridLine}
					bgColor="bg-success/5"
					color="text-success"
				/>
				<StatCard
					label="Out of Stock"
					value={products.filter((p) => (p.stock || 0) === 0).length}
					icon={RiLayoutGridLine}
					bgColor="bg-destructive/5"
					color="text-destructive"
				/>
				<StatCard
					label="Pending Review"
					value="0"
					icon={RiLayoutGridLine}
					bgColor="bg-warning/5"
					color="text-warning"
				/>
			</StatsGrid>

			{/* Control Bar */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-4 rounded-none shadow-none">
				<div className="relative flex-1 max-w-md">
					<RiSearchLine
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<Input
						placeholder="Search your inventory..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10 h-10 rounded-none border-border bg-background shadow-none"
					/>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center border border-border p-1 bg-muted/30 rounded-none">
						<Button
							variant={viewMode === "grid" ? "secondary" : "ghost"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className={cn(
								"h-8 w-8 p-0 rounded-none transition-all",
								viewMode === "grid"
									? "bg-background shadow-none"
									: "hover:bg-background/50",
							)}
						>
							<RiLayoutGridLine size={16} />
						</Button>
						<Button
							variant={viewMode === "list" ? "secondary" : "ghost"}
							size="sm"
							onClick={() => setViewMode("list")}
							className={cn(
								"h-8 w-8 p-0 rounded-none transition-all",
								viewMode === "list"
									? "bg-background shadow-none"
									: "hover:bg-background/50",
							)}
						>
							<RiLayoutGridLine size={16} />
						</Button>
					</div>

					<div className="w-[1px] h-6 bg-border mx-2" />

					<Button
						variant="outline"
						size="sm"
						className="h-10 rounded-none font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						Export Data
					</Button>
				</div>
			</div>

			{/* Catalog List/Grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="h-[320px] bg-muted/20 animate-pulse border border-border rounded-none"
						/>
					))}
				</div>
			) : (
				<div
					className={cn(
						"grid gap-6",
						viewMode === "grid"
							? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
							: "grid-cols-1",
					)}
				>
					{products.map((product) => (
						<div
							key={product.id}
							className={cn(
								"group bg-card border border-border transition-all hover:border-primary/50 relative overflow-hidden rounded-none shadow-none",
								viewMode === "list" ? "flex gap-6 p-4" : "flex flex-col",
							)}
						>
							{/* Product Image */}
							<div
								className={cn(
									"bg-muted/30 relative overflow-hidden rounded-none",
									viewMode === "list" ? "w-48 aspect-square" : "aspect-video",
								)}
							>
								{product.images?.[0] ? (
									<img
										src={product.images[0]}
										alt={product.name}
										className="w-full h-full object-cover transition-transform group-hover:scale-105"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-muted-foreground">
										No Image
									</div>
								)}
								<div className="absolute top-2 left-2 flex gap-1">
									<Badge
										className={cn(
											"rounded-none font-bold uppercase text-[9px] tracking-wider px-2 py-0.5",
											product.isActive
												? "bg-success text-white"
												: "bg-muted text-muted-foreground",
										)}
									>
										{product.isActive ? "Active" : "Hidden"}
									</Badge>
								</div>
							</div>

							{/* Product Info */}
							<div
								className={cn(
									"p-4 flex-1 flex flex-col",
									viewMode === "list" ? "py-2" : "",
								)}
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
											{product.category?.name || "Uncategorized"}
										</p>
										<h4 className="text-base font-bold text-foreground leading-tight">
											{product.name}
										</h4>
									</div>
									<div className="text-right">
										<p className="text-lg font-bold text-primary">
											RWF {product.price?.toLocaleString()}
										</p>
										<p className="text-[10px] font-semibold text-muted-foreground uppercase">
											per {product.unit || "unit"}
										</p>
									</div>
								</div>

								<div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
									<div className="flex items-center gap-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
										<span>Stock: {product.stock || 0}</span>
										<span>Views: {product.views || 0}</span>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="sm"
											className="h-8 rounded-none text-xs font-bold uppercase tracking-widest hover:text-primary"
										>
											Edit
										</Button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default ProviderProductManagement;
