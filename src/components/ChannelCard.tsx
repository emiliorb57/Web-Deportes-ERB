import React from 'react';
import { Zap, Play } from 'lucide-react';
import { Channel } from '../types';

interface ChannelCardProps {
  channel: Channel;
  isPlaying: boolean;
  onPlay: (channel: Channel) => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  isPlaying,
  onPlay,
}) => {
  const hasM3U8 = channel.sources.some(
    (s) => s.type === 'm3u8' || (s.url && s.url.includes('.m3u8'))
  );
  const serverCount = channel.sources.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay(channel);
    }
  };

  return (
    <div
      id={`channel-card-${channel.id}`}
      tabIndex={0}
      role="button"
      onClick={() => onPlay(channel)}
      onKeyDown={handleKeyDown}
      title={`${channel.title} - ${channel.category} (${serverCount} ${
        serverCount === 1 ? 'servidor' : 'servidores'
      })`}
      className={`group relative flex flex-col items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all duration-200 select-none min-h-[145px] sm:min-h-[155px] tv-focusable shadow-md ${
        isPlaying
          ? 'bg-[#d4fcd9] border-[3px] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.7)] scale-[1.02]'
          : 'bg-white/95 border-[3px] border-[#ff2a2a] hover:bg-[#a8e6cf] hover:border-[#00e5ff] hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1'
      }`}
    >
      {/* Playing pulse indicator */}
      {isPlaying && (
        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
        </span>
      )}

      {/* Logo container */}
      <div className="w-full h-16 sm:h-20 flex items-center justify-center mb-1">
        <img
          src={channel.logo}
          alt={channel.title}
          loading="lazy"
          className="max-w-[92%] max-h-14 sm:max-h-16 object-contain transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            // Fallback for broken image
            (e.target as HTMLImageElement).src =
              'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png';
          }}
        />
      </div>

      {/* Title & Server Badges */}
      <div className="w-full text-center flex flex-col items-center gap-1">
        <div className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight line-clamp-2 px-0.5">
          {channel.title}
        </div>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          <span className="text-[10px] font-semibold text-gray-700 bg-black/10 px-2 py-0.5 rounded-full">
            {serverCount} {serverCount === 1 ? 'servidor' : 'servidores'}
          </span>
          {hasM3U8 && (
            <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-white bg-[#28a745] px-1.5 py-0.5 rounded shadow-xs">
              <Zap className="w-2.5 h-2.5 fill-current" />
              M3U8
            </span>
          )}
        </div>
      </div>

      {/* Hover Play Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
        <div className="bg-[#007bff] text-white p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <Play className="w-4 h-4 fill-white" />
        </div>
      </div>
    </div>
  );
};
