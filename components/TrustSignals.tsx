
import React from 'react';

const TrustSignals: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { 
          title: "COD Support", 
          desc: "Pay after inspection", 
          color: "orange",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /> 
        },
        { 
          title: "7-Day Warranty", 
          desc: "Hassle-free replacement", 
          color: "blue",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
        },
        { 
          title: "Verified Items", 
          desc: "100% Original Stock", 
          color: "green",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-3.061 3.42 3.42 0 016.438 0 3.42 3.42 0 001.946 3.061 3.42 3.42 0 010 6.438 3.42 3.42 0 00-1.946 3.061 3.42 3.42 0 01-6.438 0 3.42 3.42 0 00-1.946-3.061 3.42 3.42 0 010-6.438z" /> 
        },
        { 
          title: "Nationwide Ship", 
          desc: "Secure Logistics", 
          color: "blue",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /> 
        }
      ].map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-col items-center text-center group hover:scale-105 transition-all duration-300">
          <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-5 shadow-inner`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {item.icon}
            </svg>
          </div>
          <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-900 mb-1">{item.title}</h4>
          <p className="text-[10px] text-slate-400 font-bold opacity-80">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;
