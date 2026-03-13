import { useState, useRef } from "react";
import { Star, Paperclip, X, Lock, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  gigId: string;
  sellerId: string;
  gigTitle: string;
  /** Existing review (for editing within 14-day window) */
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
  } | null;
}

const STAR_LABELS = ["Terrible", "Poor", "Average", "Good", "Excellent"];

export default function ReviewDialog({
  open,
  onOpenChange,
  orderId,
  gigId,
  sellerId,
  gigTitle,
  existingReview,
}: ReviewDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Check if 14-day edit window has passed
  const isLocked = existingReview
    ? new Date(existingReview.created_at).getTime() < Date.now() - 14 * 24 * 60 * 60 * 1000
    : false;

  const daysRemaining = existingReview
    ? Math.max(
        0,
        14 - Math.floor((Date.now() - new Date(existingReview.created_at).getTime()) / (24 * 60 * 60 * 1000))
      )
    : null;

  const handleSubmit = async () => {
    if (!user || rating === 0) return;
    setSubmitting(true);
    try {
      let attachmentUrl: string | null = null;

      // Upload attachment if provided
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${orderId}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("review_attachments")
          .upload(path, file, { upsert: true });
        if (!uploadErr) {
          const { data } = supabase.storage.from("review_attachments").getPublicUrl(path);
          attachmentUrl = data.publicUrl;
        }
      }

      if (existingReview) {
        const { error } = await supabase
          .from("reviews")
          .update({ rating, comment: comment.trim() || null, attachment_url: attachmentUrl })
          .eq("id", existingReview.id);
        if (error) throw error;
        toast({ title: "Review updated" });
      } else {
        const { error } = await supabase.from("reviews").insert({
          order_id: orderId,
          gig_id: gigId,
          buyer_id: user.id,
          seller_id: sellerId,
          rating,
          comment: comment.trim() || null,
          attachment_url: attachmentUrl,
        });
        if (error) throw error;
        toast({ title: "Review submitted!", description: "Thank you for your feedback." });
      }

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", gigId] });
      onOpenChange(false);
    } catch {
      toast({ title: "Error", description: "Could not submit review. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {existingReview ? (
              <><Pencil className="h-4 w-4 text-primary" /> Edit Review</>
            ) : (
              <><Star className="h-4 w-4 text-star fill-star" /> Leave a Review</>
            )}
          </DialogTitle>
          <DialogDescription className="line-clamp-1">{gigTitle}</DialogDescription>
        </DialogHeader>

        {isLocked ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted border border-border">
            <Lock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Review locked</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                The 14-day editing window has passed. Your review can no longer be changed.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Star rating */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Rating</label>
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
                Written Review <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Textarea
                placeholder="Share your experience with this seller..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{comment.length}/2000</p>
            </div>

            {/* File attachment */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Attachment <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              {file ? (
                <div className="flex items-center gap-2 p-2 rounded-lg border border-border bg-muted">
                  <Paperclip className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove attachment"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="gap-1.5"
                >
                  <Paperclip className="h-4 w-4" /> Attach File
                </Button>
              )}
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.zip"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Edit-window note */}
            {existingReview && daysRemaining !== null && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <Lock className="h-4 w-4 text-warning shrink-0" />
                <p className="text-xs text-foreground">
                  You can edit this review for{" "}
                  <span className="font-semibold">{daysRemaining} more day{daysRemaining !== 1 ? "s" : ""}</span>.
                  After that it will be permanently locked.
                </p>
              </div>
            )}
            {!existingReview && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                  You can edit your review within{" "}
                  <Badge variant="outline" className="text-xs px-1 py-0">14 days</Badge>{" "}
                  of submission. After that it will be locked.
                </p>
              </div>
            )}

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
                ) : existingReview ? (
                  "Update Review"
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
