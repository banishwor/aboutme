import React, { useState, useEffect } from 'react';
import { profile } from '../content/profile';
import { MapPin, Sparkles, ArrowUpRight, CloudSun, Instagram, X } from 'lucide-react';

interface IntroWidgetProps {
  onOpenAbout: () => void;
}

export const IntroWidget: React.FC<IntroWidgetProps> = ({ onOpenAbout }) => {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [subtitleIndex, setSubtitleIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtitle cycler (changes every 3.2s)
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % profile.subtitles.length);
        setFade(true);
      }, 250);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss easter egg after 7s
  useEffect(() => {
    if (showEasterEgg) {
      const timer = setTimeout(() => {
        setShowEasterEgg(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showEasterEgg]);

  // Time format calculations
  const rawHours = time.getHours();
  const hours = is24Hour 
    ? rawHours.toString().padStart(2, '0') 
    : (rawHours % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = rawHours >= 12 ? 'PM' : 'AM';
  const colonVisible = time.getSeconds() % 2 === 0;

  // Date formatting
  const weekday = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = time.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = time.getDate();

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '118px 1fr',
        gap: '10px',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* WIDGET 1: Standalone Clock & System Glance (Compact 2×2 footprint) */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setIs24Hour(!is24Hour);
        }}
        title="Tap to toggle 12h / 24h format"
        className="liquid-glass pressable"
        style={{
          borderRadius: '24px',
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          minHeight: '108px',
          boxSizing: 'border-box'
        }}
      >
        {/* Header: Live Indicator + Mode Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)'
            }} />
            <span style={{
              fontSize: '8.5px',
              fontWeight: 800,
              letterSpacing: '0.6px',
              color: '#0F172A',
              fontFamily: 'var(--font-mono)'
            }}>
              LIVE
            </span>
          </div>

          <span style={{
            fontSize: '8.5px',
            fontWeight: 700,
            padding: '1px 5px',
            borderRadius: '5px',
            background: 'rgba(15, 23, 42, 0.06)',
            color: '#475569',
            fontFamily: 'var(--font-mono)'
          }}>
            {is24Hour ? '24H' : ampm}
          </span>
        </div>

        {/* Digital Time Display */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '2px 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            lineHeight: 1
          }}>
            <span style={{
              fontSize: '23px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '-0.5px',
              color: '#0F172A'
            }}>
              {hours}
            </span>
            <span style={{
              fontSize: '21px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#4F46E5',
              opacity: colonVisible ? 1 : 0.25,
              transition: 'opacity 0.2s ease',
              margin: '0 1px'
            }}>
              :
            </span>
            <span style={{
              fontSize: '23px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '-0.5px',
              color: '#0F172A'
            }}>
              {minutes}
            </span>
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: '#94A3B8',
            marginTop: '3px'
          }}>
            :{seconds}s
          </span>
        </div>

        {/* Footer: Date & Weather */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '9.5px',
          color: '#64748B',
          fontWeight: 600
        }}>
          <span style={{
            color: '#4F46E5',
            background: 'rgba(79, 70, 229, 0.08)',
            padding: '1px 4px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '8.5px'
          }}>
            {weekday} {dayNum} {month}
          </span>

          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '9.5px',
            color: '#64748B'
          }}>
            <CloudSun size={10} color="#F59E0B" />
            <span>24°</span>
          </span>
        </div>
      </div>

      {/* WIDGET 2: Standalone Profile & Identity Card (Expanded Footprint) */}
      <div 
        onClick={onOpenAbout}
        className="liquid-glass pressable"
        style={{
          borderRadius: '24px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          minHeight: '108px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Top: Bigger Avatar + Name + Dynamic Title + Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          {/* Avatar with Clickable Easter Egg trigger */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setShowEasterEgg(prev => !prev);
            }}
            title="Tap for 4K version 🔍"
            className="pressable"
            style={{ 
              position: 'relative', 
              flexShrink: 0,
              cursor: 'pointer'
            }}
          >
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '15px',
                objectFit: 'cover',
                border: '1.5px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 3px 10px rgba(15, 23, 42, 0.08)',
                display: 'block'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%234F46E5"/><text x="24" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">BA</text></svg>';
              }}
            />
            <span 
              title="Available for opportunities"
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10B981',
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 5px rgba(16, 185, 129, 0.5)'
              }} 
            />
          </div>

          {/* Name & Dynamic Cycler Title */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px'
            }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#0F172A',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2
              }}>
                Banishwor Athokpam
              </h2>
              <span style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#4F46E5',
                background: 'rgba(79, 70, 229, 0.08)',
                padding: '2px 6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                flexShrink: 0
              }}>
                <Sparkles size={9} />
                80.3%
              </span>
            </div>

            {/* Dynamic Cycler Title */}
            <div style={{
              marginTop: '4px',
              height: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#4F46E5',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(-2px)'
              }}>
                {profile.subtitles[subtitleIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Location & Bio Tap Cue */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '10.5px',
          color: '#64748B',
          borderTop: '1px solid rgba(15, 23, 42, 0.05)',
          paddingTop: '6px',
          marginTop: '6px'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            color: '#64748B',
            fontWeight: 500
          }}>
            <MapPin size={11} color="#94A3B8" />
            {profile.location}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            color: '#4F46E5',
            fontWeight: 700,
            fontSize: '10.5px',
            background: 'rgba(79, 70, 229, 0.06)',
            padding: '2px 7px',
            borderRadius: '6px'
          }}>
            Bio <ArrowUpRight size={11} />
          </span>
        </div>

        {/* Humorous Avatar Easter Egg Popover (Option B) */}
        {showEasterEgg && (
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 20,
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.12)',
              animation: 'popIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span style={{ fontSize: '13px' }}>🔍</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0F172A',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.2px'
                }}>
                  Enhance... Error 404!
                </span>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEasterEgg(false);
                }}
                className="pressable"
                title="Close"
                style={{
                  background: 'rgba(15, 23, 42, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                <X size={12} />
              </button>
            </div>

            {/* Funny Message */}
            <p style={{
              fontSize: '10.5px',
              color: '#334155',
              lineHeight: 1.35,
              margin: '2px 0',
              fontWeight: 500
            }}>
              Widget is too small for this face 😉 Check Instagram for the 4K version!
            </p>

            {/* Action Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <a 
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="pressable"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(253, 29, 29, 0.25)'
                }}
              >
                <Instagram size={11} />
                <span>Stalk @banishwor_ath on IG</span>
                <ArrowUpRight size={10} />
              </a>

              <span style={{ fontSize: '9px', color: '#94A3B8' }}>
                4K Edition 📸
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
