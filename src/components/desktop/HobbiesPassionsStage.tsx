import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Trophy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  MapPin,
  TrendingUp,
  Zap,
  Shield,
  ExternalLink,
  RotateCcw,
  X,
  Smartphone,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { gamingHubData } from '../../content/gamingData';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './HobbiesPassionsStage.css';

interface HobbiesPassionsStageProps {
  isEmbedded?: boolean;
  onSwitchToMobile?: () => void;
}

export const HobbiesPassionsStage: React.FC<HobbiesPassionsStageProps> = ({
  onSwitchToMobile: _onSwitchToMobile
}) => {
  const { halobanMedia } = gamingHubData;
  const documentaries = halobanMedia.documentaries;

  // Portrait Cinema Screening Modal State (View media only when clicked!)
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState<boolean>(false);
  const [activeDocId, setActiveDocId] = useState<string>(documentaries[0]?.id || 'haloban-doc-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Comic Multiverse Toggle: Marvel vs DC
  const [comicUniverse, setComicUniverse] = useState<'marvel' | 'dc'>('marvel');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeDoc = documentaries.find((d) => d.id === activeDocId) || documentaries[0];

  // Open Portrait Cinema Modal
  const handleOpenCinema = (docId: string) => {
    playSuccessChime();
    setActiveDocId(docId);
    setIsCinemaModalOpen(true);
    setIsPlaying(true);
  };

  // Close Portrait Cinema Modal
  const handleCloseCinema = () => {
    playClickSound(700, 0.04);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsCinemaModalOpen(false);
  };

  // Switch episode inside modal or catalog
  const handleSelectDoc = (docId: string) => {
    playClickSound(800, 0.035);
    setActiveDocId(docId);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const handleTogglePlay = () => {
    playClickSound(850, 0.03);
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleToggleMute = () => {
    playClickSound(750, 0.03);
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    playClickSound(800, 0.03);
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleToggleUniverse = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(900, 0.04);
    setComicUniverse((prev) => (prev === 'marvel' ? 'dc' : 'marvel'));
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCinemaModalOpen) {
        handleCloseCinema();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCinemaModalOpen]);

  return (
    <div className="vos-hobbies-stage-root">
      <div className="vos-hobbies-desk-container">
        {/* =========================================================
            PANEL 1: THE OBSIDIAN PASSIONS BENTO (LEFT - 490px)
            Precisely fitted for 570px container with ZERO CUTOFF
            ========================================================= */}
        <div className="vos-hobbies-bento-panel">
          {/* Top Panel Title */}
          <div className="vos-bento-panel-header">
            <div className="vos-bento-header-icon">
              <Compass size={15} style={{ color: '#F43F5E' }} />
            </div>
            <div>
              <div className="vos-bento-title">CREATIVE OBSESSIONS</div>
              <div className="vos-bento-sub">Sports, Web3, Multiverse & Travel</div>
            </div>
          </div>

          {/* Bento Grid (2x2 perfectly proportioned with illuminated ambient watermarks) */}
          <div className="vos-bento-grid">
            {/* Card 1: Lionel Messi & Football */}
            <div className="vos-bento-card card-messi">
              {/* Ambient Vector Art Watermark */}
              <div className="vos-bento-watermark-wrap" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg messi-svg">
                  <defs>
                    <linearGradient id="messiGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38BDF8" />
                      <stop offset="0.6" stopColor="#0284C7" />
                      <stop offset="1" stopColor="#F59E0B" />
                    </linearGradient>
                    <radialGradient id="messiGlow" cx="50" cy="50" r="45">
                      <stop stopColor="#38BDF8" stopOpacity="0.25" />
                      <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="url(#messiGlow)" />
                  <ellipse cx="50" cy="50" rx="46" ry="18" stroke="url(#messiGrad)" strokeWidth="1.2" strokeDasharray="3 3" transform="rotate(-25 50 50)" />
                  <circle cx="64" cy="38" r="22" stroke="url(#messiGrad)" strokeWidth="1.6" />
                  <path d="M64 25 L56 31 L59 40 L69 40 L72 31 Z" stroke="url(#messiGrad)" strokeWidth="1.2" fill="rgba(56, 189, 248, 0.15)" />
                  <path d="M56 31 L46 33 M59 40 L54 49 M69 40 L74 49 M72 31 L82 33 M64 25 L64 16" stroke="url(#messiGrad)" strokeWidth="1" />
                  <text x="24" y="80" fontSize="28" fontWeight="900" fontFamily="system-ui, sans-serif" fill="url(#messiGrad)" letterSpacing="-1">10</text>
                  <polygon points="26,45 28,50 33,50 29,53 31,58 26,55 21,58 23,53 19,50 24,50" fill="#F59E0B" />
                </svg>
              </div>

              <div className="vos-bento-card-top">
                <div className="vos-bento-badge messi-badge">
                  <Trophy size={10} />
                  <span>THE GOAT · #10</span>
                </div>
                <span className="vos-messi-jersey">ARG 🇦🇷</span>
              </div>
              <h3 className="vos-bento-card-title">Lionel Messi & Football</h3>
              <p className="vos-bento-card-desc">
                Die-hard Lionel Messi fan. Tactical analyst following European leagues and celebrating the historic 2022 World Cup triumph.
              </p>
              <div className="vos-bento-chips-row">
                <span className="vos-bento-chip">World Cup 2022</span>
                <span className="vos-bento-chip">8x Ballon d&apos;Or</span>
                <span className="vos-bento-chip">Tactical</span>
              </div>
            </div>

            {/* Card 2: Bitcoin & Web3 Node */}
            <div className="vos-bento-card card-crypto">
              {/* Ambient Vector Art Watermark */}
              <div className="vos-bento-watermark-wrap" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg crypto-svg">
                  <defs>
                    <linearGradient id="cryptoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F59E0B" />
                      <stop offset="0.7" stopColor="#D97706" />
                      <stop offset="1" stopColor="#EA580C" />
                    </linearGradient>
                    <radialGradient id="cryptoGlow" cx="50" cy="50" r="45">
                      <stop stopColor="#F59E0B" stopOpacity="0.25" />
                      <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="url(#cryptoGlow)" />
                  <circle cx="16" cy="28" r="2.5" fill="#F59E0B" />
                  <circle cx="84" cy="24" r="2.5" fill="#F59E0B" />
                  <circle cx="86" cy="74" r="2.5" fill="#F59E0B" />
                  <circle cx="18" cy="76" r="2.5" fill="#F59E0B" />
                  <line x1="16" y1="28" x2="35" y2="40" stroke="url(#cryptoGrad)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="84" y1="24" x2="65" y2="40" stroke="url(#cryptoGrad)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="86" y1="74" x2="65" y2="60" stroke="url(#cryptoGrad)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="18" y1="76" x2="35" y2="60" stroke="url(#cryptoGrad)" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="32" stroke="url(#cryptoGrad)" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="27" stroke="url(#cryptoGrad)" strokeWidth="1" strokeDasharray="4 2" />
                  <path d="M44 32 V68 M49 32 V68 M42 37 H55 C59 37 62 39 62 43 C62 47 59 49 55 49 H44 M44 49 H57 C61 49 64 51 64 56 C64 61 61 63 57 63 H42" stroke="url(#cryptoGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              <div className="vos-bento-card-top">
                <div className="vos-bento-badge crypto-badge">
                  <TrendingUp size={10} />
                  <span>BITCOIN & WEB3</span>
                </div>
                <span className="vos-crypto-tag">SINCE 2019</span>
              </div>
              <h3 className="vos-bento-card-title">Cryptocurrency Node</h3>
              <p className="vos-bento-card-desc">
                Invested in Bitcoin since 2019. Founder of community group &quot;Crypto Enthusiastic&quot; and mentor on decentralized fundamentals.
              </p>
              <div className="vos-bento-chips-row">
                <span className="vos-bento-chip">HODL 2019</span>
                <span className="vos-bento-chip">Community Lead</span>
                <span className="vos-bento-chip">On-Chain</span>
              </div>
            </div>

            {/* Card 3: Marvel & DC Multiverse (Interactive Switch + Morphing Vector Art) */}
            <div className={`vos-bento-card card-comics ${comicUniverse}`}>
              {/* Morphing Comic Vector Art Watermark */}
              <div className="vos-bento-watermark-wrap" aria-hidden="true">
                {comicUniverse === 'marvel' ? (
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg marvel-svg">
                    <defs>
                      <linearGradient id="marvelGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F87171" />
                        <stop offset="0.7" stopColor="#EF4444" />
                        <stop offset="1" stopColor="#991B1B" />
                      </linearGradient>
                      <radialGradient id="marvelGlow" cx="50" cy="50" r="45">
                        <stop stopColor="#EF4444" stopOpacity="0.25" />
                        <stop offset="1" stopColor="#EF4444" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="url(#marvelGlow)" />
                    <circle cx="50" cy="50" r="38" stroke="url(#marvelGrad)" strokeWidth="1.5" strokeDasharray="8 3" />
                    <circle cx="50" cy="50" r="32" stroke="url(#marvelGrad)" strokeWidth="2.5" />
                    <path d="M46 22 L28 76 H38 L42 63 H56 L52 76 H63 L51 22 H46 Z M45 53 L49 37 L54 53 H45 Z" fill="url(#marvelGrad)" />
                    <path d="M50 48 L76 48 L68 40 M76 48 L68 56" stroke="url(#marvelGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg dc-svg">
                    <defs>
                      <linearGradient id="dcGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22D3EE" />
                        <stop offset="0.7" stopColor="#06B6D4" />
                        <stop offset="1" stopColor="#0E7490" />
                      </linearGradient>
                      <radialGradient id="dcGlow" cx="50" cy="50" r="45">
                        <stop stopColor="#06B6D4" stopOpacity="0.25" />
                        <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="url(#dcGlow)" />
                    <ellipse cx="50" cy="50" rx="42" ry="24" stroke="url(#dcGrad)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="36" stroke="url(#dcGrad)" strokeWidth="1.5" />
                    <path d="M50 36 L53 43 C58 41 68 42 76 36 C74 46 68 53 64 56 C71 58 78 57 82 54 C79 66 68 70 57 66 C53 71 47 71 43 66 C32 70 21 66 18 54 C22 57 29 58 36 56 C32 53 26 46 24 36 C32 42 42 41 47 43 Z" fill="url(#dcGrad)" />
                  </svg>
                )}
              </div>

              <div className="vos-bento-card-top">
                <div className={`vos-bento-badge comic-badge ${comicUniverse}`}>
                  <Zap size={10} />
                  <span>{comicUniverse === 'marvel' ? 'MARVEL' : 'DC'} LORE</span>
                </div>
                <button
                  onClick={handleToggleUniverse}
                  className="vos-comic-toggle-btn"
                  title="Switch universe"
                >
                  {comicUniverse === 'marvel' ? '⚡ Marvel' : '🦇 DC'}
                </button>
              </div>
              <h3 className="vos-bento-card-title">
                {comicUniverse === 'marvel' ? 'Marvel Cinematic Universe' : 'DC Multiverse & Gotham'}
              </h3>
              <p className="vos-bento-card-desc">
                {comicUniverse === 'marvel'
                  ? 'Lore enthusiast dissecting MCU phase timelines, character arcs, comic crossovers, and graphic novel narratives.'
                  : 'Fascinated by Gotham City lore, Justice League mythos, and philosophical graphic novels across alternate timelines.'}
              </p>
              <div className="vos-bento-chips-row">
                <span className="vos-bento-chip">{comicUniverse === 'marvel' ? 'MCU Phases' : 'Gotham Lore'}</span>
                <span className="vos-bento-chip">Graphic Novels</span>
                <span className="vos-bento-chip">Multiverse</span>
              </div>
            </div>

            {/* Card 4: Cultural Wanderlust & Indigenous Exploration */}
            <div className="vos-bento-card card-travel">
              {/* Ambient Vector Art Watermark */}
              <div className="vos-bento-watermark-wrap" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="watermark-svg wanderlust-svg">
                  <defs>
                    <linearGradient id="wanderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#34D399" />
                      <stop offset="0.7" stopColor="#10B981" />
                      <stop offset="1" stopColor="#047857" />
                    </linearGradient>
                    <radialGradient id="wanderGlow" cx="50" cy="50" r="45">
                      <stop stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="url(#wanderGlow)" />
                  <path d="M12 70 C24 55 42 62 55 50 C68 38 82 45 92 35" stroke="url(#wanderGrad)" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
                  <path d="M15 82 C30 68 46 76 60 62 C74 48 85 54 94 45" stroke="url(#wanderGrad)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" />
                  <polygon points="50,22 74,68 26,68" stroke="url(#wanderGrad)" strokeWidth="1.6" fill="rgba(16, 185, 129, 0.1)" />
                  <polygon points="68,36 88,74 48,74" stroke="url(#wanderGrad)" strokeWidth="1.3" fill="rgba(16, 185, 129, 0.06)" />
                  <path d="M43 38 L50 43 L57 38" stroke="url(#wanderGrad)" strokeWidth="1.4" fill="none" />
                  <path d="M22 24 L24 16 L26 24 L34 26 L26 28 L24 36 L22 28 L14 26 Z" fill="url(#wanderGrad)" />
                </svg>
              </div>

              <div className="vos-bento-card-top">
                <div className="vos-bento-badge travel-badge">
                  <MapPin size={10} />
                  <span>WANDERLUST</span>
                </div>
                <span className="vos-travel-tag">INDIGENOUS</span>
              </div>
              <h3 className="vos-bento-card-title">Travel & Cultural Roots</h3>
              <p className="vos-bento-card-desc">
                Exploring indigenous geographies, remote mountain topography, sacred groves, and documentary photography notes across Northeast India.
              </p>
              <div className="vos-bento-chips-row">
                <span className="vos-bento-chip">Geography</span>
                <span className="vos-bento-chip">Landscape</span>
                <span className="vos-bento-chip">Heritage Trails</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            PANEL 2: HALOBAN MEDIA DOCUMENTARY CATALOG (RIGHT - 714px)
            Zero Cutoff: Clean Cards with Click-to-View Portrait Cinema
            ========================================================= */}
        <div className="vos-hobbies-cinema-panel">
          {/* Studio Header */}
          <div className="vos-cinema-header">
            <div className="vos-cinema-brand">
              <div className="vos-cinema-logo-wrap">
                <Film size={17} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <div className="vos-cinema-title-row">
                  <span className="vos-cinema-title">{halobanMedia.title}</span>
                  <span className="vos-cinema-badge">● FACTS &amp; LESSONS</span>
                </div>
                <div className="vos-cinema-sub">Short-Form Documentary Studio · Click Any Card to Screen</div>
              </div>
            </div>

            <div className="vos-header-right-badges">
              <span className="vos-cinema-format-pill">
                <Smartphone size={11} style={{ color: '#38BDF8' }} />
                <span>9:16 REELS</span>
              </span>
              <span className="vos-cinema-co-owner-pill">CO-OWNER</span>
            </div>
          </div>

          {/* Quick Studio Highlight Banner */}
          <div className="vos-cinema-stat-bar">
            <div className="stat-pill">
              <Sparkles size={11} style={{ color: '#F59E0B' }} />
              <span>3 Curated Historical &amp; Cognitive Documentaries</span>
            </div>
            <div className="stat-pill">
              <Shield size={11} style={{ color: '#10B981' }} />
              <span>100% Fact-Checked Scripts</span>
            </div>
          </div>

          {/* 3 Curated Documentary Episode Cards (Portrait Preview Thumbnails) */}
          <div className="vos-documentaries-grid">
            {documentaries.map((doc, idx) => (
              <div
                key={doc.id}
                onClick={() => handleOpenCinema(doc.id)}
                className={`vos-doc-card ${doc.id === activeDocId ? 'featured' : ''}`}
                title={`Click to watch ${doc.title} in Portrait Cinema`}
              >
                {/* Portrait Reel Preview Frame (9:16 aspect ratio) */}
                <div className="vos-doc-card-thumbnail">
                  <video
                    src={doc.videoUrl}
                    className="vos-thumbnail-video"
                    muted
                    preload="metadata"
                  />
                  <div className="vos-thumbnail-overlay">
                    <div className="vos-thumb-play-circle">
                      <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                    </div>
                    <span className="vos-thumb-watch-label">Screen 9:16 Reel</span>
                  </div>

                  {/* Badges on Thumbnail */}
                  <div className="vos-thumb-top-badges">
                    <span className="vos-thumb-ep-badge">EP 0{idx + 1}</span>
                    <span className="vos-thumb-duration-badge">
                      <Clock size={9} />
                      <span>{doc.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="vos-doc-card-content">
                  <div className="vos-doc-category">{doc.category}</div>
                  <h4 className="vos-doc-title">{doc.title}</h4>
                  <p className="vos-doc-snippet">{doc.description}</p>

                  <div className="vos-doc-card-footer">
                    <span className="vos-doc-watch-cta">
                      <span>Watch Reel</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Production Pipeline & Channel Link */}
          <div className="vos-cinema-footer-bar">
            <div className="pipeline-flow">
              <span className="pipeline-label">PIPELINE:</span>
              <span className="pipeline-step">01 Fact Verification</span>
              <span className="pipeline-arrow">→</span>
              <span className="pipeline-step">02 60s Script Hook</span>
              <span className="pipeline-arrow">→</span>
              <span className="pipeline-step">03 Kinetic Visual Editing</span>
            </div>

            <a
              href={gamingHubData.baniEntertainment.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="vos-cinema-ext-btn"
              title="Visit HaloBan Media on Facebook"
            >
              <span>HaloBan Media</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          PORTRAIT CINEMA MODAL (OPENS ON CLICK)
          Dedicated 9:16 Vertical Smartphone Viewport with Zero Distortion
          ========================================================= */}
      <AnimatePresence>
        {isCinemaModalOpen && (
          <motion.div
            className="vos-cinema-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseCinema}
          >
            <motion.div
              className="vos-cinema-modal-shell"
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button at top-right */}
              <button
                onClick={handleCloseCinema}
                className="vos-modal-close-btn"
                title="Close Portrait Screening (Esc)"
              >
                <X size={18} />
              </button>

              {/* Left Side: Authentic 9:16 Portrait Smartphone Rig */}
              <div className="vos-phone-cinema-rig">
                <div className="vos-phone-bezel">
                  {/* Phone Top Notch / Speaker Bar */}
                  <div className="vos-phone-notch-bar">
                    <span className="vos-phone-camera-lens" />
                    <span className="vos-phone-speaker" />
                  </div>

                  {/* Native 9:16 Video Canvas */}
                  <div className="vos-phone-screen-frame">
                    <video
                      ref={videoRef}
                      key={activeDoc.videoUrl}
                      src={activeDoc.videoUrl}
                      className="vos-portrait-video"
                      autoPlay
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      onClick={handleTogglePlay}
                    />

                    {/* Overlay Play/Pause indicator when paused */}
                    {!isPlaying && (
                      <button
                        onClick={handleTogglePlay}
                        className="vos-portrait-play-overlay"
                        title="Resume Video"
                      >
                        <div className="play-pulse-circle">
                          <Play size={26} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                        </div>
                        <span>Paused</span>
                      </button>
                    )}

                    {/* Floating Vertical Player Controls */}
                    <div className="vos-portrait-controls-bar">
                      <button
                        onClick={handleTogglePlay}
                        className="portrait-ctrl-btn"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} fill="#FFFFFF" />}
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                        className="portrait-ctrl-btn"
                        title="Replay from start"
                      >
                        <RotateCcw size={12} />
                      </button>

                      <span className="portrait-badge-label">
                        EP 0{activeDoc.episodeNumber} · {activeDoc.badge}
                      </span>

                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                        <button
                          onClick={handleToggleMute}
                          className="portrait-ctrl-btn"
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        </button>

                        <button
                          onClick={handleFullscreen}
                          className="portrait-ctrl-btn"
                          title="Fullscreen"
                        >
                          <Maximize2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Episode Inspector & Research Brief */}
              <div className="vos-modal-sidebar">
                <div className="vos-sidebar-header">
                  <div className="vos-sidebar-tag">
                    <Film size={13} style={{ color: '#F59E0B' }} />
                    <span>HALOBAN MEDIA DOCUMENTARY</span>
                  </div>
                  <h3 className="vos-sidebar-title">{activeDoc.title}</h3>
                  <div className="vos-sidebar-category">{activeDoc.category}</div>
                </div>

                {/* Episode Switcher Buttons */}
                <div className="vos-modal-ep-switcher">
                  <span className="switcher-heading">SWITCH EPISODE:</span>
                  <div className="switcher-buttons-row">
                    {documentaries.map((doc, idx) => (
                      <button
                        key={doc.id}
                        onClick={() => handleSelectDoc(doc.id)}
                        className={`modal-ep-tab ${doc.id === activeDocId ? 'active' : ''}`}
                      >
                        <span className="tab-ep">EP 0{idx + 1}</span>
                        <span className="tab-name">{doc.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Research Paragraph */}
                <div className="vos-sidebar-research-card">
                  <div className="research-card-title">
                    <Shield size={12} style={{ color: '#10B981' }} />
                    <span>Verified Research Premise</span>
                  </div>
                  <p className="research-card-desc">{activeDoc.description}</p>
                </div>

                {/* Topics & Highlights Tags */}
                <div className="vos-sidebar-tags-row">
                  {activeDoc.highlights.map((tag) => (
                    <span key={tag} className="sidebar-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="vos-sidebar-footer">
                  <div className="verified-badge">
                    <Sparkles size={12} style={{ color: '#F59E0B' }} />
                    <span>88-Second High-Retention Hook Format</span>
                  </div>

                  <button onClick={handleCloseCinema} className="vos-sidebar-close-btn">
                    Done Watching
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
