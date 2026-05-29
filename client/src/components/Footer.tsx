import { Flame, MessageCircle, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-xl font-bold">
                Slice<span className="text-primary">Street</span>
              </span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Premium fire-baked vegetarian pizzas crafted with love and the finest ingredients.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+919092489091" className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                +91 90924 89091
              </a>
              <a href="https://wa.me/919092489091" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </a>
              <div className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Fire-baked fresh, ready for pickup</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Hours</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>Monday – Sunday</p>
              <p className="text-background font-medium">11:00 AM – 11:00 PM</p>
              <p className="text-xs text-background/50 mt-3">Order via WhatsApp anytime!</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Slice Street. All rights reserved. Made with fire and passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
