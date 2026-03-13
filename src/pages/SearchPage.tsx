import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { categories } from "@/lib/data";
import { useGigs } from "@/hooks/useGigs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X, Loader2 } from "lucide-react";

const DELIVERY_OPTIONS = [
  { label: "Express (24h)", value: 1 },
  { label: "Up to 3 days", value: 3 },
  { label: "Up to 7 days", value: 7 },
  { label: "Anytime", value: null },
];

const SELLER_LEVELS = ["Top Rated", "Level 2", "Level 1", "New"];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high" | "rating" | "reviews">("recommended");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: gigs = [], isLoading } = useGigs({
    query,
    category: selectedCategory,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    deliveryDays: selectedDelivery,
    sellerLevel: selectedLevel,
    sortBy,
  });

  const activeFilterCount = [
    selectedCategory !== "all",
    priceRange[0] > 0 || priceRange[1] < 500,
    selectedDelivery !== null,
    selectedLevel !== null,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500]);
    setSelectedDelivery(null);
    setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {query ? `Results for "${query}"` : "All Services"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? "Searching…" : `${gigs.length} service${gigs.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-primary text-primary" : ""}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-40 h-9 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Active filter chips */}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCategory("all")}>
              {categories.find(c => c.id === selectedCategory)?.name} <X className="h-3 w-3" />
            </Badge>
          )}
          {selectedDelivery && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedDelivery(null)}>
              {DELIVERY_OPTIONS.find(o => o.value === selectedDelivery)?.label} <X className="h-3 w-3" />
            </Badge>
          )}
          {selectedLevel && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedLevel(null)}>
              {selectedLevel} <X className="h-3 w-3" />
            </Badge>
          )}
          {activeFilterCount > 1 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground h-7">
              Clear all
            </Button>
          )}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mb-8 p-5 rounded-lg border border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Budget Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}{priceRange[1] === 500 ? "+" : ""}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Seller Level</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SELLER_LEVELS.map(level => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedLevel === level
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10 hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Delivery Time</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DELIVERY_OPTIONS.map(opt => (
                    <Badge
                      key={opt.label}
                      variant={selectedDelivery === opt.value ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedDelivery === opt.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10 hover:border-primary/30"
                      }`}
                      onClick={() =>
                        setSelectedDelivery(selectedDelivery === opt.value ? null : opt.value)
                      }
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gigs.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
            {activeFilterCount > 0 && (
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

