import { Link } from "react-router-dom";
import { Star, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryGradients, categoryEmojis } from "@/lib/categories";
import type { Gig } from "@/lib/data";

const GigCard = ({ gig }: { gig: Gig }) => {
  const gradient = categoryGradients[gig.category] || "from-primary/20 to-accent/20";
  const emoji = categoryEmojis[gig.category] || "💼";

  return (
    <Link to={`/gig/${gig.id}`} className="group block">
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-5xl opacity-40">{emoji}</span>
          </div>
          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
          {gig.isPro && (
            <Badge className="absolute top-2 left-2 bg-badge-pro text-badge-pro-foreground border-0 text-xs font-semibold">
              PRO
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Seller info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
              {gig.seller.avatar}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{gig.seller.name}</span>
              <span className="text-xs text-muted-foreground">{gig.seller.country}</span>
              {gig.seller.level === "Top Rated" && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                  Top Rated
                </Badge>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-foreground leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {gig.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-3.5 w-3.5 fill-star text-star" />
            <span className="text-sm font-semibold text-foreground">{gig.seller.rating}</span>
            <span className="text-xs text-muted-foreground">({gig.seller.reviews.toLocaleString()})</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{gig.deliveryDays}d delivery</span>
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
