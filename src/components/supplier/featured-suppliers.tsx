import { RiShieldCheckLine, RiCheckboxCircleLine, RiMapPinLine, RiStarFill } from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import type React from "react";
import { useGetCompaniesQuery } from "@/app/api/companies";
import { useGetProductsQuery } from "@/app/api/products";
// import { useGetCompaniesQuery } from "@/app/api/companies";
// import type { Company } from "@/app/api/companies";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "../common/image-with-fallback";
import { SectionHeader } from "../home/section-header";

const CompanyAssetsPreview: React.FC<{ companyId: string }> = ({
	companyId,
}) => {
	const { data, isLoading } = useGetProductsQuery({ companyId, limit: 4 });
	const products = data?.data || [];

	return (
		<div className="grid grid-cols-4 gap-2">
			{isLoading
				? Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="aspect-square rounded bg-muted/30 border border-border/40 animate-pulse"
						/>
					))
				: products.length > 0
					? products.map((product: any) => (
							<div
								key={product.id}
								className="aspect-square rounded bg-muted/30 border border-border/40 overflow-hidden relative group/asset"
							>
								<ImageWithFallback
									src={
										product.variants?.[0]?.images?.[0] ||
										`https://images.unsplash.com/photo-1581091226825?auto=format&fit=crop&q=80&w=100`
									}
									alt={product.name}
									className="w-full h-full object-cover transition-transform group-hover/asset:scale-110"
								/>
							</div>
						))
					: [1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="aspect-square rounded bg-muted/30 border border-border/40 overflow-hidden relative group/asset"
							>
								<div className="w-full h-full bg-muted flex items-center justify-center">
									<span className="text-[10px] text-muted-foreground/50">
										...
									</span>
								</div>
							</div>
						))}
			{/* Fill remaining slots if products < 4 */}
			{!isLoading &&
				products.length > 0 &&
				products.length < 4 &&
				Array.from({ length: 4 - products.length }).map((_, i) => (
					<div
						key={`fallback-${i}`}
						className="aspect-square rounded bg-muted/30 border border-border/40 overflow-hidden relative group/asset"
					>
						<div className="w-full h-full bg-muted flex items-center justify-center">
							<span className="text-[10px] text-muted-foreground/50">...</span>
						</div>
					</div>
				))}
		</div>
	);
};

const FeaturedSuppliers: React.FC = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetCompaniesQuery({
		limit: 6,
		verified: true,
	});
	const companies = data?.data || [];

	return (
		<div className="max-w-[1600px] mx-auto px-4 lg:px-6">
			<SectionHeader
				title="Featured Suppliers"
				subtitle="Verified industry leaders trusted by contractors and developers."
				label="Verified Partners"
				icon={<RiCheckboxCircleLine className="w-5 h-5" />}
				viewAllHref="/suppliers"
				viewAllLabel="View all suppliers"
			/>

			{isLoading || companies.length === 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="h-56 rounded-lg border border-border/40 bg-muted/20 animate-pulse"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{companies.map((company) => {
						const rating = Number(company.averageRating ?? 0);

						return (
							<Card
								key={company.id}
								className="group border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg bg-card cursor-pointer overflow-hidden flex flex-col"
								onClick={() =>
									navigate({ to: `/suppliers/${company.id}` as any })
								}
							>
								<CardContent className="p-5 flex flex-col h-full">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
												{company.name?.charAt(0) ?? "?"}
											</div>
											<div className="flex flex-col min-w-0">
												<div className="flex items-center gap-1.5">
													<h3 className="font-heading font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
														{company.name}
													</h3>
													<RiShieldCheckLine
														size={14}
														className="text-emerald-500 shrink-0"
													/>
												</div>
												<div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
													<RiMapPinLine size={10} className="text-primary/60" />
													{company.district}
												</div>
											</div>
										</div>
										<div className="text-right">
											<div className="flex items-center gap-1 text-amber-500 justify-end">
												<RiStarFill size={12} className="fill-current" />
												<span className="text-xs font-bold text-foreground font-sans">
													{rating.toFixed(1)}
												</span>
											</div>
											<span className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">
												{company.reviewCount} Reviews
											</span>
										</div>
									</div>

									<div className="space-y-3 mb-5">
										<p className="text-[11px] font-semibold text-primary/80 uppercase tracking-wider">
											{company.type}
										</p>
										<div className="flex flex-wrap gap-1.5">
											{[
												"Structural Steel",
												"Heavy Machinery",
												"Consultancy",
											].map((tag, i) => (
												<span
													key={i}
													className="text-[9px] bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-sm font-medium border border-border/40"
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Operational Preview - Busy feel */}
									<div className="mt-auto border-t border-border/40 pt-4">
										<div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
											Hot Asset Catalog
										</div>
										<CompanyAssetsPreview companyId={company.id} />
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}

			<div className="mt-12 md:hidden">
				<Button
					variant="outline"
					size="lg"
					onClick={() => navigate({ to: "/suppliers" })}
				>
					View all suppliers
				</Button>
			</div>
		</div>
	);
};

export default FeaturedSuppliers;
