
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Terms of <span className="text-emerald-600">Service</span></h1>
      <div className="prose prose-slate max-w-none text-slate-500 leading-relaxed space-y-6 font-medium">
        <h2 className="text-xl font-black text-slate-900 uppercase">1. Orders and Acceptance</h2>
        <p>By placing an order on Almarky, you agree to receive a confirmation call from our team. Orders are only considered "Accepted" once the confirmation call is successful.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">2. Cash on Delivery</h2>
        <p>Cash on Delivery is a service provided for the convenience and safety of our customers. You are required to pay the full order amount to the rider upon delivery of the parcel.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">3. Delivery Timeline</h2>
        <p>While we strive for fast delivery (2-5 working days), Almarky is not liable for delays caused by weather, road conditions, or logistics provider issues.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">4. Return & Replacement</h2>
        <p>Returns are accepted within 7 days for faulty products only. "Change of mind" returns are not supported for opened hygiene products or electronics.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
