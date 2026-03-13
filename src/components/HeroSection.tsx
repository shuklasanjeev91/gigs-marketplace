import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { usePlatformStats } from "@/hooks/usePlatformStats";

const popularSearches = ["Logo Design", "WordPress", "Voice Over", "AI Services", "Video Editing"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: stats } = usePlatformStats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
    return n > 0 ? `${n}+` : "—";
  };

  const statItems = [
    {
      value: stats ? formatCount(stats.sellerCount) : "—",
      label: "Active Freelancers",
    },
    {
      value: stats ? formatCount(stats.completedOrders) : "—",
      label: "Projects Completed",
    },
    {
      value: stats?.avgRating != null ? `${stats.avgRating}/5` : "—",
      label: "Average Rating",
    },
    {
      value: stats ? (stats.countryCount > 0 ? `${stats.countryCount}` : "—") : "—",
      label: "Countries",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-background rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Find the perfect
            <br />
            <span className="opacity-80">freelance services</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Connect with talented freelancers and get your projects done, fast and affordably.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="flex bg-card rounded-lg p-1.5 shadow-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder='Try "logo design" or "web development"'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent pl-10 h-12 text-base focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-primary-foreground/50">Popular:</span>
            {popularSearches.map(term => (
              <Badge
                key={term}
                variant="secondary"
                className="cursor-pointer bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {statItems.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-xs md:text-sm text-primary-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
