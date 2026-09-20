import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  ExternalLink, 
  ArrowUp, 
  Heart, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Info, 
  X,
  Compass,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { 
  athokpamFamilyMembers, 
  CLAN_METADATA, 
  AthokpamMember, 
  getOptimizedPhotoUrl 
} from '../../content/athokpamTreeData';

interface RootsAppProps {
  onClose?: () => void;
  onTouchStartHandle?: (e: React.TouchEvent) => void;
  onTouchMoveHandle?: (e: React.TouchEvent) => void;
  onTouchEndHandle?: (e: React.TouchEvent) => void;
}

// 13 Storytelling Beats defining the pinned generational odyssey
const TOTAL_BEATS = 13;

const BEAT_DESCRIPTIONS = [
  { beat: 0, gen: 1, title: "Tonu Athokpamcha", sub: "19th Century Founding Patriarch", era: "1850s" },
  { beat: 1, gen: 1, title: "Tonu ⚭ Kola Yumnam", sub: "First Recorded Marriage Union", era: "1850s" },
  { beat: 2, gen: 2, title: "Descent of Tolen", sub: "Lineage Carrier Sprouts (Gen 2)", era: "Late 19th C." },
  { beat: 3, gen: 2, title: "Tolen ⚭ Shajoubi", sub: "Union with Lourembam Clan", era: "Late 19th C." },
  { beat: 4, gen: 2, title: "Generational Handover", sub: "Tolen & Shajoubi Take Center Stage", era: "1900s" },
  { beat: 5, gen: 3, title: "Descent of Thaniljao", sub: "The Settlement Pillar (Gen 3)", era: "Early 20th C." },
  { beat: 6, gen: 3, title: "Thaniljao ⚭ Thouranishabi", sub: "Union with Asem Clan", era: "1910s" },
  { beat: 7, gen: 3, title: "Generational Handover", sub: "Thaniljao & Thouranishabi Ascend", era: "1920s" },
  { beat: 8, gen: 4, title: "Descent of Master Shamu ⚭ Mangolngambi", sub: "The Renowned Educator (Gen 4)", era: "1930s–50s" },
  { beat: 9, gen: 4, title: "Generational Handover", sub: "Master Shamu Takes Center Stage", era: "1950s" },
  { beat: 10, gen: 5, title: "Descent of Basanta ⚭ Anita", sub: "Parents & Guardians (Gen 5)", era: "1967–Present" },
  { beat: 11, gen: 6, title: "The Three Sons of Gen 6", sub: "Banikanta (Left) · Banishwor (Mid) · Bishwal (Right)", era: "1990s–Present" },
  { beat: 12, gen: 6, title: "Banishwor Athokpam", sub: "The Modern Custodian (Gen 6 Climax)", era: "1997–Present" }
];

