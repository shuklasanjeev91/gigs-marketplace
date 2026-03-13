import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, MessageCircle, BookOpen, Shield, CreditCard, Package, Star, User } from "lucide-react";

const categories = [
  { icon: Package, label: "Orders & Delivery", count: 24 },
  { icon: CreditCard, label: "Payments & Billing", count: 18 },
  { icon: User, label: "Account & Profile", count: 15 },
  { icon: Star, label: "Reviews & Ratings", count: 12 },
  { icon: Shield, label: "Trust & Safety", count: 20 },
  { icon: MessageCircle, label: "Messages & Communication", count: 10 },
  { icon: BookOpen, label: "Seller Guidelines", count: 30 },
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse gigs, select the package that suits you, and click 'Continue'. You'll be guided through checkout where you can add requirements and pay securely. The seller will be notified and your order will begin.",
  },
  {
    q: "When will I get paid as a seller?",
    a: "Funds are held in escrow until your order is marked complete. After completion, there is a 14-day clearing period before funds are available for withdrawal. Top Rated sellers benefit from a 7-day clearing period.",
  },
  {
    q: "What if I'm not satisfied with the delivery?",
    a: "You can request a revision directly from your order page. If the seller cannot meet your requirements, you can escalate to our Resolution Center to request a full or partial refund within 14 days of delivery.",
  },
  {
    q: "How do I contact a seller before ordering?",
    a: "Visit the gig page and click 'Contact Seller'. You can ask questions, share brief details, and get a response before committing. Most sellers respond within a few hours.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you cancel before the seller starts work, you'll receive a full refund. After work begins, partial refunds may apply depending on the situation. Our buyer protection policy covers you throughout.",
  },
  {
    q: "How do seller levels work?",
    a: "Sellers progress through levels — New Seller, Level 1, Level 2, and Top Rated Seller — based on order completions, ratings, response time, and compliance with our community standards.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed through PCI-DSS compliant providers. We never store raw card numbers on our servers. You can also pay via UPI, net banking, or wallet.",
  },
  {
    q: "How do I report a problem?",
    a: "On any gig, order, or message you'll find a Report button. You can also reach our support team directly through the Help Center chat. We review all reports within 24 hours.",
  },
];

const HelpPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-20 text-center">
        <motion.div
          className="container mx-auto px-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            How can we help?
          </h1>
          <p className="text-primary-foreground/80 mb-8">
            Search our knowledge base or browse by category below.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-12 h-12 text-base bg-card text-foreground border-0 rounded-xl"
              placeholder="Search for answers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">Browse by topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:bg-primary/5 transition-colors text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
                <Badge variant="outline" className="text-xs">{cat.count} articles</Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-foreground mb-10 text-center">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs
              .filter((f) => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
              .map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          {search && faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No results found for "{search}".</p>
          )}
        </div>
      </section>

      {/* Still need help */}
      <section className="py-16 bg-secondary/30 text-center">
        <div className="container mx-auto px-4">
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Our support team is available 24/7 to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>Start a live chat</Button>
            <Button variant="outline">Submit a ticket</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;
