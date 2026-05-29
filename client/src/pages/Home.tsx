/**
 * Slice Street — Home Page
 * Design: Fuoco Fresco (Warm Rustic Fire)
 * Warm terracotta palette, organic shapes, artisanal feel
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import StorySection from "@/components/StorySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <StorySection />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
