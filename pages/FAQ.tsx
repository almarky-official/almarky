
import React, { useState } from 'react';

const faqItems = [
  {
    q: "How do I pay for my order?",
    a: "We currently offer 100% Cash on Delivery (COD) across Pakistan. You pay the rider only when the package arrives at your doorstep."
  },
  {
    q: "What is the delivery time?",
    a: "Standard delivery takes 2-3 working days for major cities like Karachi, Lahore, and Islamabad. Other cities may take up to 4-5 working days."
  },
  {
    q: "Can I check my order before paying?",
    a: "Yes! Almarky allows you to inspect the outer packaging and the product (without opening seals on electronics/beauty) before paying the rider."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-Day Replacement Warranty. If the product is faulty or not as described, simply contact us on WhatsApp with photos, and we will arrange a return."
  },
  {
    q: "Are your products original?",
    a: "Every item in our store is hand-inspected for quality and authenticity. We only source from verified manufacturers and direct importers."
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const openAIChat = () => {
    // Trigger the global custom event that the AIAgent component is listening for
    const event = new CustomEvent('open-almarky-ai');
    window.dispatchEvent(event);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/923271452389", "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
      <header className="text-center mb-20">
        <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Customer Support Portal</div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Almarky <span className="text-blue-600">Help Centre</span></h1>
        <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto font-medium">Get instant answers through our AI or connect with our human team on WhatsApp.</p>
      </header>

      {/* Primary Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* AI Agent Card */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Chat with Almarky AI</h3>
            <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Our AI agent provides instant answers about your orders, shipping status, and store policies 24/7.</p>
            <button 
              onClick={openAIChat}
              className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 hover:bg-blue-600 hover:text-white"
            >
              Initialize AI Assistant
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-[#25D366] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl text-[#25D366]">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Human Direct Support</h3>
            <p className="text-white/80 text-sm font-medium mb-10 leading-relaxed">Need custom help? Speak directly with our verified Almarky support team in Karachi via WhatsApp.</p>
            <button 
              onClick={openWhatsApp}
              className="w-full bg-white text-[#25D366] font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 hover:bg-slate-900 hover:text-white"
            >
              Message On WhatsApp
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Additional Info */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Store Stats</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Avg Response Time</span>
                <span className="text-xs font-black text-blue-600">~2 Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Human Hours</span>
                <span className="text-xs font-black text-slate-900 uppercase">9AM - 11PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">AI Availability</span>
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  24/7 ONLINE
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
            <h4 className="text-lg font-black uppercase tracking-tight mb-3">Order Tracking</h4>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-6">Need to know where your parcel is?</p>
            <a href="/#/track-order" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Track Order Now</a>
          </div>
        </div>

        {/* Right: FAQ Accordion */}
        <div className="lg:col-span-8 space-y-4">
          <div className="mb-6 px-4">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Frequently Asked Questions</h4>
             <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Browse <span className="text-blue-600">Solutions</span></h2>
          </div>
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all shadow-sm hover:shadow-md">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-8 py-7 text-left flex justify-between items-center group"
              >
                <span className="font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors text-sm uppercase">{item.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${open === i ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-white border-slate-100 text-slate-300'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-slate-50 pt-6">
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.a}</p>
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-12 bg-slate-50 p-10 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
             <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">No luck finding an answer?</h3>
             <p className="text-slate-400 text-sm mb-8 font-medium">Use our automated AI shield for instant help or message a human support agent.</p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={openAIChat} className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:bg-blue-600 transition-all">
                  Launch Almarky AI
                </button>
                <button onClick={openWhatsApp} className="w-full sm:w-auto bg-white text-[#25D366] border border-[#25D366]/20 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#25D366] hover:text-white transition-all">
                  Message Support
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
