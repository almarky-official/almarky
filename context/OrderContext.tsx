
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '../types';

interface OrderContextType {
  orders: Order[];
  saveOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('almarky_user_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('almarky_user_orders', JSON.stringify(orders));
  }, [orders]);

  const saveOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find(o => o.orderId === id);
  };

  return (
    <OrderContext.Provider value={{ orders, saveOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
