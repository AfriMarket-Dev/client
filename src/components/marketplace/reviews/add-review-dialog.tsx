import { RiStarFill, RiStarLine } from "@remixicon/react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewMutation } from "@/app/api/reviews";
import { toast } from "sonner";

interface AddReviewDialogProps {
  productId?: string;
  serviceId?: string;
  companyId?: string;
  trigger?: React.ReactElement;
}

export const AddReviewDialog: React.FC<AddReviewDialogProps> = ({
  productId,
  serviceId,
  companyId,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async () => {
    try {
      await createReview({
        rating,
        comment,
        productId,
        serviceId,
        companyId,
      }).unwrap();
      toast.success("Performance review broadcasted.");
      setOpen(false);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Review transmission failed.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger || (
            <Button
              variant="outline"
              className="rounded-none border-primary text-primary font-bold uppercase tracking-widest text-[10px]"
            >
              Write a Review
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[425px] rounded-none border-border industrial-grain">
        <DialogHeader className="space-y-4">
          <DialogTitle className="font-display font-black uppercase text-2xl tracking-tighter">
            Submit Review
          </DialogTitle>
          <DialogDescription className="text-xs uppercase font-bold tracking-widest opacity-60">
            Rate your industrial experience
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Performance Rating
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform active:scale-90"
                >
                  {star <= rating ? (
                    <RiStarFill className="w-8 h-8 text-primary" />
                  ) : (
                    <RiStarLine className="w-8 h-8 text-muted-foreground/20" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Detailed Assessment
            </span>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe quality, lead times, and reliability..."
              className="rounded-none border-border focus:border-primary/50 min-h-[120px] text-sm leading-relaxed"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-12 rounded-none bg-primary text-primary-foreground font-heading font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20"
          >
            {isLoading ? "Broadcasting..." : "Submit Performance Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
