import { RiFileTextLine, RiInformationLine, RiShieldCheckLine } from "@remixicon/react";
import type React from "react";
import { Separator } from "@/components/ui/separator";
import { AddReviewDialog } from "../reviews/add-review-dialog";
import { ReviewList } from "../reviews/review-list";

interface ProductTabsContentProps {
	description: string;
	keyFacts: Array<{ label: string; value: string }>;
	variantName?: string;
	variantSku?: string;
}

export const ProductTabsContent: React.FC<ProductTabsContentProps> = ({
	description,
	keyFacts,
	variantName: _variantName,
	variantSku: _variantSku,
}) => {
	const productId = keyFacts.find((f) => f.label.includes("ID"))?.value || "";

	return (
		<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Overview Section */}
			<section className="space-y-8">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-none bg-muted flex items-center justify-center">
						<RiInformationLine className="w-4 h-4 text-muted-foreground" />
					</div>
					<h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
						Product Narrative
					</h3>
				</div>
				
				<div className="grid md:grid-cols-12 gap-12 items-start">
					<div className="md:col-span-7 space-y-6">
						<p className="text-xs md:text-sm leading-relaxed text-muted-foreground uppercase tracking-wider font-medium">
							{description ||
								"Comprehensive industrial resource documentation. This component has been verified for structural integrity and enterprise-grade performance. Detailed material safety data and technical whitepapers are available upon qualified request."}
						</p>
						
						<div className="flex items-center gap-4 py-4 px-6 bg-primary/5 border border-primary/10">
							<RiShieldCheckLine className="text-primary w-5 h-5" />
							<p className="text-[10px] font-bold uppercase tracking-widest text-primary">
								Compliance: All regional construction standards met.
							</p>
						</div>
					</div>

					<div className="md:col-span-5 space-y-6">
						<div className="flex items-center gap-3 mb-4">
							<RiFileTextLine className="w-4 h-4 text-muted-foreground" />
							<h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/60">
								Reference Metadata
							</h4>
						</div>
						<div className="grid gap-4">
							{keyFacts.map((fact) => (
								<div
									key={fact.label}
									className="flex justify-between items-end group"
								>
									<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
										{fact.label}
									</span>
									<div className="flex-1 border-b border-border/40 mx-4 mb-1 group-hover:border-primary/20 transition-colors" />
									<span className="text-[10px] font-mono font-bold text-foreground">
										{fact.value}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<Separator className="bg-border/40" />

			{/* Review Aggregation */}
			<section className="space-y-8">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
					<div className="space-y-1">
						<h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
							Field Performance Reports
						</h3>
						<p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">
							Verified feedback from technical deployments
						</p>
					</div>
					<div className="w-full sm:w-auto">
						<AddReviewDialog productId={productId} />
					</div>
				</div>

				<ReviewList productId={productId} />
			</section>
		</div>
	);
};
