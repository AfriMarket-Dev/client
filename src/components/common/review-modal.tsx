import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  itemName: string;
}

export function ReviewModal({
  isOpen,
  onClose,
  providerName,
  itemName,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    console.log("Submitting review:", {
      rating,
      comment,
      providerName,
      itemName,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden bg-background border border-border shadow-2xl">
        <div className="bg-foreground p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 african-pattern opacity-10 invert pointer-events-none" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-heading font-bold text-background mb-2 uppercase tracking-wide">
              Rate Experience
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase text-xs tracking-widest">
              Reviewing node:{" "}
              <span className="text-primary">{providerName}</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted border-border"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              {rating === 5
                ? "Optimal Performance"
                : rating === 4
                  ? "Standard Verified"
                  : rating === 3
                    ? "Average Stream"
                    : rating > 0
                      ? "Sub-Optimal"
                      : "Initialize Rating"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-foreground uppercase tracking-widest ml-1">
              Transmission Feedback
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share details about your experience with ${itemName}...`}
              className="min-h-[120px] rounded-sm bg-muted/10 border border-border p-4 focus:ring-2 focus:ring-primary/20 shadow-none font-mono text-sm italic"
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-muted/30 border-t-2 border-border gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-sm h-12 font-heading font-bold uppercase tracking-widest shadow-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 rounded-sm h-12 font-heading font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            Send Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
