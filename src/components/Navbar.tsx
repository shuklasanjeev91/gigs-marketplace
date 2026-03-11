import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Bell, MessageCircle, Heart, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-display font-bold text-gradient">giglance</span>
            <span className="text-primary text-2xl font-bold">.</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full flex">
              <Input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0 h-10 bg-secondary/50 focus-visible:ring-primary"
              />
              <Button type="submit" size="sm" className="rounded-l-none h-10 px-4 bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm font-medium text-foreground">
                    Explore <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categories.slice(0, 8).map(cat => (
                    <DropdownMenuItem key={cat.id} asChild>
                      <Link to={`/categories/${cat.id}`} className="cursor-pointer">
                        <span className="mr-2">{cat.icon}</span> {cat.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/categories" className="cursor-pointer font-medium text-primary">
                      All Categories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/become-seller">
                <Button variant="ghost" size="sm" className="text-sm font-medium">Become a Seller</Button>
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" />
              </Button>
              <Link to="/orders">
                <Button variant="ghost" size="sm" className="text-sm">Orders</Button>
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild><Link to="/profile" className="cursor-pointer">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/dashboard" className="cursor-pointer">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/orders" className="cursor-pointer">Orders</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/favorites" className="cursor-pointer">Favorites</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/settings" className="cursor-pointer">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Category bar - desktop */}
      <div className="hidden lg:block border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-4">
          <form onSubmit={handleSearch}>
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0 h-10"
              />
              <Button type="submit" size="sm" className="rounded-l-none h-10 px-4">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <nav className="flex flex-col gap-2">
            <Link to="/categories" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
            <Link to="/become-seller" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Become a Seller</Link>
            <Link to="/orders" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
            <Link to="/dashboard" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
