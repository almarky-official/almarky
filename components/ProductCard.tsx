
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuickSelect from './QuickSelect';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [showQuickSelect, setShowQuickSelect] = useState(false);

  const hasDiscount = (product.originalPrice > product.price) || (product.discountPercentage && product.discountPercentage > 0);
  const hasVariants = product.colors && product.colors.length > 0;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) {
      setShowQuickSelect(true);
    } else {
      addToCart(product);
    }
  };

  const handleOrderNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) {
      setShowQuickSelect(true);
    } else {
      addToCart(product);
      navigate('/checkout');
    }
  };

  return (
    <>
      <div className="group bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:border-orange-100 transition-all duration-500 flex flex-col relative overflow-hidden h-full">
        {/* Wishlist Button */}
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-2xl transition-all duration-300 shadow-sm ${
            isInWishlist(product.id) ? 'bg-orange-500 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-300 hover:text-orange-500 border border-slate-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill={isInWishlist(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] bg-slate-50 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {!product.stock && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white text-slate-900 px-4 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-widest shadow-xl">
                Sold Out
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {hasDiscount && (
              <div className="bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg border border-rose-500 uppercase tracking-widest">
                {product.discountPercentage}% OFF
              </div>
            )}
            <div className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-blue-500 uppercase tracking-widest">COD</div>
          </div>
        </Link>

        {/* Product Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{product.category}</p>
            <div className="flex items-center space-x-1 bg-slate-50 px-2 py-0.5 rounded-lg">
              <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-[10px] font-black text-slate-500">4.9</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="flex-grow group/link">
            <h3 className="text-slate-900 text-sm md:text-base font-black mb-4 line-clamp-2 leading-tight group-hover/link:text-blue-600 transition-colors uppercase tracking-tight">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-end justify-between mb-6">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[11px] font-bold text-slate-400 line-through leading-none mb-1.5">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-lg md:text-xl font-black text-slate-900 leading-none tracking-tighter">
                Rs. {product.price.toLocaleString()}
              </span>
            </div>
            <button 
              onClick={handleAddToCartClick}
              disabled={!product.stock}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
              title="Add to Bag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>

          {/* New Order Now Direct Action Button */}
          <button 
            onClick={handleOrderNowClick}
            disabled={!product.stock}
            className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 ${
              product.stock 
              ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20' 
              : 'bg-slate-50 text-slate-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>{product.stock ? 'Order Now (COD)' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>

      {showQuickSelect && (
        <QuickSelect 
          product={product} 
          onClose={() => setShowQuickSelect(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;
