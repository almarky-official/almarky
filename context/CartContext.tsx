
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalProductPrice: number;
  totalDeliveryPrice: number;
  totalPayable: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('almarky_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('almarky_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === selectedColor) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor }];
    });
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedColor === selectedColor)));
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedColor === selectedColor) ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalProductPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDeliveryPrice = cart.reduce((acc, item) => acc + (item.deliveryCharges * item.quantity), 0);
  const totalPayable = totalProductPrice + totalDeliveryPrice;

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      totalItems, totalProductPrice, totalDeliveryPrice, totalPayable 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
