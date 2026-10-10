import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward } from 'lucide-react';
import { profile } from '../../content/profile';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './CinematicBootIntro.css';

interface CinematicBootIntroProps {
  onComplete: () => void;
}

// Synthesize a warm resonant OS boot chord (dual sine chord with soft decay)
function playBootChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.03);
      osc.stop(ctx.currentTime + 1.4);
    });
  } catch {
    // Audio context may be restricted before user gesture
  }
}

// Synthesize a retro CRT power-off audio pitch sweep
function playCrtShutdownSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio context may be restricted before user gesture
  }
}

export const CinematicBootIntro: React.FC<CinematicBootIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'terminal' | 'glitch' | 'shutdown' | 'matrix' | 'done'>('boot');
  const [bootProgress, setBootProgress] = useState<number>(20);
  const [bootDiag, setBootDiag] = useState<string>('UEFI 64-BIT INITIALIZING...');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // 0. Preload hero transparent image in background
  useEffect(() => {
    if (profile.avatarUrl) {
      const preloadImg = new Image();
      preloadImg.src = profile.avatarUrl;
    }
  }, []);

  // 1. Sequential Master Pacing: Cold Boot -> Terminal -> Glitch Breach -> CRT Shutdown -> Pure Matrix
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // --- PHASE 0: COLD BOOT ---
    playBootChime();

    timeouts.push(setTimeout(() => {
      setBootProgress(55);
      setBootDiag('CHECKING HARDWARE BUS & RAM...');
      playClickSound(700, 0.02);
    }, 500));

    timeouts.push(setTimeout(() => {
      setBootProgress(85);
      setBootDiag('LOADING THOUBAL KERNEL SUBSYSTEMS...');
      playClickSound(750, 0.02);
    }, 1100));

    timeouts.push(setTimeout(() => {
      setBootProgress(100);
      setBootDiag('SYS READY // LAUNCHING USER SHELL');
      playClickSound(800, 0.02);
    }, 1600));

    // Transition from Boot into Terminal Window
    timeouts.push(setTimeout(() => {
      setPhase('terminal');
    }, 2050));

    // --- PHASE 1: TERMINAL TYPING ---
    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '$ ./bani-os --init']);
      playClickSound(800, 0.02);
    }, 2800));

    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '> Initializing BANI // OS v2026...']);
      playClickSound(850, 0.02);
    }, 3750));

    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '> Hi, I am Banishwor.']);
      playClickSound(900, 0.02);
    }, 4850));

    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '> Welcome to my world.']);
      playClickSound(960, 0.03);
    }, 6000));

    // --- PHASE 2: SYSTEM BREACH / GLITCH ALERT ---
    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '[ CRITICAL ALERT: EXTERNAL BREACH DETECTED ]']);
      playClickSound(450, 0.04);
      setPhase('glitch');
    }, 7250));

    timeouts.push(setTimeout(() => {
      setVisibleLines(prev => [...prev, '[ OVERRIDE IMMINENT // FORCING TOTAL SHUTDOWN... ]']);
      playClickSound(420, 0.04);
    }, 7850));

    // --- PHASE 3: CRT SHUTDOWN (Screen turns off!) ---
    timeouts.push(setTimeout(() => {
      playCrtShutdownSound();
      setPhase('shutdown');
    }, 8550));

    // --- PHASE 4: REBOOT OVERRIDE INTO PURE MEITEI MAYEK MATRIX ---
    timeouts.push(setTimeout(() => {
      playSuccessChime();
      setPhase('matrix');
    }, 9300));

    // --- PHASE 5: DISSOLVE INTO ILLUMINATED HERO ---
    timeouts.push(setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setPhase('done');
        onCompleteRef.current();
      }, 550);
    }, 13500));

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  // 2. Pure Meitei Mayek Matrix Rain Canvas (Clean, No Watermark)
  useEffect(() => {
    if (phase !== 'matrix') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Authentic Meitei Mayek characters + binary
    const chars = '01ꯑꯏꯎꯃꯄꯅꯆꯇꯈꯉꯊꯋꯌꯍꯁꯂꯀꯔꯕꯥꯅꯤꯁ꯭ꯋꯣꯔꯑꯊꯣꯛꯄꯝ';
    const fontSize = 17;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 17, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Space Grotesk', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));

        // Random glyph coloring: temple gold, white head, or emerald
        const rand = Math.random();
        if (rand > 0.965) {
          ctx.fillStyle = '#FBBF24'; // Temple Gold highlight
        } else if (rand > 0.91) {
          ctx.fillStyle = '#FFFFFF'; // Bright White head
        } else {
          ctx.fillStyle = '#10B981'; // Phosphor Emerald
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  // 3. Skip Handler (ESC, Space, or Skip Button)
  const handleSkip = () => {
    playClickSound(900, 0.04);
    setIsFadingOut(true);
    setTimeout(() => {
      setPhase('done');
      onCompleteRef.current();
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="cinematic-boot-overlay"
      style={{
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.06)' : 'scale(1)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
    >
      {/* Top Skip Button */}
      <button
        onClick={handleSkip}
        className="cinematic-skip-btn"
        title="Press ESC or Space to Skip"
      >
        <span>Skip Intro</span>
        <FastForward size={12} />
      </button>

      {/* Red Glitch Flash Overlay during Breach */}
      {phase === 'glitch' && (
        <div className="hacked-flash-overlay" />
      )}

      {/* PHASE 0 & 1: Boot Screen & Retro Terminal Prompt Window */}
      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <motion.div
            key="boot-screen"
            className="boot-screen-shell"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Core Glowing Emblem */}
            <div className="boot-logo-box">
              <div className="boot-logo-inner">B</div>
              <div className="boot-logo-pulse" />
            </div>

            {/* Brand Title */}
            <div className="boot-brand-name">
              BANI // OS
            </div>
            <div className="boot-brand-sub">
              THOUBAL KERNEL · ARCHITECTURAL EDITION
            </div>

            {/* Progress Track */}
            <div className="boot-progress-track">
              <div
                className="boot-progress-fill"
                style={{ width: `${bootProgress}%` }}
              />
            </div>

            {/* Diagnostics Line */}
            <div className="boot-diag-line">
              {bootDiag}
            </div>
          </motion.div>
        )}

        {(phase === 'terminal' || phase === 'glitch') && (
          <motion.div
            key="terminal-frame"
            className={`terminal-window ${phase === 'glitch' ? 'glitching' : ''}`}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Title Bar */}
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-title">
                bash — bani-os@kangleipak: ~
              </div>
              <div className={`terminal-badge ${phase === 'glitch' ? 'breach' : ''}`}>
                {phase === 'glitch' ? 'OVERRIDE' : 'SYS // OK'}
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div className="terminal-body">
              {visibleLines.map((line, idx) => {
                let lineClass = 'terminal-line';
                if (line.startsWith('$')) lineClass += ' cmd';
                else if (line.includes('Initializing')) lineClass += ' sys';
                else if (line.includes('Hi, I am')) lineClass += ' bio';
                else if (line.includes('Welcome')) lineClass += ' welcome';
                else if (line.startsWith('[')) lineClass += ' danger';

                return (
                  <div key={idx} className={lineClass}>
                    {line}
                  </div>
                );
              })}
              {phase === 'terminal' && (
                <span className="terminal-cursor" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 3: CRT Shutdown Beam Collapse (Turn Off Device Effect) */}
      {phase === 'shutdown' && (
        <div className="crt-shutdown-effect">
          <div className="crt-beam-line" />
        </div>
      )}

      {/* PHASE 4: Pure Meitei Mayek Matrix Rain Layer (No Name, Clean & Hypnotic) */}
      {phase === 'matrix' && (
        <canvas ref={canvasRef} className="matrix-canvas-layer" />
      )}
    </div>
  );
};
