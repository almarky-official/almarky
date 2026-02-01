
import React, { useState } from 'react';
import { getSecureToken, getSecureRepo, getCloudinaryDefaults } from '../../utils/security';

const AdminSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [notif, setNotif] = useState(false);

  // GitHub Sync States
  const [ghToken, setGhToken] = useState(localStorage.getItem('gh_write_token') || "");
  const [ghRepo, setGhRepo] = useState(localStorage.getItem('gh_repo_path') || getSecureRepo());

  // Cloudinary States
  const cldDefaults = getCloudinaryDefaults();
  const [cldName, setCldName] = useState(localStorage.getItem('cld_cloud_name') || cldDefaults.cloudName);
  const [cldPreset, setCldPreset] = useState(localStorage.getItem('cld_upload_preset') || cldDefaults.uploadPreset);

  const handleSave = () => {
    setIsSaving(true);
    
    // Save Settings Locally
    if (ghToken) localStorage.setItem('gh_write_token', ghToken);
    localStorage.setItem('gh_repo_path', ghRepo);
    localStorage.setItem('cld_cloud_name', cldName);
    localStorage.setItem('cld_upload_preset', cldPreset);

    setTimeout(() => {
      setIsSaving(false);
      setNotif(true);
      setTimeout(() => setNotif(false), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 relative pb-20">
      {notif && (
        <div className="fixed top-10 right-10 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl animate-in fade-in slide-in-from-top-10 z-[100]">
          ✓ Global Config Synchronized
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
             <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
             <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">GitHub Data Engine</h3>
          </div>
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl">
               <div>
                 <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">GitHub Auth Token</label>
                 <input 
                   type="password" 
                   value={ghToken} 
                   onChange={(e) => setGhToken(e.target.value)}
                   placeholder="VAULT_LOCKED" 
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs outline-none focus:border-blue-500 text-blue-100 font-mono tracking-widest" 
                 />
               </div>
               <div>
                 <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Target Repository</label>
                 <input 
                   type="text" 
                   value={ghRepo} 
                   onChange={(e) => setGhRepo(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs outline-none focus:border-blue-500 font-mono" 
                 />
               </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
             <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
             <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Cloudinary Media Hub</h3>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
               <div>
                 <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Cloud Name</label>
                 <input 
                   type="text" 
                   value={cldName} 
                   onChange={(e) => setCldName(e.target.value)}
                   className="w-full border-2 border-slate-50 rounded-2xl px-5 py-4 text-xs outline-none focus:border-orange-500 font-bold text-slate-900" 
                 />
               </div>
               <div>
                 <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Upload Preset (Unsigned)</label>
                 <input 
                   type="text" 
                   value={cldPreset} 
                   onChange={(e) => setCldPreset(e.target.value)}
                   className="w-full border-2 border-slate-50 rounded-2xl px-5 py-4 text-xs outline-none focus:border-orange-500 font-bold text-slate-900" 
                 />
               </div>
               <div className="bg-orange-50 p-4 rounded-2xl">
                 <p className="text-[9px] text-orange-700 font-bold leading-relaxed uppercase">
                   Tip: Ensure your Cloudinary preset is set to 'Unsigned' for client-side uploads.
                 </p>
               </div>
          </div>
        </section>
      </div>

      <div className="pt-10 border-t border-slate-100 flex justify-center">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto bg-slate-900 text-white font-black px-16 py-6 rounded-[2rem] hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-[0.4em] text-sm flex items-center justify-center space-x-4 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Apply Operational Config"}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
