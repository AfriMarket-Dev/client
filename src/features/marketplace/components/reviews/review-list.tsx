import {
	RiDeleteBin7Line,
	RiEditLine,
	RiStarFill,
	RiStarLine,
} from "@remixicon/react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useDeleteReviewMutation,
	useGetReviewsQuery,
} from "@/services/api/reviews";
import type { RootState } from "@/store";

interface ReviewListProps {
	productId?: string;
	serviceId?: string;
	companyId?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
	productId,
	serviceId,
	companyId,
}) => {
	const [page, setPage] = React.useState(1);
	const { user } = useSelector((state: RootState) => state.auth);
	const { data, isLoading } = useGetReviewsQuery({
		productId,
		serviceId,
		companyId,
		page,
		limit: 5,
	});
	const [deleteReview] = useDeleteReviewMutation();

	const targetId = productId || serviceId || companyId;
	const targetType = productId ? "product" : serviceId ? "service" : "company";

	const handleDelete = async (reviewId: string) => {
		try {
			await deleteReview({
				id: reviewId,
				targetId,
				targetType,
			}).unwrap();
			toast.success("Review deleted successfully.");
		} catch (err) {
			console.error("Failed to delete review:", err);
			toast.error("Failed to delete review.");
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="border-b border-border/40 pb-6">
						<Skeleton className="h-4 w-24 mb-2" />
						<Skeleton className="h-4 w-full mb-1" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				))}
			</div>
		);
	}

	const reviews = data?.items || [];
	const totalPages = data?.totalPages || 0;

	if (reviews.length === 0) {
		return (
			<div className="py-12 text-center border border-dashed border-border/60">
				<RiStarLine className="w-12 h-12 mx-auto mb-4 text-muted-foreground/20" />
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
					No Reviews Yet
				</h3>
				<p className="text-xs text-muted-foreground mt-1">
					Be the first to share your experience.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="space-y-8">
				{reviews.map((review) => (
					<div
						key={review.id}
						className="border-b border-border/40 pb-8 last:border-0"
					>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<span key={star}>
										{star <= review.rating ? (
											<RiStarFill className="w-3 h-3 text-primary" />
										) : (
											<RiStarLine className="w-3 h-3 text-muted-foreground/30" />
										)}
									</span>
								))}
								<span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground ml-3">
									{review.createdAt
										? new Date(review.createdAt).toLocaleDateString()
										: "RECENT"}
								</span>
							</div>

							{user?.id === review.user?.id && (
								<div className="flex items-center gap-4">
									<button
										type="button"
										onClick={() => {
											toast.info("Edit functionality ready for integration.");
										}}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										<RiEditLine size={14} />
									</button>
									<button
										type="button"
										onClick={() => handleDelete(review.id)}
										className="text-muted-foreground hover:text-destructive transition-colors"
									>
										<RiDeleteBin7Line size={14} />
									</button>
								</div>
							)}
						</div>
						<div className="flex items-center gap-2 mb-2">
							<span className="text-[10px] font-black uppercase tracking-widest text-foreground">
								{review.user?.name || "Verified Partner"}
							</span>
							<div className="px-1.5 py-0.5 border border-primary/20 bg-primary/5">
								<span className="text-[7px] font-black text-primary uppercase tracking-widest">
									Verified Log
								</span>
							</div>
						</div>
						<p className="text-sm text-foreground/80 leading-relaxed max-w-2xl italic">
							"{review.comment || "Quality confirmed by industrial standards."}"
						</p>
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<Pagination className="justify-start">
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									className="cursor-pointer font-bold uppercase tracking-widest text-[10px] rounded-none border-border"
								/>
							</PaginationItem>
						)}

						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<PaginationItem key={p}>
								<PaginationLink
									onClick={() => setPage(p)}
									isActive={page === p}
									className="cursor-pointer font-bold rounded-none border-border h-9 w-9 text-[10px]"
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						))}

						{page < totalPages && (
							<PaginationItem>
								<PaginationNext
									onClick={() => setPage((p) => p + 1)}
									className="cursor-pointer font-bold uppercase tracking-widest text-[10px] rounded-none border-border"
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
};
