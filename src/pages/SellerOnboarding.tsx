import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, Briefcase, Tag, DollarSign, Clock } from "lucide-react";
import { categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = ["Gig Details", "Pricing & Delivery", "Review & Publish"];

const SellerOnboarding = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("3");
  const [tags, setTags] = useState("");

  const canNext = () => {
    if (step === 0) return title.trim().length > 0 && category.length > 0;
    if (step === 1) return parseFloat(price) >= 5 && parseInt(deliveryDays) >= 1;
    return true;
  };

  const handlePublish = async () => {
    if (!user) return;
    setSubmitting(true);

    // Mark as seller
    if (!profile?.is_seller) {
      await supabase.from("profiles").update({ is_seller: true }).eq("user_id", user.id);
    }

    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);

    const { error } = await supabase.from("gigs").insert({
      seller_id: user.id,
      title: title.trim(),
      category,
      description: description.trim() || null,
      price: parseFloat(price),
      delivery_days: parseInt(deliveryDays) || 3,
      tags: tagsArray,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Failed to create gig", description: error.message, variant: "destructive" });
    } else {
      await refreshProfile();
      toast({ title: "Gig published! 🎉", description: "Your gig is now live on giglance." });
      navigate("/seller/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step ? "bg-primary text-primary-foreground" :
                i === step ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="h-5 w-5" /> : i + 1}
              </div>
              <span className={`hidden sm:inline text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className={`hidden sm:block w-12 md:w-20 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">Tell us about your gig</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Gig Title *</label>
                    <Input
                      placeholder="I will design a modern logo for your brand"
                      className="h-12"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Start with "I will" and be specific about what you offer</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Category *</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe your service in detail. What will you deliver? What makes your service unique?"
                      rows={5}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
                    <Input
                      placeholder="e.g. logo, branding, minimalist (comma separated)"
                      className="h-12"
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">Set your pricing</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Starting Price ($) *</label>
                    <Input
                      type="number"
                      placeholder="25"
                      min="5"
                      className="h-12"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Minimum $5. You can add package tiers later.</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Delivery Time (days) *</label>
                    <Input
                      type="number"
                      placeholder="3"
                      min="1"
                      className="h-12"
                      value={deliveryDays}
                      onChange={e => setDeliveryDays(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">Review your gig</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Title</div>
                    <div className="font-semibold text-foreground">{title}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Category</div>
                      <div className="font-semibold text-foreground">{categories.find(c => c.id === category)?.name || category}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Price</div>
                      <div className="font-semibold text-foreground">${price}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Delivery</div>
                    <div className="font-semibold text-foreground">{deliveryDays} day{parseInt(deliveryDays) !== 1 ? "s" : ""}</div>
                  </div>
                  {description && (
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Description</div>
                      <div className="text-sm text-foreground">{description}</div>
                    </div>
                  )}
                  {tags && (
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tags</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {tags.split(",").map(t => t.trim()).filter(Boolean).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {step < 2 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handlePublish}
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
              ) : (
                <><CheckCircle className="h-4 w-4" /> Publish Gig</>
              )}
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOnboarding;
