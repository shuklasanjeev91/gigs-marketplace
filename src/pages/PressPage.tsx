import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";

const pressReleases = [
  {
    date: "March 2026",
    category: "Company",
    title: "Neoelectron reaches 4 million active buyers milestone",
    excerpt: "Platform growth accelerates as demand for remote freelance services hits record highs globally.",
  },
  {
    date: "February 2026",
    category: "Product",
    title: "Introducing AI-powered project briefs — get matched to freelancers in minutes",
    excerpt: "New Brief & Match feature uses AI to analyze your project requirements and surface the best-fit talent.",
  },
  {
    date: "January 2026",
    category: "Funding",
    title: "Neoelectron raises ₹250 crore Series C to accelerate global expansion",
    excerpt: "Funds will fuel growth across South-East Asia and the Middle East, plus investment in trust & safety infrastructure.",
  },
  {
    date: "December 2025",
    category: "Community",
    title: "Freelancers on Neoelectron earned ₹2.4 billion in 2025",
    excerpt: "Annual earnings report highlights the growing role of independent professionals in the global economy.",
  },
  {
    date: "November 2025",
    category: "Product",
    title: "Neoelectron Pro launches dedicated account management for enterprise clients",
    excerpt: "Enterprise-grade features including dedicated support, volume pricing, and consolidated billing now available.",
  },
  {
    date: "October 2025",
    category: "Partnership",
    title: "Neoelectron partners with NASSCOM to upskill 100,000 Indian freelancers",
    excerpt: "Joint initiative provides free certification programs and marketplace access to emerging tech professionals.",
  },
];

const coverage = [
  { outlet: "TechCrunch", quote: "The Fiverr of India — but with global ambitions and a community-first ethos.", logo: "TC" },
  { outlet: "Economic Times", quote: "Neoelectron is quietly building one of India's most important creator economy platforms.", logo: "ET" },
  { outlet: "Inc42", quote: "How Neoelectron is helping a million freelancers turn skills into sustainable income.", logo: "IN" },
  { outlet: "YourStory", quote: "The startup making freelancing as simple and trusted as online shopping.", logo: "YS" },
];

const PressPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-24 text-center">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Press & News
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-6">
            The latest news, announcements, and stories from Neoelectron.
          </p>
          <Button className="bg-card text-foreground hover:bg-card/90">
            <Download className="mr-2 h-4 w-4" /> Download press kit
          </Button>
        </motion.div>
      </section>

      {/* Press coverage */}
      <section className="py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-muted-foreground text-center mb-8">As seen in</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coverage.map((item) => (
              <div key={item.outlet} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mx-auto mb-3">
                  {item.logo}
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">{item.outlet}</p>
                <p className="text-xs text-muted-foreground italic">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-10">Latest news</h2>
          <div className="space-y-6">
            {pressReleases.map((item, i) => (
              <motion.article
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.excerpt}</p>
                <Button variant="link" className="p-0 h-auto text-primary text-sm">
                  Read more <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-secondary/30 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Media inquiries</h2>
          <p className="text-muted-foreground mb-4">
            For press inquiries, interviews, or media partnerships, reach out to our PR team.
          </p>
          <a href="mailto:press@neoelectron.com">
            <Button>press@neoelectron.com</Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PressPage;
