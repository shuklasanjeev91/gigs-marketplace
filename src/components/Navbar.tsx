import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Bell, MessageCircle, Heart, ChevronDown, Building2, ShieldCheck } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const MEGA_MENU_CLOSE_DELAY_MS = 120;

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const openMegaMenu = (catId: string) => {
    if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
    setActiveMegaMenu(catId);
  };

  const closeMegaMenu = () => {
    megaMenuCloseTimer.current = setTimeout(() => setActiveMegaMenu(null), MEGA_MENU_CLOSE_DELAY_MS);
  };

  const keepMegaMenuOpen = () => {
    if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayInitials = profile?.display_name
    ? profile.display_name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/neoelectron-logo.svg" alt="Neoelectron" className="h-12 w-auto" />
          </Link>

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
              <Link to="/pro">
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  <span className="text-primary font-semibold">Pro</span>
                </Button>
              </Link>
              {user ? (
                profile?.is_seller ? (
                  <Link to="/seller/dashboard">
                    <Button variant="ghost" size="sm" className="text-sm font-medium text-primary">Seller Dashboard</Button>
                  </Link>
                ) : (
                  <Link to="/buyer/dashboard">
                    <Button variant="ghost" size="sm" className="text-sm font-medium text-primary">My Dashboard</Button>
                  </Link>
                )
              ) : (
                <Link to="/become-seller">
                  <Button variant="ghost" size="sm" className="text-sm font-medium">Become a Seller</Button>
                </Link>
              )}
            </nav>

            {user ? (
              <>
                <div className="hidden md:flex items-center gap-1">
                  <Link to="/notifications">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/favorites">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 font-bold text-xs overflow-hidden p-0">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover rounded-full" />
                      ) : (
                        displayInitials
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-foreground">{profile?.display_name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link to="/profile" className="cursor-pointer">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/orders" className="cursor-pointer">Orders</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/notifications" className="cursor-pointer">Notifications</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/messages" className="cursor-pointer">Messages</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/favorites" className="cursor-pointer">Favorites</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link to="/settings" className="cursor-pointer">Settings</Link></DropdownMenuItem>
                    {profile?.is_admin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/business/dashboard" className="cursor-pointer flex items-center gap-2">
                            <Building2 className="h-3.5 w-3.5" /> Business Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5" /> Platform Admin
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-sm font-medium">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium">
                    Join
                  </Button>
                </Link>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Category bar with full-width mega menus */}
      <div className="hidden lg:block border-t border-border bg-card relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-10">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="flex items-center h-full"
                onMouseEnter={() => openMegaMenu(cat.id)}
                onMouseLeave={closeMegaMenu}
              >
                <Link
                  to={`/categories/${cat.id}`}
                  className={cn(
                    "text-sm whitespace-nowrap transition-colors flex items-center gap-1 h-full border-b-2",
                    activeMegaMenu === cat.id
                      ? "text-primary border-primary"
                      : "text-muted-foreground hover:text-primary border-transparent"
                  )}
                >
                  {cat.name}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", activeMegaMenu === cat.id && "rotate-180")} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width mega menu panel */}
        {activeMegaMenu && (
          <div
            className="absolute top-full left-0 right-0 z-50 bg-card border-b border-border shadow-xl"
            onMouseEnter={keepMegaMenuOpen}
            onMouseLeave={closeMegaMenu}
          >
            <div className="container mx-auto px-4 py-6">
              {(() => {
                const cat = categories.find(c => c.id === activeMegaMenu);
                if (!cat) return null;
                return (
                  <div className="grid grid-cols-4 gap-8">
                    {cat.megaMenuSections?.map(section => (
                      <div key={section.title}>
                        <h3 className="font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map(item => (
                            <li key={item}>
                              <Link
                                to={`/categories/${cat.id}?sub=${encodeURIComponent(item)}`}
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
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
            <Link to="/pro" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-primary font-semibold">Pro</span>
            </Link>
            {user ? (
              profile?.is_seller ? (
                <Link to="/seller/dashboard" className="py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>Seller Dashboard</Link>
              ) : (
                <Link to="/buyer/dashboard" className="py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>My Dashboard</Link>
              )
            ) : (
              <Link to="/become-seller" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Become a Seller</Link>
            )}
            {user ? (
              <>
                <Link to="/notifications" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Notifications</Link>
                <Link to="/orders" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
                <Link to="/dashboard" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                {profile?.is_admin && (
                  <>
                    <Link to="/business/dashboard" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Business Dashboard</Link>
                    <Link to="/admin" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Platform Admin</Link>
                  </>
                )}
                <button className="py-2 text-sm font-medium text-destructive text-left" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>Join</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
