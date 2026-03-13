import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, Briefcase, DollarSign, Clock, Plus, X, Package } from "lucide-react";
import { categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = ["Gig Details", "Packages & Pricing", "Review & Publish"];

type PackageTier = {
  name: string;
  description: string;
  price: string;
  deliveryDays: string;
  revisions: string;
  features: string[];
};

const defaultPackages: Record<string, PackageTier> = {
  basic: { name: "Basic", description: "", price: "", deliveryDays: "3", revisions: "1", features: [] },
  standard: { name: "Standard", description: "", price: "", deliveryDays: "5", revisions: "3", features: [] },
  premium: { name: "Premium", description: "", price: "", deliveryDays: "7", revisions: "-1", features: [] },
};

function PackageEditor({
  tier,
  pkg,
  onChange,
}: {
  tier: string;
  pkg: PackageTier;
  onChange: (updated: PackageTier) => void;
}) {
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    const f = featureInput.trim();
    if (f && !pkg.features.includes(f) && pkg.features.length < 10) {
      onChange({ ...pkg, features: [...pkg.features, f] });
      setFeatureInput("");
    }
  };

  const removeFeature = (f: string) =>
    onChange({ ...pkg, features: pkg.features.filter(x => x !== f) });

  const tierColors: Record<string, string> = {
    basic: "border-muted-foreground/30",
    standard: "border-primary/40",
    premium: "border-badge-pro/40",
  };

  const tierLabels: Record<string, string> = {
    basic: "🟢 Basic",
    standard: "🔵 Standard",
    premium: "🟣 Premium",
  };

  return (
    <div className={`p-5 rounded-xl border-2 ${tierColors[tier]} bg-card space-y-4`}>
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground">{tierLabels[tier]}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Package Name</label>
          <Input
            placeholder="e.g. Basic Package"
            value={pkg.name}
            onChange={e => onChange({ ...pkg, name: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (₹) *</label>
          <Input
            type="number"
            min="5"
            placeholder="25"
            value={pkg.price}
            onChange={e => onChange({ ...pkg, price: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Delivery Days *</label>
          <Input
            type="number"
            min="1"
            placeholder="3"
            value={pkg.deliveryDays}
            onChange={e => onChange({ ...pkg, deliveryDays: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Revisions (-1 = unlimited)</label>
          <Input
            type="number"
            min="-1"
            placeholder="1"
            value={pkg.revisions}
            onChange={e => onChange({ ...pkg, revisions: e.target.value })}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Short Description</label>
        <Textarea
          placeholder="What does this package include?"
          rows={2}
          value={pkg.description}
          onChange={e => onChange({ ...pkg, description: e.target.value })}
          className="text-sm resize-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Features</label>
        {pkg.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {pkg.features.map(f => (
              <Badge key={f} variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-0.5 text-xs">
                {f}
                <button onClick={() => removeFeature(f)} className="text-muted-foreground hover:text-destructive ml-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Source file"
            className="h-8 text-sm"
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
            disabled={pkg.features.length >= 10}
            maxLength={60}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={addFeature}
            disabled={!featureInput.trim() || pkg.features.length >= 10}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const SellerOnboarding = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Step 0 – gig details
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Step 1 – packages
  const [packages, setPackages] = useState<Record<string, PackageTier>>(defaultPackages);

  const updatePackage = (tier: string, updated: PackageTier) =>
    setPackages(prev => ({ ...prev, [tier]: updated }));

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 10) setTags(prev => [...prev, t]);
    setTagInput("");
  };
  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag));
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); }
  };

  const packagesValid = () =>
    Object.values(packages).every(
      pkg => parseFloat(pkg.price) >= 5 && parseInt(pkg.deliveryDays) >= 1 && pkg.name.trim()
    );

  const canNext = () => {
    if (step === 0) return title.trim().length > 0 && category.length > 0;
    if (step === 1) return packagesValid();
    return true;
  };

  const handlePublish = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      if (!profile?.is_seller) {
        await supabase.from("profiles").update({ is_seller: true }).eq("user_id", user.id);
      }

      const { data: gig, error: gigErr } = await supabase.from("gigs").insert({
        seller_id: user.id,
        title: title.trim(),
        category,
        description: description.trim() || null,
        price: parseFloat(packages.basic.price),
        delivery_days: parseInt(packages.basic.deliveryDays) || 3,
        tags,
      }).select("id").single();

      if (gigErr || !gig) throw gigErr ?? new Error("No gig returned");

      const pkgRows = (["basic", "standard", "premium"] as const).map(tier => ({
        gig_id: gig.id,
        tier,
        name: packages[tier].name.trim() || tier.charAt(0).toUpperCase() + tier.slice(1),
        description: packages[tier].description.trim() || null,
        price: parseFloat(packages[tier].price),
        delivery_days: parseInt(packages[tier].deliveryDays) || 3,
        revisions: parseInt(packages[tier].revisions) || 1,
        features: packages[tier].features,
      }));

      const { error: pkgErr } = await supabase.from("gig_packages").insert(pkgRows);
      if (pkgErr) throw pkgErr;

      await refreshProfile();
      toast({ title: "Gig published! 🎉", description: "Your gig is now live on neoelectron." });
      navigate("/seller/dashboard");
    } catch (err: any) {
      toast({ title: "Failed to create gig", description: err?.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link to="/seller/dashboard" className="hover:text-primary">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Create Gig</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Create your gig</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below to publish your service to buyers worldwide.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="h-5 w-5" /> : i + 1}
              </div>
              <span className={`hidden sm:inline text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && (
                <div className={`hidden sm:block w-12 md:w-20 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 0: Gig Details ── */}
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
                    <Input placeholder="I will design a modern logo for your brand" className="h-12" value={title} onChange={e => setTitle(e.target.value)} />
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
                    <Textarea placeholder="Describe your service in detail." rows={5} value={description} onChange={e => setDescription(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tags <span className="text-muted-foreground text-xs font-normal">(up to 10, press Enter or comma)</span>
                    </label>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-0.5 text-sm font-normal">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground ml-0.5">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. logo, branding, react"
                        className="h-11"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        disabled={tags.length >= 10}
                        maxLength={30}
                      />
                      <Button type="button" variant="outline" size="sm" className="h-11 px-3" onClick={() => addTag(tagInput)} disabled={!tagInput.trim() || tags.length >= 10}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 1: Packages & Pricing ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-8 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">Set your packages</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Define 3 pricing tiers. Buyers can choose the package that suits their needs.</p>
                <div className="space-y-5">
                  {(["basic", "standard", "premium"] as const).map(tier => (
                    <PackageEditor key={tier} tier={tier} pkg={packages[tier]} onChange={updated => updatePackage(tier, updated)} />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 2: Review ── */}
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
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Basic Price</div>
                      <div className="font-semibold text-foreground">₹{packages.basic.price}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Packages</div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      {(["basic", "standard", "premium"] as const).map(tier => (
                        <div key={tier} className="text-center">
                          <div className="font-medium text-foreground capitalize">{tier}</div>
                          <div className="text-muted-foreground">₹{packages[tier].price}</div>
                          <div className="text-muted-foreground">{packages[tier].deliveryDays}d</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {description && (
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Description</div>
                      <div className="text-sm text-foreground line-clamp-3">{description}</div>
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tags</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handlePublish} disabled={submitting} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</> : <><CheckCircle className="h-4 w-4" /> Publish Gig</>}
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOnboarding;
