import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, AlertCircle, CheckCircle2, Users } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Buyer protection",
    desc: "Your money is held in escrow until you confirm delivery meets your requirements. If it doesn't, we'll help you get a refund.",
  },
  {
    icon: Eye,
    title: "Transparent reviews",
    desc: "All reviews on our platform are from verified buyers who have completed an order. We never allow or remove reviews based on seller request.",
  },
  {
    icon: Lock,
    title: "Secure payments",
    desc: "All transactions are PCI-DSS compliant. We use bank-level encryption to protect your financial data at every step.",
  },
  {
    icon: AlertCircle,
    title: "Dispute resolution",
    desc: "Our trained Resolution team mediates disputes fairly and without bias, guided by clear community standards.",
  },
  {
    icon: CheckCircle2,
    title: "Identity verification",
    desc: "Pro sellers undergo identity and document verification. All sellers agree to our community standards before publishing.",
  },
  {
    icon: Users,
    title: "Community standards",
    desc: "We maintain strict standards for acceptable content, behavior, and delivery quality to protect everyone on the platform.",
  },
];

const standards = [
  { title: "Authentic representation", desc: "Sellers must accurately represent their skills, experience, and portfolio. Misleading claims lead to immediate removal." },
  { title: "Intellectual property", desc: "All delivered work must be original or properly licensed. We take IP violations seriously and respond to DMCA requests." },
  { title: "Prohibited content", desc: "We prohibit anything illegal, harmful, deceptive, or that violates a third party's rights. See our full prohibited content list." },
  { title: "Communication standards", desc: "Professional, respectful communication is required at all times. Harassment, spam, and off-platform payment requests are banned." },
  { title: "Fake reviews & manipulation", desc: "Purchasing, trading, or soliciting fake reviews is strictly prohibited and results in permanent account removal." },
];

const TrustSafetyPage = () => {
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
          <Shield className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Trust & Safety
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We're committed to making Neoelectron the world's most trusted marketplace.
            Here's how we protect our community.
          </p>
        </motion.div>
      </section>

      {/* Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Our commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community standards */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">Community standards</h2>
          <p className="text-muted-foreground text-center mb-10">
            Every member of our community agrees to these standards. Violations are taken seriously.
          </p>
          <div className="space-y-4">
            {standards.map((s, i) => (
              <motion.div
                key={s.title}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            See something that doesn't belong?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Report any gig, message, review, or user that violates our community standards. All reports are reviewed by our Trust & Safety team within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              Report a violation
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-border rounded-lg font-medium text-sm text-foreground hover:bg-secondary transition-colors">
              Learn more in Help Center
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrustSafetyPage;
