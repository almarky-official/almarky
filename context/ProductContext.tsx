
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { products as staticProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // 1. Try to fetch the latest live data from GitHub CDN/Pages
      const response = await fetch(`./data/products.json?v=${Date.now()}`, {
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        localStorage.setItem('almarky_inventory', JSON.stringify(data));
      } else {
        throw new Error("Network fetch failed");
      }
    } catch (error) {
      console.warn("Falling back to local cache or static data:", error);
      
      // 2. Try LocalStorage
      const savedProducts = localStorage.getItem('almarky_inventory');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // 3. Ultimate Fallback: Static products defined in code
        setProducts(staticProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const saveToStateAndStorage = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('almarky_inventory', JSON.stringify(newProducts));
  };

  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    saveToStateAndStorage(updated);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveToStateAndStorage(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveToStateAndStorage(updated);
  };

  const toggleStock = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, stock: !p.stock } : p);
    saveToStateAndStorage(updated);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      toggleStock,
      refreshProducts: loadProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
