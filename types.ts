
export interface Product {
  id: string;
  name: string;
  price: number; // Final price to be paid
  originalPrice: number; // Strikethrough price
  discountPercentage: number; // 0 if no discount
  currency: string;
  category: string;
  description: string;
  images: string[];
  stock: boolean;
  features: string[];
  colors?: string[]; // List of available colors (hex codes or names)
  deliveryCharges: number; // Shipping fee for this specific product
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  orderId: string;
  timestamp: number;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
  customerDetails: OrderDetails;
}
