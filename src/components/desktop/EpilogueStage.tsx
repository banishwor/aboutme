import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  Layers,
  Compass,
  Feather,
  ArrowRight,
  Quote,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './EpilogueStage.css';

export interface EpilogueStageProps {
  isEmbedded?: boolean;
  selectedPillarIndex?: number;
  onSelectPillarIndex?: (index: number) => void;
  onConnect?: () => void;
  onSwitchToMobile?: () => void;
}

interface PillarItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  lightBg: string;
  borderColor: string;
  summary: string;
  extendedQuote: string;
  lesson: string;
}

const PHILOSOPHY_PILLARS: PillarItem[] = [
  {
    id: 'humble-nerd',
    tag: 'PILLAR 01 // RADICAL HUMILITY',
    title: 'The Imperfect Builder',
    subtitle: 'Learning, Testing & Building Anyway',
    icon: <Sparkles size={16} />,
    color: '#6366F1',
    lightBg: 'rgba(99, 102, 241, 0.08)',
    borderColor: 'rgba(99, 102, 241, 0.25)',
    summary: 'I don’t pretend to be an all-knowing historian or an infallible architect. I am just a tech nerd who experiments, tests, and builds despite imperfection.',
    extendedQuote: '"I am just a guy with not too much knowledge either about history or software development. But I build apps, websites, post historical blogs, and test. I am a tech nerd, and I know I am not perfect. But I build anyway."',
    lesson: 'Imperfect action beats silent waiting every single day.'
  },
  {
    id: 'nobody-else',
    tag: 'PILLAR 02 // RESPONSIBILITY',
    title: 'Because Nobody Else Did',
    subtitle: 'Serving a Small Community with Deep Roots',
    icon: <Layers size={16} />,
    color: '#059669',
    lightBg: 'rgba(5, 150, 105, 0.08)',
    borderColor: 'rgba(5, 150, 105, 0.25)',
    summary: 'Many developers can build the best apps, but big tech doesn’t build for a small community like ours in Manipur. If we don’t build for our people, nobody will.',
    extendedQuote: '"Many developers can develop the best apps. But since we are a small group of people yet with such rich history, nobody was doing it. So I did it, even though it is not perfect, because its visibility on the internet was so low."',
    lesson: 'Step up to solve neglected local problems.'
  },
  {
    id: 'cultural-presence',
    tag: 'PILLAR 03 // CULTURAL VISIBILITY',
    title: 'Digital Meitei Heritage',
    subtitle: 'Preserving History from Fading',
    icon: <Heart size={16} />,
    color: '#E11D48',
    lightBg: 'rgba(225, 29, 72, 0.08)',
    borderColor: 'rgba(225, 29, 72, 0.25)',
    summary: 'Our culture is ancient and rich, but almost invisible online. Encoding our lunar calendars, clans, and history gives future generations something to find.',
    extendedQuote: '"Our history spans centuries, yet our presence on the global web was almost zero. Even if my software and articles are not flawless, putting our heritage online gives our culture digital survival and visibility."',
    lesson: 'Digital representation is how small cultures endure.'
  },
  {
    id: 'respect-user',
    tag: 'PILLAR 04 // USER DIGNITY',
    title: 'Dignity Over Ad Greed',
    subtitle: 'Treating Everyday Users with Respect',
    icon: <Compass size={16} />,
    color: '#D97706',
    lightBg: 'rgba(217, 119, 6, 0.08)',
    borderColor: 'rgba(217, 119, 6, 0.25)',
    summary: 'I place ads in a respectful manner, and sometimes no ads at all. Not because I’m rich, but because as an everyday user, I know how frustrating bad software feels.',
    extendedQuote: '"I add ads in a respectable manner, and sometimes no ads at all. Not because I am rich, but because as an everyday user I know how frustrating it is, and I want users to experience a clean, premium feeling."',
    lesson: 'User respect and peace of mind over cheap monetization.'
  }
];

