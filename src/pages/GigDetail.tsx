import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gigs } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, RefreshCw, Check, Heart, Share2, ArrowLeft, MessageCircle } from "lucide-react";

const GigDetail = () => {
  const { id } = useParams();
  const gig = gigs.find(g => g.id === id);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Gig not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const packages = [
    { name: "Basic", price: gig.price, delivery: gig.deliveryDays, revisions: 2, features: ["Source file", "1 concept"] },
    { name: "Standard", price: Math.round(gig.price * 2), delivery: gig.deliveryDays + 2, revisions: 5, features: ["Source file", "3 concepts", "Social media kit"] },
    { name: "Premium", price: Math.round(gig.price * 3.5), delivery: gig.deliveryDays + 5, revisions: -1, features: ["Source file", "5 concepts", "Social media kit", "Brand guidelines", "Priority support"] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary"><ArrowLeft className="h-4 w-4 inline mr-1" />Home</Link>
          <span>/</span>
          <Link to={`/categories/${gig.category}`} className="hover:text-primary capitalize">{gig.category.replace("-", " & ").replace("tech", "Tech")}</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{gig.title}</h1>

            {/* Seller info bar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {gig.seller.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{gig.seller.name}</span>
                  <span>{gig.seller.country}</span>
                  {gig.seller.level === "Top Rated" && <Badge className="bg-primary/10 text-primary border-0 text-xs">Top Rated</Badge>}
                  {gig.isPro && <Badge className="bg-badge-pro text-badge-pro-foreground border-0 text-xs">PRO</Badge>}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-3.5 w-3.5 fill-star text-star" />
                  <span className="font-semibold">{gig.seller.rating}</span>
                  <span className="text-muted-foreground">({gig.seller.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>

            {/* Gig image */}
            <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl opacity-30">{gig.category === "graphics-design" ? "🎨" : "💻"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">About This Gig</h2>
              <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
                <p>Welcome! I'm a professional freelancer with extensive experience in delivering high-quality work. I'm passionate about helping businesses and individuals achieve their goals through exceptional {gig.category.replace("-", " & ")} services.</p>
                <p>With this gig, you'll receive top-notch results tailored to your specific needs. I take pride in clear communication, fast turnaround, and exceeding expectations every time.</p>
                <h3 className="text-foreground font-semibold">What you'll get:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Professional quality deliverables</li>
                  <li>Unlimited revisions until you're satisfied</li>
                  <li>Fast and clear communication</li>
                  <li>Source files included</li>
                  <li>100% original and unique work</li>
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Reviews</h2>
              <div className="space-y-4">
                {[
                  { user: "John D.", rating: 5, text: "Absolutely fantastic work! Delivered ahead of schedule and exceeded all my expectations. Will definitely order again.", date: "2 weeks ago", country: "🇺🇸" },
                  { user: "Sarah M.", rating: 5, text: "Very professional and responsive. The quality of work was outstanding. Highly recommended!", date: "1 month ago", country: "🇬🇧" },
                  { user: "Alex K.", rating: 4, text: "Great service overall. Communication was excellent and revisions were handled quickly.", date: "2 months ago", country: "🇩🇪" },
                ].map((review, i) => (
                  <div key={i} className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-foreground">{review.user}</span>
                          <span className="text-xs">{review.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-star text-star" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
                <Tabs defaultValue="standard" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-none h-12 bg-muted">
                    {packages.map(pkg => (
                      <TabsTrigger key={pkg.name} value={pkg.name.toLowerCase()} className="text-sm font-medium">
                        {pkg.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {packages.map(pkg => (
                    <TabsContent key={pkg.name} value={pkg.name.toLowerCase()} className="p-5 mt-0">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-3xl font-display font-bold text-foreground">${pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {pkg.delivery} days</span>
                        <span className="flex items-center gap-1"><RefreshCw className="h-4 w-4" /> {pkg.revisions === -1 ? "Unlimited" : pkg.revisions} revisions</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
                        Continue (${pkg.price})
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <Button variant="outline" className="w-full h-11 font-medium">
                <MessageCircle className="h-4 w-4 mr-2" /> Contact Seller
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Heart className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GigDetail;
