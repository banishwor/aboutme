import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Sparkles,
  Bookmark,
  Share2,
  Check,
  Smartphone
} from 'lucide-react';
import { books } from '../../content/books';
import { profile } from '../../content/profile';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './VisionOSBookSanctuary.css';

interface VisionOSBookSanctuaryProps {
  onExploreNext?: () => void;
  onSwitchToMobile?: () => void;
}

export const VisionOSBookSanctuary: React.FC<VisionOSBookSanctuaryProps> = ({
  onExploreNext,
  onSwitchToMobile
}) => {
  const [activeBookIdx, setActiveBookIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'fiction' | 'nonfiction'>('all');
  const [isCopied, setIsCopied] = useState(false);

  const currentBook = books[activeBookIdx] || books[0];

  const handleShare = () => {
    navigator.clipboard.writeText(currentBook.amazonUrl);
    setIsCopied(true);
    playSuccessChime();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="vos-sanctuary-stage">
      {/* ─────────────────────────────────────────────────────────────
          1. FULL-BLEED BLURRED WARM STUDY ROOM PHOTO
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-study-bg" />
      <div className="vos-study-overlay" />

      {/* ─────────────────────────────────────────────────────────────
          2. SPATIAL SAFARI PILL TOOLBAR (visionOS CHROME)
          ───────────────────────────────────────────────────────────── */}
      <header className="vos-safari-toolbar">
        {/* Left: Navigation Buttons */}
        <div className="vos-toolbar-left">
          <button
            onClick={() => {
              playClickSound(700, 0.03);
              setActiveBookIdx((prev) => (prev === 0 ? books.length - 1 : prev - 1));
            }}
            title="Previous Book"
            className="vos-pill-circle-btn"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => {
              playClickSound(750, 0.03);
              setActiveBookIdx((prev) => (prev === books.length - 1 ? 0 : prev + 1));
            }}
            title="Next Book"
            className="vos-pill-circle-btn"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Center: Safari Spatial Pill Field with Section Title */}
        <div className="vos-url-field">
          <BookOpen size={13} className="vos-url-lock" style={{ color: '#F87171' }} />
          <span style={{ fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '11px' }}>
            THE LITERARY WORKS
          </span>
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
              style={{ width: 'auto', padding: '0 12px', gap: '6px', fontSize: '11px', fontWeight: 700 }}
            >
              <Smartphone size={13} />
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

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN FLOATING LIQUID-GLASS WINDOW (NO backdrop-filter on window!)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-floating-window">
        {/* Window Top Tabs */}
        <div className="vos-window-header">
          <div className="vos-category-tabs">
            <button
              onClick={() => {
                playClickSound(800, 0.03);
                setActiveTab('all');
              }}
              className={`vos-category-tab ${activeTab === 'all' ? 'active' : ''}`}
            >
              Discover All Works
            </button>
            <button
              onClick={() => {
                playClickSound(850, 0.03);
                setActiveTab('fiction');
                setActiveBookIdx(0); // The Echoes of Silence
              }}
              className={`vos-category-tab ${activeTab === 'fiction' ? 'active' : ''}`}
            >
              Literary Fiction
            </button>
            <button
              onClick={() => {
                playClickSound(900, 0.03);
                setActiveTab('nonfiction');
                setActiveBookIdx(1); // Pushback
              }}
              className={`vos-category-tab ${activeTab === 'nonfiction' ? 'active' : ''}`}
            >
              Psychology & Non-Fiction
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
            <span>LITERARY SANCTUARY</span>
            {onExploreNext && (
              <button
                onClick={() => {
                  playClickSound(800, 0.03);
                  onExploreNext();
                }}
                className="vos-pill-circle-btn"
                style={{ width: 'auto', padding: '2px 10px', height: '24px', fontSize: '10px', fontWeight: 700 }}
                title="Next: Software Atelier"
              >
                <span>Apps →</span>
              </button>
            )}
          </div>
        </div>

        {/* Window Two-Column Body Grid */}
        <div className="vos-window-grid">
          {/* ──────────────────────────────────────────────────────────
              LEFT COLUMN: PUBLISHED RELEASES & READING PROGRESS
              ────────────────────────────────────────────────────────── */}
          <div className="vos-left-col">
            {/* Panel 1: Published Volumes */}
            <div className="vos-frosted-panel" style={{ flex: 1 }}>
              <div className="vos-panel-header">
                <span className="vos-panel-title">Published Titles</span>
                <span className="vos-panel-badge">Amazon Kindle</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {books.map((book, idx) => {
                  const isCurrent = activeBookIdx === idx;
                  return (
                    <div
                      key={book.id}
                      onClick={() => {
                        playClickSound(800 + idx * 50, 0.04);
                        setActiveBookIdx(idx);
                      }}
                      className={`vos-book-row ${isCurrent ? 'active' : ''}`}
                    >
                      <img
                        src={book.coverPath}
                        alt={book.title}
                        className="vos-book-thumb"
                      />
                      <div className="vos-book-row-meta">
                        <div className="vos-book-row-title">{book.title}</div>
                        <div className="vos-book-row-author">
                          {book.publicationYear} · {book.readTimeEstimate}
                        </div>
                        <div style={{ fontSize: '10px', color: isCurrent ? '#59E6B6' : 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                          ASIN: {book.asin}
                        </div>
                      </div>
                      <Bookmark
                        size={15}
                        color={isCurrent ? '#59E6B6' : 'rgba(255,255,255,0.3)'}
                        style={{ flexShrink: 0 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 2: Continue Reading Progress */}
            <div className="vos-frosted-panel">
              <div className="vos-panel-header">
                <span className="vos-panel-title">Excerpt Reader</span>
                <span className="vos-panel-badge" style={{ color: '#59E6B6' }}>
                  {activeBookIdx === 0 ? '4% Read' : '15% Read'}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600, marginBottom: '2px' }}>
                {currentBook.sections[0]?.sectionTitle ?? 'CHAPTER 1'}: {currentBook.sections[0]?.chapterSubtitle ?? ''}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                &ldquo;{currentBook.sections[0]?.keyHighlight || currentBook.synopsis.slice(0, 90)}...&rdquo;
              </div>

              <div className="vos-progress-track">
                <div
                  className="vos-progress-fill"
                  style={{ width: activeBookIdx === 0 ? '42%' : '65%' }}
                />
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              RIGHT COLUMN: SPOTLIGHT HERO BOOK + THEMES SHELF
              ────────────────────────────────────────────────────────── */}
          <div className="vos-right-col">
            {/* Spotlight Hero Card */}
            <div className="vos-spotlight-hero">
              {/* 3D Floating Book Hardcover Cover */}
              <div className="vos-hero-cover-wrap">
                <img
                  src={currentBook.coverPath}
                  alt={currentBook.title}
                  className="vos-hero-cover"
                />
              </div>

              {/* Book Information */}
              <div className="vos-hero-info">
                <div className="vos-chips-row">
                  <span className="vos-chip" style={{ background: 'rgba(99, 102, 241, 0.25)', borderColor: 'rgba(129, 140, 248, 0.4)' }}>
                    <Sparkles size={11} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Official Amazon Edition
                  </span>
                  <span className="vos-chip">{currentBook.genre}</span>
                  <span className="vos-chip">{currentBook.format}</span>
                </div>

                <h3 className="vos-hero-title">{currentBook.title}</h3>
                <div className="vos-hero-subtitle">{currentBook.subtitle}</div>

                <p className="vos-hero-synopsis">
                  {currentBook.synopsis}
                </p>

                {/* Hero Action Buttons */}
                <div className="vos-hero-actions">
                  <a
                    href={currentBook.amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="vos-btn-read-now"
                    onClick={() => playClickSound(900, 0.04)}
                  >
                    <BookOpen size={15} />
                    <span>Read on Amazon Kindle</span>
                    <ExternalLink size={13} style={{ opacity: 0.6 }} />
                  </a>

                  <button
                    onClick={handleShare}
                    title="Copy Amazon Link"
                    className="vos-btn-save"
                  >
                    {isCopied ? <Check size={14} color="#59E6B6" /> : <Share2 size={14} />}
                    <span>{isCopied ? 'Link Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Shelf: Themes & Reader Chips */}
            <div className="vos-themes-shelf">
              <div className="vos-shelf-header">
                <span className="vos-shelf-title">Core Research Themes & Motifs</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  {currentBook.coreThemes.length} EXPLORATIONS
                </span>
              </div>

              <div className="vos-cards-strip">
                {currentBook.coreThemes.map((theme, i) => (
                  <div key={i} className="vos-theme-chip-card">
                    <span className="vos-theme-card-tag">Theme 0{i + 1}</span>
                    <span className="vos-theme-card-title">{theme}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
