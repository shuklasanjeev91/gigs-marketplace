import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { gigs, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = [...gigs];
    if (query) {
      const q = query.toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      results = results.filter(g => {
        const text = `${g.title} ${g.tags.join(" ")} ${g.category} ${g.seller.name}`.toLowerCase();
        return words.some(w => text.includes(w)) || text.includes(q);
      });
    }
    if (selectedCategory !== "all") {
      results = results.filter(g => g.category === selectedCategory);
    }
    results = results.filter(g => g.price >= priceRange[0] && g.price <= priceRange[1]);
    if (sortBy === "price-low") results.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") results.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") results.sort((a, b) => b.seller.rating - a.seller.rating);
    else if (sortBy === "reviews") results.sort((a, b) => b.seller.reviews - a.seller.reviews);
    return results;
  }, [query, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {query ? `Results for "${query}"` : "All Services"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} services available</p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-primary text-primary" : ""}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
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

          <Select value={sortBy} onValueChange={setSortBy}>
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

          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCategory("all")}>
              {categories.find(c => c.id === selectedCategory)?.name} <X className="h-3 w-3" />
            </Badge>
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
                  <span>₹{priceRange[1]}+</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Seller Level</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Top Rated", "Level 2", "Level 1", "New"].map(level => (
                    <Badge key={level} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary/30">
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Delivery Time</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["24 hours", "Up to 3 days", "Up to 7 days", "Anytime"].map(time => (
                    <Badge key={time} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary/30">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
