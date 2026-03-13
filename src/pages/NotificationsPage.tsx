import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Star, Package, MessageCircle, Heart, TrendingUp, CheckCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

type Notification = {
  id: string;
  type: "order" | "message" | "review" | "favorite" | "promo" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New order received!",
    body: "You have a new order for 'Professional Logo Design'. Review and start working.",
    time: "2 minutes ago",
    read: false,
    link: "/orders",
  },
  {
    id: "2",
    type: "message",
    title: "New message from Rahul V.",
    body: "Hi! Can you share some examples of your previous work before I place an order?",
    time: "15 minutes ago",
    read: false,
    link: "/messages",
  },
  {
    id: "3",
    type: "review",
    title: "New 5-star review!",
    body: "Meera S. left a review: \"Excellent work, delivered ahead of schedule. Highly recommended!\"",
    time: "1 hour ago",
    read: false,
    link: "/seller/dashboard",
  },
  {
    id: "4",
    type: "order",
    title: "Order delivered successfully",
    body: "Your order for 'Full-Stack Web Development' has been marked as complete.",
    time: "3 hours ago",
    read: true,
    link: "/orders",
  },
  {
    id: "5",
    type: "favorite",
    title: "Someone saved your gig",
    body: "A buyer added your 'React Native Mobile App' gig to their favorites.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "promo",
    title: "You're eligible for Level 2!",
    body: "Congratulations! You've completed 50 orders. Upgrade to Level 2 Seller for more visibility.",
    time: "1 day ago",
    read: true,
    link: "/seller/dashboard",
  },
  {
    id: "7",
    type: "system",
    title: "Profile verification complete",
    body: "Your identity has been verified. Your profile now shows a verified badge.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "8",
    type: "message",
    title: "New message from Divya K.",
    body: "Loved the work! Can we discuss a follow-up project for next month?",
    time: "3 days ago",
    read: true,
    link: "/messages",
  },
];

const TYPE_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  order: { icon: Package, color: "text-primary" },
  message: { icon: MessageCircle, color: "text-blue-500" },
  review: { icon: Star, color: "text-yellow-500" },
  favorite: { icon: Heart, color: "text-rose-500" },
  promo: { icon: TrendingUp, color: "text-success" },
  system: { icon: Bell, color: "text-muted-foreground" },
};

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Sign in to view notifications</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to see your notifications.</p>
          <Link to="/login"><Button>Sign in</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const renderList = (items: Notification[]) => (
    items.length === 0 ? (
      <div className="text-center py-20">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
        <p className="text-muted-foreground">No notifications here.</p>
      </div>
    ) : (
      <div className="space-y-2">
        {items.map((notif) => {
          const { icon: Icon, color } = TYPE_ICONS[notif.type] ?? TYPE_ICONS.system;
          return (
            <div
              key={notif.id}
              className={`flex gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                notif.read
                  ? "bg-card border-border"
                  : "bg-primary/5 border-primary/20"
              }`}
              onClick={() => markRead(notif.id)}
            >
              <div className={`w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium ${notif.read ? "text-foreground" : "text-foreground"}`}>
                    {notif.title}
                    {!notif.read && (
                      <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full align-middle" />
                    )}
                  </p>
                  <span className="text-xs text-muted-foreground shrink-0">{notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{notif.body}</p>
                {notif.link && (
                  <Link
                    to={notif.link}
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View details →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-sm text-primary">
              <CheckCheck className="mr-1.5 h-4 w-4" /> Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderList(notifications)}
          </TabsContent>

          <TabsContent value="unread">
            {renderList(notifications.filter((n) => !n.read))}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default NotificationsPage;
