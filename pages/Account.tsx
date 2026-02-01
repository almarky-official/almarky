
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ProfileOverview from '../components/account/ProfileOverview';
import AddressBook from '../components/account/AddressBook';
import MyOrders from './MyOrders';

type Tab = 'overview' | 'orders' | 'addresses' | 'settings';

const Account: React.FC = () => {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Syncing Almarky Account...</p>
      </div>
    );
  }

  if (!user?.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 md:py-24 text-center">
        <header className="mb-12">
          <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Customer Portal</div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">Join <span className="text-blue-600">Almarky</span></h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">Unlock exclusive benefits, track your premium orders, and manage your lifestyle wishlist seamlessly.</p>
        </header>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-6">
          <button 
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center space-x-4 bg-slate-900 text-white py-4.5 rounded-2xl hover:bg-blue-600 transition-all group active:scale-95 shadow-xl shadow-slate-900/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Sign In with Google</span>
          </button>
        </div>

        <p className="mt-12 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] max-w-xs mx-auto">
          Secured by Google Auth. We value your data as much as your trust.
        </p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'settings', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 pb-24 md:pb-16">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <aside className="w-full lg:w-72 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl text-center relative overflow-hidden group">
              <div className="relative z-10">
                <div className="relative inline-block mb-6">
                  <img src={user.photo} className="w-24 h-24 rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500" alt="" />
                  <div className="absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{user.name}</h2>
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-2">{user.email}</p>
                <button 
                  onClick={logout}
                  className="mt-8 w-full bg-slate-50 text-slate-400 font-black py-3.5 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all text-[9px] uppercase tracking-widest border border-slate-100"
                >
                  Sign Out
                </button>
              </div>
           </div>

           <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm flex lg:flex-col overflow-x-auto hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="mr-3 text-lg opacity-80">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
           </div>
        </aside>

        <main className="flex-grow bg-white p-4 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm min-h-[500px] w-full">
           {activeTab === 'overview' && <ProfileOverview />}
           {activeTab === 'orders' && <MyOrders />}
           {activeTab === 'addresses' && <AddressBook />}
           {activeTab === 'settings' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight text-center">Account Security</h3>
               <div className="max-w-md mx-auto p-10 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <p className="text-xs font-bold text-slate-600">Your account is secured via Google Authentication. No password required.</p>
               </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default Account;
