import React from 'react';

interface LogoProps {
size?: 'sm' | 'md' | 'lg';
showTagline?: boolean;
className?: string;
}

export const Logo: React.FC<LogoProps> = ({
size = 'md',
showTagline = false,
className = '',
}) => {
const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

return (
<div className={"flex items-center gap-2.5 cursor-pointer select-none ${className}"}>
<img
src="/imx-jon-logo.jpeg"
alt="IMX JON Logo"
width={iconSize}
height={iconSize}
className="shrink-0 rounded-xl object-cover"
style={{ width: iconSize, height: iconSize }}
/>

  <div className="flex flex-col">
    <div className="flex items-center gap-1.5 leading-none">
      <span className="font-extrabold tracking-tight text-slate-900 text-lg md:text-xl">
        IMX
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
