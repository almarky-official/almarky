
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlmarkyLogo } from './Navbar';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleSecretAccess = () => {
    // Navigates to the new stealth path
    navigate('/almarky-internal-v2026');
  };

  return (
    <footer className="bg-white text-slate-600 pt-24 pb-12 border-t-[12px] border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1">
            <div className="flex items-center mb-10">
               <AlmarkyLogo className="w-16 h-16 mr-4" />
               <h3 className="text-slate-900 text-3xl font-black tracking-tighter uppercase">ALMARKY<span className="text-orange-600">.</span></h3>
            </div>
            <p className="text-xs leading-loose font-bold opacity-80 mb-10 max-w-xs text-slate-900">
              Pakistan's leading marketplace for premium lifestyle goods. We offer verified quality, vibrant collections, and lightning-fast delivery nationwide.
            </p>
            <div className="flex space-x-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                 </div>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.4em] mb-12 pb-3 border-b-4 border-blue-600 inline-block">Explore</h4>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-900">
              <li><Link to="/shop" className="hover:text-blue-600 transition">Our Catalog</Link></li>
              <li><Link to="/wishlist" className="hover:text-blue-600 transition">Saved Items</Link></li>
              <li><Link to="/track-order" className="hover:text-blue-600 transition">Track Shipment</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 transition">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.4em] mb-12 pb-3 border-b-4 border-orange-600 inline-block">Legals</h4>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-900">
              <li><Link to="/privacy" className="hover:text-orange-600 transition">Privacy Hub</Link></li>
              <li><Link to="/terms" className="hover:text-orange-600 transition">Terms of Use</Link></li>
              <li><Link to="/trust-center" className="hover:text-orange-600 transition">Return Policy</Link></li>
              <li><Link to="/contact" className="hover:text-orange-600 transition">Work With Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.4em] mb-12 pb-3 border-b-4 border-slate-900 inline-block">Reach Us</h4>
            <div className="space-y-8">
              <div className="flex items-center group">
                <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center mr-5 group-hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div className="text-[12px] font-black text-slate-900 uppercase tracking-widest">0327 1452389</div>
              </div>
              <div className="flex items-center group">
                <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center mr-5 group-hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="text-[12px] font-black text-slate-900 lowercase tracking-widest">almarkyhelpcentre@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 cursor-default select-none">
            © <span onDoubleClick={handleSecretAccess} className="cursor-default select-none">2026</span> ALMARKY PAKISTAN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-10 font-black text-[10px] tracking-[0.3em] text-slate-900">
             <div className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 animate-pulse"></span>COD LIVE</div>
             <div className="flex items-center"><span className="w-2.5 h-2.5 bg-orange-600 rounded-full mr-3"></span>PAKISTAN OWNED</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
