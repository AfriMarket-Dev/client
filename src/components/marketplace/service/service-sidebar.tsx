import { RiShieldCheckLine, RiStarFill } from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import type { Service } from "./types";

interface ServiceSidebarProps {
	service: Service;
	onViewBio: () => void;
}

export const ServiceSidebar: React.FC<ServiceSidebarProps> = ({
	service,
	onViewBio,
}) => {
	return (
		<div className="lg:col-span-4 space-y-8 sticky top-24">
			{/* Provider ID Card */}
			<div className="border border-border bg-background rounded-none relative overflow-hidden group">
				<div className="p-8">
					<h3 className="text-[9px] font-heading font-black uppercase text-muted-foreground mb-8 tracking-[0.4em] flex justify-between items-center">
						<span>Verification Profile</span>
						<span className="text-primary flex items-center gap-1.5">
							<div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
							LIVE
						</span>
					</h3>

					<div className="flex items-center gap-6 mb-10">
						<div className="w-20 h-20 bg-muted border border-border rounded-none flex items-center justify-center text-3xl font-display font-black text-foreground relative group-hover:scale-105 transition-transform duration-500">
							<div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 translate-y-1" />
							{service.provider.fullName.charAt(0)}
						</div>
						<div className="space-y-1">
							<h4 className="font-display font-black text-2xl uppercase tracking-tighter text-foreground leading-[0.85]">
								{service.provider.fullName}
							</h4>
							<p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
								{service.provider.role}
							</p>
							<div className="flex items-center gap-1 mt-3">
								<RiStarFill className="w-3 h-3 text-primary" />
								<span className="text-xs font-bold font-heading">
									{service.provider.rating}
								</span>
								<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest ml-1">
									(203 Jobs)
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-px bg-border mb-8">
						<div className="bg-background p-4">
							<span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
								Tenure
							</span>
							<span className="block text-sm font-bold font-heading">
								{service.provider.experience}
							</span>
						</div>
						<div className="bg-background p-4">
							<span className="block text-[8px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-2">
								Response
							</span>
							<span className="block text-sm font-bold font-heading text-emerald-600">
								2H FAST
							</span>
						</div>
					</div>

					<Button
						variant="outline"
						className="w-full rounded-none border-border h-12 font-heading font-black uppercase tracking-[0.3em] text-[9px] hover:bg-foreground hover:text-background transition-colors"
						onClick={onViewBio}
					>
						View Professional Bio
					</Button>
				</div>
			</div>

			{/* Security Badge */}
			<div className="bg-foreground text-background p-8 rounded-none relative overflow-hidden group">
				<div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 -mr-8 -mt-8 rotate-45" />
				<RiShieldCheckLine className="w-8 h-8 opacity-20 mb-6" />
				<h4 className="font-display font-black text-lg uppercase tracking-tight mb-3">
					Elite Standard Guarantee
				</h4>
				<p className="text-xs text-background/60 leading-relaxed font-medium">
					Enterprise-grade vetting. Quality assurance protocols strictly
					enforced for every engagement.
				</p>
			</div>
		</div>
	);
};
