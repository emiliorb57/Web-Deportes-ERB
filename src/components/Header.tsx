import React from 'react';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onLogoClick,
}) => {
  return (
    <header className="bg-gradient-to-b from-[#152244] to-[#1F305E] border-b border-[#007bff]/40 px-4 py-2.5">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div
          id="brand-logo-btn"
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="DEPORTES ERB - Inicio"
        >
          <img
            src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png"
            alt="Deportes ERB Logo"
            className="h-10 w-auto rounded-md border-2 border-[#00e5ff] bg-white transition-transform group-hover:scale-105"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              DEPORTES ERB
            </h1>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="flex-1 max-w-[520px] min-w-[240px] relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300 pointer-events-none" />
            <input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar canal, categoría o servidor (ej: LaLiga, Dazn, Espn)..."
              autoComplete="off"
              className="w-full pl-10 pr-10 py-2 rounded-full border-2 border-[#2a3b5c] bg-[#0d1626] text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[#00e5ff]/50 focus:bg-[#111d33] transition-all tv-focusable"
            />
            {searchQuery && (
              <button
                id="clearSearchBtn"
                onClick={onClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
