import React, { useState, useRef } from 'react';
import { dimensionsData } from '../content/dimensions';
import { skills, skillCategories } from '../content/skills';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  BookOpen, 
  GitBranch, 
  Gamepad2, 
  GraduationCap 
} from 'lucide-react';

interface DimensionsDeckProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (appId: string) => void;
}

export const DimensionsDeck: React.FC<DimensionsDeckProps> = ({
  isOpen,
  onClose,
  onLaunchApp
}) => {
  const [activeTab, setActiveTab] = useState<'dimensions' | 'skills'>('dimensions');
  const [activeDimIndex, setActiveDimIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const touchStartY = useRef<number | null>(null);
  const [dragY, setDragY] = useState<number>(0);

  const activeDim = dimensionsData[activeDimIndex] || dimensionsData[0];

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragY > 110) {
      onClose();
    }
    setDragY(0);
    touchStartY.current = null;
  };

  const handleLaunch = (appId?: string, url?: string) => {
    if (appId) {
      onClose();
      onLaunchApp(appId);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getDimensionIcon = (id: string, color: string) => {
    switch (id) {
      case 'software-engineer':
        return <Code2 size={16} color={color} />;
      case 'published-author':
        return <BookOpen size={16} color={color} />;
      case 'cultural-preserver':
        return <GitBranch size={16} color={color} />;
      case 'gaming-creator':
        return <Gamepad2 size={16} color={color} />;
      case 'cs-researcher':
        return <GraduationCap size={16} color={color} />;
      default:
        return <Sparkles size={16} color={color} />;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 500,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'visibility 0.35s ease',
        visibility: isOpen ? 'visible' : 'hidden'
      }}
    >
      {/* Dim Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(7, 11, 20, 0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.35s ease'
        }}
      />

      {/* Slide-Up Liquid Glass Deck */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '92%',
          maxHeight: '92%',
          background: '#0B1120',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen 
            ? `translateY(${dragY}px)` 
            : 'translateY(100%)',
          transition: dragY === 0 ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          overflow: 'hidden',
          color: '#F8FAFC'
        }}
      >
        {/* Dynamic Morphing Ambient Halo Background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '440px',
              height: '380px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeDim.color}33 0%, rgba(11, 17, 32, 0) 70%)`,
              filter: 'blur(45px)',
              transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>

        {/* 1. Executive Top Drag Handle & Navigation Header */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '12px 18px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(11, 17, 32, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          flexShrink: 0
        }}>
          {/* Grab Pill */}
          <div 
            onClick={onClose}
            style={{
              width: '42px',
              height: '5px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer'
            }} 
          />

          {/* Header Action Row */}
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            {/* Monogram Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${activeDim.color}, #4F46E5)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 12px ${activeDim.color}66`,
                transition: 'all 0.5s ease'
              }}>
                <Sparkles size={14} color="#FFFFFF" />
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  color: '#FFFFFF'
                }}>
                  THE 5 DIMENSIONS
                </div>
                <div style={{ fontSize: '9.5px', color: '#94A3B8' }}>
                  Banishwor Athokpam · Polymath Showcase
                </div>
              </div>
            </div>

            {/* Segmented Mode Switcher */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '999px',
              padding: '3px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <button
                onClick={() => setActiveTab('dimensions')}
                className="pressable"
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: activeTab === 'dimensions' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'dimensions' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✦ Dimensions
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className="pressable"
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: activeTab === 'skills' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'skills' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ⚡ Tech Stack
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="pressable"
              aria-label="Close Dimensions Deck"
              style={{
                width: '28px',
                height: '28px',
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
              <X size={14} />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body Canvas */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflowY: 'auto',
          padding: '14px 16px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {activeTab === 'dimensions' ? (
            /* ================= TAB 1: THE 5 DIMENSIONS SHOWCASE ================= */
            <div style={{
              width: '100%',
              maxWidth: '430px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {/* Quick Dimension Pill Selector Strip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '4px',
                width: '100%',
                scrollbarWidth: 'none'
              }}>
                {dimensionsData.map((dim, idx) => {
                  const isActive = idx === activeDimIndex;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setActiveDimIndex(idx)}
                      className="pressable"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: isActive ? `${dim.color}26` : 'rgba(255, 255, 255, 0.04)',
                        border: isActive ? `1.5px solid ${dim.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        fontSize: '11px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: isActive ? `0 0 14px ${dim.color}44` : 'none'
                      }}
                    >
                      {getDimensionIcon(dim.id, isActive ? dim.color : '#94A3B8')}
                      <span>{dim.number}. {dim.title.replace('The ', '')}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Active Dimension Focus Showcase Card */}
              <div style={{
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                borderRadius: '24px',
                border: `1.5px solid ${activeDim.color}66`,
                padding: '20px 18px',
                boxShadow: `0 12px 36px rgba(0, 0, 0, 0.6), 0 0 30px ${activeDim.color}22`,
                transition: 'border 0.4s ease, box-shadow 0.4s ease'
              }}>
                {/* Top Badge & Number */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: `${activeDim.color}22`,
                    border: `1px solid ${activeDim.color}44`,
                    color: activeDim.color,
                    fontSize: '10px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em'
                  }}>
                    {getDimensionIcon(activeDim.id, activeDim.color)}
                    <span>{activeDim.badge}</span>
                  </div>

                  <span style={{
                    fontSize: '18px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    color: activeDim.color,
                    opacity: 0.85
                  }}>
                    {activeDim.number} / 05
                  </span>
                </div>

                {/* Title & Role */}
                <h3 style={{
                  fontSize: '21px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  margin: '0 0 4px'
                }}>
                  {activeDim.title}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: activeDim.color,
                  fontWeight: 700,
                  margin: '0 0 12px'
                }}>
                  {activeDim.role}
                </p>

                {/* Tagline Banner */}
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderLeft: `3px solid ${activeDim.color}`,
                  fontSize: '11.5px',
                  color: '#E2E8F0',
                  fontStyle: 'italic',
                  marginBottom: '14px',
                  lineHeight: 1.45
                }}>
                  "{activeDim.tagline}"
                </div>

                {/* Summary narrative */}
                <p style={{
                  fontSize: '12px',
                  color: '#CBD5E1',
                  lineHeight: 1.55,
                  margin: '0 0 16px'
                }}>
                  {activeDim.summary}
                </p>

                {/* Key Stats Bento Tiles (2x2 Grid) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  {activeDim.keyStats.map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '14px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div style={{
                        fontSize: '9.5px',
                        fontFamily: 'var(--font-mono)',
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '3px'
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#FFFFFF'
                      }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights Checklist */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: '#94A3B8',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '8px'
                  }}>
                    KEY ACHIEVEMENTS & PROOF POINTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeDim.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '11px',
                          color: '#CBD5E1',
                          lineHeight: 1.4
                        }}
                      >
                        <CheckCircle2 size={13} color={activeDim.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action CTA Button (Deep-Links directly to In-OS app!) */}
                <button
                  onClick={() => handleLaunch(activeDim.targetAppId, activeDim.externalUrl)}
                  className="pressable"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, ${activeDim.color}, #4F46E5)`,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: `0 8px 24px ${activeDim.color}55`
                  }}
                >
                  <span>{activeDim.ctaLabel}</span>
                </button>
              </div>

              {/* Bottom Carousel Pager Stepper */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px'
              }}>
                <button
                  onClick={() => setActiveDimIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeDimIndex <= 0}
                  className="pressable"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    color: activeDimIndex <= 0 ? '#475569' : '#CBD5E1',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: activeDimIndex <= 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={13} />
                  <span>Previous</span>
                </button>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {dimensionsData.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      onClick={() => setActiveDimIndex(dotIdx)}
                      style={{
                        width: dotIdx === activeDimIndex ? '18px' : '6px',
                        height: '6px',
                        borderRadius: '999px',
                        background: dotIdx === activeDimIndex ? activeDim.color : 'rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveDimIndex(prev => Math.min(dimensionsData.length - 1, prev + 1))}
                  disabled={activeDimIndex >= dimensionsData.length - 1}
                  className="pressable"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    color: activeDimIndex >= dimensionsData.length - 1 ? '#475569' : '#CBD5E1',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: activeDimIndex >= dimensionsData.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            /* ================= TAB 2: COMPLETE TECH STACK & SKILLS ================= */
            <div style={{
              width: '100%',
              maxWidth: '430px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {/* Category Filter Pills */}
              <div style={{
                display: 'flex',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollbarWidth: 'none'
              }}>
                {skillCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="pressable"
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      background: selectedCategory === cat ? '#4F46E5' : 'rgba(255, 255, 255, 0.06)',
                      border: selectedCategory === cat ? '1px solid #6366F1' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: selectedCategory === cat ? '#FFFFFF' : '#94A3B8',
                      fontSize: '11px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Skills Card Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                gap: '10px'
              }}>
                {filteredSkills.map(skill => (
                  <div
                    key={skill.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      padding: '12px 14px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF' }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        background: 'rgba(99, 102, 241, 0.15)',
                        color: '#A5B4FC',
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                      }}>
                        {skill.category}
                      </span>
                    </div>

                    <p style={{ fontSize: '10.5px', color: '#94A3B8', lineHeight: 1.4, margin: 0 }}>
                      {skill.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px',
                      fontSize: '9.5px',
                      color: '#34D399',
                      fontWeight: 700
                    }}>
                      <span>★ {skill.projects[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
