import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  Users,
  DollarSign,
  BarChart2,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Star,
  TrendingUp,
  Package,
  MoreVertical,
  Eye,
  Ban,
  RefreshCw,
  FileText,
  Sliders,
  UserCheck,
} from "lucide-react";

/* ── Demo data ─────────────────────────────────────────────────────────────── */
type UserStatus = "active" | "suspended" | "under_review";
type OrderStatus = "pending" | "in_progress" | "completed" | "disputed" | "refunded";
type SellerVetStatus = "pending" | "approved" | "rejected";

interface AdminUser {
  id: string;
  display_name: string;
  email: string;
  role: "buyer" | "seller";
  status: UserStatus;
  joined_at: string;
  total_orders: number;
}

interface AdminOrder {
  id: string;
  buyer: string;
  seller: string;
  gig_title: string;
  price: number;
  status: OrderStatus;
  created_at: string;
}

interface SellerVetEntry {
  id: string;
  display_name: string;
  specialty: string;
  rating: number;
  orders_count: number;
  applied_at: string;
  status: SellerVetStatus;
}

interface PolicyItem {
  id: string;
  name: string;
  value: string;
  description: string;
}

const DEMO_USERS: AdminUser[] = [
  { id: "u1", display_name: "Arjun Sharma", email: "arjun@example.com", role: "seller", status: "active", joined_at: "2024-03-10", total_orders: 42 },
  { id: "u2", display_name: "Priya Patel", email: "priya@example.com", role: "buyer", status: "active", joined_at: "2024-05-22", total_orders: 8 },
  { id: "u3", display_name: "Carlos M.", email: "carlos@example.com", role: "seller", status: "under_review", joined_at: "2024-08-01", total_orders: 3 },
  { id: "u4", display_name: "Elena K.", email: "elena@example.com", role: "buyer", status: "suspended", joined_at: "2023-11-14", total_orders: 1 },
  { id: "u5", display_name: "Yuki T.", email: "yuki@example.com", role: "seller", status: "active", joined_at: "2024-01-30", total_orders: 27 },
];

const DEMO_ORDERS: AdminOrder[] = [
  { id: "o1", buyer: "Priya Patel", seller: "Arjun Sharma", gig_title: "Logo Design", price: 3500, status: "completed", created_at: "2025-05-01" },
  { id: "o2", buyer: "Raj Kumar", seller: "Yuki T.", gig_title: "Mobile App UI", price: 12000, status: "disputed", created_at: "2025-05-10" },
  { id: "o3", buyer: "Elena K.", seller: "Carlos M.", gig_title: "SEO Audit", price: 2000, status: "refunded", created_at: "2025-04-28" },
  { id: "o4", buyer: "Sam R.", seller: "Arjun Sharma", gig_title: "Brand Kit", price: 5500, status: "in_progress", created_at: "2025-05-12" },
];

const DEMO_VET_QUEUE: SellerVetEntry[] = [
  { id: "v1", display_name: "Neha Joshi", specialty: "Illustration & Art", rating: 4.8, orders_count: 18, applied_at: "2025-05-01", status: "pending" },
  { id: "v2", display_name: "Tom Williams", specialty: "Full-Stack Dev", rating: 5.0, orders_count: 35, applied_at: "2025-04-25", status: "pending" },
  { id: "v3", display_name: "Ana Silva", specialty: "Copywriting", rating: 4.6, orders_count: 22, applied_at: "2025-04-20", status: "approved" },
];

const DEMO_POLICIES: PolicyItem[] = [
  { id: "pol1", name: "Platform Commission", value: "20%", description: "Percentage taken from each transaction as platform fee." },
  { id: "pol2", name: "Seller Level – Rising Talent Orders", value: "10", description: "Min. completed orders to reach Rising Talent level." },
  { id: "pol3", name: "Seller Level – Top Rated Orders", value: "100", description: "Min. completed orders to reach Top Rated level." },
  { id: "pol4", name: "Refund Window (days)", value: "3", description: "Days after delivery within which a buyer can request a refund." },
  { id: "pol5", name: "Pro Seller Invite-Only", value: "Enabled", description: "Restrict Pro badge to manually vetted sellers only." },
];

/* ── Status badge helpers ──────────────────────────────────────────────────── */
const USER_STATUS_COLORS: Record<UserStatus, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-destructive/10 text-destructive",
  under_review: "bg-warning/10 text-warning",
};

const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-muted text-muted-foreground",
  in_progress: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  disputed: "bg-destructive/10 text-destructive",
  refunded: "bg-warning/10 text-warning",
};

const VET_STATUS_COLORS: Record<SellerVetStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

