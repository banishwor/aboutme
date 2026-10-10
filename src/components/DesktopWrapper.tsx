import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, RotateCcw, Sparkles } from 'lucide-react';
import { DesktopExhibition } from './desktop/DesktopExhibition';

interface DesktopWrapperProps {
  children: React.ReactNode;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopMode, setDesktopMode] = useState<'exhibition' | 'phone_frame'>('exhibition');
  const [forceMobileFrame, setForceMobileFrame] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleResetBoot = () => {
    sessionStorage.removeItem('bani_os_booted');
    window.location.reload();
  };

  // If on actual mobile device or screen width < 1024px, serve native mobile experience directly
  if (!isDesktop) {
    return <div className="bani-os-device">{children}</div>;
  }

  // If on desktop and user selected Cinematic Exhibition (Default)
  if (desktopMode === 'exhibition') {
    return (
      <DesktopExhibition
        onSwitchToMobile={() => setDesktopMode('phone_frame')}
      />
    );
  }

  // Desktop Phone Simulator Frame Mode
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #070B14 0%, #0F172A 100%)',
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
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '999px',
        padding: '6px 18px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        zIndex: 1000,
        color: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          color: '#F8FAFC'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }} />
          BANI // OS
        </div>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

        {/* Switch Back to Cinematic Exhibition */}
        <button
          onClick={() => setDesktopMode('exhibition')}
          className="pressable"
          style={{
            border: 'none',
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            borderRadius: '999px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(79, 70, 229, 0.4)'
          }}
        >
          <Sparkles size={12} />
          <span>Switch to Desktop Exhibition</span>
        </button>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

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
            color: '#94A3B8',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} />
          <span>Re-Boot</span>
        </button>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

        {/* Viewport Toggle */}
        <button
          onClick={() => setForceMobileFrame(!forceMobileFrame)}
          className="pressable"
          style={{
            border: 'none',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            padding: '3px 9px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10.5px',
            fontWeight: 600,
            color: '#CBD5E1',
            cursor: 'pointer'
          }}
        >
          {forceMobileFrame ? <Smartphone size={12} /> : <Monitor size={12} />}
          <span>{forceMobileFrame ? 'Phone Frame' : 'Full Width'}</span>
        </button>
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
        color: '#64748B',
        fontFamily: 'var(--font-mono)'
      }}>
        Banishwor Athokpam · Native Mobile OS Mode
      </footer>
    </div>
  );
};
