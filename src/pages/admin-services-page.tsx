import { useNavigate } from "@tanstack/react-router";
import {
	RiEyeLine,
	RiLoader2Line,
	RiSearchLine,
	RiServiceLine,
	RiStarLine,
} from "@remixicon/react";
import { useCallback, useMemo, useState } from "react";
import { useGetServicesQuery } from "@/app/api/services";
import { AdminCard, AdminPageHeader } from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminServicesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleNavigateToService = useCallback(
		(serviceId: string) => {
			navigate({ to: `/services/${serviceId}` as any });
		},
		[navigate],
	);

	const { data: servicesResult, isLoading } = useGetServicesQuery({
		limit: 100,
		sortBy: "createdAt",
		sortOrder: "DESC",
	});

	const services = servicesResult?.data ?? [];
	const filteredServices = useMemo(() => {
		return services.filter((service) =>
			(service.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, services]);

	return (
		<div className="space-y-5 pb-10">
			<AdminPageHeader title="Services" subtitle="All service listings on the platform" />

			<AdminCard noPadding>
				<div className="p-3">
					<div className="relative">
						<RiSearchLine className="absolute left-3 top-3 text-muted-foreground" size={18} />
						<input
							type="text"
							placeholder="Search services..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="h-11 w-full rounded-sm border border-border bg-background py-2 pr-4 pl-10 text-sm"
						/>
					</div>
				</div>
			</AdminCard>

			{isLoading ? (
				<div className="flex justify-center p-12">
					<RiLoader2Line className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			) : filteredServices.length === 0 ? (
				<div className="rounded-sm border border-dashed border-border p-16 text-center text-muted-foreground">
					No services found.
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
					{filteredServices.map((service) => (
						<AdminCard key={service.id} noPadding className="flex flex-col">
							<div className="flex items-start justify-between border-b border-border p-4">
								<div className="flex items-center gap-3">
									<div className="rounded-sm border border-primary/20 bg-primary/10 p-2.5">
										<RiServiceLine size={18} className="text-primary" />
									</div>
									<div>
										<h3 className="text-sm font-heading font-bold text-foreground">{service.name}</h3>
										<p className="text-xs text-muted-foreground">{service.category?.name ?? "Uncategorized"}</p>
									</div>
								</div>
								<Badge variant={service.isActive ? "success" : "secondary"} className="uppercase text-[10px] tracking-wider">
									{service.isActive ? "active" : "inactive"}
								</Badge>
							</div>

							<div className="flex flex-1 flex-col gap-4 p-4">
								<p className="line-clamp-3 text-sm text-muted-foreground">
									{service.description || "No description provided."}
								</p>

								<div className="grid grid-cols-2 gap-3 rounded-sm border border-border bg-muted/10 p-3 text-xs">
									<div>
										<p className="uppercase tracking-wider text-muted-foreground">Price</p>
										<p className="mt-1 font-semibold text-foreground">RWF {(service.price ?? 0).toLocaleString()}</p>
									</div>
									<div>
										<p className="uppercase tracking-wider text-muted-foreground">Views</p>
										<p className="mt-1 font-semibold text-foreground">{service.views ?? 0}</p>
									</div>
								</div>

								<div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
									<span className="flex items-center gap-1">
										<RiStarLine size={12} className="text-amber-500" />
										{service.company?.rating ?? 0}
									</span>
									<span>{service.company?.name ?? "Unknown provider"}</span>
								</div>
							</div>

							<div className="border-t border-border p-4">
								<Button
									variant="outline"
									onClick={() => handleNavigateToService(service.id)}
									className="h-10 w-full rounded-sm"
								>
									<RiEyeLine size={14} className="mr-2" /> View details
								</Button>
							</div>
						</AdminCard>
					))}
				</div>
			)}
		</div>
	);
}
