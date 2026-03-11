import { Search, MousePointer, CreditCard, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Search, title: "Search", description: "Browse thousands of services or search for exactly what you need." },
  { icon: MousePointer, title: "Choose", description: "Compare sellers, read reviews, and pick the perfect match." },
  { icon: CreditCard, title: "Pay Safely", description: "Pay through our secure platform. Only release when satisfied." },
  { icon: ThumbsUp, title: "Get Results", description: "Receive quality work delivered on time. Leave a review." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">How it works</h2>
          <p className="text-muted-foreground mt-2">Get your project done in four simple steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-primary mb-1">Step {i + 1}</div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
