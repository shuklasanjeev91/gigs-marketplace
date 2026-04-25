import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GigCard from "./GigCard";
import { useGigs } from "@/hooks/useGigs";
import { Loader2 } from "lucide-react";

const FeaturedGigs = ({ title = "Popular Services", category }: { title?: string; category?: string }) => {
  const { data: gigs = [], isLoading } = useGigs({ category, limit: 8 });

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground mt-2">Curated picks from our top-performing freelancers</p>
          </div>
          <Link to="/search" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Browse All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gigs.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-4xl mb-3">🎯</p>
            <p className="text-muted-foreground text-sm">No services yet — be the first to list one!</p>
            <Link to="/become-seller" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Become a Seller
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGigs;

