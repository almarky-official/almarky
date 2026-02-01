
import React from 'react';

const PromoBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-orange-500 via-red-600 to-blue-800 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl mb-12">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-center lg:text-left">
          <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 border border-white/20">
            Exclusive Warehouse Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
            SUPER <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">MEGA</span> SALE
          </h2>
          <p className="text-white text-lg md:text-xl mt-6 font-bold opacity-90 max-w-lg">
            Shop the verified collection with up to 50% discount. Limited inventory remaining.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="bg-white text-slate-900 font-black px-12 py-5 rounded-[1.5rem] hover:bg-orange-100 transition-all shadow-2xl active:scale-95 text-sm uppercase tracking-[0.2em]">
            EXPLOIT DEALS
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Expires in 12h 45m</p>
        </div>
      </div>
      
      {/* Dynamic Graphic Elements */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-400/30 rounded-full blur-[100px]"></div>
      <div className="absolute top-10 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-[80px]"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
    </div>
  );
};

export default PromoBanner;
