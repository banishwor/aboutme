import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, RotateCcw, Globe } from 'lucide-react';

interface DesktopWrapperProps {
  children: React.ReactNode;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [forceMobileFrame, setForceMobileFrame] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleResetBoot = () => {
    sessionStorage.removeItem('bani_os_booted');
    window.location.reload();
  };

  if (!isDesktop) {
    return <div className="bani-os-device">{children}</div>;
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Desktop Helper Bar */}
      <header style={{
        position: 'absolute',
        top: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: '999px',
        padding: '6px 16px',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          color: '#0F172A'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }} />
          BANI // OS
        </div>

        <span style={{ color: '#CBD5E1' }}>|</span>

        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
          Mobile-First Preview
        </span>

        <span style={{ color: '#CBD5E1' }}>|</span>

        {/* Re-trigger Boot Sequence */}
        <button
          onClick={handleResetBoot}
          className="pressable"
          title="Re-run Boot Sequence"
          style={{
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            color: '#64748B',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} />
          Re-Boot
        </button>

        <span style={{ color: '#CBD5E1' }}>|</span>

        {/* Viewport Toggle */}
        <button
          onClick={() => setForceMobileFrame(!forceMobileFrame)}
          className="pressable"
          style={{
            border: 'none',
            background: '#F1F5F9',
            borderRadius: '999px',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10.5px',
            fontWeight: 600,
            color: '#475569',
            cursor: 'pointer'
          }}
        >
          {forceMobileFrame ? <Smartphone size={12} /> : <Monitor size={12} />}
          {forceMobileFrame ? 'Phone Frame' : 'Full Width'}
        </button>

        <span style={{ color: '#CBD5E1' }}>|</span>

        {/* Temporary Classic Desktop Site Fallback */}
        <a
          href="/legacy/"
          className="pressable"
          title="Switch to Classic 2024 Desktop Portfolio"
          style={{
            border: '1px solid rgba(79, 70, 229, 0.25)',
            background: 'rgba(238, 242, 255, 0.85)',
            borderRadius: '999px',
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '10.5px',
            fontWeight: 700,
            color: '#4F46E5',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Globe size={12} />
          <span>Classic Desktop Site</span>
        </a>
      </header>

      {/* Device Viewport Canvas */}
      <div className={`bani-os-device ${forceMobileFrame ? 'desktop-preview' : ''}`} style={{
        width: forceMobileFrame ? '412px' : '100%',
        maxWidth: forceMobileFrame ? '412px' : '100%'
      }}>
        {children}
      </div>

      {/* Subtle Bottom Credit */}
      <footer style={{
        position: 'absolute',
        bottom: '12px',
        fontSize: '11px',
        color: '#94A3B8',
        fontFamily: 'var(--font-mono)'
      }}>
        Designed & Developed by Banishwor Athokpam · Phase 1 Complete
      </footer>
    </div>
  );
};
