import { Link } from "react-router-dom";
import { Star, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryGradients, categoryEmojis } from "@/lib/categories";
import type { GigCardData } from "@/lib/data";
import { sellerInitials } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const GigCard = ({ gig }: { gig: GigCardData }) => {
  const gradient = categoryGradients[gig.category] || "from-primary/20 to-accent/20";
  const emoji = categoryEmojis[gig.category] || "💼";
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ── Favorites state ───────────────────────────────────────────────────────
  const { data: isFavorited } = useQuery({
    queryKey: ["favorite", user?.id, gig.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user!.id)
        .eq("gig_id", gig.id)
        .maybeSingle();
      return !!data;
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      if (!user) { navigate("/login"); return; }
      if (isFavorited) {
        await supabase.from("favorites").delete()
          .eq("user_id", user.id).eq("gig_id", gig.id);
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, gig_id: gig.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", user?.id, gig.id] });
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });

  const initials = sellerInitials(gig.seller?.display_name);
  const sellerLevel = gig.seller?.seller_level;

  return (
    <Link to={`/gig/${gig.id}`} className="group block">
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          {gig.image_url ? (
            <img src={gig.image_url} alt={gig.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-5xl opacity-40">{emoji}</span>
            </div>
          )}
          <button
            className={`absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm transition-colors ${
              isFavorited ? "text-destructive" : "text-muted-foreground hover:text-destructive"
            }`}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite.mutate();
            }}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-destructive" : ""}`} />
          </button>
          {sellerLevel === "Top Rated" && (
            <Badge className="absolute top-2 left-2 bg-badge-pro text-badge-pro-foreground border-0 text-xs font-semibold">
              Top Rated
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Seller info */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={gig.seller?.display_name ? `/user/${encodeURIComponent(gig.seller.display_name)}` : "#"}
              className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                {gig.seller?.avatar_url ? (
                  <img src={gig.seller.avatar_url} alt={initials} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  {gig.seller?.display_name || "Freelancer"}
                </span>
                {gig.seller?.country && (
                  <span className="text-xs text-muted-foreground shrink-0">{gig.seller.country}</span>
                )}
                {sellerLevel === "Top Rated" && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary shrink-0">
                    Top Rated
                  </Badge>
                )}
              </div>
            </Link>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-foreground leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {gig.title}
          </h3>

          {/* Rating */}
          {gig.avg_rating ? (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-3.5 w-3.5 fill-star text-star" />
              <span className="text-sm font-semibold text-foreground">{gig.avg_rating}</span>
              {gig.review_count && (
                <span className="text-xs text-muted-foreground">({gig.review_count.toLocaleString()})</span>
              )}
            </div>
          ) : (
            <div className="mb-3 h-5" />
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{gig.delivery_days}d delivery</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">From</span>
              <span className="ml-1 text-base font-bold font-display text-foreground">₹{gig.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

