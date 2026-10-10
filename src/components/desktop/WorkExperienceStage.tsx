import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Code2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Laptop,
  Award
} from 'lucide-react';
import { workExperience, WorkItem } from '../../content/work';
import { playClickSound } from '../../utils/audioFeedback';
import './WorkExperienceStage.css';

interface WorkExperienceStageProps {
  isEmbedded?: boolean;
  onSwitchToMobile?: () => void;
}

export const WorkExperienceStage: React.FC<WorkExperienceStageProps> = ({
  onSwitchToMobile
}) => {
  const [selectedId, setSelectedId] = useState<string>(workExperience[0].id);

  const currentWork: WorkItem =
    workExperience.find((item) => item.id === selectedId) || workExperience[0];

  const handleSelectWork = (id: string) => {
    playClickSound(820, 0.035);
    setSelectedId(id);
  };

  return (
    <div className="vos-work-stage-root">
      <div className="vos-work-desk-container">
        {/* =========================================================
            PANEL 1: CAREER TIMELINE RAIL (LEFT - 410px)
            ========================================================= */}
        <div className="vos-work-timeline-panel">
          {/* Top Telemetry Header */}
          <div className="vos-work-timeline-header">
            <div className="vos-work-header-icon-badge">
              <Briefcase size={16} style={{ color: '#818CF8' }} />
            </div>
            <div>
              <div className="vos-work-timeline-title">CAREER TRAJECTORY</div>
              <div className="vos-work-timeline-sub">Engineering & Instruction</div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="vos-work-telemetry-row">
            <div className="vos-work-telemetry-chip">
              <span className="chip-value">3+ YRS</span>
              <span className="chip-label">Experience</span>
            </div>
            <div className="vos-work-telemetry-chip">
              <span className="chip-value">100+</span>
              <span className="chip-label">Mentored</span>
            </div>
            <div className="vos-work-telemetry-chip">
              <span className="chip-value">4+</span>
              <span className="chip-label">Shipped Apps</span>
            </div>
          </div>

          {/* Vertical Timeline Track */}
          <div className="vos-work-track-list">
            <div className="vos-work-rail-spine" />

            {workExperience.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWork(item.id)}
                  className={`vos-work-track-item ${isSelected ? 'active' : ''}`}
                  style={{
                    borderColor: isSelected ? item.color : undefined
                  }}
                >
                  {/* Glowing Node on Rail */}
                  <div
                    className={`vos-work-node ${isSelected ? 'active' : ''}`}
                    style={{
                      background: isSelected ? item.color : 'rgba(148, 163, 184, 0.3)',
                      boxShadow: isSelected
                        ? `0 0 14px ${item.color}, inset 0 0 4px #FFFFFF`
                        : undefined
                    }}
                  />

                  <div className="vos-work-track-info">
                    <div className="vos-work-track-top-row">
                      <span className="vos-work-track-org">{item.organization}</span>
                      <span
                        className="vos-work-track-badge"
                        style={{
                          color: item.color,
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}40`
                        }}
                      >
                        {item.current ? 'CURRENT' : item.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="vos-work-track-role">{item.role}</div>
                    <div className="vos-work-track-period">{item.period}</div>
                  </div>

                  <ChevronRight
                    size={15}
                    className="vos-work-track-arrow"
                    style={{
                      color: isSelected ? item.color : '#64748B'
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Institutional Trust Footer Seal */}
          <div className="vos-work-timeline-footer">
            <ShieldCheck size={13} style={{ color: '#10B981', flexShrink: 0 }} />
            <span>Verified Track Record • Manipur, India</span>
          </div>
        </div>

        {/* =========================================================
            PANEL 2: ROLE DOSSIER & IMPACT MATRIX (RIGHT - 790px)
            ========================================================= */}
        <div className="vos-work-dossier-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWork.id}
              className="vos-work-dossier-inner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Top Meta Badges Row */}
              <div className="vos-dossier-badge-row">
                <span
                  className="vos-dossier-org-badge"
                  style={{
                    color: currentWork.color,
                    borderColor: `${currentWork.color}50`,
                    background: `${currentWork.color}18`
                  }}
                >
                  <Award size={12} />
                  <span>{currentWork.organization}</span>
                </span>

                <span className="vos-dossier-meta-pill">
                  <MapPin size={11} style={{ color: '#94A3B8' }} />
                  <span>{currentWork.location}</span>
                </span>

                <span className="vos-dossier-meta-pill">
                  <Calendar size={11} style={{ color: '#94A3B8' }} />
                  <span>{currentWork.period}</span>
                </span>

                <span className="vos-dossier-meta-pill">
                  <Clock size={11} style={{ color: '#94A3B8' }} />
                  <span>{currentWork.type}</span>
                </span>
              </div>

              {/* Main Role Title & Subtitle */}
              <div className="vos-dossier-title-group">
                <h2 className="vos-dossier-role-title">{currentWork.role}</h2>
                <div className="vos-dossier-org-sub">
                  <span>{currentWork.organization}</span>
                  <span className="bullet-dot">•</span>
                  <span>{currentWork.location}</span>
                </div>
              </div>

              {/* Executive Summary Callout */}
              <div
                className="vos-dossier-summary-card"
                style={{
                  borderLeftColor: currentWork.color
                }}
              >
                <div className="vos-dossier-summary-text">{currentWork.description}</div>
              </div>

              {/* Key Responsibilities & Verifiable Milestones */}
              <div className="vos-dossier-section">
                <div className="vos-dossier-section-title">
                  <CheckCircle2 size={13} style={{ color: currentWork.color }} />
                  <span>KEY RESPONSIBILITIES & PRODUCTION IMPACT</span>
                </div>

                <div className="vos-dossier-bullet-grid">
                  {currentWork.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="vos-dossier-bullet-card">
                      <div
                        className="vos-dossier-bullet-dot"
                        style={{ background: currentWork.color }}
                      />
                      <span className="vos-dossier-bullet-content">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Core Competencies */}
              <div className="vos-dossier-section">
                <div className="vos-dossier-section-title">
                  <Code2 size={13} style={{ color: currentWork.color }} />
                  <span>PRODUCTION STACK & TOOLS</span>
                </div>

                <div className="vos-dossier-tech-pills">
                  {currentWork.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="vos-tech-tag"
                      style={{
                        borderColor: `${currentWork.color}35`,
                        background: `${currentWork.color}10`
                      }}
                    >
                      <span
                        className="tech-dot"
                        style={{ background: currentWork.color }}
                      />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Institutional Highlight Callout */}
              <div className="vos-dossier-highlight-strip">
                <div className="vos-dossier-highlight-left">
                  <Sparkles size={14} style={{ color: currentWork.color }} />
                  <span>
                    {currentWork.id === 'nts-tech'
                      ? 'Capstone Mentorship: Guided 100+ computer science students through data structures, Java, & web algorithms.'
                      : currentWork.id === 'hi-tech-edu'
                      ? 'Laboratory Infrastructure: Administered system deployments, network routing, & technical certification exams.'
                      : 'Community Preservation: Shipped offline-first indigenous utilities (Manipur Calculator, Manipuri Calendar, Khutsuman).'}
                  </span>
                </div>

                {onSwitchToMobile && (
                  <button
                    onClick={() => {
                      playClickSound(850, 0.04);
                      onSwitchToMobile();
                    }}
                    className="vos-dossier-phone-link"
                    title="View work experience in Phone OS"
                  >
                    <Laptop size={12} />
                    <span>View in Phone OS</span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
