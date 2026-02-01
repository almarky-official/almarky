
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-[100] flex justify-around items-center h-14 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <Link to="/" className={`flex flex-col items-center justify-center w-full h-full transition-all ${isActive('/') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isActive('/') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[7px] font-black uppercase mt-1 tracking-widest">Home</span>
      </Link>

      <Link to="/shop" className={`flex flex-col items-center justify-center w-full h-full transition-all ${isActive('/shop') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isActive('/shop') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="text-[7px] font-black uppercase mt-1 tracking-widest">Shop</span>
      </Link>

      <Link to="/cart" className={`relative flex flex-col items-center justify-center w-full h-full transition-all ${isActive('/cart') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isActive('/cart') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[6px] font-black h-3 w-3 flex items-center justify-center rounded-full border border-white shadow-sm">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-[7px] font-black uppercase mt-1 tracking-widest">Cart</span>
      </Link>

      <Link to="/account" className={`flex flex-col items-center justify-center w-full h-full transition-all ${isActive('/account') ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
        <div className={`w-4 h-4 rounded-full overflow-hidden border ${isActive('/account') ? 'border-blue-600' : 'border-slate-200'}`}>
           <img src={user?.photo || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} className="w-full h-full object-cover" alt="" />
        </div>
        <span className="text-[7px] font-black uppercase mt-1 tracking-widest">Me</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;