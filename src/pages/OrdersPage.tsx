import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MessageCircle, Star, Package, Loader2, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ReviewDialog from "@/components/ReviewDialog";
import PrivateFeedbackDialog from "@/components/PrivateFeedbackDialog";
import { Link } from "react-router-dom";
import { FEEDBACK_DELAY_MS, MS_PER_DAY } from "@/lib/constants";

type Order = {
  id: string;
  gig_id: string;
  seller_id: string;
  package: string;
  price: number;
  status: string;
  delivery_days: number;
  due_at: string | null;
  completed_at: string | null;
  created_at: string;
  gig?: { title: string } | null;
  seller?: { display_name: string | null } | null;
  review?: { id: string; rating: number; comment: string | null; created_at: string } | null;
  private_feedback?: { id: string } | null;
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

const OrdersPage = () => {
  const { user } = useAuth();
  const [reviewTarget, setReviewTarget] = useState<Order | null>(null);
  const [feedbackTarget, setFeedbackTarget] = useState<Order | null>(null);

  // ── Buyer orders ───────────────────────────────────────────────────────────
  const { data: buyerOrders = [], isLoading: loadingBuyer } = useQuery({
    queryKey: ["orders", "buyer", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Order[]> => {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("id, gig_id, seller_id, package, price, status, delivery_days, due_at, completed_at, created_at")
        .eq("buyer_id", user!.id)
        .order("created_at", { ascending: false });

      if (error || !orders || orders.length === 0) return [];

      // Enrich with gig titles
      const gigIds = [...new Set(orders.map(o => o.gig_id))];
      const { data: gigs } = await supabase
        .from("gigs")
        .select("id, title")
        .in("id", gigIds);

      // Enrich with seller display names
      const sellerIds = [...new Set(orders.map(o => o.seller_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", sellerIds);

      // Fetch existing reviews for buyer's orders
      const orderIds = orders.map(o => o.id);
      const { data: reviews } = await supabase
        .from("reviews")
        .select("order_id, id, rating, comment, created_at")
        .in("order_id", orderIds);

      // Fetch private feedback already submitted
      const { data: feedbacks } = await supabase
        .from("private_feedback")
        .select("order_id, id")
        .in("order_id", orderIds);

      const gigMap = new Map((gigs ?? []).map(g => [g.id, g]));
      const profileMap = new Map((profiles ?? []).map(p => [p.user_id, p]));
      const reviewMap = new Map((reviews ?? []).map(r => [r.order_id, r]));
      const feedbackMap = new Map((feedbacks ?? []).map(f => [f.order_id, f]));

      return orders.map(o => ({
        ...o,
        gig: gigMap.get(o.gig_id) ?? null,
        seller: profileMap.get(o.seller_id) ?? null,
        review: reviewMap.get(o.id) ?? null,
        private_feedback: feedbackMap.get(o.id) ?? null,
      }));
    },
  });

  // ── Seller orders ─────────────────────────────────────────────────────────
  const { data: sellerOrders = [], isLoading: loadingSeller } = useQuery({
    queryKey: ["orders", "seller", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Order[]> => {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("id, gig_id, seller_id, package, price, status, delivery_days, due_at, completed_at, created_at")
        .eq("seller_id", user!.id)
        .order("created_at", { ascending: false });

      if (error || !orders || orders.length === 0) return [];

      const gigIds = [...new Set(orders.map(o => o.gig_id))];
      const { data: gigs } = await supabase.from("gigs").select("id, title").in("id", gigIds);
      const gigMap = new Map((gigs ?? []).map(g => [g.id, g]));

      return orders.map(o => ({ ...o, gig: gigMap.get(o.gig_id) ?? null }));
    },
  });

  const renderOrderCard = (order: Order, isSelling = false) => {
    const statusLabel = STATUS_LABELS[order.status] || order.status;
    const statusClass = STATUS_COLORS[order.status] || "bg-muted text-muted-foreground";
    const isCompleted = order.status === "completed";
    const canReview = isCompleted && !isSelling && !order.review;
    const canEditReview = isCompleted && !isSelling && !!order.review;
    const canFeedback =
      isCompleted &&
      !isSelling &&
      !order.private_feedback &&
      order.completed_at &&
      Date.now() >= new Date(order.completed_at).getTime() + FEEDBACK_DELAY_MS;
    const feedbackAvailableIn =
      isCompleted &&
      !isSelling &&
      !order.private_feedback &&
      order.completed_at &&
      Date.now() < new Date(order.completed_at).getTime() + FEEDBACK_DELAY_MS;

    return (
      <Card key={order.id} className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 text-sm">
            {(order.seller?.display_name || order.gig?.title || "?")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground">{order.id.slice(0, 8)}…</span>
              <Badge className={`${statusClass} border-0 text-xs`}>{statusLabel}</Badge>
              <Badge variant="outline" className="text-xs capitalize">{order.package}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-foreground truncate">
              <Link to={`/orders/${order.id}`} className="hover:text-primary transition-colors">
                {order.gig?.title || "Gig deleted"}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground">
              {isSelling ? "From buyer" : `by ${order.seller?.display_name || "Seller"}`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-display font-bold text-foreground">₹{order.price}</div>
            {order.due_at && order.status !== "completed" && (
              <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3" />
                {Math.max(0, Math.ceil((new Date(order.due_at).getTime() - Date.now()) / (FEEDBACK_DELAY_MS)))}d left
              </div>
            )}
          </div>
          <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </Link>
            {canReview && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs text-muted-foreground hover:text-star gap-1"
                onClick={() => setReviewTarget(order)}
              >
                <Star className="h-4 w-4" /> Review
              </Button>
            )}
            {canEditReview && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs text-muted-foreground hover:text-primary gap-1"
                onClick={() => setReviewTarget(order)}
              >
                <Star className="h-4 w-4 fill-star text-star" /> Edit Review
              </Button>
            )}
            {canFeedback && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs text-muted-foreground hover:text-foreground gap-1"
                onClick={() => setFeedbackTarget(order)}
              >
                <EyeOff className="h-4 w-4" /> Feedback
              </Button>
            )}
            {feedbackAvailableIn && (
              <span className="text-[10px] text-muted-foreground self-center">Feedback in 24h</span>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">Track and manage your orders</p>

        <Tabs defaultValue="buying">
          <TabsList className="mb-6">
            <TabsTrigger value="buying">
              Buying {buyerOrders.length > 0 && `(${buyerOrders.length})`}
            </TabsTrigger>
            <TabsTrigger value="selling">
              Selling {sellerOrders.length > 0 && `(${sellerOrders.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buying">
            {loadingBuyer ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : buyerOrders.length > 0 ? (
              <div className="space-y-3">
                {buyerOrders.map(order => renderOrderCard(order, false))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Find a service you love and place your first order</p>
                <Link to="/search">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Services</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="selling">
            {loadingSeller ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : sellerOrders.length > 0 ? (
              <div className="space-y-3">
                {sellerOrders.map(order => renderOrderCard(order, true))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">No selling orders yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Create your first gig to start receiving orders</p>
                <Link to="/seller/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create a Gig</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />

      {/* Review dialog */}
      {reviewTarget && (
        <ReviewDialog
          open={!!reviewTarget}
          onOpenChange={(open) => !open && setReviewTarget(null)}
          orderId={reviewTarget.id}
          gigId={reviewTarget.gig_id}
          sellerId={reviewTarget.seller_id}
          gigTitle={reviewTarget.gig?.title || ""}
          existingReview={reviewTarget.review}
        />
      )}

      {/* Private feedback dialog */}
      {feedbackTarget && feedbackTarget.completed_at && (
        <PrivateFeedbackDialog
          open={!!feedbackTarget}
          onOpenChange={(open) => !open && setFeedbackTarget(null)}
          orderId={feedbackTarget.id}
          gigTitle={feedbackTarget.gig?.title || ""}
          completedAt={feedbackTarget.completed_at}
        />
      )}
    </div>
  );
};

export default OrdersPage;

