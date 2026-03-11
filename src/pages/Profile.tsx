import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Clock, Award, ExternalLink, MessageCircle } from "lucide-react";
import GigCard from "@/components/GigCard";
import { gigs } from "@/lib/data";

const Profile = () => {
  const sellerGigs = gigs.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 text-center shadow-card">
              <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold font-display mx-auto mb-4">
                DM
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">DesignMaster</h2>
              <p className="text-sm text-muted-foreground mt-1">Professional Designer</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-star text-star" />
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">(1,247 reviews)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <Badge className="bg-primary/10 text-primary border-0">Top Rated</Badge>
                <Badge className="bg-badge-pro text-badge-pro-foreground border-0">PRO</Badge>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <MessageCircle className="h-4 w-4 mr-2" /> Contact Me
              </Button>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> From</span>
                <span className="text-foreground font-medium">🇺🇸 United States</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Member since</span>
                <span className="text-foreground font-medium">Jan 2020</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Orders</span>
                <span className="text-foreground font-medium">2,450+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response time</span>
                <span className="text-foreground font-medium">1 hour</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last delivery</span>
                <span className="text-foreground font-medium">1 day ago</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["Logo Design", "Branding", "Illustrator", "Photoshop", "Figma", "UI/UX", "Typography"].map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="gigs">
              <TabsList className="mb-6">
                <TabsTrigger value="gigs">Gigs ({sellerGigs.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="gigs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sellerGigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="space-y-4">
                  {[
                    { user: "John D.", rating: 5, text: "Amazing designer! Delivered exactly what I envisioned.", date: "1 week ago", country: "🇺🇸" },
                    { user: "Lisa T.", rating: 5, text: "Very creative and professional. Quick turnaround.", date: "3 weeks ago", country: "🇫🇷" },
                    { user: "Mark R.", rating: 4, text: "Great communication and quality work. Recommended!", date: "1 month ago", country: "🇬🇧" },
                  ].map((review, i) => (
                    <div key={i} className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">{review.user[0]}</div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{review.user} {review.country}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-star text-star" />)}
                            <span className="text-xs text-muted-foreground ml-1">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-3">About Me</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I'm a professional graphic designer with over 8 years of experience. I specialize in logo design, branding, and visual identity. I've worked with hundreds of clients worldwide, from startups to Fortune 500 companies. My goal is to create designs that not only look stunning but also communicate your brand's unique story.
                  </p>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-3">Education</h3>
                  <p className="text-muted-foreground text-sm">BFA in Graphic Design — Rhode Island School of Design</p>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-3">Languages</h3>
                  <p className="text-muted-foreground text-sm">English (Fluent), Spanish (Conversational)</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
