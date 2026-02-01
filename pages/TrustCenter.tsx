
import React from 'react';

const TrustCenter: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-4">
          Trust <span className="text-emerald-600">Center</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          At Almarky, transparency is our foundation. Learn how we protect your orders, your data, and your peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">7-Day Inspection Warranty</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            We offer a "Check Before You Accept" policy on most items. If the product delivered isn't exactly what you saw online, we will replace it or refund your payment within 7 days, no questions asked.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase">Secure Cash on Delivery</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Eliminate online fraud risks. We prioritize COD across Pakistan, so you only pay when the rider arrives at your doorstep with your package.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-2 border-emerald-500 inline-block">Privacy Policy</h2>
          <div className="prose prose-slate text-sm text-slate-500 max-w-none">
            <p>Your data is encrypted. We do not sell your phone numbers or addresses to third-party marketing agencies. Information collected during checkout is used solely for order fulfillment and customer support.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-2 border-emerald-500 inline-block">Return & Refund Terms</h2>
          <div className="prose prose-slate text-sm text-slate-500 max-w-none">
            <ul className="list-disc pl-5 space-y-2">
              <li>Item must be in original packaging for a change-of-mind return.</li>
              <li>Faulty electronics are covered under a 3-month limited brand warranty (where applicable).</li>
              <li>Refunds are processed within 3-5 working days via Bank Transfer or JazzCash.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-center text-white">
        <h2 className="text-3xl font-black mb-4 uppercase">Still have questions?</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">Our Trust & Safety team is available from 9 AM to 11 PM every day.</p>
        <a href="https://wa.me/923271452389" className="bg-emerald-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-500 transition-colors inline-block">Chat with Support</a>
      </div>
    </div>
  );
};

export default TrustCenter;
