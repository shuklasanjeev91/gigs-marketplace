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
    priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
    priceMax: priceRange[1] < 500 ? priceRange[1] : undefined,
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

      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {query ? `Results for "${query}"` : "All Services"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLoading ? "Searching…" : `${gigs.length} service${gigs.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-primary text-primary bg-primary/5" : ""}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1.5" />
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
            <SelectTrigger className="w-44 h-9 text-sm">
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
            <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedCategory("all")}>
              {categories.find(c => c.id === selectedCategory)?.name} <X className="h-3 w-3" />
            </Badge>
          )}
          {selectedDelivery && (
            <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedDelivery(null)}>
              {DELIVERY_OPTIONS.find(o => o.value === selectedDelivery)?.label} <X className="h-3 w-3" />
            </Badge>
          )}
          {selectedLevel && (
            <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedLevel(null)}>
              {selectedLevel} <X className="h-3 w-3" />
            </Badge>
          )}
          {activeFilterCount > 1 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-destructive h-7 hover:bg-destructive/10">
              Clear all
            </Button>
          )}
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-xl border border-border bg-card shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-5">Refine Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Budget Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span className="font-medium">₹{priceRange[0]}</span>
                  <span className="font-medium">₹{priceRange[1]}{priceRange[1] === 500 ? "+" : ""}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Freelancer Level</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SELLER_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedLevel === level
                          ? "bg-primary text-white border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Delivery Time</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {DELIVERY_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedDelivery(selectedDelivery === opt.value ? null : opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedDelivery === opt.value
                          ? "bg-primary text-white border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gigs.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <SlidersHorizontal className="h-9 w-9" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground max-w-xs">
              Try adjusting your search terms or removing some filters to see more results.
            </p>
            {activeFilterCount > 0 && (
              <Button variant="outline" className="mt-5" onClick={clearFilters}>
                Reset Filters
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

