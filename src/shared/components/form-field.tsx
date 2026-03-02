import type React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
	label?: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
	required?: boolean;
	headerActions?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
	label,
	error,
	children,
	className,
	required,
	headerActions,
}) => {
	return (
		<div className={cn("space-y-2", className)}>
			{label && (
				<div className="flex items-center justify-between mb-1">
					<Label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
						{label}
						{required && <span className="text-destructive">*</span>}
					</Label>
					{headerActions}
				</div>
			)}
			{children}
			{error && (
				<p className="text-[9px] font-bold text-destructive uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
					{error}
				</p>
			)}
		</div>
	);
};
