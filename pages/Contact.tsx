
import React from 'react';

const Contact: React.FC = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/923271452389", "_blank");
  };

  const openAIChat = () => {
    window.dispatchEvent(new CustomEvent('open-almarky-ai'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <div className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Get In Touch</div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-4">Contact <span className="text-orange-600">Almarky</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">We are here to assist you with every detail of your premium shopping journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            onClick={openWhatsApp}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-start space-x-6 cursor-pointer hover:border-emerald-500 transition-all group"
          >
            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase">WhatsApp Helpdesk</h3>
              <p className="text-slate-500 text-sm font-medium">0327 1452389</p>
              <div className="mt-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                <span className="text-[8px] font-black uppercase text-emerald-600 tracking-widest leading-none">Agents Online</span>
              </div>
            </div>
          </div>

          <div 
            onClick={openAIChat}
            className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-800 flex items-start space-x-6 cursor-pointer hover:border-blue-500 transition-all group"
          >
            <div className="bg-blue-600 p-4 rounded-2xl text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase">Almarky AI Bot</h3>
              <p className="text-slate-400 text-sm font-medium">Instant 24/7 Support</p>
              <span className="inline-block mt-3 text-[8px] font-black uppercase bg-blue-600/20 text-blue-400 px-2 py-1 rounded tracking-tighter leading-none">Instant Response</span>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-start space-x-6">
            <div className="bg-slate-200 p-4 rounded-2xl text-slate-600">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase">Email Centre</h3>
              <p className="text-slate-500 text-sm font-medium">almarkyhelpcentre@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-50">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Drop a Message</h3>
            <p className="text-slate-400 text-sm font-medium mt-2">Expected response via email within 12 hours.</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Full Name</label>
              <input type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="Ali Raza" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Active Email Address</label>
              <input type="email" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="ali@gmail.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Reason for Contact</label>
              <input type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="Order Inquiry #12345" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Detailed Inquiry</label>
              <textarea rows={5} className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="md:col-span-2 bg-slate-900 text-white font-black py-6 rounded-[1.8rem] hover:bg-orange-600 transition shadow-2xl shadow-slate-900/10 active:scale-95 uppercase tracking-widest text-xs">
              Dispatch Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
