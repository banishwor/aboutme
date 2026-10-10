import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  GitBranch, 
  ArrowRight,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { projects } from '../../content/projects';
import { profile } from '../../content/profile';
import { playClickSound } from '../../utils/audioFeedback';
import './EngineeringVault.css';

interface EngineeringVaultProps {
  onSwitchToMobile?: () => void;
  onExploreNext?: () => void;
}

export const EngineeringVault: React.FC<EngineeringVaultProps> = ({ 
  onSwitchToMobile, 
  onExploreNext 
}) => {
  const archiveProjects = projects.filter(p => p.category === 'Engineering Archives');
  const [selectedId, setSelectedId] = useState<string>(archiveProjects[0]?.id || 'leikaifix');

  const currentArchive = archiveProjects.find(p => p.id === selectedId) || archiveProjects[0];

  const handlePrev = () => {
    playClickSound(700, 0.03);
    const currentIdx = archiveProjects.findIndex(p => p.id === selectedId);
    const prevIdx = currentIdx <= 0 ? archiveProjects.length - 1 : currentIdx - 1;
    setSelectedId(archiveProjects[prevIdx].id);
  };

  const handleNext = () => {
    playClickSound(750, 0.03);
    const currentIdx = archiveProjects.findIndex(p => p.id === selectedId);
    const nextIdx = (currentIdx + 1) % archiveProjects.length;
    setSelectedId(archiveProjects[nextIdx].id);
  };

  const getStatusColor = (id: string) => {
    switch (id) {
      case 'leikaifix':
        return { bg: '#FFFBEB', border: '#FCD34D', text: '#B45309', dot: '#F59E0B' };
      case 'ai-keyboard':
        return { bg: '#FAF5FF', border: '#D8B4FE', text: '#7E22CE', dot: '#9333EA' };
      default:
        return { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569', dot: '#64748B' };
    }
  };

  const getCardThemeClass = (id: string) => {
    if (id === 'ai-keyboard') return 'purple';
    if (id === 'viral-prompts') return 'slate';
    return '';
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'leikaifix':
        return <Building size={14} />;
      case 'ai-keyboard':
        return <Cpu size={14} />;
      default:
        return <Sparkles size={14} />;
    }
  };

  const statusStyle = getStatusColor(currentArchive.id);

  return (
    <div className="vos-vault-stage">
      {/* 1. Warm Sunlit Architectural Living Room / Studio Backdrop (100% Identical to Slide 2 & 4) */}
      <div className="vos-vault-bg" />
      <div className="vos-vault-overlay" />

      {/* 2. Top Spatial Safari Pill Toolbar (Section Title & Navigation) */}
      <header className="vos-safari-toolbar">
        {/* Left: Navigation Buttons */}
        <div className="vos-toolbar-left">
          <button
            onClick={handlePrev}
            title="Previous Archived Project"
            className="vos-pill-circle-btn"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={handleNext}
            title="Next Archived Project"
            className="vos-pill-circle-btn"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Center: Safari Spatial Pill Field with Section Title */}
        <div className="vos-url-field">
          <Terminal size={12} style={{ color: '#D97706', flexShrink: 0 }} />
          <span>THE R&D VAULT // POST-MORTEMS</span>
        </div>

        {/* Right: Author Profile Pill + Optional Phone OS Switch */}
        <div className="vos-toolbar-right">
          {onSwitchToMobile && (
            <button
              onClick={() => {
                playClickSound(850, 0.04);
                onSwitchToMobile();
              }}
              className="vos-pill-circle-btn"
              title="Switch to Mobile Phone OS"
              style={{ width: 'auto', padding: '0 10px', gap: '5px', fontSize: '10.5px', fontWeight: 700, borderRadius: '999px' }}
            >
              <Smartphone size={12} />
              <span>Phone OS</span>
            </button>
          )}
          <div className="vos-profile-pill">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="vos-profile-avatar"
            />
            <span>Banishwor Athokpam</span>
          </div>
        </div>
      </header>

      {/* 3. Master VisionOS Spatial Glass Window */}
      <div className="vos-vault-card">
        {/* Integrated Window Header Tabs (Matches Slide 4 Literary Sanctuary) */}
        <div className="vos-vault-window-header">
          <div className="vos-vault-category-tabs">
            {archiveProjects.map(proj => {
              const isActive = proj.id === selectedId;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    playClickSound(800, 0.04);
                    setSelectedId(proj.id);
                  }}
                  className={`vos-vault-category-tab ${isActive ? 'active' : ''}`}
                >
                  {getIcon(proj.id)}
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>

          <div className="vos-vault-header-meta">
            <span>ENGINEERING ARCHIVES</span>
            {onExploreNext && (
              <button
                onClick={() => {
                  playClickSound(800, 0.03);
                  onExploreNext();
                }}
                className="vos-pill-circle-btn"
                style={{ width: 'auto', padding: '2px 10px', height: '24px', fontSize: '10.5px', fontWeight: 700, borderRadius: '999px' }}
                title="Next Chapter: Literary Works"
              >
                <span>Literary Works →</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Content Body */}
        <div className="vos-vault-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArchive.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                display: 'contents'
              }}
            >
            {/* Left Column: Technical Dossier, Post-Mortem & Highlights */}
            <div className="vos-vault-dossier-col">
              <div className="vos-vault-dossier-top">
                <div className="vos-vault-header-row">
                  <span
                    className="vos-vault-status-badge"
                    style={{
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.border}`,
                      color: statusStyle.text
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: statusStyle.dot,
                        display: 'inline-block'
                      }}
                    />
                    {currentArchive.statusLabel.toUpperCase()}
                  </span>

                  <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                    {currentArchive.category}
                  </span>
                </div>

                <h3 className="vos-vault-title">{currentArchive.title}</h3>
                <div className="vos-vault-subtitle">{currentArchive.subtitle}</div>
                <p className="vos-vault-summary">{currentArchive.summary}</p>

                {/* Architecture Highlights */}
                <div className="vos-vault-arch-list">
                  {currentArchive.architectureHighlights.map((hl, idx) => (
                    <div key={idx} className="vos-vault-arch-item">
                      <span className="vos-vault-arch-bullet">▸</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Post-Mortem Card */}
                <div className={`vos-vault-postmortem-card ${getCardThemeClass(currentArchive.id)}`}>
                  <div className={`vos-vault-postmortem-badge ${getCardThemeClass(currentArchive.id)}`}>
                    <AlertTriangle size={13} />
                    <span>CRITICAL LESSON LEARNED // POST-MORTEM</span>
                  </div>

                  <blockquote className="vos-vault-quote">
                    "{currentArchive.lessonsLearned}"
                  </blockquote>

                  <div className="vos-vault-target-meta">
                    <Terminal size={12} color="#64748B" />
                    <span>Target Domain: <strong>{currentArchive.targetAudience}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Tech Tags & Action Buttons */}
              <div className="vos-vault-bottom-row">
                <div className="vos-vault-tech-tags">
                  {currentArchive.techStack.map((tech, idx) => (
                    <span key={idx} className="vos-vault-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="vos-vault-actions">
                  <a
                    href="https://github.com/banishwor"
                    target="_blank"
                    rel="noreferrer"
                    className="vos-vault-btn-source"
                    title="View GitHub repository blueprints"
                  >
                    <GitBranch size={13} />
                    <span>GitHub Blueprint</span>
                  </a>

                  {onExploreNext && (
                    <button
                      onClick={() => {
                        playClickSound(850, 0.04);
                        onExploreNext();
                      }}
                      className="vos-vault-btn-next"
                      title="Advance to next chapter"
                    >
                      <span>Literary Works →</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Smartphone Mockup Frame */}
            <div className="vos-vault-phone-col">
              <div className="vos-vault-phone-frame">
                {/* Dynamic Island / Top Camera Pill */}
                <div className="vos-vault-phone-island">
                  <div className="vos-vault-phone-camera" />
                </div>

                {/* Specular Glare Sheen Reflection */}
                <div className="vos-vault-phone-glare" />

                {/* Screen Content */}
                <div className="vos-vault-phone-screen">
                  {currentArchive.id === 'ai-keyboard' ? (
                    <div className="vos-vault-phone-custom-screen ai-keyboard">
                      {/* Top simulated notes / SLM prompt area */}
                      <div className="vos-vault-phone-chat-area">
                        <div className="vos-vault-phone-chat-header">
                          <Cpu size={11} style={{ color: '#9333EA' }} />
                          <span>FlorisBoard • On-Device SLM</span>
                        </div>
                        <div className="vos-vault-phone-chat-bubble prompt">
                          <span className="vos-vault-phone-chat-label">INPUT</span>
                          <span>The report is done and sent.</span>
                        </div>
                        <div className="vos-vault-phone-chat-bubble response">
                          <span className="vos-vault-phone-chat-label">✨ SLM REWRITE</span>
                          <span>The quarterly report has been finalized and dispatched.</span>
                        </div>
                      </div>

                      {/* Docked FlorisBoard Keyboard at Bottom */}
                      <div className="vos-vault-phone-keyboard-dock">
                        <img
                          src={currentArchive.screenshotPath}
                          alt={currentArchive.title}
                          className="vos-vault-phone-keyboard-img"
                        />
                      </div>
                    </div>
                  ) : currentArchive.screenshotPath ? (
                    <img
                      src={currentArchive.screenshotPath}
                      alt={`${currentArchive.title} Screenshot`}
                      className="vos-vault-phone-img"
                    />
                  ) : (
                    <div className="vos-vault-phone-empty">
                      <Terminal size={24} color="#64748B" />
                      <span>Blueprint Archive</span>
                    </div>
                  )}
                </div>

                {/* Home Indicator Bar */}
                <div className="vos-vault-phone-home-bar" />
              </div>

              {/* Spatial Pedestal Ground Shadow */}
              <div className="vos-vault-phone-pedestal" />
              <div className="vos-vault-phone-caption">
                <span>MOBILE APP PROTOTYPE</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
