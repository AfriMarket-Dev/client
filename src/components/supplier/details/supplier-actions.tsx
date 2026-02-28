import { Heart, MessageCircle, MessageSquare, Phone } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

interface SupplierActionsProps {
	onContactClick: () => void;
	isMobile?: boolean;
}

export const SupplierActions: React.FC<SupplierActionsProps> = ({
	onContactClick,
	isMobile,
}) => {
	if (isMobile) {
		return (
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-3 py-2 z-50 flex items-center gap-1.5 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
				<a
					href="#"
					className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-muted border border-border text-foreground active:bg-accent transition-colors"
				>
					<Phone className="w-4 h-4" />
				</a>
				<a
					href="#"
					className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
				>
					<MessageCircle className="w-5 h-5" />
				</a>
				<Button
					variant="outline"
					size="lg"
					className="flex-1 font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none border-primary text-primary"
					onClick={onContactClick}
				>
					<MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Message
				</Button>
				<Button
					size="lg"
					className="flex-[1.5] font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none"
					onClick={onContactClick}
				>
					Inquire
				</Button>
			</div>
		);
	}

	return (
		<div className="items-center gap-4 pt-2 hidden md:flex">
			<Button
				size="lg"
				className="rounded-none h-12 font-heading font-bold uppercase tracking-widest text-xs px-8"
				onClick={onContactClick}
			>
				Send Inquiry
			</Button>
			<Button
				size="lg"
				variant="outline"
				className="rounded-none h-12 font-heading font-bold uppercase tracking-widest text-xs px-6 gap-2"
			>
				<Heart className="w-4 h-4" /> Add to Favorites
			</Button>
		</div>
	);
};
