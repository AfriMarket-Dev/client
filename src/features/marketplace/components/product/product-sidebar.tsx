import { RiShareForwardLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn, shareContent } from "@/lib/utils";
import { ContactActions } from "@/shared/components/contact-actions";

interface ProductSidebarProps {
	company?: {
		id: string;
		name: string;
		district?: string;
		isVerified?: boolean;
		phone?: string;
		email?: string;
	};
	productName?: string;
	onProviderClick: (id: string) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
	company,
	productName,
	onProviderClick,
}) => {
	const handleShare = () => {
		shareContent({
			title: productName || "Product",
			text: `Check out this product: ${productName}`,
			url: window.location.href,
		});
	};

	return (
		<div className="space-y-6">
			{/* Seller Card — bordered card with subtle tint */}
			<div className="border border-border bg-muted/5 p-6 space-y-5">
				<div className="flex items-center justify-between pb-3 border-b border-border">
					<span className="text-sm font-semibold text-foreground">Seller</span>
					<span className="text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5 text-xs font-medium">
						<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
						Active
					</span>
				</div>

				<div className="flex items-start gap-4">
					<div className="w-12 h-12 rounded-none bg-muted text-foreground flex items-center justify-center text-lg font-bold shrink-0">
						{company?.name?.charAt(0) ?? "S"}
					</div>
					<div className="space-y-0.5 min-w-0">
						<h4 className="font-semibold text-base text-foreground tracking-tight truncate">
							{company?.name ?? "Seller"}
						</h4>
						<p className="text-xs text-muted-foreground">
							{company?.district ?? "Regional Provider"}
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
							company?.isVerified
								? "text-emerald-600 dark:text-emerald-500"
								: "text-amber-500",
						)}
					>
						{company?.isVerified ? "Verified" : "Pending"}
					</span>
				</div>

				<Button
					variant="outline"
					className="w-full rounded-none border-border h-10 text-sm font-medium shadow-none"
					onClick={() => company?.id && onProviderClick(company.id)}
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
					phone={company?.phone}
					whatsapp={company?.phone}
					email={company?.email}
					companyName={company?.name}
					companyId={company?.id}
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
