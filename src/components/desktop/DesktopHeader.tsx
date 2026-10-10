import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, QrCode, Sparkles } from 'lucide-react';
import { isAudioEnabled, toggleAudio, playClickSound } from '../../utils/audioFeedback';

interface DesktopHeaderProps {
  activeAct: string;
  onOpenQR: () => void;
  onSwitchToMobile: () => void;
  onTriggerMatrix: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  activeAct,
  onOpenQR,
  onSwitchToMobile,
  onTriggerMatrix
}) => {
  const [audioOn, setAudioOn] = useState(isAudioEnabled());
  const [nameText, setNameText] = useState('BANISHWOR ATHOKPAM');
  const [isMorphing, setIsMorphing] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Authentic Meitei Mayek spelling: ꯕꯥꯅꯤꯁ꯭ꯋꯣꯔ ꯑꯊꯣꯛꯄꯝ
  const meiteiMayek = 'ꯕꯥꯅꯤꯁ꯭ꯋꯣꯔ ꯑꯊꯣꯛꯄꯝ';
  const englishName = 'BANISHWOR ATHOKPAM';

  // Live IST (Thoubal/Imphal) Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAudioToggle = () => {
    const nextState = toggleAudio();
    setAudioOn(nextState);
  };

  // Easter Egg 3: Meitei Mayek Script Morph on click + scroll to top
  const handleNameClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMorphing) return;
    setIsMorphing(true);
    playClickSound(950, 0.05);

    const target = nameText === englishName ? meiteiMayek : englishName;
    let iterations = 0;
    const glyphs = 'ABCXYZ0123456789ꯕꯥꯅꯤꯁ꯭ꯋꯣꯔꯑꯊꯣꯛꯄꯝ';

    const interval = setInterval(() => {
      setNameText(() =>
        target
          .split('')
          .map((_, index) => {
            if (index < iterations) {
              return target[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iterations >= target.length) {
        clearInterval(interval);
        setNameText(target);
        setIsMorphing(false);
      }
      iterations += 1 / 2;
    }, 30);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '64px',
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 900,
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      color: '#FFFFFF'
    }}>
      {/* Left: Interactive Monograph Title with Meitei Mayek Morph */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleNameClick}
          title="Click to morph into authentic Meitei Mayek script!"
          className="pressable"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#4F46E5',
            boxShadow: '0 0 10px #4F46E5'
          }} />
          <span style={{ color: isMorphing ? '#818CF8' : '#F8FAFC' }}>
            {nameText}
          </span>
          <span style={{
            fontSize: '10px',
            color: '#94A3B8',
            fontWeight: 500,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            padding: '1px 5px',
            marginLeft: '4px'
          }}>
            EXHIBITION
          </span>
        </button>
      </div>

      {/* Center: Live Active Chapter Pill + Thoubal/Imphal Solar Clock */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '999px',
        padding: '5px 16px'
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: '#E0E7FF',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Sparkles size={11} color="#818CF8" />
          <span>{activeAct}</span>
        </div>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>

        <div style={{
          fontSize: '11px',
          fontFamily: 'var(--font-mono, monospace)',
          color: '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }} title="Local Time in Thoubal / Imphal (IST)">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span>THOUBAL {currentTime || 'IST'}</span>
        </div>
      </div>

      {/* Right: Sound, QR Beam, Mobile Mode Switcher & Matrix Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Matrix Rain Easter Egg Trigger */}
        <button
          onClick={onTriggerMatrix}
          title="Toggle Digital Matrix Rain (or type 'matrix')"
          className="pressable"
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '999px',
            padding: '5px 12px',
            color: '#34D399',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
        >
          <span>&gt;_ matrix</span>
        </button>

        {/* Tactile Audio Toggle */}
        <button
          onClick={handleAudioToggle}
          title={audioOn ? 'Audio feedback ON (Click to mute)' : 'Audio feedback MUTED (Click to enable)'}
          className="pressable"
          style={{
            background: audioOn ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${audioOn ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '999px',
            padding: '5px 10px',
            color: audioOn ? '#818CF8' : '#94A3B8',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {audioOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{audioOn ? 'Audio ON' : 'Muted'}</span>
        </button>

        {/* Send to Phone QR Beam */}
        <button
          onClick={onOpenQR}
          title="Scan QR Code to open on your phone!"
          className="pressable"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            padding: '5px 10px',
            color: '#E2E8F0',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <QrCode size={13} />
          <span>Beam to Phone</span>
        </button>

        {/* Switch to Mobile OS Preview */}
        <button
          onClick={onSwitchToMobile}
          title="Switch to Mobile Phone OS Simulator"
          className="pressable"
          style={{
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            border: 'none',
            borderRadius: '999px',
            padding: '5px 14px',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 10px rgba(79, 70, 229, 0.35)'
          }}
        >
          <Smartphone size={13} />
          <span>Phone OS</span>
        </button>
      </div>
    </header>
  );
};
