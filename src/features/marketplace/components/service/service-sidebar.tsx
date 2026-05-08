import { RiShareForwardLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn, shareContent } from "@/lib/utils";
import { ContactActions } from "@/shared/components/contact-actions";
import type { Service } from "@/types";

interface ServiceSidebarProps {
	service: Service;
	onViewBio: () => void;
}

export const ServiceSidebar: React.FC<ServiceSidebarProps> = ({
	service,
	onViewBio,
}) => {
	const handleShare = () => {
		shareContent({
			title: service.name || "Service",
			text: `Check out this service: ${service.name}`,
			url: window.location.href,
		});
	};

	return (
		<div className="space-y-6">
			{/* Seller Card */}
			<div className="border border-border bg-muted/5 p-6 space-y-5">
				<div className="flex items-center justify-between pb-3 border-b border-border">
					<span className="text-sm font-semibold text-foreground">
						Seller
					</span>
					<span className="text-primary flex items-center gap-1.5 text-xs font-medium">
						<div className="w-1.5 h-1.5 bg-primary rounded-full" />
						Active
					</span>
				</div>

				<div className="flex items-start gap-4">
					<div className="w-12 h-12 bg-muted rounded-none flex items-center justify-center text-lg font-bold text-foreground shrink-0">
						{service.company?.name?.charAt(0) ?? "S"}
					</div>
					<div className="space-y-0.5 min-w-0">
						<h4 className="font-semibold text-base text-foreground tracking-tight truncate">
							{service.company?.name ?? "Provider"}
						</h4>
						<p className="text-xs text-muted-foreground">
							{service.company?.district ?? "Regional Provider"}
						</p>
					</div>
				</div>

				<div className="flex items-center justify-between py-3 border-y border-border">
					<span className="text-xs font-medium text-muted-foreground">
						Verification
					</span>
					<span
						className={cn(
							"text-xs font-semibold",
							service.company?.isVerified ? "text-emerald-600" : "text-amber-500",
						)}
					>
						{service.company?.isVerified ? "Verified" : "Pending"}
					</span>
				</div>

				<Button
					variant="outline"
					className="w-full rounded-none border-border h-10 text-sm font-medium shadow-none"
					onClick={onViewBio}
				>
					View Provider
				</Button>
			</div>

			{/* Contact & Share */}
			<div className="border border-border p-6 space-y-4">
				<span className="text-sm font-semibold text-foreground block">
					Contact
				</span>
				<ContactActions
					phone={service.company?.phone}
					whatsapp={service.company?.phone}
					email={service.company?.email}
					companyName={service.company?.name}
					companyId={service.company?.id}
					serviceId={service.id}
					className="w-full flex-col [&>button]:w-full [&>button]:rounded-none [&>button]:h-10 [&>button]:font-medium [&>button]:shadow-none"
				/>
				<Button
					variant="ghost"
					className="w-full rounded-none h-10 flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors shadow-none text-muted-foreground"
					onClick={handleShare}
				>
					<RiShareForwardLine className="w-4 h-4" />
					<span className="text-sm font-medium">Share</span>
				</Button>
			</div>
		</div>
	);
};
