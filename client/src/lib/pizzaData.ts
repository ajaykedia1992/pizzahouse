/**
 * Ultra Pizza — Menu Data
 * Design: Fuoco Fresco (Warm Rustic Fire)
 * All pizzas are vegetarian with fire pizza base only
 * Sizes: Small & Medium
 */

export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    small: number;
    medium: number;
  };
  tag?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  pizza: Pizza;
  size: "small" | "medium";
  addOns: AddOn[];
  quantity: number;
}

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    name: "Classic Margherita",
    description: "San Marzano tomato sauce, fresh mozzarella, basil leaves, extra virgin olive oil on our signature fire-baked base.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-margherita-QspKBaJkKgE6K76Z2BnNZG.webp",
    prices: { small: 199, medium: 349 },
    tag: "Bestseller",
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    description: "Loaded with bell peppers, mushrooms, black olives, onion rings, sweet corn, and mozzarella on tangy tomato base.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-veggie-supreme-CfTmJRL8oEjs4cWjH6BZFH.webp",
    prices: { small: 249, medium: 399 },
    tag: "Popular",
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    description: "Tandoori-spiced paneer cubes, sliced onions, green peppers, drizzled with mint chutney on our fire-baked crust.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-paneer-GxHxhjrKnAbuKRSzKeBMVB.webp",
    prices: { small: 279, medium: 449 },
    tag: "Chef's Special",
  },
  {
    id: "mushroom-truffle",
    name: "Mushroom Truffle",
    description: "Assorted mushrooms, caramelized onions, mozzarella, fresh thyme, finished with truffle oil on white sauce base.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-mushroom-625SRSovv2kdgFemr2Pnco.webp",
    prices: { small: 299, medium: 479 },
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    description: "Fresh tomatoes, capsicum, onions, mushrooms, and golden corn with a generous layer of mozzarella cheese.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-veggie-supreme-CfTmJRL8oEjs4cWjH6BZFH.webp",
    prices: { small: 229, medium: 379 },
  },
  {
    id: "corn-delight",
    name: "Corn & Cheese Delight",
    description: "Sweet golden corn, jalapeños, onions, topped with double mozzarella and cheddar cheese blend.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345648637/gWBZrVqsQwpbafj7GffPqW/pizza-margherita-QspKBaJkKgE6K76Z2BnNZG.webp",
    prices: { small: 219, medium: 369 },
  },
];

export const addOns: AddOn[] = [
  { id: "extra-cheese", name: "Extra Cheese", price: 49 },
  { id: "paneer", name: "Paneer Cubes", price: 59 },
  { id: "mushrooms", name: "Mushrooms", price: 39 },
  { id: "olives", name: "Black Olives", price: 39 },
  { id: "jalapenos", name: "Jalapeños", price: 29 },
  { id: "onions", name: "Onion Rings", price: 29 },
  { id: "capsicum", name: "Capsicum", price: 29 },
  { id: "corn", name: "Sweet Corn", price: 29 },
  { id: "tomatoes", name: "Fresh Tomatoes", price: 29 },
];

export function calculateItemTotal(item: CartItem): number {
  const basePrice = item.pizza.prices[item.size];
  const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addOnsTotal) * item.quantity;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

export function formatPrice(price: number): string {
  return `₹${price}`;
}

export function generateWhatsAppMessage(items: CartItem[], customerName: string, customerPhone: string, customerAddress: string): string {
  let message = `🍕 *NEW ORDER — Ultra Pizza*\n\n`;
  message += `👤 *Customer:* ${customerName}\n`;
  message += `📞 *Phone:* ${customerPhone}\n`;
  message += `📍 *Address:* ${customerAddress}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *Order Details:*\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.pizza.name}*\n`;
    message += `   Size: ${item.size === "small" ? "Small (7\")" : "Medium (10\")"} — Fire Pizza Base\n`;
    message += `   Qty: ${item.quantity}\n`;
    if (item.addOns.length > 0) {
      message += `   Add-ons: ${item.addOns.map(a => a.name).join(", ")}\n`;
    }
    message += `   Subtotal: ${formatPrice(calculateItemTotal(item))}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL: ${formatPrice(calculateCartTotal(items))}*\n\n`;
  message += `Thank you for ordering! 🙏`;

  return message;
}

export function getWhatsAppURL(items: CartItem[], customerName: string, customerPhone: string, customerAddress: string): string {
  const message = generateWhatsAppMessage(items, customerName, customerPhone, customerAddress);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/919092489091?text=${encoded}`;
}
