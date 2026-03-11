import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Explore Categories</h2>
            <p className="text-muted-foreground mt-2">Browse services by category</p>
          </div>
          <Link to="/categories" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/categories/${cat.id}`}
                className="group block p-5 rounded-lg border border-border bg-card hover:bg-category-hover hover:border-primary/30 transition-all duration-200 text-center"
              >
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count.toLocaleString()} services</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
