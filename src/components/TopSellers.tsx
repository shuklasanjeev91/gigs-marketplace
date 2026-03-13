import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Award, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { sellerInitials } from "@/lib/utils";

const TopSellers = () => {
  const { data: sellers = [], isLoading } = useQuery({
    queryKey: ["top-sellers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, country, seller_level, skills, bio")
        .eq("is_seller", true)
        .order("created_at", { ascending: false })
        .limit(4);
      return data ?? [];
    },
  });

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : sellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sellers.map((seller, i) => {
            const initials = sellerInitials(seller.display_name);
              return (
                <motion.div
                  key={seller.user_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    {/* Avatar + online */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold overflow-hidden">
                          {seller.avatar_url
                            ? <img src={seller.avatar_url} alt={initials} className="h-full w-full object-cover" />
                            : initials}
                        </div>
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-success rounded-full border-2 border-card" />
                      </div>
                      {seller.seller_level && (
                        <Badge className="bg-badge-pro/10 text-badge-pro border-badge-pro/20 text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {seller.seller_level}
                        </Badge>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-display font-bold text-foreground text-base">
                          {seller.display_name || "Freelancer"}
                        </h3>
                        {seller.country && <span className="text-sm">{seller.country}</span>}
                      </div>
                      {seller.bio && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{seller.bio}</p>
                      )}

                      {seller.skills && seller.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(seller.skills as string[]).slice(0, 3).map((skill: string) => (
                            <span key={skill} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-star text-star" />
                        <span className="font-medium text-foreground">New</span>
                      </div>
                      <Link to="/messages">
                        <Button size="sm" variant="outline" className="h-8 text-xs font-medium gap-1">
                          <MessageCircle className="h-3 w-3" /> Contact
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-4xl mb-3">👥</p>
            <p className="text-muted-foreground text-sm">No sellers yet — be the first!</p>
            <Link to="/become-seller" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
              Become a Seller
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellers;

