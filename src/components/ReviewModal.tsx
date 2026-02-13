import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  itemName: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, providerName, itemName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    console.log("Submitting review:", { rating, comment, providerName, itemName });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden bg-white">
        <div className="bg-stone-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 african-pattern opacity-10 invert pointer-events-none" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-black text-white font-display mb-2">Rate Your Experience</DialogTitle>
            <DialogDescription className="text-stone-400 font-medium">
              How was your deal with <span className="text-white">{providerName}</span>?
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
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
              {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating > 0 ? "Poor" : "Select a rating"}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wide ml-1">
              Your Review
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share details about your experience with ${itemName}...`}
              className="min-h-[120px] rounded-xl bg-stone-50 border-stone-200 p-4 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-stone-50 border-t border-stone-100 gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-xl h-12 font-bold text-stone-600">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={rating === 0}
            className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/20"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
