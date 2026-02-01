
import React from 'react';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-8">Monthly Growth</h3>
          <div className="flex items-end justify-between h-48 gap-3">
             {[30, 45, 25, 60, 80, 55, 90, 75, 100, 85, 95, 110].map((h, i) => (
               <div key={i} className="flex-grow flex flex-col items-center group">
                 <div 
                   className="w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end"
                   style={{ height: '100%' }}
                 >
                   <div 
                     className="w-full bg-emerald-500 rounded-lg group-hover:bg-slate-900 transition-all duration-500" 
                     style={{ height: `${h}%` }}
                   ></div>
                 </div>
                 <span className="text-[8px] font-black text-slate-300 mt-3 uppercase tracking-tighter">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
               </div>
             ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projection</p>
               <p className="text-xl font-black text-emerald-600">+Rs. 250k next month</p>
             </div>
             <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-2 rounded-xl">EXCELLENT PERFORMANCE</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-8">Order Demographics</h3>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                 {[
                   { city: 'Karachi', val: '42%' },
                   { city: 'Lahore', val: '28%' },
                   { city: 'Islamabad', val: '18%' },
                   { city: 'Other', val: '12%' },
                 ].map((d, i) => (
                   <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-slate-500">{d.city}</span>
                     <span className="text-slate-900">{d.val}</span>
                   </div>
                 ))}
              </div>
              <div className="flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full border-[12px] border-emerald-500 border-r-slate-900 border-b-emerald-600 flex items-center justify-center">
                    <div className="text-center">
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Total Orders</p>
                       <p className="text-lg font-black text-slate-900 leading-none">412</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="mt-12 bg-slate-50 rounded-3xl p-6 border border-slate-100">
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">💡</div>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">Most active time for orders is <span className="text-slate-900 font-black">9 PM - 12 AM</span>. Consider launching sales during this window.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
