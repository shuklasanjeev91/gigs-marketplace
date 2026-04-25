import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { useCategoryCounts } from "@/hooks/useCategoryCounts";

/* Per-category color pairs: [icon bg, icon text, card hover border] */
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "graphics-design":    { bg: "bg-purple-100",  text: "text-purple-600",  border: "hover:border-purple-300" },
  "digital-marketing":  { bg: "bg-blue-100",    text: "text-blue-600",    border: "hover:border-blue-300"   },
  "writing-translation":{ bg: "bg-amber-100",   text: "text-amber-600",   border: "hover:border-amber-300"  },
  "video-animation":    { bg: "bg-red-100",      text: "text-red-500",     border: "hover:border-red-300"    },
  "music-audio":        { bg: "bg-violet-100",   text: "text-violet-600",  border: "hover:border-violet-300" },
  "programming-tech":   { bg: "bg-teal-100",     text: "text-teal-600",    border: "hover:border-teal-300"   },
  "business":           { bg: "bg-indigo-100",   text: "text-indigo-600",  border: "hover:border-indigo-300" },
  "lifestyle":          { bg: "bg-pink-100",     text: "text-pink-600",    border: "hover:border-pink-300"   },
  "ai-services":        { bg: "bg-cyan-100",     text: "text-cyan-600",    border: "hover:border-cyan-300"   },
  "consulting":         { bg: "bg-slate-100",    text: "text-slate-600",   border: "hover:border-slate-300"  },
};

const CategoryGrid = () => {
  const { data: counts = {} } = useCategoryCounts();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Explore by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Browse hundreds of services across every field
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const liveCount = counts[cat.id] ?? 0;
            const colors = categoryColors[cat.id] ?? {
              bg: "bg-primary/10",
              text: "text-primary",
              border: "hover:border-primary/30",
            };
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/categories/${cat.id}`}
                  className={`group block p-5 rounded-xl border border-border bg-card hover:bg-secondary/40 ${colors.border} hover:shadow-card transition-all duration-200 text-center`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text} mb-3 text-2xl`}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {liveCount > 0
                      ? `${liveCount.toLocaleString()} services`
                      : "Browse services"}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
