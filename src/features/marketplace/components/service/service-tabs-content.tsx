import {
	RiBriefcaseLine,
	RiCheckDoubleLine,
	RiFileTextLine,
	RiInformationLine,
	RiMapPinLine,
} from "@remixicon/react";
import type React from "react";
import type { Service } from "@/types";
import { AddReviewDialog } from "../reviews/add-review-dialog";
import { ReviewList } from "../reviews/review-list";
import { SpecificationList } from "@/shared/components/specification-list";

interface ServiceTabsContentProps {
	service: Service;
	activeTab: string;
	trackAndNavigate?: (type: string, href: string) => void;
}

export const ServiceTabsContent: React.FC<ServiceTabsContentProps> = ({
	service,
	activeTab,
	trackAndNavigate: _trackAndNavigate,
}) => {
	if (activeTab === "overview") {
		return (
			<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<section>
					<div className="flex items-center gap-3 mb-6">
						<RiInformationLine className="w-5 h-5 text-foreground/70" />
						<h2 className="text-lg font-semibold text-foreground">
							Overview
						</h2>
					</div>
					<div className="prose prose-slate max-w-none">
						<p className="text-sm leading-relaxed text-muted-foreground">
							{service.description ||
								"Detailed description of this professional construction service will appear here. The provider hasn't updated the full overview yet."}
						</p>
					</div>
				</section>

				<SpecificationList specifications={service.specifications} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<section className="p-6 bg-muted/50 border border-border">
						<div className="flex items-center gap-3 mb-6">
							<RiCheckDoubleLine className="w-5 h-5 text-emerald-600" />
							<h3 className="text-sm font-semibold text-foreground">
								What's Included
							</h3>
						</div>
						<ul className="space-y-3">
							{[
								"Professional site assessment",
								"All required equipment & tools",
								"Certified skilled technicians",
								"Workmanship guarantee",
							].map((item, i) => (
								<li key={i} className="flex items-start gap-3">
									<div className="mt-2 w-1.5 h-1.5 bg-primary/40 rounded-none" />
									<span className="text-sm text-muted-foreground">
										{item}
									</span>
								</li>
							))}
						</ul>
					</section>

					<section className="p-6 bg-background border border-border">
						<div className="flex items-center gap-3 mb-6">
							<RiBriefcaseLine className="w-5 h-5 text-primary" />
							<h3 className="text-sm font-semibold text-foreground">
								Experience
							</h3>
						</div>
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-muted-foreground">
									Typical Duration
								</span>
								<span className="text-sm font-semibold text-foreground">
									{service.duration || "Contact for estimate"}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-muted-foreground">
									Standard Area
								</span>
								<span className="text-sm font-semibold text-foreground">
									Kigali City
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-muted-foreground">
									Availability
								</span>
								<span className="text-sm font-semibold text-foreground">
									Mon - Sat
								</span>
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}

	if (activeTab === "provider") {
		return (
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<section className="p-8 bg-muted/20 border border-border">
					<div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
						<div className="w-20 h-20 bg-muted border border-border flex items-center justify-center text-3xl font-bold">
							{service.company?.name?.charAt(0) || "S"}
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-foreground mb-2">
								{service.company?.name || "Professional Provider"}
							</h3>
							<div className="flex items-center gap-4 text-muted-foreground mb-4">
								<div className="flex items-center gap-1.5">
									<RiMapPinLine className="w-4 h-4" />
									<span className="text-xs font-medium">
										Kigali, Rwanda
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<RiBriefcaseLine className="w-4 h-4" />
									<span className="text-xs font-medium">
										Verified Completed Jobs
									</span>
								</div>
							</div>
							<p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
								"Professional construction solutions across Rwanda."
							</p>
						</div>
					</div>
				</section>
			</div>
		);
	}

	if (activeTab === "reviews") {
		return (
			<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-border">
					<div className="space-y-1">
						<h3 className="text-lg font-semibold text-foreground tracking-tight">
							Reviews
						</h3>
						<p className="text-sm text-muted-foreground">
							Feedback from verified customers
						</p>
					</div>
					<div className="w-full sm:w-auto">
						<AddReviewDialog serviceId={service.id} />
					</div>
				</div>

				<ReviewList serviceId={service.id} />
			</div>
		);
	}

	return (
		<div className="py-20 text-center animate-in fade-in duration-500">
			<RiFileTextLine className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
			<span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
				Section Under Development
			</span>
		</div>
	);
};
