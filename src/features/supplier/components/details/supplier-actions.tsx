import {
	RiHeartLine,
	RiMessage2Line,
	RiPhoneLine,
	RiShareForwardLine,
	RiWhatsappLine,
} from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { shareContent } from "@/lib/utils";

interface SupplierActionsProps {
	company?: any;
	onContactClick: () => void;
	isMobile?: boolean;
}

export const SupplierActions: React.FC<SupplierActionsProps> = ({
	company,
	onContactClick,
	isMobile,
}) => {
	const phone = company?.phone || "";

	const handleShare = () => {
		shareContent({
			title: company?.name || "Verified Supplier",
			text: `Check out this supplier: ${company?.name}`,
			url: window.location.href,
		});
	};

	if (isMobile) {
		return (
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-4 py-2.5 z-50 flex flex-col gap-2 safe-area-bottom shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
				<div className="flex items-center gap-2 w-full">
					<div className="flex items-center gap-1.5 flex-1 overflow-hidden">
						{phone && (
							<button
								type="button"
								onClick={() => window.open(`tel:${phone}`, "_self")}
								className="flex-none w-11 h-11 flex items-center justify-center rounded-none bg-muted border border-border text-foreground active:bg-accent transition-colors"
							>
								<RiPhoneLine size={18} />
							</button>
						)}
						{phone && (
							<button
								type="button"
								onClick={() =>
									window.open(
										`https://wa.me/${phone.replace(/\D/g, "")}`,
										"_blank",
									)
								}
								className="flex-none w-11 h-11 flex items-center justify-center rounded-none bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
							>
								<RiWhatsappLine size={20} />
							</button>
						)}
						<Button
							variant="outline"
							size="icon"
							className="flex-none w-11 h-11 rounded-none border-border text-primary active:bg-primary/10 transition-colors"
							onClick={handleShare}
						>
							<RiShareForwardLine size={18} />
						</Button>
					</div>
					<Button
						size="lg"
						className="flex-none font-heading font-black uppercase tracking-widest text-[10px] h-11 px-6 rounded-none bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
						onClick={onContactClick}
					>
						Contact
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="items-center gap-4 pt-2 hidden md:flex">
			<Button
				size="lg"
				className="rounded-none h-12 font-heading font-black uppercase tracking-widest text-[10px] px-8 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300"
				onClick={onContactClick}
			>
				<RiMessage2Line size={16} className="mr-2" />
				Send Inquiry
			</Button>

			<div className="flex items-center gap-2">
				{phone && (
					<Button
						variant="outline"
						size="icon"
						className="h-12 w-12 rounded-none border-border hover:border-emerald-500 hover:text-emerald-600 transition-colors"
						onClick={() =>
							window.open(`https://wa.me/${phone.replace(/\D/g, "")}`, "_blank")
						}
						title="WhatsApp"
					>
						<RiWhatsappLine size={20} />
					</Button>
				)}
				<Button
					variant="outline"
					size="icon"
					className="h-12 w-12 rounded-none border-border hover:border-primary hover:text-primary transition-colors"
					onClick={handleShare}
					title="Share Profile"
				>
					<RiShareForwardLine size={20} />
				</Button>
				<Button
					size="lg"
					variant="outline"
					className="rounded-none h-12 font-heading font-black uppercase tracking-widest text-[10px] px-6 gap-2 border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
				>
					<RiHeartLine size={16} /> Save to Favorites
				</Button>
			</div>
		</div>
	);
};
