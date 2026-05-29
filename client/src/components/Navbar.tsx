import { ShoppingCart, Flame } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_NAME } from "@/lib/pizzaData";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Slice<span className="text-primary">Street</span>
          </span>
        </a>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Menu
          </a>
          <a href="#story" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Our Story
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </div>

        {/* Cart button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all duration-160"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent-foreground text-background text-xs flex items-center justify-center font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
}
