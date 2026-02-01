
import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="mb-8 flex justify-center">
        <div className="bg-green-100 p-6 rounded-full text-green-600 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter uppercase">Order Confirmed!</h1>
      <p className="text-xl text-slate-600 mb-8 font-medium">
        Thank you for shopping with Almarky. Your order has been placed and is being processed. 
        You will receive a confirmation call shortly.
      </p>
      <div className="space-y-4">
        <Link 
          to="/shop" 
          className="block w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-slate-900 transition shadow-2xl shadow-blue-600/20 uppercase tracking-widest text-xs"
        >
          Continue Shopping
        </Link>
        <Link 
          to="/" 
          className="block w-full bg-slate-50 text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-200 transition uppercase tracking-widest text-xs"
        >
          Return Home
        </Link>
      </div>
      <div className="mt-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
        "Expect delivery within 2-4 working days. Keep your phone on!"
      </div>
    </div>
  );
};

export default Success;
