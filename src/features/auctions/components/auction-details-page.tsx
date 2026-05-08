import {
	RiAuctionLine,
	RiCalendarEventLine,
	RiHistoryLine,
	RiMoneyDollarCircleLine,
	RiStore2Line,
} from "@remixicon/react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { useGetAuctionByIdQuery } from "@/services/api/auctions";
import { ContactActions } from "@/shared/components/contact-actions";
import { DetailsPageLayout } from "@/shared/components/layouts/details-page-layout";
import { DetailPageSkeleton } from "@/shared/components/skeletons";
import { SpecificationList } from "@/shared/components/specification-list";
import { formatDateTime } from "@/shared/utils/format";
import { PlaceBidModal } from "./place-bid-modal";

export function AuctionDetailsPage() {
	const navigate = useNavigate();
	const { auctionId } = useParams({ from: "/_main/auctions/$auctionId" });
	const { data: auction, isLoading } = useGetAuctionByIdQuery(auctionId);
	const [isBidModalOpen, setIsBidModalOpen] = useState(false);
	const [currentImageIdx, setCurrentImageIdx] = useState(0);

	if (isLoading) {
		return <DetailPageSkeleton />;
	}

	if (!auction) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center p-6">
				<Empty className="max-w-md w-full border-y border-border rounded-none shadow-none py-12">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<RiAuctionLine className="w-8 h-8 text-muted-foreground" />
						</EmptyMedia>
						<EmptyTitle className="text-xl font-semibold tracking-tight">
							Auction Offline
						</EmptyTitle>
						<EmptyDescription className="text-sm text-muted-foreground">
							The requested auction terminal is currently unavailable or archived.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button
							onClick={() => navigate({ to: "/auctions" })}
							className="rounded-none h-12 px-8 font-medium shadow-none transition-all duration-300"
						>
							Return to Index
						</Button>
					</EmptyContent>
				</Empty>
			</div>
		);
	}

	const statusLabel = auction.status || "Listed";

	return (
		<DetailsPageLayout
			title={auction.title}
			badgeText={statusLabel}
			onBack={() => navigate({ to: "/auctions" })}
			gallery={
				<div className="flex flex-col md:flex-row gap-8 h-full">
					{/* Main Image Stage */}
					<div className="flex-1 aspect-square md:aspect-auto relative bg-muted/5 flex items-center justify-center overflow-hidden group">
						{auction.images && auction.images.length > 0 ? (
							<img
								src={auction.images[currentImageIdx] || auction.images[0]}
								alt={auction.title}
								className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
								onError={(e) => {
									e.currentTarget.src = "/image-fallback.svg";
								}}
							/>
						) : (
							<RiAuctionLine className="h-24 w-24 text-muted-foreground/20" />
						)}
						
						{/* Image Counter Badge */}
						<div className="absolute top-4 left-4">
							<Badge className="bg-background/80 backdrop-blur-sm text-foreground border-none rounded-none px-3 py-1 text-xs font-medium shadow-none">
								{currentImageIdx + 1} / {auction.images?.length || 1}
							</Badge>
						</div>
					</div>

					{auction.images && auction.images.length > 1 && (
						<div className="w-full md:w-28 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
							{auction.images.map((img: string, idx: number) => (
								<button
									key={idx}
									type="button"
									onClick={() => setCurrentImageIdx(idx)}
									className={cn(
										"flex-1 md:flex-none aspect-square w-20 md:w-full shrink-0 overflow-hidden rounded-none border transition-all duration-200 p-0 shadow-none",
										currentImageIdx === idx
											? "border-foreground bg-background opacity-100"
											: "border-transparent opacity-60 hover:opacity-100 hover:border-border"
									)}
								>
									<img
										src={img}
										alt={`${auction.title} ${idx + 1}`}
										className="size-full object-cover"
										onError={(e) => {
											e.currentTarget.src = "/image-fallback.svg";
										}}
									/>
								</button>
							))}
						</div>
					)}
				</div>
			}
			info={
				<div className="space-y-12">
					{/* Header Info */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="w-8 h-[2px] bg-primary/60" />
							<span className="text-xs font-medium text-muted-foreground">
								Auction
							</span>
						</div>
						<h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
							{auction.title}
						</h1>
						<div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
							<span>Terminal ID: {auction.id.slice(0, 8)}</span>
							<div className="w-1 h-1 rounded-full bg-foreground/20" />
							<span>Location: {auction.company?.district || "Kigali, RW"}</span>
						</div>
					</div>

					{/* Bid Section */}
					<div className="py-8 space-y-8 border-y border-border">
						<div className="relative z-10 flex flex-col gap-2">
							<span className="text-xs font-medium text-muted-foreground">
								Current Bid
							</span>
							<div className="flex items-baseline gap-2">
								<p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-none">
									{auction.startingPrice.toLocaleString()}
								</p>
								<span className="text-sm font-medium text-muted-foreground">RWF</span>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-border">
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
									<RiCalendarEventLine className="w-4 h-4" />
									<span>Opening Date</span>
								</div>
								<p className="text-sm font-semibold text-foreground">
									{formatDateTime(auction.startDate)}
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm font-medium text-destructive">
									<RiCalendarEventLine className="w-4 h-4" />
									<span>Closes</span>
								</div>
								<p className="text-sm font-semibold text-foreground">
									{formatDateTime(auction.endDate)}
								</p>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 gap-8 pt-4">
						<div className="flex flex-col gap-2">
							<span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
								<RiAuctionLine size={14} className="text-primary/70" />
								Active Bids
							</span>
							<span className="text-sm font-semibold text-foreground">
								{auction.bidsCount || 0} Entries
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
								<RiHistoryLine size={14} className="text-primary/70" />
								Views
							</span>
							<span className="text-sm font-semibold text-foreground">
								{auction.views || 0} Accesses
							</span>
						</div>
					</div>

					{/* Description */}
					<div className="space-y-4 pt-8">
						<h3 className="text-lg font-semibold text-foreground">
							Description
						</h3>
						<p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
							{auction.description || "Comprehensive documentation of the asset and its current condition within the industrial context."}
						</p>
					</div>
				</div>
			}
			tabs={
				<div className="space-y-8">
					<div className="flex items-center gap-6">
						<h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
							Specifications
						</h2>
						<div className="flex-1 h-px bg-border/30" />
					</div>
					<SpecificationList specifications={auction.specifications} />
				</div>
			}
			sidebar={
				<div className="space-y-12">
					{auction.company && (
						<div className="space-y-6">
							<div className="flex items-center justify-between border-b border-border pb-4">
								<span className="text-sm font-semibold text-foreground">
									Seller
								</span>
							</div>
							
							<div className="flex items-start gap-5">
								<div className="w-16 h-16 rounded-none bg-muted text-foreground flex items-center justify-center text-2xl font-bold border-none">
									<RiStore2Line className="h-6 w-6" />
								</div>
								<div className="space-y-1.5 pt-1 flex-1">
									<p className="text-xl font-semibold text-foreground tracking-tight">
										{auction.company.name}
									</p>
									<p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
										<div className="w-1.5 h-1.5 rounded-none bg-primary/70" />
										{auction.company.district || "Regional Vendor"}
									</p>
								</div>
							</div>

							<div className="space-y-4 pt-4">
								<ContactActions
									phone={auction.company.phone}
									whatsapp={auction.company.phone}
									email={auction.company.email}
									companyName={auction.company.name}
									companyId={auction.company.id}
									auctionId={auction.id}
									size="sm"
									className="w-full flex-col [&>button]:w-full [&>button]:rounded-none [&>button]:h-11 [&>button]:font-medium [&>button]:shadow-none"
								/>
								<Button
									variant="outline"
									className="w-full h-11 rounded-none font-medium shadow-none transition-all duration-300"
									onClick={() =>
										navigate({
											to: "/providers/$providerId",
											params: { providerId: auction.company.id },
										})
									}
								>
									View Provider
								</Button>
							</div>
						</div>
					)}

					<div className="pt-6 border-t border-border">
						<Button
							onClick={() => setIsBidModalOpen(true)}
							className="w-full h-14 rounded-none font-semibold text-base shadow-none transition-all duration-300"
						>
							<RiMoneyDollarCircleLine className="mr-3 h-5 w-5" />
							Place Bid
						</Button>
					</div>
				</div>
			}
			modals={
				<PlaceBidModal
					auctionId={auction.id}
					startingPrice={auction.startingPrice}
					isOpen={isBidModalOpen}
					onClose={() => setIsBidModalOpen(false)}
				/>
			}
		/>
	);
}
