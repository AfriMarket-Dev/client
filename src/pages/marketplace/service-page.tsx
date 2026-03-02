import { useNavigate, useParams } from "@tanstack/react-router";
import { useGetServiceByIdQuery } from "@/app/api/services";
import ServiceView from "@/components/marketplace/service-view";
import { Button } from "@/components/ui/button";

function serviceAgeYears(dateLike?: string) {
	if (!dateLike) return "N/A";
	const created = new Date(dateLike);
	if (Number.isNaN(created.getTime())) return "N/A";
	const years = Math.max(1, Math.floor((Date.now() - created.getTime()) / 31536000000));
	return `${years}+ Years`;
}

export default function ServicePage() {
	const { serviceId } = useParams({ from: "/_main/services/$serviceId" });
	const navigate = useNavigate();

	const { data: rawService, isLoading, error } = useGetServiceByIdQuery(serviceId);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-background p-4 text-muted-foreground">
				Loading service...
			</div>
		);
	}

	if (error || !rawService) {
		return (
			<div className="flex h-screen items-center justify-center bg-background p-4">
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-heading font-bold uppercase tracking-wide text-foreground">
						Service Not Found
					</h1>
					<Button
						onClick={() => navigate({ to: "/marketplace" })}
						className="rounded-sm font-heading uppercase tracking-wider"
					>
						Back to Marketplace
					</Button>
				</div>
			</div>
		);
	}

	const service = {
		...rawService,
		totalRequests: rawService.views ?? 0,
		pendingRequests: 0,
		provider: {
			fullName: rawService.company?.name ?? "Unknown Provider",
			role: rawService.company?.type ?? "Service Provider",
			experience: serviceAgeYears(rawService.createdAt),
			phone: rawService.company?.phone ?? "",
			email: rawService.company?.email ?? "",
			rating: rawService.company?.rating ?? 0,
		},
	};

	return (
		<ServiceView
			service={service}
			onBack={() => navigate({ to: "/marketplace" })}
		/>
	);
}
