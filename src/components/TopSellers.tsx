import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const topSellers = [
  {
    id: "1",
    name: "DesignMaster",
    avatar: "DM",
    title: "Professional Logo & Brand Designer",
    rating: 4.9,
    reviews: 1247,
    country: "🇺🇸",
    level: "Top Rated",
    skills: ["Logo Design", "Branding", "Illustration"],
    startingAt: 25,
    completionRate: 99,
  },
  {
    id: "2",
    name: "CodeWizard",
    avatar: "CW",
    title: "Full-Stack React & Node.js Developer",
    rating: 4.8,
    reviews: 832,
    country: "🇬🇧",
    level: "Top Rated",
    skills: ["React", "Node.js", "TypeScript"],
    startingAt: 150,
    completionRate: 97,
  },
  {
    id: "3",
    name: "WordSmith",
    avatar: "WS",
    title: "SEO Content Writer & Copywriter",
    rating: 5.0,
    reviews: 2100,
    country: "🇨🇦",
    level: "Top Rated",
    skills: ["SEO", "Copywriting", "Blog Posts"],
    startingAt: 35,
    completionRate: 100,
  },
  {
    id: "4",
    name: "VoiceArtist",
    avatar: "VA",
    title: "Professional Voice Over Artist",
    rating: 4.9,
    reviews: 3200,
    country: "🇺🇸",
    level: "Top Rated",
    skills: ["Voice Over", "Narration", "Podcast"],
    startingAt: 20,
    completionRate: 98,
  },
];

const TopSellers = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Work with the best
            </h2>
            <p className="text-muted-foreground mt-2">Our top-rated freelancers are ready to help</p>
          </div>
          <Link to="/search" className="hidden md:block text-sm font-medium text-primary hover:underline">
            See all sellers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topSellers.map((seller, i) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                {/* Avatar + online */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                      {seller.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-success rounded-full border-2 border-card" />
                  </div>
                  <Badge className="bg-badge-pro/10 text-badge-pro border-badge-pro/20 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {seller.level}
                  </Badge>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-display font-bold text-foreground text-base">{seller.name}</h3>
                    <span className="text-sm">{seller.country}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{seller.title}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3.5 w-3.5 fill-star text-star" />
                    <span className="text-sm font-semibold text-foreground">{seller.rating}</span>
                    <span className="text-xs text-muted-foreground">({seller.reviews.toLocaleString()})</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {seller.skills.map(skill => (
                      <span key={skill} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground">From </span>
                    <span className="font-bold font-display text-foreground">${seller.startingAt}</span>
                  </div>
                  <Link to={`/search?q=${encodeURIComponent(seller.name)}`}>
                    <Button size="sm" variant="outline" className="h-8 text-xs font-medium gap-1">
                      <MessageCircle className="h-3 w-3" /> Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
