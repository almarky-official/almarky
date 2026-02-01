
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalProductPrice, totalDeliveryPrice, totalPayable } = useCart();

  const totalSavings = cart.reduce((acc, item) => {
    const savings = (item.originalPrice || item.price) - item.price;
    return acc + (savings * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="mb-8 text-slate-100">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Your Shopping Bag is Empty</h2>
        <p className="text-slate-400 mb-10 font-medium max-w-sm mx-auto">Discover premium products and curated collections in our store.</p>
        <Link to="/shop" className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition shadow-xl shadow-slate-900/10">Explore Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-24">
      <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter uppercase">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => {
            const hasDiscount = item.originalPrice > item.price;
            return (
              <div key={`${item.id}-${item.selectedColor || idx}`} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white p-6 rounded-3xl border border-slate-50 shadow-sm relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item.id}`} className="font-black text-slate-900 hover:text-blue-600 transition uppercase tracking-tight block mb-1">{item.name}</Link>
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-x-0 sm:space-x-4 mb-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</p>
                    {item.selectedColor && (
                      <div className="flex items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Color:</span>
                        <div className="flex items-center bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                          <div className="w-2.5 h-2.5 rounded-full mr-1.5 shadow-sm" style={{ backgroundColor: item.selectedColor }}></div>
                          <span className="text-[8px] font-black uppercase tracking-tighter text-slate-900">{item.selectedColor}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="w-10 h-10 flex items-center justify-center font-black hover:bg-slate-200 transition rounded-l-xl text-slate-400">-</button>
                      <span className="w-10 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="w-10 h-10 flex items-center justify-center font-black hover:bg-slate-200 transition rounded-r-xl text-slate-400">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.selectedColor)} className="text-rose-500 hover:text-rose-700 text-[10px] font-black uppercase tracking-widest border-b border-rose-100 hover:border-rose-500 transition-all">Remove Item</button>
                  </div>
                </div>
                <div className="text-right flex flex-col items-center sm:items-end min-w-[120px]">
                  {hasDiscount && (<span className="text-xs font-bold text-slate-300 line-through mb-1">Rs. {(item.originalPrice * item.quantity).toLocaleString()}</span>)}
                  <div className="font-black text-slate-900 text-lg tracking-tighter">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">+ Rs. {(item.deliveryCharges * item.quantity).toLocaleString()} Delivery</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY SECTION - REDESIGNED FOR MAX VISIBILITY */}
        <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl h-fit sticky top-24 border border-white/5">
          <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter flex items-center">
            <span className="mr-3">📋</span> Order Summary
          </h3>
          
          <div className="space-y-6 text-xs font-black uppercase tracking-[0.15em] mb-10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Items Total</span>
              <span className="text-white text-sm">Rs. {(totalProductPrice + totalSavings).toLocaleString()}</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-emerald-500">Instant Discount</span>
                <span className="text-emerald-500 text-sm">- Rs. {totalSavings.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Delivery Fee</span>
              <span className="text-blue-400 font-black">Rs. {totalDeliveryPrice.toLocaleString()}</span>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 mb-1">Total Payable (COD)</span>
                <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">Rs. {totalPayable.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Link 
            to="/checkout" 
            className="group relative flex flex-col items-center justify-center w-full bg-blue-600 text-white font-black py-6 md:py-8 rounded-3xl hover:bg-blue-500 transition-all shadow-2xl active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="flex items-center space-x-3 mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span className="text-lg md:text-xl uppercase tracking-[0.2em]">SECURE CHECKOUT</span>
            </div>
            <span className="text-[9px] opacity-60 font-bold uppercase tracking-[0.3em]">CASH ON DELIVERY (NATIONWIDE)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
