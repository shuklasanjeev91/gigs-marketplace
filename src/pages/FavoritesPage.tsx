import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { gigs } from "@/lib/data";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const favoriteGigs = gigs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Favorites</h1>
        <p className="text-muted-foreground mb-8">Services you've saved for later</p>

        {favoriteGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {favoriteGigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No favorites yet</h3>
            <p className="text-muted-foreground">Start exploring and save services you love</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
