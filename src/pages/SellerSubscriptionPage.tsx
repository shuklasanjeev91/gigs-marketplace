import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check, Crown, Zap, Star, ArrowLeft, Loader2, ShieldCheck,
  BarChart3, Bot, MessageSquare, Users, Gift, Clock, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIPTION_DURATION_MS } from "@/lib/constants";

const TIERS = [
  {
    id: "kickstart",
    name: "Kickstart",
    tagline: "For new sellers getting started",
    price: 15,
    icon: Zap,
    color: "border-primary/40 bg-primary/5",
    headerColor: "bg-primary/10",
    badgeClass: "bg-primary/10 text-primary",
    minLevel: null,
    features: [
      { icon: Bot, text: "AI-generated gig feedback" },
      { icon: ShieldCheck, text: "ID verification badge" },
      { icon: TrendingUp, text: "Keyword research tools" },
      { icon: Users, text: "Priority support" },
      { icon: Clock, text: "Faster first-order matching" },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "For Level 1+ sellers scaling up",
    price: 25,
    icon: Star,
    color: "border-badge-pro/40 bg-badge-pro/5",
    headerColor: "bg-badge-pro/10",
    badgeClass: "bg-badge-pro/10 text-badge-pro",
    minLevel: "Level 1",
    features: [
      { icon: BarChart3, text: "Advanced analytics dashboard" },
      { icon: Gift, text: "5 discount coupons / month" },
      { icon: TrendingUp, text: "Gig promotion tools" },
      { icon: Bot, text: "\"Personal Assistant\" AI for pre-order chat" },
      { icon: Users, text: "All Kickstart features" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For Level 2+ top performers",
    price: 49,
    icon: Crown,
    color: "border-star/40 bg-star/5",
    headerColor: "bg-star/10",
    badgeClass: "bg-star/10 text-star",
    minLevel: "Level 2",
    features: [
      { icon: Users, text: "Dedicated Success Manager" },
      { icon: ShieldCheck, text: "\"Request to Order\" workflow" },
      { icon: Clock, text: "Early payout access" },
      { icon: Gift, text: "20 discount coupons / month" },
      { icon: BarChart3, text: "All Standard features" },
    ],
  },
] as const;

type TierId = "kickstart" | "standard" | "premium";

const LEVEL_ORDER: Record<string, number> = { New: 0, "Level 1": 1, "Level 2": 2, "Top Rated": 3 };

const SellerSubscriptionPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [subscribing, setSubscribing] = useState<TierId | null>(null);

  const { data: subscription } = useQuery({
    queryKey: ["seller-subscription", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("seller_subscriptions")
        .select("*")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .maybeSingle();
      return data;
    },
  });

  const handleSubscribe = async (tier: TierId) => {
    if (!user) { navigate("/login"); return; }
    setSubscribing(tier);
    try {
      if (subscription) {
        // Update existing subscription tier
        await supabase
          .from("seller_subscriptions")
          .update({ tier, updated_at: new Date().toISOString() })
          .eq("user_id", user.id);
      } else {
        await supabase.from("seller_subscriptions").insert({
          user_id: user.id,
          tier,
          status: "active",
          expires_at: new Date(Date.now() + SUBSCRIPTION_DURATION_MS).toISOString(),
        });
      }
      queryClient.invalidateQueries({ queryKey: ["seller-subscription", user.id] });
      toast({ title: "Subscribed! 🎉", description: `You are now on the ${tier} plan.` });
    } catch (err: any) {
      toast({ title: "Subscription failed", description: err?.message, variant: "destructive" });
    } finally {
      setSubscribing(null);
    }
  };

  const handleCancel = async () => {
    if (!user) return;
    await supabase
      .from("seller_subscriptions")
      .update({ status: "cancelled" })
      .eq("user_id", user.id);
    queryClient.invalidateQueries({ queryKey: ["seller-subscription", user.id] });
    toast({ title: "Subscription cancelled" });
  };

  const sellerLevel = profile?.seller_level || "New";
  const sellerLevelNum = LEVEL_ORDER[sellerLevel] ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-2">
          <Link to="/seller/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-badge-pro/10 text-badge-pro border-badge-pro/20 mb-3">
              <Crown className="h-3.5 w-3.5 mr-1" /> Seller Plus
            </Badge>
            <h1 className="text-4xl font-display font-bold text-foreground">Unlock your full potential</h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Premium tools, advanced analytics, and dedicated support to grow your freelancing business.
            </p>
          </div>
        </div>

        {/* Current subscription */}
        {subscription && (
          <div className="max-w-xl mx-auto mt-6 mb-8 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-success shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Active: {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} plan
                </p>
                {subscription.expires_at && (
                  <p className="text-xs text-muted-foreground">
                    Renews {new Date(subscription.expires_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
          {TIERS.map(tier => {
            const TierIcon = tier.icon;
            const isActive = subscription?.tier === tier.id;
            const minLevelNum = tier.minLevel ? LEVEL_ORDER[tier.minLevel] ?? 0 : 0;
            const isLocked = sellerLevelNum < minLevelNum;
            const isCurrentSub = subscription?.tier === tier.id;

            return (
              <Card key={tier.id} className={`relative flex flex-col border-2 ${tier.color} shadow-card transition-all hover:shadow-card-hover ${isActive ? "ring-2 ring-primary" : ""}`}>
                {/* Badge */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground border-0 shadow">Current Plan</Badge>
                  </div>
                )}

                {/* Header */}
                <div className={`p-6 rounded-t-xl ${tier.headerColor}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tier.badgeClass}`}>
                      <TierIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  {tier.minLevel && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Requires{" "}
                      <span className="font-medium text-foreground">{tier.minLevel}</span>
                      {" "}seller level
                    </p>
                  )}
                </div>

                <Separator />

                {/* Features */}
                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {tier.features.map(f => {
                      const FIcon = f.icon;
                      return (
                        <li key={f.text} className="flex items-start gap-2.5 text-sm text-foreground">
                          <div className="mt-0.5 shrink-0">
                            <FIcon className="h-4 w-4 text-primary" />
                          </div>
                          {f.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  {isLocked ? (
                    <div className="w-full py-2 px-4 rounded-lg bg-muted text-muted-foreground text-sm text-center">
                      Requires {tier.minLevel}
                    </div>
                  ) : isCurrentSub ? (
                    <Button variant="outline" className="w-full" disabled>
                      <Check className="h-4 w-4 mr-2" /> Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={!!subscribing}
                    >
                      {subscribing === tier.id ? (
                        <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Subscribing…</>
                      ) : subscription ? (
                        "Switch to this plan"
                      ) : (
                        "Get started"
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Level progress */}
        <div className="max-w-2xl mx-auto mt-12 p-6 rounded-xl border border-border bg-card shadow-card">
          <h3 className="text-lg font-display font-bold text-foreground mb-1">Your Seller Level</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Reach higher levels to unlock premium subscription tiers.
          </p>
          <div className="flex items-center gap-4">
            {["New", "Level 1", "Level 2", "Top Rated"].map((level, i) => {
              const reached = sellerLevelNum >= i;
              return (
                <div key={level} className="flex items-center gap-2 flex-1">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      reached ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {reached ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${reached ? "text-foreground" : "text-muted-foreground"}`}>
                    {level}
                  </span>
                  {i < 3 && (
                    <div className={`flex-1 h-0.5 ${sellerLevelNum > i ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Current level: <span className="font-semibold text-foreground">{sellerLevel}</span>.
            Complete more orders to advance automatically.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerSubscriptionPage;
