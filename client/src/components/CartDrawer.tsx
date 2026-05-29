import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { calculateItemTotal, calculateCartTotal, formatPrice, getWhatsAppURL } from "@/lib/pizzaData";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const total = calculateCartTotal(items);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setStep("checkout");
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error("Please fill in your name and phone number");
      return;
    }
    const url = getWhatsAppURL(items, customerName, customerPhone);
    window.open(url, "_blank");
    clearCart();
    setStep("cart");
    setIsCartOpen(false);
    setCustomerName("");
    setCustomerPhone("");
    toast.success("Order sent to WhatsApp! We'll confirm your pickup time shortly.");
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setStep("cart");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {step === "cart" ? "Your Cart" : "Pickup Details"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {step === "cart" ? (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Add some delicious pizzas!</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="flex gap-3 py-4 border-b border-border/50 last:border-0"
                    >
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.pizza.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.size === "small" ? "Small (7\")" : "Medium (10\")"} • Fire Base
                        </p>
                        {item.addOns.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            + {item.addOns.map(a => a.name).join(", ")}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-primary">{formatPrice(calculateItemTotal(item))}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </>
          ) : (
            <div className="space-y-5">
              <div className="p-3 rounded-lg bg-accent/50 border border-accent">
                <p className="text-sm text-accent-foreground font-medium">
                  🏪 This is a pickup order. Your pizza will be ready for collection!
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="h-11"
                />
              </div>

              <Separator />

              {/* Order summary */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Order Summary</h4>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.pizza.name} ({item.size === "small" ? "S" : "M"}) × {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(calculateItemTotal(item))}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-3 bg-card">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
            </div>

            {step === "cart" ? (
              <Button
                onClick={handleCheckout}
                className="w-full h-12 rounded-full text-base font-semibold gap-2"
              >
                Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full h-12 rounded-full text-base font-semibold gap-2 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep("cart")}
                  className="w-full h-10 rounded-full text-sm"
                >
                  Back to Cart
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
