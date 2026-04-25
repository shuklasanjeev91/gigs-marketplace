import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Zap, ShieldCheck, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { usePlatformStats } from "@/hooks/usePlatformStats";

const popularSearches = ["Logo Design", "Web Development", "Content Writing", "SEO", "Mobile Apps"];

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
      label: "Verified Freelancers",
    },
    {
      value: stats ? formatCount(stats.completedOrders) : "—",
      label: "Projects Delivered",
    },
    {
      value: stats?.avgRating != null ? `${stats.avgRating}/5` : "—",
      label: "Average Rating",
    },
    {
      value: stats ? (stats.countryCount > 0 ? `${stats.countryCount}` : "—") : "—",
      label: "Countries Served",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-36">
      {/* Dot-grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6">
            <Zap className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Hire top talent. Ship faster.
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-5 leading-[1.1]">
            The smarter way to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">find freelancers</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-white/20 -skew-x-3 z-0 rounded" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with skilled professionals across 200+ service categories.
            Quality work, transparent pricing — delivered on your schedule.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="flex bg-white rounded-xl p-1.5 shadow-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder='Try "logo design" or "React developer"'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent pl-10 h-12 text-base focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-7 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
              >
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Popular tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-white/50">Popular:</span>
            {popularSearches.map((term) => (
              <Badge
                key={term}
                variant="secondary"
                className="cursor-pointer bg-white/12 text-white border border-white/25 hover:bg-white/22 transition-colors"
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Trust micro-badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          {[
            { icon: ShieldCheck, text: "Secure Escrow Payments" },
            { icon: ThumbsUp, text: "Satisfaction Guaranteed" },
            { icon: Zap, text: "Fast, On-Time Delivery" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-white/70 text-sm">
              <Icon className="h-4 w-4 text-white/60" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {statItems.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
