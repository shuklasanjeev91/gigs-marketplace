import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MessageCircle, Star, Package } from "lucide-react";

const buyerOrders = [
  { id: "ORD-101", seller: "DesignMaster", service: "Logo Design", price: 75, status: "In Progress", due: "3 days", avatar: "DM" },
  { id: "ORD-102", seller: "CodeWizard", service: "React Website", price: 300, status: "In Review", due: "1 day", avatar: "CW" },
  { id: "ORD-103", seller: "WordSmith", service: "Blog Articles", price: 105, status: "Completed", due: "Done", avatar: "WS" },
  { id: "ORD-104", seller: "MotionPro", service: "Video Intro", price: 80, status: "Completed", due: "Done", avatar: "MP" },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">Track and manage your orders</p>

        <Tabs defaultValue="buying">
          <TabsList className="mb-6">
            <TabsTrigger value="buying">Buying</TabsTrigger>
            <TabsTrigger value="selling">Selling</TabsTrigger>
          </TabsList>

          <TabsContent value="buying">
            <div className="space-y-3">
              {buyerOrders.map(order => (
                <Card key={order.id} className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                      {order.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{order.id}</span>
                        <Badge
                          variant={order.status === "Completed" ? "default" : "secondary"}
                          className={order.status === "Completed" ? "bg-success text-primary-foreground border-0" : order.status === "In Review" ? "bg-warning text-accent-foreground" : ""}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground truncate">{order.service}</h3>
                      <p className="text-xs text-muted-foreground">by {order.seller}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-display font-bold text-foreground">${order.price}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" /> {order.due}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      {order.status === "Completed" && (
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-star">
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="selling">
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">No selling orders yet</h3>
              <p className="text-muted-foreground text-sm mb-4">Create your first gig to start receiving orders</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create a Gig</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
