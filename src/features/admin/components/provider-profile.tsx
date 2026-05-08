import {
	RiAddLine,
	RiCalendarLine,
	RiDeleteBinLine,
	RiEditLine,
	RiMapPinLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/shared/components/admin/card";
import { formatDate } from "@/shared/utils/format";
import type { Company } from "@/types";

interface ProviderProfileProps {
	company: Company;
	onSuspendClick: () => void;
	onDeleteClick: () => void;
}

export function ProviderProfile({
	company,
	onSuspendClick,
	onDeleteClick,
}: ProviderProfileProps) {
	const navigate = useNavigate();

	return (
		<Card>
			<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
				<div className="flex items-start gap-5">
					<div className="flex h-16 w-16 items-center justify-center rounded-none bg-primary text-2xl font-bold text-primary-foreground border border-primary shrink-0">
						{company.name.charAt(0)}
					</div>
					<div className="space-y-3">
						<div className="space-y-1">
							<h1 className="text-2xl font-bold text-foreground leading-none">
								{company.name}
							</h1>
							<div className="flex flex-wrap items-center gap-2">
								<Badge
									variant={company.isVerified ? "success" : "warning"}
									className="uppercase text-[9px] font-bold tracking-widest rounded-none px-2 py-0.5"
								>
									{company.isVerified ? "Verified" : "Pending verification"}
								</Badge>
								<Badge
									variant={company.isActive ? "default" : "secondary"}
									className="uppercase text-[9px] font-bold tracking-widest rounded-none px-2 py-0.5"
								>
									{company.isActive ? "Active" : "Inactive"}
								</Badge>
							</div>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
							{company.description || "No description provided."}
						</p>
						<div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
							<span className="flex items-center gap-1.5">
								<RiMapPinLine size={14} className="text-primary" />
								{[company.district, company.province]
									.filter(Boolean)
									.join(", ") || "-"}
							</span>
							<span className="flex items-center gap-1.5">
								<RiCalendarLine size={14} className="text-primary" />
								Joined {formatDate(company.createdAt)}
							</span>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-2 pt-2 md:pt-0">
					<Button
						variant="outline"
						onClick={() => {}}
						className="h-10 rounded-none font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						<RiAddLine size={14} className="mr-2" /> Product
					</Button>
					<Button
						variant="outline"
						onClick={() => {}}
						className="h-10 rounded-none font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						<RiAddLine size={14} className="mr-2" /> Service
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							navigate({
								to: "/admin/providers/$providerId/edit",
								params: { providerId: company.id },
							})
						}
						className="h-10 rounded-none font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						<RiEditLine size={14} className="mr-2" /> Edit
					</Button>
					<Button
						onClick={onSuspendClick}
						className="h-10 rounded-none bg-warning text-warning-foreground hover:bg-warning/90 font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						Suspend
					</Button>
					<Button
						onClick={onDeleteClick}
						className="h-10 rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold uppercase text-[10px] tracking-widest px-4 shadow-none"
					>
						<RiDeleteBinLine size={14} className="mr-2" /> Delete
					</Button>
				</div>
			</div>
		</Card>
	);
}
