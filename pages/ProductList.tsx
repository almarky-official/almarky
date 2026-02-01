
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import CategoryScroll from '../components/CategoryScroll';

const ProductList: React.FC = () => {
  const { products } = useProducts();
  const query = new URLSearchParams(useLocation().search);
  const initialCategory = query.get('category');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Verified Catalog</div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Explore <span className="text-blue-600">Almarky</span>
            </h1>
          </div>
          <div className="w-full md:w-96">
             <div className="relative group">
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="w-full border-2 border-slate-50 rounded-2xl px-12 py-3.5 focus:border-blue-500 focus:ring-0 outline-none shadow-sm transition-all text-sm font-medium bg-slate-50/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-100 pt-8">
           <CategoryScroll 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
        </div>
      </header>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Found {filteredProducts.length} Results
        </h2>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 shadow-sm">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Items Matching</h2>
          <p className="text-slate-400 max-w-xs mx-auto text-xs mb-8 uppercase font-bold tracking-widest">Adjust filters to find what you need.</p>
          <button 
            onClick={() => {setSearch(''); setSelectedCategory('All');}}
            className="bg-slate-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-slate-900/10 uppercase tracking-widest text-[10px]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
