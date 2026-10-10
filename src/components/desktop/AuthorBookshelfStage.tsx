import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Lock,
  X,
  Library
} from 'lucide-react';
import { books, BookItem } from '../../content/books';
import { profile } from '../../content/profile';
import { playClickSound, playSwishSound } from '../../utils/audioFeedback';
import { getAssetUrl } from '../../utils/assetUrl';
import './AuthorBookshelfStage.css';

interface AuthorBookshelfStageProps {
  isEmbedded?: boolean;
  isDarkMode?: boolean;
  selectedBookId?: string | null;
  onSelectBookId?: (bookId: string | null) => void;
  onSwitchToMobile?: () => void;
}

export const AuthorBookshelfStage: React.FC<AuthorBookshelfStageProps> = ({
  isDarkMode = true,
  selectedBookId: externalBookId,
  onSelectBookId: externalOnSelect,
  onSwitchToMobile: _onSwitchToMobile
}) => {
  // Book selection state (null = empty desk with blank pages & watermark)
  const [internalBookId, setInternalBookId] = useState<string | null>(null);
  const activeBookId = externalBookId !== undefined ? externalBookId : internalBookId;

  const activeBook: BookItem | null = activeBookId
    ? books.find((b) => b.id === activeBookId) || null
    : null;

  // Reading spread index (0 or 1)
  const [spreadIndex, setSpreadIndex] = useState<number>(0);

  // Toast notice when tapping in-progress/planned books
  const [toastNotice, setToastNotice] = useState<{ title: string; message: string } | null>(null);

  // Synchronize spread index on book change
  useEffect(() => {
    setSpreadIndex(0);
  }, [activeBookId]);

  // Dismiss toast after 3.5s
  useEffect(() => {
    if (toastNotice) {
      const timer = setTimeout(() => setToastNotice(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastNotice]);

  const handleSelectBook = (book: BookItem) => {
    if (book.status === 'in-progress') {
      playClickSound(420, 0.04);
      setToastNotice({
        title: 'MANUSCRIPT IN WRITING',
        message: `"${book.title}" is currently being penned by Banishwor Athokpam. Stay tuned for the release!`
      });
      return;
    }

    if (book.status === 'planned') {
      playClickSound(380, 0.04);
      setToastNotice({
        title: 'PLANNED TRILOGY FINALE',
        message: `"${book.title}" is scheduled as the concluding volume of the Between Heartbeats trilogy.`
      });
      return;
    }

    // Published book
    if (book.id === activeBookId) {
      // Tapping again deselects to show empty desk
      handleCloseBook();
      return;
    }

    playSwishSound();
    if (externalOnSelect) {
      externalOnSelect(book.id);
    } else {
      setInternalBookId(book.id);
    }
  };

  const handleCloseBook = () => {
    playSwishSound();
    if (externalOnSelect) {
      externalOnSelect(null);
    } else {
      setInternalBookId(null);
    }
  };

  const handlePrevSpread = () => {
    if (spreadIndex > 0) {
      playClickSound(750, 0.035);
      setSpreadIndex(spreadIndex - 1);
    }
  };

  const handleNextSpread = () => {
    if (activeBook && activeBook.sections && spreadIndex < activeBook.sections.length - 1) {
      playClickSound(800, 0.035);
      setSpreadIndex(spreadIndex + 1);
    }
  };

  const activeSection = activeBook?.sections?.[spreadIndex] || activeBook?.sections?.[0];
  const paragraphs = activeSection?.paragraphs || [];
  const primaryParagraph = paragraphs[0] || activeBook?.synopsis || '';

  return (
    <div className={`vos-author-stage-root ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="vos-author-desk-container">
        {/* =========================================================
            LEFT CARD: "MY BOOKSHELF" (320px)
            Photorealistic 3D Bookshelf with 4 physical standing volumes
            ========================================================= */}
        <div className="vos-bookshelf-card">
          {/* Header */}
          <div className="vos-shelf-card-header">
            <div className="vos-shelf-icon-badge">
              <Library size={16} className="shelf-badge-svg" />
            </div>
            <div>
              <h3 className="vos-shelf-header-title">MY BOOKSHELF</h3>
              <p className="vos-shelf-header-sub">Choose a book</p>
            </div>
          </div>

          {/* Wooden Bookshelf Alcove with Photorealistic Books */}
          <div className="vos-shelf-alcove-frame">
            <div
              className="vos-shelf-alcove-bg"
              style={{ backgroundImage: `url(${getAssetUrl('author-bookshelf-alcove.jpg')})` }}
            >
              {/* Overhead Spotlight Beam Accent */}
              <div className="vos-overhead-spotlight-beam" />

              {/* 4 Invisible Interactive Hotspots mapped over the 4 physical books in the photo */}
              <div className="vos-shelf-interactive-zones-layer">
                {/* Book 1: The Echoes of Silence (Blue) */}
                <div
                  className="vos-book-hotspot book-slot-echoes"
                  onClick={() => handleSelectBook(books[0])}
                  title="The Echoes of Silence (Published)"
                />

                {/* Book 2: Pushback (Red) */}
                <div
                  className="vos-book-hotspot book-slot-pushback"
                  onClick={() => handleSelectBook(books[1])}
                  title="Pushback (Published)"
                />

                {/* Book 3: In Writing (Slate Grey) */}
                <div
                  className="vos-book-hotspot book-slot-inwriting"
                  onClick={() => handleSelectBook(books[2])}
                  title="The Echoes of Silence: Book II (In Writing)"
                />

                {/* Book 4: Planned (Charcoal Black) */}
                <div
                  className="vos-book-hotspot book-slot-planned"
                  onClick={() => handleSelectBook(books[3])}
                  title="The Echoes of Silence: Book III (Planned)"
                />
              </div>
            </div>
          </div>

          {/* Bottom Author Profile Bar */}
          <div className="vos-shelf-author-profile">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="shelf-profile-avatar"
            />
            <div className="shelf-profile-meta">
              <span className="shelf-profile-name">{profile.name}</span>
              <span className="shelf-profile-role">Author · 2 Published Books</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT CARD: "THE READING DESK" (884px)
            Front-Facing Top-Down View with Open Book Lying Flat
            ========================================================= */}
        <div className="vos-reading-desk-card">
          {/* Desk Header Bar */}
          <div className="vos-desk-card-header">
            <div className="desk-header-title-block">
              <h2 className="desk-main-title">THE READING DESK</h2>
              <div className="desk-gold-accent-line" />
              <p className="desk-main-sub">
                {activeBook
                  ? `Reading excerpt from "${activeBook.title}"`
                  : 'Choose a book from the shelf to begin.'}
              </p>
            </div>

            <div className="desk-header-badge-row">
              {/* Status Badge / Close Pill */}
              {activeBook ? (
                <div className="desk-selected-pill-group">
                  <div className="desk-active-book-pill">
                    <BookOpen size={12} style={{ color: '#D4AF37' }} />
                    <span>{activeBook.title}</span>
                  </div>
                  <button
                    onClick={handleCloseBook}
                    className="desk-close-book-btn"
                    title="Close book and return to empty desk"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="desk-no-book-pill">
                  <BookOpen size={12} style={{ color: '#94A3B8' }} />
                  <span>No book selected</span>
                </div>
              )}
            </div>
          </div>

          {/* MAIN DESK SURFACE WITH TOP-DOWN FRONT-FACING DESK BACKGROUND */}
          <div
            className="vos-desk-surface-viewport"
            style={{ backgroundImage: `url(${getAssetUrl('author-reading-desk.jpg')})` }}
          >
            {/* Ambient Toast for In-Progress Books */}
            {toastNotice && (
              <div className="vos-sanctuary-toast">
                <Lock size={12} style={{ color: '#F59E0B' }} />
                <div>
                  <div className="toast-title">{toastNotice.title}</div>
                  <div className="toast-message">{toastNotice.message}</div>
                </div>
              </div>
            )}

            {/* OPEN BOOK SURFACE AREA (Directly Mapped Over Flat Open Pages in Image) */}
            <div className="vos-flat-open-book-pages-surface">
              {!activeBook ? (
                /* =========================================================
                   STATE A: BLANK PAGES WITH CENTER WATERMARK
                   Exact match to user's reference mockup
                   ========================================================= */
                <div className="vos-empty-book-watermark-overlay">
                  <div className="watermark-ornament-line">
                    <span className="rule-l" />
                    <div className="watermark-book-icon">
                      <BookOpen size={22} className="watermark-svg" />
                    </div>
                    <span className="rule-r" />
                  </div>
                </div>
              ) : (
                /* =========================================================
                   STATE B: READABLE PAGES EMBEDDED IN PARCHMENT
                   Clean, crisp, authentic serif book layout
                   ========================================================= */
                <div className="vos-printed-text-spread">
                  {/* LEFT PAGE (VERSO) */}
                  <div className="page-column page-verso-column">
                    <div className="printed-running-head">
                      <span className="running-book-title">{activeBook.title.toUpperCase()}</span>
                      <span className="running-chapter">{activeSection?.sectionTitle}</span>
                    </div>

                    <div className="printed-page-body">
                      <div className="chapter-announcement">
                        <div className="chapter-label">{activeSection?.sectionTitle}</div>
                        {activeSection?.chapterSubtitle && (
                          <h4 className="chapter-heading">{activeSection.chapterSubtitle}</h4>
                        )}
                      </div>

                      {activeSection?.keyHighlight && (
                        <div className="printed-pullquote-card">
                          <Quote size={15} className="pullquote-icon-svg" />
                          <p className="pullquote-serif-text">
                            &ldquo;{activeSection.keyHighlight}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="printed-fleuron">✦ ✦ ✦</div>
                    </div>

                    <div className="printed-running-foot">
                      <span className="page-num">— {spreadIndex * 2 + 1} —</span>
                      <span className="page-loc">{activeSection?.locationLabel}</span>
                    </div>
                  </div>

                  {/* CENTER SPINE CREASE DIVIDER */}
                  <div className="printed-center-seam" />

                  {/* RIGHT PAGE (RECTO) */}
                  <div className="page-column page-recto-column">
                    <div className="printed-running-head">
                      <span className="running-subtitle">
                        {activeSection?.chapterSubtitle || activeBook.genre}
                      </span>
                      <span className="running-author">BANISHWOR ATHOKPAM</span>
                    </div>

                    <div className="printed-page-body">
                      <div className="printed-paragraphs">
                        <p className="printed-para para-dropcap">{primaryParagraph}</p>
                      </div>

                      <div className="printed-action-bar">
                        <div className="printed-asin-label">
                          <Sparkles size={10} style={{ color: '#D97706' }} />
                          <span>Official Excerpt · Amazon ASIN {activeBook.asin}</span>
                        </div>

                        <a
                          href={activeBook.amazonUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="printed-kindle-btn"
                          title="Read on Amazon Kindle"
                        >
                          <BookOpen size={11} />
                          <span>Read Full Book on Amazon Kindle</span>
                          <ExternalLink size={9} />
                        </a>
                      </div>
                    </div>

                    <div className="printed-running-foot">
                      <span className="page-signature">Banishwor Athokpam</span>
                      <span className="page-num">— {spreadIndex * 2 + 2} —</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Floating Spread Navigation Controls */}
            {activeBook && (
              <div className="vos-desk-floating-pagination">
                <button
                  onClick={handlePrevSpread}
                  disabled={spreadIndex === 0}
                  className="desk-page-turn-btn"
                  title="Previous spread"
                >
                  <ChevronLeft size={13} />
                  <span>Prev</span>
                </button>

                <span className="desk-spread-counter">
                  SPREAD {spreadIndex + 1} OF {activeBook.sections?.length || 1}
                </span>

                <button
                  onClick={handleNextSpread}
                  disabled={
                    !activeBook.sections || spreadIndex >= activeBook.sections.length - 1
                  }
                  className="desk-page-turn-btn"
                  title="Next spread"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
