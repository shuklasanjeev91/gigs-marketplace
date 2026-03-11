import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ShoppingCart, Star, TrendingUp, Eye, Clock, BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Earnings", value: "$12,450", icon: DollarSign, change: "+12%" },
  { label: "Active Orders", value: "8", icon: ShoppingCart, change: "+3" },
  { label: "Avg. Rating", value: "4.9", icon: Star, change: "+0.1" },
  { label: "Profile Views", value: "2,340", icon: Eye, change: "+18%" },
];

const orders = [
  { id: "ORD-001", buyer: "John D.", service: "Logo Design", price: 75, status: "In Progress", due: "2 days" },
  { id: "ORD-002", buyer: "Sarah M.", service: "Brand Identity", price: 250, status: "In Review", due: "Today" },
  { id: "ORD-003", buyer: "Alex K.", service: "Logo Design", price: 50, status: "In Progress", due: "4 days" },
  { id: "ORD-004", buyer: "Emma L.", service: "Web Design", price: 300, status: "Completed", due: "Done" },
  { id: "ORD-005", buyer: "Mike R.", service: "Logo Redesign", price: 100, status: "Completed", due: "Done" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, DesignMaster!</p>
          </div>
          <Link to="/become-seller">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" /> Create Gig
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <Card key={stat.label} className="p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-xs text-primary">{stat.change}</Badge>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Orders */}
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card className="shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Order</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Buyer</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Service</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Price</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(o => o.status !== "Completed").map(order => (
                      <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-mono text-foreground">{order.id}</td>
                        <td className="px-5 py-4 text-sm text-foreground">{order.buyer}</td>
                        <td className="px-5 py-4 text-sm text-foreground">{order.service}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-foreground">${order.price}</td>
                        <td className="px-5 py-4">
                          <Badge variant={order.status === "In Review" ? "default" : "secondary"} className={order.status === "In Review" ? "bg-warning text-accent-foreground" : ""}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {order.due}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card className="shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Order</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Buyer</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Service</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Price</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(o => o.status === "Completed").map(order => (
                      <tr key={order.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-4 text-sm font-mono text-foreground">{order.id}</td>
                        <td className="px-5 py-4 text-sm text-foreground">{order.buyer}</td>
                        <td className="px-5 py-4 text-sm text-foreground">{order.service}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-foreground">${order.price}</td>
                        <td className="px-5 py-4"><Badge className="bg-success text-primary-foreground border-0">Completed</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Revenue Overview</h3>
                </div>
                <div className="space-y-3">
                  {["Jan", "Feb", "Mar", "Apr", "May"].map((month, i) => {
                    const value = [1200, 1800, 2100, 1600, 2400][i];
                    const max = 2400;
                    return (
                      <div key={month} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-8">{month}</span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary/80 rounded-full transition-all" style={{ width: `${(value / max) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium text-foreground w-14 text-right">${value}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Performance</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Response Rate</span><span className="text-sm font-semibold text-foreground">98%</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">On-Time Delivery</span><span className="text-sm font-semibold text-foreground">100%</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Order Completion</span><span className="text-sm font-semibold text-foreground">99%</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Repeat Buyers</span><span className="text-sm font-semibold text-foreground">67%</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Cancellation Rate</span><span className="text-sm font-semibold text-foreground">1%</span></div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