export const RootsApp: React.FC<RootsAppProps> = ({ 
  onClose,
  onTouchStartHandle,
  onTouchMoveHandle,
  onTouchEndHandle 
}) => {
  const [selectedMember, setSelectedMember] = useState<AthokpamMember | null>(null);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<any>(null);
  const isCodeScrollingRef = useRef<boolean>(false);

  // Quick lookup dictionary for verified members
  const memberMap = useMemo(() => {
    const map = new Map<string, AthokpamMember>();
    athokpamFamilyMembers.forEach(m => map.set(m.id, m));
    return map;
  }, []);

  // Primary Lineage Actors
  const tonu = memberMap.get("67d85ca0-7224-40eb-b4bc-cc93a0ef321b")!;
  const kola = memberMap.get("da98a412-863c-4a91-9577-536d778428e0")!;
  const tolen = memberMap.get("ceb83b61-35ec-43d8-993e-211f06054a51")!;
  const shajoubi = memberMap.get("f38ac771-75d2-4099-bd95-17e441c9ba6a")!;
  const thaniljao = memberMap.get("6f37e528-1bb4-4739-9c37-f656292dd13d")!;
  const thouranishabi = memberMap.get("f74e238c-5f56-40ce-8b01-e59be4b97cc2")!;
  const ningthou = memberMap.get("ab2d84c3-8780-4b41-9793-3c34ce042a27")!;
  const shamu = memberMap.get("11bdaa40-dd32-46e0-be5b-7b03e4778b69")!;
  const mangolngambi = memberMap.get("b8f95465-6bbf-40a0-9e3d-5b028b8759e5")!;
  const basanta = memberMap.get("019ac88e-984e-46b2-a273-f739b80c0546")!;
  const anita = memberMap.get("fe01ce14-a712-42a1-a029-aff99d3035a9")!;
  const banishwor = memberMap.get("b0188c5f-41be-4212-b83f-41d9f30b1638")!;
  const banikanta = memberMap.get("528989ea-51fb-4df4-bdf7-c3397e9e0801")!;
  const bishwal = memberMap.get("123b587b-1b11-404f-b2dc-0ed2406cc358")!;

  // Collateral Uncle Priyokumar
  const priyokumar = memberMap.get("87d69f91-17e5-4b48-82b2-6e5f9ca4b5da")!;

  // Handle Scroll to scrub through the 13 storytelling beats
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
    setGlobalProgress(progress * 100);

    // Compute active beat
    const exactBeat = progress * (TOTAL_BEATS - 1);
    const beatIndex = Math.min(TOTAL_BEATS - 1, Math.floor(exactBeat));

    setCurrentBeat(beatIndex);

    // If manual scroll occurs while auto-playing, pause gracefully
    if (!isCodeScrollingRef.current && isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    }
  }, [isAutoPlaying]);

  // Jump to specific beat via code
  const goToBeat = useCallback((targetBeat: number) => {
    if (!containerRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL_BEATS - 1, targetBeat));
    const { scrollHeight, clientHeight } = containerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const targetScroll = (clamped / (TOTAL_BEATS - 1)) * maxScroll;

    isCodeScrollingRef.current = true;
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setCurrentBeat(clamped);

    setTimeout(() => {
      isCodeScrollingRef.current = false;
    }, 600);
  }, []);

  const scrollToMe = () => {
    goToBeat(12);
  };

  const scrollToOrigins = () => {
    goToBeat(0);
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      return;
    }

    setIsAutoPlaying(true);
    let nextBeat = currentBeat >= TOTAL_BEATS - 1 ? 0 : currentBeat + 1;
    goToBeat(nextBeat);

    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        if (prev >= TOTAL_BEATS - 1) {
          setIsAutoPlaying(false);
          clearInterval(autoPlayIntervalRef.current);
          return prev;
        }
        const nxt = prev + 1;
        goToBeat(nxt);
        return nxt;
      });
    }, 2900);
  };

  useEffect(() => {
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, []);

  const activeMeta = BEAT_DESCRIPTIONS[currentBeat] || BEAT_DESCRIPTIONS[0];
  const isFinalBeat = currentBeat === 12;

  // Unified Camera Y offset tracking the continuous lineage trunk
  const cameraY = useMemo(() => {
    if (currentBeat <= 3) return 0;       // Gen 1 at top, Gen 2 below
    if (currentBeat <= 6) return -156;    // Gen 2 at top, Gen 3 below
    if (currentBeat <= 8) return -312;    // Gen 3 at top, Gen 4 below
    if (currentBeat <= 10) return -468;   // Gen 4 at top, Gen 5 below
    if (currentBeat === 11) return -624;  // Gen 5 at top, Gen 6 (3 sons) below
    return -660;                          // Beat 12: Gen 6 glides up as it dissolves
  }, [currentBeat]);

  // Render individual ancestor card
  const renderPersonCard = (
    person: AthokpamMember, 
    role: 'patriarch' | 'spouse' | 'child', 
    accentColor: string,
    customStyle?: React.CSSProperties
  ) => (
    <div
      onClick={() => setSelectedMember(person)}
      className="pressable"
      style={{
        width: '138px',
        background: 'rgba(15, 23, 42, 0.92)',
        borderRadius: '16px',
        padding: '10px 8px',
        border: `1.5px solid ${accentColor}`,
        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 14px ${accentColor}33`,
        cursor: 'pointer',
        textAlign: 'center',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'box-shadow 0.2s ease',
        flexShrink: 0,
        boxSizing: 'border-box',
        ...customStyle
      }}
    >
      {/* Avatar Container */}
      <div style={{
        width: '46px',
        height: '46px',
        margin: '0 auto 6px',
        borderRadius: '14px',
        background: '#1E293B',
        border: `1px solid ${accentColor}`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {person.photoUrl ? (
          <img 
            src={getOptimizedPhotoUrl(person.photoUrl)} 
            alt={person.firstName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <span style={{ fontSize: '16px', fontWeight: 800, color: accentColor }}>
            {person.firstName[0]}
          </span>
        )}
      </div>

      {/* Name & Subtitle */}
      <div style={{
        fontSize: '11.5px',
        fontWeight: 700,
        color: '#FFFFFF',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {person.firstName} {person.lastName}
      </div>
      <div style={{
        fontSize: '9.5px',
        color: '#94A3B8',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '1px'
      }}>
        {role === 'spouse' ? 'Spouse' : (role === 'child' ? 'Child (Successor)' : 'Patriarch')}
      </div>
    </div>
  );

  // Reusable Anchored Two-Column Union Pair Component (Total Width = 330px)
  // Left Column (138px) is ALWAYS anchored. It NEVER shifts horizontally!
  const renderUnionRow = (
    patriarch: AthokpamMember,
    spouse: AthokpamMember,
    patriarchAccent: string,
    isSpouseVisible: boolean,
    isLineDrawing: boolean,
    isPatriarchBloom: boolean = false,
    delayOffset: number = 0
  ) => (
    <div 
      key={`union-row-${patriarch.id}-${isLineDrawing}-${isSpouseVisible}`}
      style={{
        width: '330px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      {/* 1. Left Column (138px): The Patriarch (Anchored position - never shifts!) */}
      <div 
        key={`patriarch-${patriarch.id}-${isPatriarchBloom}`}
        style={{
          width: '138px',
          flexShrink: 0,
          animation: isPatriarchBloom 
            ? `personBloom 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset > 0 ? `${Math.max(0, delayOffset - 0.4)}s` : '0s'} both` 
            : undefined
        }}
      >
        {renderPersonCard(patriarch, 'patriarch', patriarchAccent)}
      </div>

      {/* 2. Middle Column (54px): Organic Arched Marriage Branch & Heart */}
      <div 
        key={`middle-arch-${patriarch.id}-${isLineDrawing}-${isSpouseVisible}`}
        style={{
          width: '54px',
          height: '42px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {isSpouseVisible && (
          <>
            {/* Organic Curved Marriage Arch: gentle parabolic arch rising to crest */}
            <svg width="54" height="42" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
              <path 
                key={`arch-path-${patriarch.id}-${isLineDrawing}`}
                d="M 0 24 C 16 16, 38 16, 54 24" 
                stroke="#F87171" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                fill="none"
                pathLength={100}
                className={isLineDrawing ? "roots-timelapse-branch" : undefined}
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(248, 113, 113, 0.6))',
                  animationDelay: isLineDrawing && delayOffset > 0 ? `${delayOffset}s` : undefined
                }}
              />
            </svg>
            {/* Glowing Heart positioned cleanly ABOVE the branch line with opaque dark badge */}
            <div 
              key={`heart-badge-${patriarch.id}-${isLineDrawing}`}
              style={{
                position: 'absolute',
                top: '2px',
                left: '50%',
                marginLeft: '-11px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#0B111E',
                border: '1.5px solid #F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                animation: isLineDrawing 
                  ? `heartPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delayOffset + 0.5}s both, heartThump 1.8s ease-in-out infinite ${delayOffset + 0.95}s` 
                  : 'heartThump 1.8s ease-in-out infinite',
                boxShadow: '0 0 14px rgba(248, 113, 113, 0.6), 0 3px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              <Heart size={11} color="#F87171" fill="#F87171" />
            </div>
          </>
        )}
      </div>

      {/* 3. Right Column (138px): The Spouse (Blooms only after branch reaches her!) */}
      <div 
        key={`spouse-col-${spouse.id}-${isLineDrawing}-${isSpouseVisible}`}
        style={{
          width: '138px',
          flexShrink: 0,
          opacity: isSpouseVisible ? 1 : 0,
          pointerEvents: isSpouseVisible ? 'auto' : 'none',
          animation: isSpouseVisible && isLineDrawing 
            ? `personBloom 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + 0.9}s both` 
            : undefined,
          transition: isLineDrawing ? undefined : 'opacity 0.4s ease'
        }}
      >
        {renderPersonCard(spouse, 'spouse', '#F472B6')}
      </div>
    </div>
  );

  // Reusable Downward Organic Curved Tree Bough (Sprouting directly from parents' union center to child)
  const renderDescentBranch = (
    strokeColor: string,
    collateralNode?: { label: string; member?: AthokpamMember; onClick?: () => void },
    isLineDrawing: boolean = false
  ) => (
    <div 
      key={`descent-branch-${strokeColor}-${isLineDrawing}`}
      style={{ 
        width: '330px', 
        height: '48px', 
        position: 'relative',
        marginTop: '-14px',
        marginBottom: '-2px',
        zIndex: 2
      }}
    >
      <svg width="330" height="64" style={{ position: 'absolute', top: -14, left: 0, overflow: 'visible' }}>
        {/* Union Departure Node (Tied directly to the parent union center) */}
        <circle 
          cx="165" 
          cy="0" 
          r="3" 
          fill={strokeColor} 
          style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }} 
        />

        {/* Organic S-Curve Bough: Starts at center union (x: 165, y: 0), curves directly down into child shoulder (x: 69, y: 62) */}
        <path 
          key={`descent-path-${strokeColor}-${isLineDrawing}`}
          d="M 165 0 C 165 32, 69 22, 69 62" 
          stroke={strokeColor} 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none"
          pathLength={100}
          className={isLineDrawing ? "roots-timelapse-branch" : undefined}
          style={{
            filter: `drop-shadow(0 0 6px ${strokeColor}88)`
          }}
        />

        {/* Collateral Branch Fork (curving outward to the right edge) */}
        {collateralNode && (
          <path 
            d="M 165 18 C 210 18, 260 28, 330 28" 
            stroke="rgba(148, 163, 184, 0.45)" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
            fill="none"
            pathLength={100}
            className={isLineDrawing ? "roots-timelapse-branch" : undefined}
          />
        )}
      </svg>

      {/* Peripheral Sibling Chip (at the right edge) */}
      {collateralNode && (
        <button
          onClick={collateralNode.onClick}
          className="pressable"
          title={collateralNode.label}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '4px',
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#CBD5E1',
            fontSize: '9.5px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            zIndex: 4,
            animation: isLineDrawing ? 'personBloom 0.6s ease-out 0.8s both' : undefined
          }}
        >
          <Users size={11} color={strokeColor} />
          <span>{collateralNode.label} ⟶</span>
        </button>
      )}
    </div>
  );

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#070B14',
      color: '#F8FAFC',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Scoped CSS animations for organic timelapse branch growth and bloom */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Botanical branch growth timelapse (normalized to 100 units) */
        @keyframes branchTimelapse {
          0%   { stroke-dashoffset: 100; opacity: 0.3; }
          100% { stroke-dashoffset: 0;   opacity: 1; }
        }

        /* Heart pops open at the midpoint */
        @keyframes heartPop {
          0%   { opacity: 0; transform: scale(0); }
          70%  { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Person card blossoms into view with soft focus bloom */
        @keyframes personBloom {
          0%   { opacity: 0; transform: scale(0.92) translateY(6px); filter: blur(3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }

        /* Smooth unfolding of newly descended generation (pushes parents up gracefully) */
        @keyframes descendExpand {
          0% {
            opacity: 0;
            max-height: 0px;
            transform: translateY(-20px) scale(0.96);
            filter: blur(4px);
          }
          40% {
            opacity: 0.5;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            max-height: 240px;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* Seamless entry for newly ascended generational stage */
        @keyframes scenarioEnter {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes heartThump {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #F87171); }
          50%      { transform: scale(1.35); filter: drop-shadow(0 0 12px #EF4444); }
        }

        @keyframes haloSpin {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .roots-timelapse-branch {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: branchTimelapse 0.95s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .android-nav-btn {
          background: transparent;
          border: none;
          outline: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.12s ease, opacity 0.15s ease, background 0.15s ease;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        .android-nav-btn:active:not(:disabled) {
          transform: scale(0.82);
          background: rgba(255, 255, 255, 0.08);
        }
      `}} />

      {/* ================= 1. FLUSH HERITAGE HEADER ================= */}
      <div 
        onTouchStart={onTouchStartHandle}
        onTouchMove={onTouchMoveHandle}
        onTouchEnd={onTouchEndHandle}
        style={{
          background: 'rgba(11, 15, 25, 0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '8px 14px 10px',
          zIndex: 50,
          flexShrink: 0
        }}
      >
        {/* Swipe Down Bar for mobile window gestures */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '5px',
          cursor: 'grab'
        }}>
          <div style={{
            width: '36px',
            height: '4px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.25)'
          }} />
        </div>

        {/* Header Content Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5, #312E81)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(79, 70, 229, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}>
              <GitBranch size={17} color="#FFFFFF" />
              {isAutoPlaying && (
                <span style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981'
                }} />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  fontFamily: 'var(--font-mono)',
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  ATHOKPAM ROOTS
                </h2>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '999px',
                  background: 'rgba(79, 70, 229, 0.25)',
                  color: '#C7D2FE',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                  {CLAN_METADATA.salai}
                </span>
              </div>
              <p style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 0' }}>
                {CLAN_METADATA.surnameMayek} · Pinned Scrollytelling Stage
              </p>
            </div>
          </div>

          {/* Controls: Auto Tour, Focus Me & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={toggleAutoPlay}
              className="pressable"
              title={isAutoPlaying ? 'Pause Auto-Play' : 'Start Auto-Play Odyssey'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: '999px',
                background: isAutoPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                border: isAutoPlaying ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(99, 102, 241, 0.3)',
                color: isAutoPlaying ? '#FCA5A5' : '#C7D2FE',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isAutoPlaying ? 'Pause' : 'Tour'}</span>
            </button>

            <button
              onClick={isFinalBeat ? scrollToOrigins : scrollToMe}
              className="pressable"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: '999px',
                background: isFinalBeat 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'linear-gradient(135deg, #10B981, #059669)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: isFinalBeat ? 'none' : '0 0 12px rgba(16, 185, 129, 0.4)'
              }}
            >
              {isFinalBeat ? <RotateCcw size={12} /> : <Sparkles size={12} />}
              <span>{isFinalBeat ? 'Restart' : 'Focus Me'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="pressable"
                aria-label="Close"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Generational Progress Line & Era Ribbon */}
        <div style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            flex: 1,
            height: '4px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.08)',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.max(globalProgress, 6)}%`,
              background: 'linear-gradient(90deg, #4F46E5, #818CF8 60%, #10B981 100%)',
              borderRadius: '999px',
              transition: 'width 0.15s ease-out'
            }} />
          </div>
          <span style={{
            fontSize: '9.5px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: isFinalBeat ? '#34D399' : '#A5B4FC',
            minWidth: '100px',
            textAlign: 'right',
            whiteSpace: 'nowrap'
          }}>
            {currentBeat + 1}/{TOTAL_BEATS} · {isFinalBeat ? 'GEN 6 (ME)' : `GEN ${activeMeta.gen} · ${activeMeta.era}`}
          </span>
        </div>
      </div>

      {/* ================= 2. PINNED SCROLLYTELLING CONTAINER ================= */}
      {/* Outer scroll track: 3600px virtual height to drive momentum scrolling */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'scroll',
          overflowX: 'hidden',
          position: 'relative',
          scrollBehavior: isCodeScrollingRef.current ? 'smooth' : 'auto'
        }}
      >
        {/* The 3600px virtual scroll track */}
        <div style={{ height: '3600px', width: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

        {/* The PINNED STAGE: Fixed in viewport */}
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '10px',
          padding: '12px 14px 16px',
          boxSizing: 'border-box'
        }}>
          {/* ================= BACKGROUND ATMOSPHERE & WATERMARKS ================= */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {/* Ambient Nebula Glows */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '380px',
              height: '380px',
              background: isFinalBeat 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(15, 23, 42, 0) 70%)'
                : 'radial-gradient(circle, rgba(79, 70, 229, 0.18) 0%, rgba(15, 23, 42, 0) 70%)',
              filter: 'blur(30px)',
              transition: 'background 0.5s ease'
            }} />

            {/* Meitei Mayek Clan Symbols Floating behind */}
            <div style={{
              position: 'absolute',
              top: '25%',
              right: '8%',
              fontSize: '60px',
              fontFamily: 'serif',
              color: '#818CF8',
              opacity: 0.12,
              fontWeight: 900
            }}>
              ꯂꯨꯋꯥꯡ
            </div>
            <div style={{
              position: 'absolute',
              bottom: '25%',
              left: '6%',
              fontSize: '54px',
              fontFamily: 'serif',
              color: '#34D399',
              opacity: 0.1,
              fontWeight: 900
            }}>
              ꯑꯊꯣꯛꯄꯝ
            </div>
          </div>

          {/* ================= STAGE TOP BANNER (Frosted Glass Enclosure) ================= */}
          <div style={{ 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 30, 
            maxWidth: '430px', 
            width: '100%',
            background: 'rgba(11, 17, 30, 0.84)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '12px 16px 14px',
            boxShadow: '0 10px 32px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            marginBottom: '14px',
            flexShrink: 0
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              marginBottom: '6px'
            }}>
              <Compass size={11} color="#818CF8" />
              <span style={{ fontSize: '9.5px', color: '#CBD5E1', fontWeight: 700, letterSpacing: '0.04em' }}>
                SCROLL TO ANIMATE THE LINEAGE ODYSSEY
              </span>
            </div>

            <h1 style={{
              fontSize: '17px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #FFFFFF 30%, #CBD5E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 4px'
            }}>
              The Athokpam Lineage Odyssey
            </h1>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
              A living scroll-driven tree tracing six generations of Luwang heritage from 19th-century origins to software engineer Banishwor.
            </p>
          </div>

          {/* ================= 3. THE FIXED CENTRAL STAGE CANVAS ================= */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '430px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '410px',
            overflow: 'hidden',
            paddingTop: '8px'
          }}>
            {/* ========================================================================= */}
            {/* UNIFIED CONTINUOUS LIVING TREE TRUNK (Beats 0 to 12)                      */}
            {/* Zero vanishing: Tiers glide smoothly upward with physical camera tracking */}
            {/* ========================================================================= */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translate3d(0, ${cameraY}px, 0) scale(${currentBeat === 12 ? 0.95 : 1})`,
              opacity: currentBeat === 12 ? 0 : 1,
              filter: currentBeat === 12 ? 'blur(8px)' : 'none',
              transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: currentBeat === 12 ? 'none' : 'auto',
              willChange: 'transform, opacity, filter'
            }}>
                {/* ------------------------------------------------------------- */}
                {/* TIER 1: GENERATION I (Tonu & Kola)                           */}
                {/* ------------------------------------------------------------- */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: currentBeat >= 4 ? 0 : 1,
                  filter: currentBeat >= 4 ? 'blur(4px)' : 'none',
                  transition: 'opacity 0.8s ease, filter 0.8s ease',
                  pointerEvents: currentBeat >= 4 ? 'none' : 'auto'
                }}>
                  <div style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: '#818CF8',
                    background: 'rgba(99, 102, 241, 0.15)',
                    padding: '2px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    marginBottom: '8px'
                  }}>
                    GENERATION I // ꯍꯧꯔꯛꯐꯝ ꯃꯔꯨ
                  </div>

                  {renderUnionRow(
                    tonu, 
                    kola, 
                    '#6366F1', 
                    currentBeat >= 1, 
                    currentBeat === 1,
                    currentBeat === 0
                  )}
                </div>

                {/* Descent Branch 1 -> 2 (Sprouting to Tolen) */}
                {currentBeat >= 2 && (
                  <div style={{
                    opacity: currentBeat >= 4 ? 0.2 : 1,
                    filter: currentBeat >= 4 ? 'blur(2px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    animation: currentBeat === 2 ? 'descendExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined
                  }}>
                    {renderDescentBranch('#818CF8', undefined, currentBeat === 2)}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TIER 2: GENERATION II (Tolen & Shajoubi)                      */}
                {/* Born in Beat 2, Marries in Beat 3, Ascends in Beat 4          */}
                {/* ------------------------------------------------------------- */}
                {currentBeat >= 2 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: currentBeat >= 7 ? 0 : 1,
                    filter: currentBeat >= 7 ? 'blur(4px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    pointerEvents: currentBeat >= 7 ? 'none' : 'auto',
                    marginTop: '2px'
                  }}>
                    {/* Gen 2 Pill: becomes visible when Gen 2 ascends to center stage in Beat 4+ */}
                    <div style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#34D399',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      marginBottom: '8px',
                      opacity: currentBeat >= 4 ? 1 : 0,
                      height: currentBeat >= 4 ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.6s ease'
                    }}>
                      GENERATION II // ꯲ꯁꯨꯕ ꯃꯤꯔꯣꯜ
                    </div>

                    {renderUnionRow(
                      tolen, 
                      shajoubi, 
                      '#10B981', 
                      currentBeat >= 3, 
                      currentBeat === 3,
                      currentBeat === 2
                    )}
                  </div>
                )}

                {/* Descent Branch 2 -> 3 (Sprouting to Thaniljao + Ningthou) */}
                {currentBeat >= 5 && (
                  <div style={{
                    opacity: currentBeat >= 7 ? 0.2 : 1,
                    filter: currentBeat >= 7 ? 'blur(2px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    animation: currentBeat === 5 ? 'descendExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined
                  }}>
                    {renderDescentBranch('#6366F1', {
                      label: 'Ningthou',
                      member: ningthou,
                      onClick: () => setSelectedMember(ningthou)
                    }, currentBeat === 5)}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TIER 3: GENERATION III (Thaniljao & Thouranishabi)            */}
                {/* Born in Beat 5, Marries in Beat 6, Ascends in Beat 7          */}
                {/* ------------------------------------------------------------- */}
                {currentBeat >= 5 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: currentBeat >= 9 ? 0 : 1,
                    filter: currentBeat >= 9 ? 'blur(4px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    pointerEvents: currentBeat >= 9 ? 'none' : 'auto',
                    marginTop: '2px'
                  }}>
                    <div style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#818CF8',
                      background: 'rgba(99, 102, 241, 0.15)',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      marginBottom: '8px',
                      opacity: currentBeat >= 7 ? 1 : 0,
                      height: currentBeat >= 7 ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.6s ease'
                    }}>
                      GENERATION III // ꯳ꯁꯨꯕ ꯃꯤꯔꯣꯜ
                    </div>

                    {renderUnionRow(
                      thaniljao, 
                      thouranishabi, 
                      '#6366F1', 
                      currentBeat >= 6, 
                      currentBeat === 6,
                      currentBeat === 5
                    )}
                  </div>
                )}

                {/* Descent Branch 3 -> 4 (Sprouting to Master Shamu + 3 siblings) */}
                {currentBeat >= 8 && (
                  <div style={{
                    opacity: currentBeat >= 9 ? 0.2 : 1,
                    filter: currentBeat >= 9 ? 'blur(2px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    animation: currentBeat === 8 ? 'descendExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined
                  }}>
                    {renderDescentBranch('#F59E0B', {
                      label: '3 Siblings',
                      onClick: () => {
                        const jugeshwor = memberMap.get("e131e7ac-b69f-4172-b593-175e36d63a2a");
                        if (jugeshwor) setSelectedMember(jugeshwor);
                      }
                    }, currentBeat === 8)}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TIER 4: GENERATION IV (Master Shamu & Mangolngambi)           */}
                {/* Revealed in Beat 8, Ascends in Beat 9                         */}
                {/* ------------------------------------------------------------- */}
                {currentBeat >= 8 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: currentBeat >= 11 ? 0 : 1,
                    filter: currentBeat >= 11 ? 'blur(4px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    pointerEvents: currentBeat >= 11 ? 'none' : 'auto',
                    marginTop: '2px'
                  }}>
                    <div style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#F59E0B',
                      background: 'rgba(245, 158, 11, 0.15)',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      marginBottom: '8px',
                      opacity: currentBeat >= 9 ? 1 : 0,
                      height: currentBeat >= 9 ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.6s ease'
                    }}>
                      GENERATION IV // ꯴ꯁꯨꯕ ꯃꯤꯔꯣꯜ
                    </div>

                    {renderUnionRow(
                      shamu, 
                      mangolngambi, 
                      '#F59E0B', 
                      true, 
                      currentBeat === 8,
                      currentBeat === 8,
                      0.9
                    )}
                  </div>
                )}

                {/* Descent Branch 4 -> 5 (Sprouting to Basanta + 5 uncles/aunts) */}
                {currentBeat >= 10 && (
                  <div style={{
                    opacity: currentBeat >= 11 ? 0.2 : 1,
                    filter: currentBeat >= 11 ? 'blur(2px)' : 'none',
                    transition: 'opacity 0.8s ease, filter 0.8s ease',
                    animation: currentBeat === 10 ? 'descendExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined
                  }}>
                    {renderDescentBranch('#60A5FA', {
                      label: '5 Uncles/Aunts',
                      member: priyokumar,
                      onClick: () => setSelectedMember(priyokumar)
                    }, currentBeat === 10)}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TIER 5: GENERATION V (Basanta & Anita)                         */}
                {/* Revealed in Beat 10, Celebrated in Beat 11                    */}
                {/* ------------------------------------------------------------- */}
                {currentBeat >= 10 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: 1,
                    transition: 'opacity 0.8s ease',
                    marginTop: '2px'
                  }}>
                    <div style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#60A5FA',
                      background: 'rgba(96, 165, 250, 0.15)',
                      padding: '2px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                      marginBottom: '8px',
                      opacity: currentBeat >= 11 ? 1 : 0,
                      height: currentBeat >= 11 ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.6s ease'
                    }}>
                      GENERATION V // ꯵ꯁꯨꯕ ꯃꯤꯔꯣꯜ
                    </div>

                    {renderUnionRow(
                      basanta, 
                      anita, 
                      '#60A5FA', 
                      true, 
                      currentBeat === 10,
                      currentBeat === 10,
                      0.9
                    )}

                    {/* Sibling Descent to the 3 Sons of Gen 6 (Beat 11+) */}
                    {currentBeat >= 11 && (
                      <div 
                        key="gen6-three-brothers"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '2px',
                          overflow: 'visible',
                          animation: currentBeat === 11 ? 'descendExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined
                        }}
                      >
                        {/* 3-Way Sibling Descent Branch */}
                        <div style={{ width: '380px', height: '48px', position: 'relative', marginTop: '-14px', marginBottom: '-2px', zIndex: 2 }}>
                          <svg width="380" height="64" style={{ position: 'absolute', top: -14, left: 0, overflow: 'visible' }}>
                            {/* Union Departure Node */}
                            <circle cx="190" cy="0" r="3.5" fill="#10B981" style={{ filter: 'drop-shadow(0 0 6px #10B981)' }} />

                            {/* Left Branch: to Banikanta (x: 60) */}
                            <path 
                              d="M 190 0 C 190 28, 60 20, 60 62" 
                              stroke="#60A5FA" 
                              strokeWidth="2.8" 
                              strokeLinecap="round" 
                              fill="none" 
                              pathLength={100}
                              className={currentBeat === 11 ? "roots-timelapse-branch" : undefined}
                              style={{ filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.5))' }}
                            />

                            {/* Middle Branch: to Banishwor (x: 190) */}
                            <path 
                              d="M 190 0 L 190 62" 
                              stroke="#10B981" 
                              strokeWidth="3.2" 
                              strokeLinecap="round" 
                              fill="none" 
                              pathLength={100}
                              className={currentBeat === 11 ? "roots-timelapse-branch" : undefined}
                              style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.7))' }}
                            />

                            {/* Right Branch: to Bishwal (x: 320) */}
                            <path 
                              d="M 190 0 C 190 28, 320 20, 320 62" 
                              stroke="#60A5FA" 
                              strokeWidth="2.8" 
                              strokeLinecap="round" 
                              fill="none" 
                              pathLength={100}
                              className={currentBeat === 11 ? "roots-timelapse-branch" : undefined}
                              style={{ filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.5))' }}
                            />
                          </svg>
                        </div>

                        {/* 3 Brothers Row: Banikanta (left), Banishwor (middle), Bishwal (right) */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          width: '380px',
                          marginTop: '2px'
                        }}>
                          {/* Left: Banikanta */}
                          <div style={{ width: '118px', flexShrink: 0 }}>
                            {renderPersonCard(banikanta, 'child', '#60A5FA', { width: '118px' })}
                          </div>

                          {/* Middle: Banishwor (Highlighted Successor) */}
                          <div style={{ width: '118px', flexShrink: 0, transform: 'scale(1.04)' }}>
                            {renderPersonCard(banishwor, 'child', '#10B981', { 
                              width: '118px',
                              border: '2px solid #10B981',
                              boxShadow: '0 0 24px rgba(16, 185, 129, 0.55), 0 8px 24px rgba(0, 0, 0, 0.7)'
                            })}
                          </div>

                          {/* Right: Bishwal */}
                          <div style={{ width: '118px', flexShrink: 0 }}>
                            {renderPersonCard(bishwal, 'child', '#60A5FA', { width: '118px' })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            {/* ========================================================================= */}
            {/* SCENARIO E: GENERATION 6 GRAND FINALE (Beat 12 - Focus on Banishwor!)     */}
            {/* ========================================================================= */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              width: '100%',
              maxWidth: '410px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: currentBeat === 12 
                ? 'translate3d(-50%, 0, 0) scale(1)' 
                : 'translate3d(-50%, 28px, 0) scale(0.95)',
              opacity: currentBeat === 12 ? 1 : 0,
              filter: currentBeat === 12 ? 'blur(0px)' : 'blur(8px)',
              transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s ease',
              pointerEvents: currentBeat === 12 ? 'auto' : 'none',
              zIndex: 20,
              willChange: 'transform, opacity, filter'
            }}>
                {/* Theatrical Ambient Radial Spotlight */}
                <div style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(0,0,0,0) 80%)',
                  borderRadius: '36px',
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'haloSpin 14s linear infinite',
                  filter: 'blur(18px)'
                }} />

                {/* Master Focus Card */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  background: 'linear-gradient(145deg, #131E32, #0B1324)',
                  borderRadius: '24px',
                  border: '2px solid #10B981',
                  padding: '20px 16px',
                  boxShadow: '0 0 45px rgba(16, 185, 129, 0.45), 0 25px 50px rgba(0, 0, 0, 0.75)',
                  textAlign: 'center'
                }}>
                  {/* Pulsing Pill Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(16, 185, 129, 0.45)',
                    color: '#34D399',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    marginBottom: '12px',
                    boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)'
                  }}>
                    <Sparkles size={12} />
                    <span>YOU ARE HERE // 6TH GENERATION</span>
                  </div>

                  {/* Photo Avatar with Rotating Cosmic Halo */}
                  <div style={{
                    width: '84px',
                    height: '84px',
                    margin: '0 auto 10px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: 'linear-gradient(135deg, #10B981, #6366F1, #F59E0B)',
                    boxShadow: '0 0 26px rgba(16, 185, 129, 0.55)'
                  }}>
                    <img 
                      src={getOptimizedPhotoUrl(banishwor.photoUrl)} 
                      alt="Banishwor Athokpam"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        background: '#1E293B'
                      }}
                    />
                  </div>

                  {/* Name & Titles */}
                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    margin: '0 0 2px'
                  }}>
                    {banishwor.firstName} {banishwor.lastName}
                  </h3>
                  <p style={{
                    fontSize: '11.5px',
                    color: '#A5B4FC',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    margin: '0 0 6px'
                  }}>
                    {CLAN_METADATA.surnameMayek} · {CLAN_METADATA.salaiMayek}
                  </p>

                  <p style={{
                    fontSize: '11.5px',
                    color: '#CBD5E1',
                    lineHeight: 1.45,
                    maxWidth: '320px',
                    margin: '0 auto 12px'
                  }}>
                    Software Engineer, published author, MCA 7th State Rank graduate, and digital custodian of the Athokpam genealogy.
                  </p>

                  {/* Verified Credential Badges */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '14px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '10.5px',
                      color: '#E2E8F0'
                    }}>
                      <GraduationCap size={12} color="#F59E0B" />
                      <span>MCA Rank 7 (MU)</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '10.5px',
                      color: '#E2E8F0'
                    }}>
                      <Briefcase size={12} color="#60A5FA" />
                      <span>Native Android Dev</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '10.5px',
                      color: '#E2E8F0'
                    }}>
                      <MapPin size={12} color="#34D399" />
                      <span>Athokpam Mayai Leikai</span>
                    </div>
                  </div>

                  {/* Immediate Sibling Wings (Brothers Banikanta & Bishwal) */}
                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '10px',
                    marginTop: '8px'
                  }}>
                    <div style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      color: '#94A3B8',
                      fontWeight: 700,
                      marginBottom: '6px'
                    }}>
                      IMMEDIATE BROTHERS // ꯃꯆꯤꯟ ꯃꯅꯥꯎ
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {[banikanta, bishwal].map(bro => (
                        <div 
                          key={bro.id}
                          onClick={() => setSelectedMember(bro)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: '12px',
                            padding: '6px 8px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: '#1E293B',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}>
                            {bro.photoUrl ? (
                              <img src={getOptimizedPhotoUrl(bro.photoUrl)} alt={bro.firstName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#A5B4FC', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                {bro.firstName[0]}
                              </span>
                            )}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {bro.firstName}
                            </div>
                            <div style={{ fontSize: '9px', color: '#94A3B8' }}>
                              {bro.relationToBanishwor?.split('(')[0]}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Climax Action CTAs */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button
                      onClick={scrollToOrigins}
                      className="pressable"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        padding: '8px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#CBD5E1',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowUp size={12} />
                      <span>Roots (Tonu)</span>
                    </button>

                    <a 
                      href={CLAN_METADATA.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        padding: '8px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <ExternalLink size={12} />
                      <span>Full Portal</span>
                    </a>
                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>

      {/* ================= 4. ANDROID 3-BUTTON SYSTEM NAVIGATION BAR ================= */}
      <div 
        style={{
          width: '100%',
          height: '42px',
          background: 'rgba(7, 11, 20, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 24px',
          boxSizing: 'border-box',
          zIndex: 60,
          flexShrink: 0
        }}
      >
        {/* Back Button (◀) */}
        <button
          id="roots-nav-back"
          onClick={() => {
            if (currentBeat > 0) {
              goToBeat(currentBeat - 1);
            } else if (onClose) {
              onClose();
            }
          }}
          aria-label={currentBeat > 0 ? "Previous Step" : "Return to Home Screen"}
          title={currentBeat > 0 ? "Previous Step" : "Return to Home Screen"}
          className="android-nav-btn"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            width: '64px',
            height: '36px',
            cursor: 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Home Button (○) - Returns back to OS Home Screen (Desktop) */}
        <button
          id="roots-nav-home"
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              scrollToOrigins();
            }
          }}
          aria-label="Home Screen"
          title="Return to Home Screen"
          className="android-nav-btn"
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            width: '64px',
            height: '36px',
            cursor: 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="7" />
          </svg>
        </button>

        {/* Forward Button (▶) */}
        <button
          id="roots-nav-next"
          onClick={() => goToBeat(currentBeat + 1)}
          disabled={currentBeat >= TOTAL_BEATS - 1}
          aria-label="Next Step"
          title="Next Step"
          className="android-nav-btn"
          style={{
            color: currentBeat >= TOTAL_BEATS - 1 ? 'rgba(255, 255, 255, 0.18)' : '#818CF8',
            width: '64px',
            height: '36px',
            cursor: currentBeat >= TOTAL_BEATS - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ================= 5. RELATIVE DETAIL BOTTOM SHEET / MODAL ================= */}
      {selectedMember && (
        <div 
          onClick={() => setSelectedMember(null)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '12px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              background: '#0F172A',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              padding: '20px 18px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="pressable"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {/* Profile Avatar & Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '16px',
                background: '#1E293B',
                border: selectedMember.isSubject 
                  ? '2px solid #10B981' 
                  : (selectedMember.isDirectAncestor ? '2px solid #6366F1' : '1px solid rgba(255, 255, 255, 0.15)'),
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {selectedMember.photoUrl ? (
                  <img 
                    src={getOptimizedPhotoUrl(selectedMember.photoUrl)} 
                    alt={selectedMember.firstName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: selectedMember.gender === 'F' ? '#F472B6' : '#818CF8'
                  }}>
                    {selectedMember.firstName[0]}
                  </div>
                )}
              </div>

              <div>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: selectedMember.isSubject 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : (selectedMember.isDirectAncestor ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255, 255, 255, 0.08)'),
                  color: selectedMember.isSubject 
                    ? '#34D399' 
                    : (selectedMember.isDirectAncestor ? '#A5B4FC' : '#94A3B8'),
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'inline-block',
                  marginBottom: '4px'
                }}>
                  GENERATION {selectedMember.generation} · {selectedMember.relationToBanishwor || 'Family Member'}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {selectedMember.firstName} {selectedMember.middleName ? `${selectedMember.middleName} ` : ''}{selectedMember.lastName}
                </h3>
              </div>
            </div>

            {/* Profile Attributes Bento */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '14px'
            }}>
              {selectedMember.occupation && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#E2E8F0' }}>
                  <Briefcase size={14} color="#60A5FA" />
                  <span>Occupation: <strong>{selectedMember.occupation}</strong></span>
                </div>
              )}
              {selectedMember.education && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#E2E8F0' }}>
                  <GraduationCap size={14} color="#F59E0B" />
                  <span>Education: <strong>{selectedMember.education}</strong></span>
                </div>
              )}
              {selectedMember.birthDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#E2E8F0' }}>
                  <Calendar size={14} color="#34D399" />
                  <span>Birth: <strong>{selectedMember.birthDate.split('T')[0]}</strong></span>
                </div>
              )}
              {selectedMember.deathDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#CBD5E1' }}>
                  <Info size={14} color="#94A3B8" />
                  <span>Deceased: <strong>{selectedMember.deathDate.split('T')[0]}</strong></span>
                </div>
              )}
              {selectedMember.address && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#E2E8F0' }}>
                  <MapPin size={14} color="#EC4899" />
                  <span>Address: <strong>{selectedMember.address}</strong></span>
                </div>
              )}
            </div>

            {/* Bio */}
            {selectedMember.bio && (
              <p style={{
                fontSize: '12px',
                color: '#94A3B8',
                lineHeight: 1.5,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '10px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                margin: '0 0 14px'
              }}>
                "{selectedMember.bio}"
              </p>
            )}

            <button
              onClick={() => setSelectedMember(null)}
              className="pressable"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
