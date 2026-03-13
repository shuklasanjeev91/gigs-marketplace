import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard, Package, Plus, ShoppingCart, DollarSign, Star, Eye, Clock,
  Trash2, Pause, Play, BarChart3, TrendingUp, Users, Loader2, Settings, LogOut, ChevronLeft, ChevronRight, Home
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

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

const sidebarItems = [
  { title: "Overview", url: "/seller/dashboard", icon: LayoutDashboard },
  { title: "My Gigs", url: "/seller/dashboard", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Earnings", url: "/seller/dashboard", icon: DollarSign },
  { title: "Analytics", url: "/seller/dashboard", icon: BarChart3 },
];

const sidebarBottom = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Back to Home", url: "/", icon: Home },
];

function SellerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { profile } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        {/* Brand */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          {!collapsed && (
            <div>
              <span className="text-lg font-display font-bold text-gradient">giglance</span>
              <span className="text-primary text-lg font-bold">.</span>
              <p className="text-xs text-muted-foreground mt-0.5">Seller Dashboard</p>
            </div>
          )}
          {collapsed && (
            <span className="text-lg font-display font-bold text-gradient">g</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarBottom.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className="hover:bg-muted/50" activeClassName="">
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Seller card */}
          {!collapsed && profile && (
            <div className="mx-3 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {profile.display_name?.slice(0, 2).toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{profile.display_name || "Seller"}</p>
                  <p className="text-xs text-muted-foreground">{profile.seller_level || "New"} Seller</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function DashboardContent() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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

  useEffect(() => { fetchGigs(); }, [user]);

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
    if (!error) setGigs(prev => prev.map(g => g.id === gig.id ? { ...g, status: newStatus } : g));
  };

  const activeGigs = gigs.filter(g => g.status === "active");
  const pausedGigs = gigs.filter(g => g.status !== "active");

  if (!profile?.is_seller) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">You're not a seller yet</h1>
          <p className="text-muted-foreground mb-6">Create your first gig to start earning</p>
          <Link to="/seller/setup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" /> Set Up Seller Account
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen">
      {/* Top bar */}
      <header className="h-14 flex items-center justify-between border-b border-border px-6 bg-card">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-lg font-display font-bold text-foreground">Dashboard</h1>
        </div>
        <Link to="/seller/onboarding">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> New Gig
          </Button>
        </Link>
      </header>

      <div className="p-6">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {profile?.display_name || "Seller"} 👋
          </h2>
          <p className="text-muted-foreground mt-1">Here's how your business is doing</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Gigs", value: String(activeGigs.length), icon: Package, color: "text-primary" },
            { label: "Total Gigs", value: String(gigs.length), icon: BarChart3, color: "text-accent" },
            { label: "Seller Level", value: profile?.seller_level || "New", icon: Star, color: "text-star" },
            { label: "Member Since", value: new Date(profile?.member_since).toLocaleDateString("en", { month: "short", year: "numeric" }), icon: Clock, color: "text-muted-foreground" },
          ].map(stat => (
            <Card key={stat.label} className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Gig management */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-foreground">Your Gigs</h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : gigs.length === 0 ? (
          <Card className="p-12 text-center shadow-card">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display font-bold text-foreground mb-2">No gigs yet</h3>
            <p className="text-muted-foreground text-sm mb-4">Create your first gig and start receiving orders</p>
            <Link to="/seller/onboarding">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" /> Create Gig
              </Button>
            </Link>
          </Card>
        ) : (
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active ({activeGigs.length})</TabsTrigger>
              <TabsTrigger value="paused">Paused ({pausedGigs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {activeGigs.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <p className="text-muted-foreground">No active gigs right now.</p>
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
                <Card className="p-8 text-center shadow-card">
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
          </Tabs>
        )}
      </div>
    </div>
  );
}

const GigRow = ({ gig, onDelete, onToggle }: { gig: Gig; onDelete: (id: string) => void; onToggle: (gig: Gig) => void }) => (
  <Card className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground truncate max-w-xs">{gig.title}</h3>
          <Badge
            variant={gig.status === "active" ? "default" : "secondary"}
            className={gig.status === "active" ? "bg-success text-primary-foreground border-0 text-[10px]" : "text-[10px]"}
          >
            {gig.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{gig.category} · {gig.delivery_days}d delivery</p>
        {gig.tags?.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {gig.tags.slice(0, 4).map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
            ))}
          </div>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-xl font-display font-bold text-foreground">${gig.price}</div>
        <div className="text-xs text-muted-foreground">starting</div>
      </div>
      <div className="flex gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => onToggle(gig)}
          title={gig.status === "active" ? "Pause gig" : "Activate gig"}
        >
          {gig.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(gig.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

const SellerDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SellerSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
};

export default SellerDashboard;
