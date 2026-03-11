import { Shield, Clock, Award, Headphones } from "lucide-react";

const features = [
  { icon: Shield, title: "Secure Payments", desc: "SSL encryption & escrow protection" },
  { icon: Clock, title: "Fast Delivery", desc: "Get results in as little as 24hrs" },
  { icon: Award, title: "Quality Guarantee", desc: "Money back if not satisfied" },
  { icon: Headphones, title: "24/7 Support", desc: "Our team is always here to help" },
];

const TrustBanner = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
