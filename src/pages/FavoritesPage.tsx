import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { GigCardData } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FavoritesPage = () => {
  const { user } = useAuth();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<GigCardData[]> => {
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("gig_id")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error || !favs || favs.length === 0) return [];

      const gigIds = favs.map(f => f.gig_id);
      const { data: gigs } = await supabase
        .from("gigs")
        .select("id, title, category, price, delivery_days, tags, image_url, seller_id")
        .in("id", gigIds)
        .eq("status", "active");

      if (!gigs || gigs.length === 0) return [];

      const sellerIds = [...new Set(gigs.map(g => g.seller_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, country, seller_level")
        .in("user_id", sellerIds);

      const profileMap = new Map((profiles ?? []).map(p => [p.user_id, p]));

      // Preserve the order from favorites
      return gigIds
        .map(id => gigs.find(g => g.id === id))
        .filter(Boolean)
        .map(gig => {
          const profile = profileMap.get(gig!.seller_id);
          return {
            id: gig!.id,
            title: gig!.title,
            category: gig!.category,
            price: gig!.price,
            delivery_days: gig!.delivery_days,
            tags: gig!.tags,
            image_url: gig!.image_url,
            seller_id: gig!.seller_id,
            seller: profile
              ? {
                  display_name: profile.display_name,
                  avatar_url: profile.avatar_url,
                  country: profile.country,
                  seller_level: profile.seller_level,
                }
              : null,
          };
        }) as GigCardData[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Favorites</h1>
        <p className="text-muted-foreground mb-8">Services you've saved for later</p>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {favorites.map(gig => <GigCard key={gig.id} gig={gig} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">Start exploring and save services you love</p>
            <Link to="/search">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Services</Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;

