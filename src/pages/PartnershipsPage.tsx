import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Handshake, Code2, Megaphone } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Strategic partners",
    desc: "Collaborate with us to bring Neoelectron's marketplace to new verticals, geographies, or enterprise clients.",
    cta: "Partner with us",
  },
  {
    icon: Code2,
    title: "Technology partners",
    desc: "Integrate with our API to build tools, plugins, and extensions that enhance the freelancer and buyer experience.",
    cta: "Explore our API",
  },
  {
    icon: Megaphone,
    title: "Affiliate partners",
    desc: "Earn commissions by referring buyers and sellers to our platform. Trusted by thousands of content creators.",
    cta: "Join affiliate program",
  },
  {
    icon: Handshake,
    title: "Education partners",
    desc: "Connect your students with real project opportunities and help them build portfolios with live work experience.",
    cta: "Apply for EDU access",
  },
];

const partners = [
  { name: "TechMahindra", abbr: "TM" },
  { name: "Infosys", abbr: "IN" },
  { name: "Razorpay", abbr: "RP" },
  { name: "Zoho", abbr: "ZO" },
  { name: "Freshworks", abbr: "FW" },
  { name: "Paytm", abbr: "PT" },
];

const benefits = [
  "Dedicated partnership success manager",
  "Co-marketing and co-selling opportunities",
  "Early access to new platform features",
  "Priority listing in the partner directory",
  "Volume pricing for enterprise clients",
  "Custom integration support",
];

const PartnershipsPage = () => {
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
          <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">Partner with us</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Grow together
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join the Neoelectron partner ecosystem and unlock new opportunities for your business
            while helping millions access world-class talent.
          </p>
        </motion.div>
      </section>

      {/* Partner types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Partnership programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={type.title}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.desc}</p>
                <Button variant="outline" size="sm">
                  {type.cta} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm font-medium uppercase tracking-wider mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-card border border-border rounded-xl px-8 py-4 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {p.abbr}
                </div>
                <span className="font-semibold text-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Partner benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-success text-xs">✓</span>
                </div>
                <p className="text-sm text-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-20 bg-hero-gradient text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to partner?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Tell us about your company and how you'd like to work together. Our partnerships team will be in touch within 2 business days.
          </p>
          <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold">
            Apply to partner program
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnershipsPage;
