import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Users,
  Trophy,
  Gift,
  Compass,
  AlertTriangle,
  X,
  RotateCw,
  Film
} from 'lucide-react';
import { gamingHubData } from '../../content/gamingData';
import { playClickSound, playSuccessChime, playWarpSound } from '../../utils/audioFeedback';
import './GamingWormholeStage.css';

interface GamingWormholeStageProps {
  isEmbedded?: boolean;
  onSwitchToMobile?: () => void;
}

export const GamingWormholeStage: React.FC<GamingWormholeStageProps> = ({
  isEmbedded = true
}) => {
  const [isWarpModalOpen, setIsWarpModalOpen] = useState(false);
  const [isWarpHovered, setIsWarpHovered] = useState(false);
  const [gravityTestCount, setGravityTestCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { baniEntertainment, halobanMedia } = gamingHubData;
  const giveaway = baniEntertainment.giveaways[0];

  // -------------------------------------------------------------
  // ACCRETION DISK & WORMHOLE PARTICLE SIMULATION (CANVAS 2D)
  // -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 720);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 570);

    const particles: {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ['#8B5CF6', '#EC4899', '#38BDF8', '#6366F1', '#F59E0B'];
    const particleCount = 140;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 40 + Math.random() * 210,
        speed: (0.008 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : 1),
        size: 1 + Math.random() * 2.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.8
      });
    }

    let rot = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const speedMultiplier = isWarpHovered ? 2.4 : 1.0;

      rot += 0.005 * speedMultiplier;

      // Draw Gravitational Singularity Core (Black Hole Glow)
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 230);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.98)');
      grad.addColorStop(0.25, 'rgba(15, 23, 42, 0.92)');
      grad.addColorStop(0.55, isWarpHovered ? 'rgba(139, 92, 246, 0.28)' : 'rgba(139, 92, 246, 0.16)');
      grad.addColorStop(0.85, isWarpHovered ? 'rgba(236, 72, 153, 0.18)' : 'rgba(56, 189, 248, 0.10)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 230, 0, Math.PI * 2);
      ctx.fill();

      // Swirling Accretion Particles
      particles.forEach((p) => {
        p.angle += p.speed * speedMultiplier;

        // Gravitational pull inward with cycle wrap
        p.radius -= 0.18 * speedMultiplier;
        if (p.radius < 32) {
          p.radius = 210 + Math.random() * 30;
          p.alpha = 0.1;
        } else if (p.alpha < 0.85) {
          p.alpha += 0.01;
        }

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * (p.radius * 0.58); // Slanted elliptical disk

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isWarpHovered ? 10 : 4;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Singularity Event Horizon Ring
      ctx.save();
      ctx.strokeStyle = isWarpHovered ? 'rgba(236, 72, 153, 0.75)' : 'rgba(139, 92, 246, 0.55)';
      ctx.lineWidth = isWarpHovered ? 2.5 : 1.5;
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = isWarpHovered ? 18 : 8;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 48, 28, rot, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 720;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 570;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isWarpHovered]);

  const handleOpenWarp = () => {
    playWarpSound();
    setIsWarpModalOpen(true);
  };

  const handleCloseWarp = () => {
    playClickSound(750, 0.04);
    setIsWarpModalOpen(false);
  };

  const handleTestGravity = () => {
    playSuccessChime();
    setGravityTestCount((c) => c + 1);
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#EC4899', '#38BDF8', '#F59E0B']
    });
  };

  return (
    <div className={`vos-gaming-stage-root ${isEmbedded ? 'embedded' : ''}`}>
      <div className="vos-gaming-desk-container">
        {/* =========================================================
            PANEL 1: THE GRAVITATIONAL QUANTUM WORMHOLE VORTEX (LEFT)
            ========================================================= */}
        <div
          className="vos-wormhole-vortex-panel"
          onMouseEnter={() => setIsWarpHovered(true)}
          onMouseLeave={() => setIsWarpHovered(false)}
          onClick={handleOpenWarp}
          title="Click to enter Quantum Wormhole"
        >
          {/* Canvas accretion disk */}
          <canvas ref={canvasRef} className="vos-wormhole-canvas" />

          {/* Atmospheric Lens Flare & Vignette */}
          <div className="vos-wormhole-vignette" />

          {/* Top HUD Status Beacon */}
          <div className="vos-wormhole-hud-top">
            <div className="vos-wormhole-status-pill">
              <span className="vos-pulsing-quantum-dot" />
              <span>QUANTUM PORTAL // RESONANCE 94.8%</span>
            </div>
            <div className="vos-wormhole-sector-badge">
              <Compass size={11} />
              <span>SECTOR 08 · HYPERDRIVE</span>
            </div>
          </div>

          {/* Center Callout Overlay */}
          <div className="vos-wormhole-center-callout">
            <motion.div
              className="vos-wormhole-icon-ring"
              animate={{
                scale: isWarpHovered ? [1, 1.08, 1] : 1,
                rotate: isWarpHovered ? 360 : 0
              }}
              transition={{
                scale: { repeat: Infinity, duration: 1.8 },
                rotate: { duration: 12, repeat: Infinity, ease: 'linear' }
              }}
            >
              <Gamepad2 size={28} className="vos-quantum-gamepad-icon" />
            </motion.div>

            <h2 className="vos-wormhole-title">THE GAMING WORMHOLE</h2>
            <p className="vos-wormhole-tagline">
              Sub-space jump point to Bani Entertainment & esports archives
            </p>

            <motion.button
              className="vos-enter-wormhole-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenWarp();
              }}
            >
              <Sparkles size={14} />
              <span>ENTER WORMHOLE</span>
            </motion.button>

            <div className="vos-wormhole-footnote">
              Click anywhere inside event horizon to initiate jump
            </div>
          </div>
        </div>

        {/* =========================================================
            PANEL 2: BANI ENTERTAINMENT DOSSIER & CREATIVE MEDIA (RIGHT)
            ========================================================= */}
        <div className="vos-gaming-dossier-panel">
          {/* Header Card: Bani Entertainment */}
          <div className="vos-dossier-creator-header">
            <div className="vos-creator-avatar-wrap">
              <img
                src={baniEntertainment.logoUrl}
                alt={baniEntertainment.title}
                className="vos-creator-avatar"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80';
                }}
              />
              <span className="vos-creator-live-badge">MLBB</span>
            </div>

            <div className="vos-creator-info">
              <div className="vos-creator-title-row">
                <h3 className="vos-creator-name">{baniEntertainment.title}</h3>
                <span className="vos-mil-badge" title="Official Moonton Influencer League">
                  <ShieldCheck size={11} />
                  <span>MIL CREATOR</span>
                </span>
              </div>
              <p className="vos-creator-sub">Mobile Legends: Bang Bang Creator Community</p>
            </div>
          </div>

          {/* Quick Stats Matrix */}
          <div className="vos-gaming-stats-matrix">
            <div className="vos-stat-card">
              <Users size={13} className="vos-stat-icon indigo" />
              <div className="vos-stat-value">15,000+</div>
              <div className="vos-stat-label">Community Followers</div>
            </div>
            <div className="vos-stat-card">
              <Trophy size={13} className="vos-stat-icon amber" />
              <div className="vos-stat-value">Moonton MIL</div>
              <div className="vos-stat-label">Verified Creator</div>
            </div>
            <div className="vos-stat-card">
              <Gift size={13} className="vos-stat-icon pink" />
              <div className="vos-stat-value">Special Skins</div>
              <div className="vos-stat-label">Supporter Rewards</div>
            </div>
          </div>

          {/* Community Giveaway Spotlight Card */}
          {giveaway && (
            <div className="vos-giveaway-spotlight-card">
              <div className="vos-giveaway-top-bar">
                <span className="vos-giveaway-tag">COMMUNITY MILESTONE</span>
                <span className="vos-giveaway-date">{giveaway.date}</span>
              </div>
              <h4 className="vos-giveaway-title">{giveaway.title}</h4>
              <p className="vos-giveaway-quote">"{giveaway.quoteMessage}"</p>
              <div className="vos-giveaway-recipient-pill">
                <span>Gifted to: <strong>{giveaway.recipient}</strong></span>
              </div>
            </div>
          )}

          {/* HaloBan Media Documentary Teaser Pill */}
          <div className="vos-haloban-teaser-card">
            <div className="vos-haloban-teaser-left">
              <Film size={14} className="vos-haloban-icon" />
              <div>
                <div className="vos-haloban-title">{halobanMedia.title}</div>
                <div className="vos-haloban-sub">Facts & Lessons // Short-Form Documentaries</div>
              </div>
            </div>
            <span className="vos-haloban-pill">3 REELS</span>
          </div>

          {/* Actions Footer */}
          <div className="vos-gaming-actions-footer">
            <a
              href={baniEntertainment.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vos-fb-channel-btn"
              onClick={() => playClickSound(850, 0.04)}
            >
              <ExternalLink size={13} />
              <span>Visit @banientertainment on FB</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          UNDER ACTIVE DEVELOPMENT SPATIAL MODAL (VISIONOS GLASS)
          ========================================================= */}
      <AnimatePresence>
        {isWarpModalOpen && (
          <motion.div
            className="vos-warp-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseWarp}
          >
            <motion.div
              className="vos-warp-modal-dialog"
              initial={{ scale: 0.9, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="vos-warp-modal-header">
                <div className="vos-warp-modal-status">
                  <span className="vos-pulsing-amber-dot" />
                  <span>SECTOR 08 // QUANTUM SINGULARITY CALIBRATING</span>
                </div>
                <button
                  className="vos-warp-modal-close"
                  onClick={handleCloseWarp}
                  title="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="vos-warp-modal-body">
                <div className="vos-warp-modal-badge-row">
                  <span className="vos-warp-badge dev">
                    <AlertTriangle size={12} />
                    <span>UNDER ACTIVE DEVELOPMENT</span>
                  </span>
                  <span className="vos-warp-badge eta">
                    <Sparkles size={12} />
                    <span>WARP ETA: Q1 2027</span>
                  </span>
                </div>

                <h3 className="vos-warp-modal-headline">
                  The Interdimensional Gaming Portal is Stabilizing
                </h3>

                <p className="vos-warp-modal-desc">
                  You have encountered the outer perimeter of the Bani Entertainment quantum
                  gateway. Warp nodes and telemetry pipelines are currently undergoing calibration
                  to host live esports tournament brackets, MLBB scrim match viewers, and
                  browser-based interactive mini-games.
                </p>

                <div className="vos-warp-progress-tracker">
                  <div className="vos-warp-progress-label">
                    <span>Quantum Stability Vector</span>
                    <span>78.4% Synchronized</span>
                  </div>
                  <div className="vos-warp-progress-bar">
                    <div className="vos-warp-progress-fill" style={{ width: '78.4%' }} />
                  </div>
                </div>

                <div className="vos-warp-interactive-callout">
                  <div className="vos-warp-callout-text">
                    <strong>Want to feel the gravitational field?</strong>
                    <span>Test particle physics by pulsing the singularity.</span>
                  </div>
                  <button
                    className="vos-warp-pulse-btn"
                    onClick={handleTestGravity}
                  >
                    <RotateCw size={13} />
                    <span>Test Quantum Gravity {gravityTestCount > 0 ? `(${gravityTestCount})` : ''}</span>
                  </button>
                </div>
              </div>

              <div className="vos-warp-modal-footer">
                <button
                  className="vos-warp-return-btn"
                  onClick={handleCloseWarp}
                >
                  Return to Orbital Desk
                </button>
                <a
                  href={baniEntertainment.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vos-warp-fb-btn"
                  onClick={() => playClickSound(850, 0.04)}
                >
                  <ExternalLink size={13} />
                  <span>Explore Creator Page</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
