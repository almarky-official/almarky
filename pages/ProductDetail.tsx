
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import WhatsAppFloating from '../components/WhatsAppFloating';
import ProductCard from '../components/ProductCard';
import ProductReviews from '../components/ProductReviews';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  // Set default selected color when product loads
  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  // Reset image view when navigating between products
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  const recommendations = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id)
      .sort((a, b) => {
        const aSameCat = a.category === product.category ? 1 : 0;
        const bSameCat = b.category === product.category ? 1 : 0;
        if (aSameCat !== bSameCat) return bSameCat - aSameCat;
        return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      })
      .slice(0, 5);
  }, [product, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Product Not Located</h2>
        <Link to="/" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition shadow-xl">Back to Catalog</Link>
      </div>
    );
  }

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(q => q + 1);
    else if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const handleAction = (type: 'cart' | 'buy') => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a style / color variation first!");
      return;
    }
    
    addToCart(product, quantity, selectedColor);
    
    if (type === 'buy') {
      navigate('/checkout');
    }
  };

  const hasDiscount = product.originalPrice > product.price || (product.discountPercentage && product.discountPercentage > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 pb-24 md:pb-16 bg-white">
      <WhatsAppFloating />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-16">
        {/* IMAGE GALLERY SECTION */}
        <div className="space-y-6">
          <div className="rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 aspect-square relative shadow-2xl shadow-slate-900/5 group">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {hasDiscount && (
              <div className="absolute top-6 left-6 bg-rose-600 text-white font-black px-4 py-1.5 rounded-2xl shadow-xl uppercase tracking-widest text-[10px] z-10 border border-rose-500">
                {product.discountPercentage}% SAVINGS
              </div>
            )}
            {!product.stock && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-white text-slate-900 px-6 py-2 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl">SOLDOUT</span>
              </div>
            )}
          </div>
          
          {/* THUMBNAIL TRACKER */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar px-2">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)} 
                  className={`relative w-20 h-20 flex-shrink-0 rounded-[1.5rem] overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-blue-600 shadow-xl scale-110 ring-4 ring-blue-50' : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col">
          <nav className="flex mb-6 text-[9px] font-black text-slate-400 space-x-3 uppercase tracking-widest">
            <Link to="/" className="hover:text-blue-600 transition-colors">Catalog</Link>
            <span className="opacity-30">/</span>
            <span className="text-orange-600 truncate">{product.name}</span>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 tracking-tighter uppercase leading-none">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-10">
            <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">{product.category}</span>
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-emerald-700 font-black text-[9px] tracking-widest uppercase">Verified Almarky Item</span>
            </div>
          </div>
          
          <div className="mb-10 p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden border border-white/5">
            <div className="relative z-10 flex flex-col space-y-4">
              <div className="flex justify-between items-center opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Store Price</span>
                {hasDiscount && <span className="text-lg font-bold line-through tracking-tighter">Rs. {product.originalPrice.toLocaleString()}</span>}
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">Your Price</span>
                <span className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Rs. {product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Home Delivery (Nationwide)</span>
                <span className="text-base font-black text-white uppercase tracking-tighter">Rs. {product.deliveryCharges.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="text-slate-600 mb-10 text-sm md:text-base leading-relaxed border-l-4 border-blue-600 pl-8 bg-slate-50/50 py-6 rounded-r-3xl italic font-medium">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>

          {/* VARIATION SELECTOR */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-10 space-y-5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Pick Your Variation</label>
              <div className="flex flex-wrap gap-5">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-300 ${
                      selectedColor === color 
                      ? 'border-blue-600 bg-blue-50 shadow-xl scale-110 ring-8 ring-blue-50' 
                      : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className={`w-8 h-8 ${color === '#FFFFFF' || color === 'white' ? 'text-slate-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                Currently Selected: <span className="text-slate-900">{selectedColor || 'None'}</span>
              </p>
            </div>
          )}

          {/* KEY SPECS DISPLAY */}
          {product.features && product.features.length > 0 && (
            <div className="mb-10 space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Technical Specifications</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all shadow-sm">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-700 tracking-tight leading-none">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY & ACTIONS */}
          <div className="mb-10">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Quantity to Order</label>
            <div className="flex items-center bg-slate-100 w-fit rounded-2xl p-1.5 border border-slate-200">
              <button onClick={() => handleQuantityChange('dec')} className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all active:scale-90 disabled:opacity-30" disabled={quantity <= 1}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"/></svg>
              </button>
              <div className="w-16 text-center font-black text-slate-900 text-xl">{quantity}</div>
              <button onClick={() => handleQuantityChange('inc')} className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all active:scale-90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button 
              onClick={() => handleAction('buy')} 
              disabled={!product.stock}
              className="bg-orange-500 text-white font-black py-6 md:py-5 rounded-[1.5rem] hover:bg-orange-600 transition-all text-center uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-500/30 active:scale-95 flex items-center justify-center space-x-3"
            >
              <svg className="w-7 h-7 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>{product.stock ? 'Express Checkout (COD)' : 'Sold Out'}</span>
            </button>
            
            <button 
              onClick={() => handleAction('cart')} 
              disabled={!product.stock}
              className="bg-slate-900 text-white font-black py-6 md:py-5 rounded-[1.5rem] hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all uppercase tracking-[0.2em] text-sm shadow-2xl shadow-slate-900/10 active:scale-95 flex items-center justify-center space-x-3"
            >
              <svg className="w-7 h-7 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>
      </div>

      <ProductReviews productId={product.id} />

      {recommendations.length > 0 && (
        <section className="pt-20 border-t border-slate-100 mt-20">
          <div className="mb-12 text-center md:text-left">
             <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Verified Pairings</h2>
             <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] mt-2">Customers who viewed this also loved</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {recommendations.map(rec => (<ProductCard key={rec.id} product={rec} />))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
