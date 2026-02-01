
import React from 'react';

const AdminOverview: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: 'Rs. 1.2M', icon: '💰', trend: '+14%', color: 'emerald' },
    { label: 'Active Orders', value: '42', icon: '📦', trend: '+5%', color: 'blue' },
    { label: 'New Customers', value: '128', icon: '👥', trend: '+22%', color: 'indigo' },
    { label: 'Site Visits', value: '5.4k', icon: '🌐', trend: '-2%', color: 'rose' },
  ];

  const recentOrders = [
    { id: 'ALM-9912', customer: 'Zeeshan A.', item: 'Wireless Earbuds', amount: 4500, status: 'Shipped', date: '10 mins ago' },
    { id: 'ALM-9911', customer: 'Fatima K.', item: 'Smart Watch Ultra', amount: 3800, status: 'Pending', date: '45 mins ago' },
    { id: 'ALM-9910', customer: 'Imran H.', item: 'Leather Wallet', amount: 2200, status: 'Processing', date: '2 hours ago' },
    { id: 'ALM-9909', customer: 'Sana W.', item: 'Nordic Tea Set', amount: 3500, status: 'Delivered', date: '5 hours ago' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 bg-${stat.color}-50 text-2xl flex items-center justify-center rounded-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Recent Sales Activity</h3>
            <button className="bg-slate-50 text-[10px] font-black text-slate-400 px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Export Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  {['Order ID', 'Customer', 'Amount', 'Status', 'Time'].map(h => (
                    <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6 font-black text-slate-900 text-sm tracking-tight">{order.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{order.customer}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{order.item}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900">Rs. {order.amount.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Source Chart Simulation */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-8">Traffic Sources</h3>
          <div className="space-y-6">
            {[
              { label: 'Direct Store', value: 65, color: 'emerald' },
              { label: 'WhatsApp Chat', value: 25, color: 'teal' },
              { label: 'Facebook Ads', value: 10, color: 'blue' },
            ].map((source, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">{source.label}</span>
                  <span className="text-slate-900">{source.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${source.color}-500 rounded-full transition-all duration-1000`}
                    style={{ width: `${source.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-slate-900 rounded-3xl p-6 text-white">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Pro Tip</p>
             <p className="text-xs font-medium leading-relaxed">Increase WhatsApp marketing to boost conversion by up to 15% this weekend.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
