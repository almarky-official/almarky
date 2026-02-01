
import { Product } from '../types';

export const products: Product[] = [
  {
    id: "p001",
    name: "Premium Wireless Earbuds Pro",
    price: 3600,
    originalPrice: 4500,
    discountPercentage: 20,
    currency: "PKR",
    category: "Electronics",
    description: "Experience crystal clear sound with noise cancellation and 24-hour battery life. Optimized for mobile gaming and music.",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800"],
    stock: true,
    features: ["Noise Cancellation", "IPX5 Water Resistant", "12-Month Replacement Warranty"],
    deliveryCharges: 150,
    colors: ["#000000", "#FFFFFF", "#3b82f6"] // Black, White, Blue
  },
  {
    id: "p002",
    name: "Pure Leather Bifold Wallet",
    price: 1980,
    originalPrice: 2200,
    discountPercentage: 10,
    currency: "PKR",
    category: "Fashion",
    description: "Hand-stitched genuine cow leather wallet. Features 8 card slots and a dedicated coin compartment.",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800"],
    stock: true,
    features: ["100% Genuine Leather", "RFID Protection", "Lifetime Stitching Warranty"],
    deliveryCharges: 120,
    colors: ["#5d4037", "#212121", "#d32f2f"] // Brown, Black, Dark Red
  },
  {
    id: "p003",
    name: "Smart Watch Ultra 49mm",
    price: 3800,
    originalPrice: 3800,
    discountPercentage: 0,
    currency: "PKR",
    category: "Electronics",
    description: "Large 2.0-inch retina display with heart rate monitoring, SPO2, and Bluetooth calling capabilities.",
    images: ["https://images.unsplash.com/photo-1544117518-30dd5f299c58?auto=format&fit=crop&q=80&w=800"],
    stock: true,
    features: ["Bluetooth Calling", "SPO2 Tracker", "NFC Enabled"],
    deliveryCharges: 200,
    colors: ["#f97316", "#0f172a", "#94a3b8"] // Orange, Slate, Grey
  }
];
