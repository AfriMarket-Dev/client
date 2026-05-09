import { RiFileTextLine, RiInformationLine } from "@remixicon/react";
import type React from "react";
import { Separator } from "@/components/ui/separator";
import { AddReviewDialog } from "../reviews/add-review-dialog";
import { ReviewList } from "../reviews/review-list";

interface ProductTabsContentProps {
	productId: string;
	description: string;
	keyFacts: Array<{ label: string; value: string }>;
	variantName?: string;
	variantSku?: string;
}

export const ProductTabsContent: React.FC<ProductTabsContentProps> = ({
	productId,
	description,
	keyFacts,
	variantName: _variantName,
	variantSku: _variantSku,
}) => {
	return (
		<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Overview Section */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 border-b border-border pb-4">
					<RiInformationLine className="w-5 h-5 text-foreground/70" />
					<h3 className="text-lg font-semibold text-foreground tracking-tight">
						Overview
					</h3>
				</div>

				<div className="grid md:grid-cols-12 gap-10 items-start">
					<div className="md:col-span-7 space-y-6">
						<p className="text-sm leading-relaxed text-muted-foreground">
							{description || "Product documentation and overview information."}
						</p>
					</div>

					<div className="md:col-span-5 space-y-5">
						<div className="flex items-center gap-2 mb-4">
							<RiFileTextLine className="w-5 h-5 text-muted-foreground" />
							<h4 className="text-sm font-semibold text-foreground">
								Key Details
							</h4>
						</div>
						<div className="grid gap-4">
							{keyFacts.map((fact) => (
								<div
									key={fact.label}
									className="flex justify-between items-center group border-b border-border pb-2"
								>
									<span className="text-sm font-medium text-muted-foreground">
										{fact.label}
									</span>
									<span className="text-sm font-semibold text-foreground">
										{fact.value}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<Separator className="bg-border/30" />

			{/* Review Aggregation */}
			<section className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="space-y-1">
						<h3 className="text-lg font-semibold text-foreground tracking-tight">
							Reviews
						</h3>
						<p className="text-sm text-muted-foreground">
							Feedback from customers
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
