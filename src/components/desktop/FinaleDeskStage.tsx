import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Layers,
  Compass,
  Feather,
  ArrowRight,
  Quote,
  CheckCircle2,
  MapPin,
  Mail,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  FileText,
  RotateCcw,
  Clock,
  Send,
  Globe
} from 'lucide-react';
import { profile } from '../../content/profile';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './FinaleDeskStage.css';

export interface FinaleDeskStageProps {
  isEmbedded?: boolean;
  mode: 'ideology' | 'contact';
  selectedPillarIndex?: number;
  onSelectPillarIndex?: (index: number) => void;
  onConnect?: () => void;
  onRestartJourney?: () => void;
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
    id: 'imperfect-builder',
    tag: 'PILLAR 01 // HUMILITY',
    title: 'The Imperfect Builder',
    subtitle: 'Not An Infallible Scholar, Just A Tech Nerd',
    icon: <Heart size={16} />,
    color: '#E11D48',
    lightBg: 'rgba(225, 29, 72, 0.08)',
    borderColor: 'rgba(225, 29, 72, 0.25)',
    summary: 'I am just a guy with not too much knowledge either about deep history or software development. I build apps, websites, post historical blogs and test ideas. I am not perfect and never claimed to be.',
    extendedQuote: '"I am just a guy with not too much knowledge either about historical or software development. But build apps, website, post historical and cultural blogs and test. I am a technology nerd but I am not perfect."',
    lesson: 'Honesty and continuous curiosity over performative mastery.'
  },
  {
    id: 'because-nobody-did',
    tag: 'PILLAR 02 // RESPONSIBILITY',
    title: 'Because Nobody Else Did',
    subtitle: 'Stepping Up for an Underserved Digital Culture',
    icon: <Layers size={16} />,
    color: '#059669',
    lightBg: 'rgba(5, 150, 105, 0.08)',
    borderColor: 'rgba(5, 150, 105, 0.25)',
    summary: 'Many developers can develop the best apps. But since we are a small group of people yet have rich history, nobody is doing it. So I did it, even though it is not perfect, because its visibility on the internet was so low.',
    extendedQuote: '"Many developers can develop best apps, but since we are a small group of people yet rich history nobody is doing. So I did it even though it is not perfect coz its visibility on internet is so low and no one is doing it."',
    lesson: 'Taking responsibility when representation is absent.'
  },
  {
    id: 'digital-meitei-heritage',
    tag: 'PILLAR 03 // CULTURAL PRESERVATION',
    title: 'Digital Meitei Heritage',
    subtitle: 'Giving Ancient Roots a Permanent Web Footprint',
    icon: <Feather size={16} />,
    color: '#7C3AED',
    lightBg: 'rgba(124, 58, 237, 0.08)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
    summary: 'Building digital sanctuaries for Manipuri lunar timekeeping, clan lineage preservation, land math, and literature so future generations can discover their heritage anywhere in the world.',
    extendedQuote: '"I build for Manipuri people and Meitei culture. Having our presence documented and preserved on the modern digital web is far more important than waiting for flawless perfection."',
    lesson: 'Preserving identity through working software.'
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

interface SocialLinkItem {
  id: string;
  name: string;
  handle: string;
  tag: string;
  url: string;
  color: string;
  lightBg: string;
  borderColor: string;
  iconSvg: React.ReactNode;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'banishwor',
    tag: 'PROFESSIONAL NETWORK',
    url: 'https://www.linkedin.com/in/banishwor/',
    color: '#0A66C2',
    lightBg: 'rgba(10, 102, 194, 0.08)',
    borderColor: 'rgba(10, 102, 194, 0.25)',
    iconSvg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46V10.9M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'banishwor',
    tag: 'SOURCE CODE & REPOS',
    url: 'https://github.com/banishwor',
    color: '#0F172A',
    lightBg: 'rgba(15, 23, 42, 0.06)',
    borderColor: 'rgba(15, 23, 42, 0.22)',
    iconSvg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    )
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    handle: '@banishwor',
    tag: 'THOUGHTS & TECH UPDATES',
    url: 'https://x.com/banishwor',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.06)',
    borderColor: 'rgba(0, 0, 0, 0.22)',
    iconSvg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@banishwor_ath',
    tag: 'LIFE, BOOKS & MANIPUR',
    url: 'https://www.instagram.com/banishwor_ath/',
    color: '#E1306C',
    lightBg: 'rgba(225, 48, 108, 0.08)',
    borderColor: 'rgba(225, 48, 108, 0.25)',
    iconSvg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    )
  },
  {
    id: 'fb-profile',
    name: 'Facebook Profile',
    handle: 'banishwor.athokpam',
    tag: 'PERSONAL PROFILE',
    url: 'https://www.facebook.com/banishwor.athokpam',
    color: '#1877F2',
    lightBg: 'rgba(24, 119, 242, 0.08)',
    borderColor: 'rgba(24, 119, 242, 0.25)',
    iconSvg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    id: 'fb-page',
    name: 'Facebook Page',
    handle: 'banishwor',
    tag: 'OFFICIAL PAGE',
    url: 'https://www.facebook.com/banishwor',
    color: '#0866FF',
    lightBg: 'rgba(8, 102, 255, 0.08)',
    borderColor: 'rgba(8, 102, 255, 0.25)',
    iconSvg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )
  }
];

