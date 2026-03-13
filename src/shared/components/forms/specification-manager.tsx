import { RiAddLine, RiDeleteBinLine, RiSettings4Line } from "@remixicon/react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SpecificationManagerProps {
	value: Record<string, string>;
	onChange: (value: Record<string, string>) => void;
	label?: string;
}

export const SpecificationManager: React.FC<SpecificationManagerProps> = ({
	value,
	onChange,
	label = "Specifications",
}) => {
	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");

	const handleAdd = () => {
		if (newKey.trim() && newValue.trim()) {
			onChange({
				...value,
				[newKey.trim()]: newValue.trim(),
			});
			setNewKey("");
			setNewValue("");
		}
	};

	const handleRemove = (key: string) => {
		const next = { ...value };
		delete next[key];
		onChange(next);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3 p-5 bg-muted/10 border border-border/10 rounded-none relative overflow-hidden group">
				<div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none" />
				<div className="flex items-center gap-2 mb-1 relative z-10">
					<RiSettings4Line className="size-3.5 text-primary" />
					<label className="text-[10px] font-black uppercase tracking-widest text-foreground/80">
						Add {label}
					</label>
				</div>
				<div className="flex gap-2 relative z-10">
					<Input
						placeholder="Attribute (e.g. Brand)"
						value={newKey}
						onChange={(e) => setNewKey(e.target.value)}
						className="h-10 text-[11px] font-bold uppercase tracking-wider rounded-none border-border/40 bg-background focus:border-primary/40 focus:ring-0"
					/>
					<Input
						placeholder="Value (e.g. Samsung)"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						className="h-10 text-[11px] font-bold uppercase tracking-wider rounded-none border-border/40 bg-background focus:border-primary/40 focus:ring-0"
					/>
					<Button
						type="button"
						size="icon"
						variant="outline"
						className="h-10 w-10 shrink-0 rounded-none border-border/40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
						onClick={handleAdd}
					>
						<RiAddLine className="size-4" />
					</Button>
				</div>
			</div>

			{Object.keys(value || {}).length > 0 && (
				<div className="grid grid-cols-1 gap-1 border border-border/5 p-1 bg-muted/5 rounded-none">
					{Object.entries(value).map(([k, v]) => (
						<div
							key={k}
							className="flex items-center justify-between group py-2.5 px-4 hover:bg-muted/20 transition-colors border-b last:border-0 border-border/5"
						>
							<div className="flex items-center gap-4">
								<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 w-28 truncate">
									{k}
								</span>
								<span className="text-[11px] font-bold text-foreground uppercase tracking-tight">
									{v}
								</span>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-7 w-7 text-destructive/40 hover:text-destructive hover:bg-destructive/5 rounded-none transition-all"
								onClick={() => handleRemove(k)}
							>
								<RiDeleteBinLine className="size-3.5" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
