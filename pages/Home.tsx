
import React from 'react';
import { Link } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import PromoBanner from '../components/PromoBanner';
import TrustSignals from '../components/TrustSignals';
import CustomerReviews from '../components/CustomerReviews';
import PurchaseActivity from '../components/PurchaseActivity';
import WhatsAppFloating from '../components/WhatsAppFloating';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col space-y-0 pb-20 md:pb-16 bg-white">
      <PurchaseActivity />
      <WhatsAppFloating />

      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white text-[8px] md:text-[10px] py-1.5 font-bold overflow-hidden border-b border-orange-600">
        <div className="flex animate-marquee space-x-8 md:space-x-12 items-center">
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">🔥</span> 24-Hour Flash Sale</span>
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">⚡</span> Express Delivery</span>
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">✔</span> Verified Quality</span>
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">⭐</span> 12K+ Happy Customers</span>
          {/* Repeat */}
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">🔥</span> 24-Hour Flash Sale</span>
          <span className="flex items-center whitespace-nowrap uppercase tracking-widest"><span className="mr-1">⚡</span> Express Delivery</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-8 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-3 bg-orange-100/50 px-2 py-1 rounded">
                Trusted Shopping in Pakistan
              </span>
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-4 md:mb-6 tracking-tighter uppercase">
                Premium Goods.<br/>
                <span className="text-blue-600">Reliable COD.</span>
              </h1>
              <p className="text-slate-600 text-xs md:text-base max-w-md mx-auto md:mx-0 mb-6 md:mb-8 font-medium leading-relaxed">
                Handpicked quality products curated for your daily lifestyle. Secure Cash on Delivery nationwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link 
                  to="/shop" 
                  className="w-full sm:w-auto bg-slate-900 text-white font-black px-8 py-3.5 rounded-xl hover:bg-blue-600 transition-all text-[11px] uppercase tracking-widest text-center"
                >
                  Shop Catalog
                </Link>
                <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=user${i}`} alt="" />
                    ))}
                  </div>
                  <span>Trusted by 12k+</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600" className="w-full h-48 object-cover" alt="" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mt-8">
                  <img src="https://images.unsplash.com/photo-1544117518-30dd5f299c58?auto=format&fit=crop&q=80&w=600" className="w-full h-48 object-cover" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
        <TrustSignals />
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-10 gap-4 border-b border-slate-100 pb-4">
           <div>
             <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Handpicked <span className="text-blue-600">Deals</span>
             </h2>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified Stock Only</p>
           </div>
           <Link to="/shop" className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-orange-600 transition-colors flex items-center">
             View All
             <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
           </Link>
        </div>
        <ProductSection />
      </div>

      {/* Promo & Reviews */}
      <div className="max-w-7xl mx-auto w-full px-4 space-y-8 md:space-y-16 py-6">
        <PromoBanner />
        <CustomerReviews />
      </div>
    </div>
  );
};

export default Home;