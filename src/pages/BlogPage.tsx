import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    category: "Seller Tips",
    title: "10 ways to get your first order on Neoelectron",
    excerpt: "Starting out can be tough. Here are proven strategies from top sellers on getting that crucial first order.",
    date: "March 10, 2026",
    readTime: "6 min read",
    slug: "get-first-order",
    emoji: "🚀",
  },
  {
    category: "Business",
    title: "How to brief a freelancer — and why it matters",
    excerpt: "A clear brief is the single biggest predictor of project success. Learn what to include and what to avoid.",
    date: "March 7, 2026",
    readTime: "5 min read",
    slug: "brief-a-freelancer",
    emoji: "📋",
  },
  {
    category: "AI & Trends",
    title: "The rise of AI services: What it means for freelancers",
    excerpt: "AI isn't replacing freelancers — it's transforming what they can offer. We look at the fastest growing AI gigs.",
    date: "March 5, 2026",
    readTime: "7 min read",
    slug: "ai-services-rise",
    emoji: "🤖",
  },
  {
    category: "Success Stories",
    title: "From corporate job to ₹12L/year freelancer in 14 months",
    excerpt: "Designer Priya T. shares her journey from quitting her day job to building a six-figure freelance business.",
    date: "March 2, 2026",
    readTime: "8 min read",
    slug: "success-story-priya",
    emoji: "⭐",
  },
  {
    category: "Product",
    title: "Introducing enhanced gig packages — more flexibility for sellers",
    excerpt: "We've redesigned how gig packages work, giving sellers more control over what they offer and at what price.",
    date: "Feb 28, 2026",
    readTime: "3 min read",
    slug: "new-gig-packages",
    emoji: "📦",
  },
  {
    category: "Buyer Guide",
    title: "How to evaluate a freelancer's portfolio",
    excerpt: "Not all portfolios are equal. Here's a guide to reading between the lines and spotting genuine skill.",
    date: "Feb 25, 2026",
    readTime: "5 min read",
    slug: "evaluate-portfolio",
    emoji: "🔍",
  },
];

const categories = ["All", "Seller Tips", "Business", "AI & Trends", "Success Stories", "Product", "Buyer Guide"];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-20 text-center">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            The Neoelectron Blog
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Insights, tips, and stories for freelancers and the businesses that hire them.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="sticky top-[72px] z-30 bg-card border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "default" : "ghost"}
                size="sm"
                className="shrink-0 text-sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card border border-border rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0 hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center bg-primary/5 text-8xl p-16">
              {posts[0].emoji}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-3 text-xs">{posts[0].category}</Badge>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">{posts[0].title}</h2>
              <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Clock className="h-3.5 w-3.5" /> {posts[0].readTime} · {posts[0].date}
              </div>
              <Button variant="outline" size="sm" className="w-fit">
                Read article <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.slug}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-center justify-center bg-primary/5 text-5xl h-32">
                  {post.emoji}
                </div>
                <div className="p-5">
                  <Badge variant="outline" className="text-xs mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime} · {post.date}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-hero-gradient text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">Stay in the loop</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Get the best articles, guides, and updates delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              className="flex-1 h-10 rounded-lg px-4 text-sm bg-card text-foreground border-0 outline-none"
              placeholder="Enter your email"
              type="email"
            />
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shrink-0 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
