import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Briefcase, DollarSign, Globe, TrendingUp, Users,
  Shield, Clock, Star, ChevronRight, Zap, BarChart3, Award, CheckCircle
} from "lucide-react";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { usePlatformStats } from "@/hooks/usePlatformStats";

const stats = [
  { value: "890K+", label: "Active Freelancers" },
  { value: "₹2.4B+", label: "Earned by Freelancers" },
  { value: "12M+", label: "Projects Completed" },
  { value: "195", label: "Countries Represented" },
];


const howItWorks = [
  {
    step: "1",
    icon: Users,
    title: "Create your profile",
    desc: "Showcase your skills, experience, and portfolio. Let clients know what makes you unique.",
  },
  {
    step: "2",
    icon: Briefcase,
    title: "Publish your gig",
    desc: "Define your services, set your prices, and describe exactly what you'll deliver.",
  },
  {
    step: "3",
    icon: DollarSign,
    title: "Start earning",
    desc: "Get orders from clients worldwide and grow your freelance business on your terms.",
  },
];

const benefits = [
  { icon: Globe, title: "Global Reach", desc: "Access millions of buyers from 195+ countries actively looking for your skills." },
  { icon: DollarSign, title: "Set Your Rates", desc: "You control your pricing. Offer packages that reflect the true value of your work." },
  { icon: Shield, title: "Secure Payments", desc: "Get paid on time, every time. Funds are secured before you start working." },
  { icon: TrendingUp, title: "Grow Your Brand", desc: "Build a reputation with reviews, levels, and repeat clients. Your success compounds." },
  { icon: Clock, title: "Work Flexibly", desc: "Choose your hours, your clients, and your projects. Work from anywhere in the world." },
  { icon: Zap, title: "Smart Tools", desc: "Analytics, quick responses, and seller features designed to help you succeed faster." },
];

const opportunities = [
  { category: "Programming & Tech", title: "Build a mobile app", rate: "₹12,000–₹20,000/hour", type: "Project based", hours: "15–25 hours/week", desc: "Build a mobile application from planning and development through testing and launch." },
  { category: "AI Services", title: "Develop AI applications", rate: "₹13,000–₹22,000/hour", type: "Project based", hours: "15–25 hours/week", desc: "Turn AI use cases into production-ready applications for enterprise clients." },
  { category: "Graphics & Design", title: "Design brand identity", rate: "₹8,000–₹15,000/hour", type: "Project based", hours: "10–20 hours/week", desc: "Create complete visual identities including logos, guidelines, and brand collateral." },
  { category: "Digital Marketing", title: "Run ad campaigns", rate: "₹6,500–₹12,500/hour", type: "Retainer", hours: "10–15 hours/week", desc: "Manage and optimize paid advertising campaigns across platforms." },
  { category: "Writing & Translation", title: "Write technical docs", rate: "₹5,000–₹10,000/hour", type: "Project based", hours: "10–20 hours/week", desc: "Create clear documentation, API guides, and knowledge bases for tech products." },
  { category: "Video & Animation", title: "Produce brand videos", rate: "₹10,000–₹17,000/hour", type: "Project based", hours: "15–25 hours/week", desc: "Produce high-quality promotional and explainer videos for businesses." },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "UX Designer",
    quote: "I went from a side hustle to a full-time freelance career in 8 months. The platform made it easy to find clients who value quality work.",
    stats: ["Vetted Pro", "500+ orders", "Rated 4.9★"],
    initials: "SK",
  },
  {
    name: "Marcus T.",
    role: "Full-Stack Developer",
    quote: "What started as extra income became my primary business. I now lead a team of 3 and serve clients across 20 countries.",
    stats: ["Top Rated", "1.2k orders", "Rated 5★"],
    initials: "MT",
  },
  {
    name: "Priya M.",
    role: "Content Strategist",
    quote: "Neoelectron gave me the freedom to work with global brands while living on my own terms. The community support is incredible.",
    stats: ["Vetted Pro", "800+ orders", "Rated 4.8★"],
    initials: "PM",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const BecomeASeller = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const { data: platformStats } = usePlatformStats();

  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
    return n > 0 ? `${n}+` : "—";
  };

  const dynamicStats = [
    {
      value: platformStats ? formatCount(platformStats.sellerCount) : "—",
      label: "Active Freelancers",
    },
    {
      value: platformStats ? formatCount(platformStats.completedOrders) : "—",
      label: "Projects Completed",
    },
    {
      value: platformStats?.avgRating != null ? `${platformStats.avgRating}/5` : "—",
      label: "Average Rating",
    },
    {
      value: platformStats ? (platformStats.countryCount > 0 ? `${platformStats.countryCount}` : "—") : "—",
      label: "Countries Represented",
    },
  ];

  const handleGetStarted = () => {
    if (!user) {
      navigate("/signup?next=/seller/setup");
    } else if (profile?.is_seller) {
      navigate("/seller/dashboard");
    } else {
      navigate("/seller/setup");
    }
  };

  const ctaLabel = profile?.is_seller ? "Go to Dashboard" : "Get Started";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section — full width dark gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85 py-24 md:py-32">
        {/* Abstract decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">
              Become a Neoelectron freelancer
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Grow a global business from{" "}
              <span className="text-gradient">your talent</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Join thousands of freelancers who've turned their skills into thriving businesses.
              Set your own rates, choose your clients, and work on your terms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-14 text-base rounded-xl"
              >
                {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base rounded-xl"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Trust logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-16 text-center"
          >
            <p className="text-white/30 text-xs uppercase tracking-widest mb-6">
              Trusted by leading companies
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap opacity-40">
              {["NETFLIX", "PayPal", "Google", "Meta", "Spotify"].map(name => (
                <span key={name} className="text-white font-display font-bold text-lg md:text-xl tracking-wider">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {dynamicStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="py-8 text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              A smarter way to work,<br />grow, and earn
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Getting started takes just a few minutes. Here's how it works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <Card className="p-8 h-full shadow-card border-border hover:shadow-card-hover transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-8xl font-display font-bold text-muted/30 -mr-2 -mt-4 select-none">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-12 rounded-xl"
            >
              {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Opportunities for every expert
            </h2>
            <p className="text-muted-foreground text-lg">Find the projects that match your expertise</p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.slice(0, 6).map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Opportunity cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {opportunities.map((opp, i) => (
              <motion.div key={opp.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Card className="p-6 h-full shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer group">
                  <Badge variant="secondary" className="text-xs mb-4">{opp.category}</Badge>
                  <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{opp.desc}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground">{opp.rate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5 text-primary" />
                      <span>{opp.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>{opp.hours}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide the tools, reach, and support to help you build a thriving freelance career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 text-lg">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              See how top freelancers grow
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.15 }}>
                <Card className="p-7 h-full shadow-card flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-display text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-display font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 italic">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex flex-wrap gap-2">
                    {t.stats.map(s => (
                      <Badge key={s} variant="secondary" className="text-xs font-normal">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              We grow better together
            </h2>
            <p className="text-muted-foreground text-lg">Join a supportive community of freelancers</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Local Clubs", desc: "Meet freelancers in your area", icon: Users },
              { title: "Seller Stories", desc: "Get inspired by success stories", icon: Award },
              { title: "Webinars", desc: "Learn from industry experts", icon: BarChart3 },
              { title: "Peer Support", desc: "Connect and collaborate", icon: Star },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer group h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Let's show the world what you've got to offer
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Your skills deserve a global audience. Start building your freelance business today.
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 h-14 text-base rounded-xl"
            >
              {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeASeller;
