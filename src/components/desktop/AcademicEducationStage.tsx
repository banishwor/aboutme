import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  Pin,
  CheckCircle2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck
} from 'lucide-react';
import { degrees } from '../../content/education';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './AcademicEducationStage.css';

interface AcademicEducationStageProps {
  onSwitchToMobile?: () => void;
  isEmbedded?: boolean;
  selectedDegreeIndex?: number;
  onSelectDegreeIndex?: (idx: number) => void;
  isNoticePinned?: boolean;
  onToggleNotice?: () => void;
}

export const AcademicEducationStage: React.FC<AcademicEducationStageProps> = ({
  isEmbedded = false,
  selectedDegreeIndex: controlledDegreeIndex,
  onSelectDegreeIndex,
  isNoticePinned: controlledNoticePinned,
  onToggleNotice
}) => {
  // Pinned Notice Board state (defaults to false / hidden)
  const [localNoticePinned, setLocalNoticePinned] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [localDegreeIndex, setLocalDegreeIndex] = useState<number>(0);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);

  const isNoticePinned = controlledNoticePinned !== undefined ? controlledNoticePinned : localNoticePinned;
  const selectedDegreeIndex = controlledDegreeIndex !== undefined ? controlledDegreeIndex : localDegreeIndex;

  const setSelectedDegreeIndex = (idx: number) => {
    if (onSelectDegreeIndex) onSelectDegreeIndex(idx);
    else setLocalDegreeIndex(idx);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1240);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mcaDegree = degrees[0];

  // Toolbar Arrow handlers
  const handlePrevDegree = () => {
    playClickSound(750, 0.03);
    const prevIdx = selectedDegreeIndex <= 0 ? degrees.length - 1 : selectedDegreeIndex - 1;
    if (onSelectDegreeIndex) onSelectDegreeIndex(prevIdx);
    else setLocalDegreeIndex(prevIdx);
  };

  const handleNextDegree = () => {
    playClickSound(800, 0.03);
    const nextIdx = selectedDegreeIndex >= degrees.length - 1 ? 0 : selectedDegreeIndex + 1;
    if (onSelectDegreeIndex) onSelectDegreeIndex(nextIdx);
    else setLocalDegreeIndex(nextIdx);
  };

  // Toggle Pinned Notice Board
  const handleToggleNotice = () => {
    if (onToggleNotice) {
      onToggleNotice();
    } else {
      if (!localNoticePinned) {
        playSuccessChime();
        setLocalNoticePinned(true);
      } else {
        playClickSound(750, 0.03);
        setLocalNoticePinned(false);
      }
    }
  };

  // Dimensions synchronized with spring animation (Identical to Act 02 math)
  const dossierWidth = isNoticePinned ? (isCompact ? 560 : 620) : (isCompact ? 760 : 820);
  const toolbarWidth = isNoticePinned ? (isCompact ? 560 : 620) : (isCompact ? 760 : 820);
  const dossierShift = isNoticePinned ? (isCompact ? -185 : -210) : 0;
  const toolbarShift = isNoticePinned ? (isCompact ? -185 : -210) : 0;

  return (
    <div className={`academic-edu-stage ${isEmbedded ? 'embedded' : ''}`}>
      {/* Ambient background glow (omitted if embedded in persistent stage) */}
      {!isEmbedded && <div className="academic-edu-ambient-bg" />}

      <div className="academic-edu-container">
        {/* ─────────────────────────────────────────────────────────────
            1. TOP SPATIAL SAFARI PILL TOOLBAR
            ───────────────────────────────────────────────────────────── */}
        {!isEmbedded && (
          <motion.header
            className={`academic-top-toolbar ${isNoticePinned ? 'docked' : 'centered'}`}
            animate={{
              x: toolbarShift,
              width: toolbarWidth,
              maxWidth: toolbarWidth
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
          >
            {/* Left: Previous / Next Degree Arrows + Counter */}
            <div className="academic-toolbar-left">
              <button
                onClick={handlePrevDegree}
                title="Previous Degree"
                className="academic-pill-btn"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNextDegree}
                title="Next Degree"
                className="academic-pill-btn"
              >
                <ChevronRight size={15} />
              </button>
              <div className="academic-counter-badge">
                <span>{String(selectedDegreeIndex + 1).padStart(2, '0')}</span>
                <span className="counter-sep">/</span>
                <span>{String(degrees.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Center: Safari Spatial Pill Title (Matching Act 02, 03, 04) */}
            <div className="academic-url-pill">
              <GraduationCap size={13} style={{ color: '#D97706', flexShrink: 0 }} />
              <span className="academic-url-text">
                {isNoticePinned
                  ? 'ACADEMIC PEDIGREE & GAZETTE'
                  : 'ACADEMIC PEDIGREE & 7TH STATE RANK GAZETTE'}
              </span>
            </div>

            {/* Right: Pin Notice Board Toggle Button */}
            <div className="academic-toolbar-right">
              <button
                onClick={handleToggleNotice}
                className={`academic-pin-toggle-btn ${isNoticePinned ? 'pinned' : ''}`}
                title={isNoticePinned ? 'Unpin Notice from Wall' : 'Pin Official Rank Gazette to Board'}
              >
                <Pin size={12} className={`pin-glyph ${isNoticePinned ? 'pinned' : ''}`} />
                <span>{isNoticePinned ? 'Notice Pinned' : 'Pin Gazette'}</span>
              </button>
            </div>
          </motion.header>
        )}

        {/* ─────────────────────────────────────────────────────────────
            2. SPATIAL WORKSPACE: DOSSIER (LEFT) + PINNED NOTICE (RIGHT)
            ───────────────────────────────────────────────────────────── */}
        <div className="academic-spatial-workspace">
          {/* ========================================================
              PANEL 1: FROSTED GLASS EDUCATION DOSSIER (LEFT)
              ======================================================== */}
          <motion.div
            className={`academic-dossier-window ${isNoticePinned ? 'pinned' : 'centered'}`}
            animate={{
              x: dossierShift,
              width: dossierWidth
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
          >
            {/* Dossier Card Header */}
            <div className="academic-dossier-card-header">
              <div className="academic-dossier-header-meta">
                <span className="academic-dossier-label">ACADEMIC JOURNEY &amp; DEGREES</span>
                <span className="academic-dossier-count">4 TIERS · 2014 TO 2024</span>
              </div>

              {!isNoticePinned && (
                <button
                  onClick={handleToggleNotice}
                  className="academic-inline-pin-btn"
                  title="Pin Official Rank Gazette to Notice Board"
                >
                  <Pin size={11} />
                  <span>Pin Official Gazette Notice</span>
                </button>
              )}
            </div>

            {/* MCA 7th State Rank Special Feature Banner */}
            <div
              className={`academic-mca-feature-banner ${selectedDegreeIndex === 0 ? 'selected' : ''}`}
              onClick={() => {
                playClickSound(780, 0.03);
                setSelectedDegreeIndex(0);
              }}
            >
              <div className="mca-feature-icon">
                <Award size={18} />
              </div>
              <div className="mca-feature-content">
                <div className="mca-feature-title-row">
                  <span className="mca-feature-title">7th State Rank — Master of Computer Applications</span>
                  <span className="mca-feature-score">80.30% Distinction</span>
                </div>
                <p className="mca-feature-desc">
                  Ranked 7th across all colleges affiliated with Manipur University. Official department gazette order available on the notice board.
                </p>
              </div>

              {!isNoticePinned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleNotice();
                  }}
                  className="mca-feature-action-btn"
                  title="Pin Official Rank Gazette to Notice Board"
                >
                  <Pin size={11} />
                  <span>Pin Notice</span>
                </button>
              )}
            </div>

            {/* Degrees List */}
            <div className="academic-degrees-list">
              {degrees.map((degree, index) => {
                const isSelected = index === selectedDegreeIndex;

                return (
                  <div
                    key={degree.id}
                    onClick={() => {
                      playClickSound(750 + index * 40, 0.03);
                      setSelectedDegreeIndex(index);
                    }}
                    className={`academic-degree-row ${isSelected ? 'active' : ''}`}
                  >
                    <div className="degree-score-column">
                      <span className="degree-score-pill" style={{ color: degree.color }}>
                        {degree.score}
                      </span>
                      <span className="degree-year-tag">{degree.year}</span>
                    </div>

                    <div className="degree-info-column">
                      <div className="degree-title-row">
                        <h4 className="degree-title">{degree.degree}</h4>
                        {degree.rank && (
                          <span className="degree-rank-badge">
                            <Award size={10} />
                            <span>{degree.rank}</span>
                          </span>
                        )}
                      </div>

                      <div className="degree-inst-row">
                        <Building2 size={11} className="text-slate-400" />
                        <span>{degree.institution}</span>
                        <span className="degree-dot">•</span>
                        <span>{degree.boardOrUniversity}</span>
                      </div>

                      {/* Expandable Highlights Tray */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="degree-highlights-tray"
                        >
                          <p className="degree-desc">{degree.description}</p>
                          <div className="degree-bullets-list">
                            {degree.highlights.map((h, i) => (
                              <div key={i} className="degree-bullet-item">
                                <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dossier Footer (Verified record note only; NO NEXT PAGE BUTTONS!) */}
            <div className="academic-dossier-footer">
              <div className="academic-footer-verified">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>All degrees &amp; score transcripts official &amp; verifiable upon request</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              PANEL 2: FULL-HEIGHT DEPARTMENT NOTICE BOARD WITH 3D PIN (RIGHT)
              No duplicate text — 90% full height allocated to scanned document!
              ======================================================== */}
          <AnimatePresence>
            {isNoticePinned && (
              <motion.div
                className="academic-notice-board-panel"
                initial={{ opacity: 0, x: 70, scale: 0.92, rotate: 2 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, x: 60, scale: 0.94, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
              >
                <div className="notice-board-mount">
                  {/* Top Minimal Bar with 3D Pushpin & Unpin Action */}
                  <div className="notice-board-top-bar">
                    <div className="notice-board-tag-row">
                      <span className="notice-board-tag">
                        DEPARTMENT NOTICE BOARD · MANIPUR UNIVERSITY
                      </span>
                    </div>

                    <button
                      onClick={handleToggleNotice}
                      className="notice-board-unpin-btn"
                      title="Unpin Notice from Wall"
                    >
                      <X size={12} />
                      <span>Unpin</span>
                    </button>
                  </div>

                  {/* Pinned Paper Sheet with 3D Realistic Pushpin */}
                  <div className="pinned-notice-sheet">
                    {/* 3D Realistic Pushpin */}
                    <div className="notice-pushpin-container">
                      <div className="pushpin-head">
                        <div className="pushpin-gleam" />
                      </div>
                      <div className="pushpin-pin-stem" />
                      <div className="pushpin-shadow" />
                    </div>

                    {/* Scanned Official Gazette Sheet: Takes 90%+ of Vertical Height! */}
                    <div
                      className="notice-full-doc-container"
                      onClick={() => setIsDocModalOpen(true)}
                      title="Click to inspect full resolution document"
                    >
                      <img
                        src={mcaDegree.officialDocumentUrl || '/mca-rank-result.png'}
                        alt="Official Manipur University MCA 7th State Rank Gazette Notification"
                        className="notice-full-doc-img"
                      />
                      <div className="notice-doc-zoom-cue">
                        <Maximize2 size={12} />
                        <span>Inspect Scan</span>
                      </div>
                    </div>

                    {/* Sleek Single-Line Verified Status Caption */}
                    <div className="notice-sheet-caption-bar">
                      <div className="notice-caption-rank">
                        <Award size={12} className="text-amber-500" />
                        <span>7TH STATE RANK · 80.30% DISTINCTION</span>
                      </div>
                      <span className="notice-caption-batch">BATCH 2022–2024</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Gazette Document Lightbox if clicked */}
      <AnimatePresence>
        {isDocModalOpen && (
          <motion.div
            className="academic-doc-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDocModalOpen(false)}
          >
            <motion.div
              className="academic-doc-modal-card"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="academic-doc-modal-header">
                <div className="doc-modal-title">
                  <Award size={15} className="text-amber-500" />
                  <span>Manipur University — Official Gazette Result (7th Rank)</span>
                </div>
                <button
                  onClick={() => setIsDocModalOpen(false)}
                  className="doc-modal-close-btn"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="academic-doc-modal-body">
                <img
                  src={mcaDegree.officialDocumentUrl || '/mca-rank-result.png'}
                  alt="Full Official Gazette Scan"
                  className="academic-doc-full-img"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
