import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { type Pizza, addOns, type AddOn, formatPrice } from "@/lib/pizzaData";
import { toast } from "sonner";

interface PizzaCardProps {
  pizza: Pizza;
  index: number;
}

export default function PizzaCard({ pizza, index }: PizzaCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"small" | "medium">("small");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleOpen = () => {
    setSelectedSize("small");
    setSelectedAddOns([]);
    setQuantity(1);
    setIsOpen(true);
  };

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const currentPrice = pizza.prices[selectedSize] + selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  const handleAddToCart = () => {
    addItem(pizza, selectedSize, selectedAddOns, quantity);
    setIsOpen(false);
    toast.success(`${pizza.name} added to cart!`, {
      description: `${selectedSize === "small" ? "Small" : "Medium"} × ${quantity}`,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {pizza.tag && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {pizza.tag}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl font-bold text-card-foreground mb-1.5">
            {pizza.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {pizza.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">{formatPrice(pizza.prices.small)}</span>
              <span className="text-xs text-muted-foreground">onwards</span>
            </div>
            <button
              onClick={handleOpen}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-160"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </motion.div>

      {/* Customization Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{pizza.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            {/* Pizza image */}
            <div className="rounded-xl overflow-hidden aspect-video">
              <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-sm text-muted-foreground">{pizza.description}</p>

            {/* Size selection */}
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-primary" />
                Choose Size — Fire Pizza Base
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedSize("small")}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    selectedSize === "small"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-sm">Small</div>
                  <div className="text-xs text-muted-foreground mt-0.5">7 inch</div>
                  <div className="font-bold text-primary mt-1">{formatPrice(pizza.prices.small)}</div>
                </button>
                <button
                  onClick={() => setSelectedSize("medium")}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    selectedSize === "medium"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-sm">Medium</div>
                  <div className="text-xs text-muted-foreground mt-0.5">10 inch</div>
                  <div className="font-bold text-primary mt-1">{formatPrice(pizza.prices.medium)}</div>
                </button>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Extra Add-ons</h4>
              <div className="space-y-2">
                {addOns.map(addon => (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedAddOns.find(a => a.id === addon.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={!!selectedAddOns.find(a => a.id === addon.id)}
                        onCheckedChange={() => toggleAddOn(addon)}
                      />
                      <span className="text-sm font-medium">{addon.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">+{formatPrice(addon.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Quantity</h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-12 rounded-full text-base font-semibold gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart — {formatPrice(currentPrice * quantity)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
