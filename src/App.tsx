import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { CategoriesNav } from './components/CategoriesNav';
import { PlayerPage } from './components/PlayerPage';
import { ChannelCard } from './components/ChannelCard';
import { ChannelManagerModal } from './components/ChannelManagerModal';
import { Footer } from './components/Footer';
import { INITIAL_CHANNELS_DATA, INITIAL_CATEGORIES } from './data/channels';
import { Channel, CategoryInfo } from './types';
import { RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'deportes_erb_channels_v1';

export default function App() {
  // Load saved channels or initial database
  const [channels, setChannels] = useState<Channel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_CHANNELS_DATA;
  });

  const [categories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [currentCategory, setCurrentCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number>(0);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  // Sync with URL Query Parameters on initial load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const channelId = params.get('channel');
      const sourceParam = params.get('source');
      if (channelId) {
        const found = channels.find((c) => c.id === channelId);
        if (found) {
          setActiveChannel(found);
          if (sourceParam) {
            const idx = parseInt(sourceParam, 10);
            if (!isNaN(idx) && idx >= 0 && idx < found.sources.length) {
              setActiveSourceIndex(idx);
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse URL params', e);
    }
  }, [channels]);

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const channelId = params.get('channel');
        const sourceParam = params.get('source');
        if (channelId) {
          const found = channels.find((c) => c.id === channelId);
          if (found) {
            setActiveChannel(found);
            const idx = sourceParam ? parseInt(sourceParam, 10) : 0;
            setActiveSourceIndex(!isNaN(idx) && idx >= 0 && idx < found.sources.length ? idx : 0);
            return;
          }
        }
        setActiveChannel(null);
      } catch (e) {
        console.error('Failed popstate handler', e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [channels]);

  // Save changes to localStorage
  const handleSaveChannels = useCallback((newChannels: Channel[]) => {
    setChannels(newChannels);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newChannels));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    // Update active channel if modified
    if (activeChannel) {
      const updatedActive = newChannels.find((c) => c.id === activeChannel.id);
      if (updatedActive) {
        setActiveChannel(updatedActive);
      }
    }
  }, [activeChannel]);

  const handleResetToDefaults = useCallback(() => {
    setChannels(INITIAL_CHANNELS_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
    }
  }, []);

  const handlePlayChannel = useCallback((channel: Channel, sourceIdx: number = 0) => {
    setActiveChannel(channel);
    setActiveSourceIndex(sourceIdx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newUrl = `${window.location.pathname}?channel=${encodeURIComponent(channel.id)}${
        sourceIdx > 0 ? `&source=${sourceIdx}` : ''
      }`;
      window.history.pushState({ channelId: channel.id, sourceIdx }, '', newUrl);
    } catch {
      // Ignore if pushState blocked
    }
  }, []);

  const handleSelectSource = useCallback((idx: number) => {
    setActiveSourceIndex(idx);
    if (activeChannel) {
      try {
        const newUrl = `${window.location.pathname}?channel=${encodeURIComponent(activeChannel.id)}${
          idx > 0 ? `&source=${idx}` : ''
        }`;
        window.history.replaceState({ channelId: activeChannel.id, sourceIdx: idx }, '', newUrl);
      } catch {
        // Ignore
      }
    }
  }, [activeChannel]);

  const handleClosePlayer = useCallback(() => {
    setActiveChannel(null);
    setActiveSourceIndex(0);
    try {
      window.history.pushState({}, '', window.location.pathname);
    } catch {
      // Ignore
    }
  }, []);

  // Filter channels based on Category and Search Query
  const filteredChannels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return channels.filter((ch) => {
      const matchesCategory =
        currentCategory === 'Todos' || ch.category === currentCategory;
      const matchesSearch =
        !query ||
        ch.title.toLowerCase().includes(query) ||
        ch.category.toLowerCase().includes(query) ||
        ch.sources.some(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.url.toLowerCase().includes(query)
        );
      return matchesCategory && matchesSearch;
    });
  }, [channels, currentCategory, searchQuery]);

  // Smart TV & Keyboard Shortcuts Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
      const isInputFocused = document.activeElement === searchInput;

      // 'F' key for Fullscreen if player is active and not typing in search
      if ((e.key === 'f' || e.key === 'F') && activeChannel && !isInputFocused) {
        e.preventDefault();
        const fullscreenBtn = document.getElementById('player-fullscreen-btn');
        if (fullscreenBtn) fullscreenBtn.click();
        return;
      }

      // 'Escape' closes player or modal
      if (e.key === 'Escape') {
        if (isManagerOpen) {
          setIsManagerOpen(false);
        } else if (activeChannel) {
          handleClosePlayer();
        }
        return;
      }

      // '/' or 's' / 'S' key focuses search input
      if ((e.key === '/' || e.key === 's' || e.key === 'S') && !isInputFocused && !activeChannel && !isManagerOpen) {
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
        return;
      }

      // Arrow navigation on focusables (TV D-Pad mode)
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (isInputFocused && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          return; // Let cursor move normally inside input
        }

        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex="0"], input'
          )
        ).filter((el) => el.offsetParent !== null);

        const currentActive = document.activeElement as HTMLElement;
        const currentIndex = focusables.indexOf(currentActive);

        if (currentIndex === -1) {
          if (focusables.length > 0) focusables[0].focus();
          return;
        }

        e.preventDefault();
        const currentRect = currentActive.getBoundingClientRect();
        let bestMatch: HTMLElement | null = null;
        let bestDistance = Infinity;

        focusables.forEach((el, idx) => {
          if (idx === currentIndex) return;
          const r = el.getBoundingClientRect();

          let isCandidate = false;
          let primaryDist = 0;
          let secondaryDist = 0;

          if (e.key === 'ArrowRight' && r.left >= currentRect.right - 5) {
            isCandidate = true;
            primaryDist = r.left - currentRect.right;
            secondaryDist = Math.abs(
              r.top + r.height / 2 - (currentRect.top + currentRect.height / 2)
            );
          } else if (e.key === 'ArrowLeft' && r.right <= currentRect.left + 5) {
            isCandidate = true;
            primaryDist = currentRect.left - r.right;
            secondaryDist = Math.abs(
              r.top + r.height / 2 - (currentRect.top + currentRect.height / 2)
            );
          } else if (e.key === 'ArrowDown' && r.top >= currentRect.bottom - 5) {
            isCandidate = true;
            primaryDist = r.top - currentRect.bottom;
            secondaryDist = Math.abs(
              r.left + r.width / 2 - (currentRect.left + currentRect.width / 2)
            );
          } else if (e.key === 'ArrowUp' && r.bottom <= currentRect.top + 5) {
            isCandidate = true;
            primaryDist = currentRect.top - r.bottom;
            secondaryDist = Math.abs(
              r.left + r.width / 2 - (currentRect.left + currentRect.width / 2)
            );
          }

          if (isCandidate) {
            const totalDist = primaryDist + secondaryDist * 1.8;
            if (totalDist < bestDistance) {
              bestDistance = totalDist;
              bestMatch = el;
            }
          }
        });

        if (bestMatch) {
          bestMatch.focus();
          bestMatch.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChannel, isManagerOpen, handleClosePlayer]);

  // If a channel is actively playing, render the dedicated Player Page
  if (activeChannel) {
    return (
      <PlayerPage
        channel={activeChannel}
        sourceIndex={activeSourceIndex}
        onSelectSource={handleSelectSource}
        onClose={handleClosePlayer}
        onSelectChannel={(ch) => handlePlayChannel(ch, 0)}
        allChannels={channels}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top Navigation (Header + Categories) */}
      <div className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md shadow-2xl border-b border-[#007bff]/20 flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          onLogoClick={() => {
            setCurrentCategory('Todos');
            setSearchQuery('');
          }}
        />

        <CategoriesNav
          categories={categories}
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          channels={channels}
        />
      </div>

      {/* Main Grid View */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-2.5 border-b border-white/10">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
            <span>
              {currentCategory === 'Todos' ? 'Todos los Canales' : currentCategory}
            </span>
            <span
              id="channelCounter"
              className="text-xs sm:text-sm font-semibold bg-[#007bff]/25 border border-[#007bff] text-[#a8d5ff] px-3 py-1 rounded-full shadow-xs"
            >
              {filteredChannels.length}{' '}
              {filteredChannels.length === 1 ? 'canal' : 'canales'}
            </span>
          </h2>

          {searchQuery && (
            <div className="text-xs text-gray-300">
              Resultados para: <span className="text-[#00e5ff] font-bold">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Channel Cards Grid */}
        {filteredChannels.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4 justify-center justify-items-center">
            {filteredChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                isPlaying={false}
                onPlay={(chan) => handlePlayChannel(chan, 0)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[#141b2a]/60 border border-[#222d42] rounded-2xl max-w-lg mx-auto my-8">
            <h3 className="text-xl font-bold text-white mb-2">
              No se encontraron canales
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Prueba con otro término de búsqueda o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentCategory('Todos');
              }}
              className="inline-flex items-center gap-2 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer Filtros</span>
            </button>
          </div>
        )}
      </main>

      {/* Channel Manager & Editor Modal */}
      <ChannelManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        channels={channels}
        categories={categories}
        onSaveChannels={handleSaveChannels}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
