import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard, Package, Plus, ShoppingCart, DollarSign, Star, Clock,
  Trash2, Pause, Play, BarChart3, Loader2, Settings, Home, Crown,
  Edit, TrendingUp, CheckCircle, XCircle, Truck, MessageCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { MS_PER_DAY } from "@/lib/constants";

type Gig = {
  id: string; title: string; category: string; description: string | null;
  price: number; delivery_days: number; tags: string[]; status: string; created_at: string;
};

type Order = {
  id: string; gig_id: string; buyer_id: string; package: string; price: number;
  status: string; delivery_days: number; due_at: string | null; created_at: string;
  gig?: { title: string } | null;
  buyer?: { display_name: string | null } | null;
};

const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending:     { label: "Pending",     color: "bg-muted text-muted-foreground",     icon: Clock },
  in_progress: { label: "In Progress", color: "bg-primary/10 text-primary",         icon: TrendingUp },
  delivered:   { label: "Delivered",   color: "bg-warning/10 text-warning",         icon: Truck },
  completed:   { label: "Completed",   color: "bg-success/10 text-success",         icon: CheckCircle },
  cancelled:   { label: "Cancelled",   color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const LEVEL_THRESHOLDS = [
  { level: "New",       minCompleted: 0,   badge: "bg-muted text-muted-foreground" },
  { level: "Level 1",   minCompleted: 10,  badge: "bg-primary/10 text-primary" },
  { level: "Level 2",   minCompleted: 50,  badge: "bg-badge-pro/10 text-badge-pro" },
  { level: "Top Rated", minCompleted: 100, badge: "bg-star/10 text-star" },
];

const sidebarItems = [
  { title: "Overview",    url: "/seller/dashboard",    icon: LayoutDashboard },
  { title: "My Gigs",     url: "/seller/dashboard",    icon: Package },
  { title: "Orders",      url: "/orders",              icon: ShoppingCart },
  { title: "Analytics",   url: "/seller/dashboard",    icon: BarChart3 },
  { title: "Seller Plus", url: "/seller/subscription", icon: Crown },
];
const sidebarBottom = [
  { title: "Settings",     url: "/settings", icon: Settings },
  { title: "Back to Home", url: "/",         icon: Home },
];

function SellerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { profile } = useAuth();
  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="px-4 py-5 border-b border-sidebar-border">
          {!collapsed ? (
            <div>
              <span className="text-lg font-display font-bold text-gradient">neoelectron</span>
              <p className="text-xs text-muted-foreground mt-0.5">Seller Dashboard</p>
            </div>
          ) : <span className="text-lg font-display font-bold text-gradient">N</span>}
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

function SellerLevelCard({ sellerLevel, completedOrders, totalOrders }: { sellerLevel: string; completedOrders: number; totalOrders: number }) {
  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  const levelIdx = LEVEL_THRESHOLDS.findIndex(l => l.level === sellerLevel);
  const nextLevel = LEVEL_THRESHOLDS[levelIdx + 1];
  const progressToNext = nextLevel ? Math.min(100, Math.round((completedOrders / nextLevel.minCompleted) * 100)) : 100;
  const currentThreshold = LEVEL_THRESHOLDS[levelIdx] || LEVEL_THRESHOLDS[0];
  return (
    <Card className="p-5 shadow-card">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-star/10 flex items-center justify-center">
            <Star className="h-5 w-5 text-star" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-display font-bold text-foreground">{sellerLevel}</span>
              <Badge className={`text-[10px] ${currentThreshold.badge}`}>{sellerLevel}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Seller Level</p>
          </div>
        </div>
        <Link to="/seller/subscription">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs border-badge-pro/30 text-badge-pro hover:bg-badge-pro/10">
            <Crown className="h-3.5 w-3.5" /> Seller Plus
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div className="text-xl font-display font-bold text-foreground">{completedOrders}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div className="text-xl font-display font-bold text-foreground">{totalOrders}</div>
          <div className="text-xs text-muted-foreground">Total Orders</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div className="text-xl font-display font-bold text-foreground">{completionRate}%</div>
          <div className="text-xs text-muted-foreground">Completion Rate</div>
        </div>
      </div>
      {nextLevel && (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress to {nextLevel.level}</span>
            <span>{completedOrders} / {nextLevel.minCompleted} orders</span>
          </div>
          <Progress value={progressToNext} className="h-2" />
        </div>
      )}
    </Card>
  );
}

function OrderRow({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: string) => void }) {
  const cfg = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;
  const nextStatus: Record<string, string> = { pending: "in_progress", in_progress: "delivered", delivered: "completed" };
  const daysLeft = order.due_at ? Math.ceil((new Date(order.due_at).getTime() - Date.now()) / (MS_PER_DAY)) : null;
  return (
    <Card className="p-4 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-foreground truncate max-w-xs">{order.gig?.title || "—"}</span>
            <Badge className={`text-[10px] ${cfg.color}`}>
              <StatusIcon className="h-3 w-3 mr-1" />{cfg.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Buyer: {order.buyer?.display_name || "Anonymous"} · {order.package} package · ₹{order.price}
          </p>
          {daysLeft !== null && order.status !== "completed" && order.status !== "cancelled" && (
            <p className={`text-xs mt-1 ${daysLeft < 1 ? "text-destructive" : daysLeft < 2 ? "text-warning" : "text-muted-foreground"}`}>
              {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
            </p>
          )}
        </div>
        <div className="flex gap-2 shrink-0 items-center">
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Message buyer">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </Link>
          {nextStatus[order.status] && (
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => onStatusChange(order.id, nextStatus[order.status])}>
              {order.status === "pending" ? "Start" : order.status === "in_progress" ? "Deliver" : "Complete"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

const GigRow = ({ gig, onDelete, onToggle }: { gig: Gig; onDelete: (id: string) => void; onToggle: (gig: Gig) => void }) => (
  <Card className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground truncate max-w-xs">{gig.title}</h3>
          <Badge variant={gig.status === "active" ? "default" : "secondary"}
            className={gig.status === "active" ? "bg-success text-primary-foreground border-0 text-[10px]" : "text-[10px]"}>
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
        <div className="text-xl font-display font-bold text-foreground">₹{gig.price}</div>
        <div className="text-xs text-muted-foreground">starting</div>
      </div>
      <div className="flex gap-1 shrink-0">
        <Link to={`/seller/gig/${gig.id}/edit`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Edit gig">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => onToggle(gig)} title={gig.status === "active" ? "Pause gig" : "Activate gig"}>
          {gig.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(gig.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

function DashboardContent() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [gigsLoading, setGigsLoading] = useState(true);

  const fetchGigs = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("gigs").select("*").eq("seller_id", user.id).order("created_at", { ascending: false });
    if (!error && data) setGigs(data as Gig[]);
    setGigsLoading(false);
  };

  useEffect(() => { fetchGigs(); }, [user]);

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["seller-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, gig:gigs(title), buyer:profiles!orders_buyer_id_fkey(display_name)")
        .eq("seller_id", user!.id)
        .order("created_at", { ascending: false });
      return (data ?? []) as Order[];
    },
  });

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

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    const extra: Record<string, string> = newStatus === "completed"
      ? { completed_at: new Date().toISOString() } : {};
    const { error } = await supabase.from("orders").update({ status: newStatus, ...extra }).eq("id", orderId);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ["seller-orders", user?.id] });
      toast({ title: `Order marked as ${newStatus.replace("_", " ")}` });
    } else {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    }
  };

  const activeGigs = gigs.filter(g => g.status === "active");
  const pausedGigs = gigs.filter(g => g.status !== "active");
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pendingOrders = orders.filter(o => ["pending", "in_progress", "delivered"].includes(o.status));
  const sellerLevel = profile?.seller_level || "New";

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
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {profile?.display_name || "Seller"} 👋
          </h2>
          <p className="text-muted-foreground mt-1">Here's how your business is doing</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Active Gigs",  value: String(activeGigs.length),   icon: Package,     color: "text-primary" },
            { label: "Total Gigs",   value: String(gigs.length),          icon: BarChart3,   color: "text-accent" },
            { label: "Open Orders",  value: String(pendingOrders.length), icon: ShoppingCart, color: "text-warning" },
            { label: "Member Since", value: profile?.member_since
                ? new Date(profile.member_since).toLocaleDateString("en", { month: "short", year: "numeric" }) : "—",
              icon: Clock, color: "text-muted-foreground" },
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

        {/* Level card */}
        <div className="mb-8">
          <SellerLevelCard sellerLevel={sellerLevel} completedOrders={completedOrders} totalOrders={orders.length} />
        </div>

        {/* Gigs & Orders tabs */}
        <Tabs defaultValue="gigs">
          <TabsList className="mb-4">
            <TabsTrigger value="gigs">My Gigs ({gigs.length})</TabsTrigger>
            <TabsTrigger value="orders">
              Orders
              {pendingOrders.length > 0 && (
                <Badge className="ml-1.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground rounded-full">
                  {pendingOrders.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gigs">
            {gigsLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : gigs.length === 0 ? (
              <Card className="p-12 text-center shadow-card">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground mb-2">No gigs yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Create your first gig and start receiving orders</p>
                <Link to="/seller/onboarding">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> Create Gig</Button>
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
                    <Card className="p-8 text-center shadow-card"><p className="text-muted-foreground">No active gigs right now.</p></Card>
                  ) : (
                    <div className="space-y-3">{activeGigs.map(gig => <GigRow key={gig.id} gig={gig} onDelete={handleDeleteGig} onToggle={handleToggleStatus} />)}</div>
                  )}
                </TabsContent>
                <TabsContent value="paused">
                  {pausedGigs.length === 0 ? (
                    <Card className="p-8 text-center shadow-card"><p className="text-muted-foreground">No paused gigs.</p></Card>
                  ) : (
                    <div className="space-y-3">{pausedGigs.map(gig => <GigRow key={gig.id} gig={gig} onDelete={handleDeleteGig} onToggle={handleToggleStatus} />)}</div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>

          <TabsContent value="orders">
            {ordersLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : orders.length === 0 ? (
              <Card className="p-12 text-center shadow-card">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-display font-bold text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground text-sm">Orders from buyers will appear here once your gigs are live.</p>
              </Card>
            ) : (
              <Tabs defaultValue="active-orders">
                <TabsList className="mb-4">
                  <TabsTrigger value="active-orders">Active ({pendingOrders.length})</TabsTrigger>
                  <TabsTrigger value="all-orders">All ({orders.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="active-orders">
                  {pendingOrders.length === 0 ? (
                    <Card className="p-8 text-center shadow-card">
                      <CheckCircle className="h-10 w-10 text-success mx-auto mb-2" />
                      <p className="text-muted-foreground">No active orders right now.</p>
                    </Card>
                  ) : (
                    <div className="space-y-3">{pendingOrders.map(order => <OrderRow key={order.id} order={order} onStatusChange={handleOrderStatusChange} />)}</div>
                  )}
                </TabsContent>
                <TabsContent value="all-orders">
                  <div className="space-y-3">{orders.map(order => <OrderRow key={order.id} order={order} onStatusChange={handleOrderStatusChange} />)}</div>
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const SellerDashboard = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <SellerSidebar />
      <DashboardContent />
    </div>
  </SidebarProvider>
);

export default SellerDashboard;
