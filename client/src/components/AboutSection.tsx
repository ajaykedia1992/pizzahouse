import { motion } from "framer-motion";
import { Flame, Leaf, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Fire-Baked",
    description: "Every pizza is baked in our signature wood-fired oven at 450°C for the perfect char.",
  },
  {
    icon: Leaf,
    title: "100% Vegetarian",
    description: "Pure veg ingredients sourced fresh daily. No compromises on quality or taste.",
  },
  {
    icon: Clock,
    title: "Fresh & Fast",
    description: "Made to order with fresh dough, hand-tossed and ready for pickup — piping hot!",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each pizza is crafted by our passionate chefs who treat every order as a masterpiece.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Slice Street?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We believe great pizza starts with great ingredients and ends with the perfect fire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
