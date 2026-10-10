import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Calendar,
  Heart,
  Calculator,
  Briefcase,
  Play,
  RotateCcw,
  Wifi,
  Battery,
  Phone,
  MessageSquare,
  Globe,
  Camera,
  Square,
  ArrowRight,
  Minimize2,
  Mic,
  Settings,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { projects } from '../../content/projects';
import { profile } from '../../content/profile';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import { DeviceAppShowcase, AppId } from './DeviceAppShowcase';
import './SpatialDeviceLab.css';

interface SpatialDeviceLabProps {
  onSwitchToMobile?: () => void;
  onExploreNext?: () => void;
}

interface AppMeta {
  id: AppId;
  label: string;
  shortName: string;
  tag: string;
  icon: React.ReactNode;
}

const APPS: AppMeta[] = [
  { id: 'manipuri-calendar', label: 'Manipuri Calendar', shortName: 'Calendar', tag: 'Live Lunar PWA', icon: <Calendar size={13} /> },
  { id: 'yek-salai', label: 'Yek-Salai Meitei Clan', shortName: 'Yek-Salai', tag: 'Kinship & Genealogy', icon: <Heart size={13} /> },
  { id: 'manipur-calculator', label: 'Manipur Calculator', shortName: 'Calculator', tag: 'Land & Gold Math', icon: <Calculator size={13} /> },
  { id: 'khutsuman', label: 'Khutsuman Ledger', shortName: 'Khutsuman', tag: 'Daily Wage Manager', icon: <Briefcase size={13} /> }
];

