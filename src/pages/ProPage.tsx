import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Shield, Clock, ArrowRight, Award } from "lucide-react";

const proFeatures = [
  { icon: Shield, title: "Vetted talent only", desc: "Every Pro seller is manually reviewed for skill, professionalism, and track record before being accepted." },
  { icon: Star, title: "Top 1% of talent", desc: "Pro sellers are identified from our best-performing freelancers across every category." },
  { icon: Clock, title: "Faster delivery", desc: "Pro sellers commit to faster response times and prioritise Pro orders in their queue." },
  { icon: Award, title: "Dedicated support", desc: "Get priority support from a dedicated customer success team when you need it most." },
];

const proCategories = [
  { name: "Logo Design", icon: "🎨", starting: "₹5,000" },
  { name: "Website Development", icon: "💻", starting: "₹15,000" },
  { name: "Video Production", icon: "🎬", starting: "₹10,000" },
  { name: "Brand Strategy", icon: "📊", starting: "₹12,000" },
  { name: "Copywriting", icon: "✍️", starting: "₹4,000" },
  { name: "Mobile App Dev", icon: "📱", starting: "₹20,000" },
];

const proSellers = [
  { name: "Alex R.", skill: "Brand Designer", rating: 5.0, orders: 312, badge: "Pro", initials: "AR" },
  { name: "Meera S.", skill: "Full-Stack Developer", rating: 5.0, orders: 450, badge: "Pro", initials: "MS" },
  { name: "James O.", skill: "Motion Designer", rating: 4.9, orders: 189, badge: "Pro", initials: "JO" },
  { name: "Priya T.", skill: "Content Strategist", rating: 5.0, orders: 275, badge: "Pro", initials: "PT" },
];

const testimonials = [
  {
    quote: "We found our lead developer through Neoelectron Pro and shipped our MVP 6 weeks ahead of schedule.",
    name: "Rohan M.", company: "FinTech startup, Mumbai", initials: "RM",
  },
  {
    quote: "The quality of Pro designers is exceptional. We've rebuilt our entire brand with one freelancer.",
    name: "Ananya K.", company: "DTC brand, Delhi", initials: "AK",
  },
];

const ProPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0 text-sm px-3 py-1">
                ✦ Neoelectron Pro
              </Badge>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
                Exceptional talent.<br />Guaranteed.
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl">
                Access the top 1% of freelance talent, rigorously vetted and ready to deliver
                professional-grade results for your most important projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/search?q=pro">
                  <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold px-8">
                    Explore Pro talent <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/become-seller">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                    Apply as Pro seller
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {["Manually vetted", "Background checked", "Skill tested", "NDA available", "Dedicated support"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">Why choose Pro?</h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Pro isn't just a badge — it's a rigorous selection process that ensures every seller can deliver at the highest level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro categories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-10">Browse Pro services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {proCategories.map((cat) => (
              <Link key={cat.name} to={`/search?q=${encodeURIComponent(cat.name)}`}>
                <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <h3 className="font-medium text-foreground text-sm">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Starting at {cat.starting}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pro sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-10">Featured Pro sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {proSellers.map((seller) => (
              <div key={seller.name} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary font-bold">
                  {seller.initials}
                </div>
                <Badge className="mb-2 text-xs bg-primary text-primary-foreground">✦ {seller.badge}</Badge>
                <p className="font-semibold text-foreground text-sm">{seller.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{seller.skill}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{seller.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span>{seller.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-10">What clients say</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-8">
                <p className="text-foreground italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient text-center">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">Ready to hire Pro?</Badge>
          <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Get Pro results, every time
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Join thousands of businesses that rely on Neoelectron Pro for their most critical projects.
          </p>
          <Link to="/search?q=pro">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold px-10">
              Find Pro talent
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProPage;
