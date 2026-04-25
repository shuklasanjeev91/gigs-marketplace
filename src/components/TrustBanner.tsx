import { Shield, Zap, BadgeCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    desc: "Funds held safely until you approve the work",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Many services delivered in as little as 24 hours",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: BadgeCheck,
    title: "Verified Talent",
    desc: "Every seller is reviewed for quality and skill",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Headphones,
    title: "Always-On Support",
    desc: "Our team is available around the clock to help",
    color: "text-violet-600 bg-violet-50",
  },
];

const TrustBanner = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
