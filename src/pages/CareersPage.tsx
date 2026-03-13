import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const departments = ["All", "Engineering", "Product", "Design", "Marketing", "Sales", "Operations"];

const openings = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    desc: "Build the interfaces that millions of freelancers and businesses use every day.",
  },
  {
    title: "Backend Engineer — Payments",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    desc: "Architect and scale our financial infrastructure handling millions of transactions.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    desc: "Shape the end-to-end experience for buyers and sellers across web and mobile.",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Mumbai, India",
    type: "Full-time",
    desc: "Drive acquisition and retention through data-driven campaigns at global scale.",
  },
  {
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    desc: "Build recommendation systems and fraud detection models that power our marketplace.",
  },
  {
    title: "Senior Product Manager",
    department: "Product",
    location: "Hyderabad, India",
    type: "Full-time",
    desc: "Own product areas end-to-end, from discovery through launch and iteration.",
  },
  {
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "Delhi, India",
    type: "Full-time",
    desc: "Build relationships with Fortune 500 companies and help them get work done faster.",
  },
  {
    title: "Community & Trust Specialist",
    department: "Operations",
    location: "Remote (India)",
    type: "Full-time",
    desc: "Protect our community by reviewing content and resolving disputes fairly and fast.",
  },
];

const perks = [
  { emoji: "🏠", title: "Remote-first", desc: "Work from wherever you do your best thinking." },
  { emoji: "🏥", title: "Health coverage", desc: "Comprehensive medical, dental, and vision for you and family." },
  { emoji: "📈", title: "Equity", desc: "Every employee is a stakeholder in what we're building together." },
  { emoji: "🧘", title: "Wellness budget", desc: "₹20,000/year for gym, therapy, or anything that keeps you healthy." },
  { emoji: "📚", title: "Learning budget", desc: "₹30,000/year for courses, books, conferences, and certifications." },
  { emoji: "✈️", title: "Team retreats", desc: "Twice-yearly gatherings to connect, celebrate, and plan together." },
];

const CareersPage = () => {
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
          <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">We're hiring</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Build the future of work
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join a team that's reshaping how talent and opportunity connect around the world.
          </p>
        </motion.div>
      </section>

      {/* Perks */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Why join us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="bg-card border border-border rounded-xl p-6">
                <span className="text-3xl block mb-3">{perk.emoji}</span>
                <h3 className="font-semibold text-foreground mb-1">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground">Open positions</h2>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={dept === "All" ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <Badge variant="outline" className="text-xs">{job.department}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{job.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />Remote-friendly</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  Apply <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Don't see your role?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            We're always looking for exceptional people. Send us your CV and we'll keep you in mind.
          </p>
          <Button size="lg">Send an open application</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
