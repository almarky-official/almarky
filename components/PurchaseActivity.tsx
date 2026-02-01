
import React, { useState, useEffect } from 'react';

const buyers = [
  { name: "Arsalan", city: "Lahore", product: "Wireless Earbuds" },
  { name: "Zainab", city: "Karachi", product: "Smart Watch" },
  { name: "Omar", city: "Islamabad", product: "Leather Wallet" },
  { name: "Hira", city: "Multan", product: "Ceramic Tea Set" },
];

const PurchaseActivity: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setCurrent(Math.floor(Math.random() * buyers.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 15000);

    return () => clearInterval(showInterval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-[100] animate-in slide-in-from-left duration-500 max-w-[280px]">
      <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center space-x-3">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Recent Activity</p>
          <p className="text-[11px] text-slate-900 leading-tight">
            <strong>{buyers[current].name}</strong> from {buyers[current].city} <br/> 
            purchased <strong>{buyers[current].product}</strong>
          </p>
          <p className="text-[9px] text-emerald-500 font-bold mt-0.5">Verified Order</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-slate-300 hover:text-slate-500">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>
      </div>
    </div>
  );
};

export default PurchaseActivity;
