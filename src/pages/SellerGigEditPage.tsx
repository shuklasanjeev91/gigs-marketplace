import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Loader2, Package, X, Plus, DollarSign } from "lucide-react";
import { categories } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type PackageTier = {
  id?: string;
  name: string;
  description: string;
  price: string;
  deliveryDays: string;
  revisions: string;
  features: string[];
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

const defaultPackage = (tier: string): PackageTier => ({
  name: tier.charAt(0).toUpperCase() + tier.slice(1),
  description: "",
  price: "",
  deliveryDays: "3",
  revisions: "1",
  features: [],
});

const SellerGigEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Gig fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Packages
  const [packages, setPackages] = useState<Record<string, PackageTier>>({
    basic: defaultPackage("basic"),
    standard: defaultPackage("standard"),
    premium: defaultPackage("premium"),
  });

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      const { data: gig } = await supabase
        .from("gigs")
        .select("*")
        .eq("id", id)
        .eq("seller_id", user.id)
        .single();

      if (!gig) {
        toast({ title: "Gig not found", variant: "destructive" });
        navigate("/seller/dashboard");
        return;
      }

      setTitle(gig.title);
      setCategory(gig.category);
      setDescription(gig.description ?? "");
      setTags(gig.tags ?? []);

      const { data: pkgs } = await supabase
        .from("gig_packages")
        .select("*")
        .eq("gig_id", id);

      if (pkgs && pkgs.length > 0) {
        const merged: Record<string, PackageTier> = { ...packages };
        for (const p of pkgs) {
          merged[p.tier] = {
            id: p.id,
            name: p.name,
            description: p.description ?? "",
            price: String(p.price),
            deliveryDays: String(p.delivery_days),
            revisions: String(p.revisions),
            features: p.features ?? [],
          };
        }
        setPackages(merged);
      }

      setLoading(false);
    })();
  }, [id, user]);

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 10) setTags(prev => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  const updatePackage = (tier: string, updated: PackageTier) =>
    setPackages(prev => ({ ...prev, [tier]: updated }));

  const packagesValid = () =>
    Object.values(packages).every(
      p => parseFloat(p.price) >= 5 && parseInt(p.deliveryDays) >= 1 && p.name.trim()
    );

  const handleSave = async () => {
    if (!user || !id) return;
    setSaving(true);
    try {
      await supabase.from("gigs").update({
        title: title.trim(),
        category,
        description: description.trim() || null,
        price: parseFloat(packages.basic.price),
        delivery_days: parseInt(packages.basic.deliveryDays) || 3,
        tags,
      }).eq("id", id);

      // Upsert packages
      for (const tier of ["basic", "standard", "premium"] as const) {
        const p = packages[tier];
        const row = {
          gig_id: id,
          tier,
          name: p.name.trim() || tier.charAt(0).toUpperCase() + tier.slice(1),
          description: p.description.trim() || null,
          price: parseFloat(p.price),
          delivery_days: parseInt(p.deliveryDays) || 3,
          revisions: parseInt(p.revisions) || 1,
          features: p.features,
        };

        if (p.id) {
          await supabase.from("gig_packages").update(row).eq("id", p.id);
        } else {
          const { data: inserted } = await supabase.from("gig_packages").insert(row).select("id").single();
          if (inserted) {
            setPackages(prev => ({
              ...prev,
              [tier]: { ...prev[tier], id: inserted.id },
            }));
          }
        }
      }

      toast({ title: "Gig updated!", description: "Changes saved successfully." });
      navigate("/seller/dashboard");
    } catch (err: any) {
      toast({ title: "Save failed", description: err?.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/seller/dashboard" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Edit Gig</span>
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Edit Gig</h1>

        <div className="space-y-8">
          {/* Gig Details */}
          <Card className="p-8 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-foreground">Gig Details</h2>
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
                  placeholder="Describe your service in detail."
                  rows={5}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
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
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); }
                    }}
                    disabled={tags.length >= 10}
                    maxLength={30}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 px-3"
                    onClick={() => addTag(tagInput)}
                    disabled={!tagInput.trim() || tags.length >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Packages */}
          <Card className="p-8 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-foreground">Packages & Pricing</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Define 3 pricing tiers for buyers to choose from.</p>
            <div className="space-y-5">
              {(["basic", "standard", "premium"] as const).map(tier => (
                <PackageEditor key={tier} tier={tier} pkg={packages[tier]} onChange={updated => updatePackage(tier, updated)} />
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/seller/dashboard")}>
              Cancel
            </Button>
            <Button
              className="flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={handleSave}
              disabled={saving || !title.trim() || !category || !packagesValid()}
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving…</>
              ) : (
                <><Save className="h-4 w-4 mr-2" /> Save Changes</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerGigEditPage;