/* ── Component ─────────────────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const [users, setUsers] = useState<AdminUser[]>(DEMO_USERS);
  const [orders] = useState<AdminOrder[]>(DEMO_ORDERS);
  const [vetQueue, setVetQueue] = useState<SellerVetEntry[]>(DEMO_VET_QUEUE);
  const [policies, setPolicies] = useState<PolicyItem[]>(DEMO_POLICIES);
  const [userSearch, setUserSearch] = useState("");
  const [editingPolicy, setEditingPolicy] = useState<string | null>(null);
  const [policyDraft, setPolicyDraft] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.display_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const suspendUser = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "suspended" as UserStatus } : u))
    );

  const activateUser = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "active" as UserStatus } : u))
    );

  const approveVet = (id: string) =>
    setVetQueue((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "approved" as SellerVetStatus } : v))
    );

  const rejectVet = (id: string) =>
    setVetQueue((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "rejected" as SellerVetStatus } : v))
    );

  const startEditPolicy = (id: string, currentValue: string) => {
    setEditingPolicy(id);
    setPolicyDraft(currentValue);
  };

  const savePolicy = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: policyDraft } : p))
    );
    setEditingPolicy(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Platform Admin
          </h1>
          <Badge className="bg-destructive/10 text-destructive border-0 flex items-center gap-1">
            <Shield className="h-3 w-3" /> Administrator
          </Badge>
        </div>
        <p className="text-muted-foreground mb-8">
          Oversee and control all aspects of the marketplace.
        </p>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length, icon: <Users className="h-5 w-5 text-primary" />, color: "bg-primary/10" },
            { label: "Active Orders", value: orders.filter((o) => o.status === "in_progress").length, icon: <Package className="h-5 w-5 text-success" />, color: "bg-success/10" },
            { label: "Disputed", value: orders.filter((o) => o.status === "disputed").length, icon: <AlertTriangle className="h-5 w-5 text-destructive" />, color: "bg-destructive/10" },
            { label: "Vet Pending", value: vetQueue.filter((v) => v.status === "pending").length, icon: <UserCheck className="h-5 w-5 text-warning" />, color: "bg-warning/10" },
          ].map((stat) => (
            <Card key={stat.label} className="p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${stat.color} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users">
          <TabsList className="mb-6 flex-wrap gap-1 h-auto">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-1.5" /> Users
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-1.5" /> Orders & Finance
            </TabsTrigger>
            <TabsTrigger value="vetting">
              <UserCheck className="h-4 w-4 mr-1.5" /> Seller Vetting
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart2 className="h-4 w-4 mr-1.5" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="policy">
              <Sliders className="h-4 w-4 mr-1.5" /> Policy & Settings
            </TabsTrigger>
          </TabsList>

          {/* ── Users & Moderation ─────────────────────────────────────── */}
          <TabsContent value="users">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">
                User Management
              </h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredUsers.map((u) => (
                <Card key={u.id} className="p-4 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {u.display_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{u.display_name}</p>
                        <Badge variant="outline" className="text-xs capitalize">{u.role}</Badge>
                        <Badge className={`${USER_STATUS_COLORS[u.status]} border-0 text-xs capitalize`}>
                          {u.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-sm font-medium text-foreground">{u.total_orders}</p>
                      <p className="text-xs text-muted-foreground">orders</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-3.5 w-3.5" /> View Profile
                        </DropdownMenuItem>
                        {u.status !== "suspended" ? (
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => suspendUser(u.id)}
                          >
                            <Ban className="h-3.5 w-3.5" /> Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="gap-2 text-success"
                            onClick={() => activateUser(u.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5" /> Reactivate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Orders & Finance ───────────────────────────────────────── */}
          <TabsContent value="orders">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Orders & Financial Oversight
            </h2>

            {/* Revenue summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 shadow-card text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  ₹{orders.reduce((s, o) => s + o.price, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Gross Volume</p>
              </Card>
              <Card className="p-4 shadow-card text-center">
                <p className="text-2xl font-display font-bold text-success">
                  ₹{Math.round(orders.reduce((s, o) => s + o.price, 0) * 0.2).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Platform Revenue (20%)</p>
              </Card>
              <Card className="p-4 shadow-card text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-display font-bold text-warning">
                  ₹{orders.filter((o) => o.status === "refunded").reduce((s, o) => s + o.price, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Total Refunds</p>
              </Card>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className="p-4 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {order.gig_title.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {order.gig_title}
                        </p>
                        <Badge className={`${ORDER_STATUS_COLORS[order.status]} border-0 text-xs capitalize`}>
                          {order.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.buyer} → {order.seller}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">₹{order.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{order.created_at}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-3.5 w-3.5" /> View Order
                        </DropdownMenuItem>
                        {order.status === "disputed" && (
                          <>
                            <DropdownMenuItem className="gap-2 text-success">
                              <CheckCircle className="h-3.5 w-3.5" /> Resolve – Release Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <RefreshCw className="h-3.5 w-3.5" /> Resolve – Issue Refund
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === "in_progress" && (
                          <DropdownMenuItem className="gap-2 text-success">
                            <DollarSign className="h-3.5 w-3.5" /> Process Payout
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Seller Vetting ─────────────────────────────────────────── */}
          <TabsContent value="vetting">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Pro Seller Vetting
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manually review and approve sellers for the invite-only Pro tier.
                </p>
              </div>
              <Badge className="bg-warning/10 text-warning border-0">
                {vetQueue.filter((v) => v.status === "pending").length} Pending
              </Badge>
            </div>
            <div className="space-y-3">
              {vetQueue.map((entry) => (
                <Card key={entry.id} className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {entry.display_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">
                          {entry.display_name}
                        </p>
                        <Badge className={`${VET_STATUS_COLORS[entry.status]} border-0 text-xs capitalize`}>
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{entry.specialty}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-star text-star" />
                          {entry.rating.toFixed(1)}
                        </span>
                        <span>{entry.orders_count} completed orders</span>
                        <span>Applied {entry.applied_at}</span>
                      </div>
                    </div>
                    {entry.status === "pending" && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          className="bg-success hover:bg-success/90 text-white text-xs gap-1.5"
                          onClick={() => approveVet(entry.id)}
                        >
                          <CheckCircle className="h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs gap-1.5"
                          onClick={() => rejectVet(entry.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Analytics ─────────────────────────────────────────────── */}
          <TabsContent value="analytics">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Platform Analytics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Users", value: "1,248", change: "+12%", icon: <Users className="h-5 w-5 text-primary" />, color: "bg-primary/10" },
                { label: "Monthly Revenue", value: "₹4.2L", change: "+8%", icon: <DollarSign className="h-5 w-5 text-success" />, color: "bg-success/10" },
                { label: "Active Gigs", value: "3,560", change: "+5%", icon: <Package className="h-5 w-5 text-warning" />, color: "bg-warning/10" },
                { label: "Orders This Month", value: "824", change: "+18%", icon: <TrendingUp className="h-5 w-5 text-primary" />, color: "bg-primary/10" },
                { label: "Avg Order Value", value: "₹3,200", change: "-2%", icon: <BarChart2 className="h-5 w-5 text-destructive" />, color: "bg-destructive/10" },
                { label: "Dispute Rate", value: "1.4%", change: "-0.3%", icon: <AlertTriangle className="h-5 w-5 text-warning" />, color: "bg-warning/10" },
              ].map((stat) => (
                <Card key={stat.label} className="p-5 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-full ${stat.color} flex items-center justify-center shrink-0`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className={`text-xs font-medium mt-0.5 ${stat.change.startsWith("+") ? "text-success" : "text-destructive"}`}>
                        {stat.change} vs last month
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Top categories */}
            <Card className="p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" /> Top Categories by Revenue
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Web & Mobile Development", share: 35, revenue: "₹1.47L" },
                  { name: "Design & Creative", share: 28, revenue: "₹1.18L" },
                  { name: "Digital Marketing", share: 18, revenue: "₹75,600" },
                  { name: "Writing & Translation", share: 12, revenue: "₹50,400" },
                  { name: "Video & Animation", share: 7, revenue: "₹29,400" },
                ].map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{cat.name}</span>
                      <span className="font-medium text-foreground">{cat.revenue}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${cat.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* ── Policy & Feature Management ─────────────────────────── */}
          <TabsContent value="policy">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Policy & Feature Management
                </h2>
                <p className="text-sm text-muted-foreground">
                  Configure platform-wide settings, commission structures, and feature flags.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {policies.map((pol) => (
                <Card key={pol.id} className="p-5 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{pol.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{pol.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {editingPolicy === pol.id ? (
                        <>
                          <Input
                            value={policyDraft}
                            onChange={(e) => setPolicyDraft(e.target.value)}
                            className="h-8 w-28 text-sm"
                          />
                          <Button
                            size="sm"
                            className="h-8 bg-success hover:bg-success/90 text-white"
                            onClick={() => savePolicy(pol.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8"
                            onClick={() => setEditingPolicy(null)}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="text-sm font-mono">
                            {pol.value}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEditPolicy(pol.id, pol.value)}
                          >
                            <Settings className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Feature flags */}
            <Card className="p-5 shadow-card mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-primary" /> Feature Flags
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Pro Seller Programme", enabled: true },
                  { name: "Team / Business Accounts", enabled: true },
                  { name: "Net Payment Terms (Enterprise)", enabled: false },
                  { name: "Subscription Tiers for Sellers", enabled: true },
                ].map((flag) => (
                  <div key={flag.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="text-sm text-foreground">{flag.name}</span>
                    <Badge className={flag.enabled ? "bg-success/10 text-success border-0" : "bg-destructive/10 text-destructive border-0"}>
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
