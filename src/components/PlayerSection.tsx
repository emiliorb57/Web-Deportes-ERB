import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Hls from 'hls.js';
import { RotateCw, ExternalLink, Maximize, X, Zap, Server, ArrowLeft } from 'lucide-react';
import { Channel } from '../types';

export interface PlayerControlBarProps {
  channel: Channel;
  sourceIndex: number;
  onSelectSource: (index: number) => void;
}

export const PlayerControlBar: React.FC<PlayerControlBarProps> = ({
  channel,
  sourceIndex,
  onSelectSource,
}) => {
  const activeSource = channel.sources[sourceIndex] || channel.sources[0];

  return (
    <div className="w-full bg-[#141b2b]/95 backdrop-blur-md border-b border-[#23314d] shadow-lg">
      <div className="w-full max-w-[1600px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src={channel.logo}
              alt={channel.title}
              className="h-9 w-auto object-contain bg-white p-0.5 rounded-md border border-[#00e5ff]/50 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight whitespace-nowrap">
                  {channel.title}
                </h2>
                <span className="text-[11px] bg-[#007bff] text-white px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                  {channel.category}
                </span>
              </div>
              <p className="text-xs text-[#8b9bb4] flex items-center gap-1 mt-0.5">
                <span>Servidor en reproducción:</span>
                <span className="text-[#00e5ff] font-semibold">{activeSource?.name || 'Servidor 1'}</span>
              </p>
            </div>
          </div>

          {/* Servidores a continuación del logo y nombre del canal */}
          {channel.sources.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap pl-1 sm:pl-3 sm:border-l sm:border-[#2a3b5c]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b9bb4]">
                <Server className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Servidores:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {channel.sources.map((src, idx) => {
                  const isSelected = idx === sourceIndex;
                  const isSrcM3u8 = src.type === 'm3u8' || src.url.includes('.m3u8');
                  return (
                    <button
                      key={`${src.name}-${idx}`}
                      id={`server-btn-${idx}`}
                      onClick={() => onSelectSource(idx)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all tv-focusable cursor-pointer ${
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
        </div>
      </div>
    </div>
  );
};

export interface PlayerVideoHandle {
  toggleFullscreen: () => void;
  reload: () => void;
}

export interface PlayerVideoProps {
  channel: Channel;
  sourceIndex: number;
  reloadKey: number;
  onReload: () => void;
  onExternal: () => void;
  onFullscreen: () => void;
  onClose: () => void;
}

export const PlayerVideo = forwardRef<PlayerVideoHandle, PlayerVideoProps>(
  ({ channel, sourceIndex, reloadKey, onReload, onExternal, onFullscreen, onClose }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const activeSource = channel.sources[sourceIndex] || channel.sources[0];
    const isM3U8 =
      activeSource?.type === 'm3u8' ||
      (activeSource?.url && activeSource.url.includes('.m3u8'));

    useImperativeHandle(ref, () => ({
      toggleFullscreen: () => {
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
      },
      reload: () => {
        if (iframeRef.current && !isM3U8) {
          const currentSrc = iframeRef.current.src;
          iframeRef.current.src = 'about:blank';
          setTimeout(() => {
            if (iframeRef.current) iframeRef.current.src = currentSrc;
          }, 50);
        }
      },
    }));

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
      <section id="playerSection" className="w-full animate-in fade-in duration-300">
        {/* Frameless Video Playback Screen */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className={`w-full bg-black flex items-center justify-center relative overflow-hidden ${
            isFullscreen
              ? 'fixed inset-0 z-[9999] h-screen w-screen'
              : 'w-full max-w-[1600px] mx-auto aspect-[16/9] max-h-[55vh] sm:max-h-[560px] shadow-2xl'
          }`}
        >
          {/* Top Centered Floating Controls Bar (Normal Mode) */}
          {!isFullscreen && (
            <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-[#0e1626]/85 hover:bg-[#0e1626]/95 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#00e5ff]/40 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,255,0.2)] transition-all">
              <button
                id="player-reload-btn"
                onClick={onReload}
                className="flex items-center justify-center bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] p-1.5 sm:p-2 rounded-lg transition-all tv-focusable cursor-pointer"
                title="Recargar stream"
                aria-label="Recargar stream"
              >
                <RotateCw className="w-4 h-4 text-[#00e5ff]" />
              </button>

              <button
                id="player-external-btn"
                onClick={onExternal}
                className="flex items-center justify-center bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] p-1.5 sm:p-2 rounded-lg transition-all tv-focusable cursor-pointer"
                title="Abrir en ventana externa"
                aria-label="Abrir en ventana externa"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                id="player-fullscreen-btn"
                onClick={onFullscreen}
                className="flex items-center justify-center bg-[#1c263c] hover:bg-[#007bff] text-white border border-[#334366] hover:border-[#00e5ff] p-1.5 sm:p-2 rounded-lg transition-all tv-focusable cursor-pointer"
                title="Pantalla completa (o tecla F)"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4 text-amber-300" />
              </button>

              <button
                id="player-close-btn"
                onClick={onClose}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white border border-red-500 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg transition-all tv-focusable cursor-pointer"
                title="Cerrar reproductor (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cerrar</span>
              </button>
            </div>
          )}

          {/* Fullscreen Floating Controls Bar (Volver atrás & Cerrar) - Always visible */}
          {isFullscreen && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 px-2.5 sm:px-3.5 py-1.5 bg-black/25 hover:bg-black/45 backdrop-blur-[2px] rounded-b-2xl border-x border-b border-white/20 flex items-center justify-center gap-2 sm:gap-3 opacity-100 pointer-events-auto transition-all duration-200"
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

          {/* Video or Iframe (No frame border) */}
          {isM3U8 ? (
            <video
              ref={videoRef}
              key={`m3u8-video-${reloadKey}`}
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
      </section>
    );
  }
);

PlayerVideo.displayName = 'PlayerVideo';


