import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Check if previously booted in this session
    const hasBooted = sessionStorage.getItem('bani_os_booted');
    if (hasBooted) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 350);
    const t2 = setTimeout(() => setStage(2), 750);
    const t3 = setTimeout(() => setStage(3), 1150);
    const tEnd = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        sessionStorage.setItem('bani_os_booted', 'true');
        onComplete();
      }, 350);
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('bani_os_booted', 'true');
    setFading(true);
    setTimeout(onComplete, 150);
  };

  return (
    <div 
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label="Skip BANI OS boot animation"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.04)' : 'scale(1)',
        cursor: 'pointer',
        padding: '24px'
      }}
    >
      {/* OS Monogram Symbol */}
      <div style={{
        width: '76px',
        height: '76px',
        borderRadius: '22px',
        background: '#FFFFFF',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '28px',
        position: 'relative'
      }}>
        {/* Stylized Core Indicator */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '-0.5px'
        }}>
          B
        </div>
        {/* Subtle glowing ring */}
        <div style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '26px',
          border: '1.5px solid rgba(79, 70, 229, 0.25)',
          animation: 'pulse 1.8s infinite ease-in-out'
        }} />
      </div>

      {/* Brand Title */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '19px',
        fontWeight: 700,
        letterSpacing: '1px',
        color: '#0F172A',
        marginBottom: '6px'
      }}>
        BANI // OS
      </div>

      <div style={{
        fontSize: '12px',
        fontWeight: 500,
        color: '#64748B',
        letterSpacing: '0.3px',
        marginBottom: '32px'
      }}>
        Personal Mobile Operating System
      </div>

      {/* 1px Sleek Progress Track */}
      <div style={{
        width: '180px',
        height: '3px',
        background: 'rgba(15, 23, 42, 0.08)',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '16px',
        position: 'relative'
      }}>
        <div style={{
          width: stage === 0 ? '25%' : stage === 1 ? '60%' : stage === 2 ? '90%' : '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
          borderRadius: '999px',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>

      {/* Diagnostics Line */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: '#94A3B8',
        height: '16px'
      }}>
        {stage === 0 && "INITIALIZING SYSTEM..."}
        {stage === 1 && "MOUNTING CORE MODULES..."}
        {stage === 2 && "PREPARING SPACES..."}
        {stage === 3 && "READY"}
      </div>

      {/* Tap to skip hint */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontSize: '11px',
        color: '#94A3B8',
        letterSpacing: '0.5px'
      }}>
        Tap anywhere to skip
      </div>
    </div>
  );
};