export const FinaleDeskStage: React.FC<FinaleDeskStageProps> = ({
  isEmbedded = true,
  mode,
  selectedPillarIndex: externalIndex,
  onSelectPillarIndex: externalOnSelect,
  onConnect,
  onRestartJourney,
  onSwitchToMobile: _onSwitchToMobile
}) => {
  // Act 12 State
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const activeIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const activePillar = PHILOSOPHY_PILLARS[activeIndex] || PHILOSOPHY_PILLARS[0];

  // Act 13 State
  const [emailCopied, setEmailCopied] = useState(false);
  const [whatsappCopied, setWhatsappCopied] = useState(false);
  const [manipurTime, setManipurTime] = useState('');

  // Live IST Clock (Thoubal, Manipur UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        setManipurTime(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch {
        setManipurTime('IST · UTC+5:30');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('banishwor@outlook.com');
    setEmailCopied(true);
    playSuccessChime();
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText('+919615989800');
    setWhatsappCopied(true);
    playSuccessChime();
    setTimeout(() => setWhatsappCopied(false), 2500);
  };

  const handleRestart = () => {
    playClickSound(800, 0.04);
    if (onRestartJourney) {
      onRestartJourney();
    }
  };

  return (
    <div className={`vos-finale-desk-container ${isEmbedded ? 'embedded' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          LEFT PANEL: FIXED 380px (Never unmounts or resizes!)
          Internal content morphs smoothly between Act 12 & Act 13
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-finale-left-panel">
        <AnimatePresence mode="wait">
          {mode === 'ideology' ? (
            <motion.div
              key="left-ideology-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Act 12 Header */}
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

              {/* Act 12: 4 Interactive Pillar Cards */}
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

              {/* Act 12 Dynamic Pillar Spotlight Quote */}
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
            </motion.div>
          ) : (
            <motion.div
              key="left-contact-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Act 13 Header */}
              <div className="vos-channels-header">
                <div className="vos-channels-eyebrow">
                  <span className="vos-channels-dot" />
                  <span>DIRECT CHANNELS · 24/7</span>
                </div>
                <h2 className="vos-channels-title">Get In Touch</h2>
                <p className="vos-channels-subtitle">
                  Fastest ways to message me for apps, culture, or conversation.
                </p>
              </div>

              {/* Act 13: 3 Direct Channel Action Cards */}
              <div className="vos-channel-cards-list">
                {/* 1. WhatsApp Fast Direct */}
                <div className="vos-channel-card whatsapp-theme">
                  <div className="vos-channel-icon-wrap whatsapp">
                    <MessageCircle size={18} />
                  </div>
                  <div className="vos-channel-content">
                    <div className="vos-channel-label">WHATSAPP DIRECT</div>
                    <div className="vos-channel-value">+91 9615989800</div>
                    <div className="vos-channel-desc">Instant replies for collaboration</div>
                  </div>
                  <div className="vos-channel-actions">
                    <button
                      onClick={handleCopyWhatsapp}
                      className="vos-channel-btn-icon pressable"
                      title="Copy WhatsApp Number"
                    >
                      {whatsappCopied ? <Check size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
                    </button>
                    <a
                      href="https://wa.me/919615989800?text=Hi%20Banishwor,%20saw%20your%20BANI%20//%20OS%20portfolio!"
                      target="_blank"
                      rel="noreferrer"
                      className="vos-channel-btn-primary whatsapp pressable"
                      title="Open WhatsApp Chat"
                    >
                      <span>Chat</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* 2. Primary Outlook Email */}
                <div className="vos-channel-card email-theme">
                  <div className="vos-channel-icon-wrap email">
                    <Mail size={18} />
                  </div>
                  <div className="vos-channel-content">
                    <div className="vos-channel-label">PRIMARY EMAIL</div>
                    <div className="vos-channel-value">banishwor@outlook.com</div>
                    <div className="vos-channel-desc">Inquiries, proposals & long-form</div>
                  </div>
                  <div className="vos-channel-actions">
                    <button
                      onClick={handleCopyEmail}
                      className="vos-channel-btn-icon pressable"
                      title="Copy Email Address"
                    >
                      {emailCopied ? <Check size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
                    </button>
                    <a
                      href="mailto:banishwor@outlook.com"
                      className="vos-channel-btn-primary email pressable"
                      title="Send Email"
                    >
                      <span>Write</span>
                      <Send size={12} />
                    </a>
                  </div>
                </div>

                {/* 3. Official Resume Document */}
                <div className="vos-channel-card doc-theme">
                  <div className="vos-channel-icon-wrap doc">
                    <FileText size={18} />
                  </div>
                  <div className="vos-channel-content">
                    <div className="vos-channel-label">CURRICULUM VITAE</div>
                    <div className="vos-channel-value">Official Resume (PDF)</div>
                    <div className="vos-channel-desc">Full education, rank & stack history</div>
                  </div>
                  <div className="vos-channel-actions">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="vos-channel-btn-primary doc pressable"
                      title="Download Resume"
                    >
                      <span>Download</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Act 13 Live Status Beacon */}
              <div className="vos-contact-status-beacon">
                <div className="vos-beacon-top">
                  <div className="vos-beacon-pulse">
                    <span className="vos-pulse-ring" />
                    <span className="vos-pulse-core" />
                  </div>
                  <div className="vos-beacon-text">
                    <span className="vos-beacon-city">Thoubal, Manipur, India</span>
                    <span className="vos-beacon-clock">
                      <Clock size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                      {manipurTime || 'IST · UTC+5:30'}
                    </span>
                  </div>
                </div>
                <div className="vos-beacon-note">
                  Available for Android development, offline-first architectures & cultural collaborations.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT PANEL: FLEX 1 (Never unmounts or resizes!)
          Internal content morphs smoothly between Act 12 & Act 13
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-finale-right-panel">
        <AnimatePresence mode="wait">
          {mode === 'ideology' ? (
            <motion.div
              key="right-manifesto-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Watermark Texture */}
              <div className="vos-letter-watermark-seal">
                <div className="vos-letter-seal-inner">
                  <span className="vos-seal-meitei">ꯀꯪꯂꯩꯄꯥꯛ</span>
                  <span className="vos-seal-sub">BANI // OS · EST. 2026</span>
                </div>
              </div>

              {/* Act 12 Letter Top Header */}
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

              {/* Act 12 Parchment Letter Body */}
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

              {/* Act 12 Footer Colophon & Grand Connection CTA */}
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
                  title="Proceed to Direct Connect & Social Links"
                >
                  <span>Step into the Finale: Let&apos;s Connect</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="right-social-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Watermark Texture */}
              <div className="vos-letter-watermark-seal">
                <div className="vos-letter-seal-inner">
                  <span className="vos-seal-meitei">ꯀꯪꯂꯩꯄꯥꯛ</span>
                  <span className="vos-seal-sub">CONNECT · EST. 2026</span>
                </div>
              </div>

              {/* Top Header */}
              <div className="vos-social-header">
                <div className="vos-social-header-left">
                  <div className="vos-social-act-pill">
                    <Globe size={12} style={{ color: '#059669' }} />
                    <span>GET IN TOUCH · SOCIAL ECOSYSTEM</span>
                  </div>
                  <h1 className="vos-social-heading">
                    Connect Across the Web
                  </h1>
                  <p className="vos-social-subheading">
                    Verified accounts, source repositories & direct public channels.
                  </p>
                </div>

                <button
                  onClick={handleRestart}
                  className="vos-restart-btn pressable"
                  title="Return to Beginning"
                >
                  <RotateCcw size={13} />
                  <span>Replay Journey</span>
                </button>
              </div>

              {/* 6-Grid Social Network Hub */}
              <div className="vos-social-grid">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="vos-social-tile pressable"
                    style={{
                      '--tile-color': link.color,
                      '--tile-light-bg': link.lightBg,
                      '--tile-border': link.borderColor
                    } as React.CSSProperties}
                  >
                    <div className="vos-tile-icon-box">
                      {link.iconSvg}
                    </div>
                    <div className="vos-tile-info">
                      <div className="vos-tile-tag">{link.tag}</div>
                      <div className="vos-tile-name">{link.name}</div>
                      <div className="vos-tile-handle">{link.handle}</div>
                    </div>
                    <div className="vos-tile-arrow">
                      <ExternalLink size={13} />
                    </div>
                  </a>
                ))}
              </div>

              {/* Bottom Colophon Bar */}
              <div className="vos-social-colophon">
                <div className="vos-colophon-left">
                  <div className="vos-colophon-brand">
                    <strong>BANI // OS</strong>
                    <span className="vos-colophon-sep">·</span>
                    <span>Designed & Built by Banishwor Athokpam</span>
                  </div>
                  <div className="vos-colophon-origin">
                    Thoubal, Manipur · Engineering, Heritage & Prose
                  </div>
                </div>

                <div className="vos-colophon-right">
                  <div className="vos-colophon-kangleipak">
                    ꯀꯪꯂꯩꯄꯥꯛ · Kangleipak
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
