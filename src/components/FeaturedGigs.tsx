import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GigCard from "./GigCard";
import { gigs } from "@/lib/data";

const FeaturedGigs = ({ title = "Popular Services", category }: { title?: string; category?: string }) => {
  const filtered = category ? gigs.filter(g => g.category === category) : gigs;
  const displayed = filtered.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground mt-2">Hand-picked services for you</p>
          </div>
          <Link to="/search" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigs;
