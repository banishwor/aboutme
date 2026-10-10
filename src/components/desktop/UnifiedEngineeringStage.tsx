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
  Minimize2,
  Wifi,
  Battery,
  Layers,
  Terminal,
  Cpu,
  Feather,
  Pin,
  GraduationCap,
  AlertTriangle,
  ExternalLink,
  Music,
  Gamepad2,
  Compass,
  BookOpen,
  Moon,
  Sun,
  Mail
} from 'lucide-react';
import { projects, ProjectItem } from '../../content/projects';
import { profile } from '../../content/profile';
import { degrees } from '../../content/education';
import { researchAndCertifications } from '../../content/education';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import { DeviceAppShowcase, AppId } from './DeviceAppShowcase';
import { HeritagePublicationStage, CURATED_POSTS } from './HeritagePublicationStage';
import { ResearchHpcStage } from './ResearchHpcStage';
import { AcademicEducationStage } from './AcademicEducationStage';
import { DigitalStudioStage, STUDIO_PLAYLIST } from './DigitalStudioStage';
import { GamingWormholeStage } from './GamingWormholeStage';
import { WorkExperienceStage } from './WorkExperienceStage';
import { HobbiesPassionsStage } from './HobbiesPassionsStage';
import { AuthorBookshelfStage } from './AuthorBookshelfStage';
import { FinaleDeskStage } from './FinaleDeskStage';
import { ChibiMascotBooper } from './ChibiMascotBooper';
import { ChibiMascotSunrise } from './ChibiMascotSunrise';
import './UnifiedEngineeringStage.css';

interface UnifiedEngineeringStageProps {
  activeAct: 'act-apps' | 'act-vault' | 'act-books' | 'act-research' | 'act-education' | 'act-media' | 'act-gaming' | 'act-experience' | 'act-hobbies' | 'act-author' | 'act-words' | 'act-contact';
  onNavigateAct: (actId: string) => void;
  onRestartJourney?: () => void;
  onSwitchToMobile?: () => void;
  onExploreNext?: () => void;
}

interface AtelierAppMeta {
  id: AppId;
  label: string;
  shortName: string;
  tag: string;
  icon: React.ReactNode;
}

const ATELIER_APPS: AtelierAppMeta[] = [
  { id: 'manipuri-calendar', label: 'Manipuri Calendar', shortName: 'Calendar', tag: 'Live Lunar PWA', icon: <Calendar size={13} /> },
  { id: 'yek-salai', label: 'Yek-Salai Meitei Clan', shortName: 'Yek-Salai', tag: 'Kinship & Genealogy', icon: <Heart size={13} /> },
  { id: 'manipur-calculator', label: 'Manipur Calculator', shortName: 'Calculator', tag: 'Land & Gold Math', icon: <Calculator size={13} /> },
  { id: 'khutsuman', label: 'Khutsuman Ledger', shortName: 'Khutsuman', tag: 'Daily Wage Manager', icon: <Briefcase size={13} /> }
];

