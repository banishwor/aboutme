import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Binary,
  Layers,
  CheckCircle2,
  Terminal,
  Activity,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { researchAndCertifications, ResearchItem } from '../../content/education';
import { playClickSound } from '../../utils/audioFeedback';
import './ResearchHpcStage.css';

interface ResearchHpcStageProps {
  onSwitchToMobile?: () => void;
  isEmbedded?: boolean;
  selectedIndex?: number;
  onSelectIndex?: (idx: number) => void;
}

export const ResearchHpcStage: React.FC<ResearchHpcStageProps> = ({
  isEmbedded = false,
  selectedIndex: controlledIndex,
  onSelectIndex
}) => {
  const [localIndex, setLocalIndex] = useState<number>(0);

  const selectedIndex = controlledIndex !== undefined ? controlledIndex : localIndex;
  const setSelectedIndex = (idx: number) => {
    if (onSelectIndex) onSelectIndex(idx);
    else setLocalIndex(idx);
  };
  const activeItem: ResearchItem =
    researchAndCertifications[selectedIndex] || researchAndCertifications[0];

  const handlePrev = () => {
    playClickSound(750, 0.03);
    const prevIdx = selectedIndex <= 0 ? researchAndCertifications.length - 1 : selectedIndex - 1;
    if (onSelectIndex) onSelectIndex(prevIdx);
    else setLocalIndex(prevIdx);
  };

  const handleNext = () => {
    playClickSound(800, 0.03);
    const nextIdx = selectedIndex >= researchAndCertifications.length - 1 ? 0 : selectedIndex + 1;
    if (onSelectIndex) onSelectIndex(nextIdx);
    else setLocalIndex(nextIdx);
  };

  return (
    <div className={`research-hpc-stage ${isEmbedded ? 'embedded' : ''}`}>
      {/* Background ambient lighting (omitted if embedded in persistent stage) */}
      {!isEmbedded && <div className="research-hpc-ambient-bg" />}

      <div className="research-hpc-container">
        {/* ─────────────────────────────────────────────────────────────
            1. TOP SPATIAL SAFARI PILL TOOLBAR
            ───────────────────────────────────────────────────────────── */}
        {!isEmbedded && (
          <header className="research-top-toolbar">
            {/* Left: Previous / Next Item Arrows + Counter */}
            <div className="research-toolbar-left">
              <button
                onClick={handlePrev}
                title="Previous Research Record"
                className="research-pill-btn"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNext}
                title="Next Research Record"
                className="research-pill-btn"
              >
                <ChevronRight size={15} />
              </button>
              <div className="research-counter-badge">
                <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="counter-sep">/</span>
                <span>{String(researchAndCertifications.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Center: Safari Spatial Pill Title (Matching Act 02, 03, 04, 06) */}
            <div className="research-url-pill">
              <Cpu size={13} style={{ color: '#06B6D4', flexShrink: 0 }} />
              <span className="research-url-text">
                ADVANCED COMPUTING &amp; SCIENTIFIC RESEARCH
              </span>
            </div>

            {/* Right: Institutional Badge */}
            <div className="research-toolbar-right">
              <div className="research-inst-pill">
                <Binary size={11} className="text-cyan-600" />
                <span>NSM · MANIPUR UNIVERSITY</span>
              </div>
            </div>
          </header>
        )}

        {/* ─────────────────────────────────────────────────────────────
            2. MAIN SPLIT LAYOUT: SELECTOR RAIL + DETAILED DOSSIER
            ───────────────────────────────────────────────────────────── */}
        <div className="research-hpc-content-grid">
          {/* Left: Interactive Research Items Selector Rail */}
          <div className="research-hpc-rail">
            <div className="research-hpc-rail-label">
              <span>CURATED SCIENTIFIC DOSSIERS</span>
              <span className="research-hpc-count">03 RECORDS</span>
            </div>

            <div className="research-hpc-cards-list">
              {researchAndCertifications.map((item, index) => {
                const isSelected = item.id === activeItem.id;
                const isWorkshop = item.category === 'Workshop';

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickSound(800 + index * 40, 0.03);
                      setSelectedIndex(index);
                    }}
                    className={`research-rail-card ${isSelected ? 'active' : ''}`}
                  >
                    <div className="research-rail-card-top">
                      <span className={`research-cat-chip ${isWorkshop ? 'chip-workshop' : 'chip-thesis'}`}>
                        {item.category.toUpperCase()}
                      </span>
                      <span className="research-date-chip">{item.date}</span>
                    </div>

                    <h4 className="research-rail-card-title">{item.title}</h4>
                    <p className="research-rail-card-org">{item.organization}</p>

                    <div className="research-rail-card-footer">
                      <span className="research-tag-preview">
                        {item.tags.slice(0, 2).join(' • ')}
                      </span>
                      <span className="research-rail-indicator">→</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Credentials Badge */}
            <div className="research-cv-box">
              <div className="research-cv-icon">
                <Award size={15} />
              </div>
              <div className="research-cv-text">
                <span className="research-cv-title">Verified Academic Research</span>
                <span className="research-cv-sub">MCA Postgraduate Dissertation &amp; NSM Workshop</span>
              </div>
            </div>
          </div>

          {/* Right: Rich Interactive Dossier Viewer */}
          <div className="research-hpc-dossier-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="research-dossier-card"
              >
                {/* Dossier Header */}
                <div className="research-dossier-header">
                  <div className="research-dossier-meta">
                    <span className="research-dossier-kicker">
                      {activeItem.category === 'Workshop' ? (
                        <>
                          <Activity size={12} className="inline mr-1 text-emerald-500" />
                          NATIONAL SUPERCOMPUTING MISSION (NSM)
                        </>
                      ) : (
                        <>
                          <Binary size={12} className="inline mr-1 text-cyan-500" />
                          MANIPUR UNIVERSITY POSTGRADUATE DISSERTATION
                        </>
                      )}
                    </span>
                    <h3 className="research-dossier-title">{activeItem.title}</h3>
                    <div className="research-dossier-sub-row">
                      <span className="research-dossier-sub">{activeItem.subtitle}</span>
                      <span className="research-dossier-sep">•</span>
                      <span className="research-dossier-org">{activeItem.organization}</span>
                      <span className="research-dossier-sep">•</span>
                      <span className="research-dossier-date">{activeItem.date}</span>
                    </div>
                  </div>
                </div>

                {/* Abstract & Summary */}
                <div className="research-abstract-box">
                  <div className="research-abstract-label">
                    <Terminal size={12} />
                    <span>EXECUTIVE RESEARCH ABSTRACT</span>
                  </div>
                  <p className="research-abstract-text">{activeItem.description}</p>
                </div>

                {/* Key Research Methodologies & Empirical Takeaways */}
                <div className="research-takeaways-section">
                  <div className="research-section-title">
                    <Layers size={13} />
                    <span>
                      {activeItem.category === 'Workshop'
                        ? 'TECHNICAL TRAINING MODULES & HIGH-PERFORMANCE LABS'
                        : 'EMPIRICAL METHODOLOGY & DATASET ACCURACY FINDINGS'}
                    </span>
                  </div>
                  <div className="research-takeaways-grid">
                    {activeItem.keyPoints.map((point, idx) => (
                      <div key={idx} className="research-takeaway-item">
                        <CheckCircle2 size={14} className="research-check-icon" />
                        <span className="research-takeaway-text">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Domain Tags */}
                <div className="research-tags-section">
                  <div className="research-tags-label">SYSTEM ARCHITECTURES &amp; METHODOLOGIES</div>
                  <div className="research-tags-list">
                    {activeItem.tags.map((tag, idx) => (
                      <span key={idx} className="research-tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dossier Footer (Verified record note only; NO NEXT PAGE BUTTONS!) */}
                <div className="research-dossier-footer">
                  <div className="research-status-pill">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>VERIFIED ACADEMIC &amp; NSM RECORD</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
