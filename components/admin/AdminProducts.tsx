
import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import AdminProductForm from './AdminProductForm';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddSubmit = (product: Product) => {
    addProduct(product);
    setShowAddModal(false);
  };

  const handleEditSubmit = (product: Product) => {
    updateProduct(product.id, product);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Inventory Control</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Manage product availability, features, and story</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
             <input 
              type="text" 
              placeholder="Search local inventory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-10 py-3.5 text-xs focus:border-blue-500 outline-none shadow-sm transition-all font-bold" 
            />
             <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition shadow-xl shadow-slate-900/10 active:scale-95 flex items-center space-x-2"
          >
            <span>+</span>
            <span>ADD PRODUCT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col relative group overflow-hidden">
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 text-[7px] font-black uppercase px-2 py-1 rounded shadow-sm z-10 ${p.stock ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {p.stock ? 'Active' : 'Out of Stock'}
            </div>

            <div className="aspect-square rounded-[2rem] overflow-hidden mb-5 border-2 border-slate-50 relative">
              <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              {!p.stock && <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[1px]"><span className="text-white font-black text-[10px] uppercase tracking-widest">Unavailable</span></div>}
            </div>
            
            <div className="flex-grow space-y-2 mb-6">
              <p className="text-[8px] text-blue-600 font-black uppercase tracking-widest">{p.category}</p>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight leading-tight">{p.name}</h4>
              <div className="flex justify-between items-end pt-2">
                <p className="text-lg font-black text-slate-900 tracking-tighter leading-none">Rs. {p.price.toLocaleString()}</p>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Delivery: Rs. {p.deliveryCharges}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setEditingProduct(p)}
                className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-slate-400 group/btn"
              >
                <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                <span className="text-[6px] font-black uppercase">Edit</span>
              </button>
              <button 
                onClick={() => toggleStock(p.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all group/btn ${p.stock ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white'}`}
              >
                <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path fillRule="evenodd" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" clipRule="evenodd" /></svg>
                <span className="text-[6px] font-black uppercase">{p.stock ? 'Pause' : 'Play'}</span>
              </button>
              <button 
                onClick={() => { if(window.confirm(`Permanently delete ${p.name}?`)) deleteProduct(p.id); }}
                className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl hover:bg-rose-500 hover:text-white transition-all text-slate-400 group/btn"
              >
                <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                <span className="text-[6px] font-black uppercase">Trash</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase">No Items Found</h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Try a different search term or add a new item.</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <AdminProductForm 
          title="Create New Listing"
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {editingProduct && (
        <AdminProductForm 
          title="Modify Listing"
          initialData={editingProduct}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminProducts;
