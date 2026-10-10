import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { SendToPhoneModal } from './SendToPhoneModal';
import { MatrixRainOverlay } from './MatrixRainOverlay';
import { HeroPoster } from './HeroPoster';
import { UnifiedEngineeringStage } from './UnifiedEngineeringStage';
import { CinematicBootIntro } from './CinematicBootIntro';
import { playSwishSound, playSuccessChime } from '../../utils/audioFeedback';

gsap.registerPlugin(ScrollTrigger);

interface DesktopExhibitionProps {
  onSwitchToMobile: () => void;
}

// Target normalized scroll positions for the 10 Acts (Mapped to 21.0s master timeline)
const ACT_PROGRESS_MAP: Record<string, number> = {
  'act-hero': 0.00,
  'act-apps': 0.088,
  'act-vault': 0.162,
  'act-books': 0.236,
  'act-research': 0.310,
  'act-education': 0.384,
  'act-media': 0.458,
  'act-gaming': 0.532,
  'act-experience': 0.606,
  'act-hobbies': 0.680,
  'act-author': 0.754,
  'act-words': 0.865,
  'act-contact': 0.955
};

// Ordered list of the Acts
const ACT_KEYS = [
  'act-hero',
  'act-apps',
  'act-vault',
  'act-books',
  'act-research',
  'act-education',
  'act-media',
  'act-gaming',
  'act-experience',
  'act-hobbies',
  'act-author',
  'act-words',
  'act-contact'
] as const;

