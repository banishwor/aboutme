import React, { useRef, useState } from 'react';
import { SpaceId, homeSpaces, coreApps } from '../content/apps';
import { IntroWidget } from './IntroWidget';
import { ConnectedSearch } from './ConnectedSearch';
import { AppTile } from './AppTile';
import { BookOpen, GitBranch, Sparkles, Feather, Gamepad2, ArrowRight } from 'lucide-react';

interface HomeLauncherProps {
  currentSpace: SpaceId;
  onSelectSpace: (space: SpaceId) => void;
  onLaunchApp: (appId: string) => void;
  onOpenSkills: () => void;
  isSearchOpen: boolean;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
}

export const HomeLauncher: React.FC<HomeLauncherProps> = ({
  currentSpace,
  onSelectSpace,
  onLaunchApp,
  onOpenSkills,
  isSearchOpen,
  onOpenSearch,
  onCloseSearch
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);

  const spaceIndex = homeSpaces.findIndex(s => s.id === currentSpace);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;

    // Check if horizontal swipe intent
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setSwipeOffset(diffX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect Swipe Up from Home to trigger Skills layer
    if (diffY < -60 && Math.abs(diffX) < 80) {
      onOpenSkills();
    } 
    // Detect horizontal swipe to switch spaces
    else if (Math.abs(diffX) > 50) {
      if (diffX < 0 && spaceIndex < homeSpaces.length - 1) {
        onSelectSpace(homeSpaces[spaceIndex + 1].id);
      } else if (diffX > 0 && spaceIndex > 0) {
        onSelectSpace(homeSpaces[spaceIndex - 1].id);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setSwipeOffset(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Horizontal Carousel Track */}
      <div
        style={{
          display: 'flex',
          width: '400%',
          height: '100%',
          transform: `translateX(calc(-${spaceIndex * 25}% + ${swipeOffset * 0.25}px))`,
          transition: swipeOffset === 0 ? 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}
      >
        {/* ================= SPACE 1: HOME ================= */}
        <div style={{
          width: '25%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 18px 8px',
          gap: '12px',
          overflowY: 'auto'
        }}>
          {/* 4×2 Intro Widget */}
          <IntroWidget onOpenAbout={() => onLaunchApp('about')} />

          {/* Connected Morphing Search Bar */}
          <ConnectedSearch 
            isOpen={isSearchOpen}
            onOpen={onOpenSearch}
            onClose={onCloseSearch}
            onLaunchApp={onLaunchApp}
          />

          {/* Launcher App Grid (Floating on Wallpaper, Dynamic 5/4-col Responsive) */}
          <div className="home-app-grid">
            {coreApps.map(app => (
              <AppTile key={app.id} app={app} onLaunch={onLaunchApp} />
            ))}
          </div>
        </div>

        {/* ================= SPACE 2: ROOTS ================= */}
        <div style={{
          width: '25%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 18px 8px',
          gap: '12px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <GitBranch size={18} color="#4F46E5" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                ROOTS // HERITAGE
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
              Cultural software and ancestral preservation initiatives for the Meitei community.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div 
                onClick={() => onLaunchApp('roots')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Athokpam Family Tree</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Genealogy database & interactive lineage matrix</p>
                </div>
                <ArrowRight size={16} color="#94A3B8" />
              </div>

              <div 
                onClick={() => onLaunchApp('projects')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Yek Salai (7 Clans)</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Meitei clan identification & eligibility guide</p>
                </div>
                <ArrowRight size={16} color="#94A3B8" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SPACE 3: CREATE ================= */}
        <div style={{
          width: '25%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 18px 8px',
          gap: '12px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Feather size={18} color="#0891B2" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                CREATE // EDITORIAL
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
              Literary publications, eBooks on Amazon Kindle, and indigenous storytelling.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div 
                onClick={() => onLaunchApp('books')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Published Bookshelf</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>The Echoes of Silence & Pushback</p>
                </div>
                <BookOpen size={16} color="#DC2626" />
              </div>

              <div 
                onClick={() => onLaunchApp('bani')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Bani Heritage Publication</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Native editorial reader for cultural stories</p>
                </div>
                <ArrowRight size={16} color="#94A3B8" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SPACE 4: PLAY ================= */}
        <div style={{
          width: '25%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 18px 8px',
          gap: '12px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '18px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Gamepad2 size={18} color="#EA580C" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                PLAY // EXPERIMENTS
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
              Gaming creator history, interactive physics, and arcade experiments.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div 
                onClick={() => onLaunchApp('gaming')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>HaloBan Media Archive</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>MLBB Influencer & gaming creator journey</p>
                </div>
                <ArrowRight size={16} color="#94A3B8" />
              </div>

              <div 
                onClick={() => onLaunchApp('lab')}
                className="pressable"
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Interactive Lab</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Touch canvas simulations & R&D</p>
                </div>
                <Sparkles size={16} color="#9333EA" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
