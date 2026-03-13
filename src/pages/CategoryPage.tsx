import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { categories } from "@/lib/data";
import { useGigs } from "@/hooks/useGigs";
import { Loader2 } from "lucide-react";

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);

  const { data: categoryGigs = [], isLoading } = useGigs(
    id ? { category: id } : {}
  );

  if (!id) {
    // All categories view
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-8">All Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="group p-6 rounded-lg border border-border bg-card hover:bg-category-hover hover:border-primary/30 transition-all"
              >
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.count.toLocaleString()} services</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {cat.subcategories.slice(0, 3).map(sub => (
                    <span key={sub} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{sub}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-primary">Categories</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category?.icon}</span>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">{category?.name || id}</h1>
              <p className="text-muted-foreground">
                {isLoading ? "Loading…" : `${categoryGigs.length} service${categoryGigs.length !== 1 ? "s" : ""} available`}
              </p>
            </div>
          </div>
          {category && (
            <div className="flex flex-wrap gap-2 mt-4">
              {category.subcategories.map(sub => (
                <Link key={sub} to={`/search?q=${encodeURIComponent(sub)}`}>
                  <span className="text-sm text-muted-foreground bg-secondary px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    {sub}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : categoryGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryGigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No services yet</h3>
            <p className="text-muted-foreground">Check back soon or explore other categories</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
