import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
      setCountry(profile.country || "");
    }
  }, [profile]);

  const avatarUrl = profile?.avatar_url;
  const initials = profile?.display_name
    ? profile.display_name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "?";

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be under 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    // Append cache-buster to force refresh
    const urlWithCacheBust = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: urlWithCacheBust })
      .eq("user_id", user.id);

    setUploading(false);

    if (updateError) {
      toast({ title: "Failed to save avatar", description: updateError.message, variant: "destructive" });
    } else {
      await refreshProfile();
      toast({ title: "Avatar updated" });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, bio, country })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      await refreshProfile();
      toast({ title: "Profile updated" });
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setUpdatingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setUpdatingPassword(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewPassword("");
      toast({ title: "Password updated" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your account preferences</p>

        <div className="space-y-6">
          {/* Profile */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Profile</h2>
            </div>

            {/* Avatar upload */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="relative h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold font-display shrink-0 overflow-hidden cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading…" : "Change Avatar"}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP. Max 5MB.</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Display Name</label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input value={user?.email || ""} disabled className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Country</label>
                <Input value={country} onChange={e => setCountry(e.target.value)} className="h-10" placeholder="e.g. United States" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-1 block">Bio</label>
                <Input value={bio} onChange={e => setBio(e.target.value)} className="h-10" placeholder="Tell us about yourself" />
              </div>
            </div>
            <Button onClick={handleSaveProfile} disabled={saving} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </Card>

          {/* Notifications */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Order updates", desc: "Get notified about order status changes" },
                { label: "Messages", desc: "Notifications for new messages" },
                { label: "Promotions", desc: "Tips and promotional offers" },
                { label: "Newsletter", desc: "Weekly marketplace updates" },
              ].map((n, i) => (
                <div key={n.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{n.label}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="h-10 max-w-sm" placeholder="Min 6 characters" />
              </div>
              <Button onClick={handleUpdatePassword} disabled={updatingPassword} variant="outline" size="sm">
                {updatingPassword ? "Updating…" : "Update Password"}
              </Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Billing */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Billing</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Manage your payment methods and billing info</p>
            <Button variant="outline" size="sm">Add Payment Method</Button>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
