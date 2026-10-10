import React, { useState, useEffect } from 'react';
import { Award, FileText, Smartphone, ChevronDown, QrCode, Terminal } from 'lucide-react';
import { profile } from '../../content/profile';
import { playClickSound } from '../../utils/audioFeedback';
import { MeiteiMayekClock } from './MeiteiMayekClock';
import './HeroPoster.css';

interface HeroPosterProps {
  onExploreWorks: () => void;
  onExploreApps: () => void;
  onExploreArchive: () => void;
  onSwitchToMobile: () => void;
  onOpenQR: () => void;
  onTriggerMatrix: () => void;
  onJumpToNext: () => void;
}

// Precision CountUp Component with cubic ease-out (identical to F1 spec)
function CountUp({
  to,
  delay,
  className,
  suffix = '',
  prefix = ''
}: {
  to: number;
  delay: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    let raf = 0;
    const timer = setTimeout(() => {
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        // Cubic ease-out: 1 - (1 - t)^3
        setV(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, delay]);

  return (
    <span className={className}>
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

export const HeroPoster: React.FC<HeroPosterProps> = ({
  onExploreWorks,
  onExploreApps,
  onExploreArchive,
  onSwitchToMobile,
  onOpenQR,
  onTriggerMatrix,
  onJumpToNext
}) => {
  return (
    <div className="f1-poster-stage">
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND LAYER: PHOTOGRAPHIC GRADIENT + BAKED "07"
          ───────────────────────────────────────────────────────────── */}
      <div className="f1-bg-gradient" />

      {/* Baked Soft "10" Watermark */}
      <div className="f1-watermark">
        <span>10</span>
      </div>

      {/* Ambient Darkened Overlay */}
      <div className="f1-dark-overlay" />

      {/* ─────────────────────────────────────────────────────────────
          2. TOP NAVIGATION HEADER
          ───────────────────────────────────────────────────────────── */}
      <header className="f1-header">
        {/* Left: Brand Identity + Authentic Meitei Mayek Badge */}
        <div className="f1-brand-logo animate-fade-slide-down">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="f1-brand-title">BANISHWOR</span>
            <span className="f1-brand-tag">2026</span>
          </div>

          {/* Authentic Meitei Mayek Badge */}
          <div
            title="Authentic Meitei Mayek script for Banishwor Athokpam"
            className="f1-mayek-badge"
          >
            <span>ꯕꯥꯅꯤꯁ꯭ꯋꯣꯔ ꯑꯊꯣꯛꯄꯝ</span>
          </div>
        </div>

        {/* Center: Quiet Editorial Nav Links */}
        <nav className="f1-nav-links">
          <button
            onClick={() => {
              playClickSound(800, 0.04);
              onExploreWorks();
            }}
            className="f1-nav-link animate-fade-slide-down"
            style={{ animationDelay: '100ms' }}
          >
            Literature
          </button>
          <button
            onClick={() => {
              playClickSound(850, 0.04);
              onExploreApps();
            }}
            className="f1-nav-link animate-fade-slide-down"
            style={{ animationDelay: '200ms' }}
          >
            Android Atelier
          </button>
          <button
            onClick={() => {
              playClickSound(900, 0.04);
              onExploreArchive();
            }}
            className="f1-nav-link animate-fade-slide-down"
            style={{ animationDelay: '300ms' }}
          >
            Living Archive
          </button>
        </nav>

        {/* Right: Actions (Easter Eggs, Phone OS Mode + Sharp White Resume Button) */}
        <div className="f1-header-actions">
          <button
            onClick={() => {
              playClickSound(950, 0.04);
              onTriggerMatrix();
            }}
            title="Matrix Rain Easter Egg (or type 'matrix' anywhere)"
            className="f1-action-btn"
            style={{
              fontFamily: 'monospace',
              color: '#34D399',
              borderColor: 'rgba(52, 211, 153, 0.3)'
            }}
          >
            <Terminal size={12} />
            <span>&gt;_matrix</span>
          </button>

          <button
            onClick={() => {
              playClickSound(900, 0.04);
              onOpenQR();
            }}
            title="Beam to Phone (Scan QR)"
            className="f1-action-btn"
          >
            <QrCode size={13} color="#818CF8" />
            <span>Beam</span>
          </button>

          <button
            onClick={() => {
              playClickSound(750, 0.04);
              onSwitchToMobile();
            }}
            className="f1-action-btn"
          >
            <Smartphone size={13} color="#34D399" />
            <span>Phone OS</span>
          </button>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="f1-action-btn f1-btn-resume animate-fade-slide-down"
            style={{ animationDelay: '200ms' }}
          >
            <FileText size={13} color="#FBBF24" />
            <span>Resume</span>
          </a>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTER: PORTRAIT CUT-OUT + BOTTOM GLASS BLUR MELT
          ───────────────────────────────────────────────────────────── */}
      <div className="f1-photo-container">
        {/* Cut-Out Portrait Anchored to Bottom */}
        <div className="f1-photo-wrapper">
          <img
            src={profile.avatarUrl}
            alt="Banishwor Athokpam"
            className="f1-portrait-img animate-scale-in"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        {/* Bottom Glass Blur Layer (melts the bottom into the dark floor) */}
        <div
          className="f1-blur-layer animate-fade-in"
          style={{ animationDelay: '600ms' }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. TOP-LEFT: LOCATION & ROOTS (EDITORIAL LIGHT 300)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="f1-location-block animate-speed-reveal"
        style={{ animationDelay: '500ms' }}
      >
        <div className="f1-location-pill">
          <span className="f1-status-dot" />
          <span className="f1-location-label">
            Thoubal · Manipur, India
          </span>
        </div>

        <h2 className="f1-location-title">
          Thoubal
          <br />
          Manipur
        </h2>

        <div className="f1-coords">
          24.63° N · 93.99° E
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. TOP-RIGHT: AUTHENTIC MEITEI MAYEK WALL CLOCK (LIVE CHRONOMETER)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="f1-clock-block animate-fade-slide-left"
        style={{ animationDelay: '600ms' }}
      >
        <MeiteiMayekClock />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM-LEFT: CRAFT STRIP + MONUMENTAL NAME (600)
          ───────────────────────────────────────────────────────────── */}
      <div className="f1-name-block">
        {/* Overlapping Craft Avatar / Badge Strip */}
        <div
          className="f1-avatar-strip animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <div className="f1-avatar-group">
            <span className="f1-avatar-badge" style={{ background: '#4F46E5' }}>KT</span>
            <span className="f1-avatar-badge" style={{ background: '#DC2626' }}>BK</span>
            <span className="f1-avatar-badge" style={{ background: '#D97706' }}>07</span>
            <span className="f1-avatar-badge" style={{ background: '#059669' }}>12</span>
          </div>

          <span className="f1-craft-tagline">
            Android Craftsman · Author · Archivist
          </span>
        </div>

        {/* Monumental Headline */}
        <h1
          className="f1-monumental-name animate-speed-reveal"
          style={{ animationDelay: '700ms' }}
        >
          Banishwor
          <br />
          Athokpam
        </h1>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM-RIGHT: CAREER DISTINCTIONS (COUNT-UP)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="f1-metrics-block animate-fade-slide-up"
        style={{ animationDelay: '800ms' }}
      >
        <div className="f1-metrics-label">
          <span>Career Distinctions</span>
          <Award size={16} color="#FBBF24" />
        </div>

        {/* 3 Stacked Numbers that count up on load */}
        <div className="f1-stacked-numbers">
          {/* Metric 1: 4 Applications */}
          <div className="f1-metric-row num-fade-row row-1">
            <span className="f1-metric-val">
              <CountUp to={4} delay={900} />
            </span>
            <span className="f1-metric-unit">
              Applications
            </span>
          </div>

          {/* Metric 2: 15K+ Line of Code */}
          <div className="f1-metric-row num-fade-row row-2">
            <span className="f1-metric-val">
              <CountUp to={15} delay={1100} suffix="K+" />
            </span>
            <span className="f1-metric-unit">
              Line of Code
            </span>
          </div>

          {/* Metric 3: MU 7th State Rank in Solid Gold */}
          <div className="f1-metric-row row-3">
            <span className="f1-metric-val gold">
              <CountUp to={7} delay={1300} prefix="#" suffix=" Rank" />
            </span>
          </div>
        </div>

        <div className="f1-metrics-sub">
          MU MCA · 80.30% Distinction
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. SUBTLE SCROLL PROMPT AT BOTTOM CENTER
          ───────────────────────────────────────────────────────────── */}
      <button
        onClick={onJumpToNext}
        className="f1-scroll-cue"
      >
        <span>SCROLL TO EXPLORE EXHIBITION</span>
        <ChevronDown size={14} className="animate-bounce" color="#818CF8" />
      </button>
    </div>
  );
};
