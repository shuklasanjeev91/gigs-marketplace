import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, Globe } from "lucide-react";

const SettingsPage = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Display Name</label>
                <Input defaultValue="DesignMaster" className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input defaultValue="designer@example.com" className="h-10" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-1 block">Bio</label>
                <Input defaultValue="Professional graphic designer with 8+ years of experience" className="h-10" />
              </div>
            </div>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">Save Changes</Button>
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
                <label className="text-sm font-medium text-foreground mb-1 block">Current Password</label>
                <Input type="password" className="h-10 max-w-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
                <Input type="password" className="h-10 max-w-sm" />
              </div>
              <Button variant="outline" size="sm">Update Password</Button>
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
