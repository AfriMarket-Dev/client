import { RiMessage2Line, RiShareForwardLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { shareContent } from "@/lib/utils";
import { ContactActions } from "@/shared/components/contact-actions";
import type { Company } from "@/types";

interface ProviderContactBarProps {
	company?: Company;
	onContactClick: () => void;
	isMobile?: boolean;
}

export const ProviderContactBar: React.FC<ProviderContactBarProps> = ({
	company,
	onContactClick,
	isMobile,
}) => {
	const phone = company?.phoneNumber || company?.phone || "";
	const whatsapp = company?.whatsappNumber || phone;

	const handleShare = () => {
		shareContent({
			title: company?.name || "Verified Provider",
			text: `Check out this provider: ${company?.name}`,
			url: window.location.href,
		});
	};

	if (isMobile) {
		return (
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 z-50 flex flex-col gap-3 safe-area-bottom shadow-[0_-8px_30px] shadow-foreground/10 animate-in slide-in-from-bottom duration-500">
				<div className="flex items-center gap-2 w-full">
					<div className="flex-1 overflow-hidden">
						<ContactActions
							phone={phone}
							whatsapp={whatsapp}
							email={company?.email}
							companyName={company?.name}
							companyId={company?.id}
							size="sm"
							className="!flex-nowrap overflow-x-auto no-scrollbar pb-1"
						/>
					</div>
					<Button
						variant="outline"
						size="icon"
						className="flex-none w-11 h-11 rounded-none border-border text-foreground hover:bg-muted/50 transition-colors"
						onClick={handleShare}
					>
						<RiShareForwardLine size={18} />
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border/40 mt-4">
			<div className="flex flex-wrap items-center gap-3">
				<ContactActions
					phone={phone}
					whatsapp={whatsapp}
					email={company?.email}
					companyName={company?.name}
					companyId={company?.id}
				/>
				<Button
					variant="outline"
					size="icon"
					className="h-11 w-11 rounded-none border-border hover:bg-muted/50 transition-colors"
					onClick={handleShare}
					title="Share Profile"
				>
					<RiShareForwardLine size={20} />
				</Button>
			</div>

			<div className="hidden lg:flex items-center gap-4 ml-auto">
				<div className="h-8 w-px bg-border/40" />
				<Button
					variant="ghost"
					size="sm"
					className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors h-11"
					onClick={onContactClick}
				>
					<RiMessage2Line size={14} className="mr-2" />
					Submit Inquiry
				</Button>
			</div>
		</div>
	);
};
