import {
	RiArrowRightLine,
	RiChat1Line,
	RiFileTextLine,
	RiSettingsLine,
	RiStarLine,
} from "@remixicon/react";
import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useCreateReviewMutation } from "@/app/api/reviews";
import { useGetConversationsQuery } from "@/app/api/messages";
import { useGetWishlistQuery } from "@/app/api/wishlist";
import type { RootState } from "@/app/store";
import { ReviewModal } from "@/components/common/review-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UserDashboard: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: wishlist = [], isLoading: loadingWishlist } = useGetWishlistQuery();
	const { data: conversations = [], isLoading: loadingConversations } =
		useGetConversationsQuery();
	const [reviewModalOpen, setReviewModalOpen] = useState(false);
	const [createReview] = useCreateReviewMutation();
	const [selectedItem, setSelectedItem] = useState<{
		provider: string;
		item: string;
		listingId?: string;
		companyId?: string;
	} | null>(
		null,
	);

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			<div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
				<div>
					<Badge className="mb-3 border-none bg-primary/10 text-xs font-heading font-bold uppercase tracking-wider text-primary">
						Buyer Dashboard
					</Badge>
					<h1 className="text-3xl font-heading font-bold text-foreground">
						Muraho, {user?.name?.split(" ")[0] || "Buyer"}
					</h1>
					<p className="mt-2 text-muted-foreground">Track your saved listings and supplier conversations.</p>
				</div>
				<div className="flex gap-3">
					<Button size="lg" className="h-11 rounded-sm font-heading font-bold uppercase tracking-wider">
						<RiFileTextLine className="mr-2 h-5 w-5" /> New Request
					</Button>
					<Button size="lg" variant="outline" className="h-11 w-11 rounded-sm border border-border p-0">
						<RiSettingsLine className="h-5 w-5" />
					</Button>
				</div>
			</div>

			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card className="rounded-sm border border-border shadow-none">
					<CardContent className="p-5">
						<p className="text-xs uppercase tracking-wider text-muted-foreground">Saved Listings</p>
						<p className="mt-2 text-3xl font-heading font-black text-primary">{wishlist.length}</p>
					</CardContent>
				</Card>
				<Card className="rounded-sm border border-border shadow-none">
					<CardContent className="p-5">
						<p className="text-xs uppercase tracking-wider text-muted-foreground">Conversations</p>
						<p className="mt-2 text-3xl font-heading font-black text-foreground">{conversations.length}</p>
					</CardContent>
				</Card>
				<Card className="rounded-sm border border-border shadow-none">
					<CardContent className="p-5">
						<p className="text-xs uppercase tracking-wider text-muted-foreground">Unread</p>
						<p className="mt-2 text-3xl font-heading font-black text-foreground">
							{conversations.filter((c) => !!c.lastMessage).length}
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div className="space-y-4 lg:col-span-2">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-heading font-bold text-foreground">Saved Listings</h2>
					</div>

					{loadingWishlist ? (
						<Card className="rounded-sm border border-border"><CardContent className="p-6 text-muted-foreground">Loading saved listings...</CardContent></Card>
					) : wishlist.length === 0 ? (
						<Card className="rounded-sm border border-dashed border-border"><CardContent className="p-8 text-center text-muted-foreground">No saved listings yet.</CardContent></Card>
					) : (
						wishlist.slice(0, 6).map((listing: any) => (
							<Card key={listing.id} className="rounded-sm border border-border shadow-none">
								<CardContent className="p-5">
									<div className="flex items-start justify-between gap-4">
										<div>
											<p className="text-xs uppercase tracking-wider text-muted-foreground">{listing.category?.name ?? "Listing"}</p>
											<h3 className="mt-1 text-lg font-heading font-bold text-foreground">{listing.name}</h3>
											<p className="text-sm text-primary">RWF {(listing.variants?.[0]?.price ?? 0).toLocaleString()}</p>
										</div>
										<Button
											variant="outline"
											onClick={() => {
												setSelectedItem({
													provider: listing.company?.name ?? "Supplier",
													item: listing.name,
													listingId: listing.id,
													companyId: listing.company?.id,
												});
												setReviewModalOpen(true);
											}}
										>
											<RiStarLine className="mr-2 h-4 w-4" /> Review
										</Button>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>

				<div className="space-y-4">
					<h2 className="text-xl font-heading font-bold text-foreground">Messages</h2>
					<Card className="rounded-sm border border-border">
						<CardContent className="p-5">
							{loadingConversations ? (
								<p className="text-sm text-muted-foreground">Loading conversations...</p>
							) : conversations.length === 0 ? (
								<p className="text-sm text-muted-foreground">No conversations yet.</p>
							) : (
								<ul className="space-y-3">
									{conversations.slice(0, 5).map((conversation) => (
										<li key={conversation.partner.id} className="flex items-center justify-between gap-3 rounded-sm border border-border p-3">
											<div className="min-w-0">
												<p className="truncate text-sm font-medium text-foreground">{conversation.partner.name}</p>
												<p className="truncate text-xs text-muted-foreground">{conversation.lastMessage}</p>
											</div>
											<RiArrowRightLine className="h-4 w-4 shrink-0 text-muted-foreground" />
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
					<Card className="rounded-sm border border-border bg-muted/30">
						<CardContent className="p-5 text-sm text-muted-foreground">
							<RiChat1Line className="mb-2 h-5 w-5 text-primary" />
							Keep negotiations and delivery details inside platform messages for traceability.
						</CardContent>
					</Card>
				</div>
			</div>

			<ReviewModal
				isOpen={reviewModalOpen}
				onClose={() => setReviewModalOpen(false)}
				onSubmit={async ({ rating, comment }) => {
					if (!selectedItem?.listingId && !selectedItem?.companyId) {
						toast.error("Unable to attach review target.");
						return;
					}
					await createReview({
						rating,
						comment,
						listingId: selectedItem?.listingId,
						companyId: selectedItem?.companyId,
					}).unwrap();
					toast.success("Review submitted.");
				}}
				itemName={selectedItem?.item || "Item"}
				providerName={selectedItem?.provider || "Provider"}
			/>
		</div>
	);
};

export default UserDashboard;
