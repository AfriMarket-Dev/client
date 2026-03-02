import {
	RiArrowRightLine,
	RiChat1Line,
	RiFileTextLine,
	RiHeartLine,
	RiMessage3Line,
	RiSettingsLine,
	RiStarLine,
} from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { handleRtkQueryError } from "@/lib/utils";
import { useGetConversationsQuery } from "@/services/api/messages";
import { useCreateReviewMutation } from "@/services/api/reviews";
import { useGetWishlistQuery } from "@/services/api/wishlist";
import { PageContainer, StatsGrid } from "@/shared/components";
import { ReviewModal } from "@/shared/components/review-modal";
import { ROUTES } from "@/shared/constants/routes";
import { formatCurrency } from "@/shared/utils/format";
import type { RootState } from "@/store";

export default function UserDashboard() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: wishlist = [], isLoading: loadingWishlist } =
		useGetWishlistQuery();
	const { data: conversations = [], isLoading: loadingConversations } =
		useGetConversationsQuery();
	const [reviewModalOpen, setReviewModalOpen] = useState(false);
	const [createReview] = useCreateReviewMutation();
	const [selectedItem, setSelectedItem] = useState<{
		provider: string;
		item: string;
		productId?: string;
		companyId?: string;
	} | null>(null);

	const unreadCount = useMemo(() => {
		return conversations.filter((c) => !!c.lastMessage).length;
	}, [conversations]);

	return (
		<PageContainer>
			{/* Header Section */}
			<div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center border-b border-border/40 pb-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<div className="w-8 h-px bg-primary" />
						<span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
							Buyer Portal
						</span>
					</div>
					<h1 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tighter leading-none">
						Muraho, {user?.name?.split(" ")[0] || "Partner"}
					</h1>
					<p className="mt-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
						Identity node active · Tracking {wishlist.length} supply links
					</p>
				</div>
				<div className="flex gap-3">
					<Link to={ROUTES.MARKETPLACE}>
						<Button
							size="lg"
							className="h-14 rounded-none font-display font-black uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-primary/20 border-none"
						>
							<RiFileTextLine className="mr-2 h-4 w-4" /> Material Scan
						</Button>
					</Link>
					<Link to={ROUTES.PROTECTED.PROFILE}>
						<Button
							size="lg"
							variant="outline"
							className="h-14 w-14 rounded-none border border-border/40 p-0 hover:bg-muted/5 transition-colors"
						>
							<RiSettingsLine className="h-5 w-5" />
						</Button>
					</Link>
				</div>
			</div>

			{/* Stats Grid */}
			<StatsGrid
				columns={3}
				className="gap-px bg-border/40 border border-border/40 overflow-hidden shadow-sm"
			>
				<div className="bg-background p-8 group hover:bg-muted/5 transition-colors">
					<div className="flex items-center gap-2 mb-4">
						<RiHeartLine
							size={16}
							className="text-primary opacity-40 group-hover:opacity-100 transition-opacity"
						/>
						<span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em]">
							Saved Nodes
						</span>
					</div>
					<p className="text-5xl font-display font-black text-foreground tracking-tighter">
						{wishlist.length}
					</p>
				</div>
				<div className="bg-background p-8 group hover:bg-muted/5 transition-colors">
					<div className="flex items-center gap-2 mb-4">
						<RiMessage3Line
							size={16}
							className="text-primary opacity-40 group-hover:opacity-100 transition-opacity"
						/>
						<span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em]">
							Active Links
						</span>
					</div>
					<p className="text-5xl font-display font-black text-foreground tracking-tighter">
						{conversations.length}
					</p>
				</div>
				<div className="bg-background p-8 group hover:bg-muted/5 transition-colors">
					<div className="flex items-center gap-2 mb-4">
						<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
						<span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em]">
							Unread Streams
						</span>
					</div>
					<p className="text-5xl font-display font-black text-primary tracking-tighter">
						{unreadCount}
					</p>
				</div>
			</StatsGrid>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
				{/* Saved Listings */}
				<div className="space-y-8 lg:col-span-8">
					<div className="flex items-center gap-4">
						<h2 className="text-xl font-display font-black text-foreground uppercase tracking-tight">
							Operational Inventory
						</h2>
						<div className="flex-1 h-px bg-border/40" />
					</div>

					<div className="grid gap-4">
						{loadingWishlist ? (
							<div className="py-20 flex flex-col items-center justify-center border border-dashed border-border/40 bg-muted/5">
								<Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
							</div>
						) : wishlist.length === 0 ? (
							<div className="py-24 text-center border border-dashed border-border/40 bg-muted/5 flex flex-col items-center justify-center">
								<RiHeartLine className="w-12 h-12 text-muted-foreground/20 mb-4" />
								<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
									No Saved Procurement Nodes
								</p>
							</div>
						) : (
							wishlist.slice(0, 6).map((item) => {
								const listing = item as any; // Cast safely for usage below
								const isProduct =
									listing.type === "product" || listing.itemType === "PRODUCT";
								const price =
									"price" in listing
										? listing.price
										: "variants" in listing
											? (listing.variants?.[0]?.price ?? 0)
											: 0;

								return (
									<div
										key={listing.id}
										className="rounded-none border border-border/40 bg-background hover:border-primary/20 transition-all p-6 group relative overflow-hidden"
									>
										<div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-primary transition-all duration-500" />
										<div className="flex items-start justify-between gap-6">
											<div className="min-w-0">
												<p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2 text-left">
													{listing.category?.name ?? "General Material"}
												</p>
												<h3 className="text-lg font-display font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1 text-left">
													{listing.name}
												</h3>
												<div className="flex items-center gap-4 mt-3">
													<p className="text-sm font-black tracking-tight text-foreground/80 font-mono">
														{formatCurrency(price)}
													</p>
													<div className="w-1 h-1 rounded-full bg-border" />
													<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">
														{listing.company?.name || "Verified Provider"}
													</p>
												</div>
											</div>
											<div className="flex gap-2">
												<Link
													to={
														(isProduct
															? ROUTES.PUBLIC.PRODUCT(listing.id)
															: ROUTES.PUBLIC.SERVICE(listing.id)) as any
													}
												>
													<Button
														variant="outline"
														size="sm"
														className="h-9 rounded-none text-[9px] font-black uppercase tracking-widest border-border/40"
													>
														View Node
													</Button>
												</Link>
												<Button
													variant="outline"
													size="sm"
													className="h-9 rounded-none text-[9px] font-black uppercase tracking-widest border-border/40 hover:border-amber-500/40 hover:text-amber-600"
													onClick={() => {
														setSelectedItem({
															provider: listing.company?.name ?? "Supplier",
															item: listing.name,
															productId: isProduct ? listing.id : undefined,
															companyId: listing.company?.id,
														});
														setReviewModalOpen(true);
													}}
												>
													<RiStarLine className="mr-1.5 h-3.5 w-3.5" /> Log
													Report
												</Button>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>

				{/* Sidebar: Messages & Advice */}
				<div className="space-y-10 lg:col-span-4">
					<div className="space-y-6">
						<h2 className="text-xl font-display font-black text-foreground uppercase tracking-tight">
							Direct Transmissions
						</h2>
						<div className="rounded-none border border-border/40 bg-background overflow-hidden">
							{loadingConversations ? (
								<div className="p-8 flex justify-center">
									<Loader2 className="w-6 h-6 animate-spin text-primary opacity-20" />
								</div>
							) : conversations.length === 0 ? (
								<div className="p-12 text-center text-muted-foreground uppercase text-[10px] font-black tracking-widest">
									No Active Channels
								</div>
							) : (
								<div className="divide-y divide-border/40">
									{conversations.slice(0, 5).map((conversation) => (
										<Link
											key={conversation.partner.id}
											to={ROUTES.PROTECTED.MESSAGES}
											className="flex items-center justify-between gap-4 p-5 hover:bg-muted/5 transition-all group"
										>
											<div className="min-w-0">
												<p className="truncate text-[11px] font-black text-foreground uppercase tracking-tight mb-1 group-hover:text-primary transition-colors text-left">
													{conversation.partner.name}
												</p>
												<p className="truncate text-[10px] font-medium text-muted-foreground italic line-clamp-1 text-left">
													"{conversation.lastMessage}"
												</p>
											</div>
											<RiArrowRightLine className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
										</Link>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="rounded-none border border-border/40 bg-muted/10 p-8 relative overflow-hidden">
						<div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
						<RiChat1Line className="mb-6 h-8 w-8 text-primary opacity-40" />
						<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-3 text-left">
							Transmission Protocol
						</h4>
						<p className="text-[11px] text-muted-foreground font-medium uppercase leading-relaxed tracking-wider text-left">
							Ensure all material negotiations and delivery parameters are
							logged within platform channels for network traceability and
							secure escrow.
						</p>
					</div>
				</div>
			</div>

			<ReviewModal
				isOpen={reviewModalOpen}
				onClose={() => setReviewModalOpen(false)}
				onSubmit={async ({
					rating,
					comment,
				}: {
					rating: number;
					comment: string;
				}) => {
					if (!selectedItem?.productId && !selectedItem?.companyId) {
						toast.error("Unable to attach report target.");
						return;
					}
					try {
						await createReview({
							rating,
							comment,
							productId: selectedItem?.productId,
							companyId: selectedItem?.companyId,
						}).unwrap();
						toast.success("Field report broadcasted successfully.");
					} catch (err) {
						handleRtkQueryError(err, "Failed to broadcast report");
					}
				}}
				itemName={selectedItem?.item || "Asset"}
				providerName={selectedItem?.provider || "Supplier"}
			/>
		</PageContainer>
	);
}
