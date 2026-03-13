import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Award, MessageCircle } from "lucide-react";
import GigCard from "@/components/GigCard";
import { useGigs } from "@/hooks/useGigs";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

const Profile = () => {
  const { user, profile } = useAuth();
  const { data: sellerGigs = [] } = useGigs(
    user ? { sellerId: user.id, limit: 4 } : {}
  );

  const initials = useMemo(() => {
    const name = profile?.display_name || user?.email || "";
    return name
      .split(/[\s@]/)
      .slice(0, 2)
      .map((s: string) => s[0]?.toUpperCase())
      .join("");
  }, [profile, user]);

  const memberSince = profile?.member_since
    ? format(new Date(profile.member_since), "MMM yyyy")
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-card">
              <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold font-display mx-auto mb-4 overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  initials || "?"
                )}
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">
                {profile?.display_name || "Your Name"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {profile?.bio || "No bio yet"}
              </p>
              {profile?.is_seller && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <Badge className="bg-primary/10 text-primary border-0">
                    {profile.seller_level || "New Seller"}
                  </Badge>
                </div>
              )}
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <MessageCircle className="h-4 w-4 mr-2" /> Contact Me
              </Button>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> From</span>
                <span className="text-foreground font-medium">{profile?.country || "Not set"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Member since</span>
                <span className="text-foreground font-medium">{memberSince}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Email</span>
                <span className="text-foreground font-medium text-xs truncate max-w-[140px]">{user?.email}</span>
              </div>
            </div>

            {profile?.skills && profile.skills.length > 0 && (
              <div className="mt-4 rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="gigs">
              <TabsList className="mb-6">
                <TabsTrigger value="gigs">Gigs ({sellerGigs.length})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="gigs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sellerGigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-3">About Me</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {profile?.bio || "No bio provided yet. Update your profile in Settings."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
