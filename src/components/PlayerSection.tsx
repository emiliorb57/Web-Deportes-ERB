import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { RotateCw, ExternalLink, Maximize, X, Zap, Server, ArrowLeft } from 'lucide-react';
import { Channel } from '../types';

interface PlayerSectionProps {
  channel: Channel;
  sourceIndex: number;
  onSelectSource: (index: number) => void;
  onClose: () => void;
  onEditChannel?: (channel: Channel) => void;
}

export const PlayerSection: React.FC<PlayerSectionProps> = ({
  channel,
  sourceIndex,
  onSelectSource,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeSource = channel.sources[sourceIndex] || channel.sources[0];
  const isM3U8 =
    activeSource?.type === 'm3u8' ||
    (activeSource?.url && activeSource.url.includes('.m3u8'));

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!(
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      );
      setIsFullscreen(isNowFullscreen);
      if (isNowFullscreen) {
        setShowControls(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls in fullscreen after inactivity
  const handleMouseMove = () => {
    if (!isFullscreen) return;
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

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

  const handleExternal = () => {
    if (activeSource?.url) {
      window.open(activeSource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFullscreen = () => {
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
        document.exitFullscreen().catch(() => {});
      }
    }
    onClose();
  };

  return (
    <section id="playerSection" className="max-w-[1080px] w-full mx-auto px-4 my-3 animate-in fade-in duration-300">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`bg-[#0a0d14] rounded-2xl overflow-hidden flex flex-col relative ${
          isFullscreen
            ? 'w-screen h-screen rounded-none border-0'
            : 'border-2 border-[#00e5ff] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(0,229,255,0.25)]'
        }`}
      >
        {/* Fullscreen Floating Controls Bar (Volver atrás & Cerrar) */}
        {isFullscreen && (
          <div
            className={`absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 ${
              showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                id="fullscreen-back-btn"
                onClick={handleExitFullscreenBack}
                className="flex items-center gap-2 bg-[#1c263c]/90 hover:bg-[#007bff] text-white border-2 border-[#00e5ff] text-sm sm:text-base font-bold px-4 py-2 rounded-xl transition-all shadow-lg tv-focusable"
                title="Volver a la vista normal"
              >
                <ArrowLeft className="w-5 h-5 text-[#00e5ff] group-hover:text-white" />
                <span>Volver atrás</span>
              </button>

              <div className="hidden sm:flex items-center gap-2.5 bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
                <img
                  src={channel.logo}
                  alt={channel.title}
                  className="h-6 w-auto object-contain bg-white rounded px-0.5"
                />
                <span className="text-white text-sm font-bold">{channel.title}</span>
                <span className="text-xs text-[#00e5ff]">({activeSource?.name})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="fullscreen-close-btn"
                onClick={handleFullscreenClose}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white border-2 border-red-400 text-sm sm:text-base font-bold px-4 py-2 rounded-xl transition-all shadow-lg tv-focusable"
                title="Cerrar reproducción"
              >
                <X className="w-5 h-5" />
                <span>Cerrar</span>
              </button>
            </div>
          </div>
        )}

        {/* Player Header Bar (Normal mode) */}
        {!isFullscreen && (
          <div className="bg-[#141b2b] px-4 py-3 border-b border-[#23314d] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={channel.logo}
                alt={channel.title}
                className="h-9 w-auto object-contain bg-white p-0.5 rounded-md border border-[#00e5ff]/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {channel.title}
                  </h2>
                  <span className="text-[11px] bg-[#007bff] text-white px-2 py-0.5 rounded-full font-medium">
                    {channel.category}
                  </span>
                </div>
                <p className="text-xs text-[#8b9bb4]">
                  Servidor activo: <span className="text-[#00e5ff] font-semibold">{activeSource?.name || 'Servidor 1'}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="player-reload-btn"
                onClick={handleReload}
                className="flex items-center gap-1.5 bg-[#222d44] hover:bg-[#334366] text-white border border-[#3b4b70] hover:border-[#00e5ff] text-xs font-semibold px-3 py-1.5 rounded-lg transition-all tv-focusable"
                title="Recargar stream"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Recargar</span>
              </button>

              <button
                id="player-external-btn"
                onClick={handleExternal}
                className="flex items-center gap-1.5 bg-[#222d44] hover:bg-[#334366] text-white border border-[#3b4b70] hover:border-[#00e5ff] text-xs font-semibold px-3 py-1.5 rounded-lg transition-all tv-focusable"
                title="Abrir en ventana externa"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Ventana</span> Externa
              </button>

              <button
                id="player-fullscreen-btn"
                onClick={handleFullscreen}
                className="flex items-center gap-1.5 bg-[#222d44] hover:bg-[#334366] text-white border border-[#3b4b70] hover:border-[#00e5ff] text-xs font-semibold px-3 py-1.5 rounded-lg transition-all tv-focusable"
                title="Pantalla completa (o tecla F)"
              >
                <Maximize className="w-3.5 h-3.5 text-amber-300" />
                <span>Pantalla Completa</span>
              </button>

              <button
                id="player-close-btn"
                onClick={onClose}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white border border-red-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all tv-focusable"
                title="Cerrar reproductor (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cerrar</span>
              </button>
            </div>
          </div>
        )}

        {/* Server Selection Bar */}
        {!isFullscreen && channel.sources.length > 1 && (
          <div className="bg-[#111724] px-4 py-2 border-b border-[#23314d] flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b9bb4] mr-2">
              <Server className="w-3.5 h-3.5" />
              <span>Servidores disponibles:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {channel.sources.map((src, idx) => {
                const isSelected = idx === sourceIndex;
                const isSrcM3u8 = src.type === 'm3u8' || src.url.includes('.m3u8');
                return (
                  <button
                    key={`${src.name}-${idx}`}
                    id={`server-btn-${idx}`}
                    onClick={() => onSelectSource(idx)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all tv-focusable ${
                      isSelected
                        ? 'bg-[#007bff] text-white border border-[#00e5ff] shadow-[0_0_8px_rgba(0,123,255,0.7)]'
                        : 'bg-[#1c263c] text-gray-300 border border-[#334366] hover:bg-[#2a3a5c] hover:text-white hover:border-[#00e5ff]'
                    }`}
                  >
                    {isSrcM3u8 && <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />}
                    <span>{src.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Video Canvas Container */}
        <div
          className={`relative w-full bg-black flex items-center justify-center overflow-hidden ${
            isFullscreen
              ? 'flex-1 h-full'
              : 'aspect-[16/9] max-h-[50vh] sm:max-h-[520px]'
          }`}
        >
          {isM3U8 ? (
            <video
              ref={videoRef}
              key={`m3u8-video-${reloadKey}`}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <iframe
              ref={iframeRef}
              key={`embed-iframe-${reloadKey}-${activeSource?.url}`}
              src={activeSource?.url}
              title={`${channel.title} - ${activeSource?.name}`}
              className="w-full h-full border-0 bg-black"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};

