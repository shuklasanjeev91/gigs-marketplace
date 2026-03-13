import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, MessageCircle, Heart, Clock, Award, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { sellerInitials } from "@/lib/utils";
import { GigCardData } from "@/lib/data";

type PublicProfile = {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  seller_level: string | null;
  member_since: string | null;
  languages: string[] | null;
  skills: string[] | null;
};

const LEVEL_LABELS: Record<string, string> = {
  new_seller: "New Seller",
  level_1: "Level 1 Seller",
  level_2: "Level 2 Seller",
  top_rated: "Top Rated Seller",
};

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();

  // Look up profile by display_name slug
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["public-profile", username],
    enabled: !!username,
    queryFn: async (): Promise<PublicProfile | null> => {
      const { data } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, bio, country, seller_level, created_at, languages, skills")
        .ilike("display_name", username ?? "")
        .maybeSingle();
      if (!data) return null;
      return { ...data, member_since: data.created_at };
    },
  });

  const { data: gigs = [], isLoading: loadingGigs } = useQuery({
    queryKey: ["public-gigs", profile?.user_id],
    enabled: !!profile?.user_id,
    queryFn: async (): Promise<GigCardData[]> => {
      const { data } = await supabase
        .from("gigs")
        .select("id, title, category, price, delivery_days, tags, image_url, seller_id")
        .eq("seller_id", profile!.user_id)
        .eq("status", "active");
      return (data ?? []).map((g) => ({
        ...g,
        seller: {
          display_name: profile?.display_name ?? null,
          avatar_url: profile?.avatar_url ?? null,
          country: profile?.country ?? null,
          seller_level: profile?.seller_level ?? null,
        },
      }));
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["public-reviews", profile?.user_id],
    enabled: !!profile?.user_id,
    queryFn: async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, rating, comment, created_at, buyer_id, order_id")
        .eq("seller_id", profile!.user_id)
        .order("created_at", { ascending: false })
        .limit(10);
      return data ?? [];
    },
  });

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : null;

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">User not found</h1>
          <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist or may have been removed.</p>
          <Link to="/"><Button>Go home</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const displayName = profile.display_name || username || "Seller";
  const initials = sellerInitials(displayName);
  const levelLabel = profile.seller_level ? LEVEL_LABELS[profile.seller_level] ?? profile.seller_level : null;
  const memberYear = profile.member_since ? new Date(profile.member_since).getFullYear() : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 text-center sticky top-24">
              <div className="relative inline-block mb-4">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mx-auto">
                    {initials}
                  </div>
                )}
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
              </div>

              <h1 className="text-xl font-display font-bold text-foreground mb-1">{displayName}</h1>

              {levelLabel && (
                <Badge className="mb-2 text-xs">{levelLabel}</Badge>
              )}

              {avgRating !== null && (
                <div className="flex items-center justify-center gap-1 text-sm mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{avgRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
              )}

              {profile.country && (
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mb-1">
                  <MapPin className="h-3.5 w-3.5" /> {profile.country}
                </p>
              )}
              {memberYear && (
                <p className="text-xs text-muted-foreground mb-4">
                  <Clock className="h-3.5 w-3.5 inline mr-1" />Member since {memberYear}
                </p>
              )}

              {user && user.id !== profile.user_id && (
                <div className="space-y-2">
                  <Link to="/messages" className="block">
                    <Button className="w-full" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" /> Contact me
                    </Button>
                  </Link>
                </div>
              )}

              {profile.bio && (
                <div className="mt-4 pt-4 border-t border-border text-left">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                </div>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border text-left">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {profile.languages && profile.languages.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border text-left">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Languages</h3>
                  <div className="space-y-1">
                    {profile.languages.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <Tabs defaultValue="gigs">
              <TabsList className="mb-6">
                <TabsTrigger value="gigs">Gigs ({gigs.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="gigs">
                {loadingGigs ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : gigs.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No active gigs yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    {gigs.map((gig) => (
                      <GigCard key={gig.id} gig={gig} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews">
                {reviews.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No reviews yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {avgRating !== null && (
                      <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-5xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                          <div className="flex justify-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    )}
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
