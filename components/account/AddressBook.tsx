
import React, { useState } from 'react';

interface Address {
  id: string;
  tag: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const AddressBook: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('almarky_addresses');
    return saved ? JSON.parse(saved) : [
      { id: '1', tag: 'Home', fullName: 'Ali Raza', phone: '03271452389', address: 'Plot 45, Sector 5, North Karachi', city: 'Karachi', isDefault: true }
    ];
  });

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Saved Addresses</h3>
        <button 
          onClick={() => setShowForm(true)}
          className="text-[9px] font-black text-blue-600 uppercase border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
        >
          + Add New
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative group">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{addr.tag}</span>
              {addr.isDefault && <span className="text-emerald-500 text-[8px] font-black uppercase tracking-widest italic">Default</span>}
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{addr.fullName}</h4>
            <p className="text-xs text-slate-500 font-medium mb-1">{addr.address}</p>
            <p className="text-xs text-slate-900 font-black uppercase tracking-tight">{addr.city} • {addr.phone}</p>
            
            <div className="absolute top-5 right-5 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-slate-300 hover:text-blue-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
              <button className="text-slate-300 hover:text-rose-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
