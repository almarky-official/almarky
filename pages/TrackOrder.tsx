
import React, { useState } from 'react';
// Added missing Link import
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types';

const TrackOrder: React.FC = () => {
  const { orders } = useOrders();
  const [query, setQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'not_found' | 'found'>('idle');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setStatus('loading');
    
    // Simulate lookup delay
    setTimeout(() => {
      const found = orders.find(o => 
        o.orderId.toLowerCase() === query.toLowerCase() || 
        o.customerDetails.phoneNumber.includes(query)
      );
      
      if (found) {
        setTrackingResult(found);
        setStatus('found');
      } else {
        setStatus('not_found');
      }
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Logistics Tracking</div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-4">
          Where's My <span className="text-blue-600">Parcel?</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">Enter your Order ID starting with 'ALM-' or your registered phone number.</p>
      </header>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 max-w-xl mx-auto mb-16 relative overflow-hidden">
        <form onSubmit={handleTrack} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Order Credentials</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="ALM-12345 or 0327..." 
                className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-900 placeholder:text-slate-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-blue-600 transition-all uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 active:scale-95">
            Locate Shipment
          </button>
        </form>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>
      </div>

      {status === 'loading' && (
        <div className="flex flex-col items-center py-20 animate-pulse">
           <div className="w-16 h-16 border-[6px] border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
           <p className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px]">Pinging Fulfillment Centers...</p>
        </div>
      )}

      {status === 'not_found' && (
        <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-10 text-center animate-in zoom-in duration-300">
          <div className="text-4xl mb-4">❌</div>
          <h3 className="text-xl font-black text-rose-900 uppercase tracking-tight mb-2">Order Not Located</h3>
          <p className="text-rose-700 text-xs font-bold uppercase tracking-widest mb-6 leading-relaxed">
            We couldn't find an order for "{query}". <br/> Please check your ID or contact support.
          </p>
          <a href="https://wa.me/923271452389" className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition shadow-lg">Chat with Support</a>
        </div>
      )}

      {status === 'found' && trackingResult && (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-8 md:p-12 animate-in slide-in-from-bottom-8 duration-500">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-slate-100 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-black text-slate-900 uppercase">#{trackingResult.orderId}</h3>
                  <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">LIVE UPDATE</span>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Customer: {trackingResult.customerDetails.customerName}</p>
              </div>
              <div className="text-right md:text-left bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Current Status</p>
                <p className="text-lg font-black text-blue-600 uppercase tracking-tight">{trackingResult.status}</p>
              </div>
           </div>

           <div className="space-y-12 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
              
              {[
                { label: 'Order Confirmed', time: new Date(trackingResult.timestamp).toLocaleString(), done: true },
                { label: 'Processing at Hub', time: 'Recently Updated', done: trackingResult.status !== 'Pending' },
                { label: 'Out for Delivery', time: 'Estimated: 24-48h', done: trackingResult.status === 'Delivered' },
              ].map((step, i) => (
                <div key={i} className="flex items-start relative z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-6 shadow-md transition-all duration-700 ${step.done ? 'bg-blue-600 text-white scale-110' : 'bg-white text-slate-200 border-2 border-slate-100'}`}>
                    {step.done ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    ) : <div className="w-2 h-2 rounded-full bg-slate-200"></div>}
                  </div>
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-50 flex-grow hover:bg-white hover:border-blue-100 transition-all cursor-default">
                    <h4 className={`text-sm font-black uppercase tracking-tight mb-1 ${step.done ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{step.time}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 bg-slate-900 rounded-[2rem] p-8 text-center text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Total COD Amount</p>
              <h4 className="text-3xl font-black tracking-tighter mb-8">Rs. {trackingResult.totalAmount.toLocaleString()}</h4>
              <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest bg-white/10 hover:bg-white hover:text-slate-900 px-8 py-3 rounded-xl transition-all border border-white/20">Raise Issue</Link>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
