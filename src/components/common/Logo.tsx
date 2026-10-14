import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, className = '' }) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      {/* 3D Geometric Faceted Metallic Emblem inspired by user image */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-md shadow-orange-500/10 border border-slate-700/60"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Dark polygonal background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-zinc-900 to-black" />
        
        {/* Geometric polygon facets simulation */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        >
          <polygon points="0,0 50,20 20,60" fill="#334155" opacity="0.5" />
          <polygon points="50,20 100,0 80,50" fill="#1e293b" opacity="0.7" />
          <polygon points="20,60 50,20 50,90" fill="#475569" opacity="0.4" />
          <polygon points="80,50 50,20 60,85" fill="#334155" opacity="0.6" />
          <polygon points="0,100 20,60 50,90" fill="#0f172a" opacity="0.8" />
          <polygon points="100,100 80,50 60,85" fill="#1e293b" opacity="0.9" />
          <polygon points="50,90 60,85 50,100" fill="#F57224" opacity="0.8" />
        </svg>

        {/* Dynamic Fire Flame Accent Glow */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-tr from-[#F57224] to-amber-400 rounded-full blur-[2px] opacity-90 animate-pulse" />

        {/* Chrome Metallic Monogram "IMXJ" */}
        <div className="relative z-10 flex flex-col items-center justify-center font-black tracking-tighter leading-none">
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 font-extrabold"
            style={{ fontSize: size === 'sm' ? '11px' : size === 'lg' ? '16px' : '13px' }}
          >
            IMXJ
          </span>
          <div className="w-3 h-0.5 bg-gradient-to-r from-transparent via-[#F57224] to-transparent mt-0.5 rounded-full" />
        </div>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-extrabold tracking-tight text-slate-900 text-lg md:text-xl">
            IMX
          </span>
          <span className="font-extrabold tracking-wide text-[#F57224] text-lg md:text-xl drop-shadow-sm flex items-center">
            FIRE
          </span>
          <span className="font-extrabold tracking-tight text-slate-800 text-lg md:text-xl">
            JON
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
            IMX CERTIFIED MARKETPLACE
          </span>
        )}
      </div>
    </div>
  );
};
