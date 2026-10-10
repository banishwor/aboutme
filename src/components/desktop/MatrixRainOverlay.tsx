import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { playClickSound } from '../../utils/audioFeedback';

interface MatrixRainOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatrixRainOverlay: React.FC<MatrixRainOverlayProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Characters: Katakana, Numbers, Meitei Mayek, Roman
    const chars = '0123456789ABCDEF0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍꯕꯥꯅꯤꯁ꯭ꯋꯣꯔꯑꯊꯣꯛꯄꯝ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }).fill(1) as number[];

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10B981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.95 ? '#FFFFFF' : '#10B981';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Listen for ESC key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(7, 11, 20, 0.95)'
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Top Banner with Exit Notice */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 23, 42, 0.9)',
        border: '1px solid #10B981',
        borderRadius: '999px',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        color: '#34D399',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '13px',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
      }}>
        <span>&gt; BANI_MATRIX_SUBSYSTEM // ACTIVE</span>
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#A7F3D0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          <X size={14} />
          <span>Exit [ESC]</span>
        </button>
      </div>
    </div>
  );
};
