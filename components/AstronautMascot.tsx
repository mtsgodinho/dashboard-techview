
import React from 'react';

interface AstronautMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

const AstronautMascot: React.FC<AstronautMascotProps> = ({ size = 'md', className = '', animated = true }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-techBlue rounded-full opacity-20 blur-3xl ${animated ? 'animate-pulse' : ''}`}></div>
      
      {/* SVG Mascot (Inspired by the provided image) */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(0,200,255,0.5)]">
        {/* Helmet */}
        <circle cx="50" cy="45" r="30" fill="#0B1C2D" stroke="#00C8FF" strokeWidth="2" />
        {/* Visor */}
        <path d="M30 45 Q50 30 70 45 Q70 60 50 60 Q30 60 30 45" fill="#000" stroke="#00C8FF" strokeWidth="1" opacity="0.8" />
        {/* Reflections on Visor */}
        <path d="M35 45 Q40 38 45 42" stroke="#00C8FF" strokeWidth="1.5" fill="none" />
        {/* Body */}
        <path d="M30 75 Q50 65 70 75 L75 95 L25 95 Z" fill="#0B1C2D" stroke="#00C8FF" strokeWidth="2" />
        {/* Chest Panel */}
        <rect x="40" y="78" width="20" height="12" rx="2" fill="#071420" stroke="#00C8FF" strokeWidth="1" />
        <circle cx="45" cy="84" r="1.5" fill="#00C8FF" />
        <circle cx="50" cy="84" r="1.5" fill="#00C8FF" />
        <circle cx="55" cy="84" r="1.5" fill="#ef4444" />
        {/* "TV" Logo on Helmet */}
        <text x="50" y="52" textAnchor="middle" fill="#00C8FF" fontSize="10" fontWeight="bold" fontFamily="Space Grotesk">TV</text>
        {/* Headset Details */}
        <rect x="18" y="40" width="4" height="10" rx="1" fill="#00C8FF" />
        <rect x="78" y="40" width="4" height="10" rx="1" fill="#00C8FF" />
      </svg>
    </div>
  );
};

export default AstronautMascot;