export const SpatialDeviceLab: React.FC<SpatialDeviceLabProps> = ({
  onSwitchToMobile,
  onExploreNext
}) => {
  // selectedAppId controls the Left Telemetry Card
  const [selectedAppId, setSelectedAppId] = useState<AppId>('manipuri-calendar');
  // activeLaunchedApp controls the Phone screen (null = Android Home Screen)
  const [activeLaunchedApp, setActiveLaunchedApp] = useState<AppId | null>('manipuri-calendar');
  // isRecentsOpen controls the Android Multitasking App Switcher Carousel
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  // isDeviceVisible controls whether the Pixel 9 Pro is docked/visible (hidden initially)
  const [isDeviceVisible, setIsDeviceVisible] = useState(false);
  // Track whether the user has explicitly minimized the phone
  const [hasUserMinimized, setHasUserMinimized] = useState(false);
  // slideDirection controls directional motion when switching apps inside the phone: +1 for next, -1 for prev
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1180);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentTime, setCurrentTime] = useState('09:41');
  const actMountedTimeRef = React.useRef<number>(Date.now());

  useEffect(() => {
    actMountedTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const [homeToast, setHomeToast] = useState<string | null>(null);

  const showHomeToast = (msg: string) => {
    playClickSound(850, 0.03);
    setHomeToast(msg);
    setTimeout(() => {
      setHomeToast((prev) => (prev === msg ? null : prev));
    }, 2200);
  };

  const getGlanceDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  };

  // Natural inside-act scroll trigger: only if user has been on Act 2 for at least 1.2s,
  // has NOT manually minimized, and scrolls downwards
  const handleStageWheel = (e: React.WheelEvent) => {
    const elapsed = Date.now() - actMountedTimeRef.current;
    if (elapsed > 1200 && !isDeviceVisible && !hasUserMinimized && e.deltaY > 30) {
      setIsDeviceVisible(true);
    }
  };

  const activeIndex = APPS.findIndex((a) => a.id === selectedAppId);
  const currentProject = projects.find((p) => p.id === selectedAppId) || projects[0];

  const handlePrev = () => {
    playClickSound(750, 0.03);
    setSlideDirection(-1);
    const nextIdx = activeIndex === 0 ? APPS.length - 1 : activeIndex - 1;
    const nextId = APPS[nextIdx].id;
    setSelectedAppId(nextId);
    if (activeLaunchedApp !== null) {
      setActiveLaunchedApp(nextId);
    }
  };

  const handleNext = () => {
    playClickSound(800, 0.03);
    setSlideDirection(1);
    const nextIdx = activeIndex === APPS.length - 1 ? 0 : activeIndex + 1;
    const nextId = APPS[nextIdx].id;
    setSelectedAppId(nextId);
    if (activeLaunchedApp !== null) {
      setActiveLaunchedApp(nextId);
    }
  };

  const handleLaunchApp = (id: AppId) => {
    playSuccessChime();
    setHasUserMinimized(false);
    const newIdx = APPS.findIndex((a) => a.id === id);
    setSlideDirection(newIdx >= activeIndex ? 1 : -1);
    setSelectedAppId(id);
    setActiveLaunchedApp(id);
    setIsRecentsOpen(false);
    setIsDeviceVisible(true);
  };

  const handleSummonDevice = (id: AppId) => {
    playSuccessChime();
    setHasUserMinimized(false);
    setSelectedAppId(id);
    setActiveLaunchedApp(id);
    setIsDeviceVisible(true);
  };

  const handleMinimize = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound(700, 0.03);
    setHasUserMinimized(true);
    setIsDeviceVisible(false);
  };

  const handleGoHome = () => {
    playClickSound(650, 0.03);
    setActiveLaunchedApp(null);
    setIsRecentsOpen(false);
  };

  const handleToggleRecents = () => {
    playClickSound(850, 0.03);
    setIsRecentsOpen((prev) => !prev);
  };

  const handleQuickNextApp = () => {
    playClickSound(800, 0.02);
    const currentIdx = APPS.findIndex((a) => a.id === (activeLaunchedApp || selectedAppId));
    const nextIdx = (currentIdx + 1) % APPS.length;
    const nextId = APPS[nextIdx].id;
    setSelectedAppId(nextId);
    setActiveLaunchedApp(nextId);
    setIsRecentsOpen(false);
  };

  const handleQuickPrevApp = () => {
    playClickSound(750, 0.02);
    const currentIdx = APPS.findIndex((a) => a.id === (activeLaunchedApp || selectedAppId));
    const prevIdx = currentIdx === 0 ? APPS.length - 1 : currentIdx - 1;
    const prevId = APPS[prevIdx].id;
    setSelectedAppId(prevId);
    setActiveLaunchedApp(prevId);
    setIsRecentsOpen(false);
  };

  const ghAction = currentProject.actions.find((a) => a.type === 'github');
  const storeAction = currentProject.actions.find((a) => a.type === 'playstore' || a.type === 'pwa');

  const telemetryShift = isDeviceVisible ? (isCompact ? -150 : -185) : 0;

  return (
    <div className="vos-lab-stage" onWheel={handleStageWheel}>
      {/* ─────────────────────────────────────────────────────────────
          1. WARM ILLUMINATED STUDIO BACKDROP (Consistent with visionOS Sanctuary)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-lab-bg" />
      <div className="vos-lab-overlay" />

      {/* ─────────────────────────────────────────────────────────────
          2. SPATIAL SAFARI PILL TOOLBAR
          ───────────────────────────────────────────────────────────── */}
      <motion.header 
        className={`vos-lab-toolbar ${isDeviceVisible ? 'docked-active' : ''}`}
        animate={{
          x: telemetryShift,
          maxWidth: isDeviceVisible ? (isCompact ? 520 : 560) : 1220,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.85 }}
      >
        {/* Left: Navigation Buttons */}
        <div className="vos-lab-toolbar-left">
          <button
            onClick={handlePrev}
            title="Previous Application"
            className="vos-lab-pill-btn"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={handleNext}
            title="Next Application"
            className="vos-lab-pill-btn"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Center: Safari Spatial Pill Field with Section Title */}
        <div className="vos-lab-url-field">
          <Sparkles size={12} style={{ color: '#4F46E5', flexShrink: 0 }} />
          <span>{isDeviceVisible ? 'ATELIER' : 'THE SOFTWARE ATELIER'}</span>
        </div>

        {/* Right: Author Profile Pill + Optional Phone OS Switch */}
        <div className="vos-lab-toolbar-right">
          {onSwitchToMobile && (
            <button
              onClick={() => {
                playClickSound(850, 0.04);
                onSwitchToMobile();
              }}
              className="vos-lab-pill-btn vos-phone-os-btn"
              title="Switch to Mobile Phone OS"
            >
              <Smartphone size={12} />
              <span>Phone OS</span>
            </button>
          )}
          <div className="vos-author-pill">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="vos-author-avatar"
            />
            <span className="vos-author-name">{isDeviceVisible ? 'Banishwor' : 'Banishwor Athokpam'}</span>
          </div>
        </div>
      </motion.header>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN FLOATING LIQUID-GLASS LABORATORY WINDOW
          ───────────────────────────────────────────────────────────── */}
      <div 
        className={`vos-lab-window ${isDeviceVisible ? 'docked-mode' : 'overview-mode'}`}
        style={{ '--phone-offset': isCompact ? '150px' : '180px' } as React.CSSProperties}
      >
        {/* LEFT COLUMN: TELEMETRY & APP SELECTOR */}
        <motion.div 
          className="vos-lab-telemetry"
          animate={{ x: telemetryShift }}
          transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.85 }}
        >
          {/* Telemetry Frosted Glass Card (Light visionOS Style) */}
          <div className="vos-telemetry-card">
            {/* Integrated App Switcher Tabs Header (Matches Slide 3 & Slide 4) */}
            <div className="vos-telemetry-tabs-header">
              <div className="vos-telemetry-tabs">
                {APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      playClickSound(800, 0.03);
                      const newIdx = APPS.findIndex((a) => a.id === app.id);
                      setSlideDirection(newIdx >= activeIndex ? 1 : -1);
                      setSelectedAppId(app.id);
                      if (activeLaunchedApp !== null) {
                        setActiveLaunchedApp(app.id);
                        setIsRecentsOpen(false);
                      }
                    }}
                    className={`vos-app-tab-btn ${selectedAppId === app.id ? 'active' : ''}`}
                  >
                    {app.icon}
                    <span>{app.shortName}</span>
                  </button>
                ))}
              </div>

              <span className="vos-telemetry-badge-cat">
                NATIVE ATELIER
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                className="vos-telemetry-body"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <div className="vos-telemetry-header">
                  <span className="vos-status-badge">
                    <CheckCircle2 size={11} />
                    {currentProject.statusLabel.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                    {currentProject.category}
                  </span>
                </div>

                <h3 className="vos-app-title">{currentProject.title}</h3>
                <div className="vos-app-subtitle">{currentProject.subtitle}</div>
                <p className="vos-app-summary">{currentProject.summary}</p>

                {/* Architecture Highlights */}
                <div className="vos-arch-grid">
                  {currentProject.architectureHighlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="vos-arch-item">
                      <span className="vos-arch-bullet">▸</span>
                      <span className="vos-arch-text">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="vos-tech-tags">
                  {currentProject.techStack.map((tech, idx) => (
                    <span key={idx} className="vos-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="vos-lab-actions">
              {!isDeviceVisible ? (
                <button
                  onClick={() => handleSummonDevice(selectedAppId)}
                  className="vos-btn-launch-device"
                  title="Launch virtual Google Pixel 9 Pro simulator"
                >
                  <Sparkles size={14} className="vos-btn-sparkle-icon" />
                  <span>Test on Pixel 9 Pro</span>
                  <span className="vos-badge-live">LIVE SANDBOX</span>
                </button>
              ) : (
                <>
                  {activeLaunchedApp !== selectedAppId || isRecentsOpen ? (
                    <button
                      onClick={() => handleLaunchApp(selectedAppId)}
                      className="vos-btn-primary"
                      title="Launch this app on the device screen"
                    >
                      <Play size={13} fill="#FFFFFF" />
                      <span>Launch on Device</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleGoHome}
                      className="vos-btn-secondary"
                      title="Return phone to Android Home Screen"
                    >
                      <RotateCcw size={12} />
                      <span>Home</span>
                    </button>
                  )}
                  <button
                    onClick={handleMinimize}
                    className="vos-btn-secondary"
                    title="Minimize simulator back to overview"
                  >
                    <Minimize2 size={12} />
                    <span>Minimize</span>
                  </button>
                </>
              )}

              {ghAction && (
                <a
                  href={ghAction.url}
                  target="_blank"
                  rel="noreferrer"
                  className="vos-btn-secondary"
                  title="View Source on GitHub"
                >
                  <GitBranch size={12} />
                  <span>Source</span>
                </a>
              )}

              {storeAction && (
                <a
                  href={storeAction.url}
                  target="_blank"
                  rel="noreferrer"
                  className="vos-btn-playstore"
                  title="Open on Google Play Store"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M3.6 1.8L14.3 12.5L3.6 23.2C3.2 22.8 3 22.1 3 21.3V3.7C3 2.9 3.2 2.2 3.6 1.8Z" fill="#00C1FF"/>
                    <path d="M17.9 8.9L14.3 12.5L3.6 1.8C4.1 1.3 4.9 1.1 5.7 1.6L17.9 8.9Z" fill="#00E676"/>
                    <path d="M17.9 16.1L5.7 23.4C4.9 23.9 4.1 23.7 3.6 23.2L14.3 12.5L17.9 16.1Z" fill="#FF334B"/>
                    <path d="M21.7 11.2L17.9 8.9L14.3 12.5L17.9 16.1L21.7 13.8C22.6 13.3 22.6 12.3 21.7 11.2Z" fill="#FFBA00"/>
                  </svg>
                  <span>Google Play</span>
                </a>
              )}

              {onExploreNext && (
                <button
                  onClick={() => {
                    playClickSound(850, 0.04);
                    onExploreNext();
                  }}
                  className="vos-btn-ghost"
                  title="Explore The R&D Vault"
                  style={{ marginLeft: 'auto' }}
                >
                  <span>The R&D Vault →</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: UPRIGHT ERGONOMIC PIXEL 9 PRO FLAGSHIP EMULATOR */}
        <AnimatePresence>
          {isDeviceVisible && (
            <motion.div
              key="vos-phone-stage"
              className="vos-device-stage"
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 260, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.85 }}
            >
              {/* Ground Contact Ambient Occlusion Shadow */}
              <div className="vos-device-ground-shadow" />

          {/* Upright Phone Body with Authentic Hardware Frame */}
          <div className="vos-phone-frame">
            {/* Interactive OLED Screen Viewport */}
            <div className="vos-phone-screen">
              {/* Universal Top Android Status / Notification Bar */}
              <div 
                className="vos-android-status-bar"
                style={{
                  background: isRecentsOpen
                    ? 'rgba(11, 15, 25, 0.95)'
                    : activeLaunchedApp === 'manipuri-calendar'
                    ? '#800E13'
                    : activeLaunchedApp === 'yek-salai'
                    ? '#047857'
                    : activeLaunchedApp === 'manipur-calculator'
                    ? '#2563EB'
                    : activeLaunchedApp === 'khutsuman'
                    ? '#4338CA'
                    : '#0F172A',
                  color: '#FFFFFF'
                }}
              >
                <span className="vos-status-time">{currentTime}</span>
                {/* Dedicated camera clearance for Pixel 9 Pro punch hole */}
                <div className="vos-camera-clearance" />
                <div className="vos-status-icons">
                  <Wifi size={11} />
                  <span style={{ fontSize: '8.5px', fontWeight: 800 }}>5G</span>
                  <Battery size={12} />
                </div>
              </div>

              {/* Viewport for Active App / Home Screen / Recents */}
              <div className="vos-screen-viewport">
                {/* ────────────────────────────────────────────────────────
                    MODE A: ANDROID MULTITASKING / RECENTS OVERVIEW
                    ──────────────────────────────────────────────────────── */}
                {isRecentsOpen ? (
                  <div className="vos-recents-overview">
                    <div className="vos-recents-top-bar">
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>RUNNING APPS (4)</span>
                      <button
                        onClick={handleGoHome}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: 'none',
                          color: '#E2E8F0',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          cursor: 'pointer'
                        }}
                      >
                        Clear All
                      </button>
                    </div>

                    {/* Horizontal Scrollable Cards Carousel */}
                    <div className="vos-recents-carousel">
                      {APPS.map((app) => {
                        const proj = projects.find((p) => p.id === app.id);
                        const isCurrent = (activeLaunchedApp || selectedAppId) === app.id;
                        return (
                          <div
                            key={app.id}
                            onClick={() => handleLaunchApp(app.id)}
                            className={`vos-recents-card ${isCurrent ? 'active' : ''}`}
                            title={`Switch to ${app.label}`}
                          >
                            <div className="vos-recents-card-header">
                              <div className="vos-recents-icon-badge">
                                <img src={proj?.iconPath} alt={app.label} />
                              </div>
                              <div className="vos-recents-card-title">{app.label}</div>
                            </div>

                            <div className="vos-recents-card-preview">
                              <span style={{ fontSize: '10px', fontWeight: 800, color: '#A5B4FC' }}>
                                {app.tag}
                              </span>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '8px',
                                fontSize: '10px',
                                color: '#FFFFFF',
                                background: '#4F46E5',
                                padding: '4px 10px',
                                borderRadius: '999px'
                              }}>
                                <span>Tap to Open</span>
                                <ArrowRight size={10} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : activeLaunchedApp === null ? (
                  /* ────────────────────────────────────────────────────────
                     MODE B: ANDROID HOME SCREEN (Pixel 9 Pro Material You)
                     ──────────────────────────────────────────────────────── */
                  <div className="vos-android-home">
                    {/* Pixel At a Glance Widget */}
                    <div className="vos-pixel-glance">
                      <div className="vos-glance-date">{getGlanceDate()}</div>
                      <div className="vos-glance-weather">
                        <span className="vos-glance-temp">24°C</span>
                        <span className="vos-glance-cond">🌤️ Thoubal</span>
                      </div>
                    </div>

                    {/* App Grid Section */}
                    <div className="vos-home-apps-section">
                      {/* Row 1: Featured Portfolio Apps */}
                      <div className="vos-home-app-grid">
                        {APPS.map((app) => {
                          const proj = projects.find((p) => p.id === app.id);
                          return (
                            <button
                              key={app.id}
                              onClick={() => handleLaunchApp(app.id)}
                              className="vos-pixel-app-item"
                              title={`Launch ${app.label}`}
                            >
                              <div className="vos-pixel-icon-box">
                                <img
                                  src={proj?.iconPath}
                                  alt={app.shortName}
                                  className="vos-pixel-icon-img"
                                />
                              </div>
                              <span className="vos-pixel-app-label">{app.shortName}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Row 2: Familiar System Mock Apps */}
                      <div className="vos-home-app-grid">
                        <button
                          onClick={() => showHomeToast('Photos • System App')}
                          className="vos-pixel-app-item"
                          title="Google Photos"
                        >
                          <div className="vos-pixel-icon-box vos-mock-photos">
                            <ImageIcon size={22} color="#FFFFFF" />
                          </div>
                          <span className="vos-pixel-app-label">Photos</span>
                        </button>

                        <button
                          onClick={() => showHomeToast('Play Store • System App')}
                          className="vos-pixel-app-item"
                          title="Google Play Store"
                        >
                          <div className="vos-pixel-icon-box vos-mock-play">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M3.6 1.8L14.3 12.5L3.6 23.2C3.2 22.8 3 22.1 3 21.3V3.7C3 2.9 3.2 2.2 3.6 1.8Z" fill="#00C1FF"/>
                              <path d="M17.9 8.9L14.3 12.5L3.6 1.8C4.1 1.3 4.9 1.1 5.7 1.6L17.9 8.9Z" fill="#00E676"/>
                              <path d="M17.9 16.1L5.7 23.4C4.9 23.9 4.1 23.7 3.6 23.2L14.3 12.5L17.9 16.1Z" fill="#FF334B"/>
                              <path d="M21.7 11.2L17.9 8.9L14.3 12.5L17.9 16.1L21.7 13.8C22.6 13.3 22.6 12.3 21.7 11.2Z" fill="#FFBA00"/>
                            </svg>
                          </div>
                          <span className="vos-pixel-app-label">Play Store</span>
                        </button>

                        <button
                          onClick={() => showHomeToast('Maps • System App')}
                          className="vos-pixel-app-item"
                          title="Google Maps"
                        >
                          <div className="vos-pixel-icon-box vos-mock-maps">
                            <MapPin size={21} color="#FFFFFF" />
                          </div>
                          <span className="vos-pixel-app-label">Maps</span>
                        </button>

                        <button
                          onClick={() => showHomeToast('Settings • System App')}
                          className="vos-pixel-app-item"
                          title="Settings"
                        >
                          <div className="vos-pixel-icon-box vos-mock-settings">
                            <Settings size={21} color="#FFFFFF" />
                          </div>
                          <span className="vos-pixel-app-label">Settings</span>
                        </button>
                      </div>
                    </div>

                    {/* Google Search Pill */}
                    <div className="vos-pixel-search-bar" onClick={() => showHomeToast('Google Search')}>
                      <svg width="15" height="15" viewBox="0 0 24 24" className="vos-search-g-logo">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.28-2.09 3.66-5.18 3.66-9.14z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.41l4.03-3.13z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z"/>
                      </svg>
                      <span className="vos-search-placeholder">Search...</span>
                      <div className="vos-search-actions">
                        <Mic size={13} color="#94A3B8" />
                        <Camera size={13} color="#94A3B8" />
                      </div>
                    </div>

                    {/* Bottom Favorites Dock (Clean, unboxed, zero clipping) */}
                    <div className="vos-home-dock">
                      <button onClick={() => showHomeToast('Phone')} className="vos-dock-icon vos-dock-phone" title="Phone">
                        <Phone size={19} color="#FFFFFF" />
                      </button>
                      <button onClick={() => showHomeToast('Messages')} className="vos-dock-icon vos-dock-messages" title="Messages">
                        <MessageSquare size={19} color="#FFFFFF" />
                      </button>
                      <button onClick={() => showHomeToast('Chrome')} className="vos-dock-icon vos-dock-chrome" title="Chrome Browser">
                        <Globe size={19} color="#FFFFFF" />
                      </button>
                      <button onClick={() => showHomeToast('Camera')} className="vos-dock-icon vos-dock-camera" title="Camera">
                        <Camera size={19} color="#FFFFFF" />
                      </button>
                    </div>

                    {/* Toast Notification Pill */}
                    <AnimatePresence>
                      {homeToast && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="vos-pixel-toast"
                        >
                          <span>{homeToast}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* ────────────────────────────────────────────────────────
                     MODE C: LIVE SHOWCASE SCREEN (Directional Slide Animation)
                     ──────────────────────────────────────────────────────── */
                  <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                    <motion.div
                      key={activeLaunchedApp}
                      custom={slideDirection}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? '100%' : '-100%',
                          opacity: 0
                        }),
                        center: {
                          x: 0,
                          opacity: 1
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? '-100%' : '100%',
                          opacity: 0
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 320, damping: 30 },
                        opacity: { duration: 0.18 }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <DeviceAppShowcase
                        appId={activeLaunchedApp}
                        onHome={handleGoHome}
                        onOpenRecents={handleToggleRecents}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* ────────────────────────────────────────────────────────
                  REAL ANDROID 3-BUTTON & QUICK APP SWITCHER NAVIGATION BAR
                  ──────────────────────────────────────────────────────── */}
              <div className="vos-android-nav-bar">
                {/* 1. Back button (◀) */}
                <button
                  onClick={activeLaunchedApp !== null ? handleGoHome : undefined}
                  className="vos-nav-btn"
                  title="Back"
                  disabled={activeLaunchedApp === null && !isRecentsOpen}
                  style={{ opacity: activeLaunchedApp === null && !isRecentsOpen ? 0.35 : 1 }}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* 2. Previous App Quick Switch (<) */}
                {activeLaunchedApp !== null && !isRecentsOpen && (
                  <button
                    onClick={handleQuickPrevApp}
                    className="vos-nav-quick-btn"
                    title="Slide to Previous App"
                  >
                    ◀
                  </button>
                )}

                {/* 3. Center Android Home Gesture Pill (—) */}
                <button
                  onClick={handleGoHome}
                  className="vos-nav-home-pill"
                  title="Android Home"
                >
                  <div className="vos-nav-pill-core" />
                </button>

                {/* 4. Next App Quick Switch (>) */}
                {activeLaunchedApp !== null && !isRecentsOpen && (
                  <button
                    onClick={handleQuickNextApp}
                    className="vos-nav-quick-btn"
                    title="Slide to Next App"
                  >
                    ▶
                  </button>
                )}

                {/* 5. Android Recents / Multitasking Switcher (■) */}
                <button
                  onClick={handleToggleRecents}
                  className={`vos-nav-btn ${isRecentsOpen ? 'active' : ''}`}
                  title="App Switcher (Overview)"
                >
                  <Square size={12} />
                </button>
              </div>
            </div>

            {/* Authentic Open-Source Google Pixel 9 Pro Bezel Hardware Overlay */}
            <img
              src="/devices/pixel-9-pro.png"
              alt="Google Pixel 9 Pro Bezel"
              className="vos-phone-hardware-bezel"
            />


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
  );
};