export const DesktopExhibition: React.FC<DesktopExhibitionProps> = ({ onSwitchToMobile }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

  // DOM References for Pinned Stage and Act Layers
  const scrollSpineRef = useRef<HTMLDivElement | null>(null);
  const stageViewportRef = useRef<HTMLDivElement | null>(null);
  const act1Ref = useRef<HTMLDivElement | null>(null);
  const actEngineeringStageRef = useRef<HTMLDivElement | null>(null);

  // Dynamic mode for persistent spatial stage (Acts 02 to 13)
  const [unifiedActMode, setUnifiedActMode] = useState<
    'act-apps' | 'act-vault' | 'act-books' | 'act-research' | 'act-education' | 'act-media' | 'act-gaming' | 'act-experience' | 'act-hobbies' | 'act-author' | 'act-words' | 'act-contact'
  >('act-apps');

  // 0. Force clean start at top on mount & disable browser scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // 1. DevTools Console Greeting
  useEffect(() => {
    console.log(
      '%c BANISHWOR ATHOKPAM // 2026 DIGITAL MONOGRAPH ',
      'background: #4F46E5; color: #FFFFFF; font-size: 15px; font-weight: 800; padding: 6px 14px; border-radius: 6px;'
    );
    console.log(
      '%c Built with React 18, TypeScript, GSAP Pinned Scrollytelling & Web Audio API. Feel free to connect: banishworath@gmail.com ',
      'color: #818CF8; font-size: 12px; font-family: monospace; line-height: 1.6;'
    );
  }, []);

  // 2. Typing 'matrix' anywhere activates Matrix Rain
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-6);
      if (keyBuffer === 'matrix') {
        playSuccessChime();
        setIsMatrixOpen(true);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // 3. Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          playSuccessChime();
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 }
          });
          alert('🎮 GOD MODE UNLOCKED: "Your friend Banishwor gifted you Susanoo skin... Enjoy your Day! 👍"');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, []);

  // 4. Keyboard Fast-Lane Navigation (1 to 9 keys or Arrow keys)
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const actKeys: Record<string, string> = {
        '1': 'act-hero',
        '2': 'act-apps',
        '3': 'act-vault',
        '4': 'act-books',
        '5': 'act-research',
        '6': 'act-education',
        '7': 'act-media',
        '8': 'act-gaming',
        '9': 'act-experience',
        '0': 'act-hobbies',
        'h': 'act-hobbies',
        'H': 'act-hobbies',
        'b': 'act-author',
        'B': 'act-author',
        'w': 'act-experience',
        'W': 'act-experience',
        'g': 'act-gaming',
        'G': 'act-gaming',
        'm': 'act-media',
        'M': 'act-media'
      };

      if (actKeys[e.key]) {
        e.preventDefault();
        jumpToAct(actKeys[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, []);

  // 5. MASTER GSAP SCROLLYTELLING ENGINE: Pinned Viewport + Scrubbed Timeline
  useEffect(() => {
    const spine = scrollSpineRef.current;
    if (!spine) return;

    const ctx = gsap.context(() => {
      // Master scrubbed timeline bound to virtual scroll spine
      // Total Timeline Duration: 18.6s with clean sequential non-overlapping stages
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: spine,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
          onUpdate: (self) => {
            const p = self.progress;
            let closestAct: string = ACT_KEYS[0];
            let minDiff = 999;
            ACT_KEYS.forEach(key => {
              const diff = Math.abs(p - (ACT_PROGRESS_MAP[key] ?? 0));
              if (diff < minDiff) {
                minDiff = diff;
                closestAct = key;
              }
            });
            const idx = ACT_KEYS.indexOf(closestAct as any);
            if (idx !== -1 && !isTransitioningRef.current) {
              currentActIndexRef.current = idx;
            }

            // Morph inner persistent stage mode across Acts 02 to 12 (100% stationary room!)
            if (p < 0.125) {
              setUnifiedActMode('act-apps');
            } else if (p < 0.199) {
              setUnifiedActMode('act-vault');
            } else if (p < 0.273) {
              setUnifiedActMode('act-books');
            } else if (p < 0.347) {
              setUnifiedActMode('act-research');
            } else if (p < 0.421) {
              setUnifiedActMode('act-education');
            } else if (p < 0.495) {
              setUnifiedActMode('act-media');
            } else if (p < 0.569) {
              setUnifiedActMode('act-gaming');
            } else if (p < 0.643) {
              setUnifiedActMode('act-experience');
            } else if (p < 0.717) {
              setUnifiedActMode('act-hobbies');
            } else if (p < 0.810) {
              setUnifiedActMode('act-author');
            } else if (p < 0.910) {
              setUnifiedActMode('act-words');
            } else {
              setUnifiedActMode('act-contact');
            }
          }
        }
      });

      // -------------------------------------------------------------
      // ACT 1: Monograph Poster Hero
      // 0.0s -> 1.2s: Dwells in center
      // 1.2s -> 2.0s: Recedes softly into distance (-10% scale, subtle lift, fade)
      // -------------------------------------------------------------
      if (act1Ref.current) {
        masterTL.to(
          act1Ref.current,
          {
            scale: 0.92,
            yPercent: -12,
            autoAlpha: 0,
            ease: 'power2.inOut',
            duration: 0.8
          },
          1.2
        );
      }

      // -------------------------------------------------------------
      // ACT 02 TO ACT 13: UNIFIED PERSISTENT SPATIAL STAGE (Acts 02 - 13)
      // 1.2s -> 2.0s: Unfolds forward from deep spatial Z-plane (scale 0.88 -> 1, rotateX 5 -> 0)
      // 2.0s -> 27.0s: STAYS 100% PERSISTENT & ANCHORED IN CENTER ACROSS ENTIRE EXHIBITION
      // (Scroll progress smoothly morphs inner cards between Acts 02 - 13 without whole-page slide or room tear-down!)
      // -------------------------------------------------------------
      if (actEngineeringStageRef.current) {
        masterTL.fromTo(
          actEngineeringStageRef.current,
          {
            scale: 0.88,
            y: 50,
            rotateX: 5,
            autoAlpha: 0,
            transformOrigin: '50% 60%'
          },
          {
            scale: 1.0,
            y: 0,
            rotateX: 0,
            autoAlpha: 1,
            ease: 'power2.out',
            duration: 0.8
          },
          1.2
        );
      }

      // Anchor end to complete 27.0s duration
      masterTL.to({}, { duration: 2.4 }, 24.6);
    }, spine);

    return () => ctx.revert();
  }, []);

  const currentActIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Jump to specific Act smoothly via GSAP tween
  const jumpToAct = (actId: string) => {
    playSwishSound();
    if (actId === 'act-apps') {
      setUnifiedActMode('act-apps');
    } else if (actId === 'act-vault') {
      setUnifiedActMode('act-vault');
    } else if (actId === 'act-books') {
      setUnifiedActMode('act-books');
    } else if (actId === 'act-research') {
      setUnifiedActMode('act-research');
    } else if (actId === 'act-education') {
      setUnifiedActMode('act-education');
    } else if (actId === 'act-media') {
      setUnifiedActMode('act-media');
    } else if (actId === 'act-gaming') {
      setUnifiedActMode('act-gaming');
    } else if (actId === 'act-experience') {
      setUnifiedActMode('act-experience');
    } else if (actId === 'act-hobbies') {
      setUnifiedActMode('act-hobbies');
    } else if (actId === 'act-author') {
      setUnifiedActMode('act-author');
    } else if (actId === 'act-words') {
      setUnifiedActMode('act-words');
    } else if (actId === 'act-contact') {
      setUnifiedActMode('act-contact');
    }

    const idx = ACT_KEYS.indexOf(actId as any);
    if (idx !== -1) {
      currentActIndexRef.current = idx;
    }

    const progress = ACT_PROGRESS_MAP[actId] ?? 0;
    const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
    const targetScrollY = progress * maxScroll;

    isTransitioningRef.current = true;
    lastScrollTimeRef.current = Date.now();

    const scrollProxy = { y: window.scrollY };
    gsap.killTweensOf(scrollProxy);
    gsap.to(scrollProxy, {
      y: targetScrollY,
      duration: 0.42,
      ease: 'power2.out',
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y);
        ScrollTrigger.update();
      },
      onComplete: () => {
        isTransitioningRef.current = false;
      }
    });
  };

  // Section Snapping: Strictly advances exactly 1 Act per wheel gesture
  // Prevents overshooting past Act 2 into Act 3
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If modal or matrix is open, do not intercept
      if (isQRModalOpen || isMatrixOpen) return;

      // Allow scrolling inside internal scrollable elements (e.g., book shelf list, phone screen, research & academic lists, epilogue letter, contact channels)
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.vos-shelf-scroll, .scrollable-area, .vos-phone-screen, .vos-phone-interactive-area, .research-hpc-cards-list, .research-takeaways-grid, .academic-degrees-list, .academic-modal-body, .vos-letter-body-scrollable, .vos-channel-cards-list, .vos-social-grid')) {
        return;
      }

      // Intercept wheel so native continuous scroll cannot overshoot
      e.preventDefault();

      const now = Date.now();
      // Guard against wheel momentum / multiple ticks: 380ms responsive debounce + transition lock
      if (isTransitioningRef.current || now - lastScrollTimeRef.current < 380) {
        return;
      }

      if (Math.abs(e.deltaY) < 12) return; // filter trackpad noise

      const currentIndex = currentActIndexRef.current;
      let nextIndex = currentIndex;

      if (e.deltaY > 0) {
        // Move forward by strictly 1 Act (0 -> 1 = Hero -> Books)
        nextIndex = Math.min(ACT_KEYS.length - 1, currentIndex + 1);
      } else {
        // Move backward by strictly 1 Act
        nextIndex = Math.max(0, currentIndex - 1);
      }

      if (nextIndex === currentIndex) return;

      currentActIndexRef.current = nextIndex;
      const targetActId = ACT_KEYS[nextIndex];
      jumpToAct(targetActId);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isQRModalOpen, isMatrixOpen]);

  return (
    <>
      {/* 
        VIRTUAL SCROLL SPINE:
        Provides the scroll height (800vh) for the mouse wheel,
        while the visible content remains locked in a 100vh pinned stage.
      */}
      <div
        ref={scrollSpineRef}
        style={{
          width: '100%',
          height: '800vh',
          position: 'relative',
          pointerEvents: 'none'
        }}
      />

      {/* 
        PINNED VIEWPORT STAGE:
        Stays 100% fixed at 100vw x 100vh. Never moves vertically.
        All elements glide in horizontally from the sides via GSAP scrub.
      */}
      <div
        ref={stageViewportRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: '#070B14',
          color: '#F8FAFC',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          overflow: 'hidden',
          perspective: '1400px',
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      >
        {/* Ambient Radial Mesh Lights */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.16) 0%, rgba(7, 11, 20, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(7, 11, 20, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* ========================================================
            ACT I: THE MONOGRAPH POSTER HERO (0.00 -> 0.16)
        ======================================================== */}
        <section
          ref={act1Ref}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 10,
            willChange: 'transform, opacity',
            overflow: 'hidden'
          }}
        >
          <HeroPoster
            key={isIntroActive ? 'booting' : 'active'}
            onExploreWorks={() => jumpToAct('act-apps')}
            onExploreApps={() => jumpToAct('act-apps')}
            onExploreArchive={() => jumpToAct('act-words')}
            onSwitchToMobile={onSwitchToMobile}
            onOpenQR={() => setIsQRModalOpen(true)}
            onTriggerMatrix={() => {
              playSuccessChime();
              setIsIntroActive(true);
            }}
            onJumpToNext={() => jumpToAct('act-apps')}
          />
        </section>

        {/* ========================================================
            ACT II TO ACT XII: UNIFIED PERSISTENT SPATIAL ENGINEERING STAGE
            (Acts 02 - 12 in a Stationary Sunlit Architectural Room)
        ======================================================== */}
        <section
          ref={actEngineeringStageRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            visibility: 'hidden',
            opacity: 0,
            willChange: 'transform, opacity',
            overflow: 'hidden'
          }}
        >
          <UnifiedEngineeringStage
            activeAct={unifiedActMode}
            onNavigateAct={(targetAct) => jumpToAct(targetAct)}
            onRestartJourney={() => jumpToAct('act-hero')}
            onSwitchToMobile={onSwitchToMobile}
            onExploreNext={() => {
              if (unifiedActMode === 'act-apps') jumpToAct('act-vault');
              else if (unifiedActMode === 'act-vault') jumpToAct('act-books');
              else if (unifiedActMode === 'act-books') jumpToAct('act-research');
              else if (unifiedActMode === 'act-research') jumpToAct('act-education');
              else if (unifiedActMode === 'act-education') jumpToAct('act-media');
              else if (unifiedActMode === 'act-media') jumpToAct('act-gaming');
              else if (unifiedActMode === 'act-gaming') jumpToAct('act-experience');
              else if (unifiedActMode === 'act-experience') jumpToAct('act-hobbies');
              else if (unifiedActMode === 'act-hobbies') jumpToAct('act-author');
              else if (unifiedActMode === 'act-author') jumpToAct('act-words');
              else jumpToAct('act-contact');
            }}
          />
        </section>
      </div>

      {/* Beam to Phone QR Code Modal */}
      <SendToPhoneModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Matrix Rain Canvas Overlay */}
      <MatrixRainOverlay
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
      />

      {/* Cinematic Terminal & Meitei Mayek Matrix Boot Intro */}
      {isIntroActive && (
        <CinematicBootIntro
          onComplete={() => {
            sessionStorage.setItem('bani_os_intro_played', 'true');
            setIsIntroActive(false);
          }}
        />
      )}
    </>
  );
};
