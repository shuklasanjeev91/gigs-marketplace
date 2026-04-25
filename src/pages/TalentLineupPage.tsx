import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Search,
  Star,
  ShoppingCart,
  MessageCircle,
  Trash2,
  Users,
} from "lucide-react";
import { TalentEntry } from "@/lib/teamTypes";

/* ── Demo data ─────────────────────────────────────────────────────────────── */
const DEMO_TALENT: TalentEntry[] = [
  {
    id: "t1",
    seller_id: "s1",
    display_name: "Alex Rivera",
    specialty: "Logo Design & Branding",
    average_rating: 4.9,
    total_orders: 12,
    added_by: "Sara Lee",
    added_at: "2024-11-01",
  },
  {
    id: "t2",
    seller_id: "s2",
    display_name: "Elena Petrov",
    specialty: "Full-Stack Web Development",
    average_rating: 5.0,
    total_orders: 7,
    added_by: "Mike Chen",
    added_at: "2025-01-20",
  },
  {
    id: "t3",
    seller_id: "s3",
    display_name: "Carlos Mendez",
    specialty: "SEO & Content Writing",
    average_rating: 4.7,
    total_orders: 5,
    added_by: "Alex Johnson",
    added_at: "2025-02-10",
  },
  {
    id: "t4",
    seller_id: "s4",
    display_name: "Yuki Tanaka",
    specialty: "Video Editing & Motion Graphics",
    average_rating: 4.8,
    total_orders: 9,
    added_by: "Priya Nair",
    added_at: "2025-03-01",
  },
];

/* ── Component ─────────────────────────────────────────────────────────────── */
const TalentLineupPage = () => {
  const [talent, setTalent] = useState<TalentEntry[]>(DEMO_TALENT);
  const [search, setSearch] = useState("");

  const filtered = talent.filter(
    (t) =>
      t.display_name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const removeEntry = (id: string) =>
    setTalent((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-1">
              Talent Lineup
            </h1>
            <p className="text-muted-foreground">
              Your team's shared pool of favourite freelancers for easy
              re-hiring.
            </p>
          </div>
          <Link to="/search">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="h-4 w-4 mr-2" /> Find Freelancers
            </Button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search talent by name or specialty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 shadow-card text-center">
            <p className="text-2xl font-display font-bold text-foreground">
              {talent.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Saved Freelancers
            </p>
          </Card>
          <Card className="p-4 shadow-card text-center">
            <p className="text-2xl font-display font-bold text-foreground">
              {talent.reduce((s, t) => s + t.total_orders, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Orders Placed
            </p>
          </Card>
          <Card className="p-4 shadow-card text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-display font-bold text-foreground">
              {talent.length > 0
                ? (
                    talent.reduce((s, t) => s + t.average_rating, 0) /
                    talent.length
                  ).toFixed(1)
                : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
          </Card>
        </div>

        {/* Talent grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <Card
                key={entry.id}
                className="p-5 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
                    {entry.display_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {entry.display_name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.specialty}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-star font-medium">
                        <Star className="h-3 w-3 fill-star text-star" />
                        {entry.average_rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.total_orders} orders
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Added by {entry.added_by}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Link to="/search" className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> Hire Again
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">
              No talent found
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {search
                ? "No freelancers match your search."
                : "Start adding freelancers to your team's shared lineup."}
            </p>
            {!search && (
              <Link to="/search">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Browse Freelancers
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TalentLineupPage;
