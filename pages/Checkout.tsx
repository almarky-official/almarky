
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types';

/**
 * Almarky Order Synchronization Portal
 * Google Apps Script must be deployed as a Web App with 'Anyone' access.
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzD4ZQ0MrmxoGjtxvPRFqccAWOakNY3PSftOz8hhIedPOT4SWAo-5QzrONWDQU1O0LA/exec";

const Checkout: React.FC = () => {
  const { cart, totalProductPrice, totalDeliveryPrice, totalPayable, clearCart } = useCart();
  const { saveOrder } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
    notes: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = (phone: string) => {
    return /^03\d{9}$/.test(phone.replace(/[\s-]/g, ''));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(formData.phone)) {
      setError('Enter valid 11-digit mobile (e.g., 03271452389)');
      return;
    }

    setLoading(true);
    const orderId = `ALM-${Math.floor(10000 + Math.random() * 90000)}`;
    
    const newOrder: Order = {
      orderId,
      timestamp: Date.now(),
      items: [...cart],
      totalAmount: totalPayable,
      status: 'Pending',
      customerDetails: {
        customerName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes
      }
    };

    // Flattened Payload for Sheets
    const payload = {
      orderId: newOrder.orderId,
      timestamp: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      notes: formData.notes,
      totalAmount: totalPayable,
      itemSummary: cart.map(item => `${item.name} (${item.quantity}x ${item.selectedColor || 'N/A'})`).join(' | ')
    };

    try {
      // Direct Sync with Google Sheets (no-cors is safe for fire-and-forget logging)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      saveOrder(newOrder);
      
      setTimeout(() => {
        clearCart();
        setLoading(false);
        navigate('/success');
      }, 1000);
      
    } catch (err) {
      console.error("Sheets Sync Error:", err);
      // Proceed even if external sync fails (local first)
      saveOrder(newOrder);
      clearCart();
      setLoading(false);
      navigate('/success');
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mb-20">
      <div className="mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Step 02</span>
          <span className="text-slate-300 font-black">/</span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Final Confirmation</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Shipping <span className="text-blue-600">Details</span></h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-4">Verified Cash On Delivery Protocol</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-50 relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-in fade-in duration-300">
               <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
               <p className="text-slate-900 font-black uppercase tracking-[0.4em] text-[10px] mt-8 animate-pulse">Syncing with Cloud Database...</p>
            </div>
          )}

          <h2 className="text-xl font-black mb-12 uppercase tracking-tight text-slate-900 flex items-center">
            <span className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mr-5 shadow-xl shadow-slate-900/10 text-xs">01</span>
            Order Placement
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Customer Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Subhan" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900 shadow-sm" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Phone Number</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="03XXXXXXXXX" className={`w-full border-2 rounded-2xl px-6 py-5 outline-none transition-all font-bold text-slate-900 shadow-sm ${error ? 'border-rose-200 bg-rose-50' : 'border-slate-50 bg-slate-50 focus:border-blue-600'}`} />
                {error && <p className="mt-3 text-[9px] text-rose-500 font-black uppercase">{error}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Shipping City</label>
                <select name="city" value={formData.city} onChange={handleChange} className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 font-bold text-slate-900 appearance-none shadow-sm">
                  {["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Other"].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Full Address</label>
                <input required name="address" value={formData.address} onChange={handleChange} type="text" placeholder="House #, Street, Area..." className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-5 outline-none focus:border-blue-600 font-bold text-slate-900 shadow-sm" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-900 text-white font-black py-8 rounded-[2rem] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 disabled:opacity-50 uppercase tracking-[0.4em] text-sm flex items-center justify-center space-x-4"
            >
              <span>Confirm Order (COD)</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 sticky top-24">
            <h2 className="text-2xl font-black mb-10 uppercase tracking-tighter text-slate-900">Order Summary</h2>
            <div className="space-y-4 mb-10">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center space-x-5">
                    <img src={item.images[0]} className="w-16 h-16 rounded-2xl object-cover border border-slate-50" alt="" />
                    <div>
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight block">{item.name}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900 tracking-tighter">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 pt-10 space-y-4 font-black uppercase text-[11px] tracking-widest">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>Rs. {totalProductPrice.toLocaleString()}</span></div>
              <div className="flex justify-between text-blue-600"><span>Shipping</span><span>Rs. {totalDeliveryPrice.toLocaleString()}</span></div>
              <div className="flex justify-between text-2xl pt-6 border-t border-slate-900 text-slate-900 tracking-tighter uppercase leading-none">
                <span>Total</span><span className="text-blue-600">Rs. {totalPayable.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