export const EpilogueStage: React.FC<EpilogueStageProps> = ({
  isEmbedded = true,
  selectedPillarIndex: externalIndex,
  onSelectPillarIndex: externalOnSelect,
  onConnect,
  onSwitchToMobile: _onSwitchToMobile
}) => {
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const activeIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const activePillar = PHILOSOPHY_PILLARS[activeIndex] || PHILOSOPHY_PILLARS[0];

  const handleSelectPillar = (index: number) => {
    playClickSound(750, 0.03);
    if (externalOnSelect) {
      externalOnSelect(index);
    } else {
      setInternalIndex(index);
    }
  };

  const handleConnectClick = () => {
    playSuccessChime();
    if (onConnect) {
      onConnect();
    }
  };

  return (
    <div className={`vos-epilogue-desk-container ${isEmbedded ? 'embedded' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          LEFT PANEL: THE FOUR PILLARS (Philosophy Matrix)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-epilogue-pillars-panel">
        <div className="vos-pillars-header">
          <div className="vos-pillars-eyebrow">
            <span className="vos-pillars-dot" />
            <span>MY CORE IDEOLOGY</span>
          </div>
          <h2 className="vos-pillars-title">Why I Build</h2>
          <p className="vos-pillars-subtitle">
            Humble beliefs on technology, Meitei culture & user dignity.
          </p>
        </div>

        {/* 4 Interactive Cards */}
        <div className="vos-pillars-list">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={pillar.id}
                onClick={() => handleSelectPillar(idx)}
                className={`vos-pillar-card ${isSelected ? 'active' : ''}`}
                style={{
                  '--pillar-color': pillar.color,
                  '--pillar-light-bg': pillar.lightBg,
                  '--pillar-border': pillar.borderColor
                } as React.CSSProperties}
              >
                <div className="vos-pillar-icon-box">
                  {pillar.icon}
                </div>
                <div className="vos-pillar-info">
                  <div className="vos-pillar-tag">{pillar.tag}</div>
                  <div className="vos-pillar-name">{pillar.title}</div>
                  <div className="vos-pillar-sub">{pillar.subtitle}</div>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="pillar-active-indicator"
                    className="vos-pillar-active-pip"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Spotlight Card */}
        <div
          className="vos-pillar-spotlight-box"
          style={{
            borderColor: activePillar.borderColor,
            background: activePillar.lightBg
          }}
        >
          <div className="vos-spotlight-quote-label">
            <Quote size={12} style={{ color: activePillar.color }} />
            <span style={{ color: activePillar.color }}>PERSONAL BELIEF IN HIS OWN WORDS</span>
          </div>
          <p className="vos-spotlight-quote-text">
            {activePillar.extendedQuote}
          </p>
          <div className="vos-spotlight-lesson">
            <CheckCircle2 size={12} style={{ color: activePillar.color }} />
            <span>{activePillar.lesson}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT PANEL: THE AUTHOR'S MONOGRAPH & SIGNED LETTER
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-epilogue-letter-panel">
        {/* Subtle Watermark Texture */}
        <div className="vos-letter-watermark-seal">
          <div className="vos-letter-seal-inner">
            <span className="vos-seal-meitei">ꯀꯪꯂꯩꯄꯥꯛ</span>
            <span className="vos-seal-sub">BANI // OS · EST. 2026</span>
          </div>
        </div>

        {/* Letter Top Header */}
        <div className="vos-letter-header">
          <div className="vos-letter-meta-left">
            <div className="vos-letter-act-pill">
              <Feather size={12} style={{ color: '#D97706' }} />
              <span>MY IDEOLOGY · WHY I BUILD FOR MANIPUR</span>
            </div>
            <h1 className="vos-letter-heading">
              Not Perfect. Just Necessary.
            </h1>
            <p className="vos-letter-subheading">
              A personal letter from a tech nerd building for his people and Meitei culture.
            </p>
          </div>

          <div className="vos-letter-origin-badge">
            <MapPin size={12} style={{ color: '#059669' }} />
            <span>Thoubal, Manipur</span>
          </div>
        </div>

        {/* Parchment Letter Body */}
        <div className="vos-letter-body-scrollable">
          <div className="vos-letter-prose">
            <p className="vos-prose-lead">
              <span className="vos-drop-cap">I</span>
              am just a guy with not too much knowledge, either about deep history or advanced software development. I don&apos;t pretend to be an infallible architect or an academic historian. I am simply a technology nerd who loves to build apps, create websites, post cultural blogs, and test ideas. I know I am not perfect, and I have never claimed to be.
            </p>

            <p>
              There are countless brilliant developers out there who can develop the best, most complex applications. But the tech industry builds for massive populations. We, the Manipuri people, are a small group of people. Yet behind our small numbers lies a deeply rich history, vibrant language, and ancient Meitei culture. Because our community is small, its visibility on the global internet has been whisper-low, and almost nobody was building tools for our heritage.
            </p>

            <p>
              So I decided to do it myself. I built the Manipuri lunar calendar, the clan genealogy directory, the land and wage calculators, and the cultural codex blogs. Even though my tools are not perfect, having our history visible and accessible on the web matters so much more than waiting for a flawless expert who may never come.
            </p>

            <p>
              And when someone in our community opens my apps, I want them to feel respected. I add ads in a very quiet, respectable manner — and sometimes no ads at all. That is not because I am rich; it is because as an everyday user myself, I know how frustrating and exhausting intrusive ads feel. I want everyday people to experience a clean, premium, and dignified product.
            </p>
          </div>

          {/* Golden Fleuron Pull-Quote Callout */}
          <div className="vos-letter-pull-quote">
            <div className="vos-quote-fleuron">❧</div>
            <blockquote className="vos-pull-quote-content">
              &ldquo;Other developers can build bigger apps. But nobody was building for our people — so I did it, imperfectly and wholeheartedly.&rdquo;
            </blockquote>
            <div className="vos-quote-author">
              — Banishwor Athokpam · Builder for Manipuri Culture & Everyday People
            </div>
          </div>
        </div>

        {/* Footer Colophon & Grand Connection CTA */}
        <div className="vos-letter-footer">
          <div className="vos-signature-block">
            <div className="vos-cursive-signature">
              Banishwor Athokpam
            </div>
            <div className="vos-signature-meta">
              <span>Banishwor Athokpam</span>
              <span className="vos-meta-sep">·</span>
              <span>Thoubal, Manipur</span>
              <span className="vos-meta-sep">·</span>
              <span className="vos-pulse-status">
                <span className="vos-status-dot" />
                Building with honest purpose
              </span>
            </div>
          </div>

          <button
            onClick={handleConnectClick}
            className="vos-connect-finale-btn pressable"
            title="Proceed to Direct Connect & Social Ecosystem"
          >
            <span>Step into the Finale: Let&apos;s Connect</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
