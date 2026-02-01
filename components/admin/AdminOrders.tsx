
import React, { useState } from 'react';

const AdminOrders: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const orders = [
    { id: 'ALM-9912', customer: 'Zeeshan Ahmed', phone: '03001234567', city: 'Karachi', amount: 4500, status: 'Shipped', date: '2026-05-15' },
    { id: 'ALM-9911', customer: 'Fatima Khan', phone: '03217654321', city: 'Lahore', amount: 3800, status: 'Pending', date: '2026-05-15' },
    { id: 'ALM-9910', customer: 'Imran Hashmi', phone: '03459876543', city: 'Islamabad', amount: 2200, status: 'Processing', date: '2026-05-14' },
    { id: 'ALM-9909', customer: 'Sana Wazir', phone: '03332221110', city: 'Faisalabad', amount: 3500, status: 'Delivered', date: '2026-05-14' },
    { id: 'ALM-9908', customer: 'Babar Ali', phone: '03120001112', city: 'Multan', amount: 7200, status: 'Cancelled', date: '2026-05-13' },
  ];

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Order Management</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Review and fulfill customer requests</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          {['All', 'Pending', 'Shipped', 'Delivered'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80">
              <tr>
                {['Customer', 'Location', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">{order.customer}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{order.id} • {order.phone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-600">{order.city}</td>
                  <td className="px-8 py-6 font-black text-slate-900">Rs. {order.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <select 
                      defaultValue={order.status}
                      className={`text-[10px] font-black px-3 py-1.5 rounded-full border-none outline-none appearance-none cursor-pointer uppercase tracking-tighter shadow-sm ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                        order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</td>
                  <td className="px-8 py-6">
                    <button className="bg-slate-50 p-3 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-slate-300 shadow-sm border border-slate-100">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path fillRule="evenodd" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" clipRule="evenodd" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
