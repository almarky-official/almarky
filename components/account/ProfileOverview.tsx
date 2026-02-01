
import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';

const ProfileOverview: React.FC = () => {
  const { orders } = useOrders();
  const { wishlist } = useWishlist();

  const stats = [
    { label: 'Orders', count: orders.length, icon: '📦', color: 'blue' },
    { label: 'Wishlist', count: wishlist.length, icon: '❤️', color: 'rose' },
    { label: 'Points', count: orders.length * 50, icon: '✨', color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-lg font-black text-slate-900 leading-none">{stat.count}</div>
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Recent Activity</h3>
          <Link to="/my-orders" className="text-[9px] font-black text-blue-600 uppercase">View All</Link>
        </div>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 2).map(order => (
              <div key={order.orderId} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase">Order #{order.orderId}</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">{new Date(order.timestamp).toLocaleDateString()}</p>
                </div>
                <span className="text-[8px] font-black px-2 py-1 bg-blue-100 text-blue-700 rounded-lg uppercase">{order.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 py-10 rounded-3xl text-center border-2 border-dashed border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase">No recent activity</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileOverview;
