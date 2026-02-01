
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { getSecureToken, getSecureRepo, getCloudinaryDefaults } from '../../utils/security';

interface AdminProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  initialData?: Partial<Product>;
  title: string;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ onSubmit, onCancel, initialData, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    discountPercentage: 0,
    category: 'Electronics',
    description: '',
    images: [],
    stock: true,
    currency: 'PKR',
    features: [],
    colors: [],
    deliveryCharges: 0,
    ...initialData
  });

  const GH_TOKEN = localStorage.getItem('gh_write_token') || getSecureToken();
  const GH_REPO = localStorage.getItem('gh_repo_path') || getSecureRepo();
  
  const cldDefaults = getCloudinaryDefaults();
  const CLD_NAME = localStorage.getItem('cld_cloud_name') || cldDefaults.cloudName;
  const CLD_PRESET = localStorage.getItem('cld_upload_preset') || cldDefaults.uploadPreset;

  useEffect(() => {
    const orig = Number(formData.originalPrice || 0);
    const disc = Number(formData.discountPercentage || 0);
    if (disc > 0) {
      const final = Math.round(orig * (1 - disc / 100));
      if (final !== formData.price) setFormData(prev => ({ ...prev, price: final }));
    } else if (disc === 0 && orig > 0) {
      if (orig !== formData.price) setFormData(prev => ({ ...prev, price: orig }));
    }
  }, [formData.originalPrice, formData.discountPercentage]);

  const uploadToCloudinary = async (file: File) => {
    if (!CLD_NAME || !CLD_PRESET) throw new Error("Cloudinary configuration missing in Settings.");
    
    const url = `https://api.cloudinary.com/v1_1/${CLD_NAME}/image/upload`;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLD_PRESET);

    const response = await fetch(url, {
      method: 'POST',
      body: data
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Cloudinary Upload Failed");
    }

    const resData = await response.json();
    return resData.secure_url;
  };

  /**
   * Safe UTF-8 Base64 Encoding for GitHub API
   */
  const toBase64 = (str: string) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => 
      String.fromCharCode(parseInt(p1, 16))
    ));
  };

  /**
   * Safe UTF-8 Base64 Decoding for GitHub API
   */
  const fromBase64 = (str: string) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
  };

  const syncProductsJson = async (newProduct: Product) => {
    const url = `https://api.github.com/repos/${GH_REPO}/contents/data/products.json`;
    
    const getRes = await fetch(url, { 
      headers: { 
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache'
      } 
    });
    
    let currentData: Product[] = [];
    let sha = null;

    if (getRes.ok) {
      const fileInfo = await getRes.json();
      sha = fileInfo.sha;
      const content = fromBase64(fileInfo.content);
      currentData = JSON.parse(content);
    } else if (getRes.status !== 404) {
      throw new Error(`Failed to contact GitHub: ${getRes.statusText}`);
    }

    // Merge logic: Update if exists, otherwise prepend
    const existsIndex = currentData.findIndex(p => p.id === newProduct.id);
    let updatedData: Product[];
    if (existsIndex !== -1) {
      updatedData = [...currentData];
      updatedData[existsIndex] = newProduct;
    } else {
      updatedData = [newProduct, ...currentData];
    }

    const pushRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[Almarky Admin] CloudSync: ${newProduct.name}`,
        content: toBase64(JSON.stringify(updatedData, null, 2)),
        sha: sha
      })
    });
    
    if (!pushRes.ok) {
      const err = await pushRes.json();
      throw new Error(`GitHub Deployment Failed: ${err.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const previews: string[] = [];
    for (let i = 0; i < files.length; i++) {
       previews.push(URL.createObjectURL(files[i]));
    }
    // We add local blob URLs for preview only; they are replaced by Cloudinary URLs on submit
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...previews] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setSyncStatus('Almarky Media Engine: Initializing Pipeline...');

    try {
      const files = fileInputRef.current?.files;
      // Keep existing cloud images, remove local previews
      const finalImageUrls: string[] = [...(formData.images || [])].filter(url => url.startsWith('http'));

      if (files && files.length > 0) {
        setSyncStatus(`Deploying ${files.length} Assets to Cloudinary...`);
        for (let i = 0; i < files.length; i++) {
          const cloudUrl = await uploadToCloudinary(files[i]);
          finalImageUrls.push(cloudUrl);
        }
      }

      const finalProduct: Product = {
        ...formData as Product,
        id: initialData?.id || `p${Date.now()}`,
        images: finalImageUrls,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
      };

      setSyncStatus('Synchronizing Global Catalog (GitHub)...');
      await syncProductsJson(finalProduct);

      setSyncStatus('Deployment Complete! Refreshing Cache...');
      setTimeout(() => {
        onSubmit(finalProduct);
        setIsSyncing(false);
      }, 1500);

    } catch (err: any) {
      console.error("Pipeline Error:", err);
      alert(`Pipeline Failed: ${err.message}\n\nVerify your GitHub Token and Cloudinary Preset.`);
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl" onClick={onCancel}></div>
      
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-500 flex flex-col max-h-[92vh]">
        
        {isSyncing && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl z-[110] flex flex-col items-center justify-center text-white text-center px-10">
            <div className="relative mb-10">
               <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-emerald-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
               </div>
            </div>
            <p className="text-2xl font-black uppercase tracking-widest">{syncStatus}</p>
            <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-[0.4em]">Encrypted Data Stream Active</p>
          </div>
        )}

        <header className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{title}</h3>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Target Cloud: {CLD_NAME}</p>
          </div>
          <button onClick={onCancel} className="bg-white p-4 rounded-2xl text-slate-300 hover:text-rose-500 transition-all border border-slate-100 shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-10 space-y-10 overflow-y-auto custom-scrollbar flex-grow bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Listing Details</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Product Name" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 focus:border-emerald-500 focus:bg-white outline-none font-bold text-slate-900 transition-all" />
                <textarea required rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Marketing Story..." className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-6 py-4 focus:border-emerald-500 focus:bg-white outline-none font-medium text-sm text-slate-700 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Sale Price</label>
                  <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full border-2 border-slate-100 rounded-xl px-5 py-3 font-black text-slate-900" />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Disc %</label>
                  <input type="number" value={formData.discountPercentage} onChange={(e) => setFormData({...formData, discountPercentage: Number(e.target.value)})} className="w-full border-2 border-slate-100 rounded-xl px-5 py-3 font-black text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Cloud Assets</label>
              <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 p-12 rounded-[2.5rem] text-center cursor-pointer hover:bg-emerald-100/50 transition-all group" onClick={() => fileInputRef.current?.click()}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                   <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                </div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Deploy New Assets</p>
                <p className="text-[8px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Stored on Almarky-Images CDN</p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {formData.images?.map((img, i) => (
                  <div key={i} className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 relative group/img">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    <button type="button" onClick={() => setFormData(p => ({ ...p, images: p.images?.filter((_, idx) => idx !== i) }))} className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100">
            <button type="submit" className="w-full bg-slate-900 text-white font-black py-8 rounded-[2rem] hover:bg-emerald-600 transition-all uppercase tracking-[0.4em] text-sm shadow-2xl active:scale-[0.98] flex items-center justify-center space-x-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              <span>Commit Global Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
