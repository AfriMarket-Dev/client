import type React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ProductInquiryModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	productName: string;
	messageText: string;
	setMessageText: (text: string) => void;
	onSubmit: () => void;
}

export const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({
	isOpen,
	onOpenChange,
	productName,
	messageText,
	setMessageText,
	onSubmit,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md rounded-none border-border">
				<DialogHeader>
					<DialogTitle className="font-heading uppercase tracking-[0.2em] text-xs font-black">
						Material Inquiry
					</DialogTitle>
				</DialogHeader>
				<p className="mb-6 text-sm text-muted-foreground leading-relaxed">
					Initiate a professional inquiry regarding &quot;{productName}
					&quot;. Technical responses are typically generated within 2 hours.
				</p>
				<Textarea
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					placeholder="Describe your requirements or volume needs..."
					className="min-h-32 rounded-none border-border bg-muted/5 p-4 resize-none focus-visible:ring-1 focus-visible:ring-primary text-sm"
				/>
				<div className="mt-6 flex justify-end gap-3">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="rounded-none text-[10px] uppercase font-black tracking-widest h-11 px-6"
					>
						Cancel
					</Button>
					<Button
						className="rounded-none text-[10px] uppercase font-black tracking-widest h-11 px-8 bg-primary text-white"
						disabled={!messageText.trim()}
						onClick={onSubmit}
					>
						Submit Inquiry
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
