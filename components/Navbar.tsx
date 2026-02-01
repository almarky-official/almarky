
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const AlmarkyLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative ${className} transition-transform duration-300`}>
    <svg viewBox="0 0 512 512" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#ff8c00" />
        </linearGradient>
        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#ff4b2b" />
        </linearGradient>
        <linearGradient id="cartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0047ab" />
        </linearGradient>
        <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a8e063" />
          <stop offset="100%" stopColor="#56ab2f" />
        </linearGradient>
      </defs>
      <ellipse cx="256" cy="450" rx="100" ry="10" fill="#f1f5f9" />
      <circle cx="256" cy="256" r="240" fill="none" stroke="url(#ringGrad)" strokeWidth="12" />
      <path d="M180 180 L332 180 Q345 180 348 195 L365 380 Q368 400 348 400 L164 400 Q144 400 147 380 L164 195 Q167 180 180 180 Z" fill="url(#bagGrad)" />
      <path d="M210 185 Q210 110 256 110 Q302 110 302 185" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
      <circle cx="210" cy="185" r="8" fill="#ffffff" />
      <circle cx="302" cy="185" r="8" fill="#ffffff" />
      <path d="M280 110 L310 110 L325 140 L295 160 Z" fill="url(#tagGrad)" transform="rotate(-15, 256, 256)" />
      <circle cx="308" cy="130" r="4" fill="white" transform="rotate(-15, 256, 256)" />
      <path d="M360 120 L368 100 L376 120 L396 128 L376 136 L368 156 L360 136 L340 128 Z" fill="#ffcc33" />
      <path d="M230 240 L450 240 L435 320 Q432 340 410 340 L245 340 Z" fill="url(#cartGrad)" />
      <rect x="260" y="260" width="8" height="35" rx="4" fill="white" opacity="0.8" />
      <rect x="300" y="260" width="8" height="35" rx="4" fill="white" opacity="0.8" />
      <rect x="340" y="260" width="8" height="35" rx="4" fill="white" opacity="0.8" />
      <line x1="150" y1="265" x2="220" y2="265" stroke="white" strokeWidth="10" strokeLinecap="round" />
      <circle cx="260" cy="405" r="18" fill="#003399" />
      <circle cx="400" cy="405" r="18" fill="#003399" />
    </svg>
  </div>
);

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <AlmarkyLogo className="w-10 h-10 mr-2" />
              <div className="flex flex-col">
                <span className="leading-none text-xl font-black text-slate-900 tracking-tighter uppercase">ALMARKY</span>
                <span className="text-[8px] font-bold text-orange-600 uppercase tracking-widest mt-0.5">Verified Store PK</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest text-slate-700">
            <Link to="/" className={`${isActive('/') ? 'text-blue-600' : 'text-slate-700'} hover:text-blue-600 transition-colors`}>Home</Link>
            <Link to="/shop" className={`${isActive('/shop') ? 'text-blue-600' : 'text-slate-700'} hover:text-blue-600 transition-colors`}>Catalog</Link>
            <Link to="/track-order" className={`${isActive('/track-order') ? 'text-blue-600' : 'text-slate-700'} hover:text-blue-600 transition-colors`}>Tracking</Link>
            <Link to="/account" className={`${isActive('/account') ? 'text-blue-600' : 'text-slate-700'} hover:text-blue-600 transition-colors flex items-center`}>
              {user?.isLoggedIn ? 'Profile' : 'Account'}
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/wishlist" className="relative p-2 text-slate-400 hover:text-slate-900 transition group">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${wishlist.length > 0 ? 'text-orange-500 fill-orange-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            
            <Link to="/cart" className="relative p-2 bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white rounded-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/account" className="hidden md:block p-1 bg-slate-100 rounded-full border-2 border-white shadow-sm overflow-hidden hover:scale-105 transition-transform">
              <img src={user?.photo || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} className="w-8 h-8 rounded-full object-cover" alt="" />
            </Link>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-50 shadow-lg">
          <div className="px-4 py-6 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="block p-3 text-xs font-bold uppercase text-slate-900 hover:bg-slate-50 rounded-lg">HOME</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block p-3 text-xs font-bold uppercase text-slate-900 hover:bg-slate-50 rounded-lg">CATALOG</Link>
            <Link to="/track-order" onClick={() => setIsOpen(false)} className="block p-3 text-xs font-bold uppercase text-slate-900 hover:bg-slate-50 rounded-lg">TRACK ORDER</Link>
            <Link to="/account" onClick={() => setIsOpen(false)} className="block p-3 text-xs font-bold uppercase text-slate-900 hover:bg-slate-50 rounded-lg">ACCOUNT</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
