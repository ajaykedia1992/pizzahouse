import { motion } from "framer-motion";
import { pizzas } from "@/lib/pizzaData";
import PizzaCard from "./PizzaCard";
import { Leaf } from "lucide-react";

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 md:py-28">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/50 border border-accent mb-4">
            <Leaf className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">100% Vegetarian</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Our Fire-Baked Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Each pizza is hand-crafted with love and baked to perfection in our signature fire oven. Choose your size and customize with add-ons.
          </p>
        </motion.div>

        {/* Pizza grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
