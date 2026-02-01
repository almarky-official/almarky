
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickSelectProps {
  product: Product;
  onClose: () => void;
}

const QuickSelect: React.FC<QuickSelectProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAction = (type: 'cart' | 'buy') => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color first!");
      return;
    }
    
    // Always add to cart first
    addToCart(product, quantity, selectedColor);
    
    if (type === 'buy') {
      // Immediately close modal and move to checkout step
      onClose();
      // Use small delay to ensure React state batches properly before navigation
      setTimeout(() => navigate('/checkout'), 10);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500 sm:zoom-in">
        <div className="absolute top-6 right-6 z-10">
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full text-slate-400 hover:text-rose-500 transition-all border border-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-10">
          <div className="flex items-center space-x-6 mb-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl shrink-0">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">{product.name}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-300 line-through font-bold">Rs. {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-10">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Choose Your Variation</label>
              <div className="flex flex-wrap gap-5">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-300 ${
                      selectedColor === color 
                      ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-50 scale-110' 
                      : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full border border-slate-200 shadow-inner" style={{ backgroundColor: color }}></div>
                    {selectedColor === color && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 border-2 border-white shadow-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Section */}
          <div className="flex items-center justify-between mb-10 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Order Quantity</span>
            <div className="flex items-center space-x-6">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xl font-black text-slate-400 hover:bg-slate-900 hover:text-white transition-all active:scale-90">-</button>
              <span className="text-xl font-black text-slate-900 w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xl font-black text-slate-400 hover:bg-slate-900 hover:text-white transition-all active:scale-90">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => handleAction('buy')}
              className="w-full bg-orange-500 text-white font-black py-6 rounded-3xl hover:bg-orange-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Order Now (COD)</span>
            </button>
            
            <button 
              onClick={() => handleAction('cart')}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest text-[11px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Add to Shopping Bag</span>
            </button>
            
            <div className="pt-4 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                + PKR {(product.deliveryCharges * quantity).toLocaleString()} Nationwide Shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSelect;
