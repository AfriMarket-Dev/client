import { RiMessage2Line, RiShareForwardLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { shareContent } from "@/lib/utils";
import { ContactActions } from "@/shared/components/contact-actions";
import type { CompanyRef } from "@/types";

interface ProviderContactBarProps {
	company?: CompanyRef;
	onContactClick: () => void;
	isMobile?: boolean;
}

export const ProviderContactBar: React.FC<ProviderContactBarProps> = ({
	company,
	onContactClick,
	isMobile,
}) => {
	const phone = company?.phone || "";
	const handleShare = () => {
		shareContent({
			title: company?.name || "Verified Provider",
			text: `Check out this provider: ${company?.name}`,
			url: window.location.href,
		});
	};

	if (isMobile) {
		return (
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-4 py-2.5 z-50 flex flex-col gap-2 safe-area-bottom shadow-[0_-8px_30px] shadow-foreground/10">
				<div className="flex items-center gap-2 w-full">
					<div className="flex items-center gap-1.5 flex-1 overflow-hidden">
						<ContactActions
							phone={phone}
							whatsapp={phone}
							email={company?.email}
							companyName={company?.name}
							companyId={company?.id}
							size="sm"
						/>
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
						className="flex-none font-semibold h-11 px-6 rounded-none shadow-none transition-all duration-300"
						onClick={onContactClick}
					>
						Contact
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="items-center gap-3 pt-2 hidden md:flex">
			<Button
				size="lg"
				className="rounded-none h-12 font-semibold px-8 shadow-none transition-all duration-300"
				onClick={onContactClick}
			>
				<RiMessage2Line size={16} className="mr-2" />
				Send Inquiry
			</Button>
			<div className="flex items-center gap-2">
				<ContactActions
					phone={phone}
					whatsapp={phone}
					email={company?.email}
					companyName={company?.name}
					companyId={company?.id}
				/>
				<Button
					variant="outline"
					size="icon"
					className="h-12 w-12 rounded-none border-border hover:border-primary hover:text-primary transition-colors"
					onClick={handleShare}
					title="Share Profile"
				>
					<RiShareForwardLine size={20} />
				</Button>
			</div>
		</div>
	);
};
