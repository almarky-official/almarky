
import React from 'react';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const MyOrders: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 pb-24 md:pb-16">
      <header className="mb-8">
        <nav className="flex mb-3 text-[8px] font-black text-slate-400 space-x-2 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="opacity-30">/</span>
          <Link to="/account" className="hover:text-blue-600">Account</Link>
          <span className="opacity-30">/</span>
          <span className="text-orange-600">Orders</span>
        </nav>
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">My <span className="text-blue-600">Orders</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">Local device history</p>
      </header>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></div>
          <h2 className="text-lg font-black text-slate-900 mb-1 uppercase">No Orders Found</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto">Your history is currently empty.</p>
          <Link to="/shop" className="mt-6 inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden group">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                <div><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Date</span><p className="text-[10px] font-black text-slate-900 uppercase">{new Date(order.timestamp).toLocaleDateString()}</p></div>
                <div className="text-right"><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ID</span><p className="text-[10px] font-black text-blue-600 uppercase">#{order.orderId}</p></div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate max-w-[150px]">{item.name}</h4>
                        <div className="flex items-center space-x-3">
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          {item.selectedColor && (
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: item.selectedColor }}></div>
                              <span className="text-[7px] font-black uppercase text-slate-400">{item.selectedColor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right"><p className="text-[11px] font-black text-slate-900">Rs. {(item.price * item.quantity).toLocaleString()}</p></div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                     <span className={`w-2 h-2 rounded-full ${order.status === 'Pending' ? 'bg-amber-400 animate-pulse' : 'bg-blue-500'}`}></span>
                     <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{order.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Total (COD)</span>
                    <p className="text-lg font-black text-slate-900 tracking-tighter">Rs. {order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                   <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-grow">
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Shipping To</p>
                      <p className="text-[9px] font-black text-slate-900 uppercase leading-none truncate">{order.customerDetails.customerName} | {order.customerDetails.city}</p>
                   </div>
                   <Link to="/track-order" className="text-center text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">Track Order</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
