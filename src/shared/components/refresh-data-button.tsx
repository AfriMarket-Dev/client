import { RiRefreshLine } from "@remixicon/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { apiSlice } from "@/services/api/api-entry";
import { cn } from "@/lib/utils";

interface RefreshDataButtonProps {
	className?: string;
	variant?: "outline" | "ghost" | "default" | "secondary";
	showLabel?: boolean;
}

export function RefreshDataButton({ 
	className, 
	variant = "outline",
	showLabel = false 
}: RefreshDataButtonProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		const toastId = toast.loading("Syncing with server...");

		try {
			dispatch(apiSlice.util.resetApiState());

			dispatch(
				apiSlice.util.invalidateTags([
					"Products",
					"Services",
					"Providers",
					"Categories",
					"Stats",
					"Dashboard",
					"Session",
					"Users",
					"Auctions"
				])
			);

			await navigate({ to: ".", replace: true });

			toast.success("Cache purged and synchronized", { id: toastId });
		} catch (error) {
			console.error("Refresh failed:", error);
			toast.error("Failed to refresh data", { id: toastId });
		} finally {
			setIsRefreshing(false);
		}
	};

	return (
		<Button
			variant={variant}
			size={showLabel ? "default" : "icon"}
			onClick={handleRefresh}
			disabled={isRefreshing}
			className={cn(
				"rounded-none border-border/40 hover:bg-primary/5 hover:text-primary transition-all",
				className
			)}
			title="Sync with server"
		>
			<RiRefreshLine 
				className={cn(
					"w-4 h-4", 
					isRefreshing && "animate-spin text-primary",
					showLabel && "mr-2"
				)} 
			/>
			{showLabel && <span className="text-[10px] font-black uppercase tracking-widest">Sync Data</span>}
		</Button>
	);
}
