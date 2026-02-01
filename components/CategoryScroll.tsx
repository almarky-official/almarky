
import React from 'react';

interface CategoryScrollProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border shadow-sm ${
            selectedCategory === cat
              ? 'bg-slate-900 border-slate-900 text-white scale-105 z-10'
              : 'bg-white border-slate-100 text-slate-500 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryScroll;
