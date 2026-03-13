import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, MessageCircle, CheckCircle2, Package, Loader2, ArrowLeft, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type OrderDetail = {
  id: string;
  gig_id: string;
  seller_id: string;
  buyer_id: string;
  package: string;
  price: number;
  status: string;
  delivery_days: number;
  due_at: string | null;
  completed_at: string | null;
  requirements: string | null;
  created_at: string;
  gig?: { title: string; category: string } | null;
  seller?: { display_name: string | null; avatar_url: string | null } | null;
  buyer?: { display_name: string | null; avatar_url: string | null } | null;
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

const TIMELINE_STEPS = [
  { status: "pending", label: "Order placed", icon: Package },
  { status: "in_progress", label: "Work started", icon: Clock },
  { status: "delivered", label: "Delivered", icon: CheckCircle2 },
  { status: "completed", label: "Completed", icon: Star },
];

const statusOrder = ["pending", "in_progress", "delivered", "completed"];

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order-detail", id],
    enabled: !!id && !!user,
    queryFn: async (): Promise<OrderDetail | null> => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, gig_id, seller_id, buyer_id, package, price, status, delivery_days, due_at, completed_at, requirements, created_at")
        .eq("id", id!)
        .maybeSingle();

      if (error || !data) return null;

      const [{ data: gig }, { data: seller }, { data: buyer }] = await Promise.all([
        supabase.from("gigs").select("title, category").eq("id", data.gig_id).maybeSingle(),
        supabase.from("profiles").select("display_name, avatar_url").eq("user_id", data.seller_id).maybeSingle(),
        supabase.from("profiles").select("display_name, avatar_url").eq("user_id", data.buyer_id).maybeSingle(),
      ]);

      return { ...data, gig, seller, buyer };
    },
  });

  if (isLoading) {
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

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Order not found</h1>
          <p className="text-muted-foreground mb-6">This order doesn't exist or you don't have access to it.</p>
          <Link to="/orders"><Button>Back to orders</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isBuyer = user?.id === order.buyer_id;
  const currentStatusIdx = statusOrder.indexOf(order.status);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back */}
        <Link to="/orders" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to orders
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">
              {order.gig?.title || "Order"}
            </h1>
            <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <Badge className={`text-sm px-3 py-1 ${STATUS_COLORS[order.status] ?? ""}`}>
            {STATUS_LABELS[order.status] ?? order.status}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-foreground mb-6">Order progress</h2>
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
                <div className="space-y-6">
                  {TIMELINE_STEPS.map((step, i) => {
                    const isCompleted = i <= currentStatusIdx;
                    const isCurrent = i === currentStatusIdx;
                    return (
                      <div key={step.status} className="flex items-center gap-4 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        } ${isCurrent ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}>
                          <step.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {isCurrent && order.status !== "completed" && order.status !== "cancelled" && (
                            <p className="text-xs text-muted-foreground">Current status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Requirements */}
            {order.requirements && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-semibold text-foreground mb-3">Order requirements</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.requirements}</p>
              </div>
            )}

            {/* Actions */}
            {order.status === "delivered" && isBuyer && (
              <div className="bg-card border border-primary/30 rounded-xl p-6">
                <h2 className="font-semibold text-foreground mb-2">Review delivery</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  The seller has delivered this order. Review the work and accept or request revisions.
                </p>
                <div className="flex gap-3">
                  <Button size="sm">Accept delivery</Button>
                  <Button variant="outline" size="sm">Request revision</Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Order summary */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Order summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="text-foreground capitalize">{order.package}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground capitalize">{order.gig?.category?.replace(/-/g, " ") ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery time</span>
                  <span className="text-foreground">{order.delivery_days} day{order.delivery_days !== 1 ? "s" : ""}</span>
                </div>
                {order.due_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due date</span>
                    <span className="text-foreground">
                      {new Date(order.due_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{order.price.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Seller info */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">{isBuyer ? "Your seller" : "Your buyer"}</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {(isBuyer ? order.seller?.display_name : order.buyer?.display_name)?.slice(0, 2).toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isBuyer ? order.seller?.display_name : order.buyer?.display_name ?? "Unknown"}
                  </p>
                </div>
              </div>
              <Link to="/messages">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="mr-2 h-3.5 w-3.5" /> Send message
                </Button>
              </Link>
            </div>

            {/* Order dates */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Dates</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Placed</span>
                  <span className="text-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                {order.completed_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="text-foreground">
                      {new Date(order.completed_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetailPage;
