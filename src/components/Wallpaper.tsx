import React from 'react';

export const Wallpaper: React.FC = () => {
  return (
    <div 
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(160deg, #E0E7FF 0%, #F5F3FF 35%, #FDF2F8 70%, #FEF3C7 100%)'
      }}
    >
      {/* Dynamic Ambient Color Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-15%',
        width: '360px',
        height: '360px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, rgba(99, 102, 241, 0) 70%)',
        filter: 'blur(40px)',
        transform: 'translateZ(0)'
      }} />

      <div style={{
        position: 'absolute',
        top: '15%',
        right: '-20%',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, rgba(236, 72, 153, 0) 70%)',
        filter: 'blur(45px)',
        transform: 'translateZ(0)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.40) 0%, rgba(14, 165, 233, 0) 70%)',
        filter: 'blur(50px)',
        transform: 'translateZ(0)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '340px',
        height: '340px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(245, 158, 11, 0) 70%)',
        filter: 'blur(45px)',
        transform: 'translateZ(0)'
      }} />

      {/* Abstract Modern Wallpaper Ribbons (SVG Silk Curves) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.65,
          mixBlendMode: 'overlay'
        }}
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="silkGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <path
          d="M-50,200 C150,150 250,350 450,280 L450,550 C250,600 100,450 -50,580 Z"
          fill="url(#silkGrad1)"
          filter="blur(30px)"
        />

        <path
          d="M-50,450 C120,400 280,620 450,520 L450,850 C280,900 80,720 -50,820 Z"
          fill="url(#silkGrad2)"
          filter="blur(35px)"
        />
      </svg>
    </div>
  );
};