export const UnifiedEngineeringStage: React.FC<UnifiedEngineeringStageProps> = ({
  activeAct,
  onNavigateAct,
  onRestartJourney,
  onSwitchToMobile,
  onExploreNext: _onExploreNext
}) => {
  // -------------------------------------------------------------
  // SPATIAL DOCK STATE (APPROACH B: FLOATING PHONE + DOSSIER WINDOW)
  // -------------------------------------------------------------
  const [isPhoneDocked, setIsPhoneDocked] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1240);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // -------------------------------------------------------------
  // STATE FOR ACT 02: THE SOFTWARE ATELIER
  // -------------------------------------------------------------
  const [selectedAtelierAppId, setSelectedAtelierAppId] = useState<AppId>('manipuri-calendar');
  const [activeLaunchedApp, setActiveLaunchedApp] = useState<AppId | null>('manipuri-calendar');
  const [currentTime, setCurrentTime] = useState('09:41');

  // -------------------------------------------------------------
  // STATE FOR ACT 03: THE R&D VAULT
  // -------------------------------------------------------------
  const archiveProjects = projects.filter(p => p.category === 'Engineering Archives');
  const [selectedVaultId, setSelectedVaultId] = useState<string>(archiveProjects[0]?.id || 'leikaifix');

  // -------------------------------------------------------------
  // STATE FOR ACT 04, 05, 06, 07, 08 (EMBEDDED SUBSTAGES)
  // -------------------------------------------------------------
  const [heritageIndex, setHeritageIndex] = useState<number>(0);
  const [researchIndex, setResearchIndex] = useState<number>(0);
  const [academicIndex, setAcademicIndex] = useState<number>(0);
  const [isNoticePinned, setIsNoticePinned] = useState<boolean>(false);
  const [musicIndex, setMusicIndex] = useState<number>(0);

  // Dark mode is initiated in Act 08 (Gaming Portal) and strictly active across Acts 09 & 10
  // In Act 11, Chibi mascot wakes up and clicks light back on with a 2.2s golden sunrise cross-fade!
  const [isGamingDarkMode, setIsGamingDarkMode] = useState<boolean>(false);
  const [isButtonDepressed, setIsButtonDepressed] = useState<boolean>(false);
  const [isAct11SunriseTriggered, setIsAct11SunriseTriggered] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedPillarIndex, setSelectedPillarIndex] = useState<number>(0);

  const isDarkMode =
    (activeAct === 'act-gaming' && isGamingDarkMode) ||
    activeAct === 'act-experience' ||
    activeAct === 'act-hobbies' ||
    (activeAct === 'act-author' && !isAct11SunriseTriggered);

  // Automatically reset sunrise state when scrolling away from Act 11 so she comes automatically upon arrival
  useEffect(() => {
    if (activeAct !== 'act-author') {
      setIsAct11SunriseTriggered(false);
    }
  }, [activeAct]);


  // Android Status Bar Clock
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

  const currentAtelierProject = projects.find((p) => p.id === selectedAtelierAppId) || projects[0];
  const currentVaultProject = archiveProjects.find(p => p.id === selectedVaultId) || archiveProjects[0];

  const handleSummonPhone = (appId?: AppId) => {
    playSuccessChime();
    setIsPhoneDocked(true);
    if (appId) {
      setSelectedAtelierAppId(appId);
      setActiveLaunchedApp(appId);
    }
  };

  const handleMinimizePhone = () => {
    playClickSound(700, 0.04);
    setIsPhoneDocked(false);
  };

  const handleToggleNoticePinned = () => {
    if (!isNoticePinned) {
      playSuccessChime();
      setIsNoticePinned(true);
    } else {
      playClickSound(750, 0.03);
      setIsNoticePinned(false);
    }
  };

  // -------------------------------------------------------------
  // UNIVERSAL CHEVRON HANDLERS FOR PERSISTENT SAFARI PILL TOOLBAR
  // -------------------------------------------------------------
  const handleUniversalPrev = () => {
    playClickSound(750, 0.03);
    if (activeAct === 'act-apps') {
      const idx = ATELIER_APPS.findIndex(a => a.id === selectedAtelierAppId);
      const prevIdx = idx <= 0 ? ATELIER_APPS.length - 1 : idx - 1;
      setSelectedAtelierAppId(ATELIER_APPS[prevIdx].id);
      setActiveLaunchedApp(ATELIER_APPS[prevIdx].id);
    } else if (activeAct === 'act-vault') {
      const idx = archiveProjects.findIndex(p => p.id === selectedVaultId);
      const prevIdx = idx <= 0 ? archiveProjects.length - 1 : idx - 1;
      setSelectedVaultId(archiveProjects[prevIdx].id);
    } else if (activeAct === 'act-books') {
      setHeritageIndex(prev => (prev <= 0 ? CURATED_POSTS.length - 1 : prev - 1));
    } else if (activeAct === 'act-research') {
      setResearchIndex(prev => (prev <= 0 ? researchAndCertifications.length - 1 : prev - 1));
    } else if (activeAct === 'act-education') {
      setAcademicIndex(prev => (prev <= 0 ? degrees.length - 1 : prev - 1));
    } else if (activeAct === 'act-media') {
      setMusicIndex(prev => (prev <= 0 ? STUDIO_PLAYLIST.length - 1 : prev - 1));
    } else if (activeAct === 'act-author') {
      setSelectedBookId(prev => (prev === 'echoes-of-silence' ? 'pushback' : 'echoes-of-silence'));
    } else if (activeAct === 'act-words') {
      setSelectedPillarIndex(prev => (prev <= 0 ? 3 : prev - 1));
    }
  };

  const handleUniversalNext = () => {
    playClickSound(800, 0.03);
    if (activeAct === 'act-apps') {
      const idx = ATELIER_APPS.findIndex(a => a.id === selectedAtelierAppId);
      const nextIdx = idx >= ATELIER_APPS.length - 1 ? 0 : idx + 1;
      setSelectedAtelierAppId(ATELIER_APPS[nextIdx].id);
      setActiveLaunchedApp(ATELIER_APPS[nextIdx].id);
    } else if (activeAct === 'act-vault') {
      const idx = archiveProjects.findIndex(p => p.id === selectedVaultId);
      const nextIdx = idx >= archiveProjects.length - 1 ? 0 : idx + 1;
      setSelectedVaultId(archiveProjects[nextIdx].id);
    } else if (activeAct === 'act-books') {
      setHeritageIndex(prev => (prev >= CURATED_POSTS.length - 1 ? 0 : prev + 1));
    } else if (activeAct === 'act-research') {
      setResearchIndex(prev => (prev >= researchAndCertifications.length - 1 ? 0 : prev + 1));
    } else if (activeAct === 'act-education') {
      setAcademicIndex(prev => (prev >= degrees.length - 1 ? 0 : prev + 1));
    } else if (activeAct === 'act-media') {
      setMusicIndex(prev => (prev >= STUDIO_PLAYLIST.length - 1 ? 0 : prev + 1));
    } else if (activeAct === 'act-author') {
      setSelectedBookId(prev => (prev === 'echoes-of-silence' ? 'pushback' : 'echoes-of-silence'));
    } else if (activeAct === 'act-words') {
      setSelectedPillarIndex(prev => (prev >= 3 ? 0 : prev + 1));
    }
  };

  // Vault status styling
  const getVaultStatusStyle = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Prototype':
        return { bg: 'rgba(234, 88, 12, 0.1)', border: 'rgba(234, 88, 12, 0.35)', text: '#C2410C', dot: '#EA580C' };
      case 'Archived':
        return { bg: 'rgba(147, 51, 234, 0.1)', border: 'rgba(147, 51, 234, 0.35)', text: '#7E22CE', dot: '#9333EA' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.12)', border: 'rgba(100, 116, 139, 0.35)', text: '#475569', dot: '#64748B' };
    }
  };

  const getVaultThemeClass = (id: string) => {
    if (id === 'ai-keyboard') return 'purple';
    if (id === 'viral-prompts') return 'slate';
    return '';
  };

  const vaultStatusStyle = getVaultStatusStyle(currentVaultProject.status);
  const ghAction = currentAtelierProject.actions.find((a) => a.type === 'github');
  const storeAction = currentAtelierProject.actions.find((a) => a.type === 'playstore' || a.type === 'pwa');

  const isPhoneVisible = activeAct === 'act-vault' ? true : isPhoneDocked;

  // -------------------------------------------------------------
  // DYNAMIC STAGE METRICS (SYNCHRONIZED SPRING CONTINUITY)
  // Perfectly pairs the Safari Pill Toolbar with whichever card is active!
  // -------------------------------------------------------------
  const getStageMetrics = () => {
    if (activeAct === 'act-apps') {
      const width = isPhoneVisible ? (isCompact ? 600 : 680) : 820;
      const shift = isPhoneVisible ? (isCompact ? -155 : -175) : 0;
      return { width, shift };
    }
    if (activeAct === 'act-vault') {
      const width = isCompact ? 600 : 680;
      const shift = isCompact ? -155 : -175;
      return { width, shift };
    }
    if (activeAct === 'act-books') {
      const width = isCompact ? 980 : 1220;
      return { width, shift: 0 };
    }
    if (activeAct === 'act-research') {
      const width = isCompact ? 1020 : 1220;
      return { width, shift: 0 };
    }
    if (activeAct === 'act-education') {
      const width = isNoticePinned ? (isCompact ? 560 : 620) : (isCompact ? 760 : 820);
      const shift = isNoticePinned ? (isCompact ? -185 : -210) : 0;
      return { width, shift };
    }
    if (activeAct === 'act-media' || activeAct === 'act-gaming' || activeAct === 'act-experience' || activeAct === 'act-hobbies' || activeAct === 'act-author' || activeAct === 'act-words' || activeAct === 'act-contact') {
      const width = isCompact ? 1020 : 1220;
      return { width, shift: 0 };
    }
    return { width: 820, shift: 0 };
  };

  const { width: toolbarWidth, shift: toolbarShift } = getStageMetrics();

  // Act 02/03 dossier dimensions
  const dossierWidth = isPhoneVisible ? (isCompact ? 600 : 680) : 820;
  const dossierShift = isPhoneVisible ? (isCompact ? -155 : -175) : 0;

  return (
    <div className={`vos-unified-stage ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          1. STATIONARY WARM SUNLIT ARCHITECTURAL STUDIO BACKDROP
          (Remains strictly stationary across Acts 02 to 08)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-unified-bg" />
      <div className="vos-unified-overlay" />

      {/* 1b. Slow Luxurious Dark Mode Atmospheric Cross-Fade Overlays */}
      <motion.div
        className="vos-unified-bg-dark"
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />
      <motion.div
        className="vos-unified-bg-dark-nebula"
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />


      {/* ─────────────────────────────────────────────────────────────
          2. CENTER SHELL (Vertically Centered in 100vh Viewport)
          Strictly couples Toolbar + Card with a snug 14px gap!
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-stage-center-shell">
        {/* PERSISTENT SAFARI PILL TOOLBAR (Continuously mounted across all 5 acts) */}
        <motion.header
          className={`vos-unified-toolbar ${toolbarShift !== 0 ? 'docked' : 'centered'}`}
          animate={{
            x: toolbarShift,
            width: toolbarWidth,
            maxWidth: toolbarWidth
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
        >
          {/* Left: Previous / Next Item Arrows */}
          <div className="vos-unified-toolbar-left">
            <button
              onClick={handleUniversalPrev}
              title="Previous item"
              className="vos-unified-pill-btn"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={handleUniversalNext}
              title="Next item"
              className="vos-unified-pill-btn"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Center: Safari Spatial Pill Field with Morphing Title */}
          <div className="vos-unified-url-field">
            <AnimatePresence mode="wait">
              {activeAct === 'act-apps' ? (
                <motion.div
                  key="act-apps-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Layers size={12} style={{ color: '#4F46E5', flexShrink: 0 }} />
                  <span>{isPhoneVisible ? 'ATELIER' : 'THE SOFTWARE ATELIER'}</span>
                </motion.div>
              ) : activeAct === 'act-vault' ? (
                <motion.div
                  key="act-vault-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Terminal size={12} style={{ color: '#D97706', flexShrink: 0 }} />
                  <span>{isCompact ? 'VAULT' : 'THE R&D VAULT // POST-MORTEMS'}</span>
                </motion.div>
              ) : activeAct === 'act-books' ? (
                <motion.div
                  key="act-books-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Feather size={12} style={{ color: '#D97706', flexShrink: 0 }} />
                  <span>VOICES OF MEITEI HERITAGE</span>
                </motion.div>
              ) : activeAct === 'act-research' ? (
                <motion.div
                  key="act-research-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Cpu size={12} style={{ color: '#06B6D4', flexShrink: 0 }} />
                  <span>HPC BENCHMARKS & RESEARCH</span>
                </motion.div>
              ) : activeAct === 'act-education' ? (
                <motion.div
                  key="act-education-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <GraduationCap size={12} style={{ color: '#4F46E5', flexShrink: 0 }} />
                  <span>{isNoticePinned ? 'GAZETTE' : 'ACADEMIC FOUNDATIONS'}</span>
                </motion.div>
              ) : activeAct === 'act-media' ? (
                <motion.div
                  key="act-media-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Music size={12} style={{ color: '#EC4899', flexShrink: 0 }} />
                  <span>DIGITAL MUSIC STUDIO · JUKEBOX</span>
                </motion.div>
              ) : activeAct === 'act-gaming' ? (
                <motion.div
                  key="act-gaming-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Gamepad2 size={12} style={{ color: '#8B5CF6', flexShrink: 0 }} />
                  <span>THE GAMING WORMHOLE</span>
                </motion.div>
              ) : activeAct === 'act-experience' ? (
                <motion.div
                  key="act-experience-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Briefcase size={12} style={{ color: '#818CF8', flexShrink: 0 }} />
                  <span>PROFESSIONAL TRAJECTORY</span>
                </motion.div>
              ) : activeAct === 'act-hobbies' ? (
                <motion.div
                  key="act-hobbies-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Compass size={12} style={{ color: '#F43F5E', flexShrink: 0 }} />
                  <span>CREATIVE PASSIONS & HOBBIES</span>
                </motion.div>
              ) : activeAct === 'act-author' ? (
                <motion.div
                  key="act-author-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <BookOpen size={12} style={{ color: '#D97706', flexShrink: 0 }} />
                  <span>THE AUTHOR&apos;S SANCTUARY</span>
                </motion.div>
              ) : activeAct === 'act-words' ? (
                <motion.div
                  key="act-words-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Heart size={12} style={{ color: '#E11D48', flexShrink: 0 }} />
                  <span>MY IDEOLOGY · WHY I BUILD</span>
                </motion.div>
              ) : (
                <motion.div
                  key="act-contact-pill"
                  className="vos-pill-morph-content"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Mail size={12} style={{ color: '#059669', flexShrink: 0 }} />
                  <span>GET IN TOUCH · DIRECT CONNECT</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Author Profile Pill + Optional Act 06 Pin Toggle + Dark Mode Toggle + Mascot + Optional Phone OS */}
          <div className="vos-unified-toolbar-right" style={{ position: 'relative', overflow: 'visible' }}>
            {/* Act 11 Chibi Mascot Sunrise Awakening & Theme Toggle Button */}
            {activeAct === 'act-author' && (
              <div style={{ position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
                <ChibiMascotSunrise
                  key={`chibi-sunrise-${activeAct}`}
                  isDaylight={isAct11SunriseTriggered}
                  onSunrise={() => setIsAct11SunriseTriggered(true)}
                  onButtonPressStateChange={(pressed) => setIsButtonDepressed(pressed)}
                />

                <motion.button
                  id="toolbar-author-theme-toggle"
                  animate={{
                    scale: isButtonDepressed ? 0.85 : 1,
                    y: isButtonDepressed ? 2 : 0
                  }}
                  transition={{ duration: 0.12 }}
                  onClick={() => {
                    playClickSound(800, 0.04);
                    setIsAct11SunriseTriggered(prev => !prev);
                  }}
                  className={`vos-unified-pill-btn vos-theme-toggle-btn ${!isAct11SunriseTriggered ? 'dark-active' : ''}`}
                  title={isAct11SunriseTriggered ? 'Switch to Cozy Night Reading Lamp' : 'Switch to Sunlit Daylight Sanctuary'}
                >
                  {isAct11SunriseTriggered ? (
                    <>
                      <Sun size={12} style={{ color: '#F59E0B' }} />
                      <span>Daylight</span>
                    </>
                  ) : (
                    <>
                      <Moon size={12} style={{ color: '#D4AF37' }} />
                      <span>Night</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}

            {/* Act 08 Cute Mascot Easter Egg & Dark Mode Button (ONLY on Act 08 Gaming Portal) */}
            {activeAct === 'act-gaming' && (
              <div style={{ position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
                <ChibiMascotBooper
                  isDarkMode={isDarkMode}
                  onBoopToggle={() => setIsGamingDarkMode(true)}
                  onButtonPressStateChange={(pressed) => setIsButtonDepressed(pressed)}
                />

                <motion.button
                  id="toolbar-dark-toggle"
                  animate={{
                    scale: isButtonDepressed ? 0.85 : 1,
                    y: isButtonDepressed ? 2 : 0
                  }}
                  transition={{ duration: 0.12 }}
                  onClick={() => {
                    playClickSound(800, 0.04);
                    setIsGamingDarkMode(prev => !prev);
                  }}
                  className={`vos-unified-pill-btn vos-theme-toggle-btn ${isDarkMode ? 'dark-active' : ''}`}
                  title={isDarkMode ? 'Switch to Sunlit Daylight Mode' : 'Switch to Midnight Dark Mode'}
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={12} style={{ color: '#FBBF24' }} />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon size={12} style={{ color: '#8B5CF6' }} />
                      <span>Dark</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}

            {activeAct === 'act-education' && (
              <button
                onClick={handleToggleNoticePinned}
                className={`vos-unified-pill-btn vos-pin-notice-btn ${isNoticePinned ? 'pinned' : ''}`}
                title={isNoticePinned ? 'Unpin Gazette from wall' : 'Pin Official Rank Gazette to wall'}
              >
                <Pin size={12} style={{ color: isNoticePinned ? '#EF4444' : undefined }} />
                <span>{isNoticePinned ? 'Unpin Gazette' : 'Pin Gazette'}</span>
              </button>
            )}

            {activeAct === 'act-contact' ? (
              <a
                href="https://banishwor.github.io/"
                target="_blank"
                rel="noreferrer"
                className="vos-unified-pill-btn vos-phone-os-btn"
                title="Explore Apps Portfolio (banishwor.github.io)"
                style={{ textDecoration: 'none' }}
              >
                <Smartphone size={12} />
                <span>Apps</span>
              </a>
            ) : (
              onSwitchToMobile && (
                <button
                  onClick={() => {
                    playClickSound(850, 0.04);
                    onSwitchToMobile();
                  }}
                  className="vos-unified-pill-btn vos-phone-os-btn"
                  title="Switch to Mobile Phone OS"
                >
                  <Smartphone size={12} />
                  <span>Phone OS</span>
                </button>
              )
            )}

            <div className="vos-unified-author-pill">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="vos-unified-author-avatar"
              />
              <span className="vos-unified-author-name">
                {toolbarShift !== 0 || isCompact ? 'Bani' : 'Banishwor Athokpam'}
              </span>
            </div>
          </div>
        </motion.header>

        {/* ─────────────────────────────────────────────────────────────
            3. SUBSTAGE CONTENT HOST (Sitting strictly 14px below toolbar)
            ───────────────────────────────────────────────────────────── */}
        <div className="vos-substage-content-host">
          <AnimatePresence mode="wait">
            {activeAct === 'act-apps' || activeAct === 'act-vault' ? (
              <motion.div
                key="stage-act-engineering"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="vos-spatial-workspace">
                  {/* PANEL 1: FROSTED GLASS DOSSIER WINDOW (LEFT) */}
                  <motion.div
                    className={`vos-dossier-window ${isPhoneVisible ? 'docked' : 'centered'}`}
                    animate={{
                      x: dossierShift,
                      width: dossierWidth
                    }}
                    transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
                  >
                    {/* Window Header Row: Tabs on Left, Meta Switcher on Right */}
                    <div className="vos-unified-card-header">
                      <div className="vos-unified-tabs-wrapper">
                        <AnimatePresence mode="wait">
                          {activeAct === 'act-apps' ? (
                            <motion.div
                              key="act-apps-tabs"
                              className="vos-unified-tabs-group"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 6 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                              {ATELIER_APPS.map((app) => (
                                <button
                                  key={app.id}
                                  onClick={() => {
                                    playClickSound(800, 0.03);
                                    setSelectedAtelierAppId(app.id);
                                    setActiveLaunchedApp(app.id);
                                  }}
                                  className={`vos-unified-tab-btn ${selectedAtelierAppId === app.id ? 'active' : ''}`}
                                >
                                  {app.icon}
                                  <span>{app.shortName}</span>
                                </button>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="act-vault-tabs"
                              className="vos-unified-tabs-group"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 6 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                              {archiveProjects.map((proj) => (
                                <button
                                  key={proj.id}
                                  onClick={() => {
                                    playClickSound(800, 0.03);
                                    setSelectedVaultId(proj.id);
                                  }}
                                  className={`vos-unified-tab-btn ${selectedVaultId === proj.id ? 'active' : ''}`}
                                >
                                  <Sparkles size={12} />
                                  <span>{proj.title}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right Header Act Badge */}
                      <div className="vos-unified-header-meta">
                        <span className="vos-meta-label">
                          {activeAct === 'act-apps' ? 'ATELIER' : 'VAULT'}
                        </span>
                      </div>
                    </div>

                    {/* Dossier Body with Fluid Motion Transition */}
                    <div className="vos-dossier-content-area">
                      <AnimatePresence mode="wait">
                        {activeAct === 'act-apps' ? (
                          /* ACT 02: SOFTWARE ATELIER DOSSIER */
                          <motion.div
                            key={currentAtelierProject.id}
                            className="vos-unified-dossier"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          >
                            <div className="vos-unified-dossier-top">
                              <div className="vos-unified-badge-row">
                                <span className="vos-unified-status-badge active">
                                  <CheckCircle2 size={11} />
                                  {currentAtelierProject.statusLabel.toUpperCase()}
                                </span>
                                <span className="vos-unified-cat-label">
                                  {currentAtelierProject.category}
                                </span>
                              </div>

                              <h3 className="vos-unified-title">{currentAtelierProject.title}</h3>
                              <div className="vos-unified-subtitle">{currentAtelierProject.subtitle}</div>
                              <p className="vos-unified-summary">{currentAtelierProject.summary}</p>

                              {/* Architecture Highlights */}
                              <div className="vos-unified-arch-list">
                                {currentAtelierProject.architectureHighlights.slice(0, 3).map((highlight, idx) => (
                                  <div key={idx} className="vos-unified-arch-item">
                                    <span className="vos-unified-arch-bullet">▸</span>
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions Row */}
                            <div className="vos-unified-bottom-row">
                              <div className="vos-unified-tech-tags">
                                {currentAtelierProject.techStack.map((tech, idx) => (
                                  <span key={idx} className="vos-unified-tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="vos-unified-actions">
                                {!isPhoneDocked ? (
                                  <button
                                    onClick={() => handleSummonPhone(selectedAtelierAppId)}
                                    className="vos-btn-launch-device"
                                    title="Launch full-size Google Pixel 9 Pro simulator"
                                  >
                                    <Sparkles size={14} className="vos-btn-sparkle-icon" />
                                    <span>Test on Pixel 9 Pro</span>
                                    <span className="vos-badge-live">LIVE SANDBOX</span>
                                  </button>
                                ) : (
                                  <>
                                    {activeLaunchedApp !== selectedAtelierAppId ? (
                                      <button
                                        onClick={() => {
                                          playClickSound(800, 0.04);
                                          setActiveLaunchedApp(selectedAtelierAppId);
                                        }}
                                        className="vos-btn-primary"
                                        title="Launch this app on the phone screen"
                                      >
                                        <Play size={12} fill="#FFFFFF" />
                                        <span>Launch on Phone</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          playClickSound(800, 0.03);
                                          setActiveLaunchedApp(null);
                                        }}
                                        className="vos-btn-ghost"
                                        title="Go to Android Home screen"
                                      >
                                        <RotateCcw size={12} />
                                        <span>Home</span>
                                      </button>
                                    )}

                                    <button
                                      onClick={handleMinimizePhone}
                                      className="vos-btn-ghost"
                                      title="Minimize phone to center dossier"
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
                                    className="vos-unified-btn-secondary"
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
                                    className="vos-unified-btn-playstore"
                                    title="Open on Google Play / PWA"
                                  >
                                    <ExternalLink size={12} />
                                    <span>Get App</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          /* ACT 03: THE R&D VAULT DOSSIER & POST-MORTEM */
                          <motion.div
                            key={currentVaultProject.id}
                            className="vos-unified-dossier"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          >
                            <div className="vos-unified-dossier-top">
                              <div className="vos-unified-badge-row">
                                <span
                                  className="vos-unified-status-badge vault"
                                  style={{
                                    background: vaultStatusStyle.bg,
                                    border: `1px solid ${vaultStatusStyle.border}`,
                                    color: vaultStatusStyle.text
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '50%',
                                      background: vaultStatusStyle.dot,
                                      display: 'inline-block'
                                    }}
                                  />
                                  {currentVaultProject.statusLabel.toUpperCase()}
                                </span>
                                <span className="vos-unified-cat-label">
                                  {currentVaultProject.category}
                                </span>
                              </div>

                              <h3 className="vos-unified-title">{currentVaultProject.title}</h3>
                              <div className="vos-unified-subtitle vault">{currentVaultProject.subtitle}</div>
                              <p className="vos-unified-summary">{currentVaultProject.summary}</p>

                              {/* Architecture Highlights */}
                              <div className="vos-unified-arch-list">
                                {currentVaultProject.architectureHighlights.map((hl, idx) => (
                                  <div key={idx} className="vos-unified-arch-item">
                                    <span className="vos-unified-arch-bullet">▸</span>
                                    <span>{hl}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Critical Lesson Learned Post-Mortem Card */}
                              <div className={`vos-vault-postmortem-card ${getVaultThemeClass(currentVaultProject.id)}`}>
                                <div className={`vos-vault-postmortem-badge ${getVaultThemeClass(currentVaultProject.id)}`}>
                                  <AlertTriangle size={13} />
                                  <span>CRITICAL LESSON LEARNED // POST-MORTEM</span>
                                </div>

                                <blockquote className="vos-vault-quote">
                                  "{currentVaultProject.lessonsLearned}"
                                </blockquote>

                                <div className="vos-vault-target-meta">
                                  <Terminal size={12} color="#64748B" />
                                  <span>Target Domain: <strong>{currentVaultProject.targetAudience}</strong></span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Row: Tech Tags & Action Buttons */}
                            <div className="vos-unified-bottom-row">
                              <div className="vos-unified-tech-tags">
                                {currentVaultProject.techStack.map((tech, idx) => (
                                  <span key={idx} className="vos-unified-tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="vos-unified-actions">
                                <a
                                  href="https://github.com/banishwor"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="vos-unified-btn-secondary"
                                  title="View GitHub repository blueprints"
                                >
                                  <GitBranch size={12} />
                                  <span>GitHub Blueprint</span>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* PANEL 2: LARGE FLOATING SMARTPHONE MOCKUP (RIGHT) */}
                  <AnimatePresence>
                    {isPhoneVisible && (
                      <motion.div
                        className="vos-floating-phone-dock"
                        initial={{ opacity: 0, scale: 0.9, x: 40 }}
                        animate={{ opacity: 1, scale: 1.0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 40 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 25, mass: 0.9 }}
                      >
                        <div className="vos-large-phone-frame">
                          <div className="vos-large-phone-island">
                            <div className="vos-large-phone-camera" />
                          </div>
                          <div className="vos-large-phone-glare" />

                          <div className="vos-large-phone-screen">
                            <AnimatePresence mode="wait">
                              {activeAct === 'act-apps' ? (
                                <motion.div
                                  key="act-02-screen"
                                  className="vos-large-screen-viewport"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.18 }}
                                >
                                  <div className="vos-large-status-bar">
                                    <span className="vos-large-status-time">{currentTime}</span>
                                    <div className="vos-large-status-icons">
                                      <Wifi size={12} />
                                      <Battery size={12} />
                                    </div>
                                  </div>

                                  <div className="vos-large-interactive-area">
                                    {activeLaunchedApp ? (
                                      <DeviceAppShowcase
                                        appId={activeLaunchedApp}
                                        onHome={() => setActiveLaunchedApp(null)}
                                      />
                                    ) : (
                                      <div className="vos-large-home-view">
                                        <span style={{ fontSize: '13px', color: '#94A3B8' }}>Tap an app to launch</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="vos-large-nav-bar">
                                    <button
                                      onClick={() => {
                                        playClickSound(850, 0.03);
                                        setActiveLaunchedApp(null);
                                      }}
                                      className="vos-large-home-pill"
                                      title="Return to Home"
                                    />
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key={currentVaultProject.id}
                                  className="vos-large-screen-viewport"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.18 }}
                                >
                                  {currentVaultProject.id === 'ai-keyboard' ? (
                                    <div className="vos-large-custom-screen ai-keyboard">
                                      <div className="vos-large-chat-area">
                                        <div className="vos-large-chat-header">
                                          <Cpu size={12} style={{ color: '#C084FC' }} />
                                          <span>FlorisBoard • On-Device SLM</span>
                                        </div>
                                        <div className="vos-large-chat-bubble prompt">
                                          <span className="vos-large-chat-label">INPUT</span>
                                          <span>The report is done and sent.</span>
                                        </div>
                                        <div className="vos-large-chat-bubble response">
                                          <span className="vos-large-chat-label">✨ SLM REWRITE</span>
                                          <span>The quarterly report has been finalized and dispatched.</span>
                                        </div>
                                      </div>

                                      <div className="vos-large-keyboard-dock">
                                        <img
                                          src={currentVaultProject.screenshotPath}
                                          alt={currentVaultProject.title}
                                          className="vos-large-keyboard-img"
                                        />
                                      </div>
                                    </div>
                                  ) : currentVaultProject.screenshotPath ? (
                                    <img
                                      src={currentVaultProject.screenshotPath}
                                      alt={`${currentVaultProject.title} Screenshot`}
                                      className="vos-large-phone-img"
                                    />
                                  ) : (
                                    <div className="vos-large-empty">
                                      <Terminal size={28} color="#64748B" />
                                      <span>Prototype Archive</span>
                                    </div>
                                  )}

                                  <div className="vos-large-home-bar" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="vos-large-home-bar" />
                        </div>

                        <div className="vos-large-ground-shadow" />
                        <div className="vos-large-device-caption">
                          {activeAct === 'act-apps' ? (
                            <span className="live-tag">LIVE INTERACTIVE SANDBOX</span>
                          ) : (
                            <span>MOBILE APP PROTOTYPE</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : activeAct === 'act-books' ? (
              <motion.div
                key="stage-act-books"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <HeritagePublicationStage
                  isEmbedded={true}
                  selectedPostIndex={heritageIndex}
                  onSelectPostIndex={setHeritageIndex}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-research' ? (
              <motion.div
                key="stage-act-research"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <ResearchHpcStage
                  isEmbedded={true}
                  selectedIndex={researchIndex}
                  onSelectIndex={setResearchIndex}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-education' ? (
              <motion.div
                key="stage-act-education"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <AcademicEducationStage
                  isEmbedded={true}
                  selectedDegreeIndex={academicIndex}
                  onSelectDegreeIndex={setAcademicIndex}
                  isNoticePinned={isNoticePinned}
                  onToggleNotice={handleToggleNoticePinned}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-media' ? (
              <motion.div
                key="stage-act-media"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <DigitalStudioStage
                  isEmbedded={true}
                  selectedTrackIndex={musicIndex}
                  onSelectTrackIndex={setMusicIndex}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-gaming' ? (
              <motion.div
                key="stage-act-gaming"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <GamingWormholeStage
                  isEmbedded={true}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-experience' ? (
              <motion.div
                key="stage-act-experience"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <WorkExperienceStage
                  isEmbedded={true}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-hobbies' ? (
              <motion.div
                key="stage-act-hobbies"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <HobbiesPassionsStage
                  isEmbedded={true}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : activeAct === 'act-author' ? (
              <motion.div
                key="stage-act-author"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <AuthorBookshelfStage
                  isEmbedded={true}
                  isDarkMode={isDarkMode}
                  selectedBookId={selectedBookId}
                  onSelectBookId={setSelectedBookId}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            ) : (
              <motion.div
                key="stage-act-finale"
                className="vos-unified-substage"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <FinaleDeskStage
                  isEmbedded={true}
                  mode={activeAct === 'act-words' ? 'ideology' : 'contact'}
                  selectedPillarIndex={selectedPillarIndex}
                  onSelectPillarIndex={setSelectedPillarIndex}
                  onConnect={() => onNavigateAct('act-contact')}
                  onRestartJourney={onRestartJourney}
                  onSwitchToMobile={onSwitchToMobile}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
