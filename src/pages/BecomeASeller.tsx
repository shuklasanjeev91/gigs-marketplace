import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, DollarSign, Globe, TrendingUp, Users } from "lucide-react";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Globe, title: "Reach Global Clients", desc: "Access millions of buyers worldwide looking for your skills" },
  { icon: DollarSign, title: "Set Your Own Rates", desc: "You decide what your services are worth" },
  { icon: TrendingUp, title: "Grow Your Business", desc: "Build a reputation and get repeat customers" },
  { icon: Users, title: "Join Our Community", desc: "Connect with 890K+ freelancers worldwide" },
];

const BecomeASeller = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Start selling on giglance
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Turn your skills into income. Join thousands of freelancers earning on their own terms.
            </p>
            <a href="#create-gig">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold px-8">
                Start Selling <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card className="p-6 text-center shadow-card h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Create gig form */}
      <section id="create-gig" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-2">Create Your First Gig</h2>
          <p className="text-muted-foreground text-center mb-8">Fill in the details below to get started</p>

          <Card className="p-8 shadow-card">
            <form className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Gig Title</label>
                <Input placeholder="I will..." className="h-11" />
                <p className="text-xs text-muted-foreground mt-1">Start with "I will" and be specific about what you offer</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <Textarea placeholder="Describe your service in detail..." rows={5} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Starting Price ($)</label>
                  <Input type="number" placeholder="25" min="5" className="h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Delivery Time (days)</label>
                  <Input type="number" placeholder="3" min="1" className="h-11" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
                <Input placeholder="e.g. logo, branding, design (comma separated)" className="h-11" />
              </div>

              <Button type="button" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
                <CheckCircle className="h-5 w-5 mr-2" /> Publish Gig
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeASeller;
