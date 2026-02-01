
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminOverview from '../components/admin/AdminOverview';
import AdminOrders from '../components/admin/AdminOrders';
import AdminProducts from '../components/admin/AdminProducts';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminSettings from '../components/admin/AdminSettings';

type AdminTab = 'Overview' | 'Orders' | 'Products' | 'Analytics' | 'Settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // The Master Password
  const MASTER_PASSWORD = "Subhan6565@almarky";

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem('almarky_internal_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Security delay to prevent automated attacks
    setTimeout(() => {
      if (password === MASTER_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('almarky_internal_auth', 'true');
      } else {
        setError(true);
        setPassword('');
      }
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('almarky_internal_auth');
    setIsAuthenticated(false);
  };

  // 🛡️ GHOST GATEKEEPER UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-blue-600">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900/50 rounded-[2rem] border border-white/5 shadow-2xl mb-8">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 className="text-sm font-black text-slate-500 uppercase tracking-[0.5em] mb-2">Security Verification</h1>
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Internal Access Only • V2026-STABLE</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 animate-in slide-in-from-bottom-4 duration-1000">
            <div className="relative group">
              <input 
                autoFocus
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="ACCESS KEY"
                className={`w-full bg-white/5 border-2 rounded-3xl px-8 py-6 outline-none transition-all font-black text-white tracking-[0.8em] text-center text-xs placeholder:text-slate-800 focus:bg-white/10 ${error ? 'border-rose-900/50' : 'border-white/5 focus:border-blue-900/50'}`}
              />
              {error && (
                <p className="text-rose-600 text-[8px] font-black uppercase tracking-widest mt-4 text-center animate-pulse">
                  Invalid credentials. Request logged.
                </p>
              )}
            </div>

            <button 
              disabled={loading || !password}
              className="w-full bg-white/5 text-slate-500 font-black py-6 rounded-3xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 disabled:opacity-5 uppercase tracking-[0.4em] text-[10px] border border-white/5"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-700 border-t-white rounded-full animate-spin"></div>
              ) : "Authenticate Session"}
            </button>
          </form>

          <p className="text-center mt-12 text-[7px] font-black text-slate-800 uppercase tracking-widest leading-loose">
            Almarky Integrated Systems <br/> 
            Unauthorized access will result in IP blacklist.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <AdminOverview />;
      case 'Orders': return <AdminOrders />;
      case 'Products': return <AdminProducts />;
      case 'Analytics': return <AdminAnalytics />;
      case 'Settings': return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-['Inter']">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow p-4 md:p-12 overflow-y-auto max-h-screen custom-scrollbar">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{activeTab}</h2>
            <div className="flex items-center mt-3">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Almarky Central Control Module
              </p>
              <button 
                onClick={handleLogout}
                className="ml-6 text-rose-500 hover:text-rose-700 text-[8px] font-black uppercase tracking-widest border border-rose-100 px-2 py-1 rounded hover:bg-rose-50 transition-all"
              >
                Terminate Terminal
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
               <input 
                type="text" 
                placeholder="Deep Search..." 
                className="bg-white border-2 border-slate-100 rounded-2xl px-12 py-3.5 text-xs font-bold focus:border-blue-600 outline-none w-full shadow-sm" 
              />
               <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
