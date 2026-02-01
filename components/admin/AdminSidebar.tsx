
import React from 'react';

type AdminTab = 'Overview' | 'Orders' | 'Products' | 'Analytics' | 'Settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: AdminTab; icon: string }[] = [
    { id: 'Overview', icon: '📊' },
    { id: 'Orders', icon: '📦' },
    { id: 'Products', icon: '🛍️' },
    { id: 'Analytics', icon: '📈' },
    { id: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-6 space-y-8 sticky top-0 md:h-screen z-40">
      <div className="flex items-center px-2">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mr-3 font-black text-xl shadow-lg shadow-slate-900/20">A</div>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tighter">ALMARKY</h1>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Admin Control</p>
        </div>
      </div>

      <nav className="space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-black transition-all group ${
              activeTab === tab.id 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105' 
              : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className={`mr-3 transition-transform group-hover:scale-125 ${activeTab === tab.id ? 'scale-110' : ''}`}>
              {tab.icon}
            </span>
            {tab.id}
          </button>
        ))}
      </nav>

      <div className="pt-20">
        <div className="bg-emerald-50 p-5 rounded-[2rem] border border-emerald-100 text-center">
          <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2">Operational Health</p>
          <div className="flex items-center justify-center text-[10px] font-bold text-emerald-600">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            SYSTEMS OPTIMAL
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-100/50">
            <p className="text-[9px] text-emerald-700/60 font-medium">Build v2.4.0-PRO</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
