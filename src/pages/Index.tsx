import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedGigs from "@/components/FeaturedGigs";
import PopularServices from "@/components/PopularServices";
import TopSellers from "@/components/TopSellers";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    text: "Found an incredible designer within hours. The quality exceeded my expectations and the process was completely seamless.",
    rating: 5,
    initials: "PS",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Rahul Mehta",
    role: "E-Commerce Owner",
    text: "I've hired three developers through neoelectron. Every single one delivered on time and within budget. Highly recommended.",
    rating: 5,
    initials: "RM",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "Anita Desai",
    role: "Marketing Manager",
    text: "The content writers here are world-class. My blog traffic doubled in two months after working with a writer I found here.",
    rating: 5,
    initials: "AD",
    color: "bg-amber-100 text-amber-700",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <PopularServices />
      <CategoryGrid />
      <FeaturedGigs title="Trending Services" />
      <TopSellers />
      <HowItWorks />

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Trusted by thousands of businesses
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Real results from real clients who found exactly what they needed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Quote className="h-7 w-7 text-primary/30 mb-4" />
                <p className="text-sm text-foreground leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-star text-star" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Your next great project starts here
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Join a growing community of businesses and freelancers getting things done — on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/search">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                Find a Freelancer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/become-seller">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
              >
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
