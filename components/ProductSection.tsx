
import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import CategoryScroll from './CategoryScroll';

const ProductSection: React.FC = () => {
  const { products } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, products]);

  return (
    <section className="w-full" id="shop">
      <div className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full border border-slate-200 rounded-lg px-10 py-2.5 focus:border-blue-500 outline-none text-sm transition-all bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <CategoryScroll 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-1">No items found</h2>
            <p className="text-slate-400 text-xs mb-4">Try checking another category or keyword.</p>
            <button 
              onClick={() => {setSearch(''); setSelectedCategory('All');}}
              className="bg-slate-900 text-white text-xs font-bold px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Reset Filters
            </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
