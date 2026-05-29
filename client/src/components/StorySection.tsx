import { motion } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "The Dough",
    description: "We start with a 48-hour slow-fermented dough, hand-kneaded with love. The long fermentation gives our crust that perfect airy texture and subtle tang.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/story-dough-RRosNjshWNAqUdCpJt2Cim.webp",
  },
  {
    number: "02",
    title: "Fresh Toppings",
    description: "Only the freshest vegetables, hand-picked daily from local markets. Every topping is sliced, diced, and prepped fresh — never frozen, never canned.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/story-toppings-oJufJuEsEpH8x6ELaGzZjW.webp",
  },
  {
    number: "03",
    title: "The Fire Oven",
    description: "Our wood-fired oven roars at 450°C. In just 90 seconds, the pizza gets that signature char, smoky aroma, and perfectly blistered crust.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/story-oven-Dj7MTnpiTD53maVMw7oFr3.webp",
  },
  {
    number: "04",
    title: "Ready for You",
    description: "Straight from oven to box. We add the final fresh garnishes, slice it to perfection, and it's ready for you to pick up — piping hot!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/story-serve-2jeYq5u6HieW5yY3dxjGRb.webp",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">From Dough to Done</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            How We Craft Your Pizza
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-lg">
            Every Slice Street pizza goes through a meticulous 4-step process. No shortcuts, no compromises.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <span className="text-6xl md:text-8xl font-display font-bold text-primary/10">{step.number}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground -mt-6 md:-mt-8 relative">
                  {step.title}
                </h3>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
