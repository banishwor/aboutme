import React, { useState, useRef } from 'react';
import { gamingHubData, GamingGiveaway } from '../../content/gamingData';
import { HaloBanReelPlayer } from './HaloBanReelPlayer';
import { 
  Gamepad2, 
  Trophy, 
  Tv, 
  Gift, 
  X, 
  Sword, 
  Lightbulb, 
  Brain, 
  Film, 
  ZoomIn,
  Play
} from 'lucide-react';

interface GamingAppProps {
  onClose?: () => void;
  onTouchStartHandle?: (e: React.TouchEvent) => void;
  onTouchMoveHandle?: (e: React.TouchEvent) => void;
  onTouchEndHandle?: (e: React.TouchEvent) => void;
}

export const GamingApp: React.FC<GamingAppProps> = ({
  onClose,
  onTouchStartHandle,
  onTouchMoveHandle,
  onTouchEndHandle
}) => {
  const [activeTab, setActiveTab] = useState<'bani' | 'haloban'>('bani');
  const [lightboxImage, setLightboxImage] = useState<GamingGiveaway | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'bani' | 'haloban') => {
    setActiveTab(tab);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const { baniEntertainment, halobanMedia } = gamingHubData;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#070B14',
        color: '#F8FAFC',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: activeTab === 'bani' 
              ? 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, rgba(7, 11, 20, 0) 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(7, 11, 20, 0) 70%)',
            filter: 'blur(50px)',
            transition: 'background 0.5s ease'
          }}
        />
      </div>

      {/* ================= 1. FLUSH HEADER ================= */}
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
              background: activeTab === 'bani'
                ? 'linear-gradient(135deg, #EA580C, #9A3412)'
                : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: activeTab === 'bani' ? '0 0 16px rgba(234, 88, 12, 0.5)' : '0 0 16px rgba(37, 99, 235, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              {activeTab === 'bani' ? <Gamepad2 size={17} color="#FFFFFF" /> : <Brain size={17} color="#FFFFFF" />}
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
                  {activeTab === 'bani' ? 'BANI ENTERTAINMENT' : 'HALOBAN MEDIA'}
                </h2>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '999px',
                  background: activeTab === 'bani' ? 'rgba(234, 88, 12, 0.25)' : 'rgba(37, 99, 235, 0.25)',
                  color: activeTab === 'bani' ? '#FDBA74' : '#93C5FD',
                  border: activeTab === 'bani' ? '1px solid rgba(234, 88, 12, 0.4)' : '1px solid rgba(37, 99, 235, 0.4)'
                }}>
                  {activeTab === 'bani' ? '15K COMMUNITY' : 'FACTS & LESSONS'}
                </span>
              </div>
              <p style={{ fontSize: '10px', color: '#94A3B8', margin: '2px 0 0' }}>
                {activeTab === 'bani' ? 'MLBB Esports & Creator Era' : 'Short-Form Documentaries'}
              </p>
            </div>
          </div>

          {/* Close Button */}
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

        {/* Dual-Hub Segmented Switcher Strip */}
        <div style={{
          marginTop: '10px',
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '3px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => handleTabChange('bani')}
            className="pressable"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '7px',
              borderRadius: '9px',
              background: activeTab === 'bani' ? 'linear-gradient(135deg, #EA580C, #C2410C)' : 'transparent',
              border: 'none',
              color: activeTab === 'bani' ? '#FFFFFF' : '#94A3B8',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'bani' ? '0 2px 10px rgba(234, 88, 12, 0.4)' : 'none'
            }}
          >
            <Gamepad2 size={13} />
            <span>Bani Entertainment (15K)</span>
          </button>

          <button
            onClick={() => handleTabChange('haloban')}
            className="pressable"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '7px',
              borderRadius: '9px',
              background: activeTab === 'haloban' ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'transparent',
              border: 'none',
              color: activeTab === 'haloban' ? '#FFFFFF' : '#94A3B8',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'haloban' ? '0 2px 10px rgba(37, 99, 235, 0.4)' : 'none'
            }}
          >
            <Brain size={13} />
            <span>HaloBan Media (Facts)</span>
          </button>
        </div>
      </div>

      {/* ================= 2. SCROLLABLE BODY CONTENT ================= */}
      <div 
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 14px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeTab === 'bani' ? (
            /* ================= TAB 1: BANI ENTERTAINMENT (15K GAMING) ================= */
            <>
              {/* Official Hero Card */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '24px',
                border: '1.5px solid rgba(234, 88, 12, 0.35)',
                padding: '20px 16px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(234, 88, 12, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                {/* Official Leaping Golden Silhouette Logo */}
                <div style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '2px solid rgba(245, 158, 11, 0.6)',
                  boxShadow: '0 0 24px rgba(245, 158, 11, 0.35)',
                  marginBottom: '12px',
                  background: '#0B101E'
                }}>
                  <img
                    src={baniEntertainment.logoUrl}
                    alt="Bani Entertainment Official Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Title & Tagline */}
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                  {baniEntertainment.title}
                </h3>
                <p style={{ fontSize: '11.5px', color: '#FB923C', fontWeight: 700, margin: '0 0 10px' }}>
                  {baniEntertainment.role}
                </p>

                {/* Verified Pill Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: 'rgba(234, 88, 12, 0.18)',
                    border: '1px solid rgba(234, 88, 12, 0.4)',
                    color: '#FDBA74'
                  }}>
                    ★ 15,000+ FOLLOWERS
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#34D399'
                  }}>
                    ✓ OFFICIAL MIL INFLUENCER
                  </span>
                </div>

                {/* Summary narrative */}
                <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 16px', maxWidth: '380px' }}>
                  {baniEntertainment.summary}
                </p>

                {/* 4-Tile Bento Stats Grid */}
                <div style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  {baniEntertainment.stats.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '14px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {st.label}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Outbound Facebook Button */}
                <a
                  href={baniEntertainment.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #1877F2, #0C63D4)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(24, 119, 242, 0.45)'
                  }}
                >
                  <Tv size={15} />
                  <span>Visit Bani Entertainment on Facebook ↗</span>
                </a>
              </div>

              {/* Featured Milestone Card: In-Game Skin Giveaway Archive */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(234, 88, 12, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FB923C'
                    }}>
                      <Gift size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                        COMMUNITY MEMORY & PROOF
                      </div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                        September 4, 2021 · Special Skin Giveaway
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.18)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    VERIFIED POST
                  </span>
                </div>

                {/* Screenshot Frame with Zoom-In Hint */}
                {baniEntertainment.giveaways.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className="pressable"
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      background: '#0B101E',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <ZoomIn size={12} />
                      <span>Tap to Inspect</span>
                    </div>
                  </div>
                ))}

                {/* Giveaways Context Callout */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '14px',
                  padding: '10px 12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ fontSize: '11px', color: '#FDBA74', fontWeight: 700, marginBottom: '3px' }}>
                    Badang "Susanoo" Skin Gifted to Supporter Dhaneshwor Waikhom
                  </div>
                  <div style={{ fontSize: '11px', color: '#CBD5E1', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "Your friend Banishwor gifted you Susanoo skin: Enjoy your Day... Keep Supporting... 👍"
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '6px' }}>
                    Supporter Comment: <strong style={{ color: '#FFFFFF' }}>"Thank you Bani Entertainment"</strong>
                  </div>
                </div>
              </div>

              {/* Creator Milestones Timeline */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F59E0B'
                  }}>
                    <Trophy size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                      CREATOR JOURNEY & MILESTONES
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                      From Grassroots Streams to 15,000 Community
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {baniEntertainment.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FFFFFF' }}>
                          {m.title}
                        </span>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: 'rgba(234, 88, 12, 0.15)',
                          color: '#FDBA74',
                          border: '1px solid rgba(234, 88, 12, 0.3)'
                        }}>
                          {m.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '10.5px', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Esports Tactics */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EF4444'
                  }}>
                    <Sword size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                      SIGNATURE MLBB TACTICS & ROLE
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                      Burst Fighter Mastery & Shotcalling
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {baniEntertainment.tactics.map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#FDBA74', marginBottom: '2px' }}>
                        ★ {t.title}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#CBD5E1', lineHeight: 1.4 }}>
                        {t.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* ================= TAB 2: HALOBAN MEDIA (FACTS & LESSONS) ================= */
            <>
              {/* Official HaloBan Hero Card */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '24px',
                border: '1.5px solid rgba(59, 130, 246, 0.35)',
                padding: '20px 16px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                {/* Official Circular Logo with Brain, Tree, Book, Play Icon */}
                <div style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(96, 165, 250, 0.6)',
                  boxShadow: '0 0 24px rgba(96, 165, 250, 0.35)',
                  marginBottom: '12px',
                  background: '#0B101E'
                }}>
                  <img
                    src={halobanMedia.logoUrl}
                    alt="HaloBan Media Official Emblem"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Title & Tagline */}
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                  {halobanMedia.title}
                </h3>
                <p style={{ fontSize: '11.5px', color: '#60A5FA', fontWeight: 700, margin: '0 0 10px' }}>
                  {halobanMedia.tagline}
                </p>

                {/* Verified Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: 'rgba(59, 130, 246, 0.18)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    color: '#93C5FD'
                  }}>
                    ✦ SHORT-FORM DOCUMENTARIES
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: 'rgba(245, 158, 11, 0.18)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#FCD34D'
                  }}>
                    ★ RESEARCH-BACKED
                  </span>
                </div>

                {/* Summary narrative */}
                <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 16px', maxWidth: '380px' }}>
                  {halobanMedia.summary}
                </p>

                {/* 4-Tile Bento Stats Grid */}
                <div style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px'
                }}>
                  {halobanMedia.stats.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '14px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {st.label}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Documentaries (9:16 Shorts Theater) */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(30, 58, 138, 0.28), rgba(15, 23, 42, 0.5))',
                borderRadius: '20px',
                border: '1px solid rgba(96, 165, 250, 0.35)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 8px 28px rgba(0, 0, 0, 0.45)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60A5FA'
                    }}>
                      <Film size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                        FEATURED DOCUMENTARIES (SHORTS)
                      </div>
                      <div style={{ fontSize: '10px', color: '#93C5FD' }}>
                        3 Published 9:16 Episodes · Swipe-Up Player
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#93C5FD',
                    border: '1px solid rgba(59, 130, 246, 0.4)'
                  }}>
                    ● WATCH IN-OS
                  </span>
                </div>

                {/* 3 Teaser Preview Cards Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  {halobanMedia.documentaries.map((doc, idx) => (
                    <div
                      key={doc.id}
                      onClick={() => setActiveReelIndex(idx)}
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      {/* 9:16 Aspect Thumbnail Container */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '9 / 14',
                        background: '#020617',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {/* Muted background video preview */}
                        <video
                          src={doc.videoUrl}
                          muted
                          playsInline
                          preload="metadata"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.82
                          }}
                        />
                        {/* Gradient Overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)'
                        }} />

                        {/* Glowing Play Circle */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(59, 130, 246, 0.9)',
                          boxShadow: '0 0 16px rgba(59, 130, 246, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}>
                          <Play size={15} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                        </div>

                        {/* Episode Tag */}
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          fontSize: '8.5px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          color: '#93C5FD',
                          border: '1px solid rgba(96, 165, 250, 0.4)'
                        }}>
                          EP {doc.episodeNumber}
                        </div>
                      </div>

                      {/* Card Info */}
                      <div style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {doc.title}
                        </div>
                        <div style={{
                          fontSize: '8.5px',
                          color: '#94A3B8',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {doc.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Full Theater Launch Button */}
                <button
                  onClick={() => setActiveReelIndex(0)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                    border: '1px solid rgba(96, 165, 250, 0.5)',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    marginTop: '2px'
                  }}
                >
                  <Play size={14} fill="#FFFFFF" />
                  <span>Open Shorts Theater (Swipe Up to Advance)</span>
                </button>
              </div>

              {/* Documentary Content Pillars Grid */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818CF8'
                  }}>
                    <Lightbulb size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                      DOCUMENTARY PILLARS & THEMES
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                      Translating Curiosities into Visual Knowledge
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '8px' }}>
                  {halobanMedia.pillars.map((pil, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '14px',
                        padding: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                          {pil.title}
                        </span>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: '#93C5FD',
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}>
                          {pil.category}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#CBD5E1', margin: 0, lineHeight: 1.45 }}>
                        {pil.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Step Production Pipeline */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981'
                  }}>
                    <Film size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                      RESEARCH & PRODUCTION STANDARDS
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                      Zero Clickbait · Verified Facts · Kinetic Flow
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {halobanMedia.productionPipeline.map((pipe, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <span style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        color: '#60A5FA',
                        paddingTop: '1px'
                      }}>
                        {pipe.step}
                      </span>
                      <div>
                        <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                          {pipe.label}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#94A3B8', lineHeight: 1.4 }}>
                          {pipe.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= 3. ANDROID 3-BUTTON SYSTEM NAVIGATION BAR ================= */}
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
          onClick={() => {
            if (activeTab === 'haloban') {
              handleTabChange('bani');
            } else if (onClose) {
              onClose();
            }
          }}
          aria-label={activeTab === 'haloban' ? "Back to Bani Entertainment" : "Return to Home Screen"}
          title={activeTab === 'haloban' ? "Back to Bani Entertainment" : "Return to Home Screen"}
          className="pressable"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'rgba(255, 255, 255, 0.85)',
            width: '64px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Home Button (○) - Returns to OS Home Screen (Desktop) */}
        <button
          onClick={onClose}
          aria-label="Home Screen"
          title="Return to Home Screen"
          className="pressable"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'rgba(255, 255, 255, 0.95)',
            width: '64px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="7" />
          </svg>
        </button>

        {/* Forward Switch Button (▶) */}
        <button
          onClick={() => handleTabChange(activeTab === 'bani' ? 'haloban' : 'bani')}
          aria-label="Switch Hub"
          title="Switch between Gaming and Facts Hub"
          className="pressable"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#FB923C',
            width: '64px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ================= 4. INTERACTIVE LIGHTBOX MODAL ================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'pointer'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '460px',
              width: '100%',
              background: '#0F172A',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                  {lightboxImage.title}
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                  {lightboxImage.date} · Verified Community Milestone
                </div>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: '10px', background: '#020617' }}>
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px' }}
              />
            </div>

            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '11.5px', color: '#E2E8F0', lineHeight: 1.45, margin: '0 0 6px' }}>
                {lightboxImage.quoteMessage}
              </p>
              <div style={{ fontSize: '10px', color: '#34D399', fontWeight: 700 }}>
                ✓ Recipient: {lightboxImage.recipient}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. HALOBAN SHORTS THEATER (SWIPE UP PLAYER) ================= */}
      {activeReelIndex !== null && (
        <HaloBanReelPlayer
          documentaries={halobanMedia.documentaries}
          initialIndex={activeReelIndex}
          onClose={() => setActiveReelIndex(null)}
          logoUrl={halobanMedia.logoUrl}
        />
      )}
    </div>
  );
};
