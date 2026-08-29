import React from 'react';
import { CategoryInfo, Channel } from '../types';

interface CategoriesNavProps {
  categories: CategoryInfo[];
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  channels: Channel[];
}

export const CategoriesNav: React.FC<CategoriesNavProps> = ({
  categories,
  currentCategory,
  onSelectCategory,
  channels,
}) => {
  return (
    <nav className="bg-[#0f141e]/95 backdrop-blur-md overflow-x-auto py-1.5 px-4 scrollbar-thin">
      <div className="max-w-[1600px] mx-auto flex items-center gap-2.5">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.name;
          const count =
            cat.name === 'Todos'
              ? channels.length
              : channels.filter((c) => c.category === cat.name).length;

          return (
            <button
              key={cat.name}
              id={`cat-btn-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-2xl text-sm sm:text-base font-bold transition-all whitespace-nowrap tv-focusable select-none cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#007bff] to-[#00d2ff] text-white border-2 border-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.6)]'
                  : 'bg-[#1c2438] text-gray-200 border-2 border-[#2d3a5a] hover:bg-[#283759] hover:text-white hover:border-[#007bff]'
              }`}
            >
              {cat.icon && (
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="h-14 sm:h-16 w-auto max-w-[85px] sm:max-w-[100px] object-contain rounded-md shrink-0 transition-transform duration-200 hover:scale-105"
                  loading="lazy"
                />
              )}
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-black/40 text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
