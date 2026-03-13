import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories, gigs } from "@/lib/data";
import GigCard from "./GigCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PopularServices = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const activeGigs = gigs.filter(g => g.category === activeCategory).slice(0, 4);
  const fallbackGigs = gigs.slice(0, 4);
  const displayGigs = activeGigs.length > 0 ? activeGigs : fallbackGigs;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Popular services
          </h2>
          <p className="text-muted-foreground">Browse top-rated services across all categories</p>
        </div>

        {/* Category tabs */}
        <div className="relative mb-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gigs grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {displayGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
          {displayGigs.length < 4 && gigs.slice(0, 4 - displayGigs.length).map(gig => (
            <GigCard key={`fill-${gig.id}`} gig={gig} />
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link to={`/categories/${activeCategory}`}>
            <Button variant="outline" className="font-medium px-8">
              View all {categories.find(c => c.id === activeCategory)?.name} services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
