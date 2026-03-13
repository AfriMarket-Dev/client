import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuctionForm } from "@/features/forms/components/auction-form";
import { getErrorFromRtkQuery } from "@/lib/utils";
import { useCreateAuctionMutation } from "@/services/api/auctions";
import { useGetMyCompanyQuery } from "@/services/api/companies";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";

export function NewAuctionPage() {
	const navigate = useNavigate();
	const { data: company } = useGetMyCompanyQuery();
	const [createAuction, { isLoading, error }] = useCreateAuctionMutation();

	const handleSubmit = async (values: any) => {
		if (!company?.id) {
			toast.error("Company not found. Ensure you are linked to a company.");
			return;
		}

		try {
			await createAuction({
				...values,
				companyId: company.id,
			}).unwrap();
			toast.success(
				"Auction created successfully and is pending admin approval.",
			);
			navigate({ to: "/dashboard/auctions" });
		} catch (err) {
			console.error(err);
		}
	};

	const serverError = getErrorFromRtkQuery(error);

	return (
		<div className="p-8 max-w-[1800px] mx-auto">
			<div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					<h1 className="text-3xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
						Create New Auction
					</h1>
					<p className="text-muted-foreground text-sm font-medium">
						List a batch of goods for live bidding.
					</p>
				</div>
				<Button
					variant="ghost"
					onClick={() => navigate({ to: "/dashboard/auctions" })}
					className="gap-2 font-heading font-black uppercase text-[10px] tracking-[0.2em] rounded-none hover:bg-muted/50 border border-border/20 h-11 px-6"
				>
					<RiArrowLeftLine className="size-4" />
					Back to Auctions
				</Button>
			</div>

			<div className="max-w-2xl bg-card border border-border/50 p-8 shadow-sm rounded-none mx-auto md:mx-0">
				<AuctionForm
					onSubmit={handleSubmit}
					onCancel={() => navigate({ to: "/dashboard/auctions" })}
					isLoading={isLoading}
					serverError={serverError}
				/>
			</div>
		</div>
	);
}
