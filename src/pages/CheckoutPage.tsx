import { useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star, Clock, RefreshCw, Check, ShieldCheck, CreditCard,
  ChevronRight, ArrowLeft, Lock, Info
} from "lucide-react";
import { gigs } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get("package") || "standard";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"confirm" | "payment" | "done">("confirm");
  const [requirements, setRequirements] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [placing, setPlacing] = useState(false);

  const gig = gigs.find(g => g.id === id);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Gig not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Go back home</Link>
        </div>
      </div>
    );
  }

  const packages = {
    basic: { name: "Basic", price: gig.price, delivery: gig.deliveryDays, revisions: 2, features: ["Source file", "1 concept"] },
    standard: { name: "Standard", price: Math.round(gig.price * 2), delivery: gig.deliveryDays + 2, revisions: 5, features: ["Source file", "3 concepts", "Social media kit"] },
    premium: { name: "Premium", price: Math.round(gig.price * 3.5), delivery: gig.deliveryDays + 5, revisions: -1, features: ["Source file", "5 concepts", "Social media kit", "Brand guidelines"] },
  };

  const selectedPkg = packages[packageName as keyof typeof packages] || packages.standard;
  const serviceFee = Math.round(selectedPkg.price * 0.05 * 100) / 100;
  const total = selectedPkg.price + serviceFee;

  const formatCard = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1500));
    setPlacing(false);
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">Order Placed!</h1>
            <p className="text-muted-foreground mb-2">
              Your order has been placed successfully. The seller will start working on your project shortly.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Order confirmation has been sent to your email.
            </p>
            <div className="bg-card border border-border rounded-xl p-5 mb-8 text-left">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  {gig.seller.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{gig.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">by {gig.seller.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {selectedPkg.delivery} days delivery</span>
                    <span className="font-semibold text-foreground">${selectedPkg.price}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/orders">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  View My Orders
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="font-medium px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to={`/gig/${gig.id}`} className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to gig
          </Link>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Confirm Order", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-sm font-medium ${
                (step === "confirm" && i === 0) || (step === "payment" && i === 1)
                  ? "text-primary"
                  : i === 0 && step === "payment"
                  ? "text-success"
                  : "text-muted-foreground"
              }`}>
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  (step === "confirm" && i === 0) || (step === "payment" && i === 1)
                    ? "bg-primary text-primary-foreground"
                    : i === 0 && step === "payment"
                    ? "bg-success text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {i === 0 && step === "payment" ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {label}
              </div>
              {i < 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {step === "confirm" && (
              <>
                {/* Gig summary card */}
                <Card className="p-6 shadow-card">
                  <h2 className="text-lg font-display font-bold text-foreground mb-4">Order Summary</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-2xl opacity-50">
                        {gig.category === "graphics-design" ? "🎨" : gig.category === "programming-tech" ? "💻" : gig.category === "writing-translation" ? "✍️" : gig.category === "video-animation" ? "🎬" : gig.category === "music-audio" ? "🎵" : "💼"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{gig.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                          {gig.seller.avatar}
                        </div>
                        <span className="text-xs text-muted-foreground">{gig.seller.name}</span>
                        <Star className="h-3 w-3 fill-star text-star ml-1" />
                        <span className="text-xs font-semibold">{gig.seller.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedPkg.name} Package
                        </Badge>
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {selectedPkg.delivery} days delivery
                        </Badge>
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" /> {selectedPkg.revisions === -1 ? "Unlimited" : selectedPkg.revisions} revisions
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Package Includes:</h4>
                    {selectedPkg.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-success shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Requirements */}
                <Card className="p-6 shadow-card">
                  <h2 className="text-lg font-display font-bold text-foreground mb-2">Tell the seller what you need</h2>
                  <p className="text-sm text-muted-foreground mb-4">Provide details to help the seller start your order right away.</p>
                  <Textarea
                    placeholder="Describe your requirements in detail. Include any specific style preferences, colors, references, or any other relevant information..."
                    className="min-h-[120px] resize-none"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground text-right mt-1">{requirements.length}/2000</p>
                </Card>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base"
                  onClick={() => setStep("payment")}
                >
                  Continue to Payment <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </>
            )}

            {step === "payment" && (
              <>
                <Card className="p-6 shadow-card">
                  <h2 className="text-lg font-display font-bold text-foreground mb-4">Payment Details</h2>

                  {/* Payment methods */}
                  <div className="flex gap-3 mb-6">
                    {["Credit Card", "PayPal"].map((method, i) => (
                      <button
                        key={method}
                        className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          i === 0 ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {method === "Credit Card" ? <CreditCard className="h-4 w-4 inline mr-2" /> : null}
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        className="h-11 font-mono tracking-widest"
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Cardholder Name</label>
                      <Input
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-11"
                        maxLength={100}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          className="h-11"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">CVV</label>
                        <Input
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          className="h-11"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-lg">
                    <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => setStep("confirm")}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button
                    className="flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" /> Confirm & Pay ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-5 shadow-card">
                <h3 className="font-display font-bold text-foreground mb-4">Order Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{selectedPkg.name} Package</span>
                    <span className="font-medium text-foreground">${selectedPkg.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      Service fee <Info className="h-3 w-3" />
                    </span>
                    <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                    <span>Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>{selectedPkg.delivery} days delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-4 w-4 text-accent shrink-0" />
                    <span>{selectedPkg.revisions === -1 ? "Unlimited" : selectedPkg.revisions} revision{selectedPkg.revisions !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </Card>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing an order, you agree to our{" "}
                <Link to="#" className="text-primary hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
