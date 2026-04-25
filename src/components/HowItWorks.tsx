import { FileSearch, Users, Lock, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileSearch,
    title: "Describe Your Project",
    description:
      "Tell us what you need — the scope, budget, and timeline. The more detail you share, the better matches you'll get.",
    color: "bg-teal-100 text-teal-600",
    num: "01",
  },
  {
    icon: Users,
    title: "Browse Verified Talent",
    description:
      "Explore freelancer profiles, portfolios, and reviews. Shortlist the ones who fit your vision.",
    color: "bg-blue-100 text-blue-600",
    num: "02",
  },
  {
    icon: Lock,
    title: "Collaborate with Confidence",
    description:
      "Your payment is held in secure escrow and only released when you approve the delivered work.",
    color: "bg-violet-100 text-violet-600",
    num: "03",
  },
  {
    icon: BadgeCheck,
    title: "Approve & Leave a Review",
    description:
      "Accept the final delivery, leave honest feedback, and build a lasting professional relationship.",
    color: "bg-amber-100 text-amber-600",
    num: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            Simple process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            How neoelectron works
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            From idea to finished project — four straightforward steps
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-border z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Step number badge */}
              <div className="relative mb-5">
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm ${step.color}`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center shadow">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
