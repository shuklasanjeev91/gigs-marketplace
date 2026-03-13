import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ShoppingCart, Star, Eye, Clock, BarChart3, Plus, Package, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Gig = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  price: number;
  delivery_days: number;
  tags: string[];
  status: string;
  created_at: string;
};

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGigs = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("gigs")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setGigs(data as Gig[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchGigs();
  }, [user]);

  const handleDeleteGig = async (gigId: string) => {
    const { error } = await supabase.from("gigs").delete().eq("id", gigId);
    if (error) {
      toast({ title: "Error deleting gig", description: error.message, variant: "destructive" });
    } else {
      setGigs(prev => prev.filter(g => g.id !== gigId));
      toast({ title: "Gig deleted" });
    }
  };

  const handleToggleStatus = async (gig: Gig) => {
    const newStatus = gig.status === "active" ? "paused" : "active";
    const { error } = await supabase.from("gigs").update({ status: newStatus }).eq("id", gig.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setGigs(prev => prev.map(g => g.id === gig.id ? { ...g, status: newStatus } : g));
    }
  };

  const activeGigs = gigs.filter(g => g.status === "active");
  const pausedGigs = gigs.filter(g => g.status === "paused");

  const isSeller = profile?.is_seller;

  if (!isSeller) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">You're not a seller yet</h1>
          <p className="text-muted-foreground mb-6">Create your first gig and start earning on neoelectron</p>
          <Link to="/become-seller">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" /> Become a Seller
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {profile?.display_name || "Seller"}!</p>
          </div>
          <Link to="/become-seller">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" /> Create Gig
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Gigs", value: String(activeGigs.length), icon: ShoppingCart },
            { label: "Total Gigs", value: String(gigs.length), icon: BarChart3 },
            { label: "Seller Level", value: profile?.seller_level || "New", icon: Star },
            { label: "Profile Views", value: "—", icon: Eye },
          ].map(stat => (
            <Card key={stat.label} className="p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Gigs */}
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active ({activeGigs.length})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({pausedGigs.length})</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <TabsContent value="active">
                {activeGigs.length === 0 ? (
                  <Card className="p-12 text-center shadow-card">
                    <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No active gigs. Create one to get started!</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {activeGigs.map(gig => (
                      <GigRow key={gig.id} gig={gig} onDelete={handleDeleteGig} onToggle={handleToggleStatus} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="paused">
                {pausedGigs.length === 0 ? (
                  <Card className="p-12 text-center shadow-card">
                    <p className="text-muted-foreground">No paused gigs.</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {pausedGigs.map(gig => (
                      <GigRow key={gig.id} gig={gig} onDelete={handleDeleteGig} onToggle={handleToggleStatus} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

const GigRow = ({ gig, onDelete, onToggle }: { gig: Gig; onDelete: (id: string) => void; onToggle: (gig: Gig) => void }) => (
  <Card className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-foreground truncate">{gig.title}</h3>
          <Badge variant={gig.status === "active" ? "default" : "secondary"} className={gig.status === "active" ? "bg-success text-primary-foreground border-0" : ""}>
            {gig.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{gig.category} · {gig.delivery_days}d delivery</p>
        {gig.tags?.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {gig.tags.slice(0, 4).map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
            ))}
          </div>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-lg font-display font-bold text-foreground">₹{gig.price}</div>
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onToggle(gig)} title={gig.status === "active" ? "Pause" : "Activate"}>
          <Clock className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(gig.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

export default Dashboard;
