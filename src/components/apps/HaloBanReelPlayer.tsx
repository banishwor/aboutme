import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HaloBanDocumentary } from '../../content/gamingData';
import { X, Volume2, VolumeX, Play, Pause, ChevronUp } from 'lucide-react';

interface HaloBanReelPlayerProps {
  documentaries: HaloBanDocumentary[];
  initialIndex?: number;
  onClose: () => void;
  logoUrl: string;
}

export const HaloBanReelPlayer: React.FC<HaloBanReelPlayerProps> = ({
  documentaries,
  initialIndex = 0,
  onClose,
  logoUrl
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlaySplash, setShowPlaySplash] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const lastWheelTime = useRef<number>(0);

  // Manage video playback when currentIndex changes
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.muted = isMuted;
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser auto-play policy prevented unmuted playback, mute and retry
              vid.muted = true;
              setIsMuted(true);
              vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            });
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    setProgress(0);
  }, [currentIndex, isMuted]);

  // Handle active video time update
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.duration) {
      setProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  // Navigate next / prev strictly via gestures
  const goToNext = useCallback(() => {
    if (currentIndex < documentaries.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setHasSwipedOnce(true);
    }
  }, [currentIndex, documentaries.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    // Apply rubber-band resistance at top and bottom bounds
    if ((currentIndex === 0 && diff > 0) || (currentIndex === documentaries.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null) return;
    const swipeThreshold = 55;
    const duration = Date.now() - touchStartTime.current;
    const velocity = Math.abs(dragOffset) / Math.max(duration, 1);

    // Fast flick or passed threshold
    if (dragOffset < -swipeThreshold || (dragOffset < -25 && velocity > 0.45)) {
      goToNext();
    } else if (dragOffset > swipeThreshold || (dragOffset > 25 && velocity > 0.45)) {
      goToPrev();
    }

    touchStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse wheel / trackpad gesture support for desktop preview
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return; // Debounce wheel
    if (e.deltaY > 30) {
      goToNext();
      lastWheelTime.current = now;
    } else if (e.deltaY < -30) {
      goToPrev();
      lastWheelTime.current = now;
    }
  };

  // Tap video to Play / Pause
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    if (currentVideo.paused) {
      currentVideo.play();
      setIsPlaying(true);
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
    setShowPlaySplash(true);
    setTimeout(() => setShowPlaySplash(false), 600);
  };

  // Toggle Sound
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.muted = newMuted;
    }
  };

  const currentDoc = documentaries[currentIndex];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#000000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* ================= 1. REEL SLIDER VIEWPORT ================= */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `translateY(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.05)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {documentaries.map((doc, idx) => (
            <div
              key={doc.id}
              onClick={togglePlayPause}
              style={{
                width: '100%',
                height: '100%',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#020617',
                cursor: 'pointer'
              }}
            >
              {/* 9:16 Portrait HTML5 Video */}
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={doc.videoUrl}
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={idx === currentIndex ? handleTimeUpdate : undefined}
                preload={Math.abs(idx - currentIndex) <= 1 ? 'auto' : 'none'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Gradient Vignette Overlays for Crisp Text Legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.88) 100%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Play / Pause Splash Indicator */}
        {showPlaySplash && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              pointerEvents: 'none',
              animation: 'reelSplashFade 0.6s ease forwards',
              zIndex: 30
            }}
          >
            {isPlaying ? <Play size={32} fill="#FFFFFF" /> : <Pause size={32} fill="#FFFFFF" />}
          </div>
        )}

        {/* ================= 2. TOP ACTION BAR ================= */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 40,
            pointerEvents: 'none'
          }}
        >
          {/* Channel Brand Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(16px)',
              padding: '5px 12px 5px 6px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              pointerEvents: 'auto'
            }}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid rgba(96, 165, 250, 0.6)'
              }}
            >
              <img src={logoUrl} alt="HaloBan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: 1.2 }}>
                HaloBan Media
              </span>
              <span style={{ fontSize: '9px', color: '#93C5FD', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                SHORTS THEATER
              </span>
            </div>
          </div>

          {/* Right Action Icons: Sound Toggle & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: isMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(59, 130, 246, 0.35)',
                backdropFilter: 'blur(16px)',
                border: isMuted ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(96, 165, 250, 0.5)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isMuted ? <VolumeX size={18} color="#FCA5A5" /> : <Volume2 size={18} color="#93C5FD" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Shorts Player"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Unmute Prompt Banner if currently muted */}
        {isMuted && (
          <div
            onClick={toggleSound}
            style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              color: '#93C5FD',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              zIndex: 40,
              animation: 'pulse 2s infinite'
            }}
          >
            <VolumeX size={14} />
            <span>Tap for Sound 🔊</span>
          </div>
        )}

        {/* ================= 3. RIGHT SIDE REEL STEPPER (DOTS ONLY, ZERO BUTTONS) ================= */}
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 40,
            pointerEvents: 'none'
          }}
        >
          {documentaries.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentIndex ? '6px' : '5px',
                height: i === currentIndex ? '22px' : '6px',
                borderRadius: '999px',
                background: i === currentIndex ? '#60A5FA' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: i === currentIndex ? '0 0 10px rgba(96, 165, 250, 0.8)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            />
          ))}
        </div>

        {/* First-time swipe up hint */}
        {!hasSwipedOnce && currentIndex === 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '140px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              animation: 'bounceUp 1.8s infinite',
              zIndex: 35
            }}
          >
            <ChevronUp size={20} color="#60A5FA" />
            <span>Swipe up for next short</span>
          </div>
        )}

        {/* ================= 4. BOTTOM DOCUMENTARY DETAILS OVERLAY ================= */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            right: 0,
            padding: '16px 16px 8px',
            zIndex: 40,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Metadata Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(96, 165, 250, 0.5)',
                color: '#BFDBFE'
              }}
            >
              EPISODE {currentDoc.episodeNumber}
            </span>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.25)',
                border: '1px solid rgba(245, 158, 11, 0.45)',
                color: '#FDE68A'
              }}
            >
              {currentDoc.badge}
            </span>
            <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
              • {currentDoc.category}
            </span>
          </div>

          {/* Documentary Title */}
          <h2
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)'
            }}
          >
            {currentDoc.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: '11.5px',
              color: '#E2E8F0',
              margin: 0,
              lineHeight: 1.45,
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
              maxWidth: '92%'
            }}
          >
            {currentDoc.description}
          </p>

          {/* Takeaway Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingTop: '2px' }}>
            {currentDoc.highlights.map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#93C5FD',
                  background: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(8px)',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  border: '1px solid rgba(96, 165, 250, 0.25)'
                }}
              >
                #{h}
              </span>
            ))}
          </div>

          {/* Real-Time Bottom Scrub Bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginTop: '6px'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                borderRadius: '999px',
                boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
