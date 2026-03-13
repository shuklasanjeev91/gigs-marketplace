import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Globe, TrendingUp, Award, Heart, Zap } from "lucide-react";

const stats = [
  { value: "4M+", label: "Businesses served" },
  { value: "830K+", label: "Freelancers worldwide" },
  { value: "700+", label: "Service categories" },
  { value: "160+", label: "Countries represented" },
];

const values = [
  { icon: Heart, title: "People first", desc: "We put our community at the center of everything we do — buyers and sellers alike." },
  { icon: Globe, title: "Global community", desc: "Connecting talent with opportunity across 160+ countries and every time zone." },
  { icon: TrendingUp, title: "Growth mindset", desc: "We constantly innovate to help freelancers thrive and businesses scale faster." },
  { icon: Award, title: "Quality & trust", desc: "Every service is backed by reviews, transparent pricing, and buyer protection." },
  { icon: Users, title: "Inclusive platform", desc: "Opportunity shouldn't depend on geography. We level the playing field." },
  { icon: Zap, title: "Speed & simplicity", desc: "Get expert help fast, without the complexity of traditional hiring." },
];

const leadership = [
  { name: "Arjun Mehta", role: "Co-Founder & CEO", initials: "AM" },
  { name: "Priya Sharma", role: "Co-Founder & CTO", initials: "PS" },
  { name: "Rahul Verma", role: "Chief Revenue Officer", initials: "RV" },
  { name: "Divya Kapoor", role: "VP of Product", initials: "DK" },
];

const AboutPage = () => {
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
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            The world's work marketplace
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            We exist to democratize access to talent and opportunity. By connecting skilled
            freelancers with ambitious businesses, we're reshaping how the world works.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-4xl font-display font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                We started with a simple idea: what if getting professional help was as easy as ordering takeout?
                No negotiations, no long hiring cycles — just clear services, fair prices, and great outcomes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, millions of businesses use our platform to get the work they need done, while hundreds
                of thousands of freelancers build thriving careers on their own terms.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-2xl font-display font-semibold text-foreground italic leading-relaxed">
                "Opportunity should be accessible to everyone, everywhere — regardless of who you know or where you live."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <val.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Leadership team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary font-bold text-xl">
                  {person.initials}
                </div>
                <p className="font-semibold text-foreground">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Join our community
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Whether you're looking to hire or looking for work, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold">
                Explore Services
              </Button>
            </Link>
            <Link to="/become-seller">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
