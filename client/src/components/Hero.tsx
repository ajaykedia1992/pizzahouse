import { motion } from "framer-motion";
import { Flame, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/hero-pizza-nrhVy3BvRg7BDj8QgsxuX5.webp"
          alt="Fire-baked pizza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-100">100% Veg • Fire Pizza Base • Pickup Only</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-6"
          >
            Fire-Baked,
            <br />
            <span className="text-orange-400">Desi</span> Flavours.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed"
          >
            Handcrafted pizzas baked in our wood-fired oven. Order now and pick up fresh, hot, and loaded with love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 active:scale-[0.97] transition-all duration-160 shadow-lg shadow-primary/30"
            >
              Order for Pickup
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative blob */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}
