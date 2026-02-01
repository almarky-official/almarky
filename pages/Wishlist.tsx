
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Your wishlist is empty</h2>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto">Found something you like? Tap the heart icon on any product to save it here for later.</p>
        <Link 
          to="/shop" 
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition shadow-xl"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">My <span className="text-rose-500">Wishlist</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{wishlist.length} Items Saved</p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
