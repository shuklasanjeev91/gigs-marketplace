import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart, Heart, Clock, Search, TrendingUp,
  CheckCircle, Package, Loader2, ChevronRight, MessageSquare,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useGigs } from "@/hooks/useGigs";
import GigCard from "@/components/GigCard";

type Order = {
  id: string;
  gig_id: string;
  price: number;
  status: string;
  delivery_days: number;
  created_at: string;
  due_at: string | null;
  gig?: { title: string } | null;
  seller?: { display_name: string | null } | null;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  in_progress: "bg-primary/10 text-primary",
  delivered: "bg-warning/10 text-warning",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  delivered: "In Review",
  completed: "Completed",
  cancelled: "Cancelled",
};

const BuyerDashboard = () => {
  const { user, profile } = useAuth();

  // ── Orders ────────────────────────────────────────────────────────────────
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["buyer-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select(
          "id, gig_id, price, status, delivery_days, created_at, due_at, gig:gig_id(title), seller:seller_id(display_name)"
        )
        .eq("buyer_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      return (data ?? []) as unknown as Order[];
    },
  });

  // ── Favorites ─────────────────────────────────────────────────────────────
  const { data: favoriteCount = 0 } = useQuery<number>({
    queryKey: ["buyer-favorites-count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase
        .from("favorites")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
  });

  // ── Recommended gigs ─────────────────────────────────────────────────────
  const { data: recommendedGigs = [] } = useGigs({ limit: 4, sortBy: "rating" });

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "in_progress" || o.status === "delivered"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalSpent = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.price, 0);

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your orders, explore new services, and track your projects.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalOrders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{activeOrders}</p>
                <p className="text-xs text-muted-foreground">Active Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{completedOrders}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{favoriteCount}</p>
                <p className="text-xs text-muted-foreground">Saved Services</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-display">Recent Orders</CardTitle>
                <Link to="/orders">
                  <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {ordersLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-10 px-6">
                    <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/search">
                      <Button size="sm">Browse Services</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {orders.slice(0, 5).map((order) => (
                      <Link
                        key={order.id}
                        to={`/orders/${order.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-muted/40 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {order.gig?.title ?? "Untitled Gig"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.seller?.display_name ?? "Freelancer"} ·{" "}
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold">₹{order.price.toLocaleString()}</p>
                          <Badge
                            className={`text-[10px] px-2 py-0.5 border-0 ${STATUS_COLORS[order.status] ?? ""}`}
                          >
                            {STATUS_LABELS[order.status] ?? order.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Gigs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-display">
                  <TrendingUp className="inline h-4 w-4 mr-2 text-primary" />
                  Recommended for You
                </CardTitle>
                <Link to="/search">
                  <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
                    See all <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/search" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <Search className="h-4 w-4 text-primary" /> Find a Service
                  </Button>
                </Link>
                <Link to="/orders" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <ShoppingCart className="h-4 w-4 text-primary" /> My Orders
                  </Button>
                </Link>
                <Link to="/favorites" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" /> Saved Services
                  </Button>
                </Link>
                <Link to="/messages" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-primary" /> Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Spending summary */}
            {completedOrders > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Spending Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold">₹{totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed Orders</span>
                    <span className="font-semibold">{completedOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Orders</span>
                    <span className="font-semibold">{activeOrders}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Become a seller CTA */}
            {!profile?.is_seller && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-5 text-center">
                  <p className="text-2xl mb-2">🚀</p>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Start Earning Today
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Turn your skills into income on Neoelectron.
                  </p>
                  <Link to="/become-seller">
                    <Button size="sm" className="w-full">Become a Seller</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
