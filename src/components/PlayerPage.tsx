import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  ArrowLeft,
  RotateCw,
  ExternalLink,
  Maximize,
  X,
  Zap,
  Server,
  Radio,
  Tv,
} from 'lucide-react';
import { Channel } from '../types';

export interface PlayerPageProps {
  channel: Channel;
  sourceIndex: number;
  onSelectSource: (index: number) => void;
  onClose: () => void;
  onSelectChannel?: (channel: Channel) => void;
  allChannels?: Channel[];
}

export const PlayerPage: React.FC<PlayerPageProps> = ({
  channel,
  sourceIndex,
  onSelectSource,
  onClose,
  onSelectChannel,
  allChannels = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const activeSource = channel.sources[sourceIndex] || channel.sources[0];
  const isM3U8 =
    activeSource?.type === 'm3u8' ||
    (activeSource?.url && activeSource.url.includes('.m3u8'));

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Reload Stream
  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
    if (iframeRef.current && !isM3U8) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentSrc;
      }, 50);
    }
  };

  // Open External
  const handleExternal = () => {
    if (activeSource?.url) {
      window.open(activeSource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Fullscreen state listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!(
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      );
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // HLS playback
  useEffect(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isM3U8 && videoRef.current && activeSource?.url) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;
        hls.loadSource(activeSource.url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = activeSource.url;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeSource?.url, isM3U8, reloadKey]);

  const handleExitFullscreenBack = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleFullscreenClose = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => onClose()).catch(() => onClose());
        return;
      }
    }
    onClose();
  };

  // Other channels in same category or overall
  const otherChannels = allChannels.filter((c) => c.id !== channel.id);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col animate-in fade-in duration-300">
      {/* Dedicated Page Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d1626]/95 backdrop-blur-md border-b border-[#007bff]/30 shadow-xl px-3 sm:px-6 py-2.5">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back to Channels & Channel Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              id="player-back-to-channels-btn"
              onClick={onClose}
              className="flex items-center gap-2 bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all tv-focusable cursor-pointer shadow-md group"
              title="Volver a la lista de canales (Esc)"
            >
              <ArrowLeft className="w-4 h-4 text-[#00e5ff] group-hover:text-white transition-transform group-hover:-translate-x-0.5" />
              <span>Volver a Canales</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <img
                src={channel.logo}
                alt={channel.title}
                className="h-9 w-auto max-w-[42px] object-contain bg-white p-0.5 rounded-lg border border-[#00e5ff]/60 shrink-0 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png';
                }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                    {channel.title}
                  </h1>
                  <span className="flex items-center gap-1 bg-[#ff2a2a] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse shadow-xs">
                    <Radio className="w-3 h-3" /> EN VIVO
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-[#00e5ff] font-semibold">{channel.category}</span>
                  <span>•</span>
                  <span>{activeSource?.name || 'Servidor 1'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions (Reload, External, Fullscreen, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="player-reload-btn"
              onClick={handleReload}
              className="flex items-center gap-1.5 bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all tv-focusable cursor-pointer shadow-sm"
              title="Recargar stream"
              aria-label="Recargar stream"
            >
              <RotateCw className="w-4 h-4 text-[#00e5ff]" />
              <span className="hidden md:inline">Recargar</span>
            </button>

            <button
              id="player-external-btn"
              onClick={handleExternal}
              className="flex items-center gap-1.5 bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all tv-focusable cursor-pointer shadow-sm"
              title="Abrir en ventana externa"
              aria-label="Abrir en ventana externa"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Ventana externa</span>
            </button>

            <button
              id="player-fullscreen-btn"
              onClick={handleToggleFullscreen}
              className="flex items-center gap-1.5 bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all tv-focusable cursor-pointer shadow-sm"
              title="Pantalla completa (o tecla F)"
              aria-label="Pantalla completa"
            >
              <Maximize className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">Pantalla completa</span>
            </button>

            <button
              id="player-close-btn"
              onClick={onClose}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white border border-red-500 text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all tv-focusable cursor-pointer shadow-sm"
              title="Cerrar reproducción (Esc)"
            >
              <X className="w-4 h-4" />
              <span>Cerrar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Subheader: Server Source Selector Bar */}
      <div className="bg-[#101726] border-b border-[#1f2d47] px-3 sm:px-6 py-2 shadow-inner">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 mr-1">
              <Server className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>Servidores ({channel.sources.length}):</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {channel.sources.map((src, idx) => {
                const isSelected = idx === sourceIndex;
                const isSrcM3u8 = src.type === 'm3u8' || (src.url && src.url.includes('.m3u8'));
                return (
                  <button
                    key={`${src.name}-${idx}`}
                    id={`server-btn-${idx}`}
                    onClick={() => onSelectSource(idx)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg transition-all tv-focusable cursor-pointer ${
                      isSelected
                        ? 'bg-[#007bff] text-white border border-[#00e5ff] shadow-[0_0_10px_rgba(0,123,255,0.8)] scale-105'
                        : 'bg-[#1a2336] text-gray-300 border border-[#2a3750] hover:bg-[#25324d] hover:text-white hover:border-[#00e5ff]'
                    }`}
                  >
                    {isSrcM3u8 && <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />}
                    <span>{src.name || `Servidor ${idx + 1}`}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-gray-400 hidden lg:flex items-center gap-3">
            <span>Usa <strong>F</strong> para pantalla completa</span>
            <span>•</span>
            <span>Usa <strong>Esc</strong> para volver</span>
          </div>
        </div>
      </div>

      {/* Main Playback Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
        <div
          ref={containerRef}
          id="active-player-stage"
          className={`relative bg-black rounded-2xl overflow-hidden border border-[#1f2d47] flex items-center justify-center transition-all shadow-2xl ${
            isFullscreen
              ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none border-none max-w-none max-h-none'
              : 'w-full aspect-[16/9] max-h-[75vh] min-h-[300px]'
          }`}
        >
          {/* Fullscreen Floating Controls Bar (Volver atrás & Cerrar) - Always visible */}
          {isFullscreen && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-4 py-2 bg-black/30 hover:bg-black/50 backdrop-blur-[2px] rounded-b-2xl border-x border-b border-white/20 flex items-center justify-center gap-2 sm:gap-4 opacity-100 pointer-events-auto transition-all duration-200"
            >
              <button
                id="fullscreen-back-btn"
                onClick={handleExitFullscreenBack}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/25 active:bg-white/30 text-white border border-white/30 hover:border-[#00e5ff] text-xs sm:text-sm font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all shadow-sm tv-focusable cursor-pointer backdrop-blur-none"
                title="Volver a la vista normal"
              >
                <ArrowLeft className="w-4 h-4 text-[#00e5ff] drop-shadow" />
                <span className="drop-shadow">Volver atrás</span>
              </button>

              <div className="hidden md:flex items-center gap-2 bg-black/30 px-2.5 py-0.5 rounded-md border border-white/15">
                <img
                  src={channel.logo}
                  alt={channel.title}
                  className="h-4.5 w-auto object-contain bg-white/90 rounded px-0.5"
                />
                <span className="text-white text-xs sm:text-sm font-medium drop-shadow">{channel.title}</span>
                <span className="text-xs text-[#00e5ff] drop-shadow">({activeSource?.name})</span>
              </div>

              <button
                id="fullscreen-close-btn"
                onClick={handleFullscreenClose}
                className="flex items-center gap-1 bg-red-600/30 hover:bg-red-600/60 active:bg-red-600/80 text-white border border-red-400/40 hover:border-red-400 text-xs sm:text-sm font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all shadow-sm tv-focusable cursor-pointer"
                title="Cerrar reproducción"
              >
                <X className="w-4 h-4 drop-shadow" />
                <span className="drop-shadow">Cerrar</span>
              </button>
            </div>
          )}

          {/* Video or Iframe Player */}
          {isM3U8 ? (
            <video
              ref={videoRef}
              key={`m3u8-video-${reloadKey}-${activeSource?.url}`}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black border-0 outline-none"
            />
          ) : (
            <iframe
              ref={iframeRef}
              key={`embed-iframe-${reloadKey}-${activeSource?.url}`}
              src={activeSource?.url}
              title={`${channel.title} - ${activeSource?.name}`}
              className="w-full h-full border-0 bg-black outline-none"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
            />
          )}
        </div>

        {/* Quick Channels Strip / Otros canales recomendados */}
        {otherChannels.length > 0 && onSelectChannel && (
          <div className="w-full mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
                <Tv className="w-4 h-4 text-[#00e5ff]" />
                <span>Cambiar de canal rápidamente</span>
              </h3>
              <button
                onClick={onClose}
                className="text-xs text-[#00e5ff] hover:underline font-semibold"
              >
                Ver todos los canales →
              </button>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#1f2d47]">
              {otherChannels.slice(0, 12).map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => onSelectChannel(ch)}
                  className="shrink-0 flex items-center gap-2 bg-[#121927] hover:bg-[#1a253a] border border-[#212f47] hover:border-[#00e5ff] px-3 py-2 rounded-xl transition-all tv-focusable cursor-pointer text-left group"
                >
                  <img
                    src={ch.logo}
                    alt={ch.title}
                    className="h-6 w-6 object-contain bg-white rounded p-0.5 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png';
                    }}
                  />
                  <div className="max-w-[120px]">
                    <div className="text-xs font-bold text-white truncate group-hover:text-[#00e5ff]">
                      {ch.title}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {ch.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
