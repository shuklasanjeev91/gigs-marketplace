import { useState } from "react";
import { Star, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FEEDBACK_DELAY_MS } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";

interface PrivateFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  gigTitle: string;
  /** completed_at timestamp so we can enforce the 24-hour window */
  completedAt: string;
}

const STAR_LABELS = ["Very poor", "Below average", "Average", "Good", "Excellent"];

export default function PrivateFeedbackDialog({
  open,
  onOpenChange,
  orderId,
  gigTitle,
  completedAt,
}: PrivateFeedbackDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Enforce 24-hour availability window
  const completedMs = new Date(completedAt).getTime();
  const available = Date.now() >= completedMs + FEEDBACK_DELAY_MS;
  const hoursRemaining = Math.max(
    0,
    Math.ceil((completedMs + FEEDBACK_DELAY_MS - Date.now()) / (60 * 60 * 1000))
  );

  const handleSubmit = async () => {
    if (!user || rating === 0) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("private_feedback").insert({
        order_id: orderId,
        buyer_id: user.id,
        rating,
        comment: comment.trim() || null,
      });
      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your private feedback helps us improve the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onOpenChange(false);
    } catch {
      toast({
        title: "Error",
        description: "Could not submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EyeOff className="h-4 w-4 text-muted-foreground" /> Private Feedback
          </DialogTitle>
          <DialogDescription className="line-clamp-1">{gigTitle}</DialogDescription>
        </DialogHeader>

        <div className="p-3 rounded-lg bg-muted/50 border border-border mb-2">
          <div className="flex items-start gap-2">
            <EyeOff className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              This feedback is <span className="font-medium text-foreground">completely private</span> — it is
              never shown to the seller or publicly. It helps our team improve the platform experience.
            </p>
          </div>
        </div>

        {!available ? (
          <div className="text-center py-6">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <EyeOff className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Available in {hoursRemaining} hour{hoursRemaining !== 1 ? "s" : ""}</p>
            <p className="text-xs text-muted-foreground">
              Private feedback becomes available 24 hours after order completion.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Star rating */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Overall Platform Experience
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hovered || rating)
                          ? "fill-star text-star"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                {(hovered || rating) > 0 && (
                  <span className="ml-2 text-sm font-medium text-foreground">
                    {STAR_LABELS[(hovered || rating) - 1]}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Additional Comments <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Textarea
                placeholder="What could we improve? Were there any issues with your experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[90px] resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{comment.length}/1000</p>
            </div>

            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={handleSubmit}
                disabled={submitting || rating === 0}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </span>
                ) : (
                  "Submit Private Feedback"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
