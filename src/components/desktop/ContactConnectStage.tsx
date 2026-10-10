import React, { useState, useEffect } from 'react';
import {
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
import './ContactConnectStage.css';

export interface ContactConnectStageProps {
  isEmbedded?: boolean;
  onRestartJourney?: () => void;
  onSwitchToMobile?: () => void;
}

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

export const ContactConnectStage: React.FC<ContactConnectStageProps> = ({
  isEmbedded = true,
  onRestartJourney,
  onSwitchToMobile: _onSwitchToMobile
}) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [whatsappCopied, setWhatsappCopied] = useState(false);
  const [manipurTime, setManipurTime] = useState('');

  // Live IST Clock (Thoubal, Manipur UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setManipurTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className={`vos-contact-desk-container ${isEmbedded ? 'embedded' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          LEFT PANEL: DIRECT CHANNELS & QUICK ACTIONS (420px)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-contact-channels-panel">
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

        {/* Action Channel Cards */}
        <div className="vos-channel-cards-list">
          {/* 1. WhatsApp Fast Message */}
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

        {/* Live Status Beacon at Bottom of Left Panel */}
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
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT PANEL: VERIFIED SOCIAL ECOSYSTEM (Flex 1)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-contact-social-panel">
        {/* Subtle Watermark Seal */}
        <div className="vos-social-watermark">
          <div className="vos-social-watermark-inner">
            <span className="vos-watermark-meitei">ꯀꯪꯂꯩꯄꯥꯛ</span>
            <span className="vos-watermark-sub">CONNECT · EST. 2026</span>
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
      </div>
    </div>
  );
};
