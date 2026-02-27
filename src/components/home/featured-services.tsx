import { useNavigate } from "@tanstack/react-router";
import { RiBriefcaseLine, RiMapPinLine } from "@remixicon/react";
import type React from "react";
import { useGetServicesQuery } from "@/app/api/services";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";

const FeaturedServices: React.FC = () => {
	const navigate = useNavigate();
	const { data: servicesResult, isLoading } = useGetServicesQuery({
		isFeatured: true,
		limit: 8,
	});
	const listings = servicesResult?.data || [];

	return (
		<div className="max-w-[1600px] mx-auto px-4 lg:px-6">
			<SectionHeader
				title="Featured Services"
				subtitle="Expert contractors and equipment rentals near your project site."
				label="Pro Services"
				icon={<RiBriefcaseLine className="w-5 h-5" />}
				viewAllHref="/products?type=SERVICE"
				viewAllLabel="Find more services"
			/>

			{isLoading || listings.length === 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="aspect-video rounded-lg border border-border/40 bg-muted/20 animate-pulse"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{listings.map((service) => {
						const img = service.images?.[0];
						const price = service.price || 0;
						const company = service.company;
						return (
							<Card
								key={service.id}
								className="group border border-border/30 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 rounded-lg overflow-hidden bg-card cursor-pointer"
								onClick={() =>
									navigate({ to: `/products/${service.id}` as any })
								}
							>
								<div className="relative aspect-video overflow-hidden bg-muted/20">
									{img ? (
										<ImageWithFallback
											src={img}
											alt={service.name}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-muted-foreground/50 text-sm">
											No image available
										</div>
									)}
									<div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-semibold rounded-md shadow-sm">
										{service.category?.name || "Service"}
									</div>
								</div>

								<CardContent className="p-6">
									{company?.district && (
										<div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/70 mb-3 uppercase tracking-wider">
											<RiMapPinLine className="w-3.5 h-3.5" />
											{company.district}
										</div>
									)}
									<h3 className="text-xl font-heading font-bold text-foreground mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-[3.5rem]">
										{service.name}
									</h3>
									<div className="flex flex-col gap-1 mt-auto">
										<span className="text-muted-foreground/60 text-[10px] font-semibold uppercase tracking-tight">
											Starts at
										</span>
										<span className="text-2xl font-bold text-foreground font-sans">
											RWF {price.toLocaleString()}
										</span>
										{service.discount && service.discount > 0 && (
											<span className="text-xs font-medium text-emerald-600">
												{service.discount}% OFF
											</span>
										)}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}

			<div className="mt-10 md:hidden">
				<Button
					variant="outline"
					size="lg"
					className="w-full rounded-lg h-14 font-semibold border-border/60 shadow-none"
					onClick={() =>
						navigate({ to: "/marketplace", search: { type: "SERVICE" } as any })
					}
				>
					Find more services
				</Button>
			</div>
		</div>
	);
};

export default FeaturedServices;
